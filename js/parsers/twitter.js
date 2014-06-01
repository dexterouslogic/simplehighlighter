var Twitter = {
	ERROR_UNKNOWN: "An unknown error has occurred",
	
	WARNING_NORESULTS: "No Tweet results for <b><<TEXT>></b>",
	
	// TODO custom user agent?
	Request: function(request/*tipObject, text, tab , msgSet, index, template*/){
		var xhr = new XMLHttpRequest();
		
		// force recent for refreshes
		var result_type = request.template.sessionData.refresh == true ? 
			"recent" : request.template.options.result_type;
		
		// ?page=2&max_id=23577712308260864&offset_recent_correction=3&rpp=5&q=Service
		var url = "http://search.twitter.com/search.atom?" +
			"rpp=" + request.template.options.per_page +
			"&result_type=" + result_type;

		if(request.template.sessionData.page != null)
			url += "&page=" + request.template.sessionData.page;
			
		if(request.template.sessionData.refresh == true && request.template.options.refresh_style == "append"){
			// append really means do the whole thing again
		}
		else{
			// only valid if changing page??
			if(request.template.sessionData.max_id)
				url += "&max_id=" + request.template.sessionData.max_id;
			if(request.template.sessionData.offset_recent_correction && request.template.sessionData.page != 1 && request.template.sessionData.page != null)		// no offset corr for p1
				url += "&offset_recent_correction=" + request.template.sessionData.offset_recent_correction;
			
			// only valid if refreshing
			// 'replace' means list is the length of teh amount of tweets since last requested. 'append' means get same list as before but with newest added to top
//			if(request.template.options.sessionData.refresh_style == "replace"){	
				if(request.template.sessionData.refresh == true && request.template.sessionData.since_id != null)
					url += "&since_id=" + request.template.sessionData.since_id;
//			}
		}
			
		// query last
		url += "&q=" + encodeURIComponent(request.text);
		
		xhr.open('GET', url, true);
		xhr.Twitter = this;
		
		xhr.onreadystatechange = function (){
			if (xhr.readyState == 4){
				// html error
				if (xhr.status != 200){
					var errorHTML = (xhr.status == 0 ? Twitter.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);

					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: {errorHTML: errorHTML} });
					return;
				}
				
				var data = this.Twitter.Parse(xhr.responseXML, request/*.template*/);//, text, template);//, index/*, tipObject*/);
				if(data){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: data,} );
				}
				
			}
		};
		
		xhr.send(null);				
	},
	
	// TODO: XPath
	Parse: function(xmlDoc, request){
		function GetHREFArg(xmlDoc, nodeName, relAttrValue, argName){
/*			function GetSearchVariables(href){
				var out = {};
				var index = href.indexOf('?');
				if(index != -1){
					var search = href.substring(index+1);

					var query, qs = search;//.substring(1);
					var queries = qs.split(/\&/);
					
					for (var i=0; i<queries.length; i++) {
						query = queries[i].split(/\=/);
						out[query[0]] = (typeof query[1] == 'undefined') ? null : unescape(query[1]).replace(/\+/g," ");
					}
				}
				return out;
			}			
	*/	
			var node = Twitter.GetNodeByRel(xmlDoc, nodeName, relAttrValue);
			if(node){
				var href = node.attributes["href"].nodeValue;
				if(href != null){
					if(argName == null)
						return href;
					else
						return href.GetSearchVariables()[argName];
				}
			}
			
			return null;
		}
						
			// get the since_id for refresh - not sent on subsequent pages
		// <link type="application/atom+xml" rel="refresh" href="http://search.twitter.com/search.atom?q=Google+&amp;result_type=mixed&amp;rpp=5&amp;since_id=23714354197176322"/>
		var since_id = GetHREFArg(xmlDoc, "link", "refresh", "since_id");		// dont send if null
/*		if(since_id == null){
			// assume we already have it
			since_id = template.backup_since_id;
		}
		else
			template.backup_since_id = since_id;
	*/		
//		var xpr = xmlDoc.evaluate('/link[@rel="refresh"]', xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//		var node = xpr.singleNodeValue;
		
		var moreResultsUrl = GetHREFArg(xmlDoc, "link", "alternate", null);
		
		// get offset_recent_correction & max_id for next page
		var offset_recent_correction = GetHREFArg(xmlDoc, "link", "next", "offset_recent_correction");
		var max_id = GetHREFArg(xmlDoc, "link", "next", "max_id");

		// should a back/forward link be available
		var is_previous = this.GetNodeByRel(xmlDoc, "link", "previous") ? true : false;
		var is_next = this.GetNodeByRel(xmlDoc, "link", "next") ? true : false;

		// because can't stringify element, manually create array instead...
		// no results?
		var entries = xmlDoc.getElementsByTagName("entry");
		var arrObjEntries = [];
		var warningHTML = null;
		
		if(entries.length == 0){
			var format = Twitter.WARNING_NORESULTS.replace("<<TEXT>>", request.text);
			// twitterwarning still processes data, but shows this warning as contents, enabling the refresh button (unique to twitter)
			warningHTML = format;
		}
		else{
			for (var i=0, entry; entry = entries[i]; i++) {
				var obj = {
					author: {},
					content: null,
					published: null,
					//retweet: null,
					result_type: null,
					recent_retweets: null,
					url: null,
				};
			
				// author image
				obj.author.srcImage = Twitter.GetNodeByRel(entry, "link", "image").attributes["href"].nodeValue;
				// author name & uri
				var authors = entry.getElementsByTagName("author");
				if(authors.length == 1){
					var names = authors[0].getElementsByTagName("name");
					if(names.length == 1){
						// get uri for author
						var uris = authors[0].getElementsByTagName("uri");
						if(uris.length == 1){
							// split name (format: nick (real))
							var name = names[0].textContent;
							var realname = null;
							var start = name.indexOf('(');
							var end = name.indexOf(')');
							
							if(start != -1 && end != -1 && (start+1) < end){
								realname = name.substring(start+1, end);
								name = name.substring(0, Math.max(0, start-1) );
							}
							
							obj.author.name = name;
							obj.author.realname = realname;
							obj.author.uri = uris[0].textContent
						}
					}
				}
				// content
				var contents = entry.getElementsByTagName("content");
				if(contents.length == 1){
					obj.content = Twitter.AddAttributeToTagNames(contents[0].textContent, "A", "target", "_blank");//contents[0].textContent;
					/*
					// if contents contain an anchor whose first char of innerHTML is @, assume it's at someone
					var divDummy;
					divDummy.innerHTML = obj.contents;
					var anchors = divDummy.getElementsByTagName('A');
					for(var h=0; h<anchors.length; h++)*/
				}
				// published
				var publisheds = entry.getElementsByTagName("published");
				if(publisheds.length == 1)
					obj.published = new Date(publisheds[0].textContent);
				// result type (recent|popular)
				var metadatas = entry.getElementsByTagName("metadata");
				if(metadatas.length == 1){
					var resultTypes = metadatas[0].getElementsByTagName("result_type");
					if(resultTypes.length == 1)
						obj.result_type = resultTypes[0].textContent;
					var recentRetweets = metadatas[0].getElementsByTagName("recent_retweets");
					if(recentRetweets.length == 1)
						obj.recent_retweets = recentRetweets[0].textContent;
				}
				
				obj.url = GetHREFArg(entry, "link", "alternate", null);
							
				arrObjEntries.push(obj);
			}// end for
		}// end else
		
		return({
			moreResultsUrl: moreResultsUrl,
			page: request.template.sessionData.page ? request.template.sessionData.page : 1,
			
			entries: arrObjEntries,
			// refresh
			since_id: since_id,
			// pagination
			offset_recent_correction: offset_recent_correction,
			max_id: max_id,
			
			warningHTML: warningHTML,

			is_previous: is_previous,
			is_next: is_next,
		});
	},
	
	GetNodeByRel: function(xmlDoc, nodeName, attrValueRel){
		var elems = xmlDoc.getElementsByTagName(nodeName);
		for(var i=0; i<elems.length; i++){
			if(elems[i].attributes["rel"].nodeValue == attrValueRel)
				return elems[i];
		}
		return null;
	},

	AddAttributeToTagNames: function(html, tagName, attrName, attrValue){
		var div = document.createElement('div');
		div.innerHTML = html;
		
		var elems = div.getElementsByTagName(tagName);
		for(var q=0; q<elems.length; q++)
			elems[q].setAttribute(attrName, attrValue);
			
		return div.innerHTML;
	},
}

