var MediaWiki = {
	ERROR_JSONPARSE: "The server returned an incorrectly formatted response",
	ERROR_UNKNOWN: "An unknown error has occurred",

	FORMAT_TIPPOPUP_MEDIAWIKI_REDIRECTED: "Redirected from <b><<FROM>></b>",
	
	WARNING_NOENTRY: "Unable to locate entry for <<TEXT>>",
	
	FORMAT_AUTOREDIRECTEDFROM: "Auto-redirected from <<TEXT>>",
	
	//CLASS_SECTIONL2: "sectionLevel2",
	// mediawiki.css official
	CLASS_MEDIAWIKI_NAVHEAD: "NavHead",
	CLASS_MEDIAWIKI_NAVCONTENT: "NavContent",
	CLASS_MEDIAWIKI_NEW: "new",
	CLASS_MEDIAWIKI_EXTERNALINTERWIKI: "extiw",
	
	CLASS_MEDIAWIKI_CATLINKS: "catlinks",

	CLASSNAMES_INFOBOX_FORBID: ["ambox", "tmbox", "imbox", "cmbox", "ombox", "mbox", "fmbox", "dmbox",
		"ambox-small", "tmbox-small", "imbox-small", "cmbox-small", "ombox-small", "mbox-small", "fmbox-small", "dmbox-small"],

	__DEBUG: false,
	
	Request: function(request/*tipObject, text, tab , msgSet, index, template*/){
	
		//text = "Red_Sector_Incorporated";
		//text = "glycerine";
		
		// http://en.wikipedia.org/wiki/Red_Sector_Inc?action=render
		// http://en.wikipedia.org/w/api.php?action=parse&page=Red_Sector_Incorporated&format=txtfm
		// http://en.wikipedia.org/w/api.php?action=parse&page=Red_Sector_Incorporated&format=json
		// http://en.wiktionary.org/w/api.php?action=query&titles=overflow&prop=revisions&rvprop=content&rvgeneratexml=&format=txt
		// http://en.wikipedia.org/w/api.php?action=parse&page=Red_Sector_Incorporated&format=txtfm&redirects

//		prop - Which pieces of information to get.
//		NOTE: Section tree is only generated if there are more than 4 sections, or if the __TOC__ keyword is present
//		Values (separate with '|'): text, langlinks, languageshtml, categories, categorieshtml, links, templates, images, externallinks, sections, revid, displaytitle, headitems, headhtml
//		Default: text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle
				
		var xhr = new XMLHttpRequest();
		var url = "http://" + request.template.options.editionLanguage + "." + request.template.options.domain + //"/" +
			request.template.options.pathPHP + "?" +	//".wiktionary.org/w/api.php?" +
			"action=parse&" +
			"redirects=true&" + 
			"prop=text|sections|displaytitle|revid|categorieshtml|externallinks|languageshtml" + "&" +
			"format=json&" +
			"page=" + encodeURIComponent(request.text);
		
//		xhr.open('POST', url, true);
//		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");             
		xhr.MediaWiki = this;
		xhr.open('GET', url, true);
				
		xhr.onreadystatechange = function (){
			if (xhr.readyState == 4){
				var errorHTML;
				
				try{
					// html error
					if (xhr.status != 200){
						errorHTML = (xhr.status == 0 ? MediaWiki.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);
						throw new Error();
					}

					errorHTML = MediaWiki.ERROR_JSONPARSE;
					res = JSON.parse(xhr.responseText);		// can JSON.parse throw exceptions?
					if(res == null)
						throw new Error();
				}catch(e){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: {errorHTML: errorHTML } });
					return;
				}
			
				var data = xhr.MediaWiki.Parse(res, request);// text, template, index/*, tipObject*/);
				if(data){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: data,} );
				}
			}
		};
		
		xhr.send(null);				
	},
	
	Parse: function(res, request/*       text, template, index*/){
		// no GetElementById on an element object, so fake it
		function GetElementByIdFromElement(elemSrc, id, tagName, elemBegin){
			var elems = elemSrc.getElementsByTagName(tagName ? tagName : "*");
			var hasBegun = false;
			
			for(var q=0; q<elems.length; q++){
				if(elemBegin && hasBegun == false){
					if(elems[q] == elemBegin)
						hasBegun = true;
					else
						continue;
				}
					
				if(elems[q].id == id)
					return elems[q];
			}
			
			return null;
		}
		
		function RebaseAnchors(htmlIn, hrefWikiPage, hrefBase, target){
			var div = document.createElement('div');
			div.innerHTML = htmlIn;

			var anchors = div.getElementsByTagName("A");
			for(var q=0; q<anchors.length; q++)
				RebaseElement(anchors[q], data.hrefWikiPage, hrefBase, target);
			
//			AppendClassAndIDSuffixes(anchors, request.index, request.template.sessionData.suffixClassNameMediaWiki);
			return div.innerHTML.length ? div.innerHTML : null;
		}

		function RebaseElement(elem, hrefWikiPage, hrefBase, target){
			var arrAttr = ["href", "src"];
		
			for(var r in arrAttr){			// loop attribute name
				var attr = elem.attributes[arrAttr[r]];
				if(attr != undefined && attr.value.length >= 1){
					// img tags seem to be //upload.wikimedia.org/whatever
					if(attr.value.length >= 2 && attr.value.substr(0,2) == "//"){
						// use protocol of base
						var arrBase = hrefBase.split("//");
						if(arrBase.length > 0)
							elem.setAttribute(arrAttr[r], arrBase[0] +  attr.value);
					}
					else if(attr.value[0] == '/'){
						elem.setAttribute(arrAttr[r], hrefBase + attr.value);
						//elemsAll[q].setAttribute(MediaWiki.ATTRNAME_REBASED, "slash");
					}
					else if(attr.value[0] == '#'){	// hashes just go to original page - too much hassle to point at correct local section
						elem.setAttribute(arrAttr[r], hrefWikiPage + attr.value);
//						elemsAll[q].setAttribute(MediaWiki.ATTRNAME_REBASED, "hash");
					}
					
					// force elemsAll to open in new tab (although we capture ones we can redirect to the tip
					if(arrAttr[r] == "href")
						elem.target = target;
				}
			}
		}

		function ConvertArrayHREFtoHTML(arrHREF, target){
			var htmlOut = arrHREF.length > 0 ? "" : null;
			
			for(var y in arrHREF){
				var anchor = document.createElement('a');
				anchor.innerText = anchor.href = arrHREF[y];	// raw link
				anchor.target = target;

				if(y > 0)
					htmlOut += "<br/>";
				htmlOut += anchor.outerHTML;
			}
			
			return htmlOut;
		}

		function GetElementsInnerHTMLByClassNames(elem, arrClassNames){
			var htmlOut = "";
		
			for(var x in arrClassNames){
				var elems = elem.getElementsByClassName(arrClassNames[x]/* + request.template.sessionData.suffixClassNameMediaWiki*/);
				for(var y=0; y<elems.length; y++){
//					if(htmlOut.length > 0)
//						htmlOut += ". ";
						
					htmlOut += "<span>" + elems[y].innerHTML + "</span>" + ". ";
				}
			}
		
			return htmlOut.length == 0 ? null : htmlOut;
		}		
		
/*
		function AppendClassAndIDSuffixes(elems, suffixIdWithoutUnderscore, suffixClassName){
			for(var q=0; q<elems.length; q++){
				if(elems[q].className != null && elems[q].className.length > 0){
					var array = elems[q].className.split(" ");
					
					elems[q].className = "";
					for(var r in array){
						if(r > 0)
							elems[q].className += " ";
						// suffix with index name (unique)
						elems[q].className += (array[r] + suffixClassName);
					}
				}
				
				if(elems[q].id != null && elems[q].id.length > 0)
					elems[q].id += ( "_" + suffixIdWithoutUnderscore);
			}
		}
	*/	

		var data = {};
	
		// always add as much info to return structure (data) asap, so error data has more information
		var ei = MediaWiki.GetEditionInfo(request.template.options.editionLanguage);
		data.srcEditionFlagIcon = ei.urlFlag;
		data.tooltipEditionFlag = ei.name ? (ei.name + " Edition") : null;

		//////////////////////////////////////////////////////
		// error?
		if(res.error){
			if(res.error.code && res.error.code == "missingtitle"){		
				// treat as article not found case
				// fake struct to trigger it
				res.parse = {
					revid: 0
				}
			}
			else{
				data.errorHTML = res.error.info;
				return data;
			}
		}
		if(res.parse === undefined){
			data.errorHTML = MediaWiki.ERROR_JSONPARSE;
			return data;
		}
				
		// article not found?
		if(res.parse.revid == 0){
			// if opensearch specified, do search for our item. if 1st list item has same
			// spelling (case independant) in the list, go there. else return NOENTRY warninig
			if(request.template.options.openSearchOnNoEntries == true){
				var xhr = new XMLHttpRequest();
				var url = "http://" + request.template.options.editionLanguage + "." + request.template.options.domain + //"/" +
					request.template.options.pathPHP + "?" +	//".wiktionary.org/w/api.php?" +
					"action=opensearch&" +
					"search=" + encodeURIComponent(request.text) + "&" +
					"namespace=0&" +
					"suggest=";
				
				xhr.open('GET', url, true);
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");             
				
				xhr.originalRequest = request;		// rerequest this with the new term & disable openSearchOnNoEntries to prevent infinite loop
				xhr.MediaWiki = this;
				xhr.originalData = data;
				
				xhr.onreadystatechange = function (){
					if (xhr.readyState == 4){
						// html error
						var errorHTML;
						var suggs;
						
						try{
							if (xhr.status != 200){
								errorHTML = (xhr.status == 0 ? MediaWiki.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);
								throw new Error();
							}
			
							errorHTML = MediaWiki.ERROR_JSONPARSE;
							suggs = JSON.parse(xhr.responseText);		// can JSON.parse throw exceptions?
							if(suggs == null)
								throw new Error();
						}catch(e){
							// cant return data object as this is a callback
							xhr.originalData.errorHTML = errorHTML;
							
							SendRequestWithTabIfPossible(xhr.originalRequest.tab, {
								msg: xhr.originalRequest.msgSet, 
								index: xhr.originalRequest.index, 
								templateId: xhr.originalRequest.template.id, 
								data: xhr.originalData,//{errorHTML: errorHTML }
								});
							return;
						}
						
						// parse suggs (["term", ["sugg-1"..."sugg-n"])
						// must be original term & array. array must not be null. length of array must be >= 1
						// first item must equal exactly request (ie: letter case fix) OR if just one result, choose it anyway
						// TODO: is the one item thing too much?
						var originalText = xhr.originalRequest.text.replace(/^\s*|\s*$/g,'');		// strip spaces
						if( suggs.length == 2 && suggs[1] != null && suggs[1].length >= 1 &&
							( suggs[1].length == 1 || (suggs[1][0].toLowerCase() == originalText.toLowerCase()) ) ){
							// re-request
							xhr.originalRequest.text = suggs[1][0];
							xhr.originalRequest.template.options.openSearchOnNoEntries = false;	// just in case of loop
							
							var format = MediaWiki.FORMAT_AUTOREDIRECTEDFROM.replace("<<TEXT>>", originalText);
							xhr.originalRequest.template.htmlAutoRedirects = format;
														
							xhr.MediaWiki.Request(xhr.originalRequest);
						}
						else{
							// cant return data object as this is a callback
							xhr.originalData.warningHTML = MediaWiki.WARNING_NOENTRY.replace("<<TEXT>>", request.text);
							
							SendRequestWithTabIfPossible(xhr.originalRequest.tab, {
								msg: xhr.originalRequest.msgSet, 
								index: xhr.originalRequest.index, 
								templateId: xhr.originalRequest.template.id, 
								data: xhr.originalData,//{warningHTML: format }
							});
						}
					}// end readystate 4
				};// end onreadystatechange

				xhr.send(null);								
				return null;	// no data
			}// end openSearchOnNoEntries
			else{
				data.warningHTML = MediaWiki.WARNING_NOENTRY.replace("<<TEXT>>", request.text);
				return data;
			}
		}
		else{
			if(res.parse.text == null || res.parse.text["*"] == null){
				data.errorHTML = MediaWiki.ERROR_JSONPARSE;
				return data;
			}
		}

		// cant get display title asap, because its filled with garbage if the page doesnt exist
		// get display title with link to original wiki page (never with hash, just link to original page)
		data.hrefWikiPage = "http://" + request.template.options.editionLanguage + "." + request.template.options.domain + //"/" + 
			request.template.options.pathWiki + res.parse.displaytitle;
		if(request.template.sessionData.search)	
			data.hrefWikiPage += request.template.sessionData.search;			// search always prepended with ?

		data.hashWikiPage = request.template.sessionData.hash;			// no #
		data.displaytitle = res.parse.displaytitle;
		
		// 
		var html = "";
		
		// create a DOM for source
		var divArticle = document.createElement('div');
		divArticle.innerHTML = res.parse.text["*"];
/*		// filter out script tags
		var elemsAll = divArticle.getElementsByTagName("script");
		for(var q=elemsAll.length-1; q>=0; q--)
			elemsAll[q].parentNode.removeChild(elemsAll[q]);
	*/
		////////////////////////////////////////////////////////////////////////////
		// rebase elements with these attributes
		var tagNames = ["A", "IMG"];
		for(var t in tagNames){
			var elems = divArticle.getElementsByTagName(tagNames[t]);
			for(var q=0; q<elems.length; q++)
				RebaseElement(elems[q], data.hrefWikiPage, "http://" + request.template.options.editionLanguage + "." + request.template.options.domain, "_blank");
		}
		
		// suffix classes & id's (different suffix - class is constant, id is per-popup (index))
//		AppendClassAndIDSuffixes(elemsAll/*divArticle.getElementsByTagName("*")*/, request.index, request.template.sessionData.suffixClassNameMediaWiki);
	
/*		// make all styles important
		var elemsAll = divArticle.getElementsByTagName("*");
		for(var q=0; q<elemsAll.length; q++){
			var style = elemsAll[q].style;
			var length = style.length;
			
			for(var r=0; r<length; r++)
				style.setProperty(style[0], style.getPropertyValue(style[0]), "important");
		}
*/
		// sync with section anchors
//		for(var q in res.parse.sections)
//			res.parse.sections[q].anchor += ("_" + request.index);
		
		///////////////////////////////////////////////////////////
		// rebase & suffix & target categorieshtml
		
		var arr = [
			{html: res.parse.categorieshtml, varName: "htmlCategories", idDiv: MediaWiki.CLASS_MEDIAWIKI_CATLINKS},
			{html: res.parse.languageshtml, varName: "htmlLanguages"},
		];
		for(var h in arr){
			if(arr[h].html && arr[h].html["*"] && arr[h].html["*"].length > 0){
				// if idDiv specified, get the html to be processed from the innerHTML of that div.
				// categorieshtml is always wrapped in a div, even if empty
				var htmlProcess = arr[h].html["*"];
				
				if(arr[h].idDiv){
					var divTemp = document.createElement('div');
					divTemp.innerHTML = arr[h].html["*"];
					divTemp = GetElementByIdFromElement(divTemp, arr[h].idDiv, "DIV")
					if(divTemp)
						htmlProcess = divTemp.innerHTML;
				}
			
				data[arr[h].varName] = RebaseAnchors(htmlProcess, data.hrefWikiPage,
					"http://" + request.template.options.editionLanguage + "." + request.template.options.domain, "_blank");
			}
		}
/*		
		if(res.parse.categorieshtml && res.parse.categorieshtml["*"] && res.parse.categorieshtml["*"].length > 0){
			data.htmlCategories = RebaseAnchors(res.parse.categorieshtml["*"], data.hrefWikiPage,
				"http://" + request.template.options.editionLanguage + "." + request.template.options.domain, "_blank");
		}
*/


		//////////////////
/*		function GetClassNames(editionLanguage, arr){
			for(var h in arr){
				if(arr[h].editionLanguage !== "undefined" && arr[h].editionLanguage == editionLanguage)
					return arr[h].classNames;
			}
			
			return (arr.length == 0 ? null : arr[0].classNames);
		}
	*/

		/////////////////
		// scraped content
	
		// disambig is a div at the start// ped/tion/tion (en)
		var arrScraper = [
			{ editionLanguage: null, arrThings: [
				{varNameInData: "htmlDisambigs", classNames: ["dablink", "disambig-see-also", "disambig-see-also-2"]},	// 1
				{varNameInData: "htmlSeeAlsos", classNames: ["seealso"]},	// 3
				{varNameInData: "htmlMainArticles", classNames: ["mainarticle"]},	// 3
				{varNameInData: "htmlInterProject", classNames: ["interProject"]}, 
				
//				{varNameInClassNames: "InfoBox", classNames: ["infobox"]},
				] // ?
			},
			{ editionLanguage: 'fr', arrThings: [
				{varNameInData: "htmlDisambigs", classNames: ["homonymie"]},
				]
			},
			];
		var classNames = {};
		var scraper = null;
		
		for(var k in arrScraper){
			if(arrScraper[k].editionLanguage == request.template.options.editionLanguage){
				scraper = arrScraper[k];
				break;
			}
			if(scraper == null)
				scraper = arrScraper[0];		// default index (null)
		}
		
		for(var l in scraper.arrThings){
			var varName, classNames;
			
			// use english for each one as default if unspecified
			varName = scraper.arrThings[l].varNameInData;
			if(varName == null)
				varName = arrScraper[0].arrThings[l].varNameInData;
				
			classNames = scraper.arrThings[l].classNames;
			if(classNames == null)
				classNames = arrScraper[0].arrThings[l].classNames;

			// set it
			data[varName] = GetElementsInnerHTMLByClassNames(divArticle, classNames);
			
//			if(scraper.arrThings[l].varNameInData)
//				data[scraper.arrThings[l].varNameInData] = GetElementsInnerHTMLByClassNames(divArticle, scraper.arrThings[l].classNames);
//			if(scraper.arrThings[l].varNameInClassNames)	// crappy way of getting array of classNames
//				classNames[scraper.arrThings[l].varNameInClassNames] = scraper.arrThings[l].classNames;
		}
		
		/////////////////
		// not scraped but same data structure
		
		// redirects (not autoredirects)
		if(res.parse.redirects && res.parse.redirects.length > 0){
			data.htmlRedirects = "";
			
			for(var q in res.parse.redirects){
				var format = MediaWiki.FORMAT_TIPPOPUP_MEDIAWIKI_REDIRECTED;
				if(q > 0)
					data.htmlRedirects += "<br/>";
				
				data.htmlRedirects += format.replace("<<FROM>>", res.parse.redirects[q].from)/*.replace("<<TO>>", res.parse.redirects[q].to)*/;
			}
		}

		// convert external links array to list of anchors
		data.htmlExternalLinks = ConvertArrayHREFtoHTML(res.parse.externallinks, "_blank");
		
		
		// html fixups
		
		// http://de.wiktionary.org/wiki/sein - NavContent doesnt have previous sibling div as NavHead
		var elems = divArticle.getElementsByClassName(MediaWiki.CLASS_MEDIAWIKI_NAVCONTENT);
		for(var h=0; h<elems.length; h++){
			var elemPrev = elems[h].previousSibling;
			while(elemPrev){
				// is prev sibling a div without NavHead class?
				if(elemPrev.nodeType == Node.ELEMENT_NODE && elemPrev.nodeName == "DIV" && elemPrev.classList.contains(MediaWiki.CLASS_MEDIAWIKI_NAVHEAD) == false){
					elemPrev.classList.add(MediaWiki.CLASS_MEDIAWIKI_NAVHEAD);
					if(MediaWiki.__DEBUG == true)
						console.log("mediawiki added NavHead class to <div> previousSibling");
					break;
				}
				elemPrev = elemPrev.previousSibling;
			}
		}
/*
		// one image is enough, first probably best
		// if only 1 section, that will already have the image
		if(res.parse.sections.length > 0){
			data.arrImageOuterHTML = [];
			var aImages = divArticle.getElementsByClassName("image");
			if(aImages.length >= 1)
				data.arrImageOuterHTML.push(aImages[0].outerHTML);
	//		for(var q=0; q<aImages.length; q++)
	//			arrImageOuterHTML.push(aImages[q].outerHTML);
		}
*/		
		// intro is consecutive p or ul
		if(request.template.options.getIntro == true){
			data.arrInfoboxOuterHTML = [];
			
			if(res.parse.sections.length == 0){
				// risk some crap filtering through
				data.htmlIntro = divArticle.innerHTML;
				
				// get all infoboxes in article - an infobox is now defined as a table element, preferably before toc
				var elems = divArticle.getElementsByTagName("table");
				for(var k=0; k<elems.length; k++){
					var match = false;
					
					// make sure none of the table classnames are forbidden
					for(var s in MediaWiki.CLASSNAMES_INFOBOX_FORBID){
						if(elems[k].classList.contains(MediaWiki.CLASSNAMES_INFOBOX_FORBID[s]) == true){
							match = true;
							break;
						}
					}
					
					if(match == false)	// no match
						data.arrInfoboxOuterHTML.push(elems[k].outerHTML);
				}
				
/*				for(var j in classNames.InfoBox){
					var elems = divArticle.GetElementsByClassName(classNames.InfoBox[j]);
			
					for(var k=0; k<elems.length; k++)
						data.arrInfoboxOuterHTML.push(elems[k].outerHTML);
				}*/
			}
			else{
				// identify first section, as hitting this means its definitely not in the summary
				var headingFirstSection = null;
				if(res.parse.sections.length > 0){
					var span = GetElementByIdFromElement(divArticle, res.parse.sections[0].anchor, "span");
					if(span != null)
						headingFirstSection = span.parentNode;
				}
				
				// find first p. if we reach first section without finding P, there's no summary (wiktionary)
				var elem = divArticle.firstChild;//GetElementByIdFromElement(div, "contentSub", "div");
				while(elem){
					if(elem == headingFirstSection)
						break;
					if(elem.nodeType == Node.ELEMENT_NODE){
						if(elem.nodeName == "P"){
							// dont count it as the start of the summary if it contains an child element (all levels) 
							// that has an id (eg: Stanford University)
							// <span style="font-size: small;"><span id="coordinates">...</span></span>
							var allChildren = elem.getElementsByTagName("*");
							for(var q=0; q<allChildren.length; q++){
								//document.getElementsByClassName("page_title")[0].attributes.id == undefined
								if(allChildren[q].nodeType == Node.ELEMENT_NODE && allChildren[q].attributes.id !== undefined && allChildren[q].attributes.id != ""){
									// exception - citation links
									// can either ignore sup, ignore .cite_ref-*, or assume only span contains worthy id
									if(allChildren[q].nodeName == "SUP")
										continue;
									break;
								}
							}
							// found an element with and id within? then carry on searching
							if(q != allChildren.length){
								elem = elem.nextSibling;
								continue;		// found
							}
								
							// TODO: just any span as firstChild is enough?
							
							// BUT also dont count it if it's just a paragraph containing a span for an interProject link (it just says name of project)
							// <P><SPAN className="interProject><a>crap</a> etc </P>
		/*					if(elem.firstChild && elem.firstChild.nodeType == Node.ELEMENT_NODE && elem.firstChild.className != null){
								var arrClassNames = GetClassNames(request.template.options.editionLanguage, arrInterProject);

								if(ClassNameContains(elem.firstChild.className, arrClassNames, request.template.suffixClassName) == true){
									elem = elem.nextSibling;
									continue;
								}
							}*/
							if(elem.firstChild && elem.firstChild.nodeType == Node.ELEMENT_NODE && elem.firstChild.nodeName == "SPAN"){
								elem = elem.nextSibling;
								continue;		// found
							}

							break;		// success - found first element
						}
						else if(elem.nodeName == "TABLE"){
							// start of table of contents can also identify end of intro
							if(elem.id == "toc")
								break;
								
							// make sure none of the table classnames are forbidden
							var match = false;
							for(var s in MediaWiki.CLASSNAMES_INFOBOX_FORBID){
								if(elem.classList.contains(MediaWiki.CLASSNAMES_INFOBOX_FORBID[s]) == true){
									match = true;
									break;
								}
							}
						
							// get all infoboxes in article - an infobox is now defined as a table element, preferably before toc
							if(match == false)	// no match
								data.arrInfoboxOuterHTML.push(elem.outerHTML);
						}
	
						// see if the elem classList contains one of the infobox classes
/*						for(var t in classNames.InfoBox){
							if(elem.classList.contains(classNames.InfoBox[t]) == true){
								data.arrInfoboxOuterHTML.push(elem.outerHTML);
								break;
							}
						}*/
					}
							
					elem = elem.nextSibling;
				}// end while
				
	//			while(elem && elem.nodeName != "P" && elem != headingFirstSection)
	//				elem = elem.nextSibling;
				
				// slightly risky assumption that there must be some text content for a summary to be valid. (see http://es.wiktionary.org/wiki/agree)
				if(elem && elem.textContent.length > 0){
/*					if(res.parse.sections.length == 0){
						// just one section, so use everything as the summary
						while(elem){
							if(elem.nodeType == Node.TEXT_NODE)
								data.htmlIntro = (data.htmlIntro ? data.htmlIntro : "") + elem.textContent;
							else if(elem.outerHTML)
								data.htmlIntro = (data.htmlIntro ? data.htmlIntro : "") + elem.outerHTML;
								
							elem = elem.nextSibling;
						}
					}
					else{*/
						// get all P (include comment/text nodes)
						while(elem && elem != headingFirstSection && (elem.nodeName == "P" || elem.nodeName == "UL" || elem.nodeName == "LI" ||
							elem.nodeType == Node.TEXT_NODE || elem.nodeType == Node.COMMENT_NODE) ){
							//
							if(elem.nodeType == Node.TEXT_NODE)
								data.htmlIntro = (data.htmlIntro ? data.htmlIntro : "") + elem.textContent;
							else if(elem.outerHTML)
								data.htmlIntro = (data.htmlIntro ? data.htmlIntro : "") + elem.outerHTML;
								
							elem = elem.nextSibling;
						}
/*					}*/
				}
			}// end else
		}
		
		if(request.template.options.getSections == true){
			// NB: This uses the sections[] array as the index, but that has duplicate anchors sometimes
			// TODO: If done by iterating all H2 elements (ie: backwards), it would solve that...
			var tagNameOpen = null;
			var headingSection = null;
			var headingSectionNext = null;
			var spanSection = null;
			var spanSectionNext = null;
			
			// spanish doesnt use level 2 as lowest level, so assume first section is lowest level (sections[0].level))
			var levelLowest = res.parse.sections.length > 0 ? res.parse.sections[0].level : null;
			if(MediaWiki.__DEBUG == true)
				console.log("mediawiki section level below 2");
			
			// iterate through sections until we get to indexL2SectionNext (next language)
			for(var i=0; i < res.parse.sections.length; i++){
				// re-use last section
				if(spanSectionNext != null){
					spanSection = spanSectionNext;
					headingSection = headingSectionNext;
				}
				else{
					spanSection = GetElementByIdFromElement(divArticle, res.parse.sections[i].anchor, "span");
					if(spanSection == null)
						continue;
					headingSection = spanSection.parentNode;
				}
				
				// only wrap level 2 (language name) in a div
				if(res.parse.sections[i].level == levelLowest/*2*/){
					// close existing
					if(tagNameOpen)
						html += "</" + tagNameOpen + ">";

					// wrap each level 2 section (language) in a div
					//html += '<span style="color:red; font-size:large">'+res.parse.sections[i].line+"</span>";
					tagNameOpen = "div";
					html += '<' + tagNameOpen + ' id="' + res.parse.sections[i].anchor + '" class="' + request.template.sessionData.classNameL2SectionMediaWiki + '">';
				}
					
				// skip heading for level 2 sections always
				var elemContent = headingSection;//.nextSibling;
				if(request.template.options.includeSubsectionHeadings == false || res.parse.sections[i].level == levelLowest/*2*/)
					elemContent = elemContent.nextSibling;
				
				// identify the end of this section
				if((i+1) < res.parse.sections.length){
					spanSectionNext = GetElementByIdFromElement(divArticle, res.parse.sections[i+1].anchor, "span", spanSection);
					if(spanSectionNext == null)
						continue;
					headingSectionNext = spanSectionNext.parentNode;
				}else
					headingSectionNext = null;
				
				// copy this and all siblings up to the header of the next section (if it exists)
				var elemPrevious = null;
				while(elemContent != headingSectionNext && elemContent != null){
					if(elemContent.nodeType == Node.ELEMENT_TEXT)
						html += elemContent.textContent;
					else if(elemContent.outerHTML)
						html += elemContent.outerHTML;
						
					elemPrevious = elemContent;
					elemContent = elemContent.nextSibling;
				}
				
				// cleanup - if last elem was a HR, remove it
//				if(elemPrevious && elemPrevious.nodeType == Node.ELEMENT_NODE && elemPrevious.nodeName == "HR")
//					elemPrevious.parentElement.removeChild(elemPrevious);
			}

			// close last tag
			if(tagNameOpen)	
				html += "</" + tagNameOpen + ">";
		}

		// sanitize 'line' part of sections[] (used in <option>
//		for(var i=0; i<res.parse.sections.length; i++)
//			res.parse.sections[i].line = res.parse.sections[i].line;
	
		// check res.parse.redirects[x].to
		
		// build the rest of return struct
		data.sections = res.parse.sections;
		//
		data.html = html ? html : null;
		//data.htmlIntro = htmlIntro ? htmlIntro : null;
//		data.arrImageOuterHTML = arrImageOuterHTML;
		// Noticebars
		// 1 -
		//data.htmlRedirects = htmlRedirects ? htmlRedirects: null;
		data.htmlAutoRedirects = request.template.htmlAutoRedirects ? request.template.htmlAutoRedirects : null;
//		data.htmlDisambigs = htmlScraped.disambigs ? htmlScraped.disambigs : null;
//		data.htmlInterProject = htmlScraped.interProject ? htmlScraped.interProject : null;
		// 2 - Further Reading	
//		data.htmlSeeAlsos = htmlScraped.seeAlsos ? htmlScraped.seeAlsos : null;
//		data.htmlMainArticles = htmlScraped.mainArticles ? htmlScraped.mainArticles : null;
		// 3 - Categories
		//data.htmlCategories = htmlCategories  ? htmlCategories : null;
		// 4 - External Links
		//data.htmlExternalLinks = htmlExternalLinks ? htmlExternalLinks : null;
		// 5 - Languages
		//data.htmlLanguages = null;
		
		//data.displaytitle, data.hrefWikiPage, data.hashWikiPage, data.srcEditionFlagIcon
		return data;
/*		
		return({
			displaytitle: res.parse.displaytitle,
			htmlDisplayTitle: htmlDisplayTitle,
			sections: res.parse.sections, 
//			langlinks: res.parse.langlinks, 
			
			html: html ? html : null,
			htmlIntro: htmlIntro ? htmlIntro : null,
			arrImageOuterHTML: arrImageOuterHTML,	// already sanitized
			
			hrefWikiPage: hrefWikiPage,
			hashWikiPage: hashWikiPage,

			// 1 - NB
			htmlRedirects: htmlRedirects ? htmlRedirects: null,
			htmlAutoRedirects: request.template.htmlAutoRedirects ? request.template.htmlAutoRedirects : null,
			htmlDisambigs: htmlScraped.disambigs ? htmlScraped.disambigs : null,
			htmlInterProject: htmlScraped.interProject ? htmlScraped.interProject : null,
			// 2 - Further Reading
			htmlSeeAlsos: htmlScraped.seeAlsos ? htmlScraped.seeAlsos : null,
			htmlMainArticles: htmlScraped.mainArticles ? htmlScraped.mainArticles : null,
			// 3 - Categories
			htmlCategories: htmlCategories  ? htmlCategories : null,
			// 4 - External Links
			htmlExternalLinks: htmlExternalLinks ? htmlExternalLinks : null,
			
			srcEditionFlagIcon: MediaWiki.GetEditionFlagIcon(request.template.options.editionLanguage),
		});*/
	},
	
	///////////////////////////////

	arrFlagToFileName: [
		{editionLanguage: 'species', fileName: 'species', name: "", notLanguage: true,},
		{editionLanguage: 'commons', fileName: 'commons', name: "", notLanguage: true,},
	
		{editionLanguage: 'en', fileName: 'england', name: "English"},
		{editionLanguage: 'de', fileName: 'de', name: "German"},
		{editionLanguage: 'fr', fileName: 'fr', name: "French"},
		{editionLanguage: 'pl', fileName: 'pl', name: "Polish"},
		{editionLanguage: 'it', fileName: 'it', name: "Italian"},
		{editionLanguage: 'ja', fileName: 'jp', name: "Japanese"},
		{editionLanguage: 'es', fileName: 'es', name: "Spanish"},
		{editionLanguage: 'nl', fileName: 'nl', name: "Dutch"},
		{editionLanguage: 'pt', fileName: 'pt', name: "Portuguese"},
		{editionLanguage: 'ru', fileName: 'ru', name: "Russian"},
		{editionLanguage: 'sv', fileName: 'se', name: "Swedish"},
		{editionLanguage: 'zh', fileName: 'cn', name: "Chinese"},
		{editionLanguage: 'ca', fileName: 'catalonia', name: "Catalan"},
		{editionLanguage: 'no', fileName: 'no', name: "Norwegian (Bokmål)"},
		{editionLanguage: 'fi', fileName: 'fi', name: "Finnish"},
		{editionLanguage: 'uk', fileName: 'ua', name: "Ukrainian"},
		{editionLanguage: 'hu', fileName: 'hu', name: "Hungarian"},
		{editionLanguage: 'cs', fileName: 'cs', name: "Czech"},
		{editionLanguage: 'ro', fileName: 'ro', name: "Romanian"},
		{editionLanguage: 'tr', fileName: 'tr', name: "Turkish"},
		{editionLanguage: 'ko', fileName: 'kr', name: "Korean"},
		{editionLanguage: 'vi', fileName: 'vn', name: "Vietnamese"},
		{editionLanguage: 'da', fileName: 'dk', name: "Danish"},
		{editionLanguage: 'ar', name: "Arabic"},
		{editionLanguage: 'eo', name: "Esperanto"},
		{editionLanguage: 'sk', fileName: 'sk', name: "Slovak"},
		{editionLanguage: 'he', fileName: 'il', name: "Hebrew"},
		{editionLanguage: 'fa', name: "Persian"},
		{editionLanguage: 'bg', fileName: 'bg', name: "Bulgarian"},
		{editionLanguage: 'si', fileName: 'si', name: "Slovene"},
		{editionLanguage: 'war', fileName: 'ph', name: "Waray-Waray"},
		{editionLanguage: 'lmo', name: "Lombard"},
		{editionLanguage: 'et', fileName: 'ee', name: "Estonian"},
		{editionLanguage: 'hr', fileName: 'hr', name: "Croatian"},
		{editionLanguage: 'new', fileName: 'np', name: "Newar / Nepal Bhasa"},
		{editionLanguage: 'te', fileName: 'in', name: "Telugu"},
		{editionLanguage: 'nn', fileName: 'no', name: "Norwegian (Nynorsk)"},
		{editionLanguage: 'th', fileName: 'th', name: "Thai"},
		{editionLanguage: 'gl', fileName: 'galicia',name: "Galician"},
		{editionLanguage: 'el', fileName: 'gr', name: "Greek"},
		{editionLanguage: 'ceb', fileName: 'ph', name: "Cebuano"},
		{editionLanguage: 'simple', fileName: 'england', name: "Simple English"},
		{editionLanguage: 'ms', fileName: 'my', name: "Malay"},
		{editionLanguage: 'eu', fileName: 'basque', name: "Basque"},
		{editionLanguage: 'ht', fileName: 'ht', name: "Haitian Creole"},
		{editionLanguage: 'bs', fileName: 'ba', name: "Bosnian"},
		{editionLanguage: 'bpy', name: "Bishnupriya Manipuri"},
		{editionLanguage: 'lb', fileName: 'lu', name: "Luxembourgish"},
		{editionLanguage: 'ka', fileName: 'ge', name: "Georgian"},
		{editionLanguage: 'is', fileName: 'is', name: "Icelandic"},
		{editionLanguage: 'sq', fileName: 'al', name: "Albanian"},
		{editionLanguage: 'la', name: "Latin"},
		{editionLanguage: 'br', fileName: 'brittany', name: "Breton"},
		{editionLanguage: 'hi', fileName: 'in', name: "Hindi"},
		{editionLanguage: 'az', fileName: 'az', name: "Azerbaijani"},
		{editionLanguage: 'bn', fileName: 'bd', name: "Bengali"},
		{editionLanguage: 'mk', fileName: 'mk', name: "Macedonian"},
		{editionLanguage: 'mr', fileName: 'in', name: "Marathi"},
		{editionLanguage: 'sh', fileName: 'rs',name: "Serbo-Croatian"},
		{editionLanguage: 'tl', fileName: 'ph', name: "Tagalog"},
		{editionLanguage: 'cy', fileName: 'wales', name: "Welsh"},
		{editionLanguage: 'ido', name: "Ido"},
		{editionLanguage: 'pms', fileName: 'it', name: "Piedmontese"},
		{editionLanguage: 'lv', fileName: 'lv', name: "Latvian"},
		{editionLanguage: 'ta', fileName: 'lk', name: "Tamil"},
		{editionLanguage: 'su', fileName: 'sd', name: "Sundanese"},
		{editionLanguage: 'oc', name: "Occitan"},
		{editionLanguage: 'jv', fileName: 'id', name: "Javanese"},
		{editionLanguage: 'nap', name: "Neapolitan"},
		{editionLanguage: 'nds', name: "Low Saxon"},
		{editionLanguage: 'scn', fileName: 'it', name: "Sicilian"},
		{editionLanguage: 'be', fileName: 'by', name: "Belarusian"},
		{editionLanguage: 'ast', name: "Asturian"},
		{editionLanguage: 'ku', name: "Kurdish"},
		{editionLanguage: 'wa', name: "Walloon"},
		{editionLanguage: 'af', fileName: 'za', name: "Afrikaans"},
		{editionLanguage: 'be-x-old', fileName: 'by', name: "Belarusian (Taraškievica)"},
		{editionLanguage: 'an', name: "Aragonese"},
		{editionLanguage: 'ksh', name: "Ripuarian"},
		{editionLanguage: 'szl', name: "Silesian"},
		{editionLanguage: 'fy', name: "West Frisian"},
		{editionLanguage: 'frr', name: "North Frisian"},
		{editionLanguage: 'yue', fileName: 'cn', name: "Cantonese"},
		{editionLanguage: 'ur', name: "Urdu"},
		{editionLanguage: 'ia', name: "Interlingua"},
		{editionLanguage: 'ga', fileName: 'ie', name: "Irish"},
		{editionLanguage: 'yi', name: "Yiddish"},
		{editionLanguage: 'sw', name: "Swahili"},
		{editionLanguage: 'als', name: "Alemannic"},
		{editionLanguage: 'hy', fileName: 'am', name: "Armenian"},
		{editionLanguage: 'am', name: "Amharic"},
		{editionLanguage: 'roa-rup', name: "Aromanian"},
		{editionLanguage: 'map-bms', name: "Banyumasan"},
		{editionLanguage: 'bh', name: "Bihari"},
		{editionLanguage: 'co', name: "Corsican"},
		{editionLanguage: 'cv', name: "Chuvash"},
		{editionLanguage: 'dv', name: "Divehi"},
		{editionLanguage: 'nds-nl', fileName: 'nl', name: "Dutch Low Saxon"},
		{editionLanguage: 'fo', name: "Faroese"},
		{editionLanguage: 'fur', name: "Friulian"},
		{editionLanguage: 'glk', name: "Gilaki"},
		{editionLanguage: 'ilo', name: "Ilokano"},
		{editionLanguage: 'kn', name: "Kannada"},
		{editionLanguage: 'csb', name: "Kapampangan"},
		{editionLanguage: 'kk', fileName: 'kz', name: "Kazakh"},
		{editionLanguage: 'km', fileName: 'kh', name: "Khmer"},
		{editionLanguage: 'lij', name: "Ligurian"},
		{editionLanguage: 'li', name: "Limburgish"},
		{editionLanguage: 'ml', name: "Malayalam"},
		{editionLanguage: 'gv', name: "Manx"},
		{editionLanguage: 'mi', name: "Maori"},
		{editionLanguage: 'mt', fileName: 'mt', name: "Maltese"},
		{editionLanguage: 'nah', name: "Nahuatl"},
		{editionLanguage: 'ne', fileName: 'np', name: "Nepali"},
		{editionLanguage: 'nrm', name: "Norman"},
		{editionLanguage: 'se', name: "Northern Sami"},
		{editionLanguage: 'nov', name: "Novial"},
		{editionLanguage: 'qu', name: "Quechua"},
		{editionLanguage: 'pi', name: "Pali"},
		{editionLanguage: 'pag', name: "Pangasinan"},
		{editionLanguage: 'ps', name: "Pashto"},
		{editionLanguage: 'pdc', name: "Pennsylvania German"},
		{editionLanguage: 'rm', name: "Romansh"},
		{editionLanguage: 'bat-smg', name: "Samogitian"},
		{editionLanguage: 'sa', name: "Sanskrit"},
		{editionLanguage: 'gd', fileName: 'scotland', name: "Scottish Gaelic"},
		{editionLanguage: 'sco', fileName: 'scotland', name: "Scots"},
		{editionLanguage: 'sc', name: "Sardinian"},
		{editionLanguage: 'si', name: "Sinhalese"},
		{editionLanguage: 'tg', fileName: 'tj', name: "Tajik"},
		{editionLanguage: 'roa-tara', name: "Tarantino"},
		{editionLanguage: 'tt', name: "Tatar"},
		{editionLanguage: 'to', fileName: 'to', name: "Tongan"},
		{editionLanguage: 'tk', fileName: 'tm', name: "Turkmen"},
		{editionLanguage: 'hsb', name: "Upper Sorbian"},
		{editionLanguage: 'uz', fileName: 'uz', name: "Uzbek"},
		{editionLanguage: 'vec', name: "Venetian"},
		{editionLanguage: 'fiu-vro', name: "Voro"},
		{editionLanguage: 'wuu', name: "Wu"},
		{editionLanguage: 'vls', name: "West Flemish"},
		{editionLanguage: 'yo', name: "Yoruba"},
		{editionLanguage: 'diq', name: "Zazaki"},
		{editionLanguage: 'zh-min-nan', fileName: 'cn', name: "Min Nan"},
		{editionLanguage: 'zh-classical', fileName: 'cn', name: "Classical Chinese"},
		{editionLanguage: 'frp', name: "Franco-Provençal/Arpitan"},
		{editionLanguage: 'lad', name: "Ladino"},
		{editionLanguage: 'bar', name: "Bavarian"},
		{editionLanguage: 'bcl', name: "Central Bicolano"},
		{editionLanguage: 'kw', name: "Cornish"},
		{editionLanguage: 'mn', fileName: 'mn', name: "Mongolian"},
		{editionLanguage: 'haw', name: "Hawaiian"},
		{editionLanguage: 'ang', name: "Anglo-Saxon"},
		{editionLanguage: 'ln', name: "Lingala"},
		{editionLanguage: 'ie', name: "Interlingue"},
		{editionLanguage: 'wo', name: "Wolof"},
		{editionLanguage: 'tpi', name: "Tok Pisin"},
		{editionLanguage: 'ty', name: "Tahitian"},
		{editionLanguage: 'crh', name: "Crimean Tatar"},
		{editionLanguage: 'jbo', name: "Lojban"},
		{editionLanguage: 'ay', name: "Aymara"},
		{editionLanguage: 'zea', name: "Zealandic"},
		{editionLanguage: 'eml', name: "Emilian-Romagnol"},
		{editionLanguage: 'ig', name: "Igbo"},
		{editionLanguage: 'or', name: "Oriya"},
		{editionLanguage: 'mg', name: "Malagasy"},
		{editionLanguage: 'cbk-zam', name: "Zamboanga Chavacano"},
		{editionLanguage: 'kg', name: "Kongo"},
		{editionLanguage: 'arc', name: "Assyrian Neo-Aramaic"},
		{editionLanguage: 'rmy', name: "Vlax Romani"},
		{editionLanguage: 'gn', name: "Guarani"},
		{editionLanguage: 'mo', fileName: 'md', name: "Moldovan"},
		{editionLanguage: 'so', fileName: 'so', name: "Somali"},
		{editionLanguage: 'kab', name: "Kabyle"},
		{editionLanguage: 'ks', name: "Kashmiri"},
		{editionLanguage: 'stq', name: "Saterland Frisian"},
		{editionLanguage: 'ce', name: "Chechen"},
		{editionLanguage: 'udm', name: "Udmurt"},
		{editionLanguage: 'mzn', name: "Mazandarani"},
		{editionLanguage: 'pap', name: "Papiamentu"},
		{editionLanguage: 'cu', name: "Old Church Slavonic"},
		{editionLanguage: 'sah', name: "Sakha"},
		{editionLanguage: 'tet', name: "Tetum"},
		{editionLanguage: 'sd', name: "Sindhi"},
		{editionLanguage: 'lo', name: "Lao"},
		{editionLanguage: 'ba', name: "Bashkir"},
		{editionLanguage: 'pnb', name: "Western Punjabi"},
		{editionLanguage: 'iu', name: "Iniktitut"},
		{editionLanguage: 'na', name: "Nauruan"},
		{editionLanguage: 'bo', name: "Tibetan"},
		{editionLanguage: 'dsb', name: "Lower Sorbian"},
		{editionLanguage: 'chr', name: "Cherokee"},
		{editionLanguage: 'cdo', fileName: 'cn', name: "Min Dong"},
		{editionLanguage: 'hak', name: "Hakka"},
		{editionLanguage: 'om', name: "Oromo"},
		{editionLanguage: 'my', fileName: 'mm', name: "Burmese"},
		{editionLanguage: 'sm', fileName: 'ws', name: "Samoan"},
		{editionLanguage: 'ee', name: "Ewe"},
		{editionLanguage: 'pcd', name: "Picard"},
		{editionLanguage: 'ug', name: "Uyghur"},
		{editionLanguage: 'as', name: "Assamese"},
		{editionLanguage: 'ti', name: "Tigrinya"},
		{editionLanguage: 'av', name: "Avar"},
		{editionLanguage: 'bm', name: "Bambara"},
		{editionLanguage: 'zu', fileName: 'za', name: "Zulu"},
		{editionLanguage: 'pnt', name: "Pontic"},
		{editionLanguage: 'nv', name: "Navajo"},
		{editionLanguage: 'cr', name: "Cree"},
		{editionLanguage: 'pih', name: "Norfolk"},
		{editionLanguage: 'ss', name: "Swati"},
		{editionLanguage: 've', name: "Venda"},
		{editionLanguage: 'rw', name: "Kinyarwanda"},
		{editionLanguage: 'ch', name: "Chamorro"},
		{editionLanguage: 'arz', name: "Egyptian Arabic"},
		{editionLanguage: 'xh', fileName: 'za', name: "Xhosa"},
		{editionLanguage: 'kl', fileName: 'gl', name: "Greenlandic"},
		{editionLanguage: 'ik', name: "Inupiak"},
		{editionLanguage: 'bug', name: "Buginese"},
		{editionLanguage: 'dz', fileName: 'bt', name: "Dzongkha"},
		{editionLanguage: 'ts', name: "Tsonga"},
		{editionLanguage: 'tn', name: "Tswana"},
		{editionLanguage: 'kv', name: "Komi"},
		{editionLanguage: 'tum', name: "Tumbuku"},
		{editionLanguage: 'xal', name: "Kalmyk"},
		{editionLanguage: 'tw', name: "Twi"},
		{editionLanguage: 'bxr', name: "Buryat (Russia)"},
		{editionLanguage: 'ak', name: "Akan"},
		{editionLanguage: 'ab', name: "Abkhazian"},
		{editionLanguage: 'ny', name: "Chichewa"},
		{editionLanguage: 'fj', fileName: 'fj', name: "Fijian"},
		{editionLanguage: 'lbe', name: "Lak"},
		{editionLanguage: 'ki', name: "Kikuyu"},
		{editionLanguage: 'za', name: "Zhuang"},
		{editionLanguage: 'ff', name: "Fula"},
		{editionLanguage: 'lg', name: "Luganda"},
		{editionLanguage: 'sn', name: "Shona"},
		{editionLanguage: 'ha', name: "Hausa"},
		{editionLanguage: 'sg', name: "Sango"},
		{editionLanguage: 'ii', name: "Sichuan"},
		{editionLanguage: 'cho', name: "Choctaw"},
		{editionLanguage: 'rn', name: "Kirundi"},
		{editionLanguage: 'mh', name: "Marshallese"},
		{editionLanguage: 'chy', name: "Cheyenne"},
		{editionLanguage: 'ng', name: "Ndonga"},
		{editionLanguage: 'kj', name: "Kuanyama"},
		{editionLanguage: 'ho', name: "Hiri Motu"},
		{editionLanguage: 'mus', name: "Muscogee"},
		{editionLanguage: 'kr', name: "Kanuri"},
		{editionLanguage: 'hz', name: "Herero"},
		{editionLanguage: 'mwl', name: "Moloko"},
		{editionLanguage: 'pa', name: "Eastern Punjabi"},
	],
	
	GetEditionInfo: function(editionLanguage){
		// convert wikipedia domain (en.blah) to flag image
		var fileName = 'unknown';		// default
		var name = null;
		
		for(var q in MediaWiki.arrFlagToFileName){
			if(MediaWiki.arrFlagToFileName[q].editionLanguage == editionLanguage){
				if(MediaWiki.arrFlagToFileName[q].fileName)
					fileName = MediaWiki.arrFlagToFileName[q].fileName;
					
				name = MediaWiki.arrFlagToFileName[q].name;
				break;
			}
		}
	
		return({
			urlFlag: chrome.extension.getURL('img/flags/'+fileName+'.png'),
			name: name
		});
	},
};


