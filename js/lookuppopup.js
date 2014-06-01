//////////////////////////////////////////////////////
// lookup.js

/////////////////////////////
// constants

// TODO: why does middle click no longer worl?
var TOOLTIP_LOOKUP = "Close [Double Click, Escape]\nNew Empty Lookup Session [Ctrl+Click, Middle Button]\nDuplicate Lookup Session [Ctrl+Shift+Click, Middle Button+Shift]";
//var TOOLTIP_LOOKUP = "Close [Double Click, Escape]\nNew Empty Lookup Session [Ctrl+Click]\nDuplicate Lookup Session [Ctrl+Shift+Click]";

var TOOLTIP_PIN_UNPINNED = "Pin to page";
var TOOLTIP_PIN_PINNED = "Unpin from page";
var TOOLTIP_SELECTTEMPLATE = "Launch Query [Enter, Alt+Selection]\nLaunch Query in New Lookup Session [Ctrl+Alt+Selection]\nOpen Tip [Shift+Alt+Selection]\n\nNB: If list is opened via a mouse click, modifiers must be pressed whilst you OPEN the list, not when you select the item. This doesn't apply to keyboard selections.";
//var TOOLTIP_SELECTTEMPLATE = "Template";		// TODO: if can get keypress code in onchange, go back to above method
var TOOLTIP_LOCK_LOCKED = "Unlock from position";
var TOOLTIP_LOCK_UNLOCKED = "Lock into Position";
var TOOLTIP_MINIMIZE_MINIMIZED = "Restore";
var TOOLTIP_MINIMIZE_RESTORED = "Minimize";
var TOOLTIP_CLOSE = "Close [Escape]";
var TOOLTIP_DOCKLEFT = "Dock Left [+Alt: Top]";
var TOOLTIP_DOCKRIGHT = "Dock Right [+Alt: Bottom]";
var TOOLTIP_BUTTONQUERY = "Launch Query [Click]\nLaunch Query in New Lookup Session [Ctrl+Click]\nOpen Tip [Shift+Click]";

var DEFAULTTOP_LOOKUP = 16;
var DEFAULTWIDTH_LOOKUP = 600;
var DEFAULTHEIGHT_LOOKUP = 400;
var MINWIDTH_LOOKUP = 128;//320;
var MINHEIGHT_LOOKUP = 128;

var DOCK_DIMENSIONDENOM_DELTA = 0.5;
var DIMENSIONDENOM_LOOKUP_MIN = 2;
var DIMENSIONDENOM_LOOKUP_MAX = 5;

var HITBOXWIDTH_LOOKUPPOPUP = 16;
var HITBOXHEIGHT_LOOKUPPOPUP = 16;
var HITOFFSET_LEFT_LOOKUPPOPUP = 16;
var HITOFFSET_TOP_LOOKUPPOPUP = 16;
var HITCHECK_LOOPCOUNT_LOOKUPPOPUP = 32;

//var DRAGLIMIT_FIXEDPOSITION_MARGIN_RIGHT = 16;		// width icon + margins?
//var DRAGLIMIT_FIXEDPOSITION_MARGIN_BOTTOM = 48;

//var TIMEOUT_HIDEHANDLE = 3000;
var MARGINLEFT_HANDLE = -4;
var MARGINTOP_HANDLE = -4;

var OPACITY_LOOKUP_MOUSEOUT = 1;

var DEFAULTTEXT_INPUTQUERY = "Enter your query here";

////////////////////////////////
// variables

var saveLookupPopupOnUnload = null;

var arrLookupTemplates = null;
var templateIdLookupLast = null;
var mouseActivateLookupPopup  = null;
var useWordUnderCursor_LookupPopup;

var placementLookupPopup = {};
var dirtyPlacementLookupPopup = false;
//var opacityLookupPopup = null;
var arrZIndexLookupPopups = [];

////////////////////////////////////
// functions

function DoLookupPopup(e, query, opts){
	// craete window if needed. minimized and invisible by defaulkt
	var result = CreateLookupPopupIfRequired(opts);
	if(result.divPopup == null)
		return null;

	// lookup (still invis/minim)
	if(opts && opts.divPopupCopyQuery != null){
		// lookup the query of this popup in the new one
		var divTitlebar = opts.divPopupCopyQuery.divTitlebar;
		
		if(divTitlebar.inputQuery.lastQuery != null){		// ignore unqueryed popups
			LookupQuery(result.divPopup, divTitlebar.inputQuery.lastQuery, 
				divTitlebar.selectTemplate.lastTemplateId, opts);	// clean trailing spaces	
		}
	}
	else if(query != null){
		// lookup always restores popup (still invis, but has height)
		LookupQuery(result.divPopup, query, null, opts);	// clean trailing spaces
		
		// restore (still invis but now has height)
//			MinimizeLookupPopup(divPopup, false);						
	}
	
	if(result.isNew == false){
		// if popup isnt new and is locked, never move
		if(result.divPopup.style.position == "absolute"){		// but this can be moved
			if(e){
				// always takes client co-ords
				SetPositionLookupPopup(result.divPopup,
					{clientX: e.clientX, clientY: e.clientY ,foreground: true, origin_hit_check: true});
			}
			else{
				// centre based on existing width/height
				SetPositionLookupPopup(result.divPopup, {centreX: true, centreY: true, foreground: true, origin_hit_check: true});
			}
		}
	}
	else{
		// new popup width/height used stored if possible (doesnt matter if locked)

		// if initial run, placementLookupPopup will be {}, so position @ centre with default width/height
		if(typeof(placementLookupPopup.clientX) === "undefined"){
			SetPositionLookupPopup(result.divPopup,
				{centreX: e ? null : true,
				 clientX: e ? e.clientX : null,
				 clientY: e ? e.clientY : DEFAULTTOP_LOOKUP,
				 width: DEFAULTWIDTH_LOOKUP, height: DEFAULTHEIGHT_LOOKUP,
				 origin_hit_check: true});
		}
		else{
			// If e supplied, use its x & y. else use the stored one. always use stored width/height
			SetPositionLookupPopup(result.divPopup,
				{clientX: e ? e.clientX : placementLookupPopup.clientX, 
				 clientY: e ? e.clientY : placementLookupPopup.clientY,
				 width: placementLookupPopup.width, 
				 height: placementLookupPopup.height,
				 locked: placementLookupPopup.locked,
				 pinned: placementLookupPopup.pinned,
				 origin_hit_check: true} );
		}
/*
		if(e){
			// event's x and y, but stored width/heigh
			SetPositionLookupPopup(result.divPopup,
				{clientX: e.clientX, 
				 clientY: e.clientY,
				 width: placementLookupPopup ? placementLookupPopup.width : null, 
				 height: placementLookupPopup ? placementLookupPopup.height : null,
				 locked: placementLookupPopup ? placementLookupPopup.locked : null,
				 pinned: placementLookupPopup ? placementLookupPopup.pinned : null} );
		}
		else{
			// use stored x y width height,	// BUT if !query, force to centre with default width/height
			SetPositionLookupPopup(result.divPopup,
				{clientX: placementLookupPopup.clientX, 
				 clientY: placementLookupPopup.clientY,
				 width: placementLookupPopup ? placementLookupPopup.width : null, 
				 height: placementLookupPopup ? placementLookupPopup.height : null,
				 locked: placementLookupPopup ? placementLookupPopup.locked : null,
				 pinned: placementLookupPopup ? placementLookupPopup.pinned : null} );
		}*/
	}
	
	// make visible
	ShowLookupPopup(result.divPopup, true);

	// default focus case
	if(result.isNew == true && query == null)
		result.divPopup.divTitlebar.inputQuery.focus();
	
	return result.divPopup;
}

function CreateLookupPopupIfRequired(opts){
	if(opts == null || opts.createNew != true){
		// try to find topmost popup used (that is pinned)
		if(arrZIndexLookupPopups.length >= 1)
			return({divPopup: arrZIndexLookupPopups[arrZIndexLookupPopups.length-1], isNew: false});
		/*
		var divPopups = document.getElementsByClassName(CLASS_LOOKUPPOPUP);
		for(var x=divPopups.length-1; x>=0; x--){
//				if(divPopups[x].divTitlebar.aPin.pinned == true)
				return({divPopup: divPopups[x], isNew: false});
		}*/
	}
	
	return({divPopup: CreateLookupPopup(null), isNew: true});
}

function CreateLookupPopup(templateId){
	// popup is an abs/fixed div, containing a div (titlebar) and an iframe
	function PopulateSelectTemplate(select, templateIdSelect){
		var valueOptionDefault = valueOptionSelect = null;
		var arrOptionGroups = [];
		var arrIndexNumber = [1];
		
		
		
		function GetIndexNumberString(){
			var out = "";
			
			for(var b in arrIndexNumber){
				if(b > 0)
					out += ".";
				out += arrIndexNumber[b];
			}
			return out;
		}
		
		function IncrementIndexNumber(){
			if(arrIndexNumber.length > 0)
				arrIndexNumber[arrIndexNumber.length-1]++;
		}
				
				
				
				
		if(templateIdSelect == null)
			templateIdSelect = templateIdLookupLast;			// get last successful templateId
		
		for(var x in arrLookupTemplates){
			// grouping? (always enabled)
			if(arrLookupTemplates[x].groupStart == true){
				var optionGroup = document.createElement('optgroup');
				
				//optionGroup.label = offset + arrLookupTemplates[x].name;
				optionGroup.nameUndecorated = GetIndexNumberString();
				if( arrLookupTemplates[x].name ){
					try{ optionGroup.nameUndecorated += " " + arrLookupTemplates[x].name.decode_utf8(); }
					catch(ex){ optionGroup.nameUndecorated += " " + arrLookupTemplates[x].name; }
				}
					
				optionGroup.indentation = arrOptionGroups.length;		// number of '   ' to add when dropped down
				
				optionGroup.setAttribute("label", /*offset + */optionGroup.nameUndecorated);
				optionGroup.className = (arrOptionGroups.length == 0 ? 
					CSS2.CLASS_LOOKUP_TEMPLATE_SELECT_FIRSTLEVELGROUP : CSS2.CLASS_LOOKUP_TEMPLATE_SELECT_NOTFIRSTLEVELGROUP);

				if(arrOptionGroups.length > 0)
					arrOptionGroups[arrOptionGroups.length - 1].appendChild(optionGroup);
				else
					select.appendChild( optionGroup );
				
				// end of array is the current group
				arrOptionGroups.push(optionGroup);
				// start new index sub
				arrIndexNumber.push(1);
			}
			else if(arrLookupTemplates[x].groupEnd == true){
				arrOptionGroups.pop();

				arrIndexNumber.pop();
				IncrementIndexNumber();				// eg: 1.2 - > 1 -> 2
			}
			else{
				if(arrLookupTemplates[x].enabled != true)
					continue;
/*			
				// format offset
				var offset = "";
				if(arrOptionGroups.length >= 2){
					for(var t=0; t<arrOptionGroups.length-1; t++)
						offset += "\u00a0\u00a0\u00a0";
				}
*/				
				var nameUndecorated = GetIndexNumberString();
				if(arrLookupTemplates[x].name){
					try{ nameUndecorated += " " + arrLookupTemplates[x].name.decode_utf8(); }
					catch(ex){ nameUndecorated += " " + arrLookupTemplates[x].name; }
				}
					
				IncrementIndexNumber();
				
				// no template can have a null or non unique id, so assign one here
				if(arrLookupTemplates[x].id == null)
					arrLookupTemplates[x].id = RandomString(32);
				//var option = new Option(/*offset + */nameUndecorated, arrLookupTemplates[x].id);
				var option = new Option(nameUndecorated, arrLookupTemplates[x].id);
				
				option.className = CSS2.CLASS_LOOKUP_TEMPLATE_SELECT_NOTFIRSTLEVELGROUP;
				
				option.nameUndecorated = nameUndecorated;
				option.indentation = Math.max(0, arrOptionGroups.length - 1);
				
				option.urlTemplate = arrLookupTemplates[x].urlTemplate;
				option.hash = arrLookupTemplates[x].hash;
				option.scroll = arrLookupTemplates[x].scroll;
				option.description = arrLookupTemplates[x].description;
				option.framebuster = arrLookupTemplates[x].framebuster;
				
				// either add to the group or add to the list. either way it goes into the select
				if(arrOptionGroups.length > 0)
					arrOptionGroups[arrOptionGroups.length - 1].appendChild(option);
				else
					select.options.add( option );
				
				// remember value of default option should it be needed later
				if(arrLookupTemplates[x].default == true)
					valueOptionDefault = option.value;
				if(templateIdSelect == arrLookupTemplates[x].id)
					valueOptionSelect = option.value;
			}
		}
		
		// something must be selected
		select.value = (valueOptionSelect ? valueOptionSelect : valueOptionDefault);
	}
	
	function IndentSelectTemplate(elemParent, showIndent){
		// for each option/optgroup, indent the innerText by its indentation value
		var elem = elemParent.firstChild;
		
		while(elem){
			if(elem.nodeType == Node.ELEMENT_NODE){
				if(elem.nodeName == "OPTION" || elem.nodeName == "OPTGROUP"){
					// build name
					if(elem.indentation > 0){
						var innerText = elem.nameUndecorated;
						if(showIndent == true){
							for(var t=0; t<elem.indentation; t++)
								innerText = "\u00a0\u00a0\u00a0" + innerText;
						}
						
						if(elem.nodeName == "OPTGROUP"){
							elem.setAttribute("label", innerText);
						}
						else
							elem.innerText = innerText;
					}
					
					if(elem.nodeName == "OPTGROUP"){
						// recurse with optgroup as parent
						IndentSelectTemplate(elem, showIndent);
					}
				}
			}
			elem = elem.nextSibling;
		}
	}
	
	// create popup
	var divPopup = document.createElement('div');		// display:table
	divPopup.className = CSS2.CLASS_LOOKUP;
	divPopup.refCount = 0;
	// must set these important
//	divPopup.style.setProperty("position", /*fixed ? 'fixed' : */'absolute', "important");
//		divPopup.style.setProperty("z-index", BASEZINDEX_LOOKUPPOPUP, "important");
//		divPopup.style.setProperty("min-width", MINWIDTH_LOOKUP + "px", "important");
//		divPopup.style.setProperty("min-height", MINHEIGHT_LOOKUP + "px", "important");

	divPopup.style.setProperty("visibility", "hidden", "important");
	
	// these defaults are overwritten, but they should be set to something at least
	divPopup.style.setProperty("left", '0px', "important");
	divPopup.style.setProperty("top", '0px', "important");
	divPopup.style.setProperty("position", "fixed", "important");

	// setting min-height interferes with restore/minimize stuff
	divPopup.style.setProperty("min-width",  MINWIDTH_LOOKUP/*DEFAULTWIDTH_LOOKUP*/ + 'px', "important");
//	divPopup.style.setProperty("min-height",  MINHEIGHT_LOOKUP/*DEFAULTWIDTH_LOOKUP*/ + 'px', "important");
	divPopup.heightRestore = MINHEIGHT_LOOKUP;//DEFAULTHEIGHT_LOOKUP;


	// create titlebar div (display:row ///table)
	var divTitlebar = divPopup.divTitlebar = document.createElement('div');
	divTitlebar.className = CSS2.CLASS_LOOKUP_TITLEBAR_ROW;
	divTitlebar.divPopup = divPopup;
/*		// single row (display:table-row)
		var divTBRow = divTitlebar.divTBRow = document.createElement('div');
		divTBRow.className = CSS2.CLASS_LOOKUP_TITLEBAR_ROW;
		divTitlebar.appendChild(divTBRow);*/
			// left side cell (display:table-cell;text-align:left)
			var divTBCellLeft = divTitlebar.divTBCellLeft = document.createElement('div');
			divTBCellLeft.className = CSS2.CLASS_LOOKUP_TITLEBAR_CELL + " " + CSS2.CLASS_LOOKUP_TITLEBAR_CELL_LEFT;
			divTitlebar.appendChild(divTBCellLeft);
				// left side of the title bar

				// icon logo
				var aLogo = divTitlebar.aLogo = document.createElement('a');
				aLogo.href = "#";
				aLogo.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
				aLogo.title = TOOLTIP_LOOKUP;
					aLogo.img = document.createElement('img');
					aLogo.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
					aLogo.img.style.setProperty("width", "16px", "important");		// force to be favicon size
					aLogo.img.style.setProperty("height", "16px", "important");		// force to be favicon size
					
					aLogo.img.src =  chrome.extension.getURL('img/book-open-text.png');	
					aLogo.appendChild(aLogo.img);
				aLogo.divPopup = divPopup;
				aLogo.addEventListener("dblclick", function(e){
					e.preventDefault();
					RemoveLookupPopup(e.currentTarget.divPopup);
				}, true);
				aLogo.addEventListener("click", function(e){
					e.preventDefault();
					// middle(1) click - new empty. +shift = new copy (TODO: doesnt work)
					// left(0)+ctrl - new empty, ctrl+shift+left = new copy
					if(e.button == 1 || (e.button == 0 && e.ctrlKey == true))
						DoLookupPopup(e, null, {createNew: true, divPopupCopyQuery: e.shiftKey ? e.currentTarget.divPopup : null});
				}, true);
				divTBCellLeft.appendChild(aLogo);
	
				// pin
				var aPin = divTitlebar.aPin = document.createElement('a');
				aPin.href = "#";
				aPin.pinned = false;
				aPin.divPopup = divPopup;
				aPin.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
				aPin.style.setProperty("margin-right", "3px", "important");
					aPin.img = document.createElement('img');
 					aPin.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
					aPin.appendChild(aPin.img);
				aPin.addEventListener("click", function(e){
					e.preventDefault();
					
					e.currentTarget.pinned = (e.currentTarget.pinned == true ? false : true);	// toggle
					SavePlacementLookupPopup(e.currentTarget.divPopup);			// save 
					UpdateStatusInIcon(e.currentTarget.divPopup, {pin:true});	// reflect in icon
				}, true);
				UpdateStatusInIcon(divPopup, {pin:true});			// reflect current status (no toggle)
				divTBCellLeft.appendChild(aPin);		

				// select
				var selectTemplate = divTitlebar.selectTemplate = document.createElement('select');
				selectTemplate.divPopup = divPopup;
				selectTemplate.className = CSS2.CLASS_LOOKUP_TEMPLATE_SELECT;
				selectTemplate.title = TOOLTIP_SELECTTEMPLATE;

				function OnChangeSelectTemplate(e, dont_lookup){
					// keyboardevents cant be modified directly, so make a copy
					var doQueryButton = false;

					// because we can be activated by OnKeyUp, check that the select really did change
					if(e.type == "keyup"){
						if(e.keyCode == 13){		// enter
							// modify structure to fake button query click
							// cant modify e directly when its a keyboardevent
//							e.altKey = true;
							doQueryButton = true;
						}
						else if(e.currentTarget.lastSelectedIndex == e.currentTarget.selectedIndex)
							return;
					}
//					if(e.type == "keyup" && e.currentTarget.lastSelectedIndex == e.currentTarget.selectedIndex)
//						return;
					e.currentTarget.lastSelectedIndex = e.currentTarget.selectedIndex;

					templateIdLookupLast = e.currentTarget.value;			// store templateId in DOM

					// change events dont have key codes, so grab them from the preceding click (not ideal)
					if(e.type == "change" && e.currentTarget.lastKeys){
						// not keyboardevent event, so can create ctrlKey etc
						e.ctrlKey = e.currentTarget.lastKeys.ctrlKey;
						e.shiftKey = e.currentTarget.lastKeys.shiftKey;
						e.altKey = e.currentTarget.lastKeys.altKey;
						
						e.currentTarget.lastKeys = null;
					}
					
					// do lookup on template change only if alt pressed (unless forbid), as long as text is in querystring
					// TODO: change events dont have keypress codes. get from click?
					if(dont_lookup != true && (e.altKey == true || doQueryButton == true)){
						var divPopup =  e.currentTarget.divPopup;
					
						// if hint showing, no query is entered (even thoough input.value == hinttext)
						if(divPopup.divTitlebar.inputQuery.classList.contains(CSS2.CLASS_LOOKUP_HINT) == false &&
							divPopup.divTitlebar.inputQuery.value.length > 0){
							// fake call to query button event
							OnClickButtonQuery(e);//{currentTarget: e.currentTarget});	// would try to set e.returnDefault, so ignore it
							// OnClickButtonQuery changes e.returnDefault, but it doesnt matter
							//e.returnDefault = false;
														
							// use current contents
//							LookupQuery(divPopup, null, null, {});	
						}
					}
					
					// use description as tooltip, unless empty
//					e.currentTarget.title = (e.currentTarget.options[e.currentTarget.selectedIndex].description != null) ?
//						e.currentTarget.options[e.currentTarget.selectedIndex].description : TOOLTIP_SELECTTEMPLATE;

			//			if(e.currentTarget.divPopup.divTitlebar.buttonQuery)
			//				e.currentTarget.divPopup.divTitlebar.buttonQuery.style.display = "";		// show query button
				}
				selectTemplate.addEventListener("change", OnChangeSelectTemplate);
				selectTemplate.addEventListener("keyup", OnChangeSelectTemplate);
				selectTemplate.addEventListener("click", function(e){
					// store the keycode for the click event that opened the dropdown
					e.currentTarget.lastKeys = {
						ctrlKey: e.ctrlKey,
						shiftKey: e.shiftKey,
						altKey: e.altKey,
					};
				}, true);
/*				
				selectTemplate.addEventListener("click", function(e){
					IndentSelectTemplate(e.currentTarget, true);		// dropdown
				}, true);		
				selectTemplate.addEventListener("blur", function(e){
					IndentSelectTemplate(e.currentTarget, false);			// rollup
				});
				selectTemplate.addEventListener("change", function(e){
					IndentSelectTemplate(e.currentTarget, false);			// rollup
				});
*/				
				// populate the selector
				PopulateSelectTemplate(selectTemplate, templateId);
				// update tooltip (not called programatically earlier)
				if(selectTemplate.selectedIndex != -1)
					OnChangeSelectTemplate({currentTarget: selectTemplate}, true);		// true = dont_lookup
				divTBCellLeft.appendChild(selectTemplate);
		
				// query input
				var inputQuery = divTitlebar.inputQuery = document.createElement('input');
				inputQuery.className = CSS2.CLASS_LOOKUP_QUERY_INPUT;
				inputQuery.style.setProperty("margin-right", "1px", "important");
				inputQuery.type = "text";
				inputQuery.divPopup = divPopup;
				inputQuery.addEventListener("focus", function(e){
					if(e.currentTarget.classList.contains(CSS2.CLASS_LOOKUP_HINT) == true){
//					if(e.currentTarget.classNameContains([CSS2.CLASS_LOOKUP_HINT]) == true){
						e.currentTarget.className = CSS2.CLASS_LOOKUP_QUERY_INPUT;
						e.currentTarget.value = "";
					}
				}, false);
				inputQuery.addEventListener("blur", function(e){
					if(e.currentTarget.value == ""){
						e.currentTarget.value = DEFAULTTEXT_INPUTQUERY;
						e.currentTarget.className = CSS2.CLASS_LOOKUP_QUERY_INPUT + " " + CSS2.CLASS_LOOKUP_HINT;
					}
				}, false);
					
				inputQuery.addEventListener("keydown", function(e){
					if(e.keyCode == 27)		// esc
						RemoveAllLookupPopups({keepPinned: true});
					else if(e.keyCode == 13)		// enter
						OnClickButtonQuery(e);
				});
				// show query button only after text change
		//		inputQuery.addEventListener("input", function(e){
		//			divPopup.divTitlebar.buttonQuery.style.display = "";
		//		});

				// needed to share OnClickButtonQuery
//				inputQuery.inputQuery = inputQuery;
//				selectTemplate.inputQuery = inputQuery;
		
				divTBCellLeft.appendChild(inputQuery);
		
				// query button
				var aQuery = divTitlebar.aQuery = document.createElement('a');
				aQuery.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
				aQuery.href = "#";
				aQuery.title = TOOLTIP_BUTTONQUERY;
				aQuery.divPopup = divPopup;
//				aQuery.inputQuery = inputQuery;
					aQuery.img = document.createElement('img');
 					aQuery.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
					aQuery.img.src = chrome.extension.getURL('img/navigation-green.png');
					aQuery.appendChild(aQuery.img);
				aQuery.addEventListener("click", OnClickButtonQuery, true);
				divTBCellLeft.appendChild(aQuery);		
/*
				var buttonQuery = divTitlebar.buttonQuery = document.createElement('button');
				buttonQuery.className = CSS2.CLASS_LOOKUP_QUERY_BUTTON;
				buttonQuery.title = TOOLTIP_BUTTONQUERY;
				buttonQuery.innerHTML = '<img src="' + chrome.extension.getURL('img/navigation.png') + '"/>';//INNERHTML_BUTTONQUERY;
				buttonQuery.divPopup = divPopup;
				buttonQuery.inputQuery = inputQuery;
				buttonQuery.addEventListener("click", OnClickButtonQuery);
				divTBCellLeft.appendChild(buttonQuery);
*/
				
			// right side cell (display:table-cell;text-align:right)
			var divTBCellRight = divTitlebar.divTBCellRight = document.createElement('div');
			divTBCellRight.className = CSS2.CLASS_LOOKUP_TITLEBAR_CELL + " " + CSS2.CLASS_LOOKUP_TITLEBAR_CELL_RIGHT;
			divTitlebar.appendChild(divTBCellRight);
				// right side of title bar

				// waiting
				var imgWaiting = divTitlebar.imgWaiting = document.createElement('img');
				imgWaiting.className = CSS2.CLASS_LOOKUP_WAITING;
				imgWaiting.src = chrome.extension.getURL('img/ajax-loader.gif');
				imgWaiting.style.setProperty("display", "none", "important");
				divTBCellRight.appendChild(imgWaiting);

				// lock
				var aLock = divTitlebar.aLock = document.createElement('a');
				aLock.href = "#";
				aLock.divPopup = divPopup;
				aLock.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
					aLock.img = document.createElement('img');
					aLock.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
					aLock.appendChild(aLock.img);
				aLock.addEventListener("click", function(e){
					e.preventDefault();
					// fixup co-ordinates before toggle
					if(e.currentTarget.divPopup.style.position == "absolute"){
						e.currentTarget.divPopup.style.setProperty("left", parseFloat(e.currentTarget.divPopup.style.left) - window.pageXOffset + 'px', "important");
						e.currentTarget.divPopup.style.setProperty("top", parseFloat(e.currentTarget.divPopup.style.top) - window.pageYOffset + 'px', "important");
					}
					else{
						e.currentTarget.divPopup.style.setProperty("left", parseFloat(e.currentTarget.divPopup.style.left) + window.pageXOffset + 'px', "important");
						e.currentTarget.divPopup.style.setProperty("top", parseFloat(e.currentTarget.divPopup.style.top) + window.pageYOffset + 'px', "important");
					}

					// toggle
					e.currentTarget.divPopup.style.setProperty("position", e.currentTarget.divPopup.style.position == "absolute" ? "fixed" : "absolute", "important");
					SavePlacementLookupPopup(e.currentTarget.divPopup);			// save 
					UpdateStatusInIcon(e.currentTarget.divPopup, {lock:true});	// reflect in icon
				}, true);
				UpdateStatusInIcon(divPopup, {lock:true});			// reflect current status (no toggle)
				divTBCellRight.appendChild(aLock);		

				// pseudodock l/r
				var spanDockButtonContainer = divTitlebar.spanDockButtonContainer = document.createElement('span');
				spanDockButtonContainer.className = CSS2.CLASS_LOOKUP_BUTTONCONTAINER;
					var arr = [
						{imgSrc: "img/application-dock-180.png", dockSide: "left", dockSideAlt: "top", marginLeft: "2px", title: TOOLTIP_DOCKLEFT},
						{imgSrc: "img/application-dock.png", dockSide: "right", dockSideAlt: "bottom", title: TOOLTIP_DOCKRIGHT}];
					for(var z in arr){
						var aDock = document.createElement('a');
							aDock.img = document.createElement('img');
							aDock.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
							aDock.img.src = chrome.extension.getURL(arr[z].imgSrc);
							aDock.appendChild(aDock.img);
						aDock.href = "#";
						aDock.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
						aDock.title = arr[z].title;
						if(arr[z].marginLeft)
							aDock.style.setProperty("margin-left", arr[z].marginLeft, "important");
						aDock.divPopup = divPopup;
						
						aDock.dockSide = arr[z].dockSide;
						aDock.dockSideAlt = arr[z].dockSideAlt;
						aDock.spanDockButtonContainer = spanDockButtonContainer;
						
						aDock.addEventListener("click", function(e){
							e.preventDefault();

							var divPopup = e.currentTarget.divPopup;
							var spanDockButtonContainer = e.currentTarget.spanDockButtonContainer;
							
							// if undocked, dock to this side (store in parent of anchor, which is tbcell)
							if(divPopup.dockSide == null){
								spanDockButtonContainer.dimensionDenominator = DIMENSIONDENOM_LOOKUP_MIN;			// reset - always start at 50% (1/2)

								SetPositionLookupPopup(divPopup, {
									dock: true, 
									dockSide: e.altKey == true ? e.currentTarget.dockSideAlt : e.currentTarget.dockSide,
									dockDimensionDenominator: spanDockButtonContainer.dimensionDenominator
								});
							}
							else{
								var dock = true;		// should we call SetPositionLookupPopup at end (null = no, true/false = dock/undock)
								
								// redocking to same side?
								if(divPopup.dockSide == e.currentTarget.dockSide || divPopup.dockSide == e.currentTarget.dockSideAlt){
									// abandon if can go no further
									if(spanDockButtonContainer.dimensionDenominator == DIMENSIONDENOM_LOOKUP_MAX)
										dock = null;			// dont try anything
									else{
										// increase denominator
										spanDockButtonContainer.dimensionDenominator = 
											Math.min(DIMENSIONDENOM_LOOKUP_MAX, e.currentTarget.parentElement.dimensionDenominator + DOCK_DIMENSIONDENOM_DELTA);
									}
								}
								else{
									// decreasing amount of dock
									// decrease denom and undock if it gets to reset state (2)
									spanDockButtonContainer.dimensionDenominator -= DOCK_DIMENSIONDENOM_DELTA;
									
									if(spanDockButtonContainer.dimensionDenominator < DIMENSIONDENOM_LOOKUP_MIN)
										dock = false;
								}	

								if(dock != null){
									// dockSide/dimeonsondenom ignored if dock==false
									SetPositionLookupPopup(divPopup, {
										dock: dock,
										dockSide: divPopup.dockSide,
										dockDimensionDenominator: spanDockButtonContainer.dimensionDenominator,
									});
								}
								
								// update disabled status of both buttons
								var aDocks = spanDockButtonContainer.getElementsByClassName(CSS2.CLASS_LOOKUP_ANCHORBUTTON);
								for(var p=0; p<aDocks.length; p++){
									// if docked to the side(s) the button is assigned AND its at its denominator limit, disable it
									aDocks[p].disabled = ((divPopup.dockSide == aDocks[p].dockSide || divPopup.dockSide == aDocks[p].dockSideAlt) &&
										spanDockButtonContainer.dimensionDenominator == DIMENSIONDENOM_LOOKUP_MAX) ? true : false;
									aDocks[p].style.setProperty("opacity", aDocks[p].disabled == true ? OPACITY_BUTTON_DISABLED : OPACITY_BUTTON_ENABLED, "important");
								}
							}
						}, true);	// NB: actual minim done at end of function
						
						spanDockButtonContainer.appendChild(aDock);
					}// end for
				divTBCellRight.appendChild(spanDockButtonContainer);

				// minimise/restore
				var aMinimize = divTitlebar.aMinimize = document.createElement('a');
				aMinimize.href = "#";
				aMinimize.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
				aMinimize.divPopup = divPopup;
				aMinimize.minimized = true;
					aMinimize.img = document.createElement('img');
					aMinimize.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
					aMinimize.appendChild(aMinimize.img);
				aMinimize.addEventListener("click", function(e){
					e.preventDefault();
					// action (toggled) - these functions handle icon & status toggle
					MinimizeLookupPopup(e.currentTarget.divPopup, e.currentTarget.minimized == true ? false : true);		
				}, true);	// NB: actual minim done at end of function
				
				divTBCellRight.appendChild(aMinimize);
				
				// close
				var aClose = divTitlebar.aClose = document.createElement('a');
				aClose.href = "#";
				aClose.className = CSS2.CLASS_LOOKUP_ANCHORBUTTON;
				aClose.title = TOOLTIP_CLOSE;
				aClose.divPopup = divPopup;
					aClose.img = document.createElement('img');
					aClose.img.className = CSS2.CLASS_LOOKUP_BUTTONIMAGE;
					aClose.img.src = chrome.extension.getURL('img/cross.png');
					aClose.appendChild(aClose.img);
				aClose.addEventListener("click", function(e){
					e.preventDefault();
					RemoveLookupPopup(e.currentTarget.divPopup);
				}, true);
				divTBCellRight.appendChild(aClose);
	
	// add titlebar to popup
	divPopup.appendChild(divTitlebar);
	
	// create contents iframe (row->cell->iframe)
	var divRow = document.createElement('div');
	divRow.className = CSS2.CLASS_LOOKUP_IFRAME_ROW;
		var divCell = document.createElement('td');
		divCell.className = CSS2.CLASS_LOOKUP_IFRAME_CELL;
		divCell.colSpan = 2;		
			divPopup.iframe = document.createElement('iframe');
			
			// bug: https://bugs.webkit.org/show_bug.cgi?id=24078
			// Workaround: http://www.mooforum.net/general12/squeezebox-webkit-and-iframe-reloading-t1526.html
			divPopup.iframe.name = RandomString(64);				
			
			divPopup.iframe.className = CSS2.CLASS_LOOKUP_IFRAME + " " + CSS2.CLASS_LOOKUP_IFRAME_EMPTY;
			divPopup.iframe.style.setProperty("display", "none", "important");				// invisible by default
			divPopup.iframe.style.setProperty("opacity", OPACITY_LOOKUP_MOUSEOUT, "important");
			
			divPopup.iframe.frameBorder = 0;
			divPopup.iframe.addEventListener("load", function(e){
				divPopup.divTitlebar.imgWaiting.style.setProperty("display", "none", "important");
				divPopup.iframe.hasLoadedEventFired = true;
			});
			
			divCell.appendChild(divPopup.iframe);
		divRow.appendChild(divCell);
	divPopup.appendChild(divRow);
	
	// create dragging handle
	var divHandle = divPopup.divHandle = document.createElement('div');
	divHandle.className = CSS2.CLASS_LOOKUP_HANDLE;
	divHandle.divPopup = divPopup;
//	divHandle.style.setProperty("visibility", 'hidden', "important");			// initial
//	divHandle.style.setProperty("background", 'url(' + chrome.extension.getURL('img/handle.png') + ')', "important");
	
	// add popup to DOM
	document.body.appendChild(divPopup);
	
	MakeResizeable(divPopup, divHandle);		// will add it as a child
	divPopup.appendChild(divHandle);

	MakeMoveable(divPopup, divTitlebar);

	// start minimized
	MinimizeLookupPopup(divPopup, true);

	// entry/exit listeners
	function OnMouseOver(e){
		e.currentTarget.iframe.style.setProperty("opacity", 1, "important");
		
//		if(++e.currentTarget.refCount > 0)
//			e.currentTarget.divHandle.style.setProperty("visibility", "visible", "important");
	}
	function OnMouseOut(e){
		e.currentTarget.iframe.style.setProperty("opacity", OPACITY_LOOKUP_MOUSEOUT, "important");
/*		
		// delay hiding
		window.setTimeout(function (divPopup) {
			if(--divPopup.refCount == 0)
				divPopup.divHandle.style.setProperty("visibility", "hidden", "important");
		}, TIMEOUT_HIDEHANDLE, e.currentTarget);
*/	}
	
	divPopup.addEventListener('mouseover', OnMouseOver, false);
	divPopup.addEventListener('mouseout', OnMouseOut, false);
//		divHandle.addEventListener('mouseover', OnMouseOver, false);
//		divHandle.addEventListener('mouseout', OnMouseOut, false);

	// zindex
	arrZIndexLookupPopups.push(divPopup);
	// newly created popups are foregrounded automatically
	SetPositionLookupPopup(divPopup, {foreground:true});
	
	return divPopup;
}

function OnClickButtonQuery(e){			
	var inputQuery = e.currentTarget.divPopup.divTitlebar.inputQuery;

	e.returnValue = false;
	
	if(e.shiftKey == true){
		// shift for tip
		DoTipPopup({
			text: inputQuery.value,
			boundingClientRect: inputQuery.getBoundingClientRect(),
			allowMultiple: false
			}, null);
	}
	else{
		// add ctrl to open query in new lookup, shift to treat query as (relative unless protocol specified) url
		if(e.ctrlKey == true)
			DoLookupPopup(null, inputQuery.value, {createNew: true/*, treatQueryAsURL: e.shiftKey*/});	// null e == center
		else
			LookupQuery(e.currentTarget.divPopup, null, null, {/*treatQueryAsURL: e.shiftKey*/});	// use current contents				
	}
}				

function RemoveAllLookupPopups(opt){
	var divPopups = document.body.getElementsByClassName(CSS2.CLASS_LOOKUP);

	for(var x=0; x < divPopups.length; x++){
		if(opt){
			if(opt.keepPinned == true && divPopups[x].divTitlebar.aPin.pinned == true)
				continue;
		}	
		
		RemoveLookupPopup(divPopups[x]);
		x--;
	}
}

function RemoveLookupPopup(divPopup){
	// remember placement
	SavePlacementLookupPopup(divPopup);
	
	// remove from zIndex
	var i = arrZIndexLookupPopups.indexOf(divPopup);
	if(i != -1){
		arrZIndexLookupPopups.splice(i, 1);	// remove
		RebaseZIndexLookupPopups();			// rebase
	}
	
	// remove from DOM
	document.body.removeChild(divPopup);
}

/////

function RebaseZIndexLookupPopups(){
	// rebase. start with foremost (end)
	for(var x = arrZIndexLookupPopups.length-1; x>=0; x--){
		arrZIndexLookupPopups[x].style.setProperty("z-index", BASEZINDEX_LOOKUPPOPUP + x, "important");
		
		// topmost has CSS2.CLASS_LOOKUP_FOREMOST class, rest just have CSS2.CLASS_LOOKUP
		var is_foremost = (x == (arrZIndexLookupPopups.length-1));
		var is_docked = (arrZIndexLookupPopups[x].dockSide == null ? false : true);
	
		// set classes based on status (lookup & titlebar)
		arrZIndexLookupPopups[x].className = CSS2.CLASS_LOOKUP;
		if(is_foremost)
			arrZIndexLookupPopups[x].classList.add(is_docked == true ? CSS2.CLASS_LOOKUP_DOCKED : CSS2.CLASS_LOOKUP_FOREMOST);
				
		arrZIndexLookupPopups[x].divTitlebar.className = CSS2.CLASS_LOOKUP_TITLEBAR_ROW;
		if(is_foremost)
			arrZIndexLookupPopups[x].divTitlebar.classList.add(is_docked == true ? CSS2.CLASS_LOOKUP_TITLEBAR_ROW_DOCKED : CSS2.CLASS_LOOKUP_TITLEBAR_ROW_FOREMOST);
/*		
		arrZIndexLookupPopups[x].className = CSS2.CLASS_LOOKUP + (is_foremost == true ? 
			" "+ (is_docked == true ? CSS2.CLASS_LOOKUP_DOCKED : CSS2.CLASS_LOOKUP_FOREMOST) : "");
		arrZIndexLookupPopups[x].divTitlebar.className = CSS2.CLASS_LOOKUP_TITLEBAR_ROW + (is_foremost == true ?
			" "+ (is_docked == true ? CSS2.CLASS_LOOKUP_TITLEBAR_ROW_DOCKED : CSS2.CLASS_LOOKUP_TITLEBAR_ROW_FOREMOST) : "");*/
	}
}

function UpdateStatusInIcon(divPopup, opts){
	// update icons
	if(opts && opts.lock){
		divPopup.divTitlebar.aLock.img.src = chrome.extension.getURL(
			'img/' + (divPopup.style.position == "fixed" ? 'locked' : 'unlocked') + '.png');
		divPopup.divTitlebar.aLock.title = divPopup.style.position == "fixed" ? TOOLTIP_LOCK_LOCKED : TOOLTIP_LOCK_UNLOCKED;				
			
		// locked popups have longer shadow
		var boxShadow = "rgba(0, 0, 0, 0.1) 0px 0px 5px";
		if(divPopup.style.position == "fixed"){
			var horizonal = (divPopup.dockSide == "right" ? -5 : 5);
			var vertical = (divPopup.dockSide == "bottom" ? -5 : 5);
			
			boxShadow += ", rgba(0,0,0,0.3) "+horizonal+"px "+vertical+"px 10px";
		}
		divPopup.style.setProperty("-webkit-box-shadow", boxShadow, "important");
/*		
		divPopup.style.setProperty("-webkit-box-shadow", "rgba(0, 0, 0, 0.3) 0px 0px 5px" + 
			(divPopup.style.position == "fixed" ? ", rgba(0,0,0,0.5) 3px 3px 6px" : ""), "important");
		//divPopup.style.setProperty("-webkit-box-shadow", "grey 0px 0px " + (divPopup.style.position == "fixed" ? "20" : "5") + "px", "important");
		//-webkit-box-shadow: rgba(0, 0, 0, 0.292969) 0px 0px 5px, rgba(0, 0, 0, 0.496094) 1px 1px 5px !important;	*/
	}
	// update icon
	if(opts && opts.pin){
		divPopup.divTitlebar.aPin.img.src =  chrome.extension.getURL(
			'img/pin' + (divPopup.divTitlebar.aPin.pinned == true ? 'In' : 'Out') + '.png');			
		divPopup.divTitlebar.aPin.title = divPopup.divTitlebar.aPin.pinned == true ? TOOLTIP_PIN_PINNED : TOOLTIP_PIN_UNPINNED;				
	}
}

/////
			
function ShowLookupPopup(divPopup, show){
	divPopup.style.setProperty("visibility", show ? "visible" : "hidden", "important");
}

function SetPositionLookupPopup(divPopup, metrics){
	// dock
	if(metrics.dock != null){
		if(metrics.dock == true){
			// save old location/lock (take a sneaky copy of the stored one)
			if(divPopup.dockSide == null){		// ignore for redock
				SavePlacementLookupPopup(divPopup);
				divPopup.placementRestoreDock = _clone(placementLookupPopup);
				
				// additionally, keep dimensions of titlebar
				divPopup.placementRestoreDock.scrollWidthTitlebar = divPopup.divTitlebar.scrollWidth;
				divPopup.placementRestoreDock.scrollHeightTitlebar = divPopup.divTitlebar.scrollHeight;
			}
			// process these further on
			metrics.locked = true;
			metrics.pinned = true;
			
			// divided dimension
			var dim = 100 / (metrics.dockDimensionDenominator ? metrics.dockDimensionDenominator : DIMENSIONDENOM_LOOKUP_MIN);
			
			if(metrics.dockSide == "left" || metrics.dockSide == "right"){
				metrics.width = dim + "%";//100 / (metrics.dockDimensionDenominator ? metrics.dockDimensionDenominator : 1) + "%";//"50%";//document.body.clientWidth / 2;
				metrics.height = "100%";//window.innerHeight;
				metrics.clientX = (metrics.dockSide == "right" ? (100 - dim) + "%"/*"50%"*/ : 0);//(metrics.dockSide == "right" ? (document.body.clientWidth / 2) : 0);
				metrics.clientY = 0;
			}
			else if(metrics.dockSide == "top" || metrics.dockSide == "bottom"){
				metrics.width = "100%";//document.body.clientWidth;
				metrics.height = dim + "%";//"50%";//window.innerHeight / 2;
				metrics.clientX = 0;
				metrics.clientY = (metrics.dockSide == "bottom" ? (100 - dim) + "%"/*"50%"*/ : 0);//(window.innerHeight / 2) : 0);
			}
			
			divPopup.dockSide = metrics.dockSide;		// non-null indicator that we're docked
		}
		else{
			// restore from old
			metrics.locked = divPopup.placementRestoreDock.locked;
			metrics.pinned = divPopup.placementRestoreDock.pinned;
			
			if(metrics.undock_dont_restore_origin != true){
				metrics.clientX = divPopup.placementRestoreDock.clientX;	// ditto
				metrics.clientY = divPopup.placementRestoreDock.clientY;	// why //
			}
			else if(metrics.undock_titlebar_centre != null){
				// supplied x&y should be the centre point of the title bar of the popup
				// so we offset the popup so that is true
				metrics.clientX = metrics.undock_titlebar_centre.clientX - (
					(metrics.undock_dont_restore_dimensions == true ? divPopup.divTitlebar.scrollWidth : divPopup.placementRestoreDock.scrollWidthTitlebar) /2);
				metrics.clientY = metrics.undock_titlebar_centre.clientY - (
					(metrics.undock_dont_restore_dimensions == true ? divPopup.divTitlebar.scrollHeight : divPopup.placementRestoreDock.scrollHeightTitlebar) /2);
			}
			
			if(metrics.undock_dont_restore_dimensions != true){
				metrics.width = divPopup.placementRestoreDock.width;
				metrics.height = divPopup.placementRestoreDock.height;
			}
			
			divPopup.dockSide = null;
		}
		
		RebaseZIndexLookupPopups(); 		// update class/colour
	}

	
	// lock (must be first)
	if(metrics.locked != null){
		divPopup.style.setProperty("position", metrics.locked == true ? "fixed" : "absolute", "important");
		// cant call handler directly
		UpdateStatusInIcon(divPopup, {lock:true});
	}

	// pin
	if(metrics.pinned != null){
		divPopup.divTitlebar.aPin.pinned = metrics.pinned;
		// cant call handler directly
		UpdateStatusInIcon(divPopup, {pin:true});
	}

	// foreground
	if(metrics.foreground == true){
		// place divPopup at end of array (fore)
		if(arrZIndexLookupPopups.length >= 1){
			if(arrZIndexLookupPopups.length >= 2){
				var i = arrZIndexLookupPopups.indexOf(divPopup);
				if(i != -1){
					// swap
					var temp = arrZIndexLookupPopups[arrZIndexLookupPopups.length-1];
					arrZIndexLookupPopups[arrZIndexLookupPopups.length-1] = divPopup;
					arrZIndexLookupPopups[i] = temp;
				}
			}
			// rebase
			RebaseZIndexLookupPopups();
		}
	}

	// width/height
	if(metrics.width != null){
		if(typeof(metrics.width) == "number"){
//			var width;
			if(divPopup.style.position == "fixed")		// no wider than client if locked
				metrics.width = Math.min(metrics.width, Math.max(0, document.documentElement.clientWidth - GetScrollBarWidth()) );
//			else
//				width = metrics.width;
			
			divPopup.style.setProperty("width", Math.max(MINWIDTH_LOOKUP, metrics.width ) + 'px', "important");
//			divPopup.divTitlebar.style.setProperty("width", Math.max(MINWIDTH_LOOKUP, metrics.width ) + 'px', "important");
		}
		else
			divPopup.style.setProperty("width", metrics.width, "important");
	}
		
	if(metrics.height != null){
		if(divPopup.divTitlebar.aMinimize.minimized == false){
			if(typeof(metrics.height) == "number"){
//				var height;
				if(divPopup.style.position == "fixed")
					metrics.height = Math.min(metrics.height, Math.max(0, document.documentElement.clientHeight));
//				else
//					height = metrics.height;

				divPopup.style.setProperty("height", Math.max(MINHEIGHT_LOOKUP, metrics.height) + 'px', "important");
			}
			else
				divPopup.style.setProperty("height", metrics.height, "important");
		}else{
			// height equals the titlebar, if there's no iframe displayed
			divPopup.style.setProperty("height", divPopup.divTitlebar.scrollHeight + 'px', "important");
		}

		// remember height for restoration
		//divPopup.heightRestore = Math.max(MINHEIGHT_LOOKUP, metrics.height);
		divPopup.heightRestore = metrics.height;
		if(typeof(metrics.height) == "number")
			divPopup.heightRestore = Math.max(MINHEIGHT_LOOKUP, metrics.height);
	}
	// size children (handle/iframe/etc)
//	OnSizeLookupPopup(divPopup, metrics.width != null ? true : false, metrics.height != null ? true : false );

	// x / y
	var left = null;
	var top = null;
	
	if(metrics.centreX == true){
		left = (window.innerWidth / 2) - (divPopup.offsetWidth / 2);
		// compensate if absolute (moves with scroll)
		if(divPopup.style.postition == "absolute")
			left += window.pageXOffset;
	}
	else if(metrics.clientX != null){
		if(typeof(metrics.clientX) == "number")
			left = metrics.clientX + (divPopup.style.position == "absolute" ? window.pageXOffset : 0);
		else
			left = metrics.clientX;
	}

	if(metrics.centreY == true){
		top = (window.innerHeight / 2) - (divPopup.offsetHeight / 2);
		// compensate if absolute (moves with scroll)
		if(divPopup.style.postition == "absolute")
			top += window.pageYOffset;
	}
	else if(metrics.clientY != null){
		if(typeof(metrics.clientY) == "number")
			top = metrics.clientY  +(divPopup.style.position == "absolute" ? window.pageYOffset : 0);
		else
			top = metrics.clientY;
	}
	
/*	
	if(metrics.centre == true){
//		left = (window.innerWidth / 2) - (parseFloat(divPopup.style.width) / 2);
//		top = (window.innerHeight / 2) - (parseFloat(divPopup.style.height) / 2);
		left = (window.innerWidth / 2) - (divPopup.offsetWidth / 2);
		top = (window.innerHeight / 2) - (divPopup.offsetHeight / 2);
		
		// compensate if absolute (moves with scroll)
		if(divPopup.style.position == "absolute"){
			left += window.pageXOffset;
			top += window.pageYOffset;
		}
	}
	else{
		if(metrics.clientX != null){
			if(typeof(metrics.clientX) == "number")
				left = metrics.clientX + (divPopup.style.position == "absolute" ? window.pageXOffset : 0);
			else
				left = metrics.clientX;
		}
		if(metrics.clientY != null){
			if(typeof(metrics.clientY) == "number")
				top = metrics.clientY  +(divPopup.style.position == "absolute" ? window.pageYOffset : 0);
			else
				top = metrics.clientY;
		}
	}
*/	
	// if another popup (not ours) already here, offset us
	// left and top can be number or string (%)
	if(left != null || top != null){
		// only hitcheck if both are numbers)
		if(metrics.origin_hit_check == true && typeof(left) == "number" && typeof(top) == "number"){
			for(var loop=0; loop < HITCHECK_LOOPCOUNT_LOOKUPPOPUP; loop++){
				var divPopups = document.body.getElementsByClassName(CSS2.CLASS_LOOKUP);

				for(var x=0; x < divPopups.length; x++){
					if(divPopups[x] == divPopup)			// ignore self
						continue;
						
					var left_this = divPopups[x].offsetLeft;//parseFloat(divPopups[x].style.left);
					var top_this = divPopups[x].offsetTop;//parseFloat(divPopups[x].style.top);
					
					if(left > (left_this - HITBOXWIDTH_LOOKUPPOPUP) && left < (left_this + HITBOXWIDTH_LOOKUPPOPUP) &&
						top > (top_this - HITBOXHEIGHT_LOOKUPPOPUP) && top < (top_this + HITBOXWIDTH_LOOKUPPOPUP)){
						// try again
						left += HITOFFSET_LEFT_LOOKUPPOPUP;
						top += HITOFFSET_TOP_LOOKUPPOPUP;
						break;
					}
				}
				
				if(x == divPopups.length)		// got to end without a hit
					break;
			}
		}
		
		// limit depending on fixed/absolute positioning
		// fixed position frame is ignored by parents scroll bars, so limit bottom right to client
		if(typeof(left) == "number"){
			//left = Math.max(0, left);
			if(divPopup.style.position == "fixed")
				left = Math.min(left, document.body.scrollWidth - divPopup.offsetWidth);//window.innerWidth - divPopup.divTitlebar.scrollWidth - GetScrollBarWidth() /*DRAGLIMIT_FIXEDPOSITION_MARGIN_RIGHT*/);
			left = Math.max(0, Math.min(left, document.documentElement.clientWidth)) + "px";
		}
		if(typeof(top) == "number"){
			//top = Math.max(0, top);
			if(divPopup.style.position == "fixed")
				top = Math.min(top, window.innerHeight - divPopup.divTitlebar.scrollHeight);
			top = Math.max(0, Math.min(top, document.documentElement.scrollHeight)) + "px";
		}
		
		
		
		
		
/*		
		// fixed position frame is ignored by parents scroll bars, so limit bottom right to client
		if(divPopup.style.position == "fixed"){
			left = Math.min(left, window.innerWidth - divPopup.divTitlebar.scrollWidth - GetScrollBarWidth());
			top = Math.min(top, window.innerHeight - divPopup.divTitlebar.scrollHeight);
		}*/
		
		// apply
//		divPopup.style.setProperty("left", Math.max(0, Math.min(left, document.documentElement.clientWidth)) + 'px', "important");
//		divPopup.style.setProperty("top", Math.max(0, Math.min(top, document.documentElement.clientHeight)) + 'px', "important");
		divPopup.style.setProperty("left", left, "important");
		divPopup.style.setProperty("top", top, "important");
	}
}

function SavePlacementLookupPopup(divPopup){
	// if docked, store the restore dock structure
	if(divPopup.dockSide != null)
		placementLookupPopup = _clone(divPopup.placementRestoreDock);
	else{
		// store client coords
		
		// should really store the full style.width with units, but it'll always be pixels, plus at least we always get a number.
		// only use it here as its important this number is valid
//		placementLookupPopup.clientX = divPopup.style.left.GetStyleValueAsNumberIfInPixels();
//		placementLookupPopup.clientY = divPopup.style.top.GetStyleValueAsNumberIfInPixels();
		placementLookupPopup.clientX = divPopup.offsetLeft;
		placementLookupPopup.clientY = divPopup.offsetTop;
		
		if(divPopup.style.position == "absolute"){		// convert to client coords from page coords
			if(typeof(placementLookupPopup.clientX) == "number")
				placementLookupPopup.clientX -= window.pageXOffset;
			if(typeof(placementLookupPopup.clientY) == "number")
				placementLookupPopup.clientY -= window.pageYOffset;
		}
		
		// store width and height if poss
		placementLookupPopup.width = divPopup.style.width.GetStyleValueAsNumberIfInPixels();	//divPopup.clientWidth;//parseFloat(divPopup.style.width);
		if(divPopup.divTitlebar.aMinimize.minimized == true && divPopup.heightRestore != null)
			placementLookupPopup.height = divPopup.heightRestore;
		else
			placementLookupPopup.height = divPopup.style.height.GetStyleValueAsNumberIfInPixels();	// divPopup.clientHeight;//parseFloat(divPopup.style.height);
		
		placementLookupPopup.locked = (divPopup.style.position == "fixed" ? true : false);
		placementLookupPopup.pinned = divPopup.divTitlebar.aPin.pinned;
	}
	
	// indicate that its valid to save it
	dirtyPlacementLookupPopup = true;
}

function LookupQuery(divPopup, query, templateId, opts){
	var hash = null;
	var urlTemplate = null;
	var framebuster = null;
	
	// null guidTemplate means use current select option
	if(query == null)
		query = divPopup.divTitlebar.inputQuery.value;
	if(templateId == null)
		templateId = divPopup.divTitlebar.selectTemplate.value;		// value of selected option
	
	// convert id to template
	var options = divPopup.divTitlebar.selectTemplate.options;
	for(var i=0; i<options.length; i++){
		if(options[i].value == templateId){
			urlTemplate = options[i].urlTemplate;
			hash = options[i].hash;
			framebuster = options[i].framebuster;
			break;
		}
	}
	if(urlTemplate == null)
		return;
			
	// clear iframe background once request sent
	divPopup.iframe.className = CSS2.CLASS_LOOKUP_IFRAME;
			
	// set framebuster flag before navigation
	divPopup.iframe.framebuster = framebuster;
			
	// build a url from the template and query (relative)
	divPopup.iframe.hasLoadedEventFired = false;	// reset
	
	if(opts && opts.treatQueryAsURL == true)
		divPopup.iframe.src = query;
	else{
		query = query.replace(/^\s+|\s+$/g, '');
		
		var src = urlTemplate.replace("{searchTerms}", encodeURIComponent(query))/* + (hash ? ("#" + hash) : "")*/;
		src = src.replace("{locationHash}", location.hash);
		src = src.replace("{locationHost}", location.host);
		src = src.replace("{locationHostname}", location.hostname);
		src = src.replace("{locationHref}", location.href);
		src = src.replace("{locationPathname}", location.pathname);
		src = src.replace("{locationPort}", location.port);
		src = src.replace("{locationProtocol}", location.protocol);
		src = src.replace("{locationSearch}", location.search);

//		if(hash)
//			src += "#" + hash;
		
		divPopup.iframe.src = src;
	}
	
	// never load into minimised lookup
	MinimizeLookupPopup(divPopup, false);
	
	// show waiting
	divPopup.divTitlebar.imgWaiting.style.setProperty("display", "", "important");

	// fire fake focus event to query so it turns off hint mode if its on
	var e = document.createEvent("Event");
	e.initEvent("focus", false, true);
	divPopup.divTitlebar.inputQuery.dispatchEvent(e);
	// then update title query string
	divPopup.divTitlebar.inputQuery.value = query;
	
	// update title template select
//		divPopup.divTitlebar.selectTemplate.value = templateId;
	// hide query button (until next text change)
//		divPopup.divTitlebar.buttonQuery.style.display = "none";
	// update select template
	divPopup.divTitlebar.selectTemplate.value = templateId;
	// update popup icon from favicon
	var src = "http://getfavicon.appspot.com/" + divPopup.iframe.src;
	divPopup.divTitlebar.aLogo.img.src = src + (src.indexOf("?") == -1 ? "?" : "&") + "defaulticon=bluepng";

	// save last* values so if the popup is copied these are carried over
	divPopup.divTitlebar.inputQuery.lastQuery = query;
	divPopup.divTitlebar.selectTemplate.lastTemplateId = templateId;
}

function MinimizeLookupPopup(divPopup, minimize){
	// save old height (if minimizing)
	if(minimize == true && divPopup.style.height != ""){
//		divPopup.heightRestore = divPopup.clientHeight;//parseFloat(divPopup.style.height);
		divPopup.heightRestore = divPopup.style.height.GetStyleValueAsNumberIfInPixels();
/*				
		if(divPopup.style.height.lastIndexOf("px") == (divPopup.style.height.length - 2))
			divPopup.heightRestore = parseFloat(divPopup.style.height);
		else
			divPopup.heightRestore = divPopup.style.height;*/
	}

	divPopup.iframe.style.setProperty("display", (minimize == true ? "none" : ""), "important");

	// sync icon & status
	divPopup.divTitlebar.aMinimize.minimized = (minimize == true ? true : false);
	divPopup.divTitlebar.aMinimize.img.src = chrome.extension.getURL('img/' + (minimize == true ? 'chevron-expand' : 'chevron') + '.png');
	divPopup.divTitlebar.aMinimize.title = minimize == true ? TOOLTIP_MINIMIZE_MINIMIZED : TOOLTIP_MINIMIZE_RESTORED;

	// height equals the titlebar, as there's no iframe displayed
/*		if(minimize == true)
		divPopup.style.setProperty("height", divPopup.divTitlebar.scrollHeight + 'px', "important");
	else*/
		SetPositionLookupPopup(divPopup, {height: divPopup.heightRestore});
		
//		divPopup.style.setProperty("height", (minimize == true ? divPopup.divTitlebar.scrollHeight : divPopup.heightRestore) + 'px', "important");


//	OnSizeLookupPopup(divPopup, true, true);
}

// Makes a box moveable by dragging its top margin.
function MakeMoveable(divPopup, divTitlebar/*box, margin*/) {
	var last_position = {x: 0, y: 0};

	function moveListener(e) {
		e.preventDefault();

		// undock?
		if(divPopup.dockSide != null){
			// the current point becomes the centre of the now undocked titlebar
			SetPositionLookupPopup(divPopup,
				{dock:false, undock_dont_restore_origin: true, undock_titlebar_centre: {clientX: e.clientX, clientY: e.clientY} });
			return;
		}
	
		var moved = {x: (e.clientX - last_position.x),
					 y: (e.clientY - last_position.y)};
					
		last_position = {x: e.clientX, y: e.clientY};
	
		var new_top = Math.max(0, divPopup.offsetTop + moved.y);
		var new_left = Math.max(0, divPopup.offsetLeft + moved.x);
		
//		SetPositionLookupPopup(divPopup, {clientX: e.clientX, client_Y: e.clientY});
		
		// fixed position frame is ignored by parents scroll bars, so limit bottom right to client
		if(divPopup.style.position == "fixed"){
			//new_left = Math.min(window.innerWidth - divPopup.divTitlebar.scrollWidth - divPopup.widthScrollbar, new_left);
			new_left = Math.min(document.body.scrollWidth - divPopup.offsetWidth, new_left);
			new_top = Math.min(window.innerHeight - divPopup.divTitlebar.scrollHeight, new_top);
		}
				
		divPopup.style.setProperty("top", new_top + 'px', "important");
		divPopup.style.setProperty("left", new_left + 'px', "important");

		
		
		// mousemove causes iframe to get mouseout
		divPopup.iframe.style.setProperty("opacity", 1, "important");			
	
		// save last position to DOM
		SavePlacementLookupPopup(divPopup);
	}

	// listen for mousedown on specific classes of element
	divTitlebar.addEventListener('mousedown', function(e) {
		// left only
		if(e.button != 0)
			return;
	
		// clicking anywhere sets foreground
		SetPositionLookupPopup(e.currentTarget.divPopup, {foreground:true});
	
//		if(e.toElement.className == CLASS_LOOKUPPOPUP_ANCHORBUTTON){
//			e.preventDefault();
//			return;
//		}

	
		//if(e.toElement.classNameContains([CSS2.CLASS_LOOKUP_TITLEBAR_CELL]) == true){
		if(e.toElement.classList.contains(CSS2.CLASS_LOOKUP_TITLEBAR_CELL) == true){
//		if(e.toElement.className == CLASS_LOOKUPPOPUP_TITLEBAR ||
//			e.toElement.className == CLASS_LOOKUPPOPUP_TITLEBAR_CELL_LEFT || e.toElement.className == CLASS_LOOKUPPOPUP_TITLEBAR_CELL_RIGHT){
			//
			e.preventDefault();
			
			
			
//			if(e.shiftKey == true){
//				// fake click on minimize/restore button
//				var mouseClickEvent = document.createEvent("MouseEvent");
//				mouseClickEvent.initMouseEvent("click", true, true, window, 0,
//					0,0,0,0,
//					true, event.altKey, event.shiftKey, event.metaKey,          // always ctrl (keep window open)
//					0, null);
				
//				e.currentTarget.aMinimize.dispatchEvent(mouseClickEvent);
//				return;
//			}

			last_position = {x: e.clientX, y: e.clientY};
			// cache for moveListener
			//e.currentTarget.divPopup.widthScrollbar = GetScrollBarWidth();

			// allow drag not to mouseout
			layer = document.createElement('div');
			layer.style.position = 'fixed';//divPopup.style.position;//'absolute';
			layer.style.top = '0px';
			layer.style.left = '0px';
//			layer.style.width = divPopup.style.width;//'100%';
//			layer.style.height = divPopup.style.height;//'100%';
			layer.style.width = '100%';
			layer.style.height = '100%';
			layer.style.opacity = 0;
			layer.style.zIndex = e.currentTarget.divPopup.style.zIndex + 1;//BASEZINDEX_LOOKUPPOPUP + 1;
			document.body.appendChild(layer);
			
			window.addEventListener('mousemove', moveListener);
			window.addEventListener('mouseup', function(e) {
				window.removeEventListener('mousemove', moveListener);
				
				try{
//					// save last position to DOM
//					SavePlacementLookupPopup(divPopup);
					
					document.body.removeChild(layer);
				}catch (e){ }
				
//				e.preventDefault();
			});
		}
	});
}

function MakeResizeable(divPopup, divHandle){
	var last_position = {x: 0, y: 0};
	var ruler = document.createElement('div');
	ruler.style.visibility = 'none';
	ruler.style.width = '100px';
	
//	divHandle.style.position = 'absolute';			// must always be this

	// TODO: fix 'sticking' move
	function moveListener(e) {
		// undock?
		if(divPopup.dockSide != null){
			// just undock without changing any size/location
			SetPositionLookupPopup(divPopup, 
				{dock:false, undock_dont_restore_origin: true, undock_dont_restore_dimensions: true});
			return;
		}

		// amount moved since last event
		var moved = {x: (e.clientX - last_position.x),
					 y: (e.clientY - last_position.y)};

		var zoom_ratio = parseFloat(document.defaultView.getComputedStyle(ruler, null).getPropertyValue('width')) / 100;;
		
		var height = divPopup.offsetHeight;//parseFloat(document.defaultView.getComputedStyle(divPopup, null).getPropertyValue('height'));
		var width = divPopup.offsetWidth;//parseFloat(document.defaultView.getComputedStyle(divPopup, null).getPropertyValue('width'));

		var new_height = (height + moved.y) / zoom_ratio;
		var new_width = (width + moved.x) / zoom_ratio;

		var setHeight = false;
		var setWidth = false;

		// if no iframe, can only change width
		if (divPopup.divTitlebar.aMinimize.minimized == false){
			//if(moved.y > 0 || new_height >= MINHEIGHT_LOOKUP)
			if(new_height >= MINHEIGHT_LOOKUP && new_height <= divPopup.maxLookupHeight/*document.documentElement.clientHeight*/){
				last_position.y = e.clientY;
				
				divPopup.style.setProperty("height", new_height + 'px', "important");

				// save here also, for minimize function
				divPopup.heightRestore = new_height;
				setHeight = true;
			}
		}
		else{
			// height equals the titlebar, if there's no iframe displayed
			divPopup.style.setProperty("height", divPopup.divTitlebar.scrollHeight + 'px', "important");
			setHeight = true;
		}
	
		//if (moved.x > 0 || new_width >= MINWIDTH_LOOKUP)
		if(new_width >= MINWIDTH_LOOKUP && new_width <= divPopup.maxLookupWidth/*document.documentElement.clientWidth - scroll*/){
			last_position.x = e.clientX;
			divPopup.style.setProperty("width", new_width + 'px', "important");
//			divPopup.divTitlebar.style.setProperty("width", new_width + 'px', "important");
			
			// titlebar always the same size as the popup, if minimized
//				if(divPopup.divTitlebar.aMinimize.minimized == true)
//					divPopup.divTitlebar.style.height = divPopup.scrollHeight + "px";
			
			setWidth = true;
		}

		// mousemove causes iframe to get mouseout
		divPopup.iframe.style.setProperty("opacity", 1, "important");			
		
		/*			
		
		
		// if no iframe, can only change width
		if(divPopup.divTitlebar.aMinimize.minimized == false && (moved.y > 0 || new_height >= MINHEIGHT_LOOKUP)) {
			last_position.y = e.clientY;
			
			divPopup.style.setProperty("height", new_height + 'px', "important");

			// save here also, for minimize function
			divPopup.heightRestore = new_height;
			setHeight = true;
		}
	
		if (moved.x > 0 || new_width >= MINWIDTH_LOOKUP) {
			last_position.x = e.clientX;
			divPopup.style.setProperty("width", new_width + 'px', "important");

			if(divPopup.divTitlebar.aMinimize.minimized == true){
				// height equals the titlebar, if there's no iframe displayed
				divPopup.style.setProperty("height", divPopup.divTitlebar.scrollHeight + 'px', "important");
				setHeight = true;
			}
			
			// titlebar always the same size as the popup, if minimized
//				if(divPopup.divTitlebar.aMinimize.minimized == true)
//					divPopup.divTitlebar.style.height = divPopup.scrollHeight + "px";
			
			setWidth = true;
		}


*/	
//		OnSizeLookupPopup(divPopup, setWidth, setHeight);

		if(setWidth == true || setHeight == true){
			// save last position to DOM
			SavePlacementLookupPopup(divPopup);
		}
		
		e.preventDefault();
	}// end func

	divHandle.addEventListener('mousedown', function(e) {
		// clicking anywhere sets foreground
		SetPositionLookupPopup(e.currentTarget.divPopup, {foreground:true});

		// calculate maximum width/height lookup can have based on its current position
		var divPopup = e.currentTarget.divPopup;
		var clientRect = divPopup.getBoundingClientRect();
		divPopup.maxLookupHeight = Math.max(0, document.documentElement.clientHeight - clientRect.top);
		divPopup.maxLookupWidth = Math.max(0, document.documentElement.clientWidth - clientRect.left);
		
		last_position = {x: e.clientX, y: e.clientY};
		window.addEventListener('mousemove', moveListener);
		
		// layer to allow dragging without triggering mouseout
		layer = document.createElement('div');
		document.body.appendChild(layer);
		layer.style.position = 'fixed';//'absolute';
		layer.style.top = '0px';
		layer.style.left = '0px';
		layer.style.width = '100%';
		layer.style.height = '100%';
		layer.style.opacity = '0';
		layer.style.zIndex = e.currentTarget.divPopup.style.zIndex + 1;//BASEZINDEX_LOOKUPPOPUP+1;

		document.body.appendChild(ruler);

		window.addEventListener('mouseup', function(e) {
			window.removeEventListener('mousemove', moveListener);

			// save last position to DOM
//			SavePlacementLookupPopup(divPopup);
			
			try {document.body.removeChild(ruler);} catch (e) {}
			try {document.body.removeChild(layer);} catch (e) {}
			
			e.preventDefault();
		});
		
		e.preventDefault();
	});

	// initial position iframe to fill popup
//	OnSizeLookupPopup(divPopup, true, true);
	// initial position handle
//	divHandle.style.setProperty("left", divPopup.style.width, "important");
//	divHandle.style.setProperty("top", divPopup.style.height, "important");
}
/*
function OnSizeLookupPopup(divPopup, setWidth, setHeight){
	// iframe child doesnt move automatically, so move it and account for title div too
	if(setWidth == true){
		//divPopup.iframe.style.width = divPopup.style.width;
		//divPopup.divHandle.style.setProperty("left", Math.min(parseFloat(divPopup.style.width), max_left) + "px", "important");
		//divPopup.iframe.style.setProperty("width", divPopup.clientWidth + "px", "important");
		divPopup.divHandle.style.setProperty("left", divPopup.offsetWidth + MARGINLEFT_HANDLE + "px", "important");
		
//			divPopup.divTitlebarBG.style.width = divPopup.divTitlebar.scrollWidth + "px";
//			divPopup.divTitlebarBG.style.height = divPopup.divTitlebar.scrollHeight + "px";
		
		// titlebarBG will have no height as it has no contents, so always sync that
//			var cstyleTitlebar = document.defaultView.getComputedStyle(divPopup.divTitlebar, null);
//			divPopup.divTitlebarBG.style.height = cstyleTitlebar.height;
	}
	
	if(setHeight == true){
		//divPopup.iframe.style.height = Math.max(0, parseFloat(divPopup.style.height) - divPopup.divTitlebar.offsetHeight) + "px";
//		divPopup.iframe.style.setProperty("height", Math.max(0, divPopup.clientHeight - divPopup.divTitlebar.offsetHeight) + "px", "important");
		//divPopup.divHandle.style.setProperty("top", Math.min(parseFloat(divPopup.style.height), max_top) + "px", "important");
		divPopup.divHandle.style.setProperty("top", divPopup.offsetHeight + MARGINTOP_HANDLE + "px", "important");
	}
}
*/
// Checks whether a click event was inside the current popup frame.
function IsClickInsideFrame(e, divPopup) {
	var position = document.defaultView.getComputedStyle(divPopup, null).getPropertyValue('position');

	if (position == 'absolute') {
		var x = e.pageX;
		var y = e.pageY;
	} else if (position == 'fixed') {
		var x = e.clientX;
		var y = e.clientY;
	}
	
	var zoom_ratio = GetZoomRatio();
	x /= zoom_ratio;
	y /= zoom_ratio;

	// popup
	if (x >= divPopup.offsetLeft &&
		x <= divPopup.offsetLeft + divPopup.offsetWidth &&
		y >= divPopup.offsetTop &&
		y <= divPopup.offsetTop + divPopup.offsetHeight) {
		return true;
	}
	
	// account for handle (child of popup)
	if(divPopup.divHandle){
		if (x >= (divPopup.divHandle.offsetLeft + divPopup.offsetLeft) &&
			x <= (divPopup.divHandle.offsetLeft + divPopup.offsetLeft)  + divPopup.divHandle.offsetWidth &&
			y >= (divPopup.divHandle.offsetTop + divPopup.offsetTop) &&
			y <= (divPopup.divHandle.offsetTop + divPopup.offsetTop) + divPopup.divHandle.offsetHeight) {
			return true;
		}
	}
  
	return false;
}

// Returns the document body's zoom ratio.
function GetZoomRatio() {
	var zoom_ratio = document.defaultView.getComputedStyle(document.body, null).getPropertyValue('zoom');
	return parseFloat(zoom_ratio || '0');
}

////////////////////////////
// TODO: in helper.js?

String.prototype.GetStyleValueAsNumberIfInPixels = function() {
	if(this.length == 0)
		return 0;
		
	if(this.length > 2 && this.lastIndexOf("px") == (this.length - 2))
		return parseFloat(this);
	
	return this;
}
