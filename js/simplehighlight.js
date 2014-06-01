// TODO :1319 check layer

///////////////
// Globals

var classSuffixHighlight = "_" + RandomString(6);
var CLASS_HIGHLIGHT1 = "simplehl1" + classSuffixHighlight;
var CLASS_HIGHLIGHT2 = "simplehl2" + classSuffixHighlight;
var CLASS_HIGHLIGHT3 = "simplehl3" + classSuffixHighlight;
var CLASS_HIGHLIGHT4 = "simplehl4" + classSuffixHighlight;
var CLASS_HIGHLIGHT5 = "simplehl5" + classSuffixHighlight;
var CLASS_HIGHLIGHT6 = "simplehl6" + classSuffixHighlight;
var CLASS_HIGHLIGHT7 = "simplehl7" + classSuffixHighlight;

var ID_STYLERULE_HIGHLIGHTS = "simplehl_hlstyle_"+RandomString(6);//"idHighlights";
var ID_STYLERULE_FLASH = "simplehl_flashstyle_"+RandomString(6);//"idFlashStyle";

//var ID_PREFIX_SIMPLEHIGHLIGHT = "ID";

var NODENAME_SPAN = "SPAN";

var CONFIRM_REMOVE_ALL = "Are you sure you would like to remove every highlight on this page? This action can not be undone.";
//var CONFIRM_LEAVE = "The page you are about to leave contains unstored highlights which may be lost if you continue. What do you wish to do?";
var CONFIRM_LEAVE = "The highlights on this page either have not been stored yet or are in a different state to those currently stored.\n\nIf you leave they may be forgotten or out of date.";
var CONFIRM_FRAMEBUSTER = "A lookup session that is currently loading is also attempting to navigate the browser to another page.\n\nDo you wish to allow this?";
var CONFIRM_DELETE = "Are you sure you would like to delete the highlight and all of its contents? This action can not be undone.";
var PROMPT_NOTE = "Enter a note for this highlight, or leave it blank if you don't wish to add anything.";
var EXAMPLE_NOTE = "";

var BASEZINDEX_LOOKUPPOPUP = 1000000;//65535;

var OPACITY_BUTTON_DISABLED = 0.4;
var OPACITY_BUTTON_ENABLED = 1;

var __DEBUG = false;

/////////////////
// class

// will also contain cache of some variables
var arrayPrefHLToClassName = [
	{prefHL: PREFERENCE_HL1, className: CLASS_HIGHLIGHT1 },
	{prefHL: PREFERENCE_HL2, className: CLASS_HIGHLIGHT2 },
	{prefHL: PREFERENCE_HL3, className: CLASS_HIGHLIGHT3 },
	{prefHL: PREFERENCE_HL4, className: CLASS_HIGHLIGHT4 },
	{prefHL: PREFERENCE_HL5, className: CLASS_HIGHLIGHT5 },
	{prefHL: PREFERENCE_HL6, className: CLASS_HIGHLIGHT6 },
	{prefHL: PREFERENCE_HL7, className: CLASS_HIGHLIGHT7 }
];

var eventContextMenu = null;
var selectionContextMenu = null;

var eventMouseMoveSummary = {target: null, x: null, y: null };

var maxSnippetLength = null;

var msgScrollIntoView = null;
var msgSetNote = null;
var msgRemoveHighlight = null;
var msgSelectHighlight = null;
var msgShowTipPopup = null;
var msgLookupHighlight = null;
var msgSetTranslatedSnippet = null;
var msgSetShowStatus = null;
var msgSetTipPopupText = null;

var popupPageYOffset = null;

var arrJournal = [];    
var numJournalErrors = 0;

var isDirty = false;

var autoSave = null;
var autoSaveStore = null;
var arrayFirstHighlightNodes = [];               // per document. window may contain more than one document

var statePopupButtonShowAllTrans = null;
var statePopupButtonShowAllNotes = null;

var warnOnBeforeUnload = null;
	
var tabURLWithHashRemoved = null;
	
//////////////////////////
// functions

function Main() {
	// to enable each document to listen for a message (only one can listen to a specific message at a time), create
	// a random msg name
	msgScrollIntoView = "scrollIntoView_" + RandomString(8);
	msgSetNote = "setNote_" + RandomString(8);
	msgRemoveHighlight = "removeHighlight_" + RandomString(8);
	msgSelectHighlight = "selectHighlight_" + RandomString(8);
	msgShowTipPopup = "showTipPopup_" + RandomString(8);
	msgLookupHighlight = "lookupHighlight_" + RandomString(8);
	msgSetTranslatedSnippet = "setTranslatedSnippet_" + RandomString(8);
	msgSetShowStatus = "setShowStatus_" + RandomString(8);
	msgGetShowStatus = "getShowStatus_" + RandomString(8);
	msgSetTipPopupText = "setTipPopupText_" + RandomString(8);
	
	chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
		if(request.msg == "onClickContextMenu"){
			OnClickContextMenu( request.prefHL, {viaShortcut:false} );
		}else if(request.msg == "getPopupPageYOffset"){
			sendResponse(popupPageYOffset);
		}else if(request.msg == "setPopupPageYOffset"){
			popupPageYOffset = request.popupPageYOffset;

			if(__DEBUG == true)
				console.log("setPopupPageYOffset " + popupPageYOffset);
		}else if(request.msg == msgRemoveHighlight){
			sendResponse(RemoveHighlight(arrayFirstHighlightNodes[request.index], request.deleteContents));
		}else if(request.msg == msgSelectHighlight){
			sendResponse(SelectHighlight(arrayFirstHighlightNodes[request.index]));
		}else if(request.msg == msgShowTipPopup){
			DoTipPopup({firstNode: arrayFirstHighlightNodes[request.index], allowMultiple: false, togglePopup: true});
			sendResponse();
		}else if(request.msg == msgLookupHighlight){
			DoLookupPopup(null, arrayFirstHighlightNodes[request.index].SimpleHighlight.textComplete);
			sendResponse();
		}else if(request.msg == msgSetNote){
			if(!request.errorHTML){		// discard if error
				sendResponse(SetNote(arrayFirstHighlightNodes[request.index], 
					request.data.note));
			}
		}else if(request.msg == msgSetTranslatedSnippet){
			if(!request.errorHTML){		// discard if error
				sendResponse(SetTranslatedSnippet(arrayFirstHighlightNodes[request.index], 
					request.data.note, 
					request.data.nameSrcLanguage,
					request.data.nameDestLanguage,
					request.data.urlSrcLanguageIcon));
			}
		}else if(request.msg == msgSetTipPopupText){
			sendResponse(OnSetTipPopupText(request.index, request.templateId, request.data));
		}else if(request.msg == msgSetShowStatus){
			// store these in the DOM so they persist when popup closes
			if(request.itemType == "showTranslatedSnippet")
				arrayFirstHighlightNodes[request.index].SimpleHighlight.showTranslatedSnippet = request.show;
			else if(request.itemType == "showNote")
				arrayFirstHighlightNodes[request.index].SimpleHighlight.showNote = request.show;
			else if(request.itemType == "showAllTrans")
				statePopupButtonShowAllTrans = request.show;		// no index
			else if(request.itemType == "showAllNotes")
				statePopupButtonShowAllNotes = request.show;		// no index
		}else if(request.msg == msgScrollIntoView){
			if(request.alignToTop != null)
				arrayFirstHighlightNodes[request.index].scrollIntoView(request.alignToTop);

			// always flash
			chrome.extension.sendRequest({ msg: "getPreference", key: [PREFERENCE_FLASHDURATION, PREFERENCE_FLASHITERATIONCOUNT, PREFERENCE_FLASHDIRECTION] }, function response(arrayPrefs) {
				// initiate animation (remove then add)
				SetHighlightStyle(arrayFirstHighlightNodes[request.index], "-webkit-animation-name", "none");

				window.setTimeout(function() {
					SetHighlightStyle(arrayFirstHighlightNodes[request.index], "-webkit-animation-duration", arrayPrefs[PREFERENCE_FLASHDURATION]);
					SetHighlightStyle(arrayFirstHighlightNodes[request.index], "-webkit-animation-iteration-count", arrayPrefs[PREFERENCE_FLASHITERATIONCOUNT]);
					SetHighlightStyle(arrayFirstHighlightNodes[request.index], "-webkit-animation-direction", arrayPrefs[PREFERENCE_FLASHDIRECTION]);

//					SetHighlightStyle(arrayFirstHighlightNodes[request.index], null, true, OnWebkitAnimationEnd);   // clears name to stop it retriggering
					SetHighlightStyle(arrayFirstHighlightNodes[request.index], "-webkit-animation-name", "flash");
				}, 0);
			});
		}
		else if(request.msg == MSG_TIP_CONTENT_ONCLICKANCHOR){
			// in tippopup.js
			OnClickAnchorIFrame(request);
		}
		else if(request.msg == MSG_TIP_CONTENT_ONSIZECHANGE){
			// in tippopup.js
			OnSizeChangeIFrame(request);
		}
	});
	
	LoadPreferences();

	// lookup and tip styles
	var elemParent = (document.head ? document.head : (document.body ? document.body : document));	// TODO: can document be legal parent for style??
	var arr = [		// null is chrome
		{type: "lookup", cssId: [
			CSSID_CHROME]},
		{type: "tip", cssId: [
			CSSID_CHROME, 
/*			CSSID_MEDIAWIKI, 
			CSSID_YAHOOWEB,
			CSSID_TWITTER, 
			CSSID_GOOGLEIMAGESEARCH,*/
		]}
	];
	
	for(var q in arr){
		for(var r in arr[q].cssId){
			var style = document.createElement('style');
			style.textContent = CSS2.BuildStyleSheet(arr[q].type, arr[q].cssId[r]);
			elemParent.appendChild(style);
		}
	}
	
	
/*	
	var styleElem = document.createElement('style');

	// general
	styleElem.textContent = GetStyleElementInnerText();
	// MediaWiki specific styles
	styleElem.textContent += " " + BuildMWStyleRules(CLASSSUFFIX_TIPPOPUP_MEDIAWIKI);



	var X = CSS2.BuildStyleSheet("tip", ID_TIPPOPUP_WIKIPEDIA);
	styleElem.textContent = CSS2.BuildStyleSheet("lookup", null);
//	console.log(X);
	
	elemParent.appendChild(styleElem);
*/	

		
	// TODO: why does chromesource:// url not give correct object contents (sheet.rules)
/*		
	var link = document.createElement('link');
	link.id = "xxx";
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = chrome.extension.getURL("css/wikimedia.css");
	document.head.appendChild(link);
	
	var rules = link.sheet.rules;
	for(var q=0; q<rules.length; q++){
		rules[q].selectorText += " FUCK";
		
		var style = rules[q].style;
		var lengthStyle = style.length;
		for(var r=0; r<lengthStyle; r++)
			style.setProperty(style[0], style.getPropertyValue(style[0]), "important");
	}
*/
	document.addEventListener('contextmenu', function (event) {
		// store the target element, before context menu options (hopefully)
		eventContextMenu = event;

		if(__DEBUG == true)
			console.log("EventListener(contextmenu) Selection isCollapsed=" + document.getSelection().isCollapsed);
	}, false);
	
	window.addEventListener("beforeunload", function(e){
		if(arrZIndexLookupPopups.length > 0){
			// warn if event was triggered by an frame attempting to bust
			for(var q=0; q<arrZIndexLookupPopups.length; q++){
				if(arrZIndexLookupPopups[q].iframe && arrZIndexLookupPopups[q].iframe.framebuster == true && arrZIndexLookupPopups[q].iframe.hasLoadedEventFired == false)
					return CONFIRM_FRAMEBUSTER;
			}
		}
		
		// check if there are any SPAN elements with our highlight class names
		if(warnOnBeforeUnload == true && isDirty == true && arrayFirstHighlightNodes.length > 0)
			return CONFIRM_LEAVE;
	});
	
	window.addEventListener('unload', function(e) {
		if(saveLookupPopupOnUnload == true && dirtyPlacementLookupPopup == true){
			// store lookup popup placement via remove() call
			chrome.extension.sendRequest({ msg: "setPreference", key: PREFERENCE_LOOKUPPOPUP_PLACEMENT, value: placementLookupPopup });
		}
	});
	
	window.addEventListener('unload', function(e){
		// release tip object data for anything that hasn't done itself
		var elems = document.getElementsByClassName(CSS2.CLASS_TIP);
		for(var x=0; x<elems.length; x++)
			chrome.extension.sendRequest({msg:"releaseTipObject", id: elems[x].id});
	});

	// Lookup activate
	function OnClickActivateLookupPopup(e){
		if(mouseActivateLookupPopup == null)			// early activation
			return;
			
		if(mouseActivateLookupPopup.enabled != true)
			return;
		if(mouseActivateLookupPopup.dbl != (e.type == "dblclick" ? true : false) ||
			mouseActivateLookupPopup.button != e.button ||
			mouseActivateLookupPopup.ctrlKey != e.ctrlKey || 
			mouseActivateLookupPopup.shiftKey != e.shiftKey ||
			mouseActivateLookupPopup.altKey != e.altKey)
			return;
		
		OnShortcut(PREFERENCE_LOOKUP);
	}
	window.addEventListener('dblclick', OnClickActivateLookupPopup);
	window.addEventListener('mouseup', OnClickActivateLookupPopup);
	
	window.addEventListener('mousedown', function(e){		// use mouseup because mousedown fires on scrollbar clicks
		if(e.button != 0)		// left only
			return;
			
		// assume scrollbar hit if this is target
		if(e.target == document.documentElement){
			if(__DEBUG == true)
				console.log("mousedown on htmlroot");
			return;
		}
	
		// remove all unpinned lookups when the click is NOT in ANY of them
		var divPopups = document.getElementsByClassName(CSS2.CLASS_LOOKUP);
		for(var x=0; x<divPopups.length; x++){
			if(IsClickInsideFrame(e, divPopups[x]) == true)
				break;
		}
		
		if(x != 0 && x == divPopups.length)
			RemoveAllLookupPopups({keepPinned: true});
	}, false);
	
	// TipPopup activate
	window.addEventListener('mouseup', function(e){
		if(e.button != 0)		// left only
			return;

		// remove all tippopups except the one thats clicked on
		var divPopups = document.getElementsByClassName(CSS2.CLASS_TIP);
		for(var x=divPopups.length-1; x>=0; x--){
			if(IsClickInsideFrame(e, divPopups[x]) == false)
				RemoveTipPopup(divPopups[x]);
		}
	}, false);
	
	function OnClickActivateTipPopup(e){
		if(mouseActivateTipPopup == null)			// early activation
			return;
			
		if(mouseActivateTipPopup.enabled != true)
			return;
		if(mouseActivateTipPopup.dbl != (e.type == "dblclick" ? true : false) ||
			mouseActivateTipPopup.button != e.button ||
			mouseActivateTipPopup.ctrlKey != e.ctrlKey || 
			mouseActivateTipPopup.shiftKey != e.shiftKey ||
			mouseActivateTipPopup.altKey != e.altKey)
			return;
		
		OnShortcut(PREFERENCE_TIPPOPUP);
	}
	window.addEventListener('dblclick', OnClickActivateTipPopup);
	window.addEventListener('mouseup', OnClickActivateTipPopup);
	
	// TODO: assess impact of storing each element
	document.addEventListener("mousemove", function(e){
		if(useWordUnderCursor_LookupPopup == true || useWordUnderCursor_TipPopup == true){
			if(eventMouseMoveSummary.target != e.target)
				eventMouseMoveSummary.target = e.target;
				
			eventMouseMoveSummary.x = e.x;
			eventMouseMoveSummary.y = e.y;
		}
	}, false);

	
	// if the tabs url matches one in storage, load its highlights
	chrome.extension.sendRequest({ msg: "getSendersTab" }, function response(tab) {
		// cache tab url with hash removed
		tabURLWithHashRemoved = tab.url.RemoveHash();
		
		chrome.extension.sendRequest({ msg: "loadHighlights", url: tabURLWithHashRemoved, store: "auto" }, function response(arrayHighlights) {
			if(arrayHighlights){
				PlayIntoJournal(arrayHighlights, {
					dontSetDirty: true,
				});		// dontSetDirty=true

				// always clean after onload
//				SetDirty(numJournalErrors == 0 ? false : true);
				SetDirty(false);			// if journal errors, its clean (red/green tick) BUT can only ID errors from mouseover omnibar icon

/*			
				// 'play back' the array
				RemoveAllHighlights();		// should get numJournalErrors == 0 && arrJournal.length == 0
				//  href: listItems[x].SimpleHighlight.arrayInfo.href,
				//  xpathRange: listItems[x].SimpleHighlight.arrayInfo.xpathRange,
				//  prefHL: listItems[x].SimpleHighlight.arrayInfo.prefHL,
				
				//  note: listItems[x].SimpleHighlight.arrayInfo.note

				//  date: new Date(listItems[x].SimpleHighlight.arrayInfo.date),
				//  id: listItems[x].SimpleHighlight.arrayInfo.id
				
				var locationHREFWithHashRemoved = location.href.RemoveHash();
				
				for(var q=0; q<arrayHighlights.length; q++){
					// will contain highlights for every frame of the window. if none, check with tab url instead
					if(arrayHighlights[q].href){
						if(arrayHighlights[q].href != locationHREFWithHashRemoved)
							continue;
					}
					else{
						if(locationHREFWithHashRemoved != tabURLWithHashRemoved)
							continue;
					}
					
//					if(arrayHighlights[q].href && (arrayHighlights[q].href != location.href.RemoveHash()))
//						continue;       
					
					if(arrayHighlights[q].verb == "highlight"){
						// convert xpathRange into range
						var range = GetRangeFromXPathRange(arrayHighlights[q].xpathRange);
						if(range == null){
							numJournalErrors++;			// RESET THIS WHEN MOVED TO PLAYARRAY() (ALONG WITH REMOVEALL)
							continue;
						}

						// make date an actual object (doesnt parse back to object)
						arrayHighlights[q].date = new Date(arrayHighlights[q].date);
					
						// highlight it
						var firstNode = HighlightSelection(arrayHighlights[q].prefHL, range,
							{date: arrayHighlights[q].date, id: arrayHighlights[q].id,
							 ignoreAutoSave: true, dontUpdatePageAction: true//, dontAddToJournal: true
						} );
					}
					else{
						// all the other verbs need id, so share the routine
						var firstNode = GetFirstNodeFromId(arrayHighlights[q].id);
						if(firstNode == null){
							numJournalErrors++;
							continue;
						}
					
						if(arrayHighlights[q].verb == "setNote"){
							if(arrayHighlights[q].note && arrayHighlights[q].note.length > 0){
								SetNote(firstNode, arrayHighlights[q].note,
									{ignoreAutoSave: true, dontUpdatePageAction: true//, dontAddToJournal: true
								} );
							}
						}
						else if(arrayHighlights[q].verb == "removeHighlight" || arrayHighlights[q].verb == "deleteHighlight"){
							RemoveHighlight(firstNode, arrayHighlights[q].verb == "deleteHighlight" ? true : false,
								{ignoreAutoSave: true, dontUpdatePageAction: true,//, dontAddToJournal: true
								} );
						}
						else if(arrayHighlights[q].verb == "changeHighlightColour"){
							ChangeHighlightColor(firstNode, arrayHighlights[q].prefHL,
								{ignoreAutoSave: true, dontUpdatePageAction: true//, dontAddToJournal: true
								} );
						}
						else{
							if(__DEBUG == true)
								console.log("unknown verb: " + arrayHighlights[q].verb);
						}
					}
				}// end for

				// always clean after load
				SetDirty(numJournalErrors == 0 ? false : true);*/
			}             
		});
	});
}
/*
function OnWebkitAnimationEnd(event){
	// prevent animation from behind retriggered
	SetHighlightStyle(event.target, null, false, OnWebkitAnimationEnd); // applies just to the one it was set on
	SetHighlightStyle(event.target, "-webkit-animation-name", "none");      // applies to each span of the highlight
}
*/
function LoadPreferences(mask) {
	// TODO: array all this crap, or at least most of it
	chrome.extension.sendRequest({ msg: "getPreference", 
		key: [PREFERENCE_WARNONUNLOAD, PREFERENCE_AUTOSAVE, PREFERENCE_AUTOSAVE_STORE, PREFERENCE_SNIPPETMAX, PREFERENCE_HIGHLIGHTSTYLE, PREFERENCE_KEYFRAMES_FLASH, 

			PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW, 
				PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING, PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW,
			
			PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING,
				PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW, 

			PREFERENCE_TRANSNOTE_SRCLANG_BING, PREFERENCE_TRANSNOTE_DESTLANG_BING, PREFERENCE_AUTOTRANS_NOTE,
			PREFERENCE_TRANSSNIPPET_SRCLANG_BING, PREFERENCE_TRANSSNIPPET_DESTLANG_BING, PREFERENCE_AUTOTRANS_SNIPPET,
			
			PREFERENCE_LOOKUP, PREFERENCE_LOOKUP_OPENINNEW, PREFERENCE_LOOKUP_CREATEEMPTY,
			PREFERENCE_LOOKUP_TEMPLATES, PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT, PREFERENCE_LOOKUPPOPUP_PLACEMENT, PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE, //PREFERENCE_LOOKUPPOPUP_OPACITY, 
			PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR,
			
			PREFERENCE_TIPPOPUP, PREFERENCE_TIPPOPUP_MULTIPLE,
			PREFERENCE_TIPPOPUP_TEMPLATES, PREFERENCE_TIPPOPUP_MOUSEACTIVATE, 
			PREFERENCE_TIPPOPUP_WORDUNDERCURSOR,
			
			PREFERENCE_STORESESSION, PREFERENCE_STORELOCAL,          
			PREFERENCE_HL1, PREFERENCE_HL2, PREFERENCE_HL3, PREFERENCE_HL4, PREFERENCE_HL5, PREFERENCE_HL6, PREFERENCE_HL7, PREFERENCE_UNHL_ALL] },
		function response(arrayPrefs) {
		//
		// lang pairs
		if(mask == null || mask.maskTranslation){
			autoTranslateToNote = (arrayPrefs[PREFERENCE_AUTOTRANS_NOTE] == PREFBOOL_TRUE ? true : false);
			translateNoteSrcLang = arrayPrefs[PREFERENCE_TRANSNOTE_SRCLANG_BING];
			translateNoteDestLang = arrayPrefs[PREFERENCE_TRANSNOTE_DESTLANG_BING];
            
			autoTranslateSnippet = (arrayPrefs[PREFERENCE_AUTOTRANS_SNIPPET] == PREFBOOL_TRUE ? true : false);
			translateSnippetSrcLang = arrayPrefs[PREFERENCE_TRANSSNIPPET_SRCLANG_BING];
			translateSnippetDestLang = arrayPrefs[PREFERENCE_TRANSSNIPPET_DESTLANG_BING];
		
			// purge translated snippets cache incase language pair has changed
			arrayFirstHighlightNodes.forEach(function(node){
				SetTranslatedSnippet(node);//, null, null);
			});
		}
		
		if(mask == null){
			// add styles for each highlight to pages stylesheet

			// TODO: I dont think doc can be legal parent, and not body either (but body works). Create head?
			var parentElement = (document.head ? document.head : (document.body ? document.body : document));           
			var styleElement = document.createElement('style');
			styleElement.id = ID_STYLERULE_HIGHLIGHTS;

			// build textcontent of styleElement
			arrayPrefHLToClassName.forEach( function(h) {
				styleElement.textContent += ("." + h.className + " { " + GetStyleElementText(arrayPrefs, arrayPrefs[h.prefHL], "page") + "} ");

				// cache some stuff
				h.addNote = arrayPrefs[h.prefHL].addNote;
			}); // end for

			// if it exists, replace it
			existingStyleElement = document.getElementById(styleElement.id);
			if(existingStyleElement != null)
				parentElement.replaceChild(styleElement, existingStyleElement);
			else
				parentElement.appendChild(styleElement);

			// describe the flash animation
			styleElement = document.createElement('style');
			styleElement.id = ID_STYLERULE_FLASH;
			styleElement.textContent = '@-webkit-keyframes flash {' + arrayPrefs[PREFERENCE_KEYFRAMES_FLASH] + '}';

			// if it exists, replace it
			existingStyleElement = document.getElementById(styleElement.id);
			if(existingStyleElement != null)
				parentElement.replaceChild(styleElement, existingStyleElement);
			else
				parentElement.appendChild(styleElement);

			// cache perference
			maxSnippetLength = arrayPrefs[PREFERENCE_SNIPPETMAX];
	
			// trap window closing
			autoSave = (arrayPrefs[PREFERENCE_AUTOSAVE] == PREFBOOL_TRUE ? true : false);
			autoSaveStore = arrayPrefs[PREFERENCE_AUTOSAVE_STORE];
			warnOnBeforeUnload = (arrayPrefs[PREFERENCE_WARNONUNLOAD] == PREFBOOL_TRUE ? true : false);
			saveLookupPopupOnUnload = (arrayPrefs[PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT] == PREFBOOL_TRUE ? true : false);
		
			// lookup template cache and stuff
			arrLookupTemplates = arrayPrefs[PREFERENCE_LOOKUP_TEMPLATES];
			placementLookupPopup = arrayPrefs[PREFERENCE_LOOKUPPOPUP_PLACEMENT];
//			opacityLookupPopup = arrayPrefs[PREFERENCE_LOOKUPPOPUP_OPACITY];
			mouseActivateLookupPopup = arrayPrefs[PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE];
			useWordUnderCursor_LookupPopup = arrayPrefs[PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR] == PREFBOOL_TRUE ? true : false;
			useWordUnderCursor_TipPopup = arrayPrefs[PREFERENCE_TIPPOPUP_WORDUNDERCURSOR] == PREFBOOL_TRUE ? true : false;
			
			// tip stuff
			arrTipPopupTemplates = arrayPrefs[PREFERENCE_TIPPOPUP_TEMPLATES];
			mouseActivateTipPopup = arrayPrefs[PREFERENCE_TIPPOPUP_MOUSEACTIVATE];
			
			// keyboard shortcuts

			// functions called via the context menu are activated by a message sent to all frames, so if
			// more than one frame has a selection they will all be highlighted (for example).
			// this is a problem for functions where a selection isn't needed (empty lookup), so only activate these
			// via shortcut (active frame specific)
			
			// shortcuts cant be modified unless you record what they were
			// peek into internal structure of shortcuts thing
			for(s in shortcut.all_shortcuts)
				shortcut.remove(s);
			
			for(var b in arrayPrefHLToClassName){
				if(arrayPrefs[arrayPrefHLToClassName[b].prefHL].shortcut && arrayPrefs[arrayPrefHLToClassName[b].prefHL].showInContextMenu != false){
					shortcut.add( arrayPrefs[arrayPrefHLToClassName[b].prefHL].shortcut, function(event, keys, opt){
						OnShortcut(opt.callbackData.prefHL); },
						{'disable_in_input': true, 'propagate': true, callbackData: {prefHL: arrayPrefHLToClassName[b].prefHL} } ) ;
				}
			}
			
			// all these follow the same format
			var arrShortcuts = [PREFERENCE_UNHL_ALL, 
				PREFERENCE_STORESESSION, PREFERENCE_STORELOCAL, 
				PREFERENCE_LOOKUP, PREFERENCE_LOOKUP_OPENINNEW, PREFERENCE_LOOKUP_CREATEEMPTY,
				PREFERENCE_TIPPOPUP, PREFERENCE_TIPPOPUP_MULTIPLE];
			for(var q in arrShortcuts){
				if(arrayPrefs[arrShortcuts[q]].shortcut != null){
					shortcut.add(arrayPrefs[arrShortcuts[q]].shortcut, function(e, keys, opt){
						OnShortcut(opt.callbackData.prefHL); },
						{'disable_in_input': true, 'propagate': true, callbackData: {prefHL: arrShortcuts[q]} } );
				}
			}

			// force specific templates for lookup by pretending last successful lookup was done using them
			for(var x in arrLookupTemplates){
				if(arrLookupTemplates[x].enabled == true && arrLookupTemplates[x].shortcut){
					shortcut.add(arrLookupTemplates[x].shortcut, function(event, keys, opt){ 
						templateIdLookupLast = opt.callbackData.templateId;
						OnShortcut( PREFERENCE_LOOKUP ); 
						}, {'disable_in_input': true, 'propagate': true, callbackData: {templateId: arrLookupTemplates[x].id}} );
				}
			}

			for(var x in arrTipPopupTemplates){
				if(arrTipPopupTemplates[x].shortcut){
					shortcut.add(arrTipPopupTemplates[x].shortcut, function(event, keys, opt){ 
						OnShortcut( PREFERENCE_TIPPOPUP, {templateId: opt.callbackData.templateId } ); 
						}, {'disable_in_input': true, 'propagate': true, callbackData: {templateId: arrTipPopupTemplates[x].id}} );
				}
			}
			
			// not control by prefs, but as all shortcuts are removed above, it needs to be reset
			shortcut.add("esc", function(event){ RemoveAllLookupPopups({keepPinned: true}); }, {'disable_in_input': true, 'propagate': true} );
			shortcut.add("esc", function(event){ RemoveAllTipPopups(); }, {'disable_in_input': true, 'propagate': true} );
		}
		
	});// end fn
}


function OnShortcut(prefHL, options) {
	// fake message is if it were a context menu message
	// NB: if the event.target were valid we would use that, but it's always body
	eventContextMenu = null;

	// add to options struct
	if(options)
		options.viaShortcut = true;
	
	OnClickContextMenu(prefHL, options ? options : {viaShortcut: true});
}

function OnClickContextMenu(prefHL, options) {
	function _GetTipPopupTemplateForID(idMatch){
		// we cant use GetTemplateClone as we want to have the default template (master) used
		// for the tip but with our language settings
		var template = null;
//        var idMatch = ID_TIPPOPUP_MSTRANSLATE_TRANSLATE;//ID_TIPPOPUP_GOOGLETRANSLATE;
        
		for(var y in _arrTipPopupMasterTemplates){
			if(_arrTipPopupMasterTemplates[y].id == idMatch){
				template = _clone(_arrTipPopupMasterTemplates[y]);
				break;
			}
		}
		if(template){
			if(template.options == null)
				template.options = {};		// create anew
			template.sessionData = {};
				
//			template.options.srcLang = GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING);
//			template.options.destLang = GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING);
		
			// validate that the template stored has all the variables of the master template. perhaps teh master template
			// has been updated after the template was stored in localStorage
			for(var q in template.defaultOptions){
				if(template.options[q] === undefined)
					template.options[q] = template.defaultOptions[q];
			}
		}
		
		return template;
	}


	// rule #1 - cant have a context menu click without an originating event, unless it comes via a shortcut
	if(options.viaShortcut != true && eventContextMenu == null)
		return;

	// rule #2 - if no selection, use the mouseup dom element target
	var selRange = window.getSelection();
	var className = _PrefHLToClassName(prefHL);

	// make a copy and null the main one, because we may be called again without a change to update it
	var eventContextMenuCopy = eventContextMenu;
	eventContextMenu = null;
			
	// options that dont care if text is selected or not
	switch(prefHL){
	case PREFERENCE_STOPNATIVESPEAK:
		chrome.extension.sendRequest({ msg: "nativeSpeak", stop: true});
		return;
		
	case PREFERENCE_UNHL_ALL:
		RemoveAllHighlights();      // dialogs in function now
		return;

	case PREFERENCE_STORELOCAL:
	case PREFERENCE_STORESESSION:
		SaveHighlights(prefHL == PREFERENCE_STORELOCAL ? "local" : "session");		// in executescript.js
		return;
	}

	// options that do care...
	var note = null;
	var addNote = false;

	// get the addNote preference from the cache
	for(a in arrayPrefHLToClassName){
		if(arrayPrefHLToClassName[a].prefHL == prefHL){
			addNote = arrayPrefHLToClassName[a].addNote;
			break;
		}
	}




	// sometimes selRange isnt collapsed, but its only range is collapsed
	// TODO: review if multiple selection ranges get supported
	if(selRange.isCollapsed == true || (selRange.rangeCount == 1 && selRange.getRangeAt(0).collapsed == true)){
		// no selection
/*
		// if we didn't also register an element, abandon
		if(eventContextMenuCopy == null || eventContextMenuCopy.target == null)
			return;
		var container = GetAncestorOrSelfHighlightFromNode(eventContextMenuCopy.target);
*/	
		var container = (eventContextMenuCopy != null && eventContextMenuCopy.target != null) ? 
			GetAncestorOrSelfHighlightFromNode(eventContextMenuCopy.target) : null;

		if(className != null){     // ie: PREF_HL1-7
			// if we clicked on an existing highlight, then replace the colour of this highlight
			if(container)
				ChangeHighlightColor(container, prefHL);
/*                else{                                                                   
				// TODO: This causes problems with http://www.w3schools.com/HTML/tryit.asp?filename=tryhtml_frame_cols (left side bit)
				// but its too useful to get rid of
				
				// must have a context menu event to decide which node to highlight
				if(eventContextMenuCopy == null)
					return;
				
				// blacklist of elements you shouldn't wrap
				if(eventContextMenuCopy.target instanceof HTMLTextAreaElement)
					return;

				// always get pref, whether it'll be relevant or not

				// if desired, request a note
				if(eventContextMenuCopy.ctrlKey == true || addNote == true){
					note = PromptForNote();
					if(note == null)        // null = cancel, "" = no text
						return;
				}

				// highlight the entire node

				// create a selrange that corresponds to the dom element
				range = document.createRange();
				range.selectNode(eventContextMenuCopy.target);

				firstNode = HighlightSelection( prefHL, range);
				
				if(firstNode){
					// auto translate snippet
					var nodeIndex;
					
					if((autoTranslateSnippet == true || eventContextMenuCopy.shiftKey == true ) && firstNode.SimpleHighlight.snippet){
						// callback relies on index to node array, so get index of container (should always be last)
						nodeIndex = arrayFirstHighlightNodes.lastIndexOf(firstNode);

						if(nodeIndex != -1){
							chrome.extension.sendRequest({ msg: "translateText", text: firstNode.SimpleHighlight.snippet, 
								srcLang: translateSnippetSrcLang, destLang: translateSnippetDestLang, 
								msgSet: msgSetTranslatedSnippet, index: nodeIndex});
						}
					}
				
					if(note && note.length > 0)
						SetNote(firstNode, note);
					else if(autoTranslateToNote == true && firstNode.SimpleHighlight.snippet){
						// callback relies on index to node array, so get index of container (should always be last)
						if(nodeIndex == null)
							nodeIndex = arrayFirstHighlightNodes.lastIndexOf(firstNode);
						
						if(nodeIndex != -1){
							chrome.extension.sendRequest({ msg: "translateText", text: firstNode.SimpleHighlight.textComplete, 
								srcLang: translateNoteSrcLang, destLang: translateNoteDestLang, 
								msgSet: msgSetNote, index: nodeIndex});
						}
					}
				}
			}*/
		}
		else if(container == null){
			// no selection, no container
			function GetWordAtPoint(elem, x, y, returnFormat) {
				// via http://stackoverflow.com/questions/2444430/how-to-get-a-word-under-cursor-using-javascript
				// if this elem under the cursor is a highlight, just use that text
				// convert highlight to range (if not a highlight, returns null)
				var rangeHighlight = GetRangeFromHighlight(elem);
				if(rangeHighlight){
					if(returnFormat == "range")
						return rangeHighlight;
					else{
						var str = rangeHighlight.toString();
						rangeHighlight.detach();
						
						return(str);
					}
				}
				
				if(elem.nodeType == Node.TEXT_NODE) {
					var range = elem.ownerDocument.createRange();
					range.selectNodeContents(elem);
					
					var currentPos = 0;
					var endPos = range.endOffset;
					
					while(currentPos+1 < endPos) {
						range.setStart(elem, currentPos);
						range.setEnd(elem, currentPos+1);
					
						var rectBoundingClient = range.getBoundingClientRect();
						if(rectBoundingClient.left <= x && rectBoundingClient.right  >= x &&
							rectBoundingClient.top  <= y && rectBoundingClient.bottom >= y) {
							//
							range.expand("word");
							// return range - caller must detach() it
							if(returnFormat == "range")
								return range;
							else{
								var str = range.toString();
								range.detach();
								
								return(str);
							}
						}
						  
						currentPos += 1;
					}
				}
				else{
					for(var i = 0; i < elem.childNodes.length; i++) {
						var range = elem.childNodes[i].ownerDocument.createRange();
						range.selectNodeContents(elem.childNodes[i]);
						
						var rectBoundingClient = range.getBoundingClientRect();
						range.detach();
						
						if(rectBoundingClient.left <= x && rectBoundingClient.right  >= x &&
							rectBoundingClient.top  <= y && rectBoundingClient.bottom >= y) {
							// if client areas overlap and this isnt the correct clientarea, no word will result
							var potentialResult = GetWordAtPoint(elem.childNodes[i], x, y, returnFormat);
							if(potentialResult != null)
								return(potentialResult);//GetWordAtPoint(elem.childNodes[i], x, y, returnFormat));
						}
//						} else
//							range.detach();
					}
				}
				
				return(null);
			}// end function
			
			// These were inside if(viaShortcut)
			// because before, if the message was sent via the menu it would be broadcast to all frames,
			// and thus would spawn empty lookup windows in all frames
			
			// now FIXED - with (!shortcut && !context) at start
			var range = null;
			var textSelected, boundingClientRect;
			
			// if input or textarea with a selection, use that. else try the word under teh cursor
			if(eventContextMenuCopy && eventContextMenuCopy.target && eventContextMenuCopy.target.nodeType == Node.ELEMENT_NODE &&
				(eventContextMenuCopy.target.nodeName == "TEXTAREA" || (eventContextMenuCopy.target.nodeName == "INPUT" && eventContextMenuCopy.target.type == "text")) ){
				// can use selected text within an input or textarea
				textSelected = eventContextMenuCopy.target.value;
				textSelected = textSelected.substring(eventContextMenuCopy.target.selectionStart, eventContextMenuCopy.target.selectionEnd);

				boundingClientRect = eventContextMenuCopy.target.getBoundingClientRect();
			}
			else if(useWordUnderCursor_LookupPopup == true || useWordUnderCursor_TipPopup == true){
				// choose the event to get the co-ord from which to get the word from, from the type
				// of path taken to get here
				var e = (options.viaShortcut == true ? eventMouseMoveSummary : eventContextMenuCopy);
									
				// magic the word under the cursor via the last mousemove event
				// Must remember to detach range
				if(e && e.target != null)
					range = GetWordAtPoint(e.target, e.x, e.y, "range");
			}
					
			
			if(prefHL == PREFERENCE_TIPPOPUP || prefHL == PREFERENCE_TIPPOPUP_MULTIPLE){
				// range takes preference, gets boundingclientrect itself
				DoTipPopup({
					range: useWordUnderCursor_TipPopup == true ? range : null,
					text: textSelected,
					boundingClientRect: boundingClientRect,
					allowMultiple: prefHL == PREFERENCE_TIPPOPUP_MULTIPLE ? true : false
				}, options.templateId);
			}
			
			if(prefHL == PREFERENCE_LOOKUP || prefHL == PREFERENCE_LOOKUP_OPENINNEW || prefHL == PREFERENCE_LOOKUP_CREATEEMPTY){
				if(range && useWordUnderCursor_LookupPopup == true)
					textSelected = range.toString();
				
				var divPopup = DoLookupPopup(eventContextMenuCopy, textSelected, 
					{createNew: (prefHL == PREFERENCE_LOOKUP_OPENINNEW || prefHL == PREFERENCE_LOOKUP_CREATEEMPTY) ? true : false} );
				if(divPopup && prefHL == PREFERENCE_LOOKUP_CREATEEMPTY)
					divPopup.divTitlebar.inputQuery.focus();
			}
			
			if(range)
				range.detach();
		}
		else{
			// no selection, but has container
			
			// NB remember to sync these cases with the 'if' statement on line 541-ish
			if(prefHL == PREFERENCE_UNHL){
				// unlighting must use the mouseup DOM target, because the document selection would be a text node always
				RemoveHighlight(container);
			}
			else if(prefHL == PREFERENCE_SELECTHL){
				SelectHighlight(container);
			}
			else if(prefHL == PREFERENCE_DELHL){
				// deleting must use the mouseup DOM target, because the document selection would be a text node always
				if(confirm(CONFIRM_DELETE) == true)
				   RemoveHighlight(container, true);
			}
			else if(prefHL == PREFERENCE_SETNOTEHL){
				note = PromptForNote(container.title);
				if(note == null)        // null = cancel, "" = no text
					return;

				SetNote(container, (note.length == 0 ? null : note) );
			}
			else if(prefHL == PREFERENCE_NATIVESPEAK){
				if(container && container.SimpleHighlight && container.SimpleHighlight.textComplete)
					chrome.extension.sendRequest({ msg: "nativeSpeak", utterance:container.SimpleHighlight.textComplete});
			}
			else if(prefHL == PREFERENCE_TRANSHLTONOTE){
				// callback relies on index to node array, so get index of container
				var nodeIndex = arrayFirstHighlightNodes.indexOf(container);
				
				if(nodeIndex != -1){
					// fake a tip template
					var tt = _GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);
					tt.options.srcLang = translateNoteSrcLang;
					tt.options.destLang = translateNoteDestLang;
					
					chrome.extension.sendRequest({ msg: "requestTip", 
						tipTemplate: tt,/*{
							id: ID_TIPPOPUP_MSTRANSLATE_TRANSLATE,
							options: {
								srcLang: translateNoteSrcLang,
								destLang: translateNoteDestLang,
							}
						},*/
						text: container.SimpleHighlight.textComplete, 
						msgSet: msgSetNote,
						index: nodeIndex}
					);
/*					
					chrome.extension.sendRequest({ msg: "translateText", text: container.SimpleHighlight.textComplete, 
						srcLang: translateNoteSrcLang, destLang: translateNoteDestLang, 
						msgSet: msgSetNote, index: nodeIndex});*/
				}
			}
			else if(prefHL == PREFERENCE_LOOKUP || prefHL == PREFERENCE_LOOKUP_OPENINNEW){
				DoLookupPopup(eventContextMenuCopy, container.SimpleHighlight.textComplete, 
					{createNew: prefHL == PREFERENCE_LOOKUP_OPENINNEW ? true : false});
			}
			else if(prefHL == PREFERENCE_LOOKUP_CREATEEMPTY){		// CANT come from menu, as it would spawn in every window
				var divPopup = DoLookupPopup(eventContextMenuCopy, null, {createNew: true});
				if(divPopup)
					divPopup.divTitlebar.inputQuery.focus();
			}
			else if(prefHL == PREFERENCE_TIPPOPUP || prefHL == PREFERENCE_TIPPOPUP_MULTIPLE)
				DoTipPopup({firstNode: container, allowMultiple: prefHL == PREFERENCE_TIPPOPUP_MULTIPLE ? true : false}, options.templateId);
		}
	}else{
		// selection present. only option is to highlight text
		var canSetDirty = false;

		// iterate all ranges in selRange (should be 1)
		for(var rangeIndex=0; rangeIndex < selRange.rangeCount; rangeIndex++){
			if(className != null){
				// if desired, request a note
				if((eventContextMenuCopy && eventContextMenuCopy.ctrlKey == true) || addNote == true){
					note = PromptForNote();
					if(note == null)        // null = cancel, "" = no text
						continue;
				}
					
				// map prefHL to corresponding classname
				// postpone updatePageAction until the end (via SetDirty)
				firstNode = HighlightSelection( prefHL, selRange.getRangeAt(rangeIndex),
					{dontUpdatePageAction: true, ignoreAutoSave: true} );
				if(firstNode != null)
					canSetDirty = true;

				if(firstNode){
					// auto translate snippet
					var nodeIndex;
					
					if((autoTranslateSnippet == true || (eventContextMenuCopy && eventContextMenuCopy.shiftKey == true)) && firstNode.SimpleHighlight.snippet){
						// callback relies on index to node array, so get index of container (should always be last)
						nodeIndex = arrayFirstHighlightNodes.lastIndexOf(firstNode);
				
						if(nodeIndex != -1){
							// fake a tip template
							var tt = _GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);
							tt.options.srcLang = translateSnippetSrcLang;
							tt.options.destLang = translateSnippetDestLang;
							
							chrome.extension.sendRequest({ msg: "requestTip", 
								tipTemplate: tt,/*{
									id: ID_TIPPOPUP_MSTRANSLATE_TRANSLATE,
									options: {
										srcLang: translateSnippetSrcLang,
										destLang: translateSnippetDestLang,
									}
								},*/
								text: firstNode.SimpleHighlight.snippet, 
								msgSet: msgSetTranslatedSnippet,
								index: nodeIndex}
							);			
		
							// always show
							firstNode.SimpleHighlight.showTranslatedSnippet = true;
							
/*							
							chrome.extension.sendRequest({ msg: "translateText", text: firstNode.SimpleHighlight.snippet, 
								srcLang: translateSnippetSrcLang, destLang: translateSnippetDestLang, 
								msgSet: msgSetTranslatedSnippet, index: nodeIndex});*/
						}
					}
				
					if(note && note.length > 0)
						SetNote(firstNode, note, {dontUpdatePageAction: true, ignoreAutoSave: true});
					else if(autoTranslateToNote == true){
						// callback relies on index to node array, so get index of container (should always be last)
						if(nodeIndex == null)
							nodeIndex = arrayFirstHighlightNodes.lastIndexOf(firstNode);
						
						if(nodeIndex != -1){
							// fake a tip template
							var tt = _GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);
							tt.options.srcLang = translateNoteSrcLang;
							tt.options.destLang = translateNoteDestLang;
							
							chrome.extension.sendRequest({ msg: "requestTip", 
								tipTemplate: tt,/*{
									id: ID_TIPPOPUP_MSTRANSLATE_TRANSLATE,
									options: {
										srcLang: translateNoteSrcLang,
										destLang: translateNoteDestLang,
									}
								},*/
								text: firstNode.SimpleHighlight.textComplete, 
								msgSet: msgSetNote,
								index: nodeIndex}
							);	
/*							
							chrome.extension.sendRequest({ msg: "translateText", text: firstNode.SimpleHighlight.textComplete, 
								srcLang: translateNoteSrcLang, destLang: translateNoteDestLang, 
								msgSet: msgSetNote, index: nodeIndex});*/
						}
					}
				}
			}
			else if(prefHL == PREFERENCE_NATIVESPEAK){
				if(selRange.getRangeAt(rangeIndex).toString())
					chrome.extension.sendRequest({ msg: "nativeSpeak", utterance: selRange.getRangeAt(rangeIndex).toString()});
			}
			else if(prefHL == PREFERENCE_LOOKUP || prefHL == PREFERENCE_LOOKUP_OPENINNEW){
				DoLookupPopup(eventContextMenuCopy, selRange.getRangeAt(rangeIndex).toString() , 
					{createNew: prefHL == PREFERENCE_LOOKUP_OPENINNEW ? true : false});
			}
			else if(prefHL == PREFERENCE_LOOKUP_CREATEEMPTY){		// CANT come from menu, as it would spawn in every window
				var divPopup = DoLookupPopup(eventContextMenuCopy, null, {createNew: true});
				if(divPopup)
					divPopup.divTitlebar.inputQuery.focus();
			}
			else if(prefHL == PREFERENCE_TIPPOPUP || prefHL == PREFERENCE_TIPPOPUP_MULTIPLE)
				DoTipPopup({
					range: selRange.getRangeAt(rangeIndex), 
					allowMultiple: prefHL == PREFERENCE_TIPPOPUP_MULTIPLE ? true : false
					}, options.templateId);
			else{
				// if(prefHL == PREFERENCE_UNHL || prefHL == PREFERENCE_DELHL || prefHL == PREFERENCE_SETNOTEHL || prefHL == PREFERENCE_SELECTHL || prefHL == PREFERENCE_TRANSHLTONOTE)
				// any node contained in the start OR end points
				// The container will probably be a text node, but we want the parent span
				container = GetAncestorOrSelfHighlightFromNode(selRange.getRangeAt(rangeIndex).startContainer);
				if(container == null)
					container =  GetAncestorOrSelfHighlightFromNode(selRange.getRangeAt(rangeIndex).endContainer);
					
				if(container){
					if(prefHL == PREFERENCE_DELHL){
						if(confirm(CONFIRM_DELETE) == true){
							if(RemoveHighlight(container, true, {dontUpdatePageAction: true, ignoreAutoSave: true}) == true)
								canSetDirty = true;
						}
					}
					else if(prefHL == PREFERENCE_SELECTHL){
						SelectHighlight(container);
						canSetDirty = false;
					}
					else if(prefHL == PREFERENCE_UNHL){
						if(RemoveHighlight(container, false, {dontUpdatePageAction: true, ignoreAutoSave: true}) == true)
							canSetDirty = true;
					}
					else if(prefHL == PREFERENCE_SETNOTEHL){
						note = PromptForNote(container.title);
						if(note == null)        // null = cancel, "" = no text
							continue;

						SetNote(container, (note.length == 0 ? null : note), {dontUpdatePageAction: true, ignoreAutoSave: true});
						canSetDirty = true;
					}
					else if(prefHL == PREFERENCE_TRANSHLTONOTE){
						// callback relies on index to node array, so get index of container
						var nodeIndex = arrayFirstHighlightNodes.indexOf(container);
						if(nodeIndex != -1){
							// fake a tip template
							var tt = _GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);
							tt.options.srcLang = translateNoteSrcLang;
							tt.options.destLang = translateNoteDestLang;
							
							chrome.extension.sendRequest({ msg: "requestTip", 
								tipTemplate: tt,/*{
									id: ID_TIPPOPUP_MSTRANSLATE_TRANSLATE,
									options: {
										srcLang: translateNoteSrcLang,
										destLang: translateNoteDestLang,
									}
								},*/
								text: firstNode.SimpleHighlight.textComplete, 
								msgSet: msgSetNote,
								index: nodeIndex}
							);	
/*							
							chrome.extension.sendRequest({ msg: "translateText", text: container.SimpleHighlight.textComplete, 
								srcLang: translateNoteSrcLang, destLang: translateNoteDestLang, 
								msgSet: msgSetNote, index: nodeIndex});*/
						}

						canSetDirty = false;
					}
				}
			}
		}// end for

		if(canSetDirty == true)
			SetDirty(true);     // set dirty 'properly' (with no args)
	}// end if
}

function GetAncestorOrSelfHighlightFromNode(n) {
	// ie: if we have (for example)  a text node, go up the DOM until we find one of our highlights 
	while(n != null){
		if(n.nodeName == NODENAME_SPAN && n.SimpleHighlight && n.SimpleHighlight.highlight == true)
			break;
		n = n.parentNode;
	}
	
	// now find the first of the chain
	if(n){
		while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true))
			n = n.nextHighlight;

		n = n.firstNode;  //firstNode is defined in highlights[i].firstNode
	}

	return n;
}

function PromptForNote(example) {
	return window.prompt(PROMPT_NOTE, example == null ? EXAMPLE_NOTE : example);
}


function AddToJournal(verb, firstNode, objExtra) {
	var obj = {
//		href: location.href.RemoveHash(),
		verb: verb,
		id: firstNode.id,
	};
	
	// merge values in objExtra into obj
	if(objExtra){
		for(var key in objExtra){
			if(!key)
				continue;
			obj[key] = objExtra[key];
		}
	}
	
	// only add href if it is different from tab url (with hash removed)
	var hrefWithHashRemoved = location.href.RemoveHash();
	if(tabURLWithHashRemoved == null || (tabURLWithHashRemoved != hrefWithHashRemoved))
		obj.href = hrefWithHashRemoved;
	
	if(verb =="highlight"){
		obj.xpathRange = firstNode.SimpleHighlight.xpathRange;
		obj.prefHL = firstNode.SimpleHighlight.prefHL;
		
		// 10/03/2011 - updated date parser
		// Added to make dates format to ISO8601
//		obj.date = firstNode.SimpleHighlight.date;
		Date.prototype.toJSON = function (key) {
			function f(n) {
				// Format integers to have at least two digits.
				return n < 10 ? '0' + n : n;
			}
			
			return this.getUTCFullYear()   + '-' +
				f(this.getUTCMonth() + 1) + '-' +
				f(this.getUTCDate())      + 'T' +
				f(this.getUTCHours())     + ':' +
				f(this.getUTCMinutes())   + ':' +
				f(this.getUTCSeconds())   + '.' +
				f(this.getUTCMilliseconds())   + 'Z';
		};
		
        obj.date = firstNode.SimpleHighlight.date.toJSON();		
	}
	else if(verb == "removeHighlight" || verb == "deleteHighlight"){
		//
	}
	else{
		// TODO: sync this block with iphone version	
		// 19/01/12
		
		// the rest are not important chronologically, so just update existing journal entries (if applicable)
		for(var y=0; y<arrJournal.length; y++){
			if(arrJournal[y].verb == verb && arrJournal[y].id == firstNode.id)
				break;
		}
		
		if(verb == "setNote"){
			//if(obj.note)
			if(obj["note"] === undefined)
				obj["note"] = firstNode.title;			// not present obj.note means remove
				
			// optimize
//			if(obj["note"] === undefined || obj["note"] == "")
//				obj["note"] = null;
		}
		else if(verb == "changeHighlightColour"){
			obj.prefHL = firstNode.SimpleHighlight.prefHL;
			
			// note: could change the prefHL colour for the actual highlight instead, but it would break existing journals with 'changeHighlightColour' already defined
		}
		else
			return;

		// entry already exists
		if(y < arrJournal.length){
			// can just remove the 'setNote' verb from journal if we're setting it null
			if(verb == "setNote" && (obj["note"] == null || obj["note"] === undefined || obj["note"] == "")){
				// remove
				if(__DEBUG == true)
					console.log("AddToJournal() - splice (index " + y+")");
				
				arrJournal.splice(y, 1);
			}
			else{
				// update
				if(__DEBUG == true)
					console.log("AddToJournal() - update (index " + y+")");

				arrJournal[y] = obj;
				// must update existing object, cant just set
//				for(q in obj)
//					arrJournal[y][q] = obj[q];
			}

			if(__DEBUG == true)
				console.log(JSON.stringify(obj));

			return;
		}
	}

	// entry DOESNT already exist
	if(__DEBUG == true){
		console.log("AddToJournal() - push");
		console.log(JSON.stringify(obj));
	}

	arrJournal.push(obj);
}

function HighlightSelection(prefHL, range, args ) {
	var record = {/*offsetY: Number.NaN, */firstNode: null, lastNode: null };

	// create SPAN to contain current selection
	var wrap = document.createElement(NODENAME_SPAN);
	
	wrap.className = _PrefHLToClassName(prefHL);

	wrap.SimpleHighlight = {
		highlight: true,
		date: (args == null || args.date == null) ? new Date() : args.date,
	};       // identify as an element because classname reflects its style


	var _createWrapper = function(n) {
		var e = wrap.cloneNode(false);
		
		// override default colours, but fade them in later
		e.style.setProperty("background-color", "transparent", "important");
		e.style.setProperty("color", "inherit", "important");
		e.style.setProperty("-webkit-box-shadow", "transparent 3px 3px 4px", "!important");

		// copy properties not handled by cloneNode
		// Cant do e.SimpleHighlight = wrap.SimpleHighlight as the object would refer to each other (modifications to one appear in the other)
		e.SimpleHighlight = {};
		for(x in wrap.SimpleHighlight)
			e.SimpleHighlight[x] = wrap.SimpleHighlight[x];

//            e.title = wrap.title;
		
		if(!record.firstNode)
			record.firstNode = e;
	  
		if(record.lastNode)   
			record.lastNode.nextHighlight = e;
		
		record.lastNode = e;

		return e;
	};


	// range is modified in _highlightRange0, so store here
	var xpathRange = GetXPathRangeFromRange(range);

	_highlightRange0(range, _createWrapper, record);
	
	if(record.firstNode != null){
		record.lastNode.nextHighlight = record; //connect linked list back to record
		
		// tag as a first node, and add to arrayFirstHighlightNodes
		record.firstNode.SimpleHighlight.isFirstNode = true;
		record.firstNode.SimpleHighlight.prefHL = prefHL;
		
		record.firstNode.SimpleHighlight.textComplete = 
			GatherText(record.firstNode).replace(/\s+/g, " ").alltrim();
		record.firstNode.SimpleHighlight.snippet = 
			GatherText(record.firstNode, maxSnippetLength).replace(/\s+/g, " ").alltrim();
		//record.firstNode.SimpleHighlight.translatedSnippet = null;
			
//		record.firstNode.SimpleHighlight.title = document.title;
			
		record.firstNode.id = (args && args.id != null) ? args.id : RandomString(8);//(ID_PREFIX_SIMPLEHIGHLIGHT + RandomString(5));

		// store range as xml
		record.firstNode.SimpleHighlight.xpathRange = xpathRange;

		// add to our local array, and mirror in the window.top array also
		arrayFirstHighlightNodes.push( record.firstNode );
		// add to journal
		if(!args || args.dontAddToJournal != true)
			AddToJournal("highlight", record.firstNode);
		
		SetDirty(true, args); // also RefreshCacheSave() and updateSendersTabPageAction
	}

	return record.firstNode;
}

function _highlightRange0(range, _createWrapper, record) {
	if(range.collapsed)  //(startContainer == endContainer && startOffset == endOffset)
	  return;

	var startSide = range.startContainer;
	var endSide = range.endContainer;
	var ancestor = range.commonAncestorContainer;
	var dirIsLeaf = true;

	if(range.endOffset == 0) {  //nodeValue = text | element
		while(!endSide.previousSibling && endSide.parentNode != ancestor)
			endSide = endSide.parentNode;

		endSide = endSide.previousSibling;
		//dump("\nendOffset=0, endSide="+endSide+" goto root="+endSide+" ancestor="+ancestor);
	}else if(endSide.nodeType == Node.TEXT_NODE) {
		if(range.endOffset < endSide.nodeValue.length) {
			endSide.splitText(range.endOffset);
			//dump("\nendSide is textnode, split text, endSide="+endSide);
		}
	}else if(range.endOffset > 0) {  //nodeValue = element
		endSide = endSide.childNodes.item(range.endOffset - 1);
		//dump("\nendOffset > 0, select indexed="+endSide);
	}

	if(startSide.nodeType == Node.TEXT_NODE) {
		if(range.startOffset == startSide.nodeValue.length) {
			//dump("\nstartOffset=len, noop");
			dirIsLeaf = false;
		} else if(range.startOffset > 0) {
			startSide = startSide.splitText(range.startOffset);
			if(endSide == startSide.previousSibling){
				endSide = startSide;
				//dump("\nstartOffset > 0, split text, startSide="+startSide);
			}
		}
	} else if(range.startOffset < startSide.childNodes.length) {
		startSide = startSide.childNodes.item(range.startOffset);
		//dump("\nstartOffset < len, select indexed="+startSide);
	} else {
		//dump("\nstartOffset=len, noop");
		dirIsLeaf = false;
	}

	range.setStart(range.startContainer, 0);
	range.setEnd(range.startContainer, 0);

	//dump("\nstartSide="+startSide+"\nendSide="+endSide);
	var done = false;
	var node = startSide;
	var tmp;

	do {
		if(dirIsLeaf && node.nodeType == Node.TEXT_NODE &&
			!((tmp = node.parentNode) instanceof HTMLTableElement ||
			tmp instanceof HTMLTableRowElement ||
			tmp instanceof HTMLTableColElement ||
			tmp instanceof HTMLTableSectionElement)) {
			//
			var wrap = node.previousSibling;
			
			if(!wrap || wrap != record.lastNode) {
				wrap = _createWrapper(node);
				node.parentNode.insertBefore(wrap, node);
			}
			wrap.appendChild(node);

			// remove transparent style to fade to colour desired by class
			window.setTimeout(function(elem) {
				elem.style.removeProperty("background-color");	
				elem.style.removeProperty("color");					
				elem.style.removeProperty("-webkit-box-shadow");
			}, 0, wrap);
			
			node = wrap.lastChild;
			dirIsLeaf = false;
		}

		if(node == endSide && (!endSide.hasChildNodes() || !dirIsLeaf))
			done = true;

		if(node instanceof HTMLScriptElement || node instanceof HTMLStyleElement ||node instanceof HTMLSelectElement) {  //never parse their children
			dirIsLeaf = false;
		}

		if(dirIsLeaf && node.hasChildNodes()) {
			node = node.firstChild;
			//dump("-> firstchild ");
		} else if(node.nextSibling != null) {
			node = node.nextSibling;  //dump("-> nextSibling ");
			dirIsLeaf = true;
		} else if(node.nextSibling == null) {
			node = node.parentNode;  //dump("-> parent ");
			dirIsLeaf = false;
		}
	  
//            if(node == ancestor.parentNode)
//                dump("\nHALT shouldn't face ancestor");
	}while(!done);
}

function GetRangeFromHighlight(node){
	// create a range object that starts at the start of the node and ends at the end of the last linked node
	var range;// = document.createRange();
	var n = node;
	
	if(node == null)
		return null;
	
	while(n.nodeType == Node.ELEMENT_NODE && n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
		n = n.nextHighlight;
	}

	n = n.firstNode;  //firstNode is defined in highlights[i].firstNode
	var nStart = n;
//	range.setStartBefore(n);

	while(n != null && n.nodeType == Node.ELEMENT_NODE && n.nodeName == NODENAME_SPAN &&
		(n.SimpleHighlight && n.SimpleHighlight.highlight == true)/* && n != node*/) {
		//
		if(range == null){
			range = document.createRange();
			range.setStartBefore(nStart);
		}
					
		range.setEndAfter(n);
		n = n.nextHighlight;
	}

	return range;
}

function SelectHighlight(node) {
	// create a range object that starts at the start of the node and ends at the end of the last linked node
	var range = GetRangeFromHighlight(node);
	if(range){
		// add to current selection
		var selRange = document.getSelection();
		selRange.removeAllRanges();

		selRange.addRange(range);
	}
}

function RemoveHighlight(node, deleteContents, args) {
	function __MergeNodeWithImmediateSiblings(n){
		// merge text nodes with prev/next sibling
		if(n.nodeType == Node.TEXT_NODE){
			if(n.nextSibling && n.nextSibling.nodeType == Node.TEXT_NODE){
				// merge next sibling into newNode
				n.textContent += n.nextSibling.textContent;
				// remove next sibling
				n.nextSibling.parentNode.removeChild(n.nextSibling);
			}
			
			if(n.previousSibling && n.previousSibling.nodeType == Node.TEXT_NODE){
				// merge nodeNew into previousSibling
				n.previousSibling.textContent += n.textContent;
				// remove newNode
				n.parentNode.removeChild(n);
			}
		}
	}

	var hasRemovedFirstNode = false;

	if(node != null && node.nodeType == Node.ELEMENT_NODE && (node.SimpleHighlight && node.SimpleHighlight.highlight == true)) {
		var n = node.nextHighlight;
//		var arrMergeNodeQueue = [];

		while(n != null && n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
			if(hasRemovedFirstNode == false && n.SimpleHighlight.isFirstNode == true){
				//
				if(!args || args.dontAddToJournal != true){
					// only add merge key (non default) if specified (default is dont merge, for legacy)
					var objExtra = {};
					if(!args || args.dontMergeRestoredNodes != true)
						objExtra.merge = true;
						
					AddToJournal(deleteContents == true ? "deleteHighlight" : "removeHighlight", n, objExtra);
				}

				RemoveFromFirstNodesArray(n);
				hasRemovedFirstNode = true;
			}

			if(deleteContents != true){
				while(n.hasChildNodes()){
					var nodeNew = n.parentNode.insertBefore(n.firstChild, n);
					
					if(!args || args.dontMergeRestoredNodes != true)
						__MergeNodeWithImmediateSiblings(nodeNew);		
	//					arrMergeNodeQueue.push(nodeNew);
				}
			}

//			n = n.parentNode.removeChild(n).nextHighlight;
			var nodeRemovedPreviousSibling = n.previousSibling;
			var nodeRemoved = n.parentNode.removeChild(n);		// span
			if((!args || args.dontMergeRestoredNodes != true) && nodeRemovedPreviousSibling)			// if removing the span brings 2 text nodes together, join them
				__MergeNodeWithImmediateSiblings(nodeRemovedPreviousSibling);	
			
			n = nodeRemoved.nextHighlight;		// point to next hl
		}

		var record = n;
		node.nextHighlight = null;  //break chain so loop can exit

		n = record.firstNode;
		while(n != null && n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
			if(hasRemovedFirstNode == false && n.SimpleHighlight.isFirstNode == true){
				//
				if(!args || args.dontAddToJournal != true){
					// only add merge key (non default) if specified 
					var objExtra = {};
					if(!args || args.dontMergeRestoredNodes != true)
						objExtra.merge = true;
						
					AddToJournal(deleteContents == true ? "deleteHighlight" : "removeHighlight", n, objExtra);
				}

				RemoveFromFirstNodesArray(n);
				hasRemovedFirstNode = true;
			}

			if(deleteContents != true){
				while(n.hasChildNodes()){
					var nodeNew = n.parentNode.insertBefore(n.firstChild, n);
					
					if(!args || args.dontMergeRestoredNodes != true)
						__MergeNodeWithImmediateSiblings(nodeNew);
//						arrMergeNodeQueue.push(nodeNew);
				}
			}

//			n = n.parentNode.removeChild(n).nextHighlight;
			var nodeRemovedPreviousSibling = n.previousSibling;
			var nodeRemoved = n.parentNode.removeChild(n);		// span
			if((!args || args.dontMergeRestoredNodes != true) && nodeRemovedPreviousSibling)			// if removing the span brings 2 text nodes together, join them
				__MergeNodeWithImmediateSiblings(nodeRemovedPreviousSibling);	
			
			n = nodeRemoved.nextHighlight;		// point to next hl

		}

		// join sequential text nodes
//		for(var h=0; h<arrMergeNodeQueue.length; h++)
//			__MergeNodeWithImmediateSiblings(arrMergeNodeQueue[h]);		
		
		record.firstNode = null;
		record.lastNode.nextHighlight = null;
		record.lastNode = null;

		SetDirty(true, args); // also RefreshCacheSave() and updateSendersTabPageAction
	}// end if
/*
	// optimise - can empty journal if all actions add to nothing
	// CANT DO unless merge was used for every action, which is unknown
	if(arrayFirstHighlightNodes.length == 0){
		// now can optimise by emptying the journal totally
		arrJournal = [];
		//numJournalErrors = 0;		// just in case - should already be 0
	}
	*/
	
	// can only optimise if all removehighlight actions were merge operations
	if(arrayFirstHighlightNodes.length == 0){
		var canOptimize = true;
		for(var z=0; z<arrJournal.length; z++){
			if(arrJournal[z].verb == "removeHighlight" && arrJournal[z].merge != true){
				canOptimize = false;
				break;
			}
		}
		if(canOptimize == true){
			// now can optimise by emptying the journal totally
			arrJournal = [];
		}
	}
	
	return hasRemovedFirstNode;
}

function SetTranslatedSnippet(node, translatedSnippet, /*index, */nameSrcLanguage, nameDestLanguage, urlSrcLanguageIcon){
	if(node && node.SimpleHighlight){
		node.SimpleHighlight.translatedSnippet = translatedSnippet;
		node.SimpleHighlight.nameSrcLanguage = nameSrcLanguage;
		
		node.SimpleHighlight.nameDestLanguage = nameDestLanguage;
		node.SimpleHighlight.urlSrcLanguageIcon = urlSrcLanguageIcon;
	}
}

function SetNote(node, note, args){
	var n = node;
	
	while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
		n.title = note;
		n = n.nextHighlight;
	}

	// add to journal (unless both the same)
	if(!args || args.dontAddToJournal != true){
		//
		n.firstNode.title = note;
		AddToJournal("setNote", n.firstNode);
	}

	n = n.firstNode;  //firstNode is defined in highlights[i].firstNode

	while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true) && n != node) {
		n.title = note;
		n = n.nextHighlight;
	}

	SetDirty(true, args);
}

function ChangeHighlightColor(node, prefHL, args) {
	var n = node;
	var className = _PrefHLToClassName(prefHL);
	
	while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
		//n.SimpleHighlight.prefHL = prefHL;
		n.className = className;

		n = n.nextHighlight;
	}

	n = n.firstNode;  //firstNode is defined in highlights[i].firstNode

	// prefHL is only stored in firstNode
	if(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)){
		n.SimpleHighlight.prefHL = prefHL;
		
		if(!args || args.dontAddToJournal != true)
			AddToJournal("changeHighlightColour", n);
	}
	
	while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true) && n != node) {
		//n.SimpleHighlight.prefHL = prefHL;
		n.className =  className;

		n = n.nextHighlight;
	}

	SetDirty(true); // also RefreshCacheSave() and updateSendersTabPageAction
}

function SetHighlightStyle(node, property, value, callback)
{
	// iterate all the nodes, setting the style
	var n = node;

	// add event listener to all nodes if value != null, else remove
	if(callback != null)
		n[value == true ? "addEventListener" : "removeEventListener"]('webkitAnimationEnd', callback, false);
	
	if(property != null){
		while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
			if(value == null)
				n.style.removeProperty(property);
			else
				n.style.setProperty(property, value);

			n = n.nextHighlight;
		}

		n = n.firstNode;  //firstNode is defined in highlights[i].firstNode
		while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true) && n != node) {
			if(value == null)
				n.style.removeProperty(property);
			else
				n.style[property] = value;

			n = n.nextHighlight;
		}
	}
}

function GetHighlightBoundingClientRect(node) {
	var n = node;
	var textRect = {left:null, right:null, top:null, bottom:null};
	
	while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
		var r = n.getBoundingClientRect();
		// add to bounding box
		if(textRect.left == null || r.left < textRect.left) textRect.left = r.left;
		if(textRect.right == null || r.right > textRect.right) textRect.right = r.right;
		if(textRect.top == null || r.top < textRect.top) textRect.top = r.top;
		if(textRect.bottom == null || r.bottom > textRect.bottom) textRect.bottom = r.bottom;
		
		n = n.nextHighlight;
	}

	n = n.firstNode;  //firstNode is defined in highlights[i].firstNode

	while(n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true) && n != node) {
		// add to bounding box
		if(textRect.left == null || r.left < textRect.left) textRect.left = r.left;
		if(textRect.right == null || r.right > textRect.right) textRect.right = r.right;
		if(textRect.top == null || r.top < textRect.top) textRect.top = r.top;
		if(textRect.bottom == null || r.bottom > textRect.bottom) textRect.bottom = r.bottom;
	}
	
	// finish up
	textRect.width = (textRect.right ? textRect.right : 0) - (textRect.left ? textRect.left : 0);
	textRect.height = (textRect.bottom ? textRect.bottom : 0) - (textRect.top ? textRect.top : 0);
	
	return textRect;
}

function GatherText(node, limit, str, dontFollowNextHighlight) {
	var n = node;

	if(str == null)
		str = "";
	
	while(n && n.nodeName == NODENAME_SPAN && (n.SimpleHighlight && n.SimpleHighlight.highlight == true)) {
		var n2 = n.firstChild;

		while(n2 != null){
			if(n2.nodeName == NODENAME_SPAN && (n2.SimpleHighlight && n2.SimpleHighlight.highlight == true))
				str = GatherText(n2, limit, str, true);
			else if(n2 instanceof Text) {
				str += n2.nodeValue;
			
				if(limit && str.length > limit){
					// chop and add ellipsis, making sure no spaces trail before the ellipsis
					str = str.rtrim();
					return str.substr(0, Math.max(0, limit-3) ) + "...";
					
/*					while(str[limit-1] == ' ' & limit >= 1)
						limit--;
					return str.substr(0, limit) + "...";*/
				}
			}

			n2 = n2.nextSibling;
		}

		if(dontFollowNextHighlight == true)
			break;
		n = n.nextHighlight;
	}

	return str;
}

///

function GetXPathRangeFromRange(range){
	// create xpathRange object and fill with range details
	var xpathRange = {
		xpathStartContainer: null,
		xpathEndContainer: null,
		startOffset: null,
		endOffset: null,
	};

	xpathRange.xpathStartContainer = _getXPath(range.startContainer);
	xpathRange.xpathStartContainer = _xpathArrayToString(xpathRange.xpathStartContainer);
	
	if(range.collapsed == true)
		xpathRange.xpathEndContainer = xpathRange.xpathStartContainer;
	else{
		xpathRange.xpathEndContainer = _getXPath(range.endContainer);;
		xpathRange.xpathEndContainer = _xpathArrayToString(xpathRange.xpathEndContainer);
	}
	
	xpathRange.startOffset = range.startOffset;
	xpathRange.endOffset = range.endOffset;

	return xpathRange;
}

function GetRangeFromXPathRange(xpathRange){
	// should only be one node
	// return null if any xpaths dont evaluate
	try{
		var nodesStart = document.evaluate(xpathRange.xpathStartContainer, document, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if(nodesStart.singleNodeValue == null)
			return null;

		var nodesEnd;
		if(xpathRange.xpathStartContainer != xpathRange.xpathEndContainer){
			nodesEnd = document.evaluate(xpathRange.xpathEndContainer, document, null,  XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if(nodesEnd.singleNodeValue == null)
				return null;
		}
		else
			nodesEnd = nodesStart;
	
		// map to range object
		var range = document.createRange();
	
		range.setStart(nodesStart.singleNodeValue, xpathRange.startOffset);
		range.setEnd(nodesEnd.singleNodeValue, xpathRange.endOffset);
	
		return range;
	}catch(e){
		return null;
	}
}

//////////////////////
// helpers

// convert preference_hl* value to associated classname, or null if not found
function _PrefHLToClassName(prefHL) {
	for(var i=0; i<arrayPrefHLToClassName.length; i++){
		if(arrayPrefHLToClassName[i].prefHL == prefHL)
			return arrayPrefHLToClassName[i].className;
	}
	return null;
}

// convert preference_hl* value to associated classname, or null if not found
function _ClassNameToPrefHL(className) {
	for(var i=0; i<arrayPrefHLToClassName.length; i++){
		if(arrayPrefHLToClassName[i].className == className)
			return arrayPrefHLToClassName[i].prefHL;
	}
	return null;
}

//
function GetFirstNodeFromId(id){
	for(var i=0; i<arrayFirstHighlightNodes.length; i++){
		if(arrayFirstHighlightNodes[i].id == id)
			return arrayFirstHighlightNodes[i];
	}

	return null;
}
//
function RemoveFromFirstNodesArray(node){
	for(var i=0; i<arrayFirstHighlightNodes.length; i++){
		if(arrayFirstHighlightNodes[i] == node){
			// remove from local array and that of the topmost window
			arrayFirstHighlightNodes.splice(i, 1);

			break;
		}
	}// end for
}

/////////////////
// main
/*
if(document.readyState == "loaded" || document.readyState == "complete")
	Main();
else{
	document.addEventListener('load', function (event) {
		Main();
	});
}
*/
Main();
