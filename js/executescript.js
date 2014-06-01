////////////////////////////////////////////////
// executescript.js

/////////////////////////////
// functions

function RemoveAllHighlights(args){
	// remove all highlights from arrayFireHighlightNodes array

	// iterate each item, removing it
	var length = arrayFirstHighlightNodes.length;
	if(length > 0){
		if(confirm(CONFIRM_REMOVE_ALL) != true)
			return false;

		// force removed highlights to merge restored text with siblings.
		// Can only use when all highlights to be removed, else journal playback might fail (for older stored highlights)
/*		var myArgs = {};
		if(args == null)
			args = myArgs;
		args.mergeRestoredNodes = true;								
*/			
		for(var i=0; i<length; i++){
			// always use index 0 as the array will be having index 0 removed and 
			// the rest shifted down each time
			RemoveHighlight(arrayFirstHighlightNodes[0], false, args);
		}
	}
	
	if(__DEBUG == true){
		if(/*numJournalErrors != 0 || */arrJournal.length != 0)
			console.log("journal entries remain after RemoveAllHighlights()");
	}
	
	arrJournal = [];
	numJournalErrors = 0;		// just in case - should already be 0
	
	return true;
}

function SendAllSnippets(msgReply) {
	// cant covert circular structure (node) to JSON, so just send relevant info
	arr = [];

	for(var i=0; i<arrayFirstHighlightNodes.length; i++){
		arr[i] = { 
			//snippet: GatherText(arrayFirstHighlightNodes[i], maxSnippetLength).replace(/\s+/g, " "),
			snippet: arrayFirstHighlightNodes[i].SimpleHighlight.snippet, 
			translatedSnippet: arrayFirstHighlightNodes[i].SimpleHighlight.translatedSnippet, 
			prefHL: arrayFirstHighlightNodes[i].SimpleHighlight.prefHL, 
			note: arrayFirstHighlightNodes[i].title, 
			date: arrayFirstHighlightNodes[i].SimpleHighlight.date,

			showTranslatedSnippet: arrayFirstHighlightNodes[i].SimpleHighlight.showTranslatedSnippet,
			showNote: arrayFirstHighlightNodes[i].SimpleHighlight.showNote,
			nameSrcLanguage: arrayFirstHighlightNodes[i].SimpleHighlight.nameSrcLanguage,
			
			nameDestLanguage: arrayFirstHighlightNodes[i].SimpleHighlight.nameDestLanguage,
			urlSrcLanguageIcon: arrayFirstHighlightNodes[i].SimpleHighlight.urlSrcLanguageIcon,
			
			//xpathRange: arrayFirstHighlightNodes[i].SimpleHighlight.xpathRange,
			//href: location.href,
		};
	}

	chrome.extension.sendRequest( { msg: msgReply, arrayInfo: arr,
		msgScrollIntoView: msgScrollIntoView, 
		msgSetNote: msgSetNote, 
		msgRemoveHighlight: msgRemoveHighlight,
		msgSelectHighlight: msgSelectHighlight,
		msgShowTipPopup: msgShowTipPopup,
		msgSetShowStatus: msgSetShowStatus,
		msgSetTranslatedSnippet: msgSetTranslatedSnippet,
		msgLookupHighlight: msgLookupHighlight,
		stateShowAllTrans: statePopupButtonShowAllTrans,
		stateShowAllNotes: statePopupButtonShowAllNotes,
	});
}

function GetNumHighlights(msgReply) {
	chrome.extension.sendRequest({ 
		msg: msgReply, 
		numHighlights: typeof(arrayFirstHighlightNodes) != "undefined" ? arrayFirstHighlightNodes.length : 0,
		numJournalErrors: typeof(numJournalErrors) != "undefined" ? numJournalErrors : 0,
		isDirty: typeof(isDirty) != "undefined"  ? isDirty : false,
	});
}

function SetDirty(dirty, args) {
	isDirty = dirty;

	if(isDirty == true && (args == null || args.ignoreAutoSave != true) ){
		// autosave
		if(autoSave == true){
			// replace in its existing store, or use sessionStorage as default
			chrome.extension.sendRequest({ msg: "getSendersTab" }, function(tab){
				//
				chrome.extension.sendRequest({ msg: "getURLStore", url: tab.url }, function(store){
					SaveHighlights(store == null ? autoSaveStore : store);
				});
			});
		}
		
//            AutoSaveHighlights();
	}

	// cleaned after save, ergo journal is now ok
//	if(dirty == false)
//		numJournalErrors = 0;

	// update page action
	//RefreshCacheSave();
	if(args == null || args.dontUpdatePageAction != true)
		chrome.extension.sendRequest({ msg: "updateSendersTabPageAction" });
}


function PlayIntoJournal(arrayHighlights, pijOptions){
	// 'play back' the array
	if(RemoveAllHighlights() == false)		// should get numJournalErrors == 0 && arrJournal.length == 0
		return;
		
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
//			if(!pijOptions || pijOptions.ignoreMismatchedURL != true){			// can override checking if url for page matches that of the stored hl
				if(locationHREFWithHashRemoved != tabURLWithHashRemoved)
					continue;
//			}
		}

//		if(arrayHighlights[q].href && (arrayHighlights[q].href != location.href.RemoveHash()))
//			continue;       
		
		if(arrayHighlights[q].verb == "highlight"){
			// SOS 10/03/2011 updated date routine
			Date.prototype.setISO8601 = function (string) {
				var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
				"(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
				"(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
				var d = string.match(new RegExp(regexp));
				
				var offset = 0;
				var date = new Date(d[1], 0, 1);
				
				if (d[3]) { date.setMonth(d[3] - 1); }
				if (d[5]) { date.setDate(d[5]); }
				if (d[7]) { date.setHours(d[7]); }
				if (d[8]) { date.setMinutes(d[8]); }
				if (d[10]) { date.setSeconds(d[10]); }
				if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
				if (d[14]) {
					offset = (Number(d[16]) * 60) + Number(d[17]);
					offset *= ((d[15] == '-') ? 1 : -1);
				}
				
				offset -= date.getTimezoneOffset();
				time = (Number(date) + (offset * 60 * 1000));
				this.setTime(Number(time));
			}            
			
		
			// convert xpathRange into range
			var range = GetRangeFromXPathRange(arrayHighlights[q].xpathRange);
			if(range == null){
				numJournalErrors++;			// RESET THIS WHEN MOVED TO PLAYARRAY() (ALONG WITH REMOVEALL)
				continue;
			}

			// make date an actual object (doesnt parse back to object)
//			arrayHighlights[q].date = new Date(arrayHighlights[q].date);
			// make date an actual object (doesnt parse back to object)
			// parsing errors: http://stackoverflow.com/questions/3764459/why-will-this-dateparser-not-work-in-safari
			var d = new Date(arrayHighlights[q].date);
			if (isNaN(d)) {
				//alert("Date constructor not support ISO8601!");
				d = new Date();
				d.setISO8601(arrayHighlights[q].date);
			}
			arrayHighlights[q].date = d;

		
			// highlight it
			var firstNode = HighlightSelection(arrayHighlights[q].prefHL, range,
				{date: arrayHighlights[q].date, id: arrayHighlights[q].id,
				 ignoreAutoSave: true, dontUpdatePageAction: true/*, dontAddToJournal: true*/} );
		}
		else{
			// all the other verbs need id, so share the routine
			var firstNode = GetFirstNodeFromId(arrayHighlights[q].id);
			if(firstNode == null){
				numJournalErrors++;
				continue;
			}
		
			if(arrayHighlights[q].verb == "setNote"){
//				if(arrayHighlights[q].note && arrayHighlights[q].note.length > 0){
//					SetNote(firstNode, arrayHighlights[q].note,
//						{ignoreAutoSave: true, dontUpdatePageAction: true/*, dontAddToJournal: true*/} );
//				}
 				SetNote(firstNode, (arrayHighlights[q].note && arrayHighlights[q].note.length > 0) ? arrayHighlights[q].note : null,
					{ignoreAutoSave: true, dontUpdatePageAction: true/*, dontAddToJournal: true*/} );

			}
			else if(arrayHighlights[q].verb == "removeHighlight" || arrayHighlights[q].verb == "deleteHighlight"){
				RemoveHighlight(firstNode, arrayHighlights[q].verb == "deleteHighlight" ? true : false, {
					ignoreAutoSave: true, 
					dontUpdatePageAction: true, 
					dontMergeRestoredNodes: arrayHighlights[q].merge ? false : true/*, dontAddToJournal: true*/
				} );
			}
			else if(arrayHighlights[q].verb == "changeHighlightColour"){
				ChangeHighlightColor(firstNode, arrayHighlights[q].prefHL,
					{ignoreAutoSave: true, dontUpdatePageAction: true/*, dontAddToJournal: true*/} );
			}
			else{
				if(__DEBUG == true)
					console.log("unknown verb: " + arrayHighlights[q].verb);
			}
		}
	}// end for

	// always clean after load
//	SetDirty(numJournalErrors == 0 ? false : true);

	// if called externally, playing will dirty the journal. if called via OnLoad(), it will cancel call
	if( !pijOptions || pijOptions.dontSetDirty != true){
		if(arrJournal.length > 0)
			SetDirty(true);
		else if(numJournalErrors > 0)
			chrome.extension.sendRequest({ msg: "updateSendersTabPageAction" });
	}
}

// return: 
function SaveHighlights(store) {
	chrome.extension.sendRequest({ msg: "getSendersTab" }, function(tab){
		if(tab.incognito == true)
			return null;

		var url = tab.url.RemoveHash();
		var href = location.href.RemoveHash();
			
		if(arrayFirstHighlightNodes.length == 0){
			// clear out everything with our href						
			if(__DEBUG == true)
				console.log("SaveHighlights() - clearHighlightsByHREF - url:" + url +" href: " +href + " store: "+ store );

			chrome.extension.sendRequest({ msg: "saveHighlights", url: url, href: href, arrayHighlights: [], store: store, append: true}, function(result){				
//			chrome.extension.sendRequest({ msg: "clearHighlightsByHREF", url: url, href: href, store: store}, function(result){
				// result: error obj on error, else null
				if(result == null){
					SetDirty(false);

					// can safely clear the journal if the arrayFirstHighlightNodes is empty
					arrJournal = [];
				}

				return {res: result};
			});
		}
		else{
			// cant use callback as DOM is destroyed on return, so use cached info
			if(__DEBUG == true){
				console.log("SaveHighlights() - saveHighlights - url:" + url + " store: "+ store );
				console.log("  Journal: " + JSON.stringify(arrJournal));
			}

			chrome.extension.sendRequest({ msg: "saveHighlights", url: url, href: href, arrayHighlights: arrJournal, 
				store: store/*(store == null ? "session" : store)*/, append: true}, function(res){
				// result: error obj on error, else null
				if(res && res.result == null)
					SetDirty(false);
					
				return res;
			});
		}
	});

	return null;
}

function ExportPageHighlights(obj){
//	if(arrayFirstHighlightNodes.length == 0)
//		return;

//	chrome.extension.sendRequest({ msg: obj.msgRegisterFrame });

	chrome.extension.sendRequest({ msg: "getSendersTab" }, function(tab){
		var url = tab.url.RemoveHash();

		// find the existing store for this url. if none exists, pretend its session (noWrite means nothing gets changed)
		chrome.extension.sendRequest({ msg: "getURLStore", url: url}, function(store){
			if(store == null)
				store = "session";
			
			var href = location.href.RemoveHash();
						
			// sessionStore[KEYNAME_EXPORTPAGEHIGHLIGHTS] is used to build a temporary hl (not written to proper store)
			chrome.extension.sendRequest({ msg: "saveHighlights", url: url, href: href, arrayHighlights: arrJournal, 
				store: store, append: true, keyRedirectToSessionStorage: obj.key}, function(res){
				//
				chrome.extension.sendRequest({ msg: obj.msgOnExportFrame, key: obj.key/*KEYNAME_EXPORTPAGEHIGHLIGHTS */});
				// result: error obj on error, else null
//				if(res && res.result == null && res.stringified != null)
//					chrome.extension.sendRequest({ msg: "exportHighlightFromStringifiedHL", url: url, stringifiedHL: res.stringified});			
				
				return res;
			});
		});
	});
}

function RegisterFrameInPopup(obj){
	chrome.extension.sendRequest({ msg: obj.msgRegisterFrame });
}

function DetailPageHighlights(obj){
//	chrome.extension.sendRequest({ msg: obj.msgRegisterFrame });

	var hrefHashRemoved = location.href.RemoveHash();
	var arr = [];

	// out: {hl: [{date, textComplete, prefHL},...]
	for(var q=0; q<arrayFirstHighlightNodes.length; q++){
		// note is normally stored in .title, but fake it in our copy
		var lengthNewArray = arr.push(arrayFirstHighlightNodes[q].SimpleHighlight);
		if(lengthNewArray >= 1)
			arr[lengthNewArray -1].note = arrayFirstHighlightNodes[q].title;

//		arr.push(arrayFirstHighlightNodes[q].SimpleHighlight);
/*		var entry = {
			textComplete: arrayFirstHighlightNodes[q].textComplete,
			date: arrayFirstHighlightNodes[q].textComplete,
			prefHL: arrayFirstHighlightNodes[q].prefHL,
		}*/
	}
		
/*	
	arrayFirstHighlightNodes.forEach(function(node){
		SetTranslatedSnippet(node, null, null);
	});
*/
	// must report this, even if empty
	chrome.extension.sendRequest({ msg: obj.msgOnDetailHighlightsFrame, hrefHashRemoved: hrefHashRemoved, title: document.title, arrHighlights: arr });
	
}