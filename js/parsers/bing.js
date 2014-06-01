// GetLanguagesForSpeak 1st Nov 2011 ["ca","ca-es","da","da-dk","de","de-de","en","en-au","en-ca","en-gb","en-in","en-us","es","es-es","es-mx","fi","fi-fi","fr","fr-ca","fr-fr","it","it-it","ja","ja-jp","ko","ko-kr","nb-no","nl","nl-nl","no","pl","pl-pl","pt","pt-br","pt-pt","ru","ru-ru","sv","sv-se","zh-chs","zh-cht","zh-cn","zh-hk","zh-tw"]

var Bing = {
	AppID: '736B9EDC859ED6916C020E0D75E4436ABC99D2EE',
	
	arrLanguagesForSpeak: null,
	arrRequestQueue: [],
	
	ERROR_JSONPARSE: "The server returned an incorrectly formatted response",
	ERROR_UNKNOWN: "An unknown error has occurred",

	CLASS_BING_BUTTONAUDIOPLAYER: "whywontchromeplaywavfileswithoutlockingupandwhyusewavanyway",
	
	Request: function(request/*tipObject, text, tab, msgSet, index, template*/){
		var xhr = new XMLHttpRequest();
		var url;
		
		// sourceType TTS not part of bing
		if(request.template.options.sourceType == "TTS"){
			// cache the languagesforspeak, and make the real request when it replies
			if(this.arrLanguagesForSpeak == null){
				url = "http://api.microsofttranslator.com/V2/Ajax.svc/" + "GetLanguagesForSpeak" + "?" + 
					"appId=" + this.AppID;
				xhr.open('GET', url, true);
				
				xhr.Bing = this;
				
				xhr.onreadystatechange = function (){
					if (xhr.readyState == 4){
						// html error (hopefully still applicable even though it might not be for the desired message
						try{
							if (xhr.status != 200){
								var errorHTML = (xhr.status == 0 ? Bing.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);
		
								// fail all in queue
								var err = new Error();
								throw err;
							}

							errorHTML = Bing.ERROR_JSONPARSE;						
							this.Bing.arrLanguagesForSpeak = JSON.parse(xhr.responseText);

							if(this.Bing.arrLanguagesForSpeak == null){
								var err = new Error();
								throw err;
							}
						}catch(e){
							// fail all in queue
							for(var q in Bing.arrRequestQueue){
								var req = this.Bing.arrRequestQueue[q];
								
								SendRequestWithTabIfPossible(req.tab, { msg: req.msgSet, index: req.index, templateId: req.template.id, 
									data: {errorHTML: errorHTML} });
							}
							
							this.Bing.arrRequestQueue = [];
							return;
						}
						
						// success! re-request and empty queue
						for(var q in this.Bing.arrRequestQueue)
							this.Bing.Request(Bing.arrRequestQueue[q]);

						this.Bing.arrRequestQueue = [];
					}// end xhr.readyState ==4
				};// end onreadystatechange
			
				// queue for processing on readystatechange
				this.arrRequestQueue.push(request);
				
				xhr.send(null);
				return;
			}

			// detect language and speak it in that language?
			if(/*request.template.options.language == "" && */request.template.options.autoDetectLanguage == true){
				url = "http://api.microsofttranslator.com/V2/Ajax.svc/" + "Detect" + "?" + 
					"appId=" + this.AppID + "&" +
					"text=" + encodeURIComponent( request.text.substr(0,512) );
				xhr.open('GET', url, true);
				
				// callback data
				xhr.req = request;
				xhr.Bing = this;
					
				xhr.onreadystatechange = function (){
					if (xhr.readyState == 4){
						var detectedLanguage;
					
						// html error (hopefully still applicable even though it might not be for the desired message
						try{
							if (xhr.status != 200){
								var errorHTML = (xhr.status == 0 ? Bing.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);

								var err = new Error();
								throw err;
							}

							errorHTML = Bing.ERROR_JSONPARSE;						

							detectedLanguage = JSON.parse(xhr.responseText);
							if(detectedLanguage == null){
								var err = new Error();
								throw err;
							}
						}catch(e){
							// fail this one
							SendRequestWithTabIfPossible(xhr.req.tab, { msg: xhr.req.msgSet, index: xhr.req.index, templateId: xhr.req.template.id, 
								data: {errorHTML: errorHTML} });
							return;
						}
			
						// success! modify template (not original) and re-request
//						xhr.req.template.detectedLanguage = detectedLanguage;
//						xhr.req.template.options.language = detectedLanguage;
						xhr.req.template.options.autoDetectLanguage = false;
						xhr.req.template.options.detectedLanguage = detectedLanguage;
						
						this.Bing.Request(xhr.req);
					}// end xhr.readyState ==4
				};// end onreadystatechange

				xhr.send(null);
				return;
			}// end if detect
		
			// verify desired language is in Bing.arrLanguagesForSpeak, and if not replace it with english
			function IsSpeakableLanguage(lang){
				// perhaps lang is in google format
				var knownLanguageInfo = Bing.GetLanguageInfo(lang);
				if(knownLanguageInfo && knownLanguageInfo.lang != null)
					lang = knownLanguageInfo.lang;
			
				for(var x in Bing.arrLanguagesForSpeak){
					if(Bing.arrLanguagesForSpeak[x] == lang)
						return lang;//true;
				}
				return null;//false;
			}
			
			var bingForSpeakLanguage, language;
			var language;// = null;//template.options.language;//"en";		// fallback lang

			if(request.template.options.detectedLanguage && (bingForSpeakLanguage = IsSpeakableLanguage(request.template.options.detectedLanguage)) != null)
				language = bingForSpeakLanguage;//request.template.options.detectedLanguage;
			else if( (bingForSpeakLanguage = IsSpeakableLanguage(request.template.options.language)) != null)	// fallback
				language = bingForSpeakLanguage;//request.template.options.language;
			else
				language = "en";
		
			
			url = "http://api.microsofttranslator.com/V2/Ajax.svc/" + request.template.options.method + "?" + 
				"appId=" + this.AppID + "&" +
				"language=" + language + "&" +
				"format=audio/wav&" +
				"text=" + encodeURIComponent(request.text.substr(0,512));
			
			var languageInfo = Bing.GetLanguageInfo(language);
						
			xhr.spokenLanguage = language;
			xhr.spokenLanguageName = languageInfo.name;
//			xhr.spokenLanguageName = (languageInfo.name && languageInfo.forSpeak == true) ? 
//				languageInfo.name : "Unknown";//;//Bing.GetLanguageNameForSpeak(language);
			xhr.srcSpokenLanguageIcon = languageInfo.urlFlag;//Bing.GetLanguageIcon(language);
		}
		else if(request.template.options.sourceType == "method"){
			url = "http://api.microsofttranslator.com/V2/Ajax.svc/" + request.template.options.method + "?" + 
            "appId=" + this.AppID + "&" +
            (request.template.options.srcLang && request.template.options.srcLang.length > 0 ? ("from=" + request.template.options.srcLang + "&") : "") +
            "to=" + request.template.options.destLang + "&" +
            "text=" + encodeURIComponent(request.text.substr(0,512));
		}
		else{
			url = "http://api.bing.net/json.aspx?" +
				"AppId=" + Bing.AppID + "&" +
				"sources=" + request.template.options.sourceType + "&" +
				"query=" + encodeURIComponent(request.text.substr(0,512));
		}
	
		
		xhr.open('GET', url, true);
		xhr.Bing = this;

		xhr.onreadystatechange = function (){
			if (xhr.readyState == 4){
				// html error
				if (xhr.status != 200){
					var errorHTML = (xhr.status == 0 ? Bing.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);

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
						data: {errorHTML: Bing.ERROR_JSONPARSE} });
					return;
				}
			
				var data = xhr.Bing.Parse(res, xhr, request.template);//.ysearchresponse, text, template);//, index/*, tipObject*/);
				if(data){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: data,} );
				}
			}
		};
		
		xhr.send(null);				
	},
		
	Parse: function(res, xhr, template){
		// res depends on the sourceType
		if(template.options.sourceType == "TTS"){
			return({
				url: res,
				spokenLanguage: xhr.spokenLanguage,
				
				spokenLanguageName: xhr.spokenLanguageName,
				srcSpokenLanguageIcon: xhr.srcSpokenLanguageIcon,
			});
        }
        
        if(template.options.sourceType == "method"){
            if(template.options.method == "Translate"){
                var languageInfoDest = Bing.GetLanguageInfo(template.options.destLang);
                var languageInfoSrc = Bing.GetLanguageInfo(template.options.srcLang);
                
                // build returned object
                var out = {
                    note: res,
                    
                    nameSrcLanguage: languageInfoSrc.name,
                    urlSrcLanguageIcon: languageInfoSrc.urlFlag,
                };
                
                if(languageInfoDest){
                    out.nameDestLanguage = languageInfoDest.name;
                    out.urlDestLanguageIcon = languageInfoDest.urlFlag;
                    out.googleLanguageCodes = languageInfoDest.altValues;
                }
                
                return out;
            }
        }
	},
	
	// NB: NOT the dynamic arrLanguagesForSpeak which is requested from server
	// This should contain every MS language detectable and speakable (but probably wont. less important until text translate supported)
	arrLanguageNames: [
		{name: "English", value: "en", forSpeak: true, fileName: 'england'},
		{name: "German", value: "de", forSpeak: true, fileName: 'de'},
		{name: "Spanish", value: "es", forSpeak: true, fileName: 'es'},
		{name: "French", value: "fr", forSpeak: true, fileName: 'fr'}, 
		{name: "Italian", value: "it", forSpeak: true, fileName: 'it'}, 
		{name: "Portuguese", value: "pt", forSpeak: true, fileName: 'pt'}, 
		{name: "Russian", value: "ru", forSpeak: true, fileName: 'ru'}, 
		{name: "Japanese", value: "ja", forSpeak: true, fileName: 'jp'}, 
		{name: "Korean", value: "ko", forSpeak: true, fileName: 'kr'}, 
		{name: "Chinese Simplified", value: "zh-chs", altValues: ["zh-CN"], forSpeak: true, fileName: 'cn'}, 		// altValues for google
		{name: "Chinese Traditional", value: "zh-cht", altValues: ["zh-TW"], forSpeak: true, fileName: 'cn'},
                       {name: "Chinese Simplified (ROC)", value: "zh-cn", altValues: ["zh-CN"], forSpeak: true, fileName: 'cn'},
                       {name: "Chinese Traditional (HK)", value: "zh-hk", altValues: ["zh-TW"], forSpeak: true, fileName: 'cn'},                       
                       {name: "Chinese Traditional (TW)", value: "zh-tw", altValues: ["zh-TW"], forSpeak: true, fileName: 'cn'},                       
                       
                       {name: "Catalan", value: "ca", forSpeak: true, fileName: 'catalonia'},
                       {name: "Polish", value: "pl", forSpeak: true, fileName: 'pl'},                       
        {name: "Danish", value: "da", forSpeak: true, fileName: 'dk'},
                       {name: "Dutch", value: "nl", forSpeak: true, fileName: 'nl'},
        {name: "Finnish", value: "fi", forSpeak: true, fileName: 'fi'},
        {name: "Swedish", value: "sv", forSpeak: true, fileName: 'se'},
		
		{name: "Arabic", value: "ar", filename: 'arabic'},
		{name: "Bulgarian", value: "bg", fileName: 'bg'},
        {name: "Czech", value: "cs", fileName: 'cs'},
		{name: "Estonian", value: "et", fileName: 'ee'},
         {name: "Greek", value: "el", fileName: 'gr'},
		{name: "Hiatian Creole", value: "ht", fileName: 'ht'},
         {name: "Hindi", value: "hi", fileName: 'in'},                       
		{name: "Hebrew", value: "he", fileName: 'il'},
		{name: "Hungarian", value: "hu", fileName: 'hu'},
		{name: "Indonesian", value: "id", fileName: 'id'},
		{name: "Latvian", value: "lv", fileName: 'lv'},
		{name: "Lithuanian", value: "lt", fileName: 'lt'},
		{name: "Norwegian", value: "no", fileName: 'no'},
		{name: "Romanian", value: "ro", fileName: 'ro'},
		{name: "Slovak", value: "sk", fileName: 'sk'},
		{name: "Slovenian", value: "sl", fileName: 'si'},
		{name: "Thai", value: "th", fileName: 'th'},
		{name: "Turkish", value: "tr", fileName: 'tr'},
		{name: "Ukrainian", value: "uk", fileName: 'ua'},
		{name: "Vietnamese", value: "vi", fileName: 'vn'},
	],

	GetLanguageInfo: function(value){
		var fileName = 'unknown';		// default
		var name = "Unknown";//null;
		var forSpeak = false;
		var altValues = null;
		var lang = null;
		
		if(value && value.length > 0){
			for(var q in Bing.arrLanguageNames){
				// include altvalues
				if(Bing.arrLanguageNames[q].value == value || (Bing.arrLanguageNames[q].altValues && Bing.arrLanguageNames[q].altValues.indexOf(value) != -1) ){
					if(Bing.arrLanguageNames[q].fileName)
						fileName = Bing.arrLanguageNames[q].fileName;
					
					name = Bing.arrLanguageNames[q].name;
					forSpeak = Bing.arrLanguageNames[q].forSpeak;
					altValues = Bing.arrLanguageNames[q].altValues;
					lang = Bing.arrLanguageNames[q].value;
					break;
				}
			}
		}
	
		return({
			urlFlag: chrome.extension.getURL('img/flags/'+fileName+'.png'),
			name: name,
			forSpeak: forSpeak,
			lang: lang,
			altValues: altValues,
		});
	},
/*	
	GetLanguageIcon: function(value){
		var fileName = 'unknown';		// default
		if(value){
			for(var q in Bing.arrLanguageNames){
				if(Bing.arrLanguageNames[q].value == value){
					if(Bing.arrLanguageNames[q].fileName)
						fileName = Bing.arrLanguageNames[q].fileName;
					break;
				}
			}
		}
		
		return chrome.extension.getURL('img/flags/'+fileName+'.png');
	},

	GetLanguageNameForSpeak: function(value){
		if(value){
			for(var x in Bing.arrLanguageNames){
				if(Bing.arrLanguageNames[x].value == value){
					if(Bing.arrLanguageNames[x].forSpeak == true)
						return Bing.arrLanguageNames[x].name;
					break;
				}
			}
		}
		
		return "?";
	}*/
};
