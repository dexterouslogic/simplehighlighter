
function RemoveAllHighlights(args){var length=arrayFirstHighlightNodes.length;if(length>0){if(confirm(CONFIRM_REMOVE_ALL)!=true)
return false;for(var i=0;i<length;i++){RemoveHighlight(arrayFirstHighlightNodes[0],false,args);}}
if(__DEBUG==true){if(arrJournal.length!=0)
console.log("journal entries remain after RemoveAllHighlights()");}
arrJournal=[];numJournalErrors=0;return true;}
function SendAllSnippets(msgReply){arr=[];for(var i=0;i<arrayFirstHighlightNodes.length;i++){arr[i]={snippet:arrayFirstHighlightNodes[i].SimpleHighlight.snippet,translatedSnippet:arrayFirstHighlightNodes[i].SimpleHighlight.translatedSnippet,prefHL:arrayFirstHighlightNodes[i].SimpleHighlight.prefHL,note:arrayFirstHighlightNodes[i].title,date:arrayFirstHighlightNodes[i].SimpleHighlight.date,showTranslatedSnippet:arrayFirstHighlightNodes[i].SimpleHighlight.showTranslatedSnippet,showNote:arrayFirstHighlightNodes[i].SimpleHighlight.showNote,nameSrcLanguage:arrayFirstHighlightNodes[i].SimpleHighlight.nameSrcLanguage,nameDestLanguage:arrayFirstHighlightNodes[i].SimpleHighlight.nameDestLanguage,urlSrcLanguageIcon:arrayFirstHighlightNodes[i].SimpleHighlight.urlSrcLanguageIcon,};}
chrome.extension.sendRequest({msg:msgReply,arrayInfo:arr,msgScrollIntoView:msgScrollIntoView,msgSetNote:msgSetNote,msgRemoveHighlight:msgRemoveHighlight,msgSelectHighlight:msgSelectHighlight,msgShowTipPopup:msgShowTipPopup,msgSetShowStatus:msgSetShowStatus,msgSetTranslatedSnippet:msgSetTranslatedSnippet,msgLookupHighlight:msgLookupHighlight,stateShowAllTrans:statePopupButtonShowAllTrans,stateShowAllNotes:statePopupButtonShowAllNotes,});}
function GetNumHighlights(msgReply){chrome.extension.sendRequest({msg:msgReply,numHighlights:typeof(arrayFirstHighlightNodes)!="undefined"?arrayFirstHighlightNodes.length:0,numJournalErrors:typeof(numJournalErrors)!="undefined"?numJournalErrors:0,isDirty:typeof(isDirty)!="undefined"?isDirty:false,});}
function SetDirty(dirty,args){isDirty=dirty;if(isDirty==true&&(args==null||args.ignoreAutoSave!=true)){if(autoSave==true){chrome.extension.sendRequest({msg:"getSendersTab"},function(tab){chrome.extension.sendRequest({msg:"getURLStore",url:tab.url},function(store){SaveHighlights(store==null?autoSaveStore:store);});});}}
if(args==null||args.dontUpdatePageAction!=true)
chrome.extension.sendRequest({msg:"updateSendersTabPageAction"});}
function PlayIntoJournal(arrayHighlights,pijOptions){if(RemoveAllHighlights()==false)
return;var locationHREFWithHashRemoved=location.href.RemoveHash();for(var q=0;q<arrayHighlights.length;q++){if(arrayHighlights[q].href){if(arrayHighlights[q].href!=locationHREFWithHashRemoved)
continue;}
else{if(locationHREFWithHashRemoved!=tabURLWithHashRemoved)
continue;}
if(arrayHighlights[q].verb=="highlight"){Date.prototype.setISO8601=function(string){var regexp="([0-9]{4})(-([0-9]{2})(-([0-9]{2})"+"(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?"+"(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";var d=string.match(new RegExp(regexp));var offset=0;var date=new Date(d[1],0,1);if(d[3]){date.setMonth(d[3]-1);}
if(d[5]){date.setDate(d[5]);}
if(d[7]){date.setHours(d[7]);}
if(d[8]){date.setMinutes(d[8]);}
if(d[10]){date.setSeconds(d[10]);}
if(d[12]){date.setMilliseconds(Number("0."+d[12])*1000);}
if(d[14]){offset=(Number(d[16])*60)+Number(d[17]);offset*=((d[15]=='-')?1:-1);}
offset-=date.getTimezoneOffset();time=(Number(date)+(offset*60*1000));this.setTime(Number(time));}
var range=GetRangeFromXPathRange(arrayHighlights[q].xpathRange);if(range==null){numJournalErrors++;continue;}
var d=new Date(arrayHighlights[q].date);if(isNaN(d)){d=new Date();d.setISO8601(arrayHighlights[q].date);}
arrayHighlights[q].date=d;var firstNode=HighlightSelection(arrayHighlights[q].prefHL,range,{date:arrayHighlights[q].date,id:arrayHighlights[q].id,ignoreAutoSave:true,dontUpdatePageAction:true});}
else{var firstNode=GetFirstNodeFromId(arrayHighlights[q].id);if(firstNode==null){numJournalErrors++;continue;}
if(arrayHighlights[q].verb=="setNote"){SetNote(firstNode,(arrayHighlights[q].note&&arrayHighlights[q].note.length>0)?arrayHighlights[q].note:null,{ignoreAutoSave:true,dontUpdatePageAction:true});}
else if(arrayHighlights[q].verb=="removeHighlight"||arrayHighlights[q].verb=="deleteHighlight"){RemoveHighlight(firstNode,arrayHighlights[q].verb=="deleteHighlight"?true:false,{ignoreAutoSave:true,dontUpdatePageAction:true,dontMergeRestoredNodes:arrayHighlights[q].merge?false:true});}
else if(arrayHighlights[q].verb=="changeHighlightColour"){ChangeHighlightColor(firstNode,arrayHighlights[q].prefHL,{ignoreAutoSave:true,dontUpdatePageAction:true});}
else{if(__DEBUG==true)
console.log("unknown verb: "+arrayHighlights[q].verb);}}}
if(!pijOptions||pijOptions.dontSetDirty!=true){if(arrJournal.length>0)
SetDirty(true);else if(numJournalErrors>0)
chrome.extension.sendRequest({msg:"updateSendersTabPageAction"});}}
function SaveHighlights(store){chrome.extension.sendRequest({msg:"getSendersTab"},function(tab){if(tab.incognito==true)
return null;var url=tab.url.RemoveHash();var href=location.href.RemoveHash();if(arrayFirstHighlightNodes.length==0){if(__DEBUG==true)
console.log("SaveHighlights() - clearHighlightsByHREF - url:"+url+" href: "+href+" store: "+store);chrome.extension.sendRequest({msg:"saveHighlights",url:url,href:href,arrayHighlights:[],store:store,append:true},function(result){if(result==null){SetDirty(false);arrJournal=[];}
return{res:result};});}
else{if(__DEBUG==true){console.log("SaveHighlights() - saveHighlights - url:"+url+" store: "+store);console.log("  Journal: "+JSON.stringify(arrJournal));}
chrome.extension.sendRequest({msg:"saveHighlights",url:url,href:href,arrayHighlights:arrJournal,store:store,append:true},function(res){if(res&&res.result==null)
SetDirty(false);return res;});}});return null;}
function ExportPageHighlights(obj){chrome.extension.sendRequest({msg:"getSendersTab"},function(tab){var url=tab.url.RemoveHash();chrome.extension.sendRequest({msg:"getURLStore",url:url},function(store){if(store==null)
store="session";var href=location.href.RemoveHash();chrome.extension.sendRequest({msg:"saveHighlights",url:url,href:href,arrayHighlights:arrJournal,store:store,append:true,keyRedirectToSessionStorage:obj.key},function(res){chrome.extension.sendRequest({msg:obj.msgOnExportFrame,key:obj.key});return res;});});});}
function RegisterFrameInPopup(obj){chrome.extension.sendRequest({msg:obj.msgRegisterFrame});}
function DetailPageHighlights(obj){var hrefHashRemoved=location.href.RemoveHash();var arr=[];for(var q=0;q<arrayFirstHighlightNodes.length;q++){var lengthNewArray=arr.push(arrayFirstHighlightNodes[q].SimpleHighlight);if(lengthNewArray>=1)
arr[lengthNewArray-1].note=arrayFirstHighlightNodes[q].title;}
chrome.extension.sendRequest({msg:obj.msgOnDetailHighlightsFrame,hrefHashRemoved:hrefHashRemoved,title:document.title,arrHighlights:arr});}