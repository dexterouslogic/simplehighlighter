
var classSuffixHighlight="_"+RandomString(6);var CLASS_HIGHLIGHT1="simplehl1"+classSuffixHighlight;var CLASS_HIGHLIGHT2="simplehl2"+classSuffixHighlight;var CLASS_HIGHLIGHT3="simplehl3"+classSuffixHighlight;var CLASS_HIGHLIGHT4="simplehl4"+classSuffixHighlight;var CLASS_HIGHLIGHT5="simplehl5"+classSuffixHighlight;var CLASS_HIGHLIGHT6="simplehl6"+classSuffixHighlight;var CLASS_HIGHLIGHT7="simplehl7"+classSuffixHighlight;var ID_STYLERULE_HIGHLIGHTS="simplehl_hlstyle_"+RandomString(6);var ID_STYLERULE_FLASH="simplehl_flashstyle_"+RandomString(6);var NODENAME_SPAN="SPAN";var CONFIRM_REMOVE_ALL="Are you sure you would like to remove every highlight on this page? This action can not be undone.";var CONFIRM_LEAVE="The highlights on this page either have not been stored yet or are in a different state to those currently stored.\n\nIf you leave they may be forgotten or out of date.";var CONFIRM_FRAMEBUSTER="A lookup session that is currently loading is also attempting to navigate the browser to another page.\n\nDo you wish to allow this?";var CONFIRM_DELETE="Are you sure you would like to delete the highlight and all of its contents? This action can not be undone.";var PROMPT_NOTE="Enter a note for this highlight, or leave it blank if you don't wish to add anything.";var EXAMPLE_NOTE="";var BASEZINDEX_LOOKUPPOPUP=1000000;var OPACITY_BUTTON_DISABLED=0.4;var OPACITY_BUTTON_ENABLED=1;var __DEBUG=false;var arrayPrefHLToClassName=[{prefHL:PREFERENCE_HL1,className:CLASS_HIGHLIGHT1},{prefHL:PREFERENCE_HL2,className:CLASS_HIGHLIGHT2},{prefHL:PREFERENCE_HL3,className:CLASS_HIGHLIGHT3},{prefHL:PREFERENCE_HL4,className:CLASS_HIGHLIGHT4},{prefHL:PREFERENCE_HL5,className:CLASS_HIGHLIGHT5},{prefHL:PREFERENCE_HL6,className:CLASS_HIGHLIGHT6},{prefHL:PREFERENCE_HL7,className:CLASS_HIGHLIGHT7}];var eventContextMenu=null;var selectionContextMenu=null;var eventMouseMoveSummary={target:null,x:null,y:null};var maxSnippetLength=null;var msgScrollIntoView=null;var msgSetNote=null;var msgRemoveHighlight=null;var msgSelectHighlight=null;var msgShowTipPopup=null;var msgLookupHighlight=null;var msgSetTranslatedSnippet=null;var msgSetShowStatus=null;var msgSetTipPopupText=null;var popupPageYOffset=null;var arrJournal=[];var numJournalErrors=0;var isDirty=false;var autoSave=null;var autoSaveStore=null;var arrayFirstHighlightNodes=[];var statePopupButtonShowAllTrans=null;var statePopupButtonShowAllNotes=null;var warnOnBeforeUnload=null;var tabURLWithHashRemoved=null;function Main(){msgScrollIntoView="scrollIntoView_"+RandomString(8);msgSetNote="setNote_"+RandomString(8);msgRemoveHighlight="removeHighlight_"+RandomString(8);msgSelectHighlight="selectHighlight_"+RandomString(8);msgShowTipPopup="showTipPopup_"+RandomString(8);msgLookupHighlight="lookupHighlight_"+RandomString(8);msgSetTranslatedSnippet="setTranslatedSnippet_"+RandomString(8);msgSetShowStatus="setShowStatus_"+RandomString(8);msgGetShowStatus="getShowStatus_"+RandomString(8);msgSetTipPopupText="setTipPopupText_"+RandomString(8);chrome.extension.onRequest.addListener(function(request,sender,sendResponse){if(request.msg=="onClickContextMenu"){OnClickContextMenu(request.prefHL,{viaShortcut:false});}else if(request.msg=="getPopupPageYOffset"){sendResponse(popupPageYOffset);}else if(request.msg=="setPopupPageYOffset"){popupPageYOffset=request.popupPageYOffset;if(__DEBUG==true)
console.log("setPopupPageYOffset "+popupPageYOffset);}else if(request.msg==msgRemoveHighlight){sendResponse(RemoveHighlight(arrayFirstHighlightNodes[request.index],request.deleteContents));}else if(request.msg==msgSelectHighlight){sendResponse(SelectHighlight(arrayFirstHighlightNodes[request.index]));}else if(request.msg==msgShowTipPopup){DoTipPopup({firstNode:arrayFirstHighlightNodes[request.index],allowMultiple:false,togglePopup:true});sendResponse();}else if(request.msg==msgLookupHighlight){DoLookupPopup(null,arrayFirstHighlightNodes[request.index].SimpleHighlight.textComplete);sendResponse();}else if(request.msg==msgSetNote){if(!request.errorHTML){sendResponse(SetNote(arrayFirstHighlightNodes[request.index],request.data.note));}}else if(request.msg==msgSetTranslatedSnippet){if(!request.errorHTML){sendResponse(SetTranslatedSnippet(arrayFirstHighlightNodes[request.index],request.data.note,request.data.nameSrcLanguage,request.data.nameDestLanguage,request.data.urlSrcLanguageIcon));}}else if(request.msg==msgSetTipPopupText){sendResponse(OnSetTipPopupText(request.index,request.templateId,request.data));}else if(request.msg==msgSetShowStatus){if(request.itemType=="showTranslatedSnippet")
arrayFirstHighlightNodes[request.index].SimpleHighlight.showTranslatedSnippet=request.show;else if(request.itemType=="showNote")
arrayFirstHighlightNodes[request.index].SimpleHighlight.showNote=request.show;else if(request.itemType=="showAllTrans")
statePopupButtonShowAllTrans=request.show;else if(request.itemType=="showAllNotes")
statePopupButtonShowAllNotes=request.show;}else if(request.msg==msgScrollIntoView){if(request.alignToTop!=null)
arrayFirstHighlightNodes[request.index].scrollIntoView(request.alignToTop);chrome.extension.sendRequest({msg:"getPreference",key:[PREFERENCE_FLASHDURATION,PREFERENCE_FLASHITERATIONCOUNT,PREFERENCE_FLASHDIRECTION]},function response(arrayPrefs){SetHighlightStyle(arrayFirstHighlightNodes[request.index],"-webkit-animation-name","none");window.setTimeout(function(){SetHighlightStyle(arrayFirstHighlightNodes[request.index],"-webkit-animation-duration",arrayPrefs[PREFERENCE_FLASHDURATION]);SetHighlightStyle(arrayFirstHighlightNodes[request.index],"-webkit-animation-iteration-count",arrayPrefs[PREFERENCE_FLASHITERATIONCOUNT]);SetHighlightStyle(arrayFirstHighlightNodes[request.index],"-webkit-animation-direction",arrayPrefs[PREFERENCE_FLASHDIRECTION]);SetHighlightStyle(arrayFirstHighlightNodes[request.index],"-webkit-animation-name","flash");},0);});}
else if(request.msg==MSG_TIP_CONTENT_ONCLICKANCHOR){OnClickAnchorIFrame(request);}
else if(request.msg==MSG_TIP_CONTENT_ONSIZECHANGE){OnSizeChangeIFrame(request);}});LoadPreferences();var elemParent=(document.head?document.head:(document.body?document.body:document));var arr=[{type:"lookup",cssId:[CSSID_CHROME]},{type:"tip",cssId:[CSSID_CHROME,]}];for(var q in arr){for(var r in arr[q].cssId){var style=document.createElement('style');style.textContent=CSS2.BuildStyleSheet(arr[q].type,arr[q].cssId[r]);elemParent.appendChild(style);}}
document.addEventListener('contextmenu',function(event){eventContextMenu=event;if(__DEBUG==true)
console.log("EventListener(contextmenu) Selection isCollapsed="+document.getSelection().isCollapsed);},false);window.addEventListener("beforeunload",function(e){if(arrZIndexLookupPopups.length>0){for(var q=0;q<arrZIndexLookupPopups.length;q++){if(arrZIndexLookupPopups[q].iframe&&arrZIndexLookupPopups[q].iframe.framebuster==true&&arrZIndexLookupPopups[q].iframe.hasLoadedEventFired==false)
return CONFIRM_FRAMEBUSTER;}}
if(warnOnBeforeUnload==true&&isDirty==true&&arrayFirstHighlightNodes.length>0)
return CONFIRM_LEAVE;});window.addEventListener('unload',function(e){if(saveLookupPopupOnUnload==true&&dirtyPlacementLookupPopup==true){chrome.extension.sendRequest({msg:"setPreference",key:PREFERENCE_LOOKUPPOPUP_PLACEMENT,value:placementLookupPopup});}});window.addEventListener('unload',function(e){var elems=document.getElementsByClassName(CSS2.CLASS_TIP);for(var x=0;x<elems.length;x++)
chrome.extension.sendRequest({msg:"releaseTipObject",id:elems[x].id});});function OnClickActivateLookupPopup(e){if(mouseActivateLookupPopup==null)
return;if(mouseActivateLookupPopup.enabled!=true)
return;if(mouseActivateLookupPopup.dbl!=(e.type=="dblclick"?true:false)||mouseActivateLookupPopup.button!=e.button||mouseActivateLookupPopup.ctrlKey!=e.ctrlKey||mouseActivateLookupPopup.shiftKey!=e.shiftKey||mouseActivateLookupPopup.altKey!=e.altKey)
return;OnShortcut(PREFERENCE_LOOKUP);}
window.addEventListener('dblclick',OnClickActivateLookupPopup);window.addEventListener('mouseup',OnClickActivateLookupPopup);window.addEventListener('mousedown',function(e){if(e.button!=0)
return;if(e.target==document.documentElement){if(__DEBUG==true)
console.log("mousedown on htmlroot");return;}
var divPopups=document.getElementsByClassName(CSS2.CLASS_LOOKUP);for(var x=0;x<divPopups.length;x++){if(IsClickInsideFrame(e,divPopups[x])==true)
break;}
if(x!=0&&x==divPopups.length)
RemoveAllLookupPopups({keepPinned:true});},false);window.addEventListener('mouseup',function(e){if(e.button!=0)
return;var divPopups=document.getElementsByClassName(CSS2.CLASS_TIP);for(var x=divPopups.length-1;x>=0;x--){if(IsClickInsideFrame(e,divPopups[x])==false)
RemoveTipPopup(divPopups[x]);}},false);function OnClickActivateTipPopup(e){if(mouseActivateTipPopup==null)
return;if(mouseActivateTipPopup.enabled!=true)
return;if(mouseActivateTipPopup.dbl!=(e.type=="dblclick"?true:false)||mouseActivateTipPopup.button!=e.button||mouseActivateTipPopup.ctrlKey!=e.ctrlKey||mouseActivateTipPopup.shiftKey!=e.shiftKey||mouseActivateTipPopup.altKey!=e.altKey)
return;OnShortcut(PREFERENCE_TIPPOPUP);}
window.addEventListener('dblclick',OnClickActivateTipPopup);window.addEventListener('mouseup',OnClickActivateTipPopup);document.addEventListener("mousemove",function(e){if(useWordUnderCursor_LookupPopup==true||useWordUnderCursor_TipPopup==true){if(eventMouseMoveSummary.target!=e.target)
eventMouseMoveSummary.target=e.target;eventMouseMoveSummary.x=e.x;eventMouseMoveSummary.y=e.y;}},false);chrome.extension.sendRequest({msg:"getSendersTab"},function response(tab){tabURLWithHashRemoved=tab.url.RemoveHash();chrome.extension.sendRequest({msg:"loadHighlights",url:tabURLWithHashRemoved,store:"auto"},function response(arrayHighlights){if(arrayHighlights){PlayIntoJournal(arrayHighlights,{dontSetDirty:true,});SetDirty(false);}});});}
function LoadPreferences(mask){chrome.extension.sendRequest({msg:"getPreference",key:[PREFERENCE_WARNONUNLOAD,PREFERENCE_AUTOSAVE,PREFERENCE_AUTOSAVE_STORE,PREFERENCE_SNIPPETMAX,PREFERENCE_HIGHLIGHTSTYLE,PREFERENCE_KEYFRAMES_FLASH,PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS,PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW,PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING,PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW,PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS,PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW,PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING,PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW,PREFERENCE_TRANSNOTE_SRCLANG_BING,PREFERENCE_TRANSNOTE_DESTLANG_BING,PREFERENCE_AUTOTRANS_NOTE,PREFERENCE_TRANSSNIPPET_SRCLANG_BING,PREFERENCE_TRANSSNIPPET_DESTLANG_BING,PREFERENCE_AUTOTRANS_SNIPPET,PREFERENCE_LOOKUP,PREFERENCE_LOOKUP_OPENINNEW,PREFERENCE_LOOKUP_CREATEEMPTY,PREFERENCE_LOOKUP_TEMPLATES,PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT,PREFERENCE_LOOKUPPOPUP_PLACEMENT,PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE,PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR,PREFERENCE_TIPPOPUP,PREFERENCE_TIPPOPUP_MULTIPLE,PREFERENCE_TIPPOPUP_TEMPLATES,PREFERENCE_TIPPOPUP_MOUSEACTIVATE,PREFERENCE_TIPPOPUP_WORDUNDERCURSOR,PREFERENCE_STORESESSION,PREFERENCE_STORELOCAL,PREFERENCE_HL1,PREFERENCE_HL2,PREFERENCE_HL3,PREFERENCE_HL4,PREFERENCE_HL5,PREFERENCE_HL6,PREFERENCE_HL7,PREFERENCE_UNHL_ALL]},function response(arrayPrefs){if(mask==null||mask.maskTranslation){autoTranslateToNote=(arrayPrefs[PREFERENCE_AUTOTRANS_NOTE]==PREFBOOL_TRUE?true:false);translateNoteSrcLang=arrayPrefs[PREFERENCE_TRANSNOTE_SRCLANG_BING];translateNoteDestLang=arrayPrefs[PREFERENCE_TRANSNOTE_DESTLANG_BING];autoTranslateSnippet=(arrayPrefs[PREFERENCE_AUTOTRANS_SNIPPET]==PREFBOOL_TRUE?true:false);translateSnippetSrcLang=arrayPrefs[PREFERENCE_TRANSSNIPPET_SRCLANG_BING];translateSnippetDestLang=arrayPrefs[PREFERENCE_TRANSSNIPPET_DESTLANG_BING];arrayFirstHighlightNodes.forEach(function(node){SetTranslatedSnippet(node);});}
if(mask==null){var parentElement=(document.head?document.head:(document.body?document.body:document));var styleElement=document.createElement('style');styleElement.id=ID_STYLERULE_HIGHLIGHTS;arrayPrefHLToClassName.forEach(function(h){styleElement.textContent+=("."+h.className+" { "+GetStyleElementText(arrayPrefs,arrayPrefs[h.prefHL],"page")+"} ");h.addNote=arrayPrefs[h.prefHL].addNote;});existingStyleElement=document.getElementById(styleElement.id);if(existingStyleElement!=null)
parentElement.replaceChild(styleElement,existingStyleElement);else
parentElement.appendChild(styleElement);styleElement=document.createElement('style');styleElement.id=ID_STYLERULE_FLASH;styleElement.textContent='@-webkit-keyframes flash {'+arrayPrefs[PREFERENCE_KEYFRAMES_FLASH]+'}';existingStyleElement=document.getElementById(styleElement.id);if(existingStyleElement!=null)
parentElement.replaceChild(styleElement,existingStyleElement);else
parentElement.appendChild(styleElement);maxSnippetLength=arrayPrefs[PREFERENCE_SNIPPETMAX];autoSave=(arrayPrefs[PREFERENCE_AUTOSAVE]==PREFBOOL_TRUE?true:false);autoSaveStore=arrayPrefs[PREFERENCE_AUTOSAVE_STORE];warnOnBeforeUnload=(arrayPrefs[PREFERENCE_WARNONUNLOAD]==PREFBOOL_TRUE?true:false);saveLookupPopupOnUnload=(arrayPrefs[PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT]==PREFBOOL_TRUE?true:false);arrLookupTemplates=arrayPrefs[PREFERENCE_LOOKUP_TEMPLATES];placementLookupPopup=arrayPrefs[PREFERENCE_LOOKUPPOPUP_PLACEMENT];mouseActivateLookupPopup=arrayPrefs[PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE];useWordUnderCursor_LookupPopup=arrayPrefs[PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR]==PREFBOOL_TRUE?true:false;useWordUnderCursor_TipPopup=arrayPrefs[PREFERENCE_TIPPOPUP_WORDUNDERCURSOR]==PREFBOOL_TRUE?true:false;arrTipPopupTemplates=arrayPrefs[PREFERENCE_TIPPOPUP_TEMPLATES];mouseActivateTipPopup=arrayPrefs[PREFERENCE_TIPPOPUP_MOUSEACTIVATE];for(s in shortcut.all_shortcuts)
shortcut.remove(s);for(var b in arrayPrefHLToClassName){if(arrayPrefs[arrayPrefHLToClassName[b].prefHL].shortcut&&arrayPrefs[arrayPrefHLToClassName[b].prefHL].showInContextMenu!=false){shortcut.add(arrayPrefs[arrayPrefHLToClassName[b].prefHL].shortcut,function(event,keys,opt){OnShortcut(opt.callbackData.prefHL);},{'disable_in_input':true,'propagate':true,callbackData:{prefHL:arrayPrefHLToClassName[b].prefHL}});}}
var arrShortcuts=[PREFERENCE_UNHL_ALL,PREFERENCE_STORESESSION,PREFERENCE_STORELOCAL,PREFERENCE_LOOKUP,PREFERENCE_LOOKUP_OPENINNEW,PREFERENCE_LOOKUP_CREATEEMPTY,PREFERENCE_TIPPOPUP,PREFERENCE_TIPPOPUP_MULTIPLE];for(var q in arrShortcuts){if(arrayPrefs[arrShortcuts[q]].shortcut!=null){shortcut.add(arrayPrefs[arrShortcuts[q]].shortcut,function(e,keys,opt){OnShortcut(opt.callbackData.prefHL);},{'disable_in_input':true,'propagate':true,callbackData:{prefHL:arrShortcuts[q]}});}}
for(var x in arrLookupTemplates){if(arrLookupTemplates[x].enabled==true&&arrLookupTemplates[x].shortcut){shortcut.add(arrLookupTemplates[x].shortcut,function(event,keys,opt){templateIdLookupLast=opt.callbackData.templateId;OnShortcut(PREFERENCE_LOOKUP);},{'disable_in_input':true,'propagate':true,callbackData:{templateId:arrLookupTemplates[x].id}});}}
for(var x in arrTipPopupTemplates){if(arrTipPopupTemplates[x].shortcut){shortcut.add(arrTipPopupTemplates[x].shortcut,function(event,keys,opt){OnShortcut(PREFERENCE_TIPPOPUP,{templateId:opt.callbackData.templateId});},{'disable_in_input':true,'propagate':true,callbackData:{templateId:arrTipPopupTemplates[x].id}});}}
shortcut.add("esc",function(event){RemoveAllLookupPopups({keepPinned:true});},{'disable_in_input':true,'propagate':true});shortcut.add("esc",function(event){RemoveAllTipPopups();},{'disable_in_input':true,'propagate':true});}});}
function OnShortcut(prefHL,options){eventContextMenu=null;if(options)
options.viaShortcut=true;OnClickContextMenu(prefHL,options?options:{viaShortcut:true});}
function OnClickContextMenu(prefHL,options){function _GetTipPopupTemplateForID(idMatch){var template=null;for(var y in _arrTipPopupMasterTemplates){if(_arrTipPopupMasterTemplates[y].id==idMatch){template=_clone(_arrTipPopupMasterTemplates[y]);break;}}
if(template){if(template.options==null)
template.options={};template.sessionData={};for(var q in template.defaultOptions){if(template.options[q]===undefined)
template.options[q]=template.defaultOptions[q];}}
return template;}
if(options.viaShortcut!=true&&eventContextMenu==null)
return;var selRange=window.getSelection();var className=_PrefHLToClassName(prefHL);var eventContextMenuCopy=eventContextMenu;eventContextMenu=null;switch(prefHL){case PREFERENCE_STOPNATIVESPEAK:chrome.extension.sendRequest({msg:"nativeSpeak",stop:true});return;case PREFERENCE_UNHL_ALL:RemoveAllHighlights();return;case PREFERENCE_STORELOCAL:case PREFERENCE_STORESESSION:SaveHighlights(prefHL==PREFERENCE_STORELOCAL?"local":"session");return;}
var note=null;var addNote=false;for(a in arrayPrefHLToClassName){if(arrayPrefHLToClassName[a].prefHL==prefHL){addNote=arrayPrefHLToClassName[a].addNote;break;}}
if(selRange.isCollapsed==true||(selRange.rangeCount==1&&selRange.getRangeAt(0).collapsed==true)){var container=(eventContextMenuCopy!=null&&eventContextMenuCopy.target!=null)?GetAncestorOrSelfHighlightFromNode(eventContextMenuCopy.target):null;if(className!=null){if(container)
ChangeHighlightColor(container,prefHL);}
else if(container==null){function GetWordAtPoint(elem,x,y,returnFormat){var rangeHighlight=GetRangeFromHighlight(elem);if(rangeHighlight){if(returnFormat=="range")
return rangeHighlight;else{var str=rangeHighlight.toString();rangeHighlight.detach();return(str);}}
if(elem.nodeType==Node.TEXT_NODE){var range=elem.ownerDocument.createRange();range.selectNodeContents(elem);var currentPos=0;var endPos=range.endOffset;while(currentPos+1<endPos){range.setStart(elem,currentPos);range.setEnd(elem,currentPos+1);var rectBoundingClient=range.getBoundingClientRect();if(rectBoundingClient.left<=x&&rectBoundingClient.right>=x&&rectBoundingClient.top<=y&&rectBoundingClient.bottom>=y){range.expand("word");if(returnFormat=="range")
return range;else{var str=range.toString();range.detach();return(str);}}
currentPos+=1;}}
else{for(var i=0;i<elem.childNodes.length;i++){var range=elem.childNodes[i].ownerDocument.createRange();range.selectNodeContents(elem.childNodes[i]);var rectBoundingClient=range.getBoundingClientRect();range.detach();if(rectBoundingClient.left<=x&&rectBoundingClient.right>=x&&rectBoundingClient.top<=y&&rectBoundingClient.bottom>=y){var potentialResult=GetWordAtPoint(elem.childNodes[i],x,y,returnFormat);if(potentialResult!=null)
return(potentialResult);}}}
return(null);}
var range=null;var textSelected,boundingClientRect;if(eventContextMenuCopy&&eventContextMenuCopy.target&&eventContextMenuCopy.target.nodeType==Node.ELEMENT_NODE&&(eventContextMenuCopy.target.nodeName=="TEXTAREA"||(eventContextMenuCopy.target.nodeName=="INPUT"&&eventContextMenuCopy.target.type=="text"))){textSelected=eventContextMenuCopy.target.value;textSelected=textSelected.substring(eventContextMenuCopy.target.selectionStart,eventContextMenuCopy.target.selectionEnd);boundingClientRect=eventContextMenuCopy.target.getBoundingClientRect();}
else if(useWordUnderCursor_LookupPopup==true||useWordUnderCursor_TipPopup==true){var e=(options.viaShortcut==true?eventMouseMoveSummary:eventContextMenuCopy);if(e&&e.target!=null)
range=GetWordAtPoint(e.target,e.x,e.y,"range");}
if(prefHL==PREFERENCE_TIPPOPUP||prefHL==PREFERENCE_TIPPOPUP_MULTIPLE){DoTipPopup({range:useWordUnderCursor_TipPopup==true?range:null,text:textSelected,boundingClientRect:boundingClientRect,allowMultiple:prefHL==PREFERENCE_TIPPOPUP_MULTIPLE?true:false},options.templateId);}
if(prefHL==PREFERENCE_LOOKUP||prefHL==PREFERENCE_LOOKUP_OPENINNEW||prefHL==PREFERENCE_LOOKUP_CREATEEMPTY){if(range&&useWordUnderCursor_LookupPopup==true)
textSelected=range.toString();var divPopup=DoLookupPopup(eventContextMenuCopy,textSelected,{createNew:(prefHL==PREFERENCE_LOOKUP_OPENINNEW||prefHL==PREFERENCE_LOOKUP_CREATEEMPTY)?true:false});if(divPopup&&prefHL==PREFERENCE_LOOKUP_CREATEEMPTY)
divPopup.divTitlebar.inputQuery.focus();}
if(range)
range.detach();}
else{if(prefHL==PREFERENCE_UNHL){RemoveHighlight(container);}
else if(prefHL==PREFERENCE_SELECTHL){SelectHighlight(container);}
else if(prefHL==PREFERENCE_DELHL){if(confirm(CONFIRM_DELETE)==true)
RemoveHighlight(container,true);}
else if(prefHL==PREFERENCE_SETNOTEHL){note=PromptForNote(container.title);if(note==null)
return;SetNote(container,(note.length==0?null:note));}
else if(prefHL==PREFERENCE_NATIVESPEAK){if(container&&container.SimpleHighlight&&container.SimpleHighlight.textComplete)
chrome.extension.sendRequest({msg:"nativeSpeak",utterance:container.SimpleHighlight.textComplete});}
else if(prefHL==PREFERENCE_TRANSHLTONOTE){var nodeIndex=arrayFirstHighlightNodes.indexOf(container);if(nodeIndex!=-1){var tt=_GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);tt.options.srcLang=translateNoteSrcLang;tt.options.destLang=translateNoteDestLang;chrome.extension.sendRequest({msg:"requestTip",tipTemplate:tt,text:container.SimpleHighlight.textComplete,msgSet:msgSetNote,index:nodeIndex});}}
else if(prefHL==PREFERENCE_LOOKUP||prefHL==PREFERENCE_LOOKUP_OPENINNEW){DoLookupPopup(eventContextMenuCopy,container.SimpleHighlight.textComplete,{createNew:prefHL==PREFERENCE_LOOKUP_OPENINNEW?true:false});}
else if(prefHL==PREFERENCE_LOOKUP_CREATEEMPTY){var divPopup=DoLookupPopup(eventContextMenuCopy,null,{createNew:true});if(divPopup)
divPopup.divTitlebar.inputQuery.focus();}
else if(prefHL==PREFERENCE_TIPPOPUP||prefHL==PREFERENCE_TIPPOPUP_MULTIPLE)
DoTipPopup({firstNode:container,allowMultiple:prefHL==PREFERENCE_TIPPOPUP_MULTIPLE?true:false},options.templateId);}}else{var canSetDirty=false;for(var rangeIndex=0;rangeIndex<selRange.rangeCount;rangeIndex++){if(className!=null){if((eventContextMenuCopy&&eventContextMenuCopy.ctrlKey==true)||addNote==true){note=PromptForNote();if(note==null)
continue;}
firstNode=HighlightSelection(prefHL,selRange.getRangeAt(rangeIndex),{dontUpdatePageAction:true,ignoreAutoSave:true});if(firstNode!=null)
canSetDirty=true;if(firstNode){var nodeIndex;if((autoTranslateSnippet==true||(eventContextMenuCopy&&eventContextMenuCopy.shiftKey==true))&&firstNode.SimpleHighlight.snippet){nodeIndex=arrayFirstHighlightNodes.lastIndexOf(firstNode);if(nodeIndex!=-1){var tt=_GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);tt.options.srcLang=translateSnippetSrcLang;tt.options.destLang=translateSnippetDestLang;chrome.extension.sendRequest({msg:"requestTip",tipTemplate:tt,text:firstNode.SimpleHighlight.snippet,msgSet:msgSetTranslatedSnippet,index:nodeIndex});firstNode.SimpleHighlight.showTranslatedSnippet=true;}}
if(note&&note.length>0)
SetNote(firstNode,note,{dontUpdatePageAction:true,ignoreAutoSave:true});else if(autoTranslateToNote==true){if(nodeIndex==null)
nodeIndex=arrayFirstHighlightNodes.lastIndexOf(firstNode);if(nodeIndex!=-1){var tt=_GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);tt.options.srcLang=translateNoteSrcLang;tt.options.destLang=translateNoteDestLang;chrome.extension.sendRequest({msg:"requestTip",tipTemplate:tt,text:firstNode.SimpleHighlight.textComplete,msgSet:msgSetNote,index:nodeIndex});}}}}
else if(prefHL==PREFERENCE_NATIVESPEAK){if(selRange.getRangeAt(rangeIndex).toString())
chrome.extension.sendRequest({msg:"nativeSpeak",utterance:selRange.getRangeAt(rangeIndex).toString()});}
else if(prefHL==PREFERENCE_LOOKUP||prefHL==PREFERENCE_LOOKUP_OPENINNEW){DoLookupPopup(eventContextMenuCopy,selRange.getRangeAt(rangeIndex).toString(),{createNew:prefHL==PREFERENCE_LOOKUP_OPENINNEW?true:false});}
else if(prefHL==PREFERENCE_LOOKUP_CREATEEMPTY){var divPopup=DoLookupPopup(eventContextMenuCopy,null,{createNew:true});if(divPopup)
divPopup.divTitlebar.inputQuery.focus();}
else if(prefHL==PREFERENCE_TIPPOPUP||prefHL==PREFERENCE_TIPPOPUP_MULTIPLE)
DoTipPopup({range:selRange.getRangeAt(rangeIndex),allowMultiple:prefHL==PREFERENCE_TIPPOPUP_MULTIPLE?true:false},options.templateId);else{container=GetAncestorOrSelfHighlightFromNode(selRange.getRangeAt(rangeIndex).startContainer);if(container==null)
container=GetAncestorOrSelfHighlightFromNode(selRange.getRangeAt(rangeIndex).endContainer);if(container){if(prefHL==PREFERENCE_DELHL){if(confirm(CONFIRM_DELETE)==true){if(RemoveHighlight(container,true,{dontUpdatePageAction:true,ignoreAutoSave:true})==true)
canSetDirty=true;}}
else if(prefHL==PREFERENCE_SELECTHL){SelectHighlight(container);canSetDirty=false;}
else if(prefHL==PREFERENCE_UNHL){if(RemoveHighlight(container,false,{dontUpdatePageAction:true,ignoreAutoSave:true})==true)
canSetDirty=true;}
else if(prefHL==PREFERENCE_SETNOTEHL){note=PromptForNote(container.title);if(note==null)
continue;SetNote(container,(note.length==0?null:note),{dontUpdatePageAction:true,ignoreAutoSave:true});canSetDirty=true;}
else if(prefHL==PREFERENCE_TRANSHLTONOTE){var nodeIndex=arrayFirstHighlightNodes.indexOf(container);if(nodeIndex!=-1){var tt=_GetTipPopupTemplateForID(ID_TIPPOPUP_MSTRANSLATE_TRANSLATE);tt.options.srcLang=translateNoteSrcLang;tt.options.destLang=translateNoteDestLang;chrome.extension.sendRequest({msg:"requestTip",tipTemplate:tt,text:firstNode.SimpleHighlight.textComplete,msgSet:msgSetNote,index:nodeIndex});}
canSetDirty=false;}}}}
if(canSetDirty==true)
SetDirty(true);}}
function GetAncestorOrSelfHighlightFromNode(n){while(n!=null){if(n.nodeName==NODENAME_SPAN&&n.SimpleHighlight&&n.SimpleHighlight.highlight==true)
break;n=n.parentNode;}
if(n){while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true))
n=n.nextHighlight;n=n.firstNode;}
return n;}
function PromptForNote(example){return window.prompt(PROMPT_NOTE,example==null?EXAMPLE_NOTE:example);}
function AddToJournal(verb,firstNode,objExtra){var obj={verb:verb,id:firstNode.id,};if(objExtra){for(var key in objExtra){if(!key)
continue;obj[key]=objExtra[key];}}
var hrefWithHashRemoved=location.href.RemoveHash();if(tabURLWithHashRemoved==null||(tabURLWithHashRemoved!=hrefWithHashRemoved))
obj.href=hrefWithHashRemoved;if(verb=="highlight"){obj.xpathRange=firstNode.SimpleHighlight.xpathRange;obj.prefHL=firstNode.SimpleHighlight.prefHL;Date.prototype.toJSON=function(key){function f(n){return n<10?'0'+n:n;}
return this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'.'+
f(this.getUTCMilliseconds())+'Z';};obj.date=firstNode.SimpleHighlight.date.toJSON();}
else if(verb=="removeHighlight"||verb=="deleteHighlight"){}
else{for(var y=0;y<arrJournal.length;y++){if(arrJournal[y].verb==verb&&arrJournal[y].id==firstNode.id)
break;}
if(verb=="setNote"){if(obj["note"]===undefined)
obj["note"]=firstNode.title;}
else if(verb=="changeHighlightColour"){obj.prefHL=firstNode.SimpleHighlight.prefHL;}
else
return;if(y<arrJournal.length){if(verb=="setNote"&&(obj["note"]==null||obj["note"]===undefined||obj["note"]=="")){if(__DEBUG==true)
console.log("AddToJournal() - splice (index "+y+")");arrJournal.splice(y,1);}
else{if(__DEBUG==true)
console.log("AddToJournal() - update (index "+y+")");arrJournal[y]=obj;}
if(__DEBUG==true)
console.log(JSON.stringify(obj));return;}}
if(__DEBUG==true){console.log("AddToJournal() - push");console.log(JSON.stringify(obj));}
arrJournal.push(obj);}
function HighlightSelection(prefHL,range,args){var record={firstNode:null,lastNode:null};var wrap=document.createElement(NODENAME_SPAN);wrap.className=_PrefHLToClassName(prefHL);wrap.SimpleHighlight={highlight:true,date:(args==null||args.date==null)?new Date():args.date,};var _createWrapper=function(n){var e=wrap.cloneNode(false);e.style.setProperty("background-color","transparent","important");e.style.setProperty("color","inherit","important");e.style.setProperty("-webkit-box-shadow","transparent 3px 3px 4px","!important");e.SimpleHighlight={};for(x in wrap.SimpleHighlight)
e.SimpleHighlight[x]=wrap.SimpleHighlight[x];if(!record.firstNode)
record.firstNode=e;if(record.lastNode)
record.lastNode.nextHighlight=e;record.lastNode=e;return e;};var xpathRange=GetXPathRangeFromRange(range);_highlightRange0(range,_createWrapper,record);if(record.firstNode!=null){record.lastNode.nextHighlight=record;record.firstNode.SimpleHighlight.isFirstNode=true;record.firstNode.SimpleHighlight.prefHL=prefHL;record.firstNode.SimpleHighlight.textComplete=GatherText(record.firstNode).replace(/\s+/g," ").alltrim();record.firstNode.SimpleHighlight.snippet=GatherText(record.firstNode,maxSnippetLength).replace(/\s+/g," ").alltrim();record.firstNode.id=(args&&args.id!=null)?args.id:RandomString(8);record.firstNode.SimpleHighlight.xpathRange=xpathRange;arrayFirstHighlightNodes.push(record.firstNode);if(!args||args.dontAddToJournal!=true)
AddToJournal("highlight",record.firstNode);SetDirty(true,args);}
return record.firstNode;}
function _highlightRange0(range,_createWrapper,record){if(range.collapsed)
return;var startSide=range.startContainer;var endSide=range.endContainer;var ancestor=range.commonAncestorContainer;var dirIsLeaf=true;if(range.endOffset==0){while(!endSide.previousSibling&&endSide.parentNode!=ancestor)
endSide=endSide.parentNode;endSide=endSide.previousSibling;}else if(endSide.nodeType==Node.TEXT_NODE){if(range.endOffset<endSide.nodeValue.length){endSide.splitText(range.endOffset);}}else if(range.endOffset>0){endSide=endSide.childNodes.item(range.endOffset-1);}
if(startSide.nodeType==Node.TEXT_NODE){if(range.startOffset==startSide.nodeValue.length){dirIsLeaf=false;}else if(range.startOffset>0){startSide=startSide.splitText(range.startOffset);if(endSide==startSide.previousSibling){endSide=startSide;}}}else if(range.startOffset<startSide.childNodes.length){startSide=startSide.childNodes.item(range.startOffset);}else{dirIsLeaf=false;}
range.setStart(range.startContainer,0);range.setEnd(range.startContainer,0);var done=false;var node=startSide;var tmp;do{if(dirIsLeaf&&node.nodeType==Node.TEXT_NODE&&!((tmp=node.parentNode)instanceof HTMLTableElement||tmp instanceof HTMLTableRowElement||tmp instanceof HTMLTableColElement||tmp instanceof HTMLTableSectionElement)){var wrap=node.previousSibling;if(!wrap||wrap!=record.lastNode){wrap=_createWrapper(node);node.parentNode.insertBefore(wrap,node);}
wrap.appendChild(node);window.setTimeout(function(elem){elem.style.removeProperty("background-color");elem.style.removeProperty("color");elem.style.removeProperty("-webkit-box-shadow");},0,wrap);node=wrap.lastChild;dirIsLeaf=false;}
if(node==endSide&&(!endSide.hasChildNodes()||!dirIsLeaf))
done=true;if(node instanceof HTMLScriptElement||node instanceof HTMLStyleElement||node instanceof HTMLSelectElement){dirIsLeaf=false;}
if(dirIsLeaf&&node.hasChildNodes()){node=node.firstChild;}else if(node.nextSibling!=null){node=node.nextSibling;dirIsLeaf=true;}else if(node.nextSibling==null){node=node.parentNode;dirIsLeaf=false;}}while(!done);}
function GetRangeFromHighlight(node){var range;var n=node;if(node==null)
return null;while(n.nodeType==Node.ELEMENT_NODE&&n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){n=n.nextHighlight;}
n=n.firstNode;var nStart=n;while(n!=null&&n.nodeType==Node.ELEMENT_NODE&&n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){if(range==null){range=document.createRange();range.setStartBefore(nStart);}
range.setEndAfter(n);n=n.nextHighlight;}
return range;}
function SelectHighlight(node){var range=GetRangeFromHighlight(node);if(range){var selRange=document.getSelection();selRange.removeAllRanges();selRange.addRange(range);}}
function RemoveHighlight(node,deleteContents,args){function __MergeNodeWithImmediateSiblings(n){if(n.nodeType==Node.TEXT_NODE){if(n.nextSibling&&n.nextSibling.nodeType==Node.TEXT_NODE){n.textContent+=n.nextSibling.textContent;n.nextSibling.parentNode.removeChild(n.nextSibling);}
if(n.previousSibling&&n.previousSibling.nodeType==Node.TEXT_NODE){n.previousSibling.textContent+=n.textContent;n.parentNode.removeChild(n);}}}
var hasRemovedFirstNode=false;if(node!=null&&node.nodeType==Node.ELEMENT_NODE&&(node.SimpleHighlight&&node.SimpleHighlight.highlight==true)){var n=node.nextHighlight;while(n!=null&&n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){if(hasRemovedFirstNode==false&&n.SimpleHighlight.isFirstNode==true){if(!args||args.dontAddToJournal!=true){var objExtra={};if(!args||args.dontMergeRestoredNodes!=true)
objExtra.merge=true;AddToJournal(deleteContents==true?"deleteHighlight":"removeHighlight",n,objExtra);}
RemoveFromFirstNodesArray(n);hasRemovedFirstNode=true;}
if(deleteContents!=true){while(n.hasChildNodes()){var nodeNew=n.parentNode.insertBefore(n.firstChild,n);if(!args||args.dontMergeRestoredNodes!=true)
__MergeNodeWithImmediateSiblings(nodeNew);}}
var nodeRemovedPreviousSibling=n.previousSibling;var nodeRemoved=n.parentNode.removeChild(n);if((!args||args.dontMergeRestoredNodes!=true)&&nodeRemovedPreviousSibling)
__MergeNodeWithImmediateSiblings(nodeRemovedPreviousSibling);n=nodeRemoved.nextHighlight;}
var record=n;node.nextHighlight=null;n=record.firstNode;while(n!=null&&n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){if(hasRemovedFirstNode==false&&n.SimpleHighlight.isFirstNode==true){if(!args||args.dontAddToJournal!=true){var objExtra={};if(!args||args.dontMergeRestoredNodes!=true)
objExtra.merge=true;AddToJournal(deleteContents==true?"deleteHighlight":"removeHighlight",n,objExtra);}
RemoveFromFirstNodesArray(n);hasRemovedFirstNode=true;}
if(deleteContents!=true){while(n.hasChildNodes()){var nodeNew=n.parentNode.insertBefore(n.firstChild,n);if(!args||args.dontMergeRestoredNodes!=true)
__MergeNodeWithImmediateSiblings(nodeNew);}}
var nodeRemovedPreviousSibling=n.previousSibling;var nodeRemoved=n.parentNode.removeChild(n);if((!args||args.dontMergeRestoredNodes!=true)&&nodeRemovedPreviousSibling)
__MergeNodeWithImmediateSiblings(nodeRemovedPreviousSibling);n=nodeRemoved.nextHighlight;}
record.firstNode=null;record.lastNode.nextHighlight=null;record.lastNode=null;SetDirty(true,args);}
if(arrayFirstHighlightNodes.length==0){var canOptimize=true;for(var z=0;z<arrJournal.length;z++){if(arrJournal[z].verb=="removeHighlight"&&arrJournal[z].merge!=true){canOptimize=false;break;}}
if(canOptimize==true){arrJournal=[];}}
return hasRemovedFirstNode;}
function SetTranslatedSnippet(node,translatedSnippet,nameSrcLanguage,nameDestLanguage,urlSrcLanguageIcon){if(node&&node.SimpleHighlight){node.SimpleHighlight.translatedSnippet=translatedSnippet;node.SimpleHighlight.nameSrcLanguage=nameSrcLanguage;node.SimpleHighlight.nameDestLanguage=nameDestLanguage;node.SimpleHighlight.urlSrcLanguageIcon=urlSrcLanguageIcon;}}
function SetNote(node,note,args){var n=node;while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){n.title=note;n=n.nextHighlight;}
if(!args||args.dontAddToJournal!=true){n.firstNode.title=note;AddToJournal("setNote",n.firstNode);}
n=n.firstNode;while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)&&n!=node){n.title=note;n=n.nextHighlight;}
SetDirty(true,args);}
function ChangeHighlightColor(node,prefHL,args){var n=node;var className=_PrefHLToClassName(prefHL);while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){n.className=className;n=n.nextHighlight;}
n=n.firstNode;if(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){n.SimpleHighlight.prefHL=prefHL;if(!args||args.dontAddToJournal!=true)
AddToJournal("changeHighlightColour",n);}
while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)&&n!=node){n.className=className;n=n.nextHighlight;}
SetDirty(true);}
function SetHighlightStyle(node,property,value,callback)
{var n=node;if(callback!=null)
n[value==true?"addEventListener":"removeEventListener"]('webkitAnimationEnd',callback,false);if(property!=null){while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){if(value==null)
n.style.removeProperty(property);else
n.style.setProperty(property,value);n=n.nextHighlight;}
n=n.firstNode;while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)&&n!=node){if(value==null)
n.style.removeProperty(property);else
n.style[property]=value;n=n.nextHighlight;}}}
function GetHighlightBoundingClientRect(node){var n=node;var textRect={left:null,right:null,top:null,bottom:null};while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){var r=n.getBoundingClientRect();if(textRect.left==null||r.left<textRect.left)textRect.left=r.left;if(textRect.right==null||r.right>textRect.right)textRect.right=r.right;if(textRect.top==null||r.top<textRect.top)textRect.top=r.top;if(textRect.bottom==null||r.bottom>textRect.bottom)textRect.bottom=r.bottom;n=n.nextHighlight;}
n=n.firstNode;while(n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)&&n!=node){if(textRect.left==null||r.left<textRect.left)textRect.left=r.left;if(textRect.right==null||r.right>textRect.right)textRect.right=r.right;if(textRect.top==null||r.top<textRect.top)textRect.top=r.top;if(textRect.bottom==null||r.bottom>textRect.bottom)textRect.bottom=r.bottom;}
textRect.width=(textRect.right?textRect.right:0)-(textRect.left?textRect.left:0);textRect.height=(textRect.bottom?textRect.bottom:0)-(textRect.top?textRect.top:0);return textRect;}
function GatherText(node,limit,str,dontFollowNextHighlight){var n=node;if(str==null)
str="";while(n&&n.nodeName==NODENAME_SPAN&&(n.SimpleHighlight&&n.SimpleHighlight.highlight==true)){var n2=n.firstChild;while(n2!=null){if(n2.nodeName==NODENAME_SPAN&&(n2.SimpleHighlight&&n2.SimpleHighlight.highlight==true))
str=GatherText(n2,limit,str,true);else if(n2 instanceof Text){str+=n2.nodeValue;if(limit&&str.length>limit){str=str.rtrim();return str.substr(0,Math.max(0,limit-3))+"...";}}
n2=n2.nextSibling;}
if(dontFollowNextHighlight==true)
break;n=n.nextHighlight;}
return str;}
function GetXPathRangeFromRange(range){var xpathRange={xpathStartContainer:null,xpathEndContainer:null,startOffset:null,endOffset:null,};xpathRange.xpathStartContainer=_getXPath(range.startContainer);xpathRange.xpathStartContainer=_xpathArrayToString(xpathRange.xpathStartContainer);if(range.collapsed==true)
xpathRange.xpathEndContainer=xpathRange.xpathStartContainer;else{xpathRange.xpathEndContainer=_getXPath(range.endContainer);;xpathRange.xpathEndContainer=_xpathArrayToString(xpathRange.xpathEndContainer);}
xpathRange.startOffset=range.startOffset;xpathRange.endOffset=range.endOffset;return xpathRange;}
function GetRangeFromXPathRange(xpathRange){try{var nodesStart=document.evaluate(xpathRange.xpathStartContainer,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);if(nodesStart.singleNodeValue==null)
return null;var nodesEnd;if(xpathRange.xpathStartContainer!=xpathRange.xpathEndContainer){nodesEnd=document.evaluate(xpathRange.xpathEndContainer,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);if(nodesEnd.singleNodeValue==null)
return null;}
else
nodesEnd=nodesStart;var range=document.createRange();range.setStart(nodesStart.singleNodeValue,xpathRange.startOffset);range.setEnd(nodesEnd.singleNodeValue,xpathRange.endOffset);return range;}catch(e){return null;}}
function _PrefHLToClassName(prefHL){for(var i=0;i<arrayPrefHLToClassName.length;i++){if(arrayPrefHLToClassName[i].prefHL==prefHL)
return arrayPrefHLToClassName[i].className;}
return null;}
function _ClassNameToPrefHL(className){for(var i=0;i<arrayPrefHLToClassName.length;i++){if(arrayPrefHLToClassName[i].className==className)
return arrayPrefHLToClassName[i].prefHL;}
return null;}
function GetFirstNodeFromId(id){for(var i=0;i<arrayFirstHighlightNodes.length;i++){if(arrayFirstHighlightNodes[i].id==id)
return arrayFirstHighlightNodes[i];}
return null;}
function RemoveFromFirstNodesArray(node){for(var i=0;i<arrayFirstHighlightNodes.length;i++){if(arrayFirstHighlightNodes[i]==node){arrayFirstHighlightNodes.splice(i,1);break;}}}
Main();