
var TOOLTIP_LOOKUP="Close [Double Click, Escape]\nNew Empty Lookup Session [Ctrl+Click, Middle Button]\nDuplicate Lookup Session [Ctrl+Shift+Click, Middle Button+Shift]";var TOOLTIP_PIN_UNPINNED="Pin to page";var TOOLTIP_PIN_PINNED="Unpin from page";var TOOLTIP_SELECTTEMPLATE="Launch Query [Enter, Alt+Selection]\nLaunch Query in New Lookup Session [Ctrl+Alt+Selection]\nOpen Tip [Shift+Alt+Selection]\n\nNB: If list is opened via a mouse click, modifiers must be pressed whilst you OPEN the list, not when you select the item. This doesn't apply to keyboard selections.";var TOOLTIP_LOCK_LOCKED="Unlock from position";var TOOLTIP_LOCK_UNLOCKED="Lock into Position";var TOOLTIP_MINIMIZE_MINIMIZED="Restore";var TOOLTIP_MINIMIZE_RESTORED="Minimize";var TOOLTIP_CLOSE="Close [Escape]";var TOOLTIP_DOCKLEFT="Dock Left [+Alt: Top]";var TOOLTIP_DOCKRIGHT="Dock Right [+Alt: Bottom]";var TOOLTIP_BUTTONQUERY="Launch Query [Click]\nLaunch Query in New Lookup Session [Ctrl+Click]\nOpen Tip [Shift+Click]";var DEFAULTTOP_LOOKUP=16;var DEFAULTWIDTH_LOOKUP=600;var DEFAULTHEIGHT_LOOKUP=400;var MINWIDTH_LOOKUP=128;var MINHEIGHT_LOOKUP=128;var DOCK_DIMENSIONDENOM_DELTA=0.5;var DIMENSIONDENOM_LOOKUP_MIN=2;var DIMENSIONDENOM_LOOKUP_MAX=5;var HITBOXWIDTH_LOOKUPPOPUP=16;var HITBOXHEIGHT_LOOKUPPOPUP=16;var HITOFFSET_LEFT_LOOKUPPOPUP=16;var HITOFFSET_TOP_LOOKUPPOPUP=16;var HITCHECK_LOOPCOUNT_LOOKUPPOPUP=32;var MARGINLEFT_HANDLE=-4;var MARGINTOP_HANDLE=-4;var OPACITY_LOOKUP_MOUSEOUT=1;var DEFAULTTEXT_INPUTQUERY="Enter your query here";var saveLookupPopupOnUnload=null;var arrLookupTemplates=null;var templateIdLookupLast=null;var mouseActivateLookupPopup=null;var useWordUnderCursor_LookupPopup;var placementLookupPopup={};var dirtyPlacementLookupPopup=false;var arrZIndexLookupPopups=[];function DoLookupPopup(e,query,opts){var result=CreateLookupPopupIfRequired(opts);if(result.divPopup==null)
return null;if(opts&&opts.divPopupCopyQuery!=null){var divTitlebar=opts.divPopupCopyQuery.divTitlebar;if(divTitlebar.inputQuery.lastQuery!=null){LookupQuery(result.divPopup,divTitlebar.inputQuery.lastQuery,divTitlebar.selectTemplate.lastTemplateId,opts);}}
else if(query!=null){LookupQuery(result.divPopup,query,null,opts);}
if(result.isNew==false){if(result.divPopup.style.position=="absolute"){if(e){SetPositionLookupPopup(result.divPopup,{clientX:e.clientX,clientY:e.clientY,foreground:true,origin_hit_check:true});}
else{SetPositionLookupPopup(result.divPopup,{centreX:true,centreY:true,foreground:true,origin_hit_check:true});}}}
else{if(typeof(placementLookupPopup.clientX)==="undefined"){SetPositionLookupPopup(result.divPopup,{centreX:e?null:true,clientX:e?e.clientX:null,clientY:e?e.clientY:DEFAULTTOP_LOOKUP,width:DEFAULTWIDTH_LOOKUP,height:DEFAULTHEIGHT_LOOKUP,origin_hit_check:true});}
else{SetPositionLookupPopup(result.divPopup,{clientX:e?e.clientX:placementLookupPopup.clientX,clientY:e?e.clientY:placementLookupPopup.clientY,width:placementLookupPopup.width,height:placementLookupPopup.height,locked:placementLookupPopup.locked,pinned:placementLookupPopup.pinned,origin_hit_check:true});}}
ShowLookupPopup(result.divPopup,true);if(result.isNew==true&&query==null)
result.divPopup.divTitlebar.inputQuery.focus();return result.divPopup;}
function CreateLookupPopupIfRequired(opts){if(opts==null||opts.createNew!=true){if(arrZIndexLookupPopups.length>=1)
return({divPopup:arrZIndexLookupPopups[arrZIndexLookupPopups.length-1],isNew:false});}
return({divPopup:CreateLookupPopup(null),isNew:true});}
function CreateLookupPopup(templateId){function PopulateSelectTemplate(select,templateIdSelect){var valueOptionDefault=valueOptionSelect=null;var arrOptionGroups=[];var arrIndexNumber=[1];function GetIndexNumberString(){var out="";for(var b in arrIndexNumber){if(b>0)
out+=".";out+=arrIndexNumber[b];}
return out;}
function IncrementIndexNumber(){if(arrIndexNumber.length>0)
arrIndexNumber[arrIndexNumber.length-1]++;}
if(templateIdSelect==null)
templateIdSelect=templateIdLookupLast;for(var x in arrLookupTemplates){if(arrLookupTemplates[x].groupStart==true){var optionGroup=document.createElement('optgroup');optionGroup.nameUndecorated=GetIndexNumberString();if(arrLookupTemplates[x].name){try{optionGroup.nameUndecorated+=" "+arrLookupTemplates[x].name.decode_utf8();}
catch(ex){optionGroup.nameUndecorated+=" "+arrLookupTemplates[x].name;}}
optionGroup.indentation=arrOptionGroups.length;optionGroup.setAttribute("label",optionGroup.nameUndecorated);optionGroup.className=(arrOptionGroups.length==0?CSS2.CLASS_LOOKUP_TEMPLATE_SELECT_FIRSTLEVELGROUP:CSS2.CLASS_LOOKUP_TEMPLATE_SELECT_NOTFIRSTLEVELGROUP);if(arrOptionGroups.length>0)
arrOptionGroups[arrOptionGroups.length-1].appendChild(optionGroup);else
select.appendChild(optionGroup);arrOptionGroups.push(optionGroup);arrIndexNumber.push(1);}
else if(arrLookupTemplates[x].groupEnd==true){arrOptionGroups.pop();arrIndexNumber.pop();IncrementIndexNumber();}
else{if(arrLookupTemplates[x].enabled!=true)
continue;var nameUndecorated=GetIndexNumberString();if(arrLookupTemplates[x].name){try{nameUndecorated+=" "+arrLookupTemplates[x].name.decode_utf8();}
catch(ex){nameUndecorated+=" "+arrLookupTemplates[x].name;}}
IncrementIndexNumber();if(arrLookupTemplates[x].id==null)
arrLookupTemplates[x].id=RandomString(32);var option=new Option(nameUndecorated,arrLookupTemplates[x].id);option.className=CSS2.CLASS_LOOKUP_TEMPLATE_SELECT_NOTFIRSTLEVELGROUP;option.nameUndecorated=nameUndecorated;option.indentation=Math.max(0,arrOptionGroups.length-1);option.urlTemplate=arrLookupTemplates[x].urlTemplate;option.hash=arrLookupTemplates[x].hash;option.scroll=arrLookupTemplates[x].scroll;option.description=arrLookupTemplates[x].description;option.framebuster=arrLookupTemplates[x].framebuster;if(arrOptionGroups.length>0)
arrOptionGroups[arrOptionGroups.length-1].appendChild(option);else
select.options.add(option);if(arrLookupTemplates[x].default==true)
valueOptionDefault=option.value;if(templateIdSelect==arrLookupTemplates[x].id)
valueOptionSelect=option.value;}}
select.value=(valueOptionSelect?valueOptionSelect:valueOptionDefault);}
function IndentSelectTemplate(elemParent,showIndent){var elem=elemParent.firstChild;while(elem){if(elem.nodeType==Node.ELEMENT_NODE){if(elem.nodeName=="OPTION"||elem.nodeName=="OPTGROUP"){if(elem.indentation>0){var innerText=elem.nameUndecorated;if(showIndent==true){for(var t=0;t<elem.indentation;t++)
innerText="\u00a0\u00a0\u00a0"+innerText;}
if(elem.nodeName=="OPTGROUP"){elem.setAttribute("label",innerText);}
else
elem.innerText=innerText;}
if(elem.nodeName=="OPTGROUP"){IndentSelectTemplate(elem,showIndent);}}}
elem=elem.nextSibling;}}
var divPopup=document.createElement('div');divPopup.className=CSS2.CLASS_LOOKUP;divPopup.refCount=0;divPopup.style.setProperty("visibility","hidden","important");divPopup.style.setProperty("left",'0px',"important");divPopup.style.setProperty("top",'0px',"important");divPopup.style.setProperty("position","fixed","important");divPopup.style.setProperty("min-width",MINWIDTH_LOOKUP+'px',"important");divPopup.heightRestore=MINHEIGHT_LOOKUP;var divTitlebar=divPopup.divTitlebar=document.createElement('div');divTitlebar.className=CSS2.CLASS_LOOKUP_TITLEBAR_ROW;divTitlebar.divPopup=divPopup;var divTBCellLeft=divTitlebar.divTBCellLeft=document.createElement('div');divTBCellLeft.className=CSS2.CLASS_LOOKUP_TITLEBAR_CELL+" "+CSS2.CLASS_LOOKUP_TITLEBAR_CELL_LEFT;divTitlebar.appendChild(divTBCellLeft);var aLogo=divTitlebar.aLogo=document.createElement('a');aLogo.href="#";aLogo.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aLogo.title=TOOLTIP_LOOKUP;aLogo.img=document.createElement('img');aLogo.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aLogo.img.style.setProperty("width","16px","important");aLogo.img.style.setProperty("height","16px","important");aLogo.img.src=chrome.extension.getURL('img/book-open-text.png');aLogo.appendChild(aLogo.img);aLogo.divPopup=divPopup;aLogo.addEventListener("dblclick",function(e){e.preventDefault();RemoveLookupPopup(e.currentTarget.divPopup);},true);aLogo.addEventListener("click",function(e){e.preventDefault();if(e.button==1||(e.button==0&&e.ctrlKey==true))
DoLookupPopup(e,null,{createNew:true,divPopupCopyQuery:e.shiftKey?e.currentTarget.divPopup:null});},true);divTBCellLeft.appendChild(aLogo);var aPin=divTitlebar.aPin=document.createElement('a');aPin.href="#";aPin.pinned=false;aPin.divPopup=divPopup;aPin.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aPin.style.setProperty("margin-right","3px","important");aPin.img=document.createElement('img');aPin.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aPin.appendChild(aPin.img);aPin.addEventListener("click",function(e){e.preventDefault();e.currentTarget.pinned=(e.currentTarget.pinned==true?false:true);SavePlacementLookupPopup(e.currentTarget.divPopup);UpdateStatusInIcon(e.currentTarget.divPopup,{pin:true});},true);UpdateStatusInIcon(divPopup,{pin:true});divTBCellLeft.appendChild(aPin);var selectTemplate=divTitlebar.selectTemplate=document.createElement('select');selectTemplate.divPopup=divPopup;selectTemplate.className=CSS2.CLASS_LOOKUP_TEMPLATE_SELECT;selectTemplate.title=TOOLTIP_SELECTTEMPLATE;function OnChangeSelectTemplate(e,dont_lookup){var doQueryButton=false;if(e.type=="keyup"){if(e.keyCode==13){doQueryButton=true;}
else if(e.currentTarget.lastSelectedIndex==e.currentTarget.selectedIndex)
return;}
e.currentTarget.lastSelectedIndex=e.currentTarget.selectedIndex;templateIdLookupLast=e.currentTarget.value;if(e.type=="change"&&e.currentTarget.lastKeys){e.ctrlKey=e.currentTarget.lastKeys.ctrlKey;e.shiftKey=e.currentTarget.lastKeys.shiftKey;e.altKey=e.currentTarget.lastKeys.altKey;e.currentTarget.lastKeys=null;}
if(dont_lookup!=true&&(e.altKey==true||doQueryButton==true)){var divPopup=e.currentTarget.divPopup;if(divPopup.divTitlebar.inputQuery.classList.contains(CSS2.CLASS_LOOKUP_HINT)==false&&divPopup.divTitlebar.inputQuery.value.length>0){OnClickButtonQuery(e);}}}
selectTemplate.addEventListener("change",OnChangeSelectTemplate);selectTemplate.addEventListener("keyup",OnChangeSelectTemplate);selectTemplate.addEventListener("click",function(e){e.currentTarget.lastKeys={ctrlKey:e.ctrlKey,shiftKey:e.shiftKey,altKey:e.altKey,};},true);PopulateSelectTemplate(selectTemplate,templateId);if(selectTemplate.selectedIndex!=-1)
OnChangeSelectTemplate({currentTarget:selectTemplate},true);divTBCellLeft.appendChild(selectTemplate);var inputQuery=divTitlebar.inputQuery=document.createElement('input');inputQuery.className=CSS2.CLASS_LOOKUP_QUERY_INPUT;inputQuery.style.setProperty("margin-right","1px","important");inputQuery.type="text";inputQuery.divPopup=divPopup;inputQuery.addEventListener("focus",function(e){if(e.currentTarget.classList.contains(CSS2.CLASS_LOOKUP_HINT)==true){e.currentTarget.className=CSS2.CLASS_LOOKUP_QUERY_INPUT;e.currentTarget.value="";}},false);inputQuery.addEventListener("blur",function(e){if(e.currentTarget.value==""){e.currentTarget.value=DEFAULTTEXT_INPUTQUERY;e.currentTarget.className=CSS2.CLASS_LOOKUP_QUERY_INPUT+" "+CSS2.CLASS_LOOKUP_HINT;}},false);inputQuery.addEventListener("keydown",function(e){if(e.keyCode==27)
RemoveAllLookupPopups({keepPinned:true});else if(e.keyCode==13)
OnClickButtonQuery(e);});divTBCellLeft.appendChild(inputQuery);var aQuery=divTitlebar.aQuery=document.createElement('a');aQuery.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aQuery.href="#";aQuery.title=TOOLTIP_BUTTONQUERY;aQuery.divPopup=divPopup;aQuery.img=document.createElement('img');aQuery.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aQuery.img.src=chrome.extension.getURL('img/navigation-green.png');aQuery.appendChild(aQuery.img);aQuery.addEventListener("click",OnClickButtonQuery,true);divTBCellLeft.appendChild(aQuery);var divTBCellRight=divTitlebar.divTBCellRight=document.createElement('div');divTBCellRight.className=CSS2.CLASS_LOOKUP_TITLEBAR_CELL+" "+CSS2.CLASS_LOOKUP_TITLEBAR_CELL_RIGHT;divTitlebar.appendChild(divTBCellRight);var imgWaiting=divTitlebar.imgWaiting=document.createElement('img');imgWaiting.className=CSS2.CLASS_LOOKUP_WAITING;imgWaiting.src=chrome.extension.getURL('img/ajax-loader.gif');imgWaiting.style.setProperty("display","none","important");divTBCellRight.appendChild(imgWaiting);var aLock=divTitlebar.aLock=document.createElement('a');aLock.href="#";aLock.divPopup=divPopup;aLock.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aLock.img=document.createElement('img');aLock.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aLock.appendChild(aLock.img);aLock.addEventListener("click",function(e){e.preventDefault();if(e.currentTarget.divPopup.style.position=="absolute"){e.currentTarget.divPopup.style.setProperty("left",parseFloat(e.currentTarget.divPopup.style.left)-window.pageXOffset+'px',"important");e.currentTarget.divPopup.style.setProperty("top",parseFloat(e.currentTarget.divPopup.style.top)-window.pageYOffset+'px',"important");}
else{e.currentTarget.divPopup.style.setProperty("left",parseFloat(e.currentTarget.divPopup.style.left)+window.pageXOffset+'px',"important");e.currentTarget.divPopup.style.setProperty("top",parseFloat(e.currentTarget.divPopup.style.top)+window.pageYOffset+'px',"important");}
e.currentTarget.divPopup.style.setProperty("position",e.currentTarget.divPopup.style.position=="absolute"?"fixed":"absolute","important");SavePlacementLookupPopup(e.currentTarget.divPopup);UpdateStatusInIcon(e.currentTarget.divPopup,{lock:true});},true);UpdateStatusInIcon(divPopup,{lock:true});divTBCellRight.appendChild(aLock);var spanDockButtonContainer=divTitlebar.spanDockButtonContainer=document.createElement('span');spanDockButtonContainer.className=CSS2.CLASS_LOOKUP_BUTTONCONTAINER;var arr=[{imgSrc:"img/application-dock-180.png",dockSide:"left",dockSideAlt:"top",marginLeft:"2px",title:TOOLTIP_DOCKLEFT},{imgSrc:"img/application-dock.png",dockSide:"right",dockSideAlt:"bottom",title:TOOLTIP_DOCKRIGHT}];for(var z in arr){var aDock=document.createElement('a');aDock.img=document.createElement('img');aDock.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aDock.img.src=chrome.extension.getURL(arr[z].imgSrc);aDock.appendChild(aDock.img);aDock.href="#";aDock.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aDock.title=arr[z].title;if(arr[z].marginLeft)
aDock.style.setProperty("margin-left",arr[z].marginLeft,"important");aDock.divPopup=divPopup;aDock.dockSide=arr[z].dockSide;aDock.dockSideAlt=arr[z].dockSideAlt;aDock.spanDockButtonContainer=spanDockButtonContainer;aDock.addEventListener("click",function(e){e.preventDefault();var divPopup=e.currentTarget.divPopup;var spanDockButtonContainer=e.currentTarget.spanDockButtonContainer;if(divPopup.dockSide==null){spanDockButtonContainer.dimensionDenominator=DIMENSIONDENOM_LOOKUP_MIN;SetPositionLookupPopup(divPopup,{dock:true,dockSide:e.altKey==true?e.currentTarget.dockSideAlt:e.currentTarget.dockSide,dockDimensionDenominator:spanDockButtonContainer.dimensionDenominator});}
else{var dock=true;if(divPopup.dockSide==e.currentTarget.dockSide||divPopup.dockSide==e.currentTarget.dockSideAlt){if(spanDockButtonContainer.dimensionDenominator==DIMENSIONDENOM_LOOKUP_MAX)
dock=null;else{spanDockButtonContainer.dimensionDenominator=Math.min(DIMENSIONDENOM_LOOKUP_MAX,e.currentTarget.parentElement.dimensionDenominator+DOCK_DIMENSIONDENOM_DELTA);}}
else{spanDockButtonContainer.dimensionDenominator-=DOCK_DIMENSIONDENOM_DELTA;if(spanDockButtonContainer.dimensionDenominator<DIMENSIONDENOM_LOOKUP_MIN)
dock=false;}
if(dock!=null){SetPositionLookupPopup(divPopup,{dock:dock,dockSide:divPopup.dockSide,dockDimensionDenominator:spanDockButtonContainer.dimensionDenominator,});}
var aDocks=spanDockButtonContainer.getElementsByClassName(CSS2.CLASS_LOOKUP_ANCHORBUTTON);for(var p=0;p<aDocks.length;p++){aDocks[p].disabled=((divPopup.dockSide==aDocks[p].dockSide||divPopup.dockSide==aDocks[p].dockSideAlt)&&spanDockButtonContainer.dimensionDenominator==DIMENSIONDENOM_LOOKUP_MAX)?true:false;aDocks[p].style.setProperty("opacity",aDocks[p].disabled==true?OPACITY_BUTTON_DISABLED:OPACITY_BUTTON_ENABLED,"important");}}},true);spanDockButtonContainer.appendChild(aDock);}
divTBCellRight.appendChild(spanDockButtonContainer);var aMinimize=divTitlebar.aMinimize=document.createElement('a');aMinimize.href="#";aMinimize.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aMinimize.divPopup=divPopup;aMinimize.minimized=true;aMinimize.img=document.createElement('img');aMinimize.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aMinimize.appendChild(aMinimize.img);aMinimize.addEventListener("click",function(e){e.preventDefault();MinimizeLookupPopup(e.currentTarget.divPopup,e.currentTarget.minimized==true?false:true);},true);divTBCellRight.appendChild(aMinimize);var aClose=divTitlebar.aClose=document.createElement('a');aClose.href="#";aClose.className=CSS2.CLASS_LOOKUP_ANCHORBUTTON;aClose.title=TOOLTIP_CLOSE;aClose.divPopup=divPopup;aClose.img=document.createElement('img');aClose.img.className=CSS2.CLASS_LOOKUP_BUTTONIMAGE;aClose.img.src=chrome.extension.getURL('img/cross.png');aClose.appendChild(aClose.img);aClose.addEventListener("click",function(e){e.preventDefault();RemoveLookupPopup(e.currentTarget.divPopup);},true);divTBCellRight.appendChild(aClose);divPopup.appendChild(divTitlebar);var divRow=document.createElement('div');divRow.className=CSS2.CLASS_LOOKUP_IFRAME_ROW;var divCell=document.createElement('td');divCell.className=CSS2.CLASS_LOOKUP_IFRAME_CELL;divCell.colSpan=2;divPopup.iframe=document.createElement('iframe');divPopup.iframe.name=RandomString(64);divPopup.iframe.className=CSS2.CLASS_LOOKUP_IFRAME+" "+CSS2.CLASS_LOOKUP_IFRAME_EMPTY;divPopup.iframe.style.setProperty("display","none","important");divPopup.iframe.style.setProperty("opacity",OPACITY_LOOKUP_MOUSEOUT,"important");divPopup.iframe.frameBorder=0;divPopup.iframe.addEventListener("load",function(e){divPopup.divTitlebar.imgWaiting.style.setProperty("display","none","important");divPopup.iframe.hasLoadedEventFired=true;});divCell.appendChild(divPopup.iframe);divRow.appendChild(divCell);divPopup.appendChild(divRow);var divHandle=divPopup.divHandle=document.createElement('div');divHandle.className=CSS2.CLASS_LOOKUP_HANDLE;divHandle.divPopup=divPopup;document.body.appendChild(divPopup);MakeResizeable(divPopup,divHandle);divPopup.appendChild(divHandle);MakeMoveable(divPopup,divTitlebar);MinimizeLookupPopup(divPopup,true);function OnMouseOver(e){e.currentTarget.iframe.style.setProperty("opacity",1,"important");}
function OnMouseOut(e){e.currentTarget.iframe.style.setProperty("opacity",OPACITY_LOOKUP_MOUSEOUT,"important");}
divPopup.addEventListener('mouseover',OnMouseOver,false);divPopup.addEventListener('mouseout',OnMouseOut,false);arrZIndexLookupPopups.push(divPopup);SetPositionLookupPopup(divPopup,{foreground:true});return divPopup;}
function OnClickButtonQuery(e){var inputQuery=e.currentTarget.divPopup.divTitlebar.inputQuery;e.returnValue=false;if(e.shiftKey==true){DoTipPopup({text:inputQuery.value,boundingClientRect:inputQuery.getBoundingClientRect(),allowMultiple:false},null);}
else{if(e.ctrlKey==true)
DoLookupPopup(null,inputQuery.value,{createNew:true});else
LookupQuery(e.currentTarget.divPopup,null,null,{});}}
function RemoveAllLookupPopups(opt){var divPopups=document.body.getElementsByClassName(CSS2.CLASS_LOOKUP);for(var x=0;x<divPopups.length;x++){if(opt){if(opt.keepPinned==true&&divPopups[x].divTitlebar.aPin.pinned==true)
continue;}
RemoveLookupPopup(divPopups[x]);x--;}}
function RemoveLookupPopup(divPopup){SavePlacementLookupPopup(divPopup);var i=arrZIndexLookupPopups.indexOf(divPopup);if(i!=-1){arrZIndexLookupPopups.splice(i,1);RebaseZIndexLookupPopups();}
document.body.removeChild(divPopup);}
function RebaseZIndexLookupPopups(){for(var x=arrZIndexLookupPopups.length-1;x>=0;x--){arrZIndexLookupPopups[x].style.setProperty("z-index",BASEZINDEX_LOOKUPPOPUP+x,"important");var is_foremost=(x==(arrZIndexLookupPopups.length-1));var is_docked=(arrZIndexLookupPopups[x].dockSide==null?false:true);arrZIndexLookupPopups[x].className=CSS2.CLASS_LOOKUP;if(is_foremost)
arrZIndexLookupPopups[x].classList.add(is_docked==true?CSS2.CLASS_LOOKUP_DOCKED:CSS2.CLASS_LOOKUP_FOREMOST);arrZIndexLookupPopups[x].divTitlebar.className=CSS2.CLASS_LOOKUP_TITLEBAR_ROW;if(is_foremost)
arrZIndexLookupPopups[x].divTitlebar.classList.add(is_docked==true?CSS2.CLASS_LOOKUP_TITLEBAR_ROW_DOCKED:CSS2.CLASS_LOOKUP_TITLEBAR_ROW_FOREMOST);}}
function UpdateStatusInIcon(divPopup,opts){if(opts&&opts.lock){divPopup.divTitlebar.aLock.img.src=chrome.extension.getURL('img/'+(divPopup.style.position=="fixed"?'locked':'unlocked')+'.png');divPopup.divTitlebar.aLock.title=divPopup.style.position=="fixed"?TOOLTIP_LOCK_LOCKED:TOOLTIP_LOCK_UNLOCKED;var boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px";if(divPopup.style.position=="fixed"){var horizonal=(divPopup.dockSide=="right"?-5:5);var vertical=(divPopup.dockSide=="bottom"?-5:5);boxShadow+=", rgba(0,0,0,0.3) "+horizonal+"px "+vertical+"px 10px";}
divPopup.style.setProperty("-webkit-box-shadow",boxShadow,"important");}
if(opts&&opts.pin){divPopup.divTitlebar.aPin.img.src=chrome.extension.getURL('img/pin'+(divPopup.divTitlebar.aPin.pinned==true?'In':'Out')+'.png');divPopup.divTitlebar.aPin.title=divPopup.divTitlebar.aPin.pinned==true?TOOLTIP_PIN_PINNED:TOOLTIP_PIN_UNPINNED;}}
function ShowLookupPopup(divPopup,show){divPopup.style.setProperty("visibility",show?"visible":"hidden","important");}
function SetPositionLookupPopup(divPopup,metrics){if(metrics.dock!=null){if(metrics.dock==true){if(divPopup.dockSide==null){SavePlacementLookupPopup(divPopup);divPopup.placementRestoreDock=_clone(placementLookupPopup);divPopup.placementRestoreDock.scrollWidthTitlebar=divPopup.divTitlebar.scrollWidth;divPopup.placementRestoreDock.scrollHeightTitlebar=divPopup.divTitlebar.scrollHeight;}
metrics.locked=true;metrics.pinned=true;var dim=100/(metrics.dockDimensionDenominator?metrics.dockDimensionDenominator:DIMENSIONDENOM_LOOKUP_MIN);if(metrics.dockSide=="left"||metrics.dockSide=="right"){metrics.width=dim+"%";metrics.height="100%";metrics.clientX=(metrics.dockSide=="right"?(100-dim)+"%":0);metrics.clientY=0;}
else if(metrics.dockSide=="top"||metrics.dockSide=="bottom"){metrics.width="100%";metrics.height=dim+"%";metrics.clientX=0;metrics.clientY=(metrics.dockSide=="bottom"?(100-dim)+"%":0);}
divPopup.dockSide=metrics.dockSide;}
else{metrics.locked=divPopup.placementRestoreDock.locked;metrics.pinned=divPopup.placementRestoreDock.pinned;if(metrics.undock_dont_restore_origin!=true){metrics.clientX=divPopup.placementRestoreDock.clientX;metrics.clientY=divPopup.placementRestoreDock.clientY;}
else if(metrics.undock_titlebar_centre!=null){metrics.clientX=metrics.undock_titlebar_centre.clientX-((metrics.undock_dont_restore_dimensions==true?divPopup.divTitlebar.scrollWidth:divPopup.placementRestoreDock.scrollWidthTitlebar)/2);metrics.clientY=metrics.undock_titlebar_centre.clientY-((metrics.undock_dont_restore_dimensions==true?divPopup.divTitlebar.scrollHeight:divPopup.placementRestoreDock.scrollHeightTitlebar)/2);}
if(metrics.undock_dont_restore_dimensions!=true){metrics.width=divPopup.placementRestoreDock.width;metrics.height=divPopup.placementRestoreDock.height;}
divPopup.dockSide=null;}
RebaseZIndexLookupPopups();}
if(metrics.locked!=null){divPopup.style.setProperty("position",metrics.locked==true?"fixed":"absolute","important");UpdateStatusInIcon(divPopup,{lock:true});}
if(metrics.pinned!=null){divPopup.divTitlebar.aPin.pinned=metrics.pinned;UpdateStatusInIcon(divPopup,{pin:true});}
if(metrics.foreground==true){if(arrZIndexLookupPopups.length>=1){if(arrZIndexLookupPopups.length>=2){var i=arrZIndexLookupPopups.indexOf(divPopup);if(i!=-1){var temp=arrZIndexLookupPopups[arrZIndexLookupPopups.length-1];arrZIndexLookupPopups[arrZIndexLookupPopups.length-1]=divPopup;arrZIndexLookupPopups[i]=temp;}}
RebaseZIndexLookupPopups();}}
if(metrics.width!=null){if(typeof(metrics.width)=="number"){if(divPopup.style.position=="fixed")
metrics.width=Math.min(metrics.width,Math.max(0,document.documentElement.clientWidth-GetScrollBarWidth()));divPopup.style.setProperty("width",Math.max(MINWIDTH_LOOKUP,metrics.width)+'px',"important");}
else
divPopup.style.setProperty("width",metrics.width,"important");}
if(metrics.height!=null){if(divPopup.divTitlebar.aMinimize.minimized==false){if(typeof(metrics.height)=="number"){if(divPopup.style.position=="fixed")
metrics.height=Math.min(metrics.height,Math.max(0,document.documentElement.clientHeight));divPopup.style.setProperty("height",Math.max(MINHEIGHT_LOOKUP,metrics.height)+'px',"important");}
else
divPopup.style.setProperty("height",metrics.height,"important");}else{divPopup.style.setProperty("height",divPopup.divTitlebar.scrollHeight+'px',"important");}
divPopup.heightRestore=metrics.height;if(typeof(metrics.height)=="number")
divPopup.heightRestore=Math.max(MINHEIGHT_LOOKUP,metrics.height);}
var left=null;var top=null;if(metrics.centreX==true){left=(window.innerWidth/2)-(divPopup.offsetWidth/2);if(divPopup.style.postition=="absolute")
left+=window.pageXOffset;}
else if(metrics.clientX!=null){if(typeof(metrics.clientX)=="number")
left=metrics.clientX+(divPopup.style.position=="absolute"?window.pageXOffset:0);else
left=metrics.clientX;}
if(metrics.centreY==true){top=(window.innerHeight/2)-(divPopup.offsetHeight/2);if(divPopup.style.postition=="absolute")
top+=window.pageYOffset;}
else if(metrics.clientY!=null){if(typeof(metrics.clientY)=="number")
top=metrics.clientY+(divPopup.style.position=="absolute"?window.pageYOffset:0);else
top=metrics.clientY;}
if(left!=null||top!=null){if(metrics.origin_hit_check==true&&typeof(left)=="number"&&typeof(top)=="number"){for(var loop=0;loop<HITCHECK_LOOPCOUNT_LOOKUPPOPUP;loop++){var divPopups=document.body.getElementsByClassName(CSS2.CLASS_LOOKUP);for(var x=0;x<divPopups.length;x++){if(divPopups[x]==divPopup)
continue;var left_this=divPopups[x].offsetLeft;var top_this=divPopups[x].offsetTop;if(left>(left_this-HITBOXWIDTH_LOOKUPPOPUP)&&left<(left_this+HITBOXWIDTH_LOOKUPPOPUP)&&top>(top_this-HITBOXHEIGHT_LOOKUPPOPUP)&&top<(top_this+HITBOXWIDTH_LOOKUPPOPUP)){left+=HITOFFSET_LEFT_LOOKUPPOPUP;top+=HITOFFSET_TOP_LOOKUPPOPUP;break;}}
if(x==divPopups.length)
break;}}
if(typeof(left)=="number"){if(divPopup.style.position=="fixed")
left=Math.min(left,document.body.scrollWidth-divPopup.offsetWidth);left=Math.max(0,Math.min(left,document.documentElement.clientWidth))+"px";}
if(typeof(top)=="number"){if(divPopup.style.position=="fixed")
top=Math.min(top,window.innerHeight-divPopup.divTitlebar.scrollHeight);top=Math.max(0,Math.min(top,document.documentElement.scrollHeight))+"px";}
divPopup.style.setProperty("left",left,"important");divPopup.style.setProperty("top",top,"important");}}
function SavePlacementLookupPopup(divPopup){if(divPopup.dockSide!=null)
placementLookupPopup=_clone(divPopup.placementRestoreDock);else{placementLookupPopup.clientX=divPopup.offsetLeft;placementLookupPopup.clientY=divPopup.offsetTop;if(divPopup.style.position=="absolute"){if(typeof(placementLookupPopup.clientX)=="number")
placementLookupPopup.clientX-=window.pageXOffset;if(typeof(placementLookupPopup.clientY)=="number")
placementLookupPopup.clientY-=window.pageYOffset;}
placementLookupPopup.width=divPopup.style.width.GetStyleValueAsNumberIfInPixels();if(divPopup.divTitlebar.aMinimize.minimized==true&&divPopup.heightRestore!=null)
placementLookupPopup.height=divPopup.heightRestore;else
placementLookupPopup.height=divPopup.style.height.GetStyleValueAsNumberIfInPixels();placementLookupPopup.locked=(divPopup.style.position=="fixed"?true:false);placementLookupPopup.pinned=divPopup.divTitlebar.aPin.pinned;}
dirtyPlacementLookupPopup=true;}
function LookupQuery(divPopup,query,templateId,opts){var hash=null;var urlTemplate=null;var framebuster=null;if(query==null)
query=divPopup.divTitlebar.inputQuery.value;if(templateId==null)
templateId=divPopup.divTitlebar.selectTemplate.value;var options=divPopup.divTitlebar.selectTemplate.options;for(var i=0;i<options.length;i++){if(options[i].value==templateId){urlTemplate=options[i].urlTemplate;hash=options[i].hash;framebuster=options[i].framebuster;break;}}
if(urlTemplate==null)
return;divPopup.iframe.className=CSS2.CLASS_LOOKUP_IFRAME;divPopup.iframe.framebuster=framebuster;divPopup.iframe.hasLoadedEventFired=false;if(opts&&opts.treatQueryAsURL==true)
divPopup.iframe.src=query;else{query=query.replace(/^\s+|\s+$/g,'');var src=urlTemplate.replace("{searchTerms}",encodeURIComponent(query));src=src.replace("{locationHash}",location.hash);src=src.replace("{locationHost}",location.host);src=src.replace("{locationHostname}",location.hostname);src=src.replace("{locationHref}",location.href);src=src.replace("{locationPathname}",location.pathname);src=src.replace("{locationPort}",location.port);src=src.replace("{locationProtocol}",location.protocol);src=src.replace("{locationSearch}",location.search);divPopup.iframe.src=src;}
MinimizeLookupPopup(divPopup,false);divPopup.divTitlebar.imgWaiting.style.setProperty("display","","important");var e=document.createEvent("Event");e.initEvent("focus",false,true);divPopup.divTitlebar.inputQuery.dispatchEvent(e);divPopup.divTitlebar.inputQuery.value=query;divPopup.divTitlebar.selectTemplate.value=templateId;var src="http://getfavicon.appspot.com/"+divPopup.iframe.src;divPopup.divTitlebar.aLogo.img.src=src+(src.indexOf("?")==-1?"?":"&")+"defaulticon=bluepng";divPopup.divTitlebar.inputQuery.lastQuery=query;divPopup.divTitlebar.selectTemplate.lastTemplateId=templateId;}
function MinimizeLookupPopup(divPopup,minimize){if(minimize==true&&divPopup.style.height!=""){divPopup.heightRestore=divPopup.style.height.GetStyleValueAsNumberIfInPixels();}
divPopup.iframe.style.setProperty("display",(minimize==true?"none":""),"important");divPopup.divTitlebar.aMinimize.minimized=(minimize==true?true:false);divPopup.divTitlebar.aMinimize.img.src=chrome.extension.getURL('img/'+(minimize==true?'chevron-expand':'chevron')+'.png');divPopup.divTitlebar.aMinimize.title=minimize==true?TOOLTIP_MINIMIZE_MINIMIZED:TOOLTIP_MINIMIZE_RESTORED;SetPositionLookupPopup(divPopup,{height:divPopup.heightRestore});}
function MakeMoveable(divPopup,divTitlebar){var last_position={x:0,y:0};function moveListener(e){e.preventDefault();if(divPopup.dockSide!=null){SetPositionLookupPopup(divPopup,{dock:false,undock_dont_restore_origin:true,undock_titlebar_centre:{clientX:e.clientX,clientY:e.clientY}});return;}
var moved={x:(e.clientX-last_position.x),y:(e.clientY-last_position.y)};last_position={x:e.clientX,y:e.clientY};var new_top=Math.max(0,divPopup.offsetTop+moved.y);var new_left=Math.max(0,divPopup.offsetLeft+moved.x);if(divPopup.style.position=="fixed"){new_left=Math.min(document.body.scrollWidth-divPopup.offsetWidth,new_left);new_top=Math.min(window.innerHeight-divPopup.divTitlebar.scrollHeight,new_top);}
divPopup.style.setProperty("top",new_top+'px',"important");divPopup.style.setProperty("left",new_left+'px',"important");divPopup.iframe.style.setProperty("opacity",1,"important");SavePlacementLookupPopup(divPopup);}
divTitlebar.addEventListener('mousedown',function(e){if(e.button!=0)
return;SetPositionLookupPopup(e.currentTarget.divPopup,{foreground:true});if(e.toElement.classList.contains(CSS2.CLASS_LOOKUP_TITLEBAR_CELL)==true){e.preventDefault();last_position={x:e.clientX,y:e.clientY};layer=document.createElement('div');layer.style.position='fixed';layer.style.top='0px';layer.style.left='0px';layer.style.width='100%';layer.style.height='100%';layer.style.opacity=0;layer.style.zIndex=e.currentTarget.divPopup.style.zIndex+1;document.body.appendChild(layer);window.addEventListener('mousemove',moveListener);window.addEventListener('mouseup',function(e){window.removeEventListener('mousemove',moveListener);try{document.body.removeChild(layer);}catch(e){}});}});}
function MakeResizeable(divPopup,divHandle){var last_position={x:0,y:0};var ruler=document.createElement('div');ruler.style.visibility='none';ruler.style.width='100px';function moveListener(e){if(divPopup.dockSide!=null){SetPositionLookupPopup(divPopup,{dock:false,undock_dont_restore_origin:true,undock_dont_restore_dimensions:true});return;}
var moved={x:(e.clientX-last_position.x),y:(e.clientY-last_position.y)};var zoom_ratio=parseFloat(document.defaultView.getComputedStyle(ruler,null).getPropertyValue('width'))/100;;var height=divPopup.offsetHeight;var width=divPopup.offsetWidth;var new_height=(height+moved.y)/zoom_ratio;var new_width=(width+moved.x)/zoom_ratio;var setHeight=false;var setWidth=false;if(divPopup.divTitlebar.aMinimize.minimized==false){if(new_height>=MINHEIGHT_LOOKUP&&new_height<=divPopup.maxLookupHeight){last_position.y=e.clientY;divPopup.style.setProperty("height",new_height+'px',"important");divPopup.heightRestore=new_height;setHeight=true;}}
else{divPopup.style.setProperty("height",divPopup.divTitlebar.scrollHeight+'px',"important");setHeight=true;}
if(new_width>=MINWIDTH_LOOKUP&&new_width<=divPopup.maxLookupWidth){last_position.x=e.clientX;divPopup.style.setProperty("width",new_width+'px',"important");setWidth=true;}
divPopup.iframe.style.setProperty("opacity",1,"important");if(setWidth==true||setHeight==true){SavePlacementLookupPopup(divPopup);}
e.preventDefault();}
divHandle.addEventListener('mousedown',function(e){SetPositionLookupPopup(e.currentTarget.divPopup,{foreground:true});var divPopup=e.currentTarget.divPopup;var clientRect=divPopup.getBoundingClientRect();divPopup.maxLookupHeight=Math.max(0,document.documentElement.clientHeight-clientRect.top);divPopup.maxLookupWidth=Math.max(0,document.documentElement.clientWidth-clientRect.left);last_position={x:e.clientX,y:e.clientY};window.addEventListener('mousemove',moveListener);layer=document.createElement('div');document.body.appendChild(layer);layer.style.position='fixed';layer.style.top='0px';layer.style.left='0px';layer.style.width='100%';layer.style.height='100%';layer.style.opacity='0';layer.style.zIndex=e.currentTarget.divPopup.style.zIndex+1;document.body.appendChild(ruler);window.addEventListener('mouseup',function(e){window.removeEventListener('mousemove',moveListener);try{document.body.removeChild(ruler);}catch(e){}
try{document.body.removeChild(layer);}catch(e){}
e.preventDefault();});e.preventDefault();});}
function IsClickInsideFrame(e,divPopup){var position=document.defaultView.getComputedStyle(divPopup,null).getPropertyValue('position');if(position=='absolute'){var x=e.pageX;var y=e.pageY;}else if(position=='fixed'){var x=e.clientX;var y=e.clientY;}
var zoom_ratio=GetZoomRatio();x/=zoom_ratio;y/=zoom_ratio;if(x>=divPopup.offsetLeft&&x<=divPopup.offsetLeft+divPopup.offsetWidth&&y>=divPopup.offsetTop&&y<=divPopup.offsetTop+divPopup.offsetHeight){return true;}
if(divPopup.divHandle){if(x>=(divPopup.divHandle.offsetLeft+divPopup.offsetLeft)&&x<=(divPopup.divHandle.offsetLeft+divPopup.offsetLeft)+divPopup.divHandle.offsetWidth&&y>=(divPopup.divHandle.offsetTop+divPopup.offsetTop)&&y<=(divPopup.divHandle.offsetTop+divPopup.offsetTop)+divPopup.divHandle.offsetHeight){return true;}}
return false;}
function GetZoomRatio(){var zoom_ratio=document.defaultView.getComputedStyle(document.body,null).getPropertyValue('zoom');return parseFloat(zoom_ratio||'0');}
String.prototype.GetStyleValueAsNumberIfInPixels=function(){if(this.length==0)
return 0;if(this.length>2&&this.lastIndexOf("px")==(this.length-2))
return parseFloat(this);return this;}