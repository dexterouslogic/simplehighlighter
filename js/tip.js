///////////////////////////////////////////////////////////////////////////////////
// tip.js

document.addEventListener('DOMContentLoaded', function () {
	OnLoad();
});

var tipId;
var tipTemplateId;
var classNameL2SectionMediaWiki;

var msgOnClickAnchor;
var msgOnSizeChange;

var OPACITY_BUTTON_DISABLED = 0.4;
var OPACITY_BUTTON_ENABLED = 1;

function OnLoad(){
	var msgs = location.search.GetSearchVariables();		// unique msgs added as searches

	// id
	tipId = msgs.tipId;
	// events
	msgOnClickAnchor = msgs.oca;
	msgOnSizeChange = msgs.osc;
	
	document.body.addEventListener("click", OnClick, true);
	
	// listen
//	console.log("JUST BEFORE LISTENER");	
	chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
//		console.log("my tipId:"+tipId + " ,Request tipId:" + request.tipId + ", message:" + request.msg);
		
		// only listen for messages to our tipId
		if(request.tipId !== undefined && request.tipId == tipId){
			var response;
			
			if(request.msg == msgs.ass){		// "appendStyleSheet"
				var style = document.createElement('style');
				style.textContent = request.textContent;
				document.head.appendChild(style);
			}
			else if(request.msg == msgs.sbi){	// "setBodyInnerHTML"
				response = OnSetInnerHTML(request);
			}else if(request.msg == msgs.ss)		// "showSection"
				response = OnShowSection(request.idSection, request.idScroll, request.classNameSection, request.show);
			else if(request.msg == msgs.gd)		// "GetDimensions"
				response = OnGetDimensions();
			else if(request.msg == msgs.sl2stn)	// setLevel2SectionTagNames
				response = OnSetLevel2SectionTagNames(request.tagName);
			else
				return;

			if(response){
				response.callbackData = request.callbackData;
				sendResponse(response);
			}
		}
	});
}

function OnSetInnerHTML(request){
	var reply = {};

	// 1 - store variables
	tipTemplateId = request.tipTemplateId;
	classNameL2SectionMediaWiki = request.classNameL2SectionMediaWiki;
	
	// inner html
	if(request.innerHTML){
		// 2 - css
		if(request.textAlign)
			document.body.style.setProperty("text-align", request.textAlign);
		else
			document.body.style.removeProperty("text-align");
	/*
		if(request.whiteSpace)
			document.body.style.setProperty("white-space", request.whiteSpace);
		else
			document.body.style.removeProperty("white-space");
		*/
	
		var divBody = document.createElement('div');
		divBody.innerHTML = request.innerHTML;

		var arrTagNames = ["script", "style"];
		for(var q in arrTagNames){
			var elems = divBody.getElementsByTagName(arrTagNames[q]);
			for(var x=0; x<elems.length; x++)
				elems[x].parentNode.removeChild(elems[x]);
		}

		
		document.body.innerHTML = divBody.innerHTML;
/*		document.body.innerHTML = "";
		
		// append contents of divBody to <body>, which i assume is faster?
		var elem = divBody.firstChild;
		while(elem){
			elemNext = elem.nextSibling;
			document.body.appendChild(elem);		// removes from divBody, hence elemNext
			elem = elemNext;
		}
*/
		// show section too, and merge result into our result. support fallback id if trying to restore a section that may not exist
		if(request.showSection){
			var showSectionReply = OnShowSection(request.showSection.idSection, request.showSection.idScroll, 
				request.showSection.classNameSection, request.showSection.show);
			if(showSectionReply == null){
				showSectionReply = OnShowSection(request.showSection.idSectionFallback, request.showSection.idScroll, 
					request.showSection.classNameSection, request.showSection.show);
			}
						
			reply.showSectionReply = showSectionReply;
		}
		
		if(request.level2SectionTagName)
			OnSetLevel2SectionTagNames(request.level2SectionTagName);
	}
	else{
		document.body.style.setProperty("text-align", "center");
		document.body.innerHTML = '<img src="img/ajax-loader2.gif"/>';
	}
		
/*	
	reply.scrollWidth = document.body.scrollWidth;
	reply.offsetWidth = document.body.offsetWidth;

	reply.scrollHeight = document.body.scrollHeight;
	reply.offsetHeight = document.body.offsetHeight;
	*/
	return reply;
}

function OnGetDimensions(){
	return({
		scrollWidth: document.body.scrollWidth,
		offsetWidth: document.body.offsetWidth,
		
		scrollHeight: document.body.scrollHeight,
		offsetHeight: document.body.offsetHeight,
	});
}

function OnClick(e){
	// capture certain clicks and turn them to rerequests for the popup
	if(e.target == null || e.target.nodeType != Node.ELEMENT_NODE)
		return;
	
	if(tipTemplateId == ID_TIPPOPUP_MSTRANSLATE_TTS || tipTemplateId == ID_TIPPOPUP_GOOGLETTS){
		if(e.target.nodeName == "BUTTON" || e.target.ancestorWithNodeName("BUTTON") != null){
			// get correct target
			var button = (e.target.nodeName == "BUTTON" ? e.target : e.target.ancestorWithNodeName("BUTTON"));
		
			if(button.classList.contains(Bing.CLASS_BING_BUTTONAUDIOPLAYER) == true){
				var audio = button.getElementsByTagName("audio")[0];
	/*			
				// prepare ended event handler
				audio.setAttribute("onended", '\
					event.currentTarget.parentNode.disabled=false;\
					event.currentTarget.parentNode.style.opacity = OPACITY_BUTTON_ENABLED;');
*/
				// beware of xss with xmlhttprequest
				if(!audio.src){
		/*			// only bother to disable if its not cached
					button.disabled = true;
					button.style.opacity = OPACITY_BUTTON_DISABLED;				
	*/				
					var src = button.getAttribute("srcaudio");
					var srcFallback = button.getAttribute("srcaudiofallback");
					var bug68135NoCache = button.getAttribute("bug68135NoCache");
				
					if(bug68135NoCache){
						function OnGetBase64(obj){
							// callback called when data arrives, not when funciton completes
							if(obj.status == 200 && obj.strBase64){
								// cbData is audio object normally
								var audio = document.getElementById(obj.cbData.idAudio);

								audio.src = "data:" + obj.cbData.mimeType + ";base64," + obj.strBase64;

//								audio.play();
								window.setTimeout(function(_a) {
									_a.play();
								}, 0, audio);

							}
							else if(obj.status == 404 && obj.cbData.urlFallback){
								// retry with new url - clear fallback to stop recursion
								var urlFallback = obj.cbData.urlFallback;
								obj.cbData.urlFallback = null;
								
								chrome.extension.sendRequest({msg:"getBase64StringFromBinaryURL", 
									url: urlFallback,
									cbData: obj.cbData,
								}, OnGetBase64);
							}
						}
					
						// cache as a datauri string
						chrome.extension.sendRequest({msg:"getBase64StringFromBinaryURL", 
							url: src,
							cbData: {
								idAudio: audio.id,
								mimeType: "audio/" + (tipTemplateId == ID_TIPPOPUP_MSTRANSLATE_TTS ? "wav" : "mp3"),
								urlFallback: srcFallback,
							}
						}, OnGetBase64);
/*						
						{
							// callback called when data arrives, not when funciton completes
							if(obj.status == 200 && obj.strBase64){
								// cbData is audio object normally
								var audio = document.getElementById(obj.cbData.idAudio);

								audio.src = "data:" + obj.cbData.mimeType + ";base64," + obj.strBase64;
								audio.play();
							}
							
							else if(obj.status == 404 && obj.cbData.urlFallback){
								chrome.extension.sendRequest({msg:"getBase64StringFromBinaryURL", 
									url: obj.cbData.urlFallback,
									cbData: {
										idAudio: audio.id,
										mimeType: "audio/" + (tipTemplateId == ID_TIPPOPUP_MSTRANSLATE_TTS ? "wav" : "mp3"),
										urlFallback: srcFallback,
									}
							
							
							}
						});*/
/*			
						GetBase64StringFromBinaryURL(src, function(status, cbData, strBase64){
							if(status == 200 && strBase64){
								// cbData is audio object
								cbData.src = "data:audio/wav;base64," + strBase64;
								cbData.play();
							}
						}, audio);*/
					}
					else
						audio.src = src;			// normal way
						
					if(audio.src)
						audio.play();
				}
				else{
					audio.currentTime = 0;
					
					// datauris seem to replay automatically (pause()?)// i think wavs replay automatically when currentTime is reset. google doesnt
//					if(tipTemplateId == ID_TIPPOPUP_GOOGLETTS)
//						audio.play();
				}
					
	/*				
					
										
				// see http://code.google.com/p/chromium/issues/detail?id=68135 for why this isnt cached
				if(BUG_68135_NOCACHE == true || !audio.src)
					audio.src = button.getAttribute("srcaudio");		// version that always works but doesnt cache				
				else
					audio.currentTime = 0;					

				if(audio.src)
					audio.play();
				
				button.disabled = true;
				button.style.opacity = OPACITY_BUTTON_DISABLED;*/
			}
		}
	}
	else if(DoesTemplateIdHaveMediaWikiAPI(tipTemplateId) == true){
		// mediawiki applicable
		if(e.target.nodeName == "DIV"){		// not srticlty needed
			// general mediawiki code for show/hide navcontents
			if(e.target.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NAVHEAD) == true){
				// find next sibling that is correct class
				var div = e.target;
				
				while(div.nextSibling){
					div = div.nextSibling;
					
					if(div.nodeType == Node.ELEMENT_NODE){
						if(div.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NAVCONTENT) == true){
							// toggle display state
							var styleDisplay = document.defaultView.getComputedStyle(div, null).getPropertyValue('display');
							div.style.setProperty("display", styleDisplay == "none" ? "block" : "none", "important");
							
							// send sizechange message (whether valid or not)
							chrome.extension.sendRequest({msg:"relayRequest", msgRelay: msgOnSizeChange,
								tipId: tipId,
								scrollWidth: document.body.scrollWidth, 
								offsetHeight: document.body.offsetHeight
							});
							break;
						}
					}
				}
			}
		}
		// eg: <a> containing <span> means e.target is the span (if that was clicked)
		else if(e.target.nodeName == "A" || e.target.ancestorWithNodeName("A") != null){
			// only prevent normal navigation if its a left click with no modifiers
			if(e.button != 0 || e.ctrlKey == true || e.altKey == true || e.shiftKey == true)
				return;
			
			e.preventDefault();
			
			// find correct target
			var aTarget = (e.target.nodeName == "A" ? e.target : e.target.ancestorWithNodeName("A"));
						
			// if the href/src was = "#blah" (index 0 is #), this is 1. ie: same server, same path
			var idL2SectionMediaWiki;//, idScrollToMediaWiki;
//			var attrUrlWasRebased = aTarget.attributes[MediaWiki.ATTRNAME_REBASED];
			
			// find the parent l2section by classname up the chain
			if(/*attrUrlWasRebased && attrUrlWasRebased.value == "hash" && */aTarget.hash.length > 0){
				//idScrollToMediaWiki = aTarget.hash.substring(1);		// id of anchor to scroll to
				var elemScrollTo = document.getElementById(aTarget.hash.substring(1));//idScrollToMediaWiki);

				if(elemScrollTo){
					var elemL2Section = elemScrollTo.GetParentL2Section();
					if(elemL2Section)
						idL2SectionMediaWiki = elemL2Section.id;			// id of div of section containing anchor to scroll to
				}
			}
			
			// if parent element has a lang attribute and its an interwiki link, pass it on (eg: wiktionary for branco: <b lang="pt"><a blah/></b>
			var attrLangParent;
			if(aTarget.classList.contains(MediaWiki.CLASS_MEDIAWIKI_EXTERNALINTERWIKI) == true){
				var elemParent = aTarget.parentNode;
				if(elemParent && elemParent.nodeType == Node.ELEMENT_NODE)
					attrLangParent = elemParent.getAttribute("lang");
			}
			
			// send request to tab to deal with it
			chrome.extension.sendRequest({msg:"relayRequest", msgRelay: msgOnClickAnchor,
				tipId: tipId,

				classListContainsMediaWikiNew: aTarget.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NEW),
				//arrClassList: aTarget.classList,		// stringifies to array
				//urlRebased: attrUrlWasRebased ? attrUrlWasRebased.value : null,
				idL2SectionMediaWiki: idL2SectionMediaWiki,
				//idScrollToMediaWiki: idScrollToMediaWiki,
				
				href: aTarget.href,
				target: aTarget.target,
				
				attrLangParent: attrLangParent,
			
				hash: aTarget.hash,
				host: aTarget.host,
				hostname: aTarget.hostname,
				pathname: aTarget.pathname,
				port: aTarget.port,
				protocol: aTarget.protocol,
				search: aTarget.search,
			});
		}
	}
}


function OnShowSection(idSection, idScroll, classNameSections, show){//, dont_notify_size_change){
	// if no idSection supplied but an idScroll is, find it
	if(idSection == null && idScroll != null){
		var elemScroll = document.getElementById(idScroll);
		if(elemScroll){
			var elemSection = elemScroll.GetParentL2Section();
			if(elemSection)
				idSection = elemSection.id;
		}
	}
	
	// if idSection doesnt exist, all sections will be hidden. so verify it
	var elemSection = document.getElementById(idSection);
	if(elemSection == null)
		return null;

	if(classNameSections != null){
		var elems = document.getElementsByClassName(classNameSections);
		for(var q=0; q<elems.length; q++){
			// show/hide individual sections
			elems[q].style.setProperty("display", elems[q].id == idSection ? "" : "none", "important");
		}
	}
	else{
		// section is alone and defined by id. show indicates whether to show/hide
		elemSection.style.setProperty("display", show == true ? "" : "none", "important");
	}
	
	// where to scroll
	if(idScroll == idSection || idScroll == null){
		// assume top implied
		document.body.scrollTop = 0;
	}else{
		// scroll body along to top of element
		var elemScroll = document.getElementById(idScroll);
		if(elemScroll){
			document.body.scrollTop = elemScroll.offsetTop;
			
			// element is usually a heading
			elemScroll.classList.remove("pulseAnimation");
			elemScroll.classList.add("pulseAnimation");
			
			// defined in css2
			// only 1 element can be target
			var elemsTarget = document.getElementsByClassName("pseudotarget");
			for(var z=0; z<elemsTarget.length; z++)
				elemsTarget[z].classList.remove("pseudotarget");
			
			elemScroll.classList.add("pseudotarget");
		}
	}
	

	// if called via SetBodyInnerHTML
//	if(dont_notify_size_change != true){
		chrome.extension.sendRequest({msg:"relayRequest", msgRelay: msgOnSizeChange,
			tipId: tipId,
			scrollWidth: document.body.scrollWidth, 
			offsetHeight: document.body.offsetHeight,
			scrollHeight: document.body.scrollHeight,
		});
//	}
	
	return ({
		idSection: idSection,
		idScroll: idScroll,
		
		scrollWidth: document.body.scrollWidth, 
		offsetHeight: document.body.offsetHeight,
		scrollHeight: document.body.scrollHeight,
	});
}

function OnSetLevel2SectionTagNames(tagName)
{
	// change the tagname of all sections by recreating element
	var elems = document.getElementsByClassName(classNameL2SectionMediaWiki);
	for(var q=0; q<elems.length; q++){
		// new element
		var elemNew = document.createElement(tagName);
		// copy attributes (TODO: programatically)
//		for(var r=0; r<elems[q].attributes.length; r++)
//			elemNew.attributes.setNamedItem(elems[q].attributes[r]);
		elemNew.id = elems[q].id;
		elemNew.className = elems[q].className;
		elemNew.style.cssText= elems[q].style.cssText;

	
		// copy innerhtml
		elemNew.innerHTML = elems[q].innerHTML;
		
		elems[q].parentNode.replaceChild(elemNew, elems[q]);
	}
}

HTMLElement.prototype.GetParentL2Section = function(){
	var elem = this;
	
	while(elem){
		if(elem.nodeType == Node.ELEMENT_NODE && elem.classList.contains(classNameL2SectionMediaWiki) == true)
			break;
		elem = elem.parentNode;
	}
	
	return elem;
}
