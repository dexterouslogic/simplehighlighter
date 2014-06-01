var PREFIX_MSG_NUMHIGHLIGHTSSENT = "background_NumHighlightsSent_";
var LABEL_UNLABELED = "Unlabelled"      // british

var FORMAT_MOBILIZER_INSTAPAPER = "http://www.instapaper.com/m?u=<<URL>>"
var FORMAT_MOBILIZER_GOOGLE = "http://www.google.com/gwt/x?btnGo=Go&source=wax&ie=UTF-8&oe=UTF-8&u=<<URL>>"

var _totalIsDirty;
var _totalNumHighlights;
var _totalNumJournalErrors;

var _msgNumHighlightsSent;

var _arrTipObjects = [];

// null values are updated by menu creation (menuItemId)
// order is important
var arrayMenuIdToPrefHL = [
	{ prefHL: PREFERENCE_HL1 },
	{ prefHL: PREFERENCE_HL2 },
	{ prefHL: PREFERENCE_HL3 },
	{ prefHL: PREFERENCE_HL4 },
	{ prefHL: PREFERENCE_HL5 },
	{ prefHL: PREFERENCE_HL6 },
	{ prefHL: PREFERENCE_HL7 },
	//
	{ prefHL: PREFERENCE_SETNOTEHL },
	{ prefHL: PREFERENCE_TRANSHLTONOTE },
//
	{ prefHL: PREFERENCE_LOOKUP },
	{ prefHL: PREFERENCE_LOOKUP_OPENINNEW },
//
	{ prefHL: PREFERENCE_TIPPOPUP },
//
	{ prefHL: PREFERENCE_SELECTHL },
	//
	{ prefHL: PREFERENCE_UNHL },
	{ prefHL: PREFERENCE_UNHL_ALL },
	//
	{ prefHL: PREFERENCE_DELHL },
	//
	{ prefHL: PREFERENCE_NATIVESPEAK },
	{ prefHL: PREFERENCE_STOPNATIVESPEAK },
	// 
	{ prefHL: PREFERENCE_MOBILIZEPAGE },
];

var arrayPrefixWithSeparator = [
	PREFERENCE_NATIVESPEAK, PREFERENCE_STOPNATIVESPEAK,
	
	PREFERENCE_DELHL, PREFERENCE_UNHL, PREFERENCE_SETNOTEHL, PREFERENCE_SELECTHL, PREFERENCE_LOOKUP, PREFERENCE_TIPPOPUP, PREFERENCE_MOBILIZEPAGE,
];
		
String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
   chrome.tabs.get(tabId, function (tab) {
	   // update icon to reflect that of the selected tab
	   UpdateTabPageAction(tab);
   });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, selectInfo) {
   chrome.tabs.get(tabId, function (tab) {
	   // update icon to reflect that of the selected tab
	   UpdateTabPageAction(tab);
   });
});

// run fixups
Fixup();

// build first menu
UpdateMenu();

// Sole function is to listen for requests
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	switch (request.msg) {
		case "nativeSpeak":
			if(request.stop == true)
				chrome.tts.stop();
			else{
				// override event handler
				var options = request.options;
				if(options == null)
					options = {};
					
				options.onEvent = function(event){
					if(event.type == 'start' || event.type == 'end' || event.type == 'interrupted' || event.type == 'cancelled' || event.type == 'error'){
						UpdateMenu();
					}
				};
				
				chrome.tts.speak(request.utterance, options);
			}
			break;
	
		case "getBase64StringFromBinaryURL":
			GetBase64StringFromBinaryURL(request.url, sendResponse, request.cbData);	// nb unusual use of sendResponse
			break;
	
		case "getHighlightsFromStringifiedImportObject":
			sendResponse(GetHighlightsFromStringifiedImportObject(request.stringifiedImportObject));
			break;
	
		case "importHighlightFromStringifiedImportObject":
			sendResponse(ImportHighlightFromStringifiedImportObject(request.stringifiedImportObject, request.store));
			break;
		case "exportHighlightFromStringifiedHL":
			sendResponse(ExportHighlightFromStringifiedHL(request.url, request.stringifiedHL, request.asXml));
			break;
		case "exportHighlights":
			sendResponse(ExportHighlights(request.urls, request.store, request.asXml));
			break;
//		case "clearHighlightsByHREF":
//			sendResponse(ClearHighlightsByHREF(request.url, request.store, request.href));
//			break;
		case "saveHighlights":      // return error object on error, else null
			sendResponse(SaveHighlights(request.url, request.store, request.arrayHighlights, request.append, request.href, request.keyRedirectToSessionStorage));
			break;
		case "loadHighlights":
			sendResponse(LoadHighlights(request.url, request.store));
			break;
		case "loadAllHighlights":
			sendResponse(LoadAllHighlights(request.store));
			break;
		case "getURLStore":
			sendResponse(GetURLStore(request.url));
			break;

		case "getSendersTab":
			sendResponse(sender.tab);
			break;
		case "updateMenu":
			sendResponse(UpdateMenu(/*sender.tab ? sender.tab.id : null*/));
			break;
		case "getPreference":
			sendResponse(GetPreference(request.key));
			break;
	   case "setPreference":
			sendResponse(SetPreference(request.key, request.value));
			break;
		case "updateSendersTabPageAction":
			if (sender.tab != null)
				UpdateTabPageAction(sender.tab);
			break;

		// index isnt always a number. for divPopup it is its id
		case "requestTip":
			sendResponse(RequestTip(request.tipTemplate, sender.tab,
				request.text, request.msgSet, request.index));
			break;
			
		case "releaseTipObject":
			sendResponse(ReleaseTipObject(request.id));
			break;
			
		case "callTipObjectFunction":
			sendResponse(CallTipObjectFunction(request.id, request.nameVariable, request.nameFunction, request.arg));
			break;

		case _msgNumHighlightsSent: //MSG_NUMHIGHLIGHTSSENT:
			OnNumHighlightsSent(request.numHighlights, request.numJournalErrors, request.isDirty, sender.tab);
			break;
			
		case "relayRequest":
			request.msg = request.msgRelay;
			chrome.tabs.sendRequest(sender.tab.id, request, sendResponse);
			break;
	}

});

function CallTipObjectFunction(objectId, nameVariable, nameFunction, arg){
	var tipObject = GetTipObject(objectId);
	if(tipObject == null)
		return;
	
	if(tipObject.data[nameVariable] == null)
		return;

	return tipObject.data[nameVariable][nameFunction](arg);
}
				
function RequestTip(template, tab, text, msgSet, index){
	var parser = null;

	var arr = [
		{ids: [ID_TIPPOPUP_GOOGLELANGUAGEDETECT, ID_TIPPOPUP_GOOGLETRANSLATE, ID_TIPPOPUP_GOOGLEIMAGESEARCH, ID_TIPPOPUP_GOOGLETTS], parser: GoogleAPI},
		{ids: [ID_TIPPOPUP_YAHOOWEB, ID_TIPPOPUP_YAHOOSPELLING], parser: Yahoo},
		{ids: [ID_TIPPOPUP_MSTRANSLATE_TTS], parser: Bing},
		{ids: [ID_TIPPOPUP_MSTRANSLATE_TRANSLATE], parser: Bing},    
//		{ids: [ID_TIPPOPUP_WIKIPEDIA], parser: MediaWiki},
//		{ids: [ID_TIPPOPUP_WIKTIONARY], parser: MediaWiki},
		{ids: [ID_TIPPOPUP_FLICKR], parser: Flickr},
		{ids: [ID_TIPPOPUP_TWITTER], parser: Twitter},
	];
	// are we reusing a tip
	var tipObject = GetTipObject(index);
	
	// choose correct parser - special case for mediawiki
	if(DoesTemplateIdHaveMediaWikiAPI(template.id) == true)
		parser = MediaWiki;
	else{
		for(var x in arr){
			if(arr[x].ids.indexOf(template.id) != -1){
				parser = arr[x].parser;
				break;
			}
		}
	}
	
	if(parser){
		return parser.Request({
			tipObject: tipObject,
			text: text,
			tab: tab,
			msgSet: msgSet,
			index: index,
			template: template});
	}
}

function SendRequestWithTabIfPossible(tab, request){
	if(tab && tab.id != -1)
		chrome.tabs.sendRequest(tab.id, request);
	else
		chrome.extension.sendRequest(request);
}

///

function AddTipObject(id, tipObject){
	_arrTipObjects.push({id: id, obj: tipObject});
	console.log("add" + _arrTipObjects.length);
}

function GetTipObject(objectId){
	var tipObject = null;
	
	for(var x in _arrTipObjects){
		if(_arrTipObjects[x].id == objectId){
			tipObject = _arrTipObjects[x].obj;
			break;
		}
	}
	return tipObject;
}		

// TODO :Check all released in OnUnload
function ReleaseTipObject(objectId){
	// if a tip required a (NON-JSONable) object to be created, it would be associated with an
	// ID and kept in the background.
	for(var x in _arrTipObjects){
		if(_arrTipObjects[x].id == objectId){
			_arrTipObjects.splice(x, 1);

			console.log("rem" + _arrTipObjects.length);
			return;
		}
	}
}

//////////////////////
/*
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
	// because context menus contain tab specific data (lookup template name), rebuild menu on each tab switch
	alert("tab");
	UpdateMenu(tabId);
});
*/


function OnNumHighlightsSent(numHighlights, numJournalErrors, isDirty, tab) {
	// We don't know how many replies we'll get, but assume we'll get at least one reply.
	// If that is 0, hide icon until a non-zero comes along.Hopefully this will reduce flicker a bit
	this._totalNumHighlights += numHighlights;
	this._totalNumJournalErrors += numJournalErrors;
	this._totalIsDirty += (isDirty == true ? 1 : 0);

	var path = "img/16";

	if (this._totalIsDirty > 0) {
		// always show if dirty
		chrome.pageAction.show(tab.id)

		path += "dirty";

		// journal errors are always dirty
		if (this._totalNumJournalErrors > 0)
			path += "Invalid";
		else
			path += (this._totalNumHighlights == 0 ? "Empty" : "");
	}
	else {
		// clean is only shown if highlights saved session or local
		var store = GetURLStore(tab.url.RemoveHash());       // local or session (or null)

		if (store == "session" || store == "local"){
			path += store;
			
			// restored from store but with errors
			if(this._totalNumJournalErrors > 0)
				path += "Invalid";
		}else{
			// if preference_pageaction is always, cant have a state where nothing is shown, so show dirty
			if(GetPreference(PREFERENCE_PAGEACTION) == "always"){
				path += "dirty";
				// journal errors are always dirty
				if (this._totalNumJournalErrors > 0)
					path += "Invalid";
				else
					path += (this._totalNumHighlights == 0 ? "Empty" : "");
			}
			else
				path = null;
		}

		chrome.pageAction[path == null ? "hide" : "show"](tab.id);
	}

	if (path != null) {
		chrome.pageAction.setIcon({ tabId: tab.id, path: path + ".png" });

		// tooltip
		var title = "";
//		if (this._totalIsDirty > 0 && this._totalNumHighlights > 0)
//			title += "*";
		title += "Simple Highlighter: " + (this._totalNumHighlights == 0 ? "No" : this._totalNumHighlights) +
			" Highlight" + (this._totalNumHighlights == 1 ? "" : "s");
		if (this._totalNumJournalErrors > 0)
			title += " (" + this._totalNumJournalErrors + " restoration error" + (this._totalNumJournalErrors == 1 ? "" : "s") + ")";
		if (this._totalIsDirty > 0 && this._totalNumHighlights > 0)
			title += " [Not Saved]";

		chrome.pageAction.setTitle({ tabId: tab.id, title: title });
	}
}

function UpdateTabPageAction(tab) {
	// ignore if we dont want page action icon updates
	var showStylePageAction = GetPreference(PREFERENCE_PAGEACTION);

	if (showStylePageAction == PREFBOOL_FALSE || (tab && (CanExecuteScriptOnURL(tab.url) == false)) ){// || (tab && (tab.url.indexOf('http') != 0 || tab.url.length == 0))  ) {		// never
		if(tab)
			chrome.pageAction.hide(tab.id);
		return;
	}
/*
	// will cause error on injection to pages without permission, but doesn't really matter
	if (tab && (tab.url.indexOf('http') != 0 || tab.url.length == 0))
		return;
*/

	if(showStylePageAction == "always"){
		if(tab)// && tab.url.indexOf('http') == 0)
			chrome.pageAction.show(tab.id);
		return;
	}
		
	// tell all scripts in the desired tab to send us a message containing number of highlights
	// and the message we need to scroll them into view.
	this._totalNumHighlights = 0;
	this._totalIsDirty = 0;
	this._totalNumJournalErrors = 0;
	this._msgNumHighlightsSent = PREFIX_MSG_NUMHIGHLIGHTSSENT + RandomString(32);

	if(tab){
		chrome.tabs.executeScript(tab.id,
			{ code: 'if(typeof(GetNumHighlights) === "function") GetNumHighlights("' + this._msgNumHighlightsSent + '");', allFrames: true }, null);
	}
}

function UpdateMenu(/*tabId*/) {
	function _getMouseActivateShortcutAsText(ma){
		// {enabled: false, button: 2, dbl: false, ctrlKey: false, altKey: true, shiftKey: false}
		if(!ma || ma.enabled != true)
			return "";
			
		var out = "";
			
		// modifier
		var arr = [
			{ key: ma.ctrlKey, token: "Ctrl" },
			{ key: ma.altKey, token: "Alt" },
			{ key: ma.shiftKey, token: "Shift" },
			{ key: ma.metaKey, token: "Meta" },
		];
		
		for(x in arr){
			if(arr[x].key == true){
				if(out.length > 0)
					out += "+";
				out += arr[x].token;
			}
		}

		// button
		if(out.length > 0)
			out += "+";
		out += (ma.button == 0 ? "Left" : 
			(ma.button == 1 ? "Middle" : "Right"));
		out += "Button";
		
		// single/double
		if(ma.dbl == true)
			out += " (x2)";
		
		return out;
	}

	// always empty by default
	chrome.contextMenus.removeAll(function () {
		// null menu ids
		for (a in arrayMenuIdToPrefHL)
			arrayMenuIdToPrefHL[a].menuItemId = null;

		if (GetPreference(PREFERENCE_CONTEXTMENU) == PREFBOOL_FALSE)
			return;
			
		// tts state is callback (why)
		chrome.tts.isSpeaking(function(isSpeaking){
			// get the labels to be used as menu item titles
			var keys = [];
			for (a in arrayMenuIdToPrefHL)
				keys.push(arrayMenuIdToPrefHL[a].prefHL);
			var arrPrefs = GetPreference(keys);

			for (a in arrayMenuIdToPrefHL) {
				// ignore items that can dont want to be shown (only really applicable to colours, but use for all anyway)
				if (arrPrefs[arrayMenuIdToPrefHL[a].prefHL].showInContextMenu == false)
					continue;
					
				// state based
				if(arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_NATIVESPEAK && isSpeaking == true)
					continue;
				if(arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_STOPNATIVESPEAK && isSpeaking != true)
					continue;
			
			
				// labelless in prefs
				// legacy: for those that saved array with shortcut but without label
				if (arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_UNHL_ALL && arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label == null)		
					arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label = "Remove All Highlights...";

				// no labelless highlights allowed
				if (arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label == null || arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label.length == 0)
					arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label = LABEL_UNLABELED;

				// build shortcut section
				var shortcut = "";

				// special cases for shortcuts
				if (arrPrefs[arrayMenuIdToPrefHL[a].prefHL].shortcut) {
					var arrToken = arrPrefs[arrayMenuIdToPrefHL[a].prefHL].shortcut.split("+");

					for (z = 0; z < arrToken.length; z++) {
						if (shortcut.length > 0)
							shortcut += '+';

						if (arrToken[z] != "ctrl" && arrToken[z] != "alt" && arrToken[z] != "shift" && arrToken[z] != "meta")
							shortcut += arrToken[z].toUpperCase();
						else
							shortcut += arrToken[z].capitalize();
					}
				}
				else if(arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_LOOKUP || arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_TIPPOPUP){
					var ma = GetPreference(arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_LOOKUP ? PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE : PREFERENCE_TIPPOPUP_MOUSEACTIVATE);
					
					shortcut = _getMouseActivateShortcutAsText(ma);
				}
				
				
				// prefix these with a sep
				for(var z in arrayPrefixWithSeparator){
					if(arrayPrefixWithSeparator[z] == arrayMenuIdToPrefHL[a].prefHL){
						chrome.contextMenus.create({ type: "separator", contexts: ["page", "selection", "link"] });
						break;
					}
				}
	/*                    if (arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_DELHL || arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_UNHL || arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_SETNOTEHL ||
					arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_SELECTHL || arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_LOOKUP) {// || arr[1] == PREFERENCE_UNHL_ALL)
					chrome.contextMenus.create({ type: "separator", contexts: ["page", "selection", "link"] });
				}
	*/
				var title = arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label;
				// special case - replace <<LANGUAGE>> with note destination language
				if(arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_TRANSHLTONOTE){
					var languageInfo = Bing.GetLanguageInfo(GetPreference(PREFERENCE_TRANSNOTE_DESTLANG_BING));
					
					title = title.replace("<<LANGUAGE>>", languageInfo.name != null ? languageInfo.name : "?");
				}
	/*					if(arrayMenuIdToPrefHL[a].prefHL == PREFERENCE_LOOKUP){
					var arrLookupTemplates = GetPreference(PREFERENCE_LOOKUP_TEMPLATES);
					for(x in arrLookupTemplates){
						if(arrLookupTemplates[x].default == true){
							title = title.replace("<<TEMPLATENAME>>", arrLookupTemplates[x].name != null ? arrLookupTemplates[x].name : "?");
							break;
						}
					}
				}
	*/				
				arrayMenuIdToPrefHL[a].menuItemId = chrome.contextMenus.create({
					// title: title + (arrPrefs[arrayMenuIdToPrefHL[a].prefHL].addNote == true ? "..." : "") +
						// (shortcut.length > 0 ? ("\t" + shortcut) : ""),
					// type: "normal", contexts: ["page", "selection", "link"], onclick: OnClickContextMenu2
					
					title: title + (arrPrefs[arrayMenuIdToPrefHL[a].prefHL].addNote == true ? "..." : "") +
						(shortcut.length > 0 ? ("\t [" + shortcut + "]") : ""),
					type: "normal", contexts: ["page", "selection", "link"], onclick: OnClickContextMenu2
					
				});
			} // end for
			
		});
	});
} // end updatemenu

function OnClickContextMenu2(info, tab) {
	// map the childId to the preference_hl* value to pass to the tab
	for (i in arrayMenuIdToPrefHL) {
		if (arrayMenuIdToPrefHL[i].menuItemId == info.menuItemId) {
			var prefHL = arrayMenuIdToPrefHL[i].prefHL;
			
			// 'global' options
			if(prefHL == PREFERENCE_MOBILIZEPAGE){
				chrome.tabs.get(tab.id, function(t){
					var format = (GetPreference(PREFERENCE_MOBILIZER) == MOBILIZER_INSTAPAPER ? 
						FORMAT_MOBILIZER_INSTAPAPER  :FORMAT_MOBILIZER_GOOGLE);
					var url = format.replace("<<URL>>", t.url);
					
					chrome.tabs.create({url: url});
				});
			}
			else{
				// local
				chrome.tabs.sendRequest(tab.id, { msg: "onClickContextMenu", prefHL: prefHL });
			}
			break;
		}
	}
};

function Fixup(){
	var fixuplevel = GetPreference(PREFERENCE_FIXUPLEVEL);
	
	if(fixuplevel == null || fixuplevel < 1){
		// if teh default tip is googletranslate, set it to bing translate instead
		var arrTipPopupTemplates = GetPreference(PREFERENCE_TIPPOPUP_TEMPLATES);
		
		for(var y in arrTipPopupTemplates){
			if(arrTipPopupTemplates[y].id == ID_TIPPOPUP_GOOGLETRANSLATE && arrTipPopupTemplates[y].default == true){
				// force off (default should now be taken from master array)
				arrTipPopupTemplates[y].default = false;
								
				// force bing translate to default
				for(var z in arrTipPopupTemplates){
					if(arrTipPopupTemplates[z].id == ID_TIPPOPUP_MSTRANSLATE_TRANSLATE){
						arrTipPopupTemplates[z].default = true;
						break;
					}
				}
								
				// write
				SetPreference(PREFERENCE_TIPPOPUP_TEMPLATES, arrTipPopupTemplates);
				break;
			}
		}
		
		SetPreference(PREFERENCE_FIXUPLEVEL, 1);		
	}
};