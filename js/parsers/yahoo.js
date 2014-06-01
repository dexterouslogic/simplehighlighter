var Yahoo = {
	//AppID: '4muP0fTV34EwDebJKZAXcJ8rM.HrcyjGnNiihCuezlmEa_aNBJv.vcXaln98qow-',		// YBoss
	AppID: '6KyEj2bV34ECBKBQrJlukT_A3fgzwx2fvxEUuE16BwxnRJpqa0xA9oHYx6E0GxCNhBlKjiGH2R0-',

	ERROR_JSONPARSE: "The server returned an incorrectly formatted response",
	ERROR_UNKNOWN: "An unknown error has occurred",
	ERROR_FORMAT_RESPONSECODE: "A <<CODE>> error has occurred",

	WARNING_NORESULTS: "We did not find results for: <b><<TEXT>></b>",

	Request: function(request/*tipObject,text, tab, msgSet, index, template*/){
		var xhr = new XMLHttpRequest();
		
		// construct url
		var url = "http://boss.yahooapis.com/ysearch/" + request.template.options.searchType + "/v1/" +
			encodeURIComponent(request.text) + "?" +
			"format=json&" + 
			"appid=" + this.AppID;

		// only applicable to these types
		if(request.template.options.searchType == 'web'){
			url += "&count=" + request.template.options.per_page;
		
			// start ordinal
			if(request.template.sessionData.page != null && request.template.sessionData.page > 0)
				url += "&start=" + ((request.template.sessionData.page - 1) * request.template.options.per_page);
			// restrict site
			if(request.template.options.restrictToHost == true && request.template.sessionData.hostname)
				url += "&sites=" + request.template.sessionData.hostname;
			// long abstract
			if(request.template.options.longAbstract == true)
				url += "&abstract=long";
			// filters
			var filter = (request.template.options.no_porn == true ? "-porn" : "");
			if(request.template.options.no_hate){
				if(filter.length > 0)
					filter += ",";
				filter += "-hate";
			}
			if(filter.length > 0)
				url += "&filter=" + filter;
		}
		
		xhr.open('GET', url, true);
		xhr.Yahoo = this;

		xhr.onreadystatechange = function (){
			if (xhr.readyState == 4){
				// html error
				if (xhr.status != 200){
					var errorHTML = (xhr.status == 0 ? Yahoo.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);

					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: {errorHTML: errorHTML} });
					return;
				}
				
				// convert to object
				try{
					res = JSON.parse(xhr.responseText);
					if(res == null){
						var err = new Error();
						throw err;
					}
				}catch(e){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: {errorHTML: Yahoo.ERROR_JSONPARSE} });
					return;
				}
			
				var data = this.Yahoo.Parse(res.ysearchresponse, request.text, request.template);//, index/*, tipObject*/);
				if(data){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: data,} );
				}
			}
		};
		
		xhr.send(null);				
	},
		
	Parse: function(yresp, text, template){
		// extract error code (probably caught already)
		if(yresp.responsecode != 200){
			var format = Yahoo.ERROR_FORMAT_RESPONSECODE.replace("<<CODE>>", yresp.responsecode);
			return({errorHTML: format});
		}
			
		var html = "";

		if(template.options.searchType == "web"){
			if(yresp.totalhits == 0 || yresp.resultset_web.length == 0){
				var format = Yahoo.WARNING_NORESULTS.replace("<<TEXT>>", text);
				return({warningHTML: format});
			}
			
			// synthesize
			var page = Math.floor(yresp.start / template.options.per_page) + 1;
			var pages = Math.floor(yresp.totalhits / template.options.per_page) + 1;
			var moreResultsUrl = 'http://search.yahoo.com/search?p=' + encodeURIComponent(text);
			if(template.options.restrictToHost == true && template.sessionData.hostname)
				moreResultsUrl += "&vs=" + template.sessionData.hostname;

			return({
				restrictToHost: template.options.restrictToHost,
				yresp: yresp,
				moreResultsUrl: moreResultsUrl,
				page: page,
				pages: pages
			});
		}
		else if(template.options.searchType == "spelling"){
			if(yresp.totalhits > 0){
				// incorrect
/*				var olist = document.createElement('ol');
				for(var q in yresp.resultset_spell){
					var result = yresp.resultset_spell[q];
					
					var li = document.createElement('li');
					li.innerHTML = result.suggestion;
					olist.appendChild(li);
				}

				html += olist.outerHTML;
*/
				for(var q in yresp.resultset_spell){
					var strong = document.createElement('strong');
					strong.innerText =  yresp.resultset_spell[q].suggestion;
					html += strong.outerHTML;
				}
			}
			
			return({
				totalhits: yresp.totalhits,
				html: html,
			});
		}
	},
};
