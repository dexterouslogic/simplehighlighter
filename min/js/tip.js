
document.addEventListener('DOMContentLoaded',function(){OnLoad();});var tipId;var tipTemplateId;var classNameL2SectionMediaWiki;var msgOnClickAnchor;var msgOnSizeChange;var OPACITY_BUTTON_DISABLED=0.4;var OPACITY_BUTTON_ENABLED=1;function OnLoad(){var msgs=location.search.GetSearchVariables();tipId=msgs.tipId;msgOnClickAnchor=msgs.oca;msgOnSizeChange=msgs.osc;document.body.addEventListener("click",OnClick,true);chrome.extension.onRequest.addListener(function(request,sender,sendResponse){if(request.tipId!==undefined&&request.tipId==tipId){var response;if(request.msg==msgs.ass){var style=document.createElement('style');style.textContent=request.textContent;document.head.appendChild(style);}
else if(request.msg==msgs.sbi){response=OnSetInnerHTML(request);}else if(request.msg==msgs.ss)
response=OnShowSection(request.idSection,request.idScroll,request.classNameSection,request.show);else if(request.msg==msgs.gd)
response=OnGetDimensions();else if(request.msg==msgs.sl2stn)
response=OnSetLevel2SectionTagNames(request.tagName);else
return;if(response){response.callbackData=request.callbackData;sendResponse(response);}}});}
function OnSetInnerHTML(request){var reply={};tipTemplateId=request.tipTemplateId;classNameL2SectionMediaWiki=request.classNameL2SectionMediaWiki;if(request.innerHTML){if(request.textAlign)
document.body.style.setProperty("text-align",request.textAlign);else
document.body.style.removeProperty("text-align");var divBody=document.createElement('div');divBody.innerHTML=request.innerHTML;var arrTagNames=["script","style"];for(var q in arrTagNames){var elems=divBody.getElementsByTagName(arrTagNames[q]);for(var x=0;x<elems.length;x++)
elems[x].parentNode.removeChild(elems[x]);}
document.body.innerHTML=divBody.innerHTML;if(request.showSection){var showSectionReply=OnShowSection(request.showSection.idSection,request.showSection.idScroll,request.showSection.classNameSection,request.showSection.show);if(showSectionReply==null){showSectionReply=OnShowSection(request.showSection.idSectionFallback,request.showSection.idScroll,request.showSection.classNameSection,request.showSection.show);}
reply.showSectionReply=showSectionReply;}
if(request.level2SectionTagName)
OnSetLevel2SectionTagNames(request.level2SectionTagName);}
else{document.body.style.setProperty("text-align","center");document.body.innerHTML='<img src="img/ajax-loader2.gif"/>';}
return reply;}
function OnGetDimensions(){return({scrollWidth:document.body.scrollWidth,offsetWidth:document.body.offsetWidth,scrollHeight:document.body.scrollHeight,offsetHeight:document.body.offsetHeight,});}
function OnClick(e){if(e.target==null||e.target.nodeType!=Node.ELEMENT_NODE)
return;if(tipTemplateId==ID_TIPPOPUP_MSTRANSLATE_TTS||tipTemplateId==ID_TIPPOPUP_GOOGLETTS){if(e.target.nodeName=="BUTTON"||e.target.ancestorWithNodeName("BUTTON")!=null){var button=(e.target.nodeName=="BUTTON"?e.target:e.target.ancestorWithNodeName("BUTTON"));if(button.classList.contains(Bing.CLASS_BING_BUTTONAUDIOPLAYER)==true){var audio=button.getElementsByTagName("audio")[0];if(!audio.src){var src=button.getAttribute("srcaudio");var srcFallback=button.getAttribute("srcaudiofallback");var bug68135NoCache=button.getAttribute("bug68135NoCache");if(bug68135NoCache){function OnGetBase64(obj){if(obj.status==200&&obj.strBase64){var audio=document.getElementById(obj.cbData.idAudio);audio.src="data:"+obj.cbData.mimeType+";base64,"+obj.strBase64;window.setTimeout(function(_a){_a.play();},0,audio);}
else if(obj.status==404&&obj.cbData.urlFallback){var urlFallback=obj.cbData.urlFallback;obj.cbData.urlFallback=null;chrome.extension.sendRequest({msg:"getBase64StringFromBinaryURL",url:urlFallback,cbData:obj.cbData,},OnGetBase64);}}
chrome.extension.sendRequest({msg:"getBase64StringFromBinaryURL",url:src,cbData:{idAudio:audio.id,mimeType:"audio/"+(tipTemplateId==ID_TIPPOPUP_MSTRANSLATE_TTS?"wav":"mp3"),urlFallback:srcFallback,}},OnGetBase64);}
else
audio.src=src;if(audio.src)
audio.play();}
else{audio.currentTime=0;}}}}
else if(DoesTemplateIdHaveMediaWikiAPI(tipTemplateId)==true){if(e.target.nodeName=="DIV"){if(e.target.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NAVHEAD)==true){var div=e.target;while(div.nextSibling){div=div.nextSibling;if(div.nodeType==Node.ELEMENT_NODE){if(div.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NAVCONTENT)==true){var styleDisplay=document.defaultView.getComputedStyle(div,null).getPropertyValue('display');div.style.setProperty("display",styleDisplay=="none"?"block":"none","important");chrome.extension.sendRequest({msg:"relayRequest",msgRelay:msgOnSizeChange,tipId:tipId,scrollWidth:document.body.scrollWidth,offsetHeight:document.body.offsetHeight});break;}}}}}
else if(e.target.nodeName=="A"||e.target.ancestorWithNodeName("A")!=null){if(e.button!=0||e.ctrlKey==true||e.altKey==true||e.shiftKey==true)
return;e.preventDefault();var aTarget=(e.target.nodeName=="A"?e.target:e.target.ancestorWithNodeName("A"));var idL2SectionMediaWiki;if(aTarget.hash.length>0){var elemScrollTo=document.getElementById(aTarget.hash.substring(1));if(elemScrollTo){var elemL2Section=elemScrollTo.GetParentL2Section();if(elemL2Section)
idL2SectionMediaWiki=elemL2Section.id;}}
var attrLangParent;if(aTarget.classList.contains(MediaWiki.CLASS_MEDIAWIKI_EXTERNALINTERWIKI)==true){var elemParent=aTarget.parentNode;if(elemParent&&elemParent.nodeType==Node.ELEMENT_NODE)
attrLangParent=elemParent.getAttribute("lang");}
chrome.extension.sendRequest({msg:"relayRequest",msgRelay:msgOnClickAnchor,tipId:tipId,classListContainsMediaWikiNew:aTarget.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NEW),idL2SectionMediaWiki:idL2SectionMediaWiki,href:aTarget.href,target:aTarget.target,attrLangParent:attrLangParent,hash:aTarget.hash,host:aTarget.host,hostname:aTarget.hostname,pathname:aTarget.pathname,port:aTarget.port,protocol:aTarget.protocol,search:aTarget.search,});}}}
function OnShowSection(idSection,idScroll,classNameSections,show){if(idSection==null&&idScroll!=null){var elemScroll=document.getElementById(idScroll);if(elemScroll){var elemSection=elemScroll.GetParentL2Section();if(elemSection)
idSection=elemSection.id;}}
var elemSection=document.getElementById(idSection);if(elemSection==null)
return null;if(classNameSections!=null){var elems=document.getElementsByClassName(classNameSections);for(var q=0;q<elems.length;q++){elems[q].style.setProperty("display",elems[q].id==idSection?"":"none","important");}}
else{elemSection.style.setProperty("display",show==true?"":"none","important");}
if(idScroll==idSection||idScroll==null){document.body.scrollTop=0;}else{var elemScroll=document.getElementById(idScroll);if(elemScroll){document.body.scrollTop=elemScroll.offsetTop;elemScroll.classList.remove("pulseAnimation");elemScroll.classList.add("pulseAnimation");var elemsTarget=document.getElementsByClassName("pseudotarget");for(var z=0;z<elemsTarget.length;z++)
elemsTarget[z].classList.remove("pseudotarget");elemScroll.classList.add("pseudotarget");}}
chrome.extension.sendRequest({msg:"relayRequest",msgRelay:msgOnSizeChange,tipId:tipId,scrollWidth:document.body.scrollWidth,offsetHeight:document.body.offsetHeight,scrollHeight:document.body.scrollHeight,});return({idSection:idSection,idScroll:idScroll,scrollWidth:document.body.scrollWidth,offsetHeight:document.body.offsetHeight,scrollHeight:document.body.scrollHeight,});}
function OnSetLevel2SectionTagNames(tagName)
{var elems=document.getElementsByClassName(classNameL2SectionMediaWiki);for(var q=0;q<elems.length;q++){var elemNew=document.createElement(tagName);elemNew.id=elems[q].id;elemNew.className=elems[q].className;elemNew.style.cssText=elems[q].style.cssText;elemNew.innerHTML=elems[q].innerHTML;elems[q].parentNode.replaceChild(elemNew,elems[q]);}}
HTMLElement.prototype.GetParentL2Section=function(){var elem=this;while(elem){if(elem.nodeType==Node.ELEMENT_NODE&&elem.classList.contains(classNameL2SectionMediaWiki)==true)
break;elem=elem.parentNode;}
return elem;}