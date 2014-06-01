///////////////////////////////////////////////
// tippopup.js

var BUG_68135_NOCACHE = true;

///////////////////////////////////////////////
// msg

var MSG_TIP_CONTENT_APPENDSTYLESHEET = "ass"+RandomString(6);
var MSG_TIP_CONTENT_SETBODYINNERHTML = "sbih"+RandomString(6);
var MSG_TIP_CONTENT_SHOWSECTION = "ss"+RandomString(6);
var MSG_TIP_CONTENT_GETDIMENSIONS = "gd"+RandomString(6);
var MSG_TIP_CONTENT_SETLEVEL2SECTIONTAGNAMES = "sl2stn"+RandomString(6);

var MSG_TIP_CONTENT_ONCLICKANCHOR = "oca"+RandomString(6);
var MSG_TIP_CONTENT_ONSIZECHANGE = "osc"+RandomString(6);

///////////////////////////////////////////////
// things borrowed from parsers without including them so must be synced

var CLASS_BING_BUTTONAUDIOPLAYER = "whywontchromeplaywavfileswithoutlockingupandwhyusewavanyway";	// see Bing.js, and keep in sync
var MEDIAWIKI_TOKEN_SPECIALSEARCH = "Special:Search";

///////////////////////////////////////////////
// format stirngs

var FORMAT_TIP_GOOGLELANGUAGEDETECT_CONFIDENT = "Written in <b><<LANGUAGE>></b> (<<CONFIDENCE>>% confident)";
var FORMAT_TIP_GOOGLETRANSLATE_FROMTO = "Translated from <<FROM>> into <<TO>>";
var FORMAT_TIP_GOOGLETRANSLATE_TO = "Translated into <<TO>>";
var FORMAT_TIP_PAGE = "Page <b><<PAGE>></b>";
var FORMAT_TIP_PAGEOFPAGES = "Page <b><<PAGE>></b> of <<TOTALPAGES>>";
var FORMAT_TIP_GOOGLEIMAGESEARCH_WIDTHHEIGHT_EXTENSION = "<<WIDTH>> x <<HEIGHT>> - <<EXTENSION>>";
var FORMAT_TIP_GOOGLEIMAGESEARCH_WIDTHHEIGHT = "<<WIDTH>> x <<HEIGHT>>";
var FORMAT_TIP_GOOGLETRANSLATE_URL = 'http://translate.google.com/translate?sl=<<SRCLANG>>&tl=<<DESTLANG>>&u=<<HREF>>'
var FORMAT_TIP_YAHOOWEB_SIZEDATE = "<<SIZE>>k - <<DATE>>";
var FORMAT_TIP_YAHOOSPELLING_CORRECT = "No Alternate Spelling Suggestions";
var FORMAT_TIP_YAHOOSPELLING_SUGGESTIONS = "Suggested Alternatives<br/><<SUGGESTIONS>>";
var FORMAT_TIP_MSTRANSLATE_TTS_SPOKENLANGUAGE = "<<LANGUAGE>> Narrator";
var FORMAT_TIP_GOOGLETRANSLATE_DEPRECATE = "<i>Google will end their free translation service on December 1st 2011, and will be reducing the daily quota of translations upto that date. Please select <b>Bing Translate</b> from the Service menu (above) instead.</i>";

///////////////////////////////////////////////
// tooltip

var TOOLTIP_TIP_GOOGLELANGUAGEDETECT_RELIABLE = "Reliable Detection";
var TOOLTIP_TIP_GOOGLELANGUAGEDETECT_UNRELIABLE = "Unreliable Detection";
var TOOLTIP_TIP_MSTRANSLATE_TTS_PLAY = "Play";
var TOOLTIP_TIP_PAGE_PREVIOUS = "Goto Previous Page of Results";
var TOOLTIP_TIP_PAGE_NEXT = "Goto Next Page of Results";
var TOOLTIP_TIP_MEDIAWIKI_SECTION_UP = "Goto Previous Section of the Page";
var TOOLTIP_TIP_MEDIAWIKI_SECTION_DOWN = "Goto Next Section of the Page";
var TOOLTIP_TIP_MEDIAWIKI_SECTION = "Page Section";
var TOOLTIP_TIP_MEDIAWIKI_INFOBOX = "Information Box";
var TOOLTIP_TIP_MEDIAWIKI_INFOBOXCONTAINER = "Information Box (click the corresponding icon in the toolbar to hide)";
var TOOLTIP_TIP_TIP_BACK = "Go Back One Tip";
var TOOLTIP_TIP_TIP_FORWARD = "Go Forward One Tip";
var TOOLTIP_TIP_FLICKR_ORIGINAL = "Original File";
var TOOLTIP_TIP_TWITTER_RETWEETS = "Number of recent retweets";
var TOOLTIP_TIP_TWITTER_REFRESH = "Refresh";

var TOOLTIP_TIP_SELECTTEMPLATE = "Service";
var TOOLTIP_TIP_CLOSE = "Close";
var TOOLTIP_TIP_RESTRICTTOSITE = "Limit scope of search to the current site";
var TOOLTIP_TIP_TEMPLATEOPTIONS = "Template Options";
var TOOLTIP_TIP_TTS = "Speak";

///////////////////////////////////////////////
// innerhtml

var INNERHTML_TIP_RESTRICTTOSITE = "Search Just This Site";
var INNERHTML_TIP_GOOGLETRANSLATE_PAGE = "Translate Page";
var INNERHTML_TIP_FLICKR_SORT = "Sort by";
var INNERHTML_TIP_FLICKR_ORIGINALFILE = "[file]";
var INNERHTML_TIP_MEDIAWIKI_SECTION = "Section";
var INNERHTML_TIP_YAHOOWEB_RESTRICT = "Restrict";
//var INNERHTML_TIP_MSTRANSLATE_TTS_SOURCE = "[file]";

///////////////////////////////////////////////
// misc

var PADDING_HEIGHT_WITH_INFOBOXCONTAINER = 10;

var MAXCHARS_TIP_DISPLAYTITLE = 16;
var MAXCHARS_TIP_FLICKR_TITLE = 16;

var SECTIONNAME_TIP_MEDIAWIKI_INTRO = "Summary";

var CANVASWIDTH_TIP_ARROW = 14;
var CANVASHEIGHT_TIP_ARROW = 14;
var MINWIDTH_WORDWRAP_TIP = 128;

var BACKGROUNDCOLOUR_TIP = "#ffc";//"rgb(255,255,225)";
//var TEXTCOLOUR_TIP = "black";
var OPACITY_TIP_MOUSEOVER = 1;
var OPACITY_TIP_MOUSEOUT = 0.95;
var OPACITY_TIP_CLOSE_MOUSEOVER = 1;
var OPACITY_TIP_CLOSE_MOUSEOUT = 0;
var SHADOWWIDTH_TIP = 3;
var SHADOWHEIGHT_TIP = 3;
var SHADOWBLUR_TIP = 8;
var SHADOWCOLOUR_TIP = "rgba(20,20,0,0.5)";
var BORDERRADIUS_TIP = 5;
var BORDERWIDTH_TIP = 2;
var BORDERCOLOUR_TIP = "black";
//var CLOSEBUTTONSUBMARGIN_TIPPOP = 2;

var MAXHEIGHT_NOTICEBARS_TIP = "20em";

var BASEZINDEX_TIP = /*BASEZINDEX_LOOKUPPOPUP*/1000000 + 1000;//99993;

var HIDE_WHILST_CALCULATING_IFRAME_SIZE = true;

/////////////////////////////////
// variables

var arrTipPopupTemplates = null;
var mouseActivateTipPopup = null;
var buttonStatusTipPopupNoticeBar = {};
var useWordUnderCursor_TipPopup;

/////////////////////////////
// func

function DoTipPopup(source, templateId){
	if(source.firstNode){
		// do we want to remove the tip if one already exists for this highlight
		// (this could have been done earlier)
		if(source.firstNode.SimpleHighlight.divTipPopup && source.togglePopup == true){
			RemoveTipPopup(source.firstNode.SimpleHighlight.divTipPopup);
			return;
		}
	}

	// use default template id if none supplied
	if(templateId == null){
		for(var x in arrTipPopupTemplates){
			// default indicates its OUR default. may not be the default in storage
			if(arrTipPopupTemplates[x].default == true){
				templateId = arrTipPopupTemplates[x].id;
				break;
			}
		}
		// use default master template id if none specified (and index 0 if i forgot it)
		if(templateId == null){
			for(var p in _arrTipPopupMasterTemplates){
				if(_arrTipPopupMasterTemplates[p].default == true){
					templateId = _arrTipPopupMasterTemplates[p].id;
					break;
				}
			}
			if(templateId == null){
				// first one that has an id (not a group)
				for(var p in _arrTipPopupMasterTemplates){
					if(_arrTipPopupMasterTemplates[p].id != null){
						templateId = _arrTipPopupMasterTemplates[p].id;
						break;
					}
				}
			}
		}
	}

	// convert id to template/mastertemplate (create template if needed)
	var obj = GetTipTemplateFromDOMAndMasterTemplate(templateId);
	if(obj == null)
		return;
	
	// create popup
	var divPopup = null;
	var text = null;
	var boundingClientRect;
		
	// text/position via range?
	if(source.range){
		// validate args before creating elements
		if(source.range.collapsed == true)
			return;
			
		boundingClientRect = source.range.getBoundingClientRect();
		text = source.range.toString();
	}
	else if(source.firstNode){
		text = source.firstNode.SimpleHighlight.textComplete;
		boundingClientRect = GetHighlightBoundingClientRect(source.firstNode); 	// convert node chain to bounding rect
	}
	else{
		text = source.text;
		boundingClientRect = source.boundingClientRect;
	}
		
	if(text == null || boundingClientRect == null)
		return;

	// remove existing tippopups? (done after source processing, because if source is in tip it would become collapsed)
	if(source.allowMultiple != true)
		RemoveAllTipPopups();
	// create new
	divPopup = CreateTipPopup(boundingClientRect, templateId);//obj.template.id);
	if(divPopup == null)
		return;

	// if using firstNode method for source (ie: a highlight), store divPopup in the node, so it can respond to toggle options
	if(source.firstNode != null){
		source.firstNode.SimpleHighlight.divTipPopup = divPopup;		// so we know the highlight has a tip popup
		divPopup.firstNode = source.firstNode;							// so when divPopup is removed it can remove its value in the node
	}
		
	//divPopup.divMain.template = obj.template;
	divPopup.divMain.masterTemplate = obj.masterTemplate;
	
	// waiting
	ShowWaitingTipPopup(divPopup, true);
	
//		obj.template.options.language = "";
	
	// depending on templateId, request service and set completion variables (fill in on message return)
	var request = {
		msg: "requestTip",
		tipTemplate: obj.template,
		text: text,
		msgSet: msgSetTipPopupText, 
		index: divPopup.id,
	};

	// cache it for re-requests into the same tippopup
	divPopup.request = request;

	
	
	// add event listener for load (after css load event). safe to issue actual request now
	divPopup.divMain.iframeContent.addEventListener("load", function (e){
		// issue
		chrome.extension.sendRequest(e.currentTarget.divPopup.request);
	});

	// issue
//	chrome.extension.sendRequest(request);
}
	
	
function CreateTipPopup(boundingClientRect, templateId){
	function PopulateSelectTemplate(select, idSelect){
		var optgroup = null;
		
		// iterate the master template and add all templates
		for(var p in _arrTipPopupMasterTemplates){
			if(_arrTipPopupMasterTemplates[p].display == false)
				continue;
		
			if(_arrTipPopupMasterTemplates[p].groupStart == true){
				optgroup = document.createElement('optgroup');
				optgroup.label = _arrTipPopupMasterTemplates[p].label;
				select.appendChild(optgroup);
				continue;
			}
			else if(_arrTipPopupMasterTemplates[p].groupEnd == true){
				optgroup = null;
				continue;
			}
			else{
				var option = new Option(_arrTipPopupMasterTemplates[p].name, _arrTipPopupMasterTemplates[p].id);
				
				option.selected = _arrTipPopupMasterTemplates[p].id == idSelect ? true : false;
				if(_arrTipPopupMasterTemplates[p].description)
					option.title = _arrTipPopupMasterTemplates[p].description;		
				
				if(optgroup)
					optgroup.appendChild(option);
				else
					select.options.add(option);
			}
		}
	}
	
	function OnClickCapturedElement(e){
		// capture anchor clicks and turn them to rerequests for the popup
		if(e.target == null || e.target.nodeType != Node.ELEMENT_NODE)
			return;
			
		if(e.target.nodeName == "A"){
			// only prevent normal navigation if its a left click with no modifiers
			if(e.button != 0 || e.ctrlKey == true || e.altKey == true || e.shiftKey == true)
				return;
		
			// only if popup uses our desired template
//			if(e.currentTarget.divPopup.request == null)
//				return;

			// returning true means that it navigated itself so dont pursue link (prevent default)
			if(OnClickAnchor({
				tipId: e.currentTarget.divPopup.id,

				href: e.target.href,
				target: e.target.target,
			
				hostname: e.target.hostname,
				pathname: e.target.pathname,
				search: e.target.search,
				hash: e.target.hash,}) == true){
				//
				e.preventDefault();
			}
		}
		
		/*
		if(e.target.nodeName == "DIV"){		// not srticlty needed
			// general mediawiki code for show/hide navcontents
			//if(e.target.classNameContains(["NavHead"], CSS2.classNameSuffixes.tip.mediaWiki) == true){
			if(e.target.classList.contains("NavHead") == true){
				// find next sibling that is correct class
				var div = e.target;
				
				while(div.nextSibling){
					div = div.nextSibling;
					
					if(div.nodeType == Node.ELEMENT_NODE){
						if(div.classList.contains("NavContent") == true){
						//if(div.classNameContains(["NavContent"], CSS2.classNameSuffixes.tip.mediaWiki) == true){
							// toggle display state
							var styleDisplay = document.defaultView.getComputedStyle(div, null).getPropertyValue('display');
							div.style.setProperty("display", styleDisplay == "none" ? "block" : "none", "important");
							break;
						}
					}
				}
			}
		}
		else if(e.target.nodeName == "A"){
			// only if popup uses our desired template
			if(e.currentTarget.divPopup.request == null)
				return;
			var divPopup = e.currentTarget.divPopup;

			if(DoesTemplateIdHaveMediaWikiAPI(divPopup.request.tipTemplate.id) == true){
				// only prevent normal navigation if its a left click with no modifiers
				if(e.button != 0 || e.ctrlKey == true || e.altKey == true || e.shiftKey == true)
					return;
		
				// is the hostname of the link for us? (crude check)
				if(e.target.hostname == null)
					return;
				
				// File: API doesn't return anything
				// TODO: handled by parser instead?
//					if(e.target.pathname.indexOf('/File:') != -1)
//						return;
				if(e.target.pathname.indexOf(':') != -1)
					return;
				// if it has search terms its probably not for us
				if(e.target.search != "")
					return;
				// hashes probably wont point correct locally anymore, so send to original page
				if(e.target.hash != "")
					return;
				
				if(e.target.hostname.indexOf(divPopup.request.tipTemplate.options.domain) == -1){
					// perhaps it contains the domain of something else that supports the mediawiki api
					for(var y in _arrTipPopupMasterTemplates){
						if(_arrTipPopupMasterTemplates[y].id !== undefined && _arrTipPopupMasterTemplates[y].defaultOptions.hasMediaWikiAPI == true &&
							e.target.hostname.indexOf(_arrTipPopupMasterTemplates[y].defaultOptions.domain) != -1){
							// we'll use this template
							divPopup.divMain.divBar.selectTemplate.value = _arrTipPopupMasterTemplates[y].id;	// select but dont trigger event
							// prepare request object in divPopup as if it had been selected
							OnSelectTipTemplateChange({currentTarget: divPopup.divMain.divBar.selectTemplate}, 
								{updateBranding:true, prepareRequest: true, issueRequest: false});
							break;
						}
					}

					// did we find matching mediawiki?
					if(y == _arrTipPopupMasterTemplates.length)
						return;	//no
				}
				
				// TODO: Not follow red links (className: "New" (+_id))
					
				e.preventDefault();
		
				// query is part after last slash of hostname
				var editionLanguage = e.target.hostname.substr(0, e.target.hostname.indexOf('.'));	// en of en.wikipedia.org
				var index = e.target.pathname.lastIndexOf('/');
				var query = e.target.pathname.substr(index == -1 ? 0 : index+1);
				
				// decodeuri incase it is
				query = decodeURIComponent(query);
				// show BAR waiting
				divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
				// modify CLONE of template (because of the language edition change) & reissue
				divPopup.request = _clone(divPopup.request);
				divPopup.request.text = query;
				divPopup.request.tipTemplate.options.editionLanguage = editionLanguage;
								
				// re-issue
				chrome.extension.sendRequest(divPopup.request);
			}
		}*/
	}// end OnClickCapturedElement
	
	// create elements
	var divPopup = document.createElement('div');
	divPopup.className = CSS2.CLASS_TIP;
	divPopup.style.setProperty("z-index", BASEZINDEX_TIP, "important");
	divPopup.id = RandomString(8);
	// back/forth stuff
	divPopup.arrRequestStack = [];
	divPopup.cursorRequestStack = null;			// cursor == index of current request
	// placement stuff
	divPopup.boundingClientRect = boundingClientRect;
	divPopup.scrollTopBody = document.body.scrollTop;
	divPopup.scrollLeftBody = document.body.scrollLeft;
	// runtime styles
	divPopup.style.setProperty("opacity", OPACITY_TIP_MOUSEOUT, "important");
			
	// upper arrow
	var divArrowUp = divPopup.divArrowUp = document.createElement('div');
	divArrowUp.className = CSS2.CLASS_TIP_ARROW;
	divArrowUp.style.setProperty("margin-bottom", (-BORDERWIDTH_TIP - SHADOWWIDTH_TIP - BORDERWIDTH_TIP) + "px", "important");
	
	var canvasUp = divArrowUp.canvas = document.createElement('canvas');
	canvasUp.className = CSS2.CLASS_TIP_CANVASARROWUP;
	divArrowUp.appendChild(canvasUp);
	divPopup.appendChild(divArrowUp);
	
	// contents
	var divMain = divPopup.divMain = document.createElement('div');
	divMain.className = CSS2.CLASS_TIP_MAIN;
	divMain.divPopup = divPopup;
	divMain.style.setProperty("border", BORDERWIDTH_TIP + 'px solid ' + BORDERCOLOUR_TIP, "important");
	divMain.style.setProperty("background-color", BACKGROUNDCOLOUR_TIP, "important");
	//divMain.style.setProperty("color", TEXTCOLOUR_TIP, "important");
	divMain.style.setProperty("border-radius", BORDERRADIUS_TIP + "px", "important");
	divMain.style.setProperty("padding", BORDERRADIUS_TIP + 2 + "px", "important");
	divMain.style.setProperty("-webkit-box-shadow", SHADOWWIDTH_TIP+"px " + SHADOWHEIGHT_TIP +"px " + SHADOWBLUR_TIP+"px " + SHADOWCOLOUR_TIP, "important");
	divMain.addEventListener("mouseover", function(e){
		e.currentTarget.divPopup.style.setProperty("opacity", OPACITY_TIP_MOUSEOVER, "important");
		e.currentTarget.imgClose.style.setProperty("opacity", OPACITY_TIP_CLOSE_MOUSEOVER, "important");
//		e.currentTarget.imgClose.style.setProperty("display", "", "important");
	});
	divMain.addEventListener("mouseout", function(e){
		e.currentTarget.divPopup.style.setProperty("opacity", OPACITY_TIP_MOUSEOUT, "important");
		e.currentTarget.imgClose.style.setProperty("opacity", OPACITY_TIP_CLOSE_MOUSEOUT, "important");
//		e.currentTarget.imgClose.style.setProperty("display", "none", "important");
	});
	
	
	
	// close
	var imgClose = divPopup.divMain.imgClose = document.createElement('img');
	imgClose.className = CSS2.CLASS_TIP_CLOSE;
	imgClose.src = chrome.extension.getURL('img/cross-small-5.png');
	imgClose.title = TOOLTIP_TIP_CLOSE;
	imgClose.divPopup = divPopup;
//	imgClose.style.setProperty("display", "none", "important");
	imgClose.style.setProperty("opacity", OPACITY_TIP_CLOSE_MOUSEOUT, "important");
//	imgClose.style.setProperty("margin-right", (- BORDERRADIUS_TIP - 2 + CLOSEBUTTONSUBMARGIN_TIPPOP) + "px", "important");
//	imgClose.style.setProperty("margin-top", (- BORDERRADIUS_TIP - 2 + CLOSEBUTTONSUBMARGIN_TIPPOP) + "px", "important");
	imgClose.addEventListener("mouseup", function(e){
		if(e.button == 0)
			RemoveTipPopup(e.currentTarget.divPopup);
	});
	divMain.appendChild(imgClose);
	
	// default content
	// bar (display:table)
	var divBar = divMain.divBar = document.createElement('div');
	divBar.className = CSS2.CLASS_TIP_BAR;
	divBar.divPopup = divPopup;
		// single row (display:table-row)
		var divTBRow = divBar.divTBRow = document.createElement('div');
		divTBRow.className = CSS2.CLASS_TIP_BAR_ROW;
		divBar.appendChild(divTBRow);
			// left side cell (display:table-cell;text-align:left)
			var divTBCellLeft = divTBRow.divTBCellLeft = document.createElement('div');
			divTBCellLeft.className = CSS2.CLASS_TIP_BAR_CELL + " " + CSS2.CLASS_TIP_BAR_CELL_LEFT;
			divTBRow.appendChild(divTBCellLeft);
				// left side of the title bar

				// back/forth buttons
				var arrBackForward = [
					{srcImage: 'img/arrow-180-green.png', title: TOOLTIP_TIP_TIP_BACK, cursorOffset: -1},
					{srcImage: 'img/arrow-green.png', title: TOOLTIP_TIP_TIP_FORWARD, cursorOffset: 1},
				];
				// container for up/down buttons
				var spanBackForwardContainer = divBar.spanBackForwardContainer = document.createElement('span');
				spanBackForwardContainer.className = CSS2.CLASS_TIP_BAR_BUTTONCONTAINER;		// BACKFORWARD_BUTTONS
				spanBackForwardContainer.style.setProperty("margin-right", "6px", "important");
				
				for(var a in arrBackForward){
					var anchor = document.createElement('a');
					anchor.className = CSS2.CLASS_TIP_BAR_BUTTON;		// CLASS_TIP_ANCHORBUTTON
					anchor.href = "#";
					anchor.title = arrBackForward[a].title;
						var img = anchor.img = document.createElement('img');
						img.src = chrome.extension.getURL(arrBackForward[a].srcImage);
						img.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
						anchor.appendChild(img);

					anchor.cursorOffset = arrBackForward[a].cursorOffset;
					anchor.divPopup = divPopup;
					
					anchor.addEventListener("click", function(e){
						e.preventDefault();

						var anchor = e.currentTarget;
						//var selectSection = anchor.selectSection;
						// fake disabled status
						if(anchor.disabled == true)
							return;
							
						// waiting
						//anchor.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
						anchor.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
						// update cursor
						anchor.divPopup.cursorRequestStack += anchor.cursorOffset;
						// issue request at cursor (clone)
						anchor.divPopup.request = _clone(anchor.divPopup.arrRequestStack[anchor.divPopup.cursorRequestStack]);
						// mark request as having come from a back/forth source
						anchor.divPopup.request.tipTemplate.sessionData.isSourceCursorChange = true;
						// issue
						chrome.extension.sendRequest(anchor.divPopup.request);
						
						// update display based on new cursor
						UpdateBackForwardButtons(anchor.divPopup);
					}, true);

					spanBackForwardContainer.appendChild(anchor);
				}
				// initial update
				UpdateBackForwardButtons(divPopup);
								
				divTBCellLeft.appendChild(spanBackForwardContainer);				

				// refresh
				var spanRefresh = divBar.spanRefresh = document.createElement('span');
				spanRefresh.className = CSS2.CLASS_TIP_BAR_REFRESH;//CSS2.CLASS_TIP_BAR_TEXT;//CLASS_TIP_PAGING;
				divTBCellLeft.appendChild(spanRefresh);
 			
				// page
				var spanPaging = divBar.spanPaging = document.createElement('span');
				spanPaging.className = CSS2.CLASS_TIP_BAR_PAGING;//CSS2.CLASS_TIP_BAR_TEXT;//CLASS_TIP_PAGING;
				divTBCellLeft.appendChild(spanPaging);

				// noticebar buttons
				var spanNoticeButtons = divBar.spanNoticeButtons = document.createElement('span');
				spanNoticeButtons.className = CSS2.CLASS_TIP_BAR_BUTTONCONTAINER;	// _NOTICEBUTTONS;
				spanNoticeButtons.style.setProperty("margin-right", "6px", "important");
				divTBCellLeft.appendChild(spanNoticeButtons);
				
			// right side cell (display:table-cell;text-align:right)
			var divTBCellRight = divTBRow.divTBCellRight = document.createElement('div');
			divTBCellRight.className = CSS2.CLASS_TIP_BAR_CELL + " " + CSS2.CLASS_TIP_BAR_CELL_RIGHT;
			divTBRow.appendChild(divTBCellRight);
				// right side of title bar

				// waiting
				var imgWaiting = divBar.imgWaiting = document.createElement('img');
				imgWaiting.className = CSS2.CLASS_TIP_BAR_WAITING;
				imgWaiting.src = chrome.extension.getURL('img/ajax-loader.gif');
				divTBCellRight.appendChild(imgWaiting);
					
				// displaytitle (not always applicable)
				var spanDisplayTitle = divBar.spanDisplayTitle = document.createElement('span');
				spanDisplayTitle.className = CSS2.CLASS_TIP_BAR_DISPLAYTITLE;
				divTBCellRight.appendChild(spanDisplayTitle);

				// brand (always shown)
				var spanBrand = divBar.spanBrand = document.createElement('span');
				spanBrand.className = CSS2.CLASS_TIP_BAR_BRAND;//CSS2.CLASS_TIP_BAR_TEXT;//CLASS_TIP_BRAND;
				spanBrand.style.setProperty("margin-left", "6px", "important");
				divTBCellRight.appendChild(spanBrand);
				
				// select (template) container
				var spanTemplateContainer = divBar.spanTemplateContainer = document.createElement('span');
				spanTemplateContainer.className = CSS2.CLASS_TIP_BAR_BUTTONCONTAINER;
				spanTemplateContainer.style.setProperty("margin-left", "6px", "important");
/*					// template options
					var aTemplateOptions = document.createElement('a');
					aTemplateOptions.className = CSS2.CLASS_TIP_BAR_BUTTON;
					aTemplateOptions.href = chrome.extension.getURL("options.html");//?tab=tip");
					aTemplateOptions.title = TOOLTIP_TIP_TEMPLATEOPTIONS;
						var imgTemplateOptions = document.createElement('img');
						imgTemplateOptions.src = chrome.extension.getURL("img/wrench-balloon.png");
						imgTemplateOptions.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
						imgTemplateOptions.style.setProperty("margin-right", "3px", "important");
						aTemplateOptions.appendChild(imgTemplateOptions);
					spanTemplateContainer.appendChild(aTemplateOptions);*/

					// edition flag (mediawiki)
					var imgTemplateIcon = divBar.imgTemplateIcon = document.createElement('img');
					imgTemplateIcon.className = CSS2.CLASS_TIP_BAR_FLAG;//CLASS_TIP_BAR_BUTTONIMAGE;
					imgTemplateIcon.style.setProperty("margin-right", "3px", "important");
					imgTemplateIcon.style.setProperty("display", "none", "important");		// hidden by default
//					imgEditionMediaWiki.src = chrome.extension.getURL('img/ajax-loader.gif');
					spanTemplateContainer.appendChild(imgTemplateIcon);
				
					// select (template)
					var selectTemplate = divBar.selectTemplate = document.createElement('select');
					selectTemplate.divPopup = divPopup;
					selectTemplate.className = CSS2.CLASS_TIP_BAR_SELECT;//CLASS_TIP_TEMPLATE;
					selectTemplate.title = TOOLTIP_TIP_SELECTTEMPLATE;
					selectTemplate.addEventListener("change", OnSelectTipTemplateChange, false);
					selectTemplate.addEventListener("keyup", OnSelectTipTemplateChange, false);
					// populate with templates and update the branding displayed for it
					PopulateSelectTemplate(selectTemplate, templateId);
					// DoTipPopup requests. no setDefaultTemplate so forced template options don't remain
					OnSelectTipTemplateChange({currentTarget: selectTemplate}, 
						{updateBranding: true, prepareRequest: false, issueRequest: false, setDefaultTemplate: false});
						
					spanTemplateContainer.appendChild(selectTemplate);
				// add
				divTBCellRight.appendChild(spanTemplateContainer);
				
	divMain.appendChild(divBar);

	// noticebars container
	var divNoticeBars = divMain.divNoticeBars = document.createElement('div');
	divNoticeBars.className = CSS2.CLASS_TIP_NOTICEBARSCONTAINER;
	divNoticeBars.divPopup = divPopup;
	divNoticeBars.style.setProperty("display", "none", "important");
	divNoticeBars.style.setProperty("max-height", MAXHEIGHT_NOTICEBARS_TIP, "important");
	divNoticeBars.addEventListener("click", OnClickCapturedElement, true);
	divMain.appendChild(divNoticeBars);

	// content
/*
	var divContent = divMain.divContent = document.createElement('div');
	divContent.className = CSS2.CLASS_TIP_CONTENT;
	divContent.addEventListener("click", OnClickCapturedElement, true);
	divContent.divPopup = divPopup;
//	divMain.appendChild(divContent);
	*/
	var iframeContent = divMain.iframeContent = document.createElement('iframe');
	
	// bug: https://bugs.webkit.org/show_bug.cgi?id=24078
	// Workaround: http://www.mooforum.net/general12/squeezebox-webkit-and-iframe-reloading-t1526.html
	iframeContent.name = RandomString(64);				
	
	iframeContent.className = CSS2.CLASS_TIP_IFRAMECONTENT;
	iframeContent.frameBorder = 0;
	iframeContent.divPopup = divPopup;
//	iframeContent.loadedOnce = false;
	iframeContent.addEventListener("load", function (e){
		//console.log("iframeContent OnLoad (not body version)");
//		console.log("loadedOnce: " + e.currentTarget.loadedOnce);
//		if(e.currentTarget.loadedOnce == true)
//			return;
			
		// append stylesheets of all types of tip
		var arr = [		// null is chrome
			{type: "tip", cssId: [
				CSSID_CHROME_IFRAME,		// <body>
				CSSID_MEDIAWIKI, 
				CSSID_YAHOOWEB,
				CSSID_TWITTER, 
				CSSID_GOOGLEIMAGESEARCH,
			]}
		];
		
		for(var q in arr){
			for(var r in arr[q].cssId)
				chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_APPENDSTYLESHEET, tipId: e.currentTarget.divPopup.id,
					textContent: CSS2.BuildStyleSheet(arr[q].type, arr[q].cssId[r]) });
		}
		
//		e.currentTarget.loadedOnce = true;
	});

	divMain.appendChild(iframeContent);

	iframeContent.src = chrome.extension.getURL("tip.html") + "?" +
		"tipId=" + divPopup.id +
		
		"&ass=" + MSG_TIP_CONTENT_APPENDSTYLESHEET +
		"&sbi=" + MSG_TIP_CONTENT_SETBODYINNERHTML +
		"&ss=" + MSG_TIP_CONTENT_SHOWSECTION + 
		"&gd=" + MSG_TIP_CONTENT_GETDIMENSIONS +
		"&sl2stn=" + MSG_TIP_CONTENT_SETLEVEL2SECTIONTAGNAMES +
		
		"&oca=" + MSG_TIP_CONTENT_ONCLICKANCHOR +
		"&osc=" + MSG_TIP_CONTENT_ONSIZECHANGE;
	
		
	divPopup.appendChild(divMain);

	// lower arrow
	var divArrowDown = divPopup.divArrowDown = document.createElement('div');
	divArrowDown.className = CSS2.CLASS_TIP_ARROW;
	divArrowDown.style.setProperty("margin-top", -BORDERWIDTH_TIP + "px", "important");
	var canvasDown = divArrowDown.canvas = document.createElement('canvas');
	canvasDown.className = CSS2.CLASS_TIP_CANVASARROWDOWN;
	//canvasDown.style.verticalAlign = "top";
	divArrowDown.appendChild(canvasDown);
	divPopup.appendChild(divArrowDown);

	// shared
	canvasUp.width = canvasDown.width = CANVASWIDTH_TIP_ARROW + SHADOWWIDTH_TIP + BORDERWIDTH_TIP;
	canvasUp.height = canvasDown.height = CANVASHEIGHT_TIP_ARROW + SHADOWHEIGHT_TIP + BORDERWIDTH_TIP;
	
	document.body.appendChild(divPopup);

	// position based on current content and source rectangle and scrolling (may change before response)
	PositionTipPopup(divPopup, null);
	
	return divPopup;
}

function RemoveAllTipPopups(){
	var divPopups = document.getElementsByClassName(CSS2.CLASS_TIP);
	for(var x=divPopups.length-1; x>=0; x--)
		RemoveTipPopup(divPopups[x]);
}

function RemoveTipPopup(divPopup){
	// if by creating the tip an object had to be created which cant be passed to us via JSON
	// it is kept in background.html. remove it here (also all are wiped in OnUnload())
	chrome.extension.sendRequest({msg:"releaseTipObject", id: divPopup.id});
/*	
	// remove per-popup data from the template
	if(divPopup.request){
		if(divPopup.request.tipTemplate.id == ID_TIPPOPUP_FLICKR)
			divPopup.request.page = null;
	}
*/		
	// remove link to popup from highlight
	if(divPopup.firstNode)
		divPopup.firstNode.SimpleHighlight.divTipPopup = null;

	document.body.removeChild(divPopup);
}

//////////////////////////////////////

function OnClickAnchorIFrame(request){
	// wrapper for OnClickAnchor. Navigates to url if false returned (ie: default not prevented)
	if(OnClickAnchor(request) == false)
		window.open(request.href, request.target);
}

function OnClickAnchor(request){
	var divPopup = document.getElementById(request.tipId);
	if(divPopup == null)
		return false;
		
	if(DoesTemplateIdHaveMediaWikiAPI(divPopup.request.tipTemplate.id) == true){
		// hash: #cite_note-financialtables-2
		// host: en.wikipedia.org:80		(if port specified)
		// hostname: en.wikipedia.org
		// href: http://en.wikipedia.org/wiki/Google#cite_note-financialtables-2
		// pathname: /wiki/Google
		// port: 80 (if specified, else 0)
		// protocol: http:
		// search: ?xx=yy&zz=2	(if specified, else "")
			
		// No follow red links (className: "New" (+_id))
		if(request.classListContainsMediaWikiNew == true)
			return false;
			
		// if it has search terms its probably not for us
		// TODO: could check if 
//		if(request.search.length > 0)
//			return false;
			
/*	
		// is the hostname of the link for us? (crude check)
		if(request.hostname == null)
			return false;
	*/
		// File: API doesn't return anything
		// TODO: handled by parser instead?
//		if(e.target.pathname.indexOf('/File:') != -1)
		if(request.pathname.indexOf(':') != -1){
			var legal = false;
		
			// in some cases we can get something by identifying last directory name
			var arrTokens = request.pathname.split('/');
			if(arrTokens.length >= 2){
				if(arrTokens[arrTokens.length-2] == MEDIAWIKI_TOKEN_SPECIALSEARCH)	// token next is query
					legal = true;
				else if(request.attrLangParent != null){
					// its an interwiki link to a wiki of this language - modify the request so
					// it looks like it directs to it. eg http://en.wikipedia.org/wiki/pt:Branco
					legal = true;
				}
			}
				
			if(legal == false)
				return false;
		}
		// hashes probably wont point correct locally anymore, so send to original page
//		if(request.hash != "")
//			return false;

		// is link to an anchor on current page? (ie: only difference is hash)
		var aCurrentPage = document.createElement('a');
		aCurrentPage.href = divPopup.request.tipTemplate.sessionData.hrefWikiPage;

		var idHash = request.hash.length > 0 ? request.hash.substring(1) : null;	// remove #
		
		if(request.host == aCurrentPage.host && request.pathname == aCurrentPage.pathname && 
			request.protocol == aCurrentPage.protocol && request.search == aCurrentPage.search){
			// scroll to it
			
			// force selection in selectsection (hash == idScroll)
			var selectSection = divPopup.divMain.divBar.spanPaging.selectSection;
			selectSection.value = request.idL2SectionMediaWiki;								// choose section
			// use fake event, put call directly to pass more arguments (scrollTo override)
			OnChangeSection_MediaWiki({type:"change", currentTarget: selectSection}, idHash);//request.idScrollToMediaWiki);

			return true;
		}
			
		// find template matching teh DOMAIN of hostname of the clicked link (may be same as existing)
		if(request.host != aCurrentPage.host){
			var found_template = false;
			
			for(var y in _arrTipPopupMasterTemplates){
				// only search mediawiki type templates
				if(_arrTipPopupMasterTemplates[y].defaultOptions == null || _arrTipPopupMasterTemplates[y].defaultOptions.hasMediaWikiAPI != true)
					continue;
				// if domain matches and has a . before it, assume its ok
				var idx = request.hostname.lastIndexOf(_arrTipPopupMasterTemplates[y].defaultOptions.domain);
				if(idx == -1)
					continue;
				if(idx >= 1 && request.hostname[idx-1] != '.')
					continue;

				// we'll use this template. select in template selector
				divPopup.divMain.divBar.selectTemplate.value = _arrTipPopupMasterTemplates[y].id;	// select but dont trigger event
					
				// prepare request object in divPopup as if it had been selected
				OnSelectTipTemplateChange({currentTarget: divPopup.divMain.divBar.selectTemplate}, 
					{updateBranding:true, prepareRequest: true, issueRequest: false});
				found_template = true;
				break;
			}
			
			if(found_template == false)
				return false;		//default handler
		}
		
		// check start of pathname (/wiki/google) matches pathWiki (/wiki/) of template
		if(divPopup.request.tipTemplate.options.pathWiki != request.pathname.substring(0, divPopup.request.tipTemplate.options.pathWiki.length))
			return false;
		
		// query is part after last slash of hostname (overridden by attrLangParent)
		var editionLanguage = request.attrLangParent ? 
			request.attrLangParent : request.hostname.substr(0, request.hostname.indexOf('.'));	// en of en.wikipedia.org
		
		var index = request.pathname.lastIndexOf('/');
		var query = request.pathname.substr(index+1);//(index == -1 ? 0 : index+1);
		if(request.attrLangParent){
			var arrColon = query.split(":");		// pt:word
			if(arrColon.length >= 2)
				query = arrColon[arrColon.length - 1];
		}
		
		// show BAR waiting
		//divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
		divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");

		// modify CLONE of template (because of the language edition change) & reissue
		divPopup.request = _clone(divPopup.request);
		divPopup.request.text = decodeURIComponent(query);
		divPopup.request.tipTemplate.sessionData.hash = idHash;			// no #
		divPopup.request.tipTemplate.sessionData.search = request.search;		// cosmetic. only added to displaytitle href. includes ?
		divPopup.request.tipTemplate.options.editionLanguage = editionLanguage;
						
		// re-issue
		chrome.extension.sendRequest(divPopup.request);
		return true;
	}

	return false;
}

////////////////////

function UpdateBackForwardButtons(divPopup){
	// for each button(anchor) in the span, if applying its sectionOffset would put it out of bounds, disable 
	var anchors = divPopup.divMain.divBar.spanBackForwardContainer.getElementsByTagName('A');
	for(var a=0; a<anchors.length; a++){
		var cursorNew = (divPopup.cursorRequestStack == null ? -1 : divPopup.cursorRequestStack + anchors[a].cursorOffset);
		
		anchors[a].disabled = (cursorNew < 0 || cursorNew >= divPopup.arrRequestStack.length) ? true : false;
		// show
		anchors[a].style.setProperty("opacity", anchors[a].disabled == true ? OPACITY_BUTTON_DISABLED : OPACITY_BUTTON_ENABLED, "important");
	}
}

function OnSelectTipTemplateChange(e, mask){
	// because we can be activated by OnKeyUp, check that the select really did change
	if(e.type == "keyup" && e.currentTarget.lastSelectedIndex == e.currentTarget.selectedIndex)
		return;
	e.currentTarget.lastSelectedIndex = e.currentTarget.selectedIndex;

	// re-issue request with a new template (from the option) and reset its tipobject, but same otherwise
	var obj = GetTipTemplateFromDOMAndMasterTemplate(e.currentTarget.value);
	if(obj != null && obj.template != null && obj.masterTemplate != null){
		var divPopup = e.currentTarget.divPopup;
	
		if(mask == null || mask.updateBranding == true){
			// update branding
			divPopup.divMain.divBar.spanBrand.innerHTML = obj.masterTemplate.branding ? obj.masterTemplate.branding : "";
		}
		
		if(mask == null || mask.prepareRequest == true){
			// update divPopup cache of tempalte
			//divPopup.divMain.template = obj.template;
			divPopup.divMain.masterTemplate = obj.masterTemplate;

			// modify request
			divPopup.request.tipTemplate = obj.template;
			divPopup.request.tipTemplate.sessionData.tip_position_locked = false;
			
			// set waiting
			ShowWaitingTipPopup(e.currentTarget.divPopup, true);
			// reset tipobject
			chrome.extension.sendRequest({msg:"releaseTipObject", id: e.currentTarget.divPopup.id});
		}
		
		if(mask == null || mask.issueRequest == true){
			chrome.extension.sendRequest(e.currentTarget.divPopup.request);
		}

		if(mask == null || mask.setDefaultTemplate == true){
			// set as default for this DOM - it should be in the list as GetTipTemplateAnd..() pushes it
			for(var x in arrTipPopupTemplates){
				// default indicates its OUR default. may not be the default in storage
				arrTipPopupTemplates[x].default = 
					(arrTipPopupTemplates[x].id == e.currentTarget.value) ? true : false;
			}
		}
	}
}

function PositionTipPopup(divPopup, args){//optimizeMaxWidthFor, dimensionsIframeBody){
	var topSelection = divPopup.boundingClientRect.top + divPopup.scrollTopBody;
	var leftSelection = divPopup.boundingClientRect.left + divPopup.scrollLeftBody;
	var widthSelection = divPopup.boundingClientRect.width;
	var heightSelection = divPopup.boundingClientRect.height;			
	
	// been given dimensions of body of iframe, so size iframe to them
	if(args && args.dimensionsIFrameBody){
		// counterpart below - makes sure iframe width is updated when popup with removed (ie: sizes to contents)
		if(args.dimensionsIFrameBody.remove_width == true)
//		if(args.dimensionsIFrameBody.refresh_iframe_width == true)
			divPopup.divMain.iframeContent.style.setProperty("width", "0px", "important");
	
		if(args.dimensionsIFrameBody.remove_width == true)
			divPopup.style.removeProperty("width");
		else if(args.dimensionsIFrameBody.width)
			divPopup.style.setProperty("width", args.dimensionsIFrameBody.width + GetScrollBarWidth() + "px", "important");
		
		if(args.dimensionsIFrameBody.remove_height == true)
			divPopup.divMain.iframeContent.style.removeProperty("height");
		else if(args.dimensionsIFrameBody.height)
			divPopup.divMain.iframeContent.style.setProperty("height", args.dimensionsIFrameBody.height + "px", "important");			
			
			


	}
/*
	// TODO: will this help singlerow 7+1 thing?
	// temporarily positiion it here so we can judge its ideal width without constraints
	divPopup.style.setProperty("top", "0px", "important");
	divPopup.style.setProperty("left", "0px", "important");
*/	


	/*	var set_default = false;
		var set_minwidth = true;
		
		if(args.optimizeMaxWidthFor == "selection"){
			if(widthSelection > MINWIDTH_WORDWRAP_TIP){	// if width of selected text exceeds X, limit width of tip to that. eg: translate 'dog', get long word mostly vertical
				divPopup.style.setProperty("max-width", widthSelection + "px", "important");
				divPopup.style.removeProperty("min-width");
			}
			else
				set_default = true;
		}
		else if(args.optimizeMaxWidthFor == "singleRow"){	// eg: image strip
			divPopup.style.removeProperty("max-width");
			divPopup.style.removeProperty("min-width");
		}
		else if(args.optimizeMaxWidthFor == "default")	// 3/4 client width sounds reasonable
			set_default = true;//divPopup.style.setProperty("max-width", ((document.body.clientWidth/4) * 3) + "px", "important");
		
		if(set_default == true){
			divPopup.style.setProperty("max-width", ((document.body.clientWidth/4) * 2) + "px", "important");
			divPopup.style.setProperty("min-width", "800px", "important");
		}
*/

	// max width/height - changing may affect contents of tip, thus the rest of the calculations
	// choose strategy for max width selection
	if(args){
		if(args.optimizeMaxWidthFor == "selection"){
//			if(widthSelection > MINWIDTH_WORDWRAP_TIP)	// if width of selected text exceeds X, limit width of tip to that. eg: translate 'dog', get long word mostly vertical
//				divPopup.style.setProperty("max-width", widthSelection + "px", "important");
//			else
				divPopup.style.removeProperty("max-width");
		}
//		else if(args.optimizeMaxWidthFor == "singleRow")	// eg: image strip
//			divPopup.style.removeProperty("max-width");
		else if(args.optimizeMaxWidthFor == "default")	// 2/4 client width sounds reasonable
			divPopup.style.setProperty("max-width", Math.max(800, ((document.body.clientWidth/4) * 2)) + "px", "important");
	}
	// max height always down 3/4 of client
	var heightArrow = CANVASHEIGHT_TIP_ARROW + SHADOWHEIGHT_TIP + BORDERWIDTH_TIP;
	var paddingMain = parseFloat(divPopup.divMain.style.getPropertyValue("padding"));
	var heightBar = divPopup.divMain.divBar.offsetHeight;
//	divPopup.divMain.iframeContent.style.setProperty("max-height", Math.max(0, 
//		((window.innerHeight/8)*7) - /*(top - document.body.scrollTop) -*/ heightArrow - paddingMain - heightBar) + "px", "important");	// 4 / 3
	divPopup.divMain.iframeContent.style.setProperty("max-height", Math.max(0, 
		(window.innerHeight - 80 - heightArrow - paddingMain - heightBar)) + "px", "important");

	// positioning
	if(args == null || args.set_origin == true){
		// defaults (centre arrow, tip above selection). based on current contents (may have been changed by max-width above
		var top = topSelection - divPopup.offsetHeight;					// above
		var left = leftSelection + (widthSelection / 2) - (divPopup.offsetWidth / 2);		// left + half selectionwidth - half tip
		var textAlignArrow = "center";		
		var paddingArrowLeft = paddingArrowRight = 0;		// padding for centre

		var divArrow;
		
		// position upper/lower arrows based on whether it'll be visible
		if (top - document.body.scrollTop < 1) {		// if top of tip would be above 0
			top = topSelection + heightSelection;			// top of selection  + height of selection
			divArrow = divPopup.divArrowUp;
		}
		else
			divArrow = divPopup.divArrowDown;
		
		// l/c/r arrow
		if (left - document.body.scrollLeft < 1) {	// off left of client
			left = leftSelection;			// left of selection
			textAlignArrow = "left";
			paddingArrowLeft = widthSelection/2;//8;
		}

		if (left + divPopup.offsetWidth > document.body.clientWidth) {		// off right of client
			left = document.body.clientWidth - divPopup.offsetWidth;		// right of SCREEN
			textAlignArrow = "right";
			paddingArrowRight = widthSelection/2;//8;
		}

		// show/hide arrows
		divPopup.divArrowUp.style.setProperty("display", divArrow == divPopup.divArrowUp ? "" : "none", "important");
		divPopup.divArrowDown.style.setProperty("display", divArrow == divPopup.divArrowDown ? "" : "none", "important");
	/*		// place divBar below/above arrow, and update links to it (divPopup.divMain.divBar)
		var divBarTemp = divPopup.divMain.divBar.parentNode.removeChild(divPopup.divMain.divBar);
		divPopup.divMain.divBar = divPopup.divMain.insertBefore(divBarTemp, 
			(divArrow == divPopup.divArrowUp ? null : divPopup.divMain.firstChild));
	*/		

		// apply
		divPopup.style.setProperty("top", top + "px", "important");
		divPopup.style.setProperty("left", left + "px", "important");
		divArrow.style.setProperty("text-align", textAlignArrow, "important");
		divArrow.style.setProperty("padding-left", paddingArrowLeft + "px", "important");
		divArrow.style.setProperty("padding-right", paddingArrowRight + "px", "important");
				
		// remove old arrow from canvas
		var context = divArrow.canvas.getContext("2d");
		context.clearRect(0, 0, divArrow.canvas.width, divArrow.canvas.height);
		
		// arrow point depnds on its alignment
		function ArrowPointX(align){
	/*		var arr = [
				{align: "left", x: 0},
				{align: "right", x: CANVASWIDTH_TIP_ARROW},
				{align: "center", x: CANVASWIDTH_TIP_ARROW/2},
			];
				
			for(var q in arr){
				if(arr[q].align == align)
					return arr[q].x;
			}*/
			return CANVASWIDTH_TIP_ARROW/2;
		}
		
		// fill
		context.beginPath();
		if (divArrow == divPopup.divArrowDown) {
			context.moveTo(0, 0);
			context.lineTo(CANVASWIDTH_TIP_ARROW, 0);
			context.lineTo(ArrowPointX(textAlignArrow), CANVASHEIGHT_TIP_ARROW)
		} else {
			context.moveTo(0, CANVASHEIGHT_TIP_ARROW);
			context.lineTo(CANVASWIDTH_TIP_ARROW, CANVASHEIGHT_TIP_ARROW);
			context.lineTo(ArrowPointX(textAlignArrow), 0)
		}

		context.fillStyle = BACKGROUNDCOLOUR_TIP;
	/*	
		context.shadowColor = SHADOWCOLOUR_TIP;
		context.shadowOffsetX = SHADOWWIDTH_TIP;
		context.shadowOffsetY = SHADOWHEIGHT_TIP;
		context.shadowBlur = SHADOWBLUR_TIP;
	*/
		context.fill();
		
		// stroke
		context.beginPath();
		if (divArrow == divPopup.divArrowDown) {
			context.moveTo(0, 0);
			context.lineTo(ArrowPointX(textAlignArrow), CANVASHEIGHT_TIP_ARROW)
			context.lineTo(CANVASWIDTH_TIP_ARROW, 0);
		} else {
			context.moveTo(0, CANVASHEIGHT_TIP_ARROW);
			context.lineTo(ArrowPointX(textAlignArrow), 0)
			context.lineTo(CANVASWIDTH_TIP_ARROW, CANVASHEIGHT_TIP_ARROW);
		}

		context.shadowColor = "rgba(0,0,0,0)";	//reset shadow
		
		context.strokeStyle = BORDERCOLOUR_TIP;
		context.lineWidth = BORDERWIDTH_TIP;
		context.stroke();
	}

	// counterpart above
	if(args && args.dimensionsIFrameBody && args.dimensionsIFrameBody.remove_width == true)
		divPopup.divMain.iframeContent.style.removeProperty("width");
}

	// stuff for mouseover tip bar controls showing and hiding
	function OnWaitingTipPopupMouseOver(e){
//		console.log("over");
		ShowWaitingTipPopupBarControls(e.currentTarget.divPopup, false, true);
	}
/*	function OnWaitingTipPopupMouseOut(e){
		console.log("out");
//		ShowWaitingTipPopupBarControls(e.currentTarget.divPopup, true, true);
	}
	*/
	function ShowWaitingTipPopupBarControls(divPopup, hide, repositionPopup){
		var divBar = divPopup.divMain.divBar;
		
		// hide (left)
		divBar.divTBRow.divTBCellLeft.style.setProperty("display", hide == true ? "none" : "", "important");
		//	divBar.spanBackForwardContainer.style.setProperty("display", show == true ? "none" : "", "important");
		//	divBar.spanPaging.style.setProperty("display", show == true ? "none" : "", "important");
		//	divBar.spanNoticeButtons.style.setProperty("display", show == true ? "none" : "", "important");*/
		// hide (right)
		divBar.spanDisplayTitle.style.setProperty("display", hide == true ? "none" : "", "important");
		divBar.spanBrand.style.setProperty("display", hide == true ? "none" : "", "important");
		//	divBar.imgTemplateIcon.style.setProperty("display", show == true ? "none" : "", "important");	// icon for brand template (not template selector)
		divBar.spanTemplateContainer.style.setProperty("display", hide == true ? "none" : "", "important");
		
		if(repositionPopup == true)
			PositionTipPopup(divPopup);

	}

function ShowWaitingTipPopup(divPopup, show){
	var divBar = divPopup.divMain.divBar;
	var iframeContent = divPopup.divMain.iframeContent;

	// show waiting icon if show true
	divBar.imgWaiting.style.setProperty("visibility", show == true ? "visible" : "hidden", "important");	// show
	// hide (below - unaffected by mouseover)
	divPopup.divMain.divNoticeBars.style.setProperty("display", show == true ? "none" : "", "important");
	iframeContent.style.setProperty("display", show == true ? "none" : "", "important");
	// hide (left and right)
	ShowWaitingTipPopupBarControls(divPopup, show, show);		// (3rd arg is reposition wrt/ new size). caller restoring state will position themselves
	
	// hide (left)
//	divBar.divTBRow.divTBCellLeft.style.setProperty("display", show == true ? "none" : "", "important");
//		divBar.spanBackForwardContainer.style.setProperty("display", show == true ? "none" : "", "important");		// these 3 not revealed by mouseover (though left container is)
		divBar.spanPaging.style.setProperty("display", show == true ? "none" : "", "important");
		divBar.spanNoticeButtons.style.setProperty("display", show == true ? "none" : "", "important");
/*	// hide (right)
	divBar.spanDisplayTitle.style.setProperty("display", show == true ? "none" : "", "important");
	divBar.spanBrand.style.setProperty("display", show == true ? "none" : "", "important");
	//	divBar.imgTemplateIcon.style.setProperty("display", show == true ? "none" : "", "important");	// icon for brand template (not template selector)
	divBar.spanTemplateContainer.style.setProperty("display", show == true ? "none" : "", "important");
*/
	// add/remove event listeners depending on show state
	if(show == true){
		divPopup.divMain.addEventListener("mouseover", OnWaitingTipPopupMouseOver, true);
//		divPopup.divMain.addEventListener("mouseout", OnWaitingTipPopupMouseOut, true);
	}
	else{
		divPopup.divMain.removeEventListener("mouseover", OnWaitingTipPopupMouseOver, true);
//		divPopup.divMain.removeEventListener("mouseout", OnWaitingTipPopupMouseOut, true);
	}	
	
	
	/*
	
	// hide bar contents
	//divBar.imgWaiting.style.setProperty("display", show == true ? "" : "none", "important");
	divBar.imgWaiting.style.setProperty("visibility", show == true ? "visible" : "hidden", "important");
	divBar.spanDisplayTitle.style.setProperty("display", show == true ? "none" : "", "important");
	divBar.spanPaging.style.setProperty("display", show == true ? "none" : "", "important");
	divBar.spanNoticeButtons.style.setProperty("display", show == true ? "none" : "", "important");
	// icon for template (not template selector)
	divBar.imgTemplateIcon.style.setProperty("display", show == true ? "none" : "", "important");
	// hide notice bar container
	divPopup.divMain.divNoticeBars.style.setProperty("display", show == true ? "none" : "", "important");
	// hide content
	iframeContent.style.setProperty("display", show == true ? "none" : "", "important");
	*/
	// reposition wrt/ new size
/*	if(show == true)		// caller restoring state will position themselves
		PositionTipPopup(divPopup);*/
}

function OnSetTipPopupText(tipId, templateId, data){
	// get specific popup - id is a unique value for each tippopup
/*	var divPopups = document.getElementsByClassName(CSS2.CLASS_TIP);
	var divPopup = null;
	for(var x=0; x<divPopups.length; x++){
		if(divPopups[x].id == tipId){
			divPopup = divPopups[x];
			break;
		}
	}*/
	var divPopup = document.getElementById(tipId);
	if(divPopup == null || divPopup.divMain == null || divPopup.request.tipTemplate == null/* || divPopup.divMain.masterTemplate == null*/)
		return;
		
	// clean request-specific items
	var isSourceCursorChange = divPopup.request.tipTemplate.sessionData.isSourceCursorChange;
	divPopup.request.tipTemplate.sessionData.isSourceCursorChange = false;		// default
		
	// if the message received was delayed and destined for another template, catch it here
	if(templateId != divPopup.request.tipTemplate.id)
		return;
		
	// cache
	var divContentHolder = document.createElement('div');
	
	var iframeContent = divPopup.divMain.iframeContent;
	var divBar = divPopup.divMain.divBar;
	
	// clear bar (that will be repopulated)
	divBar.spanRefresh.innerHTML = null;
	divBar.spanPaging.innerHTML = null;
	divBar.spanDisplayTitle.innerHTML = null;
	RemoveAllNoticeBars(divPopup);

	// clear the waiting indication. if the popup has been locked, the only waiting indication would have
	// been showing the bar waiting icon, so it wouldnt apply
//	chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_SETBODYINNERHTML, tipId: tipId,
//		innerHTML: null});
	ShowWaitingTipPopup(divPopup, false);
	
	var styleControlObj = {};		// showDisplayTitle, showPaging, showNoticeButtons, showTemplateIcon, textAlignContent, optimizeMaxWidthFor
	
	// add to stack unless was from back/forward
	if(isSourceCursorChange != true){
		// crop the request stack at the cursor
		if(divPopup.cursorRequestStack != null)
			divPopup.arrRequestStack = divPopup.arrRequestStack.slice(0, divPopup.cursorRequestStack+1);

		// add to the request stack and update cursor
		divPopup.arrRequestStack.push(_clone(divPopup.request));
		divPopup.cursorRequestStack = divPopup.arrRequestStack.length-1;
		
		UpdateBackForwardButtons(divPopup);
	}

	// sync selectTemplate with the request result (should already be the same requested via back/forward
	divBar.selectTemplate.value = divPopup.request.tipTemplate.id;
	OnSelectTipTemplateChange({currentTarget: divBar.selectTemplate}, {updateBranding: true});
	
	// success - specific rendering
	
	// default paging button - always show refresh button (although handler may not be default one)
	var spanContainer = document.createElement('span');
	spanContainer.className = CSS2.CLASS_TIP_BAR_BUTTONCONTAINER;
	spanContainer.style.setProperty("margin-right", "6px", "important");
		var aRefresh = document.createElement('a');
		aRefresh.className = CSS2.CLASS_TIP_BAR_BUTTON;
		aRefresh.href = "#";
		aRefresh.title = TOOLTIP_TIP_TWITTER_REFRESH;
		aRefresh.divPopup = divPopup;
			var imgRefresh = document.createElement('img');
			imgRefresh.src = chrome.extension.getURL("img/arrow-circle-315.png");
			imgRefresh.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
			aRefresh.appendChild(imgRefresh);
/*		aRefresh.addEventListener("click", function(e){
			e.preventDefault();
		
			// show BAR waiting
			e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
			// modify CLONE of template (has nothing worth keeping around) & reissue
			e.currentTarget.divPopup.request = _clone(e.currentTarget.divPopup.request);
			
			e.currentTarget.divPopup.request.tipTemplate.sessionData.refresh = true;
			e.currentTarget.divPopup.request.tipTemplate.sessionData.page = 1;				// dont have to reset page, but makes more sense

			chrome.extension.sendRequest(e.currentTarget.divPopup.request);
		}, true);*/
		spanContainer.appendChild(aRefresh);
		
		// tts
		var aTTS = divBar.aTTS = document.createElement('a');
		aTTS.className = CSS2.CLASS_TIP_BAR_BUTTON;
		aTTS.href = "#";
		aTTS.title = TOOLTIP_TIP_TTS;
		aTTS.divPopup = divPopup;
			var imgTTS = document.createElement('img');
			imgTTS.src = chrome.extension.getURL("img/speaker-volume-low2.png");
			imgTTS.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
			aTTS.appendChild(imgTTS);
		// handler for tts button
		aTTS.addEventListener("click", function(e){
			// default handler
			e.preventDefault();
			
			chrome.extension.sendRequest({msg: "nativeSpeak", 
				utterance: e.currentTarget.divPopup.divMain.divBar.aTTS.SimpleHighlight.utterance,
				options: {
					lang: e.currentTarget.divPopup.divMain.divBar.aTTS.SimpleHighlight.lang
				}
			});
		}, true);
			
			
			
		spanContainer.appendChild(aTTS);
		
	divBar.spanRefresh.appendChild(spanContainer);
	//divBar.spanPaging.appendChild(spanContainer);
	
	
	var arr = [
//		{templateId: ID_TIPPOPUP_WIKIPEDIA, func: OnSetTipPopupText_WikiMedia},
//		{templateId: ID_TIPPOPUP_WIKTIONARY, func: OnSetTipPopupText_WikiMedia},
		{templateId: ID_TIPPOPUP_MSTRANSLATE_TTS, func: OnSetTipPopupText_MSTranslateTTS},
		{templateId: ID_TIPPOPUP_MSTRANSLATE_TRANSLATE, func: OnSetTipPopupText_MSTranslateTranslate},    
		{templateId: ID_TIPPOPUP_FLICKR, func: OnSetTipPopupText_Flickr},
		{templateId: ID_TIPPOPUP_YAHOOSPELLING, func: OnSetTipPopupText_YahooSpelling},
		{templateId: ID_TIPPOPUP_YAHOOWEB, func: OnSetTipPopupText_YahooWeb},
		{templateId: ID_TIPPOPUP_GOOGLETRANSLATE, func: OnSetTipPopupText_GoogleTranslate},
		{templateId: ID_TIPPOPUP_GOOGLELANGUAGEDETECT, func: OnSetTipPopupText_GoogleLanguageDetect},
		{templateId: ID_TIPPOPUP_GOOGLEIMAGESEARCH, func: OnSetTipPopupText_GoogleImageSearch},
		{templateId: ID_TIPPOPUP_GOOGLETTS, func: OnSetTipPopupText_GoogleTTS},
		{templateId: ID_TIPPOPUP_TWITTER, func: OnSetTipPopupText_TwitterSearch},
		
	];
	
	// special case for mediawiki group
	var func = null;
	if(DoesTemplateIdHaveMediaWikiAPI(divPopup.request.tipTemplate.id))
		func = OnSetTipPopupText_WikiMedia;
	else{
		for(var y in arr){
			if(divPopup.request.tipTemplate.id == arr[y].templateId){
				func = arr[y].func;
				break;
			}
		}
	}
	if(func)
		styleControlObj = func(divPopup, divContentHolder, divPopup.divMain.divBar, data);	

	// all templates create an error string in data if an error occurs
	// therefore if teh func above created any html in divContentHolder, it'll be erased here (but displaytitle/paging will stay)
	if(data.errorHTML || data.warningHTML){
		// [ICON] message
		var imgIcon = document.createElement('img');
		imgIcon.className = CSS2.CLASS_TIP_CONTENT_ICON;
		//imgIcon.style.setProperty("margin-right", "4px", "important");// = CSS2.CLASS_TIP_CONTENT_ICON;
		imgIcon.src = chrome.extension.getURL('img/exclamation' + (data.errorHTML ? '-red' : '') + '.png');
		divContentHolder.appendChild(imgIcon);
		divContentHolder.appendChild(document.createElement('br'));
		
		divContentHolder.innerHTML += (data.errorHTML ? data.errorHTML : data.warningHTML);
		
		styleControlObj.textAlignContent = "center";
		styleControlObj.lock_tip_position = false;
		styleControlObj.optimizeMaxWidthFor = "selection";
	}
	
	
	// which elements have no content and can be hidden?
	var arr = [
		{varName: "showDisplayTitle", elem: divBar.spanDisplayTitle},
		{varName: "showPaging", elem: divBar.spanPaging},
		{varName: "showTemplateIcon", elem: divBar.imgTemplateIcon},
		{varName: "showNoticeButtons", elem: divBar.spanNoticeButtons},];
	for(var d in arr)
		arr[d].elem.style.setProperty("display", styleControlObj[arr[d].varName] == true ? "" : "none", "important");

	// default utterance is the original text
	if(!styleControlObj.ttsUtterance)
		styleControlObj.ttsUtterance = divPopup.request.text,
		
	// hide tts if no utterance
	aTTS.style.setProperty("display", styleControlObj.ttsUtterance ? "" : "none", "important");
	// store in anchor
	aTTS.SimpleHighlight = {
		utterance: styleControlObj.ttsUtterance,
		lang: styleControlObj.ttsLang
	};
	
	// handler for refresh button
	aRefresh.addEventListener("click", styleControlObj.onClickRefresh ? styleControlObj.onClickRefresh : function(e){
		// default handler
		e.preventDefault();
		// show BAR waiting
		//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
		e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
		// dont add to back/forward
		e.currentTarget.divPopup.request.tipTemplate.sessionData.isSourceCursorChange = true;
		// re-issue
		chrome.extension.sendRequest(e.currentTarget.divPopup.request);
	}, true);
	
	// hide while updating
	if(HIDE_WHILST_CALCULATING_IFRAME_SIZE == true)
		divPopup.style.setProperty("visibility", "hidden", "important");

	// if singleRow, dimensions calculated from content. else set default width (innerWidth/2 or selectionwidth) via max-width (or 0 for popup so real width used), and will
	// be returned from MSG_TIP_CONTENT_SETBODYINNERHTML correct height (and same width)
//	if(styleControlObj.optimizeMaxWidthFor != "singleRow"){
		PositionTipPopup(divPopup, {
			set_origin: false,
			optimizeMaxWidthFor: styleControlObj.optimizeMaxWidthFor,
			dimensionsIFrameBody: {
				remove_width: styleControlObj.optimizeMaxWidthFor == "selection" ? true : false,
				width: document.body.clientWidth, 
				remove_height: true,//styleControlObj.optimizeMaxWidthFor == "selection" ? true : false,
				height: 0
			}
		});
//	}

//	console.log("SBIH");
	
	// set the innerhtml of the iframe
	chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_SETBODYINNERHTML, tipId: tipId,
		innerHTML: divContentHolder.innerHTML,
		textAlign: styleControlObj.textAlignContent,
//		whiteSpace: styleControlObj.optimizeMaxWidthFor == "singleRow" ? "pre" : null,			// singlerow is measured via pre
		tipTemplateId: divPopup.request.tipTemplate.id,
		classNameL2SectionMediaWiki: divPopup.request.tipTemplate.sessionData.classNameL2SectionMediaWiki,	// so it can find parent section from clicked link
		showSection: styleControlObj.showSection,		// from wiki
		level2SectionTagName: styleControlObj.level2SectionTagName,	// from wiki
		callbackData: {
			tipId: tipId,
			styleControlObj: styleControlObj,}
		}, function(reply){
		
//		console.log("SBIH CALLBACK");
		
		// request dimensions from iframe, which should arrive after displsy is updated, and thus be correct...
		chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_GETDIMENSIONS, tipId: reply.callbackData.tipId,
			callbackData: reply.callbackData }, function(r){
			// update tip dimensions
			var divPopup = document.getElementById(r.callbackData.tipId);
			if(divPopup){
				// special case for mediawiki where correct height depends on whether infobox is being shown
				// choice of which height is correct depends on whether the infoboxcontainer (float) is visible
				var height;
				
				if(DoesTemplateIdHaveMediaWikiAPI(divPopup.request.tipTemplate.id) == true){
					height = (divPopup.anchorButtonInfoBox && divPopup.anchorButtonInfoBox.selected == true) ?
						r.scrollHeight + PADDING_HEIGHT_WITH_INFOBOXCONTAINER : r.offsetHeight;
				}
				else
					height = r.offsetHeight;
							
				PositionTipPopup(divPopup, {
					set_origin: divPopup.request.tipTemplate.sessionData.tip_position_locked != true ? true : false,
					optimizeMaxWidthFor: r.callbackData.styleControlObj.optimizeMaxWidthFor,
					dimensionsIFrameBody: {
						remove_width: r.callbackData.styleControlObj.optimizeMaxWidthFor == "selection" ? true : false,
						//refresh_iframe_width: r.callbackData.styleControlObj.optimizeMaxWidthFor == "selection" ? true : false,
						width: r.scrollWidth,
						height: height,//r.offsetHeight,
					}
				});
			}
			
			// show once updated
			if(HIDE_WHILST_CALCULATING_IFRAME_SIZE == true)
				divPopup.style.setProperty("visibility", "visible", "important");
		});
		
		// other post-display processing
		var divPopup = document.getElementById(reply.callbackData.tipId);
		if(divPopup){
			//divPopup.divMain.iframeContent.style.setProperty("width", "0px", "important");
/*		
			PositionTipPopup(divPopup, {
				set_origin: divPopup.request.tipTemplate.sessionData.tip_position_locked != true ? true : false,
				optimizeMaxWidthFor: reply.callbackData.styleControlObj.optimizeMaxWidthFor,
				dimensionsIFrameBody: {
					remove_width: reply.callbackData.styleControlObj.optimizeMaxWidthFor == "selection" ? true : false,
					//refresh_iframe_width: reply.callbackData.styleControlObj.optimizeMaxWidthFor == "selection" ? true : false,
					width: reply.scrollWidth,
					height: reply.offsetHeight,
				}
			});
	*/		
			//divPopup.divMain.iframeContent.style.removeProperty("width");

			
			// sync template selector based on the returned idSelector
			if(DoesTemplateIdHaveMediaWikiAPI(divPopup.request.tipTemplate.id) == true){
				// sync template selector based on retured idSelector
				var selectSection = divPopup.divMain.divBar.spanPaging.selectSection;
				
				if(selectSection){
					if(reply.showSectionReply)
						selectSection.value = reply.showSectionReply.idSection;
					else
						selectSection.selectedIndex = 0;		// 1st section (summary or 1st language) by default

					// sync updown buttons with select
					if(selectSection.spanUpDownContainer)
						UpdateUpDownButtons_MediaWiki(selectSection.spanUpDownContainer, selectSection);
						
					// remember last section? (done here because idSection is found automatically if only idScroll (via hash) was specified)
					if(divPopup.request.tipTemplate.options.rememberLastSection == true)
						divPopup.request.tipTemplate.options.idLastSection = selectSection.value;
				}
			}
			
			// once positioned, lock? (until template change via select)
//			if(reply.callbackData.styleControlObj.lock_tip_position == true)
//				divPopup.request.tipTemplate.sessionData.tip_position_locked = true;		
		}
	});
}

function OnSetTipPopupText_TwitterSearch(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "left",
		optimizeMaxWidthFor: "default",
		//showDisplayTitle: data.moreResultsUrl ? true : false,
		showPaging: true,
		lock_tip_position: true,
	};
	
	// THESE VALUES ARE CLEANED IN GetTipTemplateFromDOMandMasterTemplate(). have to modify original :(
	/*
	// values needed for pagination
//	if(divPopup.request.tipTemplate.offset_recent_correction == null)
		divPopup.request.tipTemplate.offset_recent_correction = data.offset_recent_correction;
//	if(divPopup.request.tipTemplate.max_id == null)
		divPopup.request.tipTemplate.max_id = data.max_id;
	// values needed for refresh (only sent on first page)
//	if(divPopup.request.tipTemplate.since_id == null)
//		divPopup.request.tipTemplate.since_id = data.since_id;

*/
	if(data.since_id != null)
		divPopup.request.tipTemplate.sessionData.since_id = data.since_id;
	if(data.max_id != null)
		divPopup.request.tipTemplate.sessionData.max_id = data.max_id;
	if(data.offset_recent_correction != null)
		divPopup.request.tipTemplate.sessionData.offset_recent_correction = data.offset_recent_correction;

	// 1 - displaytitle
	if(data.moreResultsUrl){
		styleControlObj.showDisplayTitle = true;
	
		var aMore = document.createElement('a');
		aMore.href = data.moreResultsUrl;
		aMore.target = "_blank";
		aMore.title = divPopup.request.text;
		aMore.innerText = divPopup.request.text.ellipsis(MAXCHARS_TIP_DISPLAYTITLE);
		divBar.spanDisplayTitle.appendChild(aMore);
	}
	
	// 1.5.0 - paging->refresh
	// handler for our specific refresh function
	styleControlObj.onClickRefresh = function(e){
		e.preventDefault();
	
		// show BAR waiting
		//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
		e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
		// modify CLONE of template (has nothing worth keeping around) & reissue
		e.currentTarget.divPopup.request = _clone(e.currentTarget.divPopup.request);

		// dont add to back/forward
		e.currentTarget.divPopup.request.tipTemplate.sessionData.isSourceCursorChange = true;
		// twitter specific
		e.currentTarget.divPopup.request.tipTemplate.sessionData.refresh = true;
		e.currentTarget.divPopup.request.tipTemplate.sessionData.page = 1;				// dont have to reset page, but makes more sense

		chrome.extension.sendRequest(e.currentTarget.divPopup.request);
	}

	// 1.5.1 - paging
	if(data.is_next == true || data.is_previous == true){
		function OnClick(e){
			e.preventDefault();
			// fake disabled status
			if(e.currentTarget.disabled == true)
				return;
				
			// show BAR waiting
			//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
			e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
			// modify CLONE of template (has nothing worth keeping around) & reissue
			e.currentTarget.divPopup.request = _clone(e.currentTarget.divPopup.request);
	
			e.currentTarget.divPopup.request.tipTemplate.sessionData.page = e.currentTarget.pageNew;
			e.currentTarget.divPopup.request.tipTemplate.sessionData.refresh = false;
			
			chrome.extension.sendRequest(e.currentTarget.divPopup.request);
		}

		AddPagingElements(divPopup, divBar.spanPaging, data.is_previous == false ? 1 : data.page, data.is_next ? (data.page+1) : data.page,
			OnClick, {unknownTotalPages: true});
	}

	if(data.entries && data.entries.length > 0){
		var ol = document.createElement('ol');
		ol.className = CSS2.CLASS_TIP_CONTENT_TWITTER_ORDEREDLIST;
	//	ol.start = parseInt(data.yresp.start) + 1;
		
		for(var q in data.entries){
			var li = document.createElement('li');
			li.className = CSS2.CLASS_TIP_CONTENT_TWITTER_LISTITEM;
			// last entry no margin
			if(q == data.entries.length-1)
				li.style.setProperty("margin-bottom", "0px", "important");
			
			if(data.entries[q].result_type == "popular")
				li.className += " " + CSS2.CLASS_TIP_CONTENT_TWITTER_LISTITEM_POPULAR;
			
				// float author
				var aAuthorImage = document.createElement('a');
				aAuthorImage.className = CSS2.CLASS_TIP_CONTENT_TWITTER_AVATAR;//CLASS_TIP_CONTENT_TWITTER_ANCHORAUTHORIMAGE;
				aAuthorImage.href = data.entries[q].author.uri;
				aAuthorImage.target = "_blank";
					var imgAuthorImage = document.createElement('img');
					imgAuthorImage.className = CSS2.CLASS_TIP_CONTENT_TWITTER_AVATARIMAGE;
					imgAuthorImage.src = data.entries[q].author.srcImage;
					imgAuthorImage.width = imgAuthorImage.height = 48;
					aAuthorImage.appendChild(imgAuthorImage);
				li.appendChild(aAuthorImage);
				// float published
				var aPublished = document.createElement('a');
				aPublished.className = CSS2.CLASS_TIP_CONTENT_TWITTER_PUBLISHED;
				aPublished.innerText = TimeAgo(new Date(data.entries[q].published));
				aPublished.href = data.entries[q].url;
				aPublished.target = "_blank";
				li.appendChild(aPublished);
							
				// header (name realname retweeted)
				var aName = document.createElement('a');
				aName.className = CSS2.CLASS_TIP_CONTENT_TWITTER_ATNAME;//CLASS_TIP_CONTENT_TWITTER_ANCHORATNAME;//CLASS_TIP_CONTENT_YAHOOWEB_ANCHORTITLE;		// LINK
				aName.href = data.entries[q].author.uri;
				aName.target = "_blank";
				aName.innerText = data.entries[q].author.name;
				li.appendChild(aName);
				if(data.entries[q].author.realname){
					var spanRealName = document.createElement('span');
					spanRealName.className = CSS2.CLASS_TIP_CONTENT_TWITTER_REALNAME;
					spanRealName.innerText = data.entries[q].author.realname;
					li.appendChild(spanRealName);
				}
				if(data.entries[q].recent_retweets){
					var imgRR = document.createElement('img');
					imgRR.className = CSS2.CLASS_TIP_CONTENT_TWITTER_RETWEETEDIMAGE;
					imgRR.src = chrome.extension.getURL("img/retweet.png");
					imgRR.title = TOOLTIP_TIP_TWITTER_RETWEETS;
					li.appendChild(imgRR);
					
					var spanRR = document.createElement('span');
					spanRR.className = CSS2.CLASS_TIP_CONTENT_TWITTER_RETWEETS;
					spanRR.innerText = data.entries[q].recent_retweets;
					li.appendChild(spanRR)
				}
				
				// text of tweet
				var divTweet = document.createElement('div');
				divTweet.className = CSS2.CLASS_TIP_CONTENT_TWITTER_TWEET;
				divTweet.innerHTML = data.entries[q].content;
				li.appendChild(divTweet);
				
			ol.appendChild(li);
		}

		divContentHolder.appendChild(ol);
	}
	
	return styleControlObj;
}

function OnSetTipPopupText_YahooWeb(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "left",
		optimizeMaxWidthFor: "default",
		showPaging: true,
		//showDisplayTitle: data.moreResultsUrl ? true : false,
		lock_tip_position: true,
	};

	// title
	if(data.moreResultsUrl){
		styleControlObj.showDisplayTitle = true;
	
		var aMore = document.createElement('a');
		aMore.href = data.moreResultsUrl;
		aMore.target = "_blank";
		aMore.title = divPopup.request.text;
		aMore.innerText = divPopup.request.text.ellipsis(MAXCHARS_TIP_DISPLAYTITLE);
		divBar.spanDisplayTitle.appendChild(aMore);
	}
	
	// contents
	if(data.yresp && data.yresp.resultset_web && data.yresp.resultset_web.length > 0){
		var ol = document.createElement('ol');
		ol.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_ORDEREDLIST;
		ol.start = parseInt(data.yresp.start) + 1;

		for(var q in data.yresp.resultset_web){
			var li = document.createElement('li');
			// last entry no margin
			if(q == data.yresp.resultset_web.length-1)
				li.style.setProperty("margin-bottom", "0px", "important");
		
			li.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_LISTITEM;
				// header (title)
				var aTitle = document.createElement('a');
				aTitle.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_HEADER;
				aTitle.href = data.yresp.resultset_web[q].clickurl;
				aTitle.target = "_blank";
				aTitle.innerHTML = data.yresp.resultset_web[q].title;
				li.appendChild(aTitle);
				
				// abstract
				if(data.yresp.resultset_web[q].abstract && data.yresp.resultset_web[q].abstract.length > 0){
					var divAbstract = document.createElement('div');
					divAbstract.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_ABSTRACT;//CLASS_TIP_CONTENT_TEXT;
					divAbstract.innerHTML = data.yresp.resultset_web[q].abstract;
					li.appendChild(divAbstract);
				}
				
				// footer (green url, size, date, cache)
				var divFooter = document.createElement('div');
				divFooter.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_FOOTER;//CLASS_BASIS;
					// url
					var spanURL = document.createElement('span');
					spanURL.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_URL;//CLASS_BASIS_INLINE + " " + CLASSX_TIP_CONTENT_GREENTEXT;//CLASS_TIP_CONTENT_YAHOOWEB_FOOTERURL;
					spanURL.style.setProperty("margin-right", "6px", "important");
					spanURL.innerHTML = data.yresp.resultset_web[q].dispurl;
					divFooter.appendChild(spanURL);
					// size date
					var spanSize = document.createElement('span');
					spanSize.className = CSS2.CLASS_TIP_CONTENT_YAHOOWEB_SIZEDATE;//CLASS_BASIS_INLINE + " " + CLASSX_TIP_CONTENT_GREYTEXT;//CLASS_TIP_CONTENT_YAHOOWEB_FOOTERSIZEDATE;
					var timeAgo = TimeAgo(new Date(data.yresp.resultset_web[q].date), {days:true, today: true});
					spanSize.innerHTML = FORMAT_TIP_YAHOOWEB_SIZEDATE.replace("<<SIZE>>", Math.ceil(parseInt(data.yresp.resultset_web[q].size)/1024)).replace("<<DATE>>", timeAgo);
					divFooter.appendChild(spanSize);
				li.appendChild(divFooter);
			ol.appendChild(li);
		}
					
		divContentHolder.appendChild(ol);
	}

	if(data.pages > 1){
		function OnClick(e){
			e.preventDefault();
			// fake disabled status
			if(e.currentTarget.disabled == true)
				return;
			// show BAR waiting
			//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
			e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
			// modify CLONE of template (has nothing worth keeping around) & reissue
			e.currentTarget.divPopup.request = _clone(e.currentTarget.divPopup.request);
			
			e.currentTarget.divPopup.request.tipTemplate.sessionData.page = e.currentTarget.pageNew;
			
			chrome.extension.sendRequest(e.currentTarget.divPopup.request);
		}

//		styleControlObj.showPaging = true;
		AddPagingElements(divPopup, divBar.spanPaging, data.page, data.pages, OnClick);
	}

		
	// add 'restrict' checkbox
	var inputRestrict = divBar.spanPaging.inputRestrict = document.createElement('input');
	inputRestrict.className = CSS2.CLASS_TIP_BAR_CHECKBOX;
	inputRestrict.title = TOOLTIP_TIP_RESTRICTTOSITE;
	inputRestrict.style.setProperty("margin-right", "6px", "important");
	inputRestrict.type = "checkbox";
	inputRestrict.checked = data.restrictToHost ? data.restrictToHost : false;
	inputRestrict.id = RandomString(8);

	inputRestrict.divPopup = divPopup;

	inputRestrict.addEventListener("change", function(e){
		// show BAR waiting
		//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
		e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
		// modify template & re-issue
		e.currentTarget.divPopup.request.tipTemplate.options.restrictToHost = e.currentTarget.checked;
		e.currentTarget.divPopup.request.tipTemplate.sessionData.page = 1;			// back to start
		chrome.extension.sendRequest(e.currentTarget.divPopup.request);
	}, false);
	
	// label for checkbox
	var labelRestrict = document.createElement('label');
	labelRestrict.className = CSS2.CLASS_TIP_BAR_LEFTLABEL;
	labelRestrict.htmlFor = inputRestrict.id;
	labelRestrict.innerHTML = INNERHTML_TIP_RESTRICTTOSITE;
	labelRestrict.title = inputRestrict.title;
	divBar.spanPaging.appendChild(inputRestrict);
	divBar.spanPaging.appendChild(labelRestrict);
	
	return styleControlObj;	
}

function OnSetTipPopupText_GoogleImageSearch(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "left",
		optimizeMaxWidthFor: "default",//"singleRow",
		showPaging: true,
		//showDisplayTitle: true,
		lock_tip_position: true,
	};
	
	// cursor ?
	if(data.cursor){
		function OnClickGoogleImageSearch(e){
			// show BAR waiting
			//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
			e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
			
			chrome.extension.sendRequest({msg:"callTipObjectFunction", id: e.currentTarget.paramId, 
				nameVariable: "imageSearch", nameFunction: "gotoPage", arg: e.currentTarget.paramPage});
			e.preventDefault();
		}
		
		// title
		styleControlObj.showDisplayTitle = true;

		var aMore = document.createElement('a');
		aMore.href = data.cursor.moreResultsUrl;
		aMore.target = "_blank";
		aMore.title = divPopup.request.text;
		aMore.innerText = divPopup.request.text.ellipsis(MAXCHARS_TIP_DISPLAYTITLE);
		divBar.spanDisplayTitle.appendChild(aMore);
		
		// < >
		if(data.cursor.pages.length > 1){
			function OnClick(e){
				e.preventDefault();
				// fake disabled status
				if(e.currentTarget.disabled == true)
					return;
					
				// show BAR waiting
				//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
				e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
				// call a function on the object
				chrome.extension.sendRequest({msg:"callTipObjectFunction", id: e.currentTarget.divPopup.id, 
					nameVariable: "imageSearch", nameFunction: "gotoPage", arg: e.currentTarget.pageNew - 1});
			}

			AddPagingElements(divPopup, divBar.spanPaging, data.cursor.currentPageIndex + 1, data.cursor.pages.length, OnClick);
		}
	}

	// add 'restrict' checkbox
	var inputRestrict = divBar.spanPaging.inputRestrict = document.createElement('input');
	inputRestrict.className = CSS2.CLASS_TIP_BAR_CHECKBOX;
//	inputRestrict.style.setProperty("margin-left", "6px", "important");
	inputRestrict.type = "checkbox";
	inputRestrict.title = TOOLTIP_TIP_RESTRICTTOSITE;
	inputRestrict.checked = data.restrictToHost ? data.restrictToHost : false;
	inputRestrict.id = RandomString(8);

	inputRestrict.divPopup = divPopup;

	inputRestrict.addEventListener("change", function(e){
		// show BAR waiting
		//e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
		e.currentTarget.divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
		// modify template & issue command
		e.currentTarget.divPopup.request.tipTemplate.options.restrictToHost = e.currentTarget.checked;
		chrome.extension.sendRequest(e.currentTarget.divPopup.request);
	}, false);
	// label for checkbox
	var labelRestrict = document.createElement('label');
	labelRestrict.className = CSS2.CLASS_TIP_BAR_LEFTLABEL;
	labelRestrict.htmlFor = inputRestrict.id;
	labelRestrict.innerHTML = INNERHTML_TIP_RESTRICTTOSITE;
	labelRestrict.title = inputRestrict.title;
	divBar.spanPaging.appendChild(inputRestrict);
	divBar.spanPaging.appendChild(labelRestrict);
	
	// 2 -generate contents
	if(data.results){
		var max_width = max_height = 0;
		for(var a in data.results){
			if(parseInt(data.results[a].tbWidth) > max_width)
				max_width = data.results[a].tbWidth;
			if(parseInt(data.results[a].tbHeight) > max_height)
				max_height = data.results[a].tbHeight;
		}
		
		for(var a in data.results){
			var table = document.createElement('div');
			table.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT;	// inline-table
			table.style.setProperty("width", max_width + "px", "important");
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;	// table-row
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_THUMBNAIL;//CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CLASSX_TIP_CONTENT_THUMBNAILSHADOW;	//table-cell
	/*					// overlay source w/h
						var divDim = document.createElement('div');
						divDim.className = CLASS_BASIS;
						divDim.style.setProperty("position", "absolute", "important");
						divDim.style.setProperty("color", "white", "important");
						divDim.style.setProperty("text-shadow", "black 1px 1px 2px", "important");
						divDim.style.setProperty("width", max_width+"px", "important");
						divDim.style.setProperty("text-align", "right", "important");
						divDim.innerHTML = data.results[a].width + " x " + data.results[a].height;
						cell.appendChild(divDim);
	*/					// thumbnail linked directly to original
						var anchor = document.createElement('a');
						anchor.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_THUMBNAILANCHOR;//CLASS_TIP_CONTENT_IMAGERESULT_CELL_ANCHORTHUMBNAIL;
						anchor.href = data.results[a].url;
						anchor.target = "_blank";
							var img = document.createElement('img');
							img.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_THUMBNAILIMAGE;//CLASS_TIP_CONTENT_IMAGERESULT_CELL_IMGTHUMBNAIL;
							img.src = data.results[a].tbUrl;
							img.width = data.results[a].tbWidth;
							img.height = data.results[a].tbHeight;
							img.title = data.results[a].titleNoFormatting;
							anchor.appendChild(img);
						cell.appendChild(anchor);
						
					row.appendChild(cell);
				table.appendChild(row);

				// full description with HTML
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_DESCRIPTION;//CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CLASS_TIP_CONTENT_TEXT;
					cell.style.setProperty("max-width", max_width + "px", "important");
						cell.innerHTML = data.results[a].title;
						//cell.innerText = data.results[a].titleNoFormatting;
					row.appendChild(cell);
				table.appendChild(row);
				
				// dimensions - png
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_DIMENSIONS;//CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CLASSX_TIP_CONTENT_GREYTEXT;
					cell.style.setProperty("max-width", max_width + "px", "important");
						var filenamePlusExt = GetFilename(anchor.href, true);
						var indexExt = filenamePlusExt.lastIndexOf('.');
						var ext = (indexExt == -1 ? "?" : filenamePlusExt.substring(indexExt+1));
						var format = FORMAT_TIP_GOOGLEIMAGESEARCH_WIDTHHEIGHT;
						
						cell.innerText = format.replace("<<WIDTH>>", data.results[a].width).replace("<<HEIGHT>>", data.results[a].height);
						if(indexExt != -1)
							cell.innerText += (" - " + ext);
					row.appendChild(cell);
				table.appendChild(row);
				
				// green site url (link to context)
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_CONTEXT;;
						var anchor = document.createElement('a');
						anchor.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CONTEXTANCHOR;
						anchor.href = data.results[a].originalContextUrl;
						anchor.target = "_blank";
						anchor.innerText = data.results[a].visibleUrl ;
						cell.appendChild(anchor);	
					row.appendChild(cell);
				table.appendChild(row);

			divContentHolder.appendChild(table);
		}
	}// end if(data.results)
	
	return styleControlObj;	
}
	
function OnSetTipPopupText_GoogleLanguageDetect(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		ttsUtterance: divPopup.request.text,
		ttsLang: data.codeLanguage,
	
		textAlignContent: "center",
		optimizeMaxWidthFor: "selection",
		showDisplayTitle: true,
		showPaging: true,
		lock_tip_position: false,
	};

	// form url for displaytitle (http://translate.google.com/translate?sl=af&tl=en&u=http://www.google.com)
	var srcLang = data.codeLanguage ? data.codeLanguage : "auto";
	var destLang = "auto";
	var href = FORMAT_TIP_GOOGLETRANSLATE_URL.replace("<<SRCLANG>>", srcLang).replace("<<DESTLANG>>", destLang).replace("<<HREF>>", location.href);
	
	// title
	var aTranslate = document.createElement('a');
	aTranslate.href = href;
	aTranslate.target = "_blank";
	aTranslate.innerHTML = INNERHTML_TIP_GOOGLETRANSLATE_PAGE;
	divBar.spanDisplayTitle.appendChild(aTranslate);
	
	//if(data.codeLanguage){
	if(data.srcLanguageIcon){
		// flag icon
		var imgIcon = document.createElement('img');
		imgIcon.className = CSS2.CLASS_TIP_CONTENT_ICON;//CLASS_BASIS_INLINE;
		imgIcon.src = data.srcLanguageIcon;//chrome.extension.getURL('img/flags/' + data.codeLanguage + '.png')
		imgIcon.title = data.nameLanguage;
		
		divContentHolder.appendChild(imgIcon);
		divContentHolder.appendChild(document.createElement('br'));
	}
	// text
	if(data.nameLanguage){
		var format = FORMAT_TIP_GOOGLELANGUAGEDETECT_CONFIDENT;//(data.isReliable == true ? FORMAT_TIP_GOOGLELANGUAGEDETECT_CONFIDENT_RELIABLE : FORMAT_TIP_GOOGLELANGUAGEDETECT_CONFIDENT);
		divContentHolder.innerHTML += format.replace("<<LANGUAGE>>", data.nameLanguage).replace("<<CONFIDENCE>>", (data.confidence * 100).toFixed(0));
		// TODO: put title on text
		//divContent.title = data.isReliable == true ? TOOLTIP_TIP_GOOGLELANGUAGEDETECT_RELIABLE : TOOLTIP_TIP_GOOGLELANGUAGEDETECT_UNRELIABLE;
	}
	
	return styleControlObj;
}

function OnSetTipPopupText_MSTranslateTranslate(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "center",
        optimizeMaxWidthFor: "selection",
        showDisplayTitle: true,
        showPaging: true,
        lock_tip_position: false,
	};

	// form url for displaytitle (translate entire page) (http://translate.google.com/translate?sl=af&tl=en&u=http://www.google.com)
    // todo: match mismatched language codes between ms trans and google trans
    //	var srcLang = (divPopup.request.tipTemplate.options.srcLang && divPopup.request.tipTemplate.options.srcLang != "") ? divPopup.request.tipTemplate.options.srcLang : "auto";
	var destLang = data.googleLanguageCodes && data.googleLanguageCodes.length > 1 ? data.googleLanguageCodes[0] :  divPopup.request.tipTemplate.options.destLang;
	var href = FORMAT_TIP_GOOGLETRANSLATE_URL.replace("<<SRCLANG>>", "auto"/*srcLang*/).replace("<<DESTLANG>>", destLang).replace("<<HREF>>", location.href);

	styleControlObj.ttsLang = destLang;
    
	// title
	var aTranslate = document.createElement('a');
	aTranslate.href = href;
	aTranslate.target = "_blank";
	aTranslate.innerHTML = INNERHTML_TIP_GOOGLETRANSLATE_PAGE;
	divBar.spanDisplayTitle.appendChild(aTranslate);
    
	// flag icon
	if(data.urlDestLanguageIcon){
		var spanContainer = document.createElement('span');
		var format = data.nameSrcLanguage ? FORMAT_TIP_GOOGLETRANSLATE_FROMTO : FORMAT_TIP_GOOGLETRANSLATE_TO;
		spanContainer.title = format.replace("<<FROM>>", data.nameSrcLanguage ? data.nameSrcLanguage : "").replace("<<TO>>", data.nameDestLanguage);
		
		var arr = [
                   {src: data.urlSrcLanguageIcon},
                   {src: chrome.extension.getURL('img/arrow-000-small-cropped.png'), marginLeft: "8px", marginRight: "8px"},
                   {src: data.urlDestLanguageIcon},
                   ];
		
		for(var e in arr){
			var img = document.createElement('img');
			img.className = CSS2.CLASS_TIP_CONTENT_ICON;
			img.src = arr[e].src;
			if(arr[e].marginLeft)
				img.style.setProperty("margin-left", arr[e].marginLeft, "important");
			if(arr[e].marginRight)
				img.style.setProperty("margin-right", arr[e].marginRight, "important");
			
			spanContainer.appendChild(img);
		}
		
		divContentHolder.appendChild(spanContainer);
		divContentHolder.appendChild(document.createElement('br'));
	}
    
	// translation
	if(data.note){
		divContentHolder.innerHTML += data.note;
		
		styleControlObj.ttsUtterance = data.note;
	}
    
	return styleControlObj;
}

function OnSetTipPopupText_GoogleTranslate(divPopup,  divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "center",
		optimizeMaxWidthFor: "selection",
		showDisplayTitle: true,
		showPaging: true,
		lock_tip_position: false,
	};
	
	// form url for displaytitle (http://translate.google.com/translate?sl=af&tl=en&u=http://www.google.com)
	var srcLang = (divPopup.request.tipTemplate.options.srcLang && divPopup.request.tipTemplate.options.srcLang != "") ? divPopup.request.tipTemplate.options.srcLang : "auto";
	var destLang = divPopup.request.tipTemplate.options.destLang;
	var href = FORMAT_TIP_GOOGLETRANSLATE_URL.replace("<<SRCLANG>>", srcLang).replace("<<DESTLANG>>", destLang).replace("<<HREF>>", location.href);

	styleControlObj.ttsLang = destLang;
	
	// title
	var aTranslate = document.createElement('a');
	aTranslate.href = href;
	aTranslate.target = "_blank";
	aTranslate.innerHTML = INNERHTML_TIP_GOOGLETRANSLATE_PAGE;
	divBar.spanDisplayTitle.appendChild(aTranslate);
	
	// flag icon
	if(data.urlSrcLanguageIcon && data.urlDestLanguageIcon){
		var spanContainer = document.createElement('span');
		var format = data.nameSrcLanguage ? FORMAT_TIP_GOOGLETRANSLATE_FROMTO : FORMAT_TIP_GOOGLETRANSLATE_TO;
		spanContainer.title = format.replace("<<FROM>>", data.nameSrcLanguage).replace("<<TO>>", data.nameDestLanguage);
		
		var arr = [
			{src: data.urlSrcLanguageIcon},
			{src: chrome.extension.getURL('img/arrow-000-small-cropped.png'), marginLeft: "8px", marginRight: "8px"},
			{src: data.urlDestLanguageIcon},
		];
		
		for(var e in arr){
			var img = document.createElement('img');
			img.className = CSS2.CLASS_TIP_CONTENT_ICON;
			img.src = arr[e].src;
			if(arr[e].marginLeft)
				img.style.setProperty("margin-left", arr[e].marginLeft, "important");
			if(arr[e].marginRight)
				img.style.setProperty("margin-right", arr[e].marginRight, "important");
			
			spanContainer.appendChild(img);
		}
		
		divContentHolder.appendChild(spanContainer);
		divContentHolder.appendChild(document.createElement('br'));
	}

	// translation
	if(data.note){
		divContentHolder.innerHTML += data.note;
	
		styleControlObj.ttsUtterance = data.note;
	}
	
	// warning
	var divWarning = document.createElement('div');
	divWarning.className = "warning";
	divWarning.innerHTML = FORMAT_TIP_GOOGLETRANSLATE_DEPRECATE;
	divContentHolder.appendChild(divWarning);
	
//	divContentHolder.innerHTML += FORMAT_TIP_GOOGLETRANSLATE_DEPRECATE.replace("<<TRANSLATION>>", data.note ? data.note : "");
	
	// translation
//	if(data.note)
//		divContentHolder.innerHTML += data.note;

	return styleControlObj;
}

function OnSetTipPopupText_GoogleTTS(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "center",
		optimizeMaxWidthFor: "selection",
		//showDisplayTitle: true,
		showPaging: true,
		lock_tip_position: false,
	};

	// language flag becomes template icon
	styleControlObj.showTemplateIcon = data.srcSpokenLanguageIcon ? true : false;
	if(styleControlObj.showTemplateIcon == true){//data.spokenLanguage){
		divBar.imgTemplateIcon.src = data.srcSpokenLanguageIcon;
		
		var format = FORMAT_TIP_MSTRANSLATE_TTS_SPOKENLANGUAGE;
		divBar.imgTemplateIcon.title = format.replace("<<LANGUAGE>>", data.spokenLanguageName);
	}

	// button event sets source and play each time. only way it seems to work with chrome 8 (wav). doesnt cache:(
	if(data.url){
		// title
		styleControlObj.showDisplayTitle = true;

		CreateBingAudioPlayer(data.url,		// url of wav/mp3
			data.urlFallback,
			divPopup.request.text,			// text of title
			divBar,
			true,							// because google wants own referer, force bug behaviour always
			divContentHolder);
	}
	
	return styleControlObj;
	
}

function OnSetTipPopupText_YahooSpelling(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "center",
		optimizeMaxWidthFor: "selection",
		lock_tip_position: false,
		showPaging: true,
		showDisplayTitle: true,
	};
	
	// displaytitle (no href)
	var aSource = document.createElement('a');
	aSource.title = divPopup.request.text;
	aSource.innerText = divPopup.request.text.ellipsis(MAXCHARS_TIP_DISPLAYTITLE);//INNERHTML_TIP_MSTRANSLATE_TTS_SOURCE;
	divBar.spanDisplayTitle.appendChild(aSource);
	
	// tick/cross icon
	if(data.totalhits){
		var imgIcon = document.createElement('img');
		imgIcon.className = CSS2.CLASS_TIP_CONTENT_ICON;
		// data.totalhits == 0 means correct, else suggestions in html list
		imgIcon.src = chrome.extension.getURL('img/' + (data.totalhits == 0 ? 'tick' : 'cross') + '-circle.png');
		divContentHolder.appendChild(imgIcon);
		divContentHolder.appendChild(document.createElement('br'));
	}
	
	if(data.html || data.totalhits == 0){
		divContentHolder.innerHTML += (data.totalhits == 0 ? 
			FORMAT_TIP_YAHOOSPELLING_CORRECT : FORMAT_TIP_YAHOOSPELLING_SUGGESTIONS.replace("<<SUGGESTIONS>>", data.html));
			
		if(data.html)
			styleControlObj.ttsUtterance = data.html;

//		divContentHolder.innerHTML += FORMAT_TIP_YAHOOSPELLING_SUGGESTIONS.replace("<<SUGGESTIONS>>", data.html);
	}
	
	return styleControlObj;
}

function OnSetTipPopupText_Flickr(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "left",
		optimizeMaxWidthFor: "default",//"singleRow",				// standard (1/2 width client)
		showPaging: true,
		lock_tip_position: true,
	};

	// pages
	if(data.pages > 1){
		function OnClick(e){
			e.preventDefault();
			// fake disabled status
			if(e.currentTarget.disabled == true)
				return;

			var divPopup = e.currentTarget.divPopup;
			
			// show BAR waiting
			//divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
			divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");
			// modify template & reissue
			divPopup.request.tipTemplate.sessionData.page = e.currentTarget.pageNew;
			
			chrome.extension.sendRequest(divPopup.request);
		}

		AddPagingElements(divPopup, divBar.spanPaging, data.page, data.pages, OnClick);
	}

	// add sort select
	function OnChangeFlickrSort(e){
		// because we can be activated by OnKeyUp, check that the select really did change
		if(e.type == "keyup" && e.currentTarget.lastSelectedIndex == e.currentTarget.selectedIndex)
			return;
		e.currentTarget.lastSelectedIndex = e.currentTarget.selectedIndex;
	
		var divPopup = e.currentTarget.divPopup;
		
		// show BAR waiting
		//divPopup.divMain.divBar.imgWaiting.style.setProperty("display", "", "important");
		divPopup.divMain.divBar.imgWaiting.style.setProperty("visibility", "visible", "important");

		// modify template & reissue (NOT clone, so needs to be cleaned in GetTemplate....())
		divPopup.request.tipTemplate.options.sort = e.currentTarget.value;
		divPopup.request.tipTemplate.sessionData.page = 1;		// always reset page
		
		chrome.extension.sendRequest(divPopup.request);
	}
	
	var selectSort = divBar.spanPaging.selectSort = document.createElement('select');
	selectSort.className = CSS2.CLASS_TIP_BAR_SELECT;
	selectSort.divPopup = divPopup;
	selectSort.id = RandomString(8);
	selectSort.addEventListener("change", OnChangeFlickrSort, false);
	selectSort.addEventListener("keyup", OnChangeFlickrSort, false);
	
	// label it
	var labelSort = document.createElement('label');
	labelSort.className = CSS2.CLASS_TIP_BAR_LEFTLABEL;
	labelSort.htmlFor = selectSort.id;
	labelSort.innerHTML = INNERHTML_TIP_FLICKR_SORT;
	
	// populate
	var arr = [
		{name: "Relevance", value: "relevance"}, 
		{name: "Date Posted (Desc)", value: "date-posted-desc"}, {name: "Date Posted (Asc)", value: "date-posted-asc"},
		{name: "Date Taken (Desc)", value: "date-taken-desc"}, {name: "Date Taken (Asc)", value: "date-taken-asc"},
		{name: "Interestingness (Desc)", value: "interestingness-desc"}, {name: "Interestingness (Asc)", value: "interestingness-asc"}];
	for(var p in arr)
		selectSort.options.add( new Option(arr[p].name, arr[p].value) );
	selectSort.value = divPopup.request.tipTemplate.options.sort;		// selected item
	
	// add
	divBar.spanPaging.appendChild(labelSort);
	divBar.spanPaging.appendChild(selectSort);


	








	// 2 -generate contents
	if(data.photos){
		// get max dims of every photo
		var max_width = max_height = 0;
		for(var a in data.photos){
			if(data.photos[a].thumbnail.width > max_width)
				max_width = data.photos[a].thumbnail.width;
			if(data.photos[a].thumbnail.height > max_height)
				max_height = data.photos[a].thumbnail.height;
		}
				
		
		for(var a in data.photos){
			var table = document.createElement('div');
			table.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT;	// inline-table
			table.style.setProperty("width", max_width + "px", "important");
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;	// table-row
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_THUMBNAIL;//CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CLASSX_TIP_CONTENT_THUMBNAILSHADOW;	//table-cell
/*						var divOverlay = document.createElement('div');
						//divOverlay.className = CLASS_BASIS;
						divOverlay.style.setProperty("position", "absolute", "important");
//						divOverlay.style.setProperty("color", "white", "important");
//						divOverlay.style.setProperty("margin-left", ((max_width - data.photos[a].thumbnail.width) / 2) + "px", "important");
//						divOverlay.style.setProperty("margin-right", ((max_width - data.photos[a].thumbnail.width) / 2) + "px", "important");
//						divOverlay.style.setProperty("text-shadow", "black 1px 1px 2px", "important");
						divOverlay.style.setProperty("width", max_width+"px", "important");
						divOverlay.style.setProperty("text-align", "left", "important");
							var aOrig = document.createElement("a");
//							aOrig.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ORIGINALFILEANCHOR;
							aOrig.href = "#";//data.photos[a].originalimage.src;
							aOrig.title = TOOLTIP_TIP_FLICKR_ORIGINAL;
							aOrig.target = "_blank";
								var img = document.createElement('img');
//								img.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_THUMBNAILIMAGE;//CLASS_TIP_CONTENT_IMAGERESULT_CELL_IMGTHUMBNAIL;
								img.src = chrome.extension.getURL("img/16dirty.png");
//								img.width = data.photos[a].thumbnail.width;
//								img.height = data.photos[a].thumbnail.height;
//								img.title = data.photos[a].title;
								aOrig.appendChild(img);
							divOverlay.appendChild(aOrig);
						cell.appendChild(divOverlay);
*/
					
						// thumbnail linked to photo page (on flickr)
						var anchor = document.createElement('a');
						anchor.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_THUMBNAILANCHOR;//CLASS_TIP_CONTENT_IMAGERESULT_CELL_ANCHORTHUMBNAIL;
						anchor.href = data.photos[a].hrefPhoto;
						anchor.target = "_blank";
							var img = document.createElement('img');
							img.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_THUMBNAILIMAGE;//CLASS_TIP_CONTENT_IMAGERESULT_CELL_IMGTHUMBNAIL;
							img.src = data.photos[a].thumbnail.src;
							img.width = data.photos[a].thumbnail.width;
							img.height = data.photos[a].thumbnail.height;
							img.title = data.photos[a].title;
							anchor.appendChild(img);
						cell.appendChild(anchor);
						
					row.appendChild(cell);
				table.appendChild(row);

				// photo title (aka description)
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_DESCRIPTION;//CLASS_TIP_CONTENT_TEXT;
						cell.innerHTML = data.photos[a].title.ellipsis(MAXCHARS_TIP_FLICKR_TITLE);
					row.appendChild(cell);
				table.appendChild(row);
				
				// dimensions/origfmt/datetaken (aka dimensions)
				var innerHTML = "";
				if(data.photos[a].originalimage && data.photos[a].originalimage.width && data.photos[a].originalimage.height)
					innerHTML += FORMAT_TIP_GOOGLEIMAGESEARCH_WIDTHHEIGHT.replace("<<WIDTH>>", data.photos[a].originalimage.width).replace("<<HEIGHT>>", data.photos[a].originalimage.height);
				if(data.photos[a].originalformat)
					innerHTML += ((innerHTML.length > 0 ? " - " : "") + data.photos[a].originalformat);
				if(data.photos[a].datetaken)
					innerHTML += ((innerHTML.length > 0 ? "<br/>" : "") + TimeAgo(new Date(data.photos[a].datetaken), {years: true, days: true, today:true}) );
				
				if(innerHTML.length > 0){
					var row = document.createElement('div');
					row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;
						var cell = document.createElement('div');//(data.photos[a].originalimage && data.photos[a].originalimage.src) ? 'a' : 'div');
						cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_DIMENSIONS;//CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CLASSX_TIP_CONTENT_GREYTEXT;
						cell.innerHTML = innerHTML;
						
						// append link to original photo
						if(data.photos[a].originalimage && data.photos[a].originalimage.src){
							var aOrig = document.createElement("a");
							aOrig.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ORIGINALFILEANCHOR;
							aOrig.href = data.photos[a].originalimage.src;
							aOrig.title = TOOLTIP_TIP_FLICKR_ORIGINAL;
							aOrig.target = "_blank";
							aOrig.innerHTML = INNERHTML_TIP_FLICKR_ORIGINALFILE;
							cell.appendChild(aOrig);
						}
						
						row.appendChild(cell);
					table.appendChild(row);
				}
				
				// green owner (link to profile page) (aka context)
				var row = document.createElement('div');
				row.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_ROW;
					var cell = document.createElement('div');
					cell.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL + " " + CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CELL_CONTEXT;
						var anchor = document.createElement('a');
						anchor.className = CSS2.CLASS_TIP_CONTENT_IMAGERESULT_CONTEXTANCHOR;
						anchor.href = data.photos[a].hrefProfile;
						anchor.target = "_blank";
						anchor.innerText = data.photos[a].ownername;
						cell.appendChild(anchor);	
					row.appendChild(cell);
				table.appendChild(row);

			divContentHolder.appendChild(table);
		}
	}
	
	return styleControlObj;
}

function OnSetTipPopupText_MSTranslateTTS(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "center",
		optimizeMaxWidthFor: "selection",
		//showDisplayTitle: true,
		showPaging: true,
		lock_tip_position: false,
	};

	// language flag becomes template icon
	styleControlObj.showTemplateIcon = data.srcSpokenLanguageIcon ? true : false;
	if(styleControlObj.showTemplateIcon == true){//data.spokenLanguage){
		divBar.imgTemplateIcon.src = data.srcSpokenLanguageIcon;
		
		var format = FORMAT_TIP_MSTRANSLATE_TTS_SPOKENLANGUAGE;
		divBar.imgTemplateIcon.title = format.replace("<<LANGUAGE>>", data.spokenLanguageName);
/*	
		var imgIcon = document.createElement('img');
		imgIcon.className = CSS2.CLASS_TIP_CONTENT_ICON;
		imgIcon.src = data.srcSpokenLanguageIcon;//chrome.extension.getURL('img/flags/' + data.spokenLanguage + '.png');

		var format = FORMAT_TIP_MSTRANSLATE_TTS_SPOKENLANGUAGE;
		imgIcon.title = format.replace("<<LANGUAGE>>", data.spokenLanguageName);

		divContentHolder.appendChild(imgIcon);
		divContentHolder.appendChild(document.createElement('br'));*/
	}
	
	// button event sets source and play each time. only way it seems to work with chrome 8 (wav). doesnt cache:(
	if(data.url){
		// title
		styleControlObj.showDisplayTitle = true;

		CreateBingAudioPlayer(data.url,		// url of wav/mp3
			null,							// no fallback
			divPopup.request.text,			// text of title
			divBar,
			BUG_68135_NOCACHE,				// use url directly in audio tag
			divContentHolder);
/*	
		var aSource = document.createElement('a');
		aSource.href = data.url;
		aSource.target = "_blank";
		aSource.title = divPopup.request.text;
		aSource.innerText = divPopup.request.text.ellipsis(MAXCHARS_TIP_DISPLAYTITLE);//INNERHTML_TIP_MSTRANSLATE_TTS_SOURCE;
		divBar.spanDisplayTitle.appendChild(aSource);

		// create a button with the url of the src in an attribute, which the iframe can
		// extract and use to create audio object
		var button = document.createElement('button');
		button.bug68135NoCache = BUG_68135_NOCACHE;		// trigger behaviour in tip.js
		
		button.className = CLASS_BING_BUTTONAUDIOPLAYER;
		button.style.setProperty("-webkit-user-select", "none", "important");
		button.title = TOOLTIP_TIP_MSTRANSLATE_TTS_PLAY;
		button.setAttribute("srcaudio", data.url);
			var img = document.createElement('img')
			img.src = chrome.extension.getURL("img/user_comment.png");
			button.appendChild(img);

			var audio = document.createElement('audio');
			audio.id = RandomString(32);
			audio.controls = false;
			audio.preload = "none";
			button.appendChild(audio);

		divContentHolder.appendChild(button);*/
	}
	
	return styleControlObj;
}

/*	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	table.appendChild(tbody);				
	
	var tr1 = document.createElement('tr');
		var td1 = document.createElement('td');
			var imgIcon = document.createElement('img');//divPopup.divMain.divContent.imgIcon;
			imgIcon.src = chrome.extension.getURL('img/flags/' + data.spokenLanguage + '.png');
			imgIcon.alt = data.spokenLanguageName + " flag";		// might not work, better than nothing
			var format = FORMAT_TIP_MSTRANSLATE_TTS_SPOKENLANGUAGE;
			imgIcon.title = format.replace("<<LANGUAGE>>", data.spokenLanguageName);
			td1.appendChild(imgIcon);
		tr1.appendChild(td1);
		var td2 = document.createElement('td');
			// button event sets source and play each time. only way it seems to work with chrome 8 (wav). doesnt cache:(
			var button = document.createElement('button');
			button.title = TOOLTIP_TIP_MSTRANSLATE_TTS_PLAY;
			button.audioSrc = data.url;
			var img = button.img = document.createElement('img')
			img.src = chrome.extension.getURL("img/play.png");
			button.appendChild(img);
			td2.appendChild(button);
		tr1.appendChild(td2);					
	tbody.appendChild(tr1);

	var tr2 = document.createElement('tr');
		var td1 = document.createElement('td');
			var a = document.createElement('a');
			a.href = data.url;
			a.target = "_blank";
			a.innerHTML = "Source";
			td1.appendChild(a);
		tr2.appendChild(td1);					
	tbody.appendChild(tr2);
*/

function OnSetTipPopupText_WikiMedia(divPopup, divContentHolder, divBar, data){
	// which items to show/hide
	var styleControlObj = {
		textAlignContent: "left",
		optimizeMaxWidthFor: "default",				// standard (1/2 width client)
		lock_tip_position: false,
		showPaging: true,
	};
	
//	divContentHolder.style.setProperty("display", "none", "important");	// hide whilst section is chosen

	////////////////////
	// sessionData info - needed for OnClick
	divPopup.request.tipTemplate.sessionData.hrefWikiPage = data.hrefWikiPage;
	divPopup.request.tipTemplate.sessionData.hashWikiPage = data.hashWikiPage;

	//////////////////
	// template icon (editionLanguage)
	styleControlObj.showTemplateIcon = data.srcEditionFlagIcon ? true : false;
	if(styleControlObj.showTemplateIcon == true){
		divBar.imgTemplateIcon.src = data.srcEditionFlagIcon;
		divBar.imgTemplateIcon.title = data.tooltipEditionFlag;
	}
	
	/////////////////
 	// things that go in the Notice bar
	var arrNoticeBar = [
		{srcImage: "img/direction.png", title: "Disambiguation & Redirection", key: "NB", defaultShow: true},
		{srcImage: "img/chart_organisation.png", title: "Related Pages",key: "furtherreading"},
		{srcImage: "img/category.png", title: "Categories", key: "categories"},
		{srcImage: "img/external.png", title: "External Links", key: "externallinks"},
		{srcImage: "img/globe.png", title: "Languages", key: "langlinks"},
	];
		
	var arrNoticeBarItem = [
		{html: data.htmlAutoRedirects, /*srcImage: "img/hand-point.png",*/ keyNoticeBar: "NB"},
		{html: data.htmlRedirects, /*srcImage: "img/hand-point.png",*/ keyNoticeBar: "NB"}, 
		{html: data.htmlDisambigs, srcImage: "img/disambiguation.png", keyNoticeBar: "NB"},
//		{html: data.htmlInterProject, srcImage: "img/Wikimedia-favicon.png", keyNoticeBar: "NB"},		// TODO: anchor contents not informative enough

		{html: data.htmlSeeAlsos, keyNoticeBar: "furtherreading"},
		{html: data.htmlMainArticles, keyNoticeBar: "furtherreading"},

		{html: data.htmlCategories, keyNoticeBar: "categories"},
		
		{html: data.htmlExternalLinks, keyNoticeBar: "externallinks"},
		
		{html: data.htmlLanguages, keyNoticeBar: "langlinks"},
	];
	
	for(var q in arrNoticeBarItem){
		if(arrNoticeBarItem[q].html == null || arrNoticeBarItem[q].html == "")
			continue;
			
		// add a bar before adding the item?
		for(var x in arrNoticeBar){
			if(arrNoticeBar[x].key != arrNoticeBarItem[q].keyNoticeBar)
				continue;
			
			// make sure buttons are shown
			styleControlObj.showNoticeButtons = true;
				
			if(arrNoticeBar[x].id == null){
				arrNoticeBar[x].id = AddNoticeBar(divPopup, arrNoticeBar[x].key, 
					chrome.extension.getURL(arrNoticeBar[x].srcImage), arrNoticeBar[x].title);
				
				// its show status may be cached in the DOM in buttonStatusTipPopupNoticeBar.key: show
				var show;
//				if(arrNoticeBar[x].defaultShow == true)
//					show = true;		// always show this one
//				else{
					show = buttonStatusTipPopupNoticeBar[arrNoticeBar[x].key] != null ?
						buttonStatusTipPopupNoticeBar[arrNoticeBar[x].key] : arrNoticeBar[x].defaultShow;
//				}
					
				ShowNoticeBar(divPopup, arrNoticeBar[x].id, show);
			}
									
			// add this item to this bar
			var htmlNoticeBarContent = "";
			// add image to the html if specified
			if(arrNoticeBarItem[q].srcImage){
				var img = document.createElement('img');
				img.src = chrome.extension.getURL(arrNoticeBarItem[q].srcImage);
				htmlNoticeBarContent += img.outerHTML;
			}
			// add contents
			htmlNoticeBarContent += arrNoticeBarItem[q].html;
			// set
			SetNoticeBarContent(divPopup, arrNoticeBar[x].id, htmlNoticeBarContent);
			break;
		}
	}

	///////////////////////////////////
	// display title 
	if(data.displaytitle){
		styleControlObj.showDisplayTitle = true;

		var aDisplayTitle = document.createElement('a');
		aDisplayTitle.target = "_blank";
		aDisplayTitle.href = data.hrefWikiPage;
		aDisplayTitle.title = html_sanitize(data.displaytitle);
		aDisplayTitle.innerHTML = html_sanitize(data.displaytitle.ellipsis(MAXCHARS_TIP_DISPLAYTITLE));		// displaytitle contains styling
		divBar.spanDisplayTitle.appendChild(aDisplayTitle);
	}
		
	////////////////
	// if we wanted summary, wrap it in a div incase it will be used as a section
	var spanIntro = null;
	
	if(data.htmlIntro && data.htmlIntro.length > 0){
		spanIntro = document.createElement('div');
		spanIntro.id = RandomString(8);
		spanIntro.className = CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION;
		
		// images - only shown in first section (although if page has no intro, the image will be seen in its real place anyway
		if(data.arrImageOuterHTML){
			for(var a in data.arrImageOuterHTML){
				// wrap in a right float span
				var span = document.createElement('span');
				span.className = CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_FLOATING;
				span.innerHTML = data.arrImageOuterHTML[a];
				
				spanIntro.innerHTML += span.outerHTML;
			}
		}
	
		spanIntro.innerHTML += data.htmlIntro;
		divContentHolder.appendChild(spanIntro);
	}
	
	// if we wanted sections and they arrived.. (data.sections is always filled)
	if(divPopup.request.tipTemplate.options.getSections == true && data.sections && data.sections.length > 0){
		divContentHolder.innerHTML += data.html;		
		// must show paging controls now
		//styleControlObj.showPaging = true;				
		
		// select for section
		var selectSection = divBar.spanPaging.selectSection = document.createElement('select');
		selectSection.className = CSS2.CLASS_TIP_BAR_SELECT;
		selectSection.style.setProperty("max-width", "10em", "important");
		selectSection.style.setProperty("margin-right", "2px", "important");
		selectSection.divPopup = divPopup;
		selectSection.id = RandomString(8);
		selectSection.title = TOOLTIP_TIP_MEDIAWIKI_SECTION;
		selectSection.addEventListener("change", OnChangeSection_MediaWiki, false);
		selectSection.addEventListener("keyup", OnChangeSection_MediaWiki, false);
		// label it
		var labelSection = document.createElement('label');
		labelSection.className = CSS2.CLASS_TIP_BAR_LEFTLABEL;
		labelSection.htmlFor = selectSection.id;
		labelSection.innerHTML = INNERHTML_TIP_MEDIAWIKI_SECTION;
		// add
		divBar.spanPaging.appendChild(labelSection);
		divBar.spanPaging.appendChild(selectSection);
	
		// 1 - add sections
	
		// summary is always a section (if it exists). hope its not a dupe name
		if(spanIntro){
			var option = new Option(SECTIONNAME_TIP_MEDIAWIKI_INTRO, spanIntro.id);
			option.idLevel2Section = spanIntro.id;
			option.lineUndecorated = SECTIONNAME_TIP_MEDIAWIKI_INTRO;
			
			selectSection.options.add( option );
		}
			
		// level2 sections are the main ones
		var idLevel2Section;
		var numLevel2Sections = 0;
		// spanish doesnt use level 2 as lowest level, so assume first section is lowest level (sections[0].level))
		var levelLowest = data.sections.length > 0 ? data.sections[0].level : null;
		
		for(var x in data.sections){
			if(data.sections[x].level == levelLowest/*2*/){
				idLevel2Section = data.sections[x].anchor;
				numLevel2Sections++;
			}
//			else												// TODO: delete continue when i work out how to scroll subsections
//				continue;
			
			var option = new Option(
				html_sanitize((data.sections[x].level > levelLowest ? "\u00a0" : "") + data.sections[x].number + " " + data.sections[x].line), 
                html_sanitize(data.sections[x].anchor));
			//option.section = data.sections[x];
			option.idLevel2Section = idLevel2Section;
			option.lineUndecorated = data.sections[x].line;
			
			selectSection.options.add( option );
		}

		// select first section unless hash specified. the select template element is synced in the OnSetBodyIFrame callback
		if(data.hashWikiPage){
			styleControlObj.showSection = {
				idSection: null,		// auto,
				idScroll: data.hashWikiPage,
				classNameSection: CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION,
			};
		}
		else{
			//selectSection.selectedIndex = 0;		// 1st section (summary or 1st language) by default
		
			// is the innerHTML of the iframe OK or does it need sections hiding
			if(selectSection.options.length >= 1){
				// have to hide sections after they are added but before shown, so use an argument to MSG_TIP_CONTENT_SETBODYINNERHTML
				var idSection = null;		// section to show
				
				if(divPopup.request.tipTemplate.options.rememberLastSection == true && divPopup.request.tipTemplate.options.idLastSection)
					idSection = divPopup.request.tipTemplate.options.idLastSection;
				
				if(idSection == null){
					if(divPopup.request.tipTemplate.options.defaultSection && divPopup.request.tipTemplate.options.defaultSection.length > 0){
						// defaultSection is case insensitive
						for(var w=0; w<selectSection.options.length; w++){
							if(selectSection.options[w].lineUndecorated.toLowerCase() == divPopup.request.tipTemplate.options.defaultSection.toLowerCase()){
								idSection = selectSection.options[w].idLevel2Section;
								break;
							}
						}
					}

					// if all else fails
					if(idSection == null)
						idSection = selectSection.options[0].idLevel2Section;
				}
				
				// try to restore last section (may not be valid)
				styleControlObj.showSection = {
					idSection: idSection,
					idSectionFallback: selectSection.options[0].idLevel2Section,		// should never fail...
					idScroll: null,
					classNameSection: CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION,
				};
/*			
				styleControlObj.showSection = {
					idSection: selectSection.options[0].idLevel2Section,
					idScroll: selectSection.options[0].value,
				};*/
			}
		}
		
		// italic to show single section (any level) articles
		if(selectSection.options.length == 1)
			selectSection.style.setProperty("font-style", "italic", "important");
			
		// 2 - updown buttons
			
		// up/down for section
		var arrUpDown = [
			{srcImage: 'img/navigation-270-button.png', title: TOOLTIP_TIP_MEDIAWIKI_SECTION_DOWN, sectionOffset: 1},
			{srcImage: 'img/navigation-090-button.png', title: TOOLTIP_TIP_MEDIAWIKI_SECTION_UP, sectionOffset: -1},
		];
		// container for up/down buttons (add to selectSection too)
		var spanUpDownContainer = selectSection.spanUpDownContainer = document.createElement('span');
		spanUpDownContainer.className = CSS2.CLASS_TIP_BAR_BUTTONCONTAINER;//BASIS_INLINE;
		//spanUpDownContainer.style.setProperty("vertical-align", "middle", "important");
		spanUpDownContainer.style.setProperty("margin-right", "6px", "important");
		
		for(var a in arrUpDown){
			var anchor = document.createElement('a');
			anchor.className = CSS2.CLASS_TIP_BAR_BUTTON;	//ANCHORBUTTON;
			anchor.href = "#";
			anchor.title = arrUpDown[a].title;
				var img = anchor.img = document.createElement('img');
				img.src = chrome.extension.getURL(arrUpDown[a].srcImage);
				img.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
				anchor.appendChild(img);

			anchor.selectSection = selectSection;
			anchor.sectionOffset = arrUpDown[a].sectionOffset;
			anchor.spanUpDownContainer = spanUpDownContainer;
			
			anchor.addEventListener("click", function(e){
				e.preventDefault();

				var anchor = e.currentTarget;
				var selectSection = anchor.selectSection;
				
				// if shift pressed, up/down include subsections, so the disabled status is n/a
				if(e.shiftKey == true){
					// would going to next item in select put it out of range?
					var indexNew = selectSection.selectedIndex + anchor.sectionOffset;
					if(indexNew < 0 || indexNew >= selectSection.options.length)
						return;
					selectSection.selectedIndex = indexNew;
				}
				else{
					// fake disabled status check
					if(anchor.disabled == true)
						return;
				
					// set new selection. idLevel2SectionGoto is set by UpdateUpDownButtons_MediaWiki
					selectSection.value = anchor.idLevel2SectionGoto;
//					// get new index
//					selectSection.selectedIndex += anchor.sectionOffset;
				}
				
				// apply
				OnChangeSection_MediaWiki({currentTarget: selectSection});
				// update display
				UpdateUpDownButtons_MediaWiki(anchor.spanUpDownContainer, selectSection);
			}, true);

			spanUpDownContainer.appendChild(anchor);
		}
		// initial update
		UpdateUpDownButtons_MediaWiki(spanUpDownContainer, selectSection);

		// add to paging
		divBar.spanPaging.appendChild(spanUpDownContainer);
	}

	// infobox button
	if(data.arrInfoboxOuterHTML && data.arrInfoboxOuterHTML.length > 0){
		// if we have infoboxes, put them all in a right floated span.
		var spanInfoboxContainer = document.createElement('span');

		spanInfoboxContainer.className = CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_INFOBOXCONTAINER;
		spanInfoboxContainer.id = RandomString(8);
		spanInfoboxContainer.title = TOOLTIP_TIP_MEDIAWIKI_INFOBOXCONTAINER;
			
		for(var a in data.arrInfoboxOuterHTML)
			spanInfoboxContainer.innerHTML += data.arrInfoboxOuterHTML[a];
				
		// button to control show/hide
		var anchorButton = divPopup.anchorButtonInfoBox = document.createElement('a');
		anchorButton.className = CSS2.CLASS_TIP_BAR_BUTTON;		//
		anchorButton.style.setProperty("padding-right", "6px", "important");
		anchorButton.href = "#";
		anchorButton.title = TOOLTIP_TIP_MEDIAWIKI_INFOBOX;
			var img = anchorButton.img = document.createElement('img');
			img.src = chrome.extension.getURL("img/infocard.png");
			img.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
			anchorButton.appendChild(img);

		anchorButton.divPopup = divPopup;
		anchorButton.keyPersist = "infobox";		// reuse buttonStatusTipPopupNoticeBar structure from noticebar buttons
		anchorButton.idInfoboxContainer = spanInfoboxContainer.id;
		anchorButton.selected = buttonStatusTipPopupNoticeBar[anchorButton.keyPersist] == null ? 
			false : buttonStatusTipPopupNoticeBar[anchorButton.keyPersist];		// default is off (false)
//		anchorButton.id = RandomString(8);		
		anchorButton.addEventListener("click", OnClickButtonInfobox_MediaWiki, true);
		
		// initial update, set selected status (default is to show) (fake event)
		// this call will fail because the html hasnt been added to the frame yet. the call just sets the button show state
		OnClickButtonInfobox_MediaWiki({currentTarget: anchorButton}, anchorButton.selected);
		// flag in styleControlObj to call OnClickButtonInfobox_MediaWiki once the body text is set
		styleControlObj.level2SectionTagName = (anchorButton.selected == true ? "span" : "div");
		
		// now show/hide teh container
		spanInfoboxContainer.style.setProperty("display", anchorButton.selected == true ? "" : "none", "important");
		
		divBar.spanPaging.appendChild(anchorButton);
		
		// float must be first child in container
		divContentHolder.insertAdjacentElement("afterBegin", spanInfoboxContainer);
	}
	else
		divPopup.anchorButtonInfoBox = null;
	
	
	return styleControlObj;
}

function OnClickButtonInfobox_MediaWiki(e, show){
	e.returnValue = false;
	
	// toggle existing status (unless overridden)
	if(show == null)
		show = e.currentTarget.selected == true ? false : true;
	e.currentTarget.selected = show;
	
	// reflect in button
	e.currentTarget.img.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
	if(e.currentTarget.selected == true)
		e.currentTarget.img.classList.add(CSS2.CLASS_TIP_BAR_BUTTONSELECTED_X);

	// remember in DOM
	buttonStatusTipPopupNoticeBar[e.currentTarget.keyPersist] = e.currentTarget.selected;
	
	// when infobox is invisible, the sizes returned are only correct if each section is in a div (not a span, as
	// is normal when infobox is visible)
	chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_SETLEVEL2SECTIONTAGNAMES, tipId: e.currentTarget.divPopup.id,
//		className: CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION,
		tagName: show == true ? "span" : "div"});//"display: " + (show == true ? "inline" : "block") + "! important;"});
	
	// show/hide infoboxcontainer
	chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_SHOWSECTION, tipId: e.currentTarget.divPopup.id,
		idSection: e.currentTarget.idInfoboxContainer,
		idScroll: null,
		classNameSection: null,
		show: e.currentTarget.selected});
}


function OnChangeSection_MediaWiki(e, idScrollOverride){
	// because we can be activated by OnKeyUp, check that the select really did change
	if(e.type == "keyup" && e.currentTarget.lastSelectedIndex == e.currentTarget.selectedIndex)
		return;
	e.currentTarget.lastSelectedIndex = e.currentTarget.selectedIndex;
	
	var option = e.currentTarget.options[e.currentTarget.selectedIndex];
	// send message to iframe to show our section (can be overridden by OnClickAnchor() as caller)
	ShowSection_MediaWiki(e.currentTarget.divPopup.id, 
		option.idLevel2Section, idScrollOverride ? idScrollOverride : option.value);

	// update visibility of up/down buttons
	if(e.currentTarget.spanUpDownContainer)
		UpdateUpDownButtons_MediaWiki(e.currentTarget.spanUpDownContainer, e.currentTarget);
}
			
function ShowSection_MediaWiki(tipId, idSection, idScroll){
	// reset height (only when infobox shown) for every section change
	var divPopup = document.getElementById(tipId);
	if(divPopup){
		if(divPopup.anchorButtonInfoBox && divPopup.anchorButtonInfoBox.selected == true){
			PositionTipPopup(divPopup, {
				dimensionsIFrameBody: {
					remove_width: false,
					remove_height: true,
	//				height: 0
				}
			});
		}
	}

	chrome.extension.sendRequest({ msg: "relayRequest", msgRelay: MSG_TIP_CONTENT_SHOWSECTION, tipId: tipId,
		idSection: idSection,
		idScroll: idScroll,
		classNameSection: CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION,
		callbackData: {
			tipId: tipId,
			idSection: idSection,
			},
		}, function(reply){
		// will update to new height via message to OnSizeChangeIFrame
		var divPopup = document.getElementById(reply.callbackData.tipId);
		if(divPopup){
/*			// update to new height
			PositionTipPopup(divPopup, {
				set_origin: false,
				//optimizeMaxWidthFor: reply.callbackData.styleControlObj.optimizeMaxWidthFor,
				dimensionsIFrameBody: {
					remove_width: false,
					height: reply.offsetHeight,
				}
			});
	*/		
			// remember chosen section?
			if(divPopup.request.tipTemplate.options.rememberLastSection == true)
				divPopup.request.tipTemplate.options.idLastSection = reply.callbackData.idSection;
		}
		
	});
}

function OnSizeChangeIFrame(request){
	var divPopup = document.getElementById(request.tipId);
	if(divPopup == null)
		return;

	// choice of which height is correct depends on whether the infoboxcontainer (float) is visible
	var height = (divPopup.anchorButtonInfoBox && divPopup.anchorButtonInfoBox.selected == true) ?
		request.scrollHeight + PADDING_HEIGHT_WITH_INFOBOXCONTAINER : request.offsetHeight;
				
	// update to new height
	PositionTipPopup(divPopup, {
		set_origin: false,
		//optimizeMaxWidthFor: reply.callbackData.styleControlObj.optimizeMaxWidthFor,
		dimensionsIFrameBody: {
			remove_width: false,
			height: height,/*request.offsetHeight,			// valid with no infobox visible
//			height: request.scrollHeight,			// valid with infobox*/
		}
	});
}

function UpdateUpDownButtons_MediaWiki(spanUpDownContainer, selectSection){
	// for each button(anchor) in the span, if applying its sectionOffset would put it out of bounds, disable italics
	var anchors = spanUpDownContainer.getElementsByTagName('A');
	for(var a=0; a<anchors.length; a++){
		// calculate status of buttons by find a different idLevel2section
		// in the direction indicated by sectionOffset
		//var indexNew = selectSection.selectedIndex + anchors[a].sectionOffset;
		var idLevel2SectionSelected = selectSection.options[selectSection.selectedIndex].idLevel2Section;

		anchors[a].disabled = true;
		for(var i=selectSection.selectedIndex + anchors[a].sectionOffset; i>=0 && i<selectSection.options.length; i+=anchors[a].sectionOffset){
			// idLevel2Section is the l2 section that this section or subsection belongs to. if equal they're a header
			if(selectSection.options[i].idLevel2Section != idLevel2SectionSelected){
				anchors[a].disabled = false;
				anchors[a].idLevel2SectionGoto = selectSection.options[i].idLevel2Section;	// when button pressed, change to this value
				break;
			}
		}
	
		// show
		anchors[a].style.setProperty("opacity",anchors[a].disabled == true ? OPACITY_BUTTON_DISABLED : OPACITY_BUTTON_ENABLED, "important");
	}
}

/////////////////////////////////////
// helpers for OnSetTipPopupText_*

function AddPagingElements(divPopup, elemParent, page, pages, OnClick, opt){
	var spanContainer = document.createElement('span');
	spanContainer.className = CSS2.CLASS_TIP_BAR_BUTTONCONTAINER;//CLASS_BASIS_INLINE;
	spanContainer.style.setProperty("margin-right", "3px", "important");
	//spanContainer.style.setProperty("vertical-align", "middle", "important");

	// < and > buttons
	var arrPaging = [
		{srcImage: 'img/navigation-180-button.png', title: TOOLTIP_TIP_PAGE_PREVIOUS, pageOffset: -1, enabled: page > 1},
		{srcImage: 'img/navigation-000-button.png', title: TOOLTIP_TIP_PAGE_NEXT, pageOffset: 1, enabled: page < pages/*, marginRight: "3px" */},
	];
	
	for(var a in arrPaging){
		var aPage = document.createElement('a');
		aPage.className = CSS2.CLASS_TIP_BAR_BUTTON;	//ANCHORBUTTON;
		if(arrPaging[a].marginLeft)
			aPage.style.setProperty("margin-left", arrPaging[a].marginLeft, "important");
		if(arrPaging[a].marginRight)
			aPage.style.setProperty("margin-right", arrPaging[a].marginRight, "important");
		aPage.href = "#";
		aPage.title = arrPaging[a].title;
			var imgPage = aPage.img = document.createElement('img');
			imgPage.src = chrome.extension.getURL(arrPaging[a].srcImage);
			imgPage.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
			aPage.appendChild(imgPage);
		
		aPage.disabled = (arrPaging[a].enabled == true ? false : true);
		aPage.style.setProperty("opacity", arrPaging[a].enabled == true ? OPACITY_BUTTON_ENABLED : OPACITY_BUTTON_DISABLED, "important");
		
		aPage.pageNew = page + (arrPaging[a].pageOffset);
		aPage.divPopup = divPopup;
		aPage.addEventListener("click", OnClick, true);

		spanContainer.appendChild(aPage);
	}
	elemParent.appendChild(spanContainer);

	// page x / y (not part of container)
	var format;
	if(opt && opt.unknownTotalPages == true)
		format = FORMAT_TIP_PAGE.replace("<<PAGE>>", AddCommas(page));
	else
		format = FORMAT_TIP_PAGEOFPAGES.replace("<<PAGE>>", AddCommas(page)).replace("<<TOTALPAGES>>", AddCommas(pages));

	var spanText = document.createElement('span');
	spanText.className = CSS2.CLASS_TIP_BAR_TEXT;
	spanText.style.setProperty("margin-right", "6px", "important");
	spanText.innerHTML = format;
	//spanContainer.appendChild(spanText);
	elemParent.appendChild(spanText);
	
	//elemParent.appendChild(spanContainer);
}


function GetTipTemplateFromDOMAndMasterTemplate(templateId){
	// NB: will create an entry in our arrTipPopupTemplates if neccessary
	var template = null;
	var masterTemplate = null;

	if(templateId == null)
		return null;
	
	// find mastertemplate (must exist)
	for(var y in _arrTipPopupMasterTemplates){
		if(_arrTipPopupMasterTemplates[y].id == templateId){
			masterTemplate = _arrTipPopupMasterTemplates[y];
			
			// might not get template though
			for(var x in arrTipPopupTemplates){
				if(arrTipPopupTemplates[x].id == masterTemplate.id){
					template = arrTipPopupTemplates[x];
					break;
				}
			}
			break;
		}
	}
	if(masterTemplate == null)
		return null;
		
	// null template means use defaults
	if(template == null){
		template = _clone(masterTemplate);
		template.options = _clone(masterTemplate.defaultOptions);
			
		// add to our list of templates, so any changes are kept
		arrTipPopupTemplates.push(template);
	}
	else{
		// validate that the template stored has all the variables of the master template. perhaps teh master template
		// has been updated after the template was stored in localStorage
		if(template.options == null)
			template.options = {};
			
		for(var q in masterTemplate.defaultOptions){
			if(template.options[q] === undefined)
				template.options[q] = masterTemplate.defaultOptions[q];
		}
	}

	// artificially modify all returned templates to include hostname, for those that restrict to host
	// its not the best place to pass it, but its better than nothing
	
	// normally created in createtippopup(), but that might not be called yet. used to set the classname for section divs in MediaWiki.js
	if(CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION === undefined)
		CSS2.BuildStyleSheet("tip", CSSID_MEDIAWIKI);
	
	template.sessionData = {
		hostname: location.hostname,		// for 'restrict to this site' (google/yahoo)
		isSourceCursorChange: false,		// for back/forward
	
//		suffixClassNameMediaWiki: CSS2.classNameSuffixes.tip.mediaWiki,		// for mediawiki (cant be bothered to if() it)
		classNameL2SectionMediaWiki: CSS2.CLASS_TIP_CONTENT_MEDIAWIKI_LEVEL2SECTION,
	};
	
	
	
	
	
		
		
/*	
	template.hostname = location.hostname;
	template.suffixClassName = CSS2.classNameSuffixes.tip.mediaWiki;

	// 'clean' template of per-tipopup-session data (ie: on these the bar contains options you want to keep around for the DOM, but not necessarily all of them)
	template.isSourceCursorChange = false;
	if(template.id == ID_TIPPOPUP_FLICKR)		// clear page, keep sort order
		template.page = null;
	else if(template.id == ID_TIPPOPUP_TWITTER){
		template.offset_recent_correction = null;
		template.max_id = null;
		template.since_id = null;
		
		template.page = null;
		template.refresh = null;
	}	*/
		
/*	if(template.id == ID_TIPPOPUP_YAHOOWEB)
		template.page = null;
*/	

	return({masterTemplate: masterTemplate, template: template});
}

function CreateBingAudioPlayer(url, urlFallback, displayTitle, divBar, bug68135NoCache, divContentHolder){
	//
	var aSource = document.createElement('a');
	aSource.href = url;
	aSource.target = "_blank";
	aSource.title = displayTitle;
	aSource.innerText = displayTitle.ellipsis(MAXCHARS_TIP_DISPLAYTITLE);//INNERHTML_TIP_MSTRANSLATE_TTS_SOURCE;
	divBar.spanDisplayTitle.appendChild(aSource);

	/* TODO: This, when chrome plays wavs
	<button title="Play sound" style="width: 50px; text-align: center" onclick="if (typeof(wgOggPlayer) != 'undefined') wgOggPlayer.init(false, {"id": "ogg_player_1", "videoUrl": "http://upload.wikimedia.org/wikipedia/commons/5/55/En-us-be.ogg", "width": 50, "height": 35, "length": "0", "linkUrl": "/wiki/File:en-us-be.ogg", "isVideo": false});">
		<img width="22" height="22" alt="Play sound" src="/w/extensions/OggHandler/play.png">
	</button>
	*/

	// create a button with the url of the src in an attribute, which the iframe can
	// extract and use to create audio object
	var button = document.createElement('button');
	if(bug68135NoCache == true)
		button.setAttribute("bug68135NoCache", bug68135NoCache);		//getattribute returns null otherwise
	
	button.className = CLASS_BING_BUTTONAUDIOPLAYER;
	button.style.setProperty("-webkit-user-select", "none", "important");
	button.title = TOOLTIP_TIP_MSTRANSLATE_TTS_PLAY;
	if(urlFallback)
		button.setAttribute("srcaudiofallback", urlFallback);
	button.setAttribute("srcaudio", url);
		var img = document.createElement('img')
		img.src = chrome.extension.getURL("img/speaker-volume-low2.png");
		button.appendChild(img);

		var audio = document.createElement('audio');
		audio.id = RandomString(32);
		audio.controls = false;
		audio.preload = "none";
		button.appendChild(audio);

	divContentHolder.appendChild(button);
}

//////////////////////////////////////
// notice bar

function AddNoticeBar(divPopup, keyPersist, srcImage, title){
	// create button for the bar
	var anchorNoticeBarButton = document.createElement('a');
	anchorNoticeBarButton.className = CSS2.CLASS_TIP_BAR_BUTTON;		//
	anchorNoticeBarButton.style.setProperty("padding-left", "3px", "important");
	anchorNoticeBarButton.href = "#";
	anchorNoticeBarButton.title = title;
		var img = anchorNoticeBarButton.img = document.createElement('img');
		img.src = srcImage
		img.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
		anchorNoticeBarButton.appendChild(img);

	anchorNoticeBarButton.divPopup = divPopup;
	anchorNoticeBarButton.selected = false;
	anchorNoticeBarButton.keyPersist = keyPersist;
	anchorNoticeBarButton.id = RandomString(8);
	anchorNoticeBarButton.addEventListener("click", function(e){
		// toggle existing status
		e.currentTarget.selected = (e.currentTarget.selected == true ? false : true);
		// reflect in divNB
		ShowNoticeBar(e.currentTarget.divPopup, e.currentTarget.id, e.currentTarget.selected);
		
		e.preventDefault();
	}, true);
	
	divPopup.divMain.divBar.spanNoticeButtons.appendChild(anchorNoticeBarButton);
	return anchorNoticeBarButton.id;
}

function RemoveAllNoticeBars(divPopup){
	// iterate all buttons
	var anchors = divPopup.divMain.divBar.spanNoticeButtons.getElementsByTagName("A");
	for(var q=anchors.length-1; q>=0; q--)
		RemoveNoticeBar(divPopup, anchors[q].id);
}

function RemoveNoticeBar(divPopup, idNoticeBarButton){
	var anchorNoticeBarButton = document.getElementById(idNoticeBarButton);
	if(anchorNoticeBarButton == null)
		return;
	
	// remove children of divNoticeBar with this classname
	var elems = divPopup.divMain.divNoticeBars.getElementsByClassName(idNoticeBarButton);
	for(var q=elems.length-1; q>=0; q--)
		elems[q].parentNode.removeChild(elems[q]);
		
	// remove button
	anchorNoticeBarButton.parentNode.removeChild(anchorNoticeBarButton);
}

function ShowNoticeBar(divPopup, idNoticeBarButton, show){
	var anchorNoticeBarButton = document.getElementById(idNoticeBarButton);
	if(anchorNoticeBarButton == null)
		return;
	
	// reflect show status in button
	anchorNoticeBarButton.img.className = CSS2.CLASS_TIP_BAR_BUTTONIMAGE;
	if(show == true)
		anchorNoticeBarButton.img.classList.add(CSS2.CLASS_TIP_BAR_BUTTONSELECTED_X);

	anchorNoticeBarButton.selected = show;
	
	// remember in DOM
	buttonStatusTipPopupNoticeBar[anchorNoticeBarButton.keyPersist] = show;

	// show/hide children of divNoticeBars with a classname the same as idNoticeBarButton
	var elems = divPopup.divMain.divNoticeBars.getElementsByClassName(idNoticeBarButton);
	for(var q=0; q<elems.length; q++)
		elems[q].style.setProperty("display", show == true ? "" : "none", "important");
}

function SetNoticeBarContent(divPopup, idNoticeBarButton, innerHTML){
	// put the html in a div of our class. 
	var divNoticeBar = document.createElement('div');
	divNoticeBar.className = CSS2.CLASS_TIP_NOTICEBAR + " " + idNoticeBarButton;	// classname identifies which button it belongs to
	// removes script,style,.class, #id
	divNoticeBar.innerHTML = html_sanitize(innerHTML,
		function(uri){ return uri; },
		function(nm, atype){ return (atype == html4.atype.FRAME_TARGET ? nm : null);}	// allow target
	);
	divPopup.divMain.divNoticeBars.appendChild(divNoticeBar);
	
	// reflect the buttons selected state in the bar visibility 
	var anchorNoticeBarButton = document.getElementById(idNoticeBarButton);
	if(anchorNoticeBarButton)
		divNoticeBar.style.setProperty("display", anchorNoticeBarButton.selected == true ? "" : "none", "important");
}

/////////////////////////////////////////////////////
// getAttention

function GetTipTemplateClone(templateId){
	// returns CLONE of stored template (created from master if necessary) with checked and full options
	var template = GetPreference(templateId);
	if(template == null){
		// use master
		for(var y in _arrTipPopupMasterTemplates){
			if(_arrTipPopupMasterTemplates[y].id == templateId){
				template = _arrTipPopupMasterTemplates[y];
				break;
			}
		}
	}
	
	if(template){
		template = _clone(template);
	
		// validate that the template stored has all the variables of the master template. perhaps teh master template
		// has been updated after the template was stored in localStorage
		if(template.options == null)
			template.options = {};
		// check options struct for each variable with the name in defaultOPtions, and copy the default option if not present
		for(var q in template.defaultOptions){
			if(template.options[q] === undefined)
				template.options[q] = template.defaultOptions[q];
		}
	}
	
	return template;
}
