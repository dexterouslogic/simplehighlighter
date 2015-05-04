
var PREFIX_MSG_NUMHIGHLIGHTSSENT="background_NumHighlightsSent_";var LABEL_UNLABELED="Unlabelled"
var FORMAT_MOBILIZER_INSTAPAPER="http://www.instapaper.com/m?u=<<URL>>"
var FORMAT_MOBILIZER_GOOGLE="http://www.google.com/gwt/x?btnGo=Go&source=wax&ie=UTF-8&oe=UTF-8&u=<<URL>>"
var _totalIsDirty;var _totalNumHighlights;var _totalNumJournalErrors;var _msgNumHighlightsSent;var _arrTipObjects=[];var arrayMenuIdToPrefHL=[{prefHL:PREFERENCE_HL1},{prefHL:PREFERENCE_HL2},{prefHL:PREFERENCE_HL3},{prefHL:PREFERENCE_HL4},{prefHL:PREFERENCE_HL5},{prefHL:PREFERENCE_HL6},{prefHL:PREFERENCE_HL7},{prefHL:PREFERENCE_SETNOTEHL},{prefHL:PREFERENCE_TRANSHLTONOTE},{prefHL:PREFERENCE_LOOKUP},{prefHL:PREFERENCE_LOOKUP_OPENINNEW},{prefHL:PREFERENCE_TIPPOPUP},{prefHL:PREFERENCE_SELECTHL},{prefHL:PREFERENCE_UNHL},{prefHL:PREFERENCE_UNHL_ALL},{prefHL:PREFERENCE_DELHL},{prefHL:PREFERENCE_NATIVESPEAK},{prefHL:PREFERENCE_STOPNATIVESPEAK},{prefHL:PREFERENCE_MOBILIZEPAGE},];var arrayPrefixWithSeparator=[PREFERENCE_NATIVESPEAK,PREFERENCE_STOPNATIVESPEAK,PREFERENCE_DELHL,PREFERENCE_UNHL,PREFERENCE_SETNOTEHL,PREFERENCE_SELECTHL,PREFERENCE_LOOKUP,PREFERENCE_TIPPOPUP,PREFERENCE_MOBILIZEPAGE,];String.prototype.capitalize=function(){return this.replace(/(^|\s)([a-z])/g,function(m,p1,p2){return p1+p2.toUpperCase();});};chrome.tabs.onSelectionChanged.addListener(function(tabId,selectInfo){chrome.tabs.get(tabId,function(tab){UpdateTabPageAction(tab);});});chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,selectInfo){chrome.tabs.get(tabId,function(tab){UpdateTabPageAction(tab);});});Fixup();UpdateMenu();chrome.extension.onRequest.addListener(function(request,sender,sendResponse){switch(request.msg){case"nativeSpeak":if(request.stop==true)
chrome.tts.stop();else{var options=request.options;if(options==null)
options={};options.onEvent=function(event){if(event.type=='start'||event.type=='end'||event.type=='interrupted'||event.type=='cancelled'||event.type=='error'){UpdateMenu();}};chrome.tts.speak(request.utterance,options);}
break;case"getBase64StringFromBinaryURL":GetBase64StringFromBinaryURL(request.url,sendResponse,request.cbData);break;case"getHighlightsFromStringifiedImportObject":sendResponse(GetHighlightsFromStringifiedImportObject(request.stringifiedImportObject));break;case"importHighlightFromStringifiedImportObject":sendResponse(ImportHighlightFromStringifiedImportObject(request.stringifiedImportObject,request.store));break;case"exportHighlightFromStringifiedHL":sendResponse(ExportHighlightFromStringifiedHL(request.url,request.stringifiedHL,request.asXml));break;case"exportHighlights":sendResponse(ExportHighlights(request.urls,request.store,request.asXml));break;case"saveHighlights":sendResponse(SaveHighlights(request.url,request.store,request.arrayHighlights,request.append,request.href,request.keyRedirectToSessionStorage));break;case"loadHighlights":sendResponse(LoadHighlights(request.url,request.store));break;case"loadAllHighlights":sendResponse(LoadAllHighlights(request.store));break;case"getURLStore":sendResponse(GetURLStore(request.url));break;case"getSendersTab":sendResponse(sender.tab);break;case"updateMenu":sendResponse(UpdateMenu());break;case"getPreference":sendResponse(GetPreference(request.key));break;case"setPreference":sendResponse(SetPreference(request.key,request.value));break;case"updateSendersTabPageAction":if(sender.tab!=null)
UpdateTabPageAction(sender.tab);break;case"requestTip":sendResponse(RequestTip(request.tipTemplate,sender.tab,request.text,request.msgSet,request.index));break;case"releaseTipObject":sendResponse(ReleaseTipObject(request.id));break;case"callTipObjectFunction":sendResponse(CallTipObjectFunction(request.id,request.nameVariable,request.nameFunction,request.arg));break;case _msgNumHighlightsSent:OnNumHighlightsSent(request.numHighlights,request.numJournalErrors,request.isDirty,sender.tab);break;case"relayRequest":request.msg=request.msgRelay;chrome.tabs.sendRequest(sender.tab.id,request,sendResponse);break;}});function CallTipObjectFunction(objectId,nameVariable,nameFunction,arg){var tipObject=GetTipObject(objectId);if(tipObject==null)
return;if(tipObject.data[nameVariable]==null)
return;return tipObject.data[nameVariable][nameFunction](arg);}
function RequestTip(template,tab,text,msgSet,index){var parser=null;var arr=[{ids:[ID_TIPPOPUP_GOOGLELANGUAGEDETECT,ID_TIPPOPUP_GOOGLETRANSLATE,ID_TIPPOPUP_GOOGLEIMAGESEARCH,ID_TIPPOPUP_GOOGLETTS],parser:GoogleAPI},{ids:[ID_TIPPOPUP_YAHOOWEB,ID_TIPPOPUP_YAHOOSPELLING],parser:Yahoo},{ids:[ID_TIPPOPUP_MSTRANSLATE_TTS],parser:Bing},{ids:[ID_TIPPOPUP_MSTRANSLATE_TRANSLATE],parser:Bing},{ids:[ID_TIPPOPUP_FLICKR],parser:Flickr},{ids:[ID_TIPPOPUP_TWITTER],parser:Twitter},];var tipObject=GetTipObject(index);if(DoesTemplateIdHaveMediaWikiAPI(template.id)==true)
parser=MediaWiki;else{for(var x in arr){if(arr[x].ids.indexOf(template.id)!=-1){parser=arr[x].parser;break;}}}
if(parser){return parser.Request({tipObject:tipObject,text:text,tab:tab,msgSet:msgSet,index:index,template:template});}}
function SendRequestWithTabIfPossible(tab,request){if(tab&&tab.id!=-1)
chrome.tabs.sendRequest(tab.id,request);else
chrome.extension.sendRequest(request);}
function AddTipObject(id,tipObject){_arrTipObjects.push({id:id,obj:tipObject});console.log("add"+_arrTipObjects.length);}
function GetTipObject(objectId){var tipObject=null;for(var x in _arrTipObjects){if(_arrTipObjects[x].id==objectId){tipObject=_arrTipObjects[x].obj;break;}}
return tipObject;}
function ReleaseTipObject(objectId){for(var x in _arrTipObjects){if(_arrTipObjects[x].id==objectId){_arrTipObjects.splice(x,1);console.log("rem"+_arrTipObjects.length);return;}}}
function OnNumHighlightsSent(numHighlights,numJournalErrors,isDirty,tab){this._totalNumHighlights+=numHighlights;this._totalNumJournalErrors+=numJournalErrors;this._totalIsDirty+=(isDirty==true?1:0);var path="img/16";if(this._totalIsDirty>0){chrome.pageAction.show(tab.id)
path+="dirty";if(this._totalNumJournalErrors>0)
path+="Invalid";else
path+=(this._totalNumHighlights==0?"Empty":"");}
else{var store=GetURLStore(tab.url.RemoveHash());if(store=="session"||store=="local"){path+=store;if(this._totalNumJournalErrors>0)
path+="Invalid";}else{if(GetPreference(PREFERENCE_PAGEACTION)=="always"){path+="dirty";if(this._totalNumJournalErrors>0)
path+="Invalid";else
path+=(this._totalNumHighlights==0?"Empty":"");}
else
path=null;}
chrome.pageAction[path==null?"hide":"show"](tab.id);}
if(path!=null){chrome.pageAction.setIcon({tabId:tab.id,path:path+".png"});var title="";title+="Simple Highlighter: "+(this._totalNumHighlights==0?"No":this._totalNumHighlights)+" Highlight"+(this._totalNumHighlights==1?"":"s");if(this._totalNumJournalErrors>0)
title+=" ("+this._totalNumJournalErrors+" restoration error"+(this._totalNumJournalErrors==1?"":"s")+")";if(this._totalIsDirty>0&&this._totalNumHighlights>0)
title+=" [Not Saved]";chrome.pageAction.setTitle({tabId:tab.id,title:title});}}
function UpdateTabPageAction(tab){var showStylePageAction=GetPreference(PREFERENCE_PAGEACTION);if(showStylePageAction==PREFBOOL_FALSE||(tab&&(CanExecuteScriptOnURL(tab.url)==false))){if(tab)
chrome.pageAction.hide(tab.id);return;}
if(showStylePageAction=="always"){if(tab)
chrome.pageAction.show(tab.id);return;}
this._totalNumHighlights=0;this._totalIsDirty=0;this._totalNumJournalErrors=0;this._msgNumHighlightsSent=PREFIX_MSG_NUMHIGHLIGHTSSENT+RandomString(32);if(tab){chrome.tabs.executeScript(tab.id,{code:'if(typeof(GetNumHighlights) === "function") GetNumHighlights("'+this._msgNumHighlightsSent+'");',allFrames:true},null);}}
function UpdateMenu(){function _getMouseActivateShortcutAsText(ma){if(!ma||ma.enabled!=true)
return"";var out="";var arr=[{key:ma.ctrlKey,token:"Ctrl"},{key:ma.altKey,token:"Alt"},{key:ma.shiftKey,token:"Shift"},{key:ma.metaKey,token:"Meta"},];for(x in arr){if(arr[x].key==true){if(out.length>0)
out+="+";out+=arr[x].token;}}
if(out.length>0)
out+="+";out+=(ma.button==0?"Left":(ma.button==1?"Middle":"Right"));out+="Button";if(ma.dbl==true)
out+=" (x2)";return out;}
chrome.contextMenus.removeAll(function(){for(a in arrayMenuIdToPrefHL)
arrayMenuIdToPrefHL[a].menuItemId=null;if(GetPreference(PREFERENCE_CONTEXTMENU)==PREFBOOL_FALSE)
return;chrome.tts.isSpeaking(function(isSpeaking){var keys=[];for(a in arrayMenuIdToPrefHL)
keys.push(arrayMenuIdToPrefHL[a].prefHL);var arrPrefs=GetPreference(keys);for(a in arrayMenuIdToPrefHL){if(arrPrefs[arrayMenuIdToPrefHL[a].prefHL].showInContextMenu==false)
continue;if(arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_NATIVESPEAK&&isSpeaking==true)
continue;if(arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_STOPNATIVESPEAK&&isSpeaking!=true)
continue;if(arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_UNHL_ALL&&arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label==null)
arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label="Remove All Highlights...";if(arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label==null||arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label.length==0)
arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label=LABEL_UNLABELED;var shortcut="";if(arrPrefs[arrayMenuIdToPrefHL[a].prefHL].shortcut){var arrToken=arrPrefs[arrayMenuIdToPrefHL[a].prefHL].shortcut.split("+");for(z=0;z<arrToken.length;z++){if(shortcut.length>0)
shortcut+='+';if(arrToken[z]!="ctrl"&&arrToken[z]!="alt"&&arrToken[z]!="shift"&&arrToken[z]!="meta")
shortcut+=arrToken[z].toUpperCase();else
shortcut+=arrToken[z].capitalize();}}
else if(arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_LOOKUP||arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_TIPPOPUP){var ma=GetPreference(arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_LOOKUP?PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE:PREFERENCE_TIPPOPUP_MOUSEACTIVATE);shortcut=_getMouseActivateShortcutAsText(ma);}
for(var z in arrayPrefixWithSeparator){if(arrayPrefixWithSeparator[z]==arrayMenuIdToPrefHL[a].prefHL){chrome.contextMenus.create({type:"separator",contexts:["page","selection","link"]});break;}}
var title=arrPrefs[arrayMenuIdToPrefHL[a].prefHL].label;if(arrayMenuIdToPrefHL[a].prefHL==PREFERENCE_TRANSHLTONOTE){var languageInfo=Bing.GetLanguageInfo(GetPreference(PREFERENCE_TRANSNOTE_DESTLANG_BING));title=title.replace("<<LANGUAGE>>",languageInfo.name!=null?languageInfo.name:"?");}
arrayMenuIdToPrefHL[a].menuItemId=chrome.contextMenus.create({title:title+(arrPrefs[arrayMenuIdToPrefHL[a].prefHL].addNote==true?"...":"")+
(shortcut.length>0?("\t ["+shortcut+"]"):""),type:"normal",contexts:["page","selection","link"],onclick:OnClickContextMenu2});}});});}
function OnClickContextMenu2(info,tab){for(i in arrayMenuIdToPrefHL){if(arrayMenuIdToPrefHL[i].menuItemId==info.menuItemId){var prefHL=arrayMenuIdToPrefHL[i].prefHL;if(prefHL==PREFERENCE_MOBILIZEPAGE){chrome.tabs.get(tab.id,function(t){var format=(GetPreference(PREFERENCE_MOBILIZER)==MOBILIZER_INSTAPAPER?FORMAT_MOBILIZER_INSTAPAPER:FORMAT_MOBILIZER_GOOGLE);var url=format.replace("<<URL>>",t.url);chrome.tabs.create({url:url});});}
else{chrome.tabs.sendRequest(tab.id,{msg:"onClickContextMenu",prefHL:prefHL});}
break;}}};function Fixup(){var fixuplevel=GetPreference(PREFERENCE_FIXUPLEVEL);if(fixuplevel==null||fixuplevel<1){var arrTipPopupTemplates=GetPreference(PREFERENCE_TIPPOPUP_TEMPLATES);for(var y in arrTipPopupTemplates){if(arrTipPopupTemplates[y].id==ID_TIPPOPUP_GOOGLETRANSLATE&&arrTipPopupTemplates[y].default==true){arrTipPopupTemplates[y].default=false;for(var z in arrTipPopupTemplates){if(arrTipPopupTemplates[z].id==ID_TIPPOPUP_MSTRANSLATE_TRANSLATE){arrTipPopupTemplates[z].default=true;break;}}
SetPreference(PREFERENCE_TIPPOPUP_TEMPLATES,arrTipPopupTemplates);break;}}
SetPreference(PREFERENCE_FIXUPLEVEL,1);}};