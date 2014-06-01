
			/*
	xhr.overrideMimeType('text/plain; charset=x-user-defined');
	url="http://translate.google.com/translate_tts?tl="+lang+"&q="+text;
	xhr.open("GET", url,  true);
	xhr.send(null);			
*/			
			
			


var GoogleAPI = {
	insertedScript: false,
	loadedScript: false,
	
	ERROR_INIT: "Unable to load Google API services",
	
	WARNING_NORESULTS: "No Results",
	
	AppID: "ABQIAAAAVmJONdfE5k7LlcknP3TqaRRstlXHJJUKdlF-Qsx_D83Ynm-hNBRapqONhC9qDWL510hOkXN6Z1oltw",
	
	idTimeoutLoadscript: null,
	TIMEOUT_LOADSCRIPT: 30000,
	
	queue: [],

	Request: function(request/*tipObject, text, tab , msgSet, index, template*/){
		if(this.insertedScript == false){
			// insert jsapi into document, and wait for callback
			var script = document.createElement("script");
			script.src = "https://www.google.com/jsapi?key=" + GoogleAPI.AppID + "&callback=GoogleAPI.OnScriptLoaded";
			//script.src = "https://www.google.com/jsapi?callback=GoogleAPI.OnScriptLoaded";
			script.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(script);
			
			this.insertedScript = true;
			
			// not loaded timeout
			this.idTimeoutLoadscript = window.setTimeout(function(_GoogleAPI){
				// error all
				for(var x in _GoogleAPI.queue){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: {errorHTML: GoogleAPI.ERROR_INIT} });
				}
				// empty queue
				GoogleAPI.queue = [];			
			}, GoogleAPI.TIMEOUT_LOADSCRIPT, this);
		}	
	
		// add request to queue
		this.queue.push(request);//{tipObject: tipObject, text: text, tab: tab, msgSet: msgSet, index: index, template: template});
		// if the script has loaded, process teh queue. if not, let the queue be processed by OnScriptLoaded
		if(this.loadedScript == true)
			this.OnScriptLoaded();
	},

	Execute: function(tipObject, text, tab , msgSet, index, template){
		var arr = [
			{id: ID_TIPPOPUP_GOOGLELANGUAGEDETECT, func: this.DetectLanguage},
			{id: ID_TIPPOPUP_GOOGLETRANSLATE, func: this.Translate},
			{id: ID_TIPPOPUP_GOOGLEIMAGESEARCH, func: this.ImageSearch},
			{id: ID_TIPPOPUP_GOOGLETTS, func: this.TextToSpeech},
		];
		
		for(var a in arr){
			if(template.id == arr[a].id){
				arr[a].func(tipObject, text,tab, msgSet, index, template);
				break;
			}
		}
	},
		
	OnScriptLoaded: function(){
		// if there's anything in the queue, load the appropriate service and the callback will fire off
		// those applicable from the queue
		this.loadedScript = true;
		// clear timeout script
		if(this.idTimeoutLoadscript != null){
			clearTimeout(this.idTimeoutLoadscript);
			this.idTimeoutLoadscript = null;
		}

		if(google == null)		// unlikely
			return;
		
		// load specific module
		var arr = [
			{ids: [ID_TIPPOPUP_GOOGLEIMAGESEARCH], 
				moduleName: "search", moduleVersion: 1, callback: this.OnLoadSearch},
			{ids: [ID_TIPPOPUP_GOOGLETRANSLATE, ID_TIPPOPUP_GOOGLELANGUAGEDETECT, ID_TIPPOPUP_GOOGLETTS],
				moduleName: "language", moduleVersion: 1, callback: this.OnLoadLanguage},
		];
			
		for(var q in this.queue){
			// each callback will remove all applicable from the queue
			for(var a in arr){
				if(arr[a].ids.indexOf(this.queue[q].template.id) != -1)
					google.load(arr[a].moduleName, arr[a].moduleVersion, {"callback" : arr[a].callback});
			}
		}
	},
	
	OnLoadSearch: function(){
		GoogleAPI.OnLoadModule("search");
	},
		
	OnLoadLanguage: function(){
		GoogleAPI.OnLoadModule("language");
	},
	
	OnLoadModule: function(moduleName){
		var arrModules = [
			{moduleName: "search", ids: [ID_TIPPOPUP_GOOGLEIMAGESEARCH]},
			{moduleName: "language", ids: [ID_TIPPOPUP_GOOGLETRANSLATE, ID_TIPPOPUP_GOOGLELANGUAGEDETECT, ID_TIPPOPUP_GOOGLETTS]},
		];
	
		// match teh modulename to the type of search it needs to extract from the queue
		var module;
		for(var x in arrModules){
			if(arrModules[x].moduleName == moduleName){
				module = arrModules[x];
				break;
			}
		}
		if(module == null)
			return;
		
		// check module actually exists now
		var existsModule = google[module.moduleName] == null ? false : true;
	
		for(var x=this.queue.length-1; x>=0; x--){
			var q = this.queue[x];
			
			// execute if our module definition includes our id
			if(module.ids.indexOf(q.template.id) != -1){
				// inform tip if module doesnt exist
				if(existsModule == true)
					this.Execute(q.tipObject, q.text, q.tab, q.msgSet, q.index, q.template);
				else{
					SendRequestWithTabIfPossible(q.tab,{
						msg: q.msgSet, index: q.index, templateId: q.template.id,
						data: {
							errorHTML: GoogleAPI.ERROR_INIT,
						}
					});
				}
				
				this.queue.splice(x,1);
			}
		}
	},
		
	//////

	ImageSearch: function(tipObject, text, tab, msgSet, index, template){
/*		function SendResult(html, cursor, error, restrictToHost, tab, msgSet, index){
			SendRequestWithTabIfPossible(tab, { msg: msgSet, index: index, 
				data: {html: html, error: error, cursor: cursor, restrictToHost: restrictToHost} });
		}
	*/
		function GetRestrictionValue(restrictionType, valueLocal){
			var arr = [
				{restrictionType: google.search.Search.RESTRICT_SAFESEARCH, map: [
					{valueLocal: "active", valueGoogle: google.search.Search.SAFESEARCH_STRICT},
					{valueLocal: "moderate", valueGoogle: google.search.Search.SAFESEARCH_MODERATE},
					{valueLocal: "off", valueGoogle: google.search.Search.SAFESEARCH_OFF}]
				},
				{restrictionType: google.search.ImageSearch.RESTRICT_IMAGESIZE, map: [
					{valueLocal: "small", valueGoogle: google.search.ImageSearch.IMAGESIZE_SMALL},
					{valueLocal: "medium", valueGoogle: google.search.ImageSearch.IMAGESIZE_MEDIUM},
					{valueLocal: "large", valueGoogle: google.search.ImageSearch.IMAGESIZE_LARGE},
					{valueLocal: "xlarge", valueGoogle: google.search.ImageSearch.IMAGESIZE_EXTRA_LARGE}]
				},
				{restrictionType: google.search.ImageSearch.RESTRICT_IMAGETYPE, map: [
					{valueLocal: "faces", valueGoogle: google.search.ImageSearch.IMAGETYPE_FACES},
					{valueLocal: "photo", valueGoogle: google.search.ImageSearch.IMAGETYPE_PHOTO},
					{valueLocal: "clipart", valueGoogle: google.search.ImageSearch.IMAGETYPE_CLIPART},
					{valueLocal: "lineart", valueGoogle: google.search.ImageSearch.IMAGETYPE_LINEART}]
				},
			];
			
			for(var a in arr){
				if(arr[a].restrictionType == restrictionType){
					for(var b in arr[a].map){
						if(arr[a].map[b].valueLocal == valueLocal)
							return arr[a].map[b].valueGoogle;
					}
				}
			}
			
			return null;
		}

		function SearchComplete(objectId, restrictToHost){
			// convert objectId into imageSearch object
			var tipObject = GetTipObject(objectId);
			if(tipObject == null)
				return;
			var imageSearch = tipObject.data.imageSearch;
			
			// Check that we got results
			if (imageSearch.results.length == 0){
				SendRequestWithTabIfPossible(tipObject.tab, {msg: tipObject.msgSet, index: tipObject.index, templateId: tipObject.templateId,
					data: {
						warningHTML: GoogleAPI.WARNING_NORESULTS,
						
						restrictToHost: restrictToHost,				// so although the warning is display, checkbox reflects choice
					}
				});
			}
			else{
				// sanitize results
				for(var a in imageSearch.results){
					//imageSearch.results[a].title = html_sanitize(imageSearch.results[a].title);
					imageSearch.results[a].title = imageSearch.results[a].title;
					//imageSearch.results[a].content = html_sanitize(imageSearch.results[a].content);
					imageSearch.results[a].content = imageSearch.results[a].content;
				}
			
				SendRequestWithTabIfPossible(tipObject.tab, { msg: tipObject.msgSet, index: tipObject.index, templateId: tipObject.templateId,
					data: {
						results: imageSearch.results,
					
						cursor: imageSearch.cursor,
						restrictToHost: restrictToHost,
					}
				});
			}
		}
	
		// reuse imagesearch object?
		var imageSearch = tipObject ? tipObject.data.imageSearch : null;
	
		// Create an Image Search instance.
		if(imageSearch == null){
			imageSearch = new google.search.ImageSearch();
			// associate the requests index (divPopup.id) with this object (id is index)
			AddTipObject(index, 
			{
				index: index, 
				tab: tab, 
				msgSet: msgSet,
				templateId: template.id, 
				data: {imageSearch: imageSearch}
			});
		}

		imageSearch.setNoHtmlGeneration();
		
		// options/restrictions
		imageSearch.setResultSetSize(8);
		imageSearch.setSiteRestriction(template.options.restrictToHost == true ? template.sessionData.hostname : null);
		var arr = [
			{restrict: google.search.Search.RESTRICT_SAFESEARCH, option: template.options.restrictSafeSearch},
			{restrict: google.search.ImageSearch.RESTRICT_IMAGESIZE, option: template.options.restrictImageSize, optionEnable: template.options.enableRestrictImageSize},
			{restrict: google.search.ImageSearch.RESTRICT_IMAGETYPE, option: template.options.restrictImageType, optionEnable: template.options.enableRestrictImageType},];
		for(var q in arr){
			if(arr[q].optionEnable == null || arr[q].optionEnable == true)
				imageSearch.setRestriction(arr[q].restrict, GetRestrictionValue(arr[q].restrict, arr[q].option));
		}
	
		// Set searchComplete as the callback function when a search is 
		// complete.  The imageSearch object will have results in it.
		imageSearch.setSearchCompleteCallback(this, SearchComplete, [index, (template.options.restrictToHost == true) ? true : false]);
		// Find me a beautiful car.
		imageSearch.execute(text);
	},
	
	Translate: function(tipObject, text, tab, msgSet, index, template){
		if(template.options.destLang == null || template.options.destLang.length == 0)
			return;
/*
		function SendResult(text, error, codeLanguage){
			// convert to proper name (not using our internal list)
			var nameLanguage = null;
			if(codeLanguage)
				nameLanguage = this.GetLanguageName(codeLanguage);

			SendRequestWithTabIfPossible(tab, { msg: msgSet, index: index, 
				data: {error: error, note: text, codeLanguage: codeLanguage, nameLanguage: nameLanguage} });
		}
*/			

		// limit is 5000 uri-encoding characters, only in POST mode
		// 1250 seems to be real limit though)
		var srcText = text.substring(0,5000);
		
		google.language.translate(srcText, template.options.srcLang ? template.options.srcLang : '', template.options.destLang, function(result){
			if(result.error){
				SendRequestWithTabIfPossible(tab,{msg: msgSet, index: index, templateId: template.id, 
					data: {
						//errorHTML: html_sanitize(result.error.message),
						errorHTML: result.error.message,
					}
				});
			
//				SendResult(null, result.error.message)
			}else if(result.translation){
				// if date has changed, reset counter
				var now = new Date();
				var dateString = now.toDateString(now);
				// probably inaccurate, as our date start/end isnt same as server...
				if(dateString != GetPreference(PREFERENCE_TRANSLATEDCHARS_DATESTRING)){
					SetPreference(PREFERENCE_TRANSLATEDCHARS_DATESTRING, dateString);
					SetPreference(PREFERENCE_TRANSLATEDCHARS, 0);
				}
				
				// count daily letters translated
				var numCharCount = new Number(GetPreference(PREFERENCE_TRANSLATEDCHARS));
				if (isNaN(numCharCount) == false){
					numCharCount += encodeURIComponent(srcText).length;
					SetPreference(PREFERENCE_TRANSLATEDCHARS, numCharCount);
				}
			
				// html entity decode
				var ta = document.createElement("textarea");
				ta.innerHTML = result.translation.replace(/</g,"&lt;").replace(/>/g,"&gt;");

				// can come from tab or popup
				SendRequestWithTabIfPossible(tab,{msg: msgSet, index: index, templateId: template.id, 
					data: {
						//note: html_sanitize(ta.value),
						note: ta.value,
						codeSrcLanguage: result.detectedSourceLanguage,
						nameSrcLanguage: GoogleAPI.InternalGetLanguageName(result.detectedSourceLanguage),
						urlSrcLanguageIcon: GoogleAPI.GetLanguageInfo(result.detectedSourceLanguage).urlFlag,
						
						nameDestLanguage: GoogleAPI.InternalGetLanguageName(template.options.destLang),
						urlDestLanguageIcon: GoogleAPI.GetLanguageInfo(template.options.destLang).urlFlag,
					}
				});
//				SendResult(ta.value, null, result.detectedSourceLanguage);
			}
		});		
	},
		
	DetectLanguage: function(tipObject, text, tab, msgSet, index, template){
		google.language.detect(text, function(result){
			SendRequestWithTabIfPossible(tab,{
				msg: msgSet, index: index, templateId: template.id, 
				data: {
					//errorHTML: result.error ? html_sanitize(result.error.message) : null,
					errorHTML: result.error ? result.error.message : null,
					isReliable: result.isReliable,
					confidence: result.confidence,
					
					codeLanguage: result.language,
					nameLanguage: GoogleAPI.InternalGetLanguageName(result.language),
					
					srcLanguageIcon: GoogleAPI.GetLanguageInfo(result.language).urlFlag,
				}
			});
		});
	},
	
	TextToSpeech: function(tipObject, text, tab, msgSet, index, template){
		function GetFallbackLanguage(language){
			// override fallback for galician
			var arrException = [
				{find: "gl", replace: "es"}
			];
			
			for(var h=0; h<arrException.length; h++){
				if(arrException[h].find == language){
					language = arrException[h].replace;
					break;
				}
			}
		
			return language;
		}
	
		if(template.options.autoDetectLanguage == true){
			google.language.detect(text, function(result){
				//
				var languageFallback;
				if(result.error || result.language == null)
					languageFallback = template.options.language;	// user supplied
				else{
					// if the fallback language specific to the detected language is the same, use the user supplied fallback language
					languageFallback = GetFallbackLanguage(result.language);
					if(languageFallback == result.language)
						languageFallback = template.options.language;
				}

				SendRequestWithTabIfPossible(tab, {
					msg: msgSet, index: index, templateId: template.id, 
					data: {
//						errorHTML: result.error ? result.error.message : null,		// existance of error means use fallback
						isReliable: result.isReliable,
						confidence: result.confidence,
					
						url: "http://translate.google.com/translate_tts?tl=" + 
							((result.error || result.language == null) ? languageFallback : result.language) + 
							"&q=" + text.substr(0, 100),

						urlFallback: (result.error || result.language == null) ? null : 
							("http://translate.google.com/translate_tts?tl=" + 
							languageFallback + 
							"&q=" + text.substr(0, 100)),

						codeLanguage: (result.error || result.language == null) ? 
							languageFallback : result.language,		// default
						codeLanguageFallback: languageFallback,
						
						spokenLanguageName: GoogleAPI.InternalGetLanguageName(result.language),
						spokenLanguageNameFallback: GoogleAPI.InternalGetLanguageName(languageFallback),
						
						srcSpokenLanguageIcon: GoogleAPI.GetLanguageInfo(result.language).urlFlag,
						srcSpokenLanguageIconFallback: GoogleAPI.GetLanguageInfo(languageFallback).urlFlag,
					}
				});
			});
		}
		else{
			var languageFallback = GetFallbackLanguage(template.options.language);
			if(languageFallback == template.options.language)
				languageFallback = "en";		// ultimate default
		
			SendRequestWithTabIfPossible(tab, {
				msg: msgSet, index: index, templateId: template.id, 
				data: {
					url: "http://translate.google.com/translate_tts?tl=" + 
						template.options.language + 
						"&q=" + text.substr(0, 100),
					urlFallback: "http://translate.google.com/translate_tts?tl=" + 
						languageFallback + 
						"&q=" + text.substr(0, 100),
					
					codeLanguage: template.options.language,
					codeLanguageFallback: languageFallback,
					
					spokenLanguageName: GoogleAPI.InternalGetLanguageName(template.options.language),
					spokenLanguageNameFallback: GoogleAPI.InternalGetLanguageName(languageFallback),
					
					srcSpokenLanguageIcon: GoogleAPI.GetLanguageInfo(template.options.language).urlFlag,
					srcSpokenLanguageIconFallback: GoogleAPI.GetLanguageInfo(languageFallback).urlFlag,
				}
			});
		}
	},
	
	///////////////////////////////////////////////////////////////////////////////////////
	// library must have been loaded before using this. More thorough, though
	InternalGetLanguageName: function(codeLanguage){
		if(codeLanguage){
			for(var x in google.language.Languages){
				if (google.language.Languages[x] == codeLanguage)
					return x.toLowerCase().capitalize().replace("_", " ");
			}
		}
		
		return "?";
	},
/*	
	GetLanguageIcon: function(bcp47code){
		// convert wikipedia domain (en.blah) to flag image
		var fileName = 'unknown';		// default
		if(bcp47code){
			for(var q in GoogleAPI.arrLanguages){
				if(GoogleAPI.arrLanguages[q].code == bcp47code){
					if(GoogleAPI.arrLanguages[q].fileName)
						fileName = GoogleAPI.arrLanguages[q].fileName;
					break;
				}
			}
		}
		
		return chrome.extension.getURL('img/flags/'+fileName+'.png');
	},

	GetLanguageName: function(bcp47code){
		for(x in GoogleAPI.arrLanguages){
			if(GoogleAPI.arrLanguages[x].code == bcp47code)
				return GoogleAPI.arrLanguages[x].name;
		}
		
		return null;
	},
	*/
	GetLanguageInfo: function(bcp47code){
		var fileName = 'unknown';		// default
		var name = null;
		var supported = false;
		
		if(bcp47code){
			for(var q in GoogleAPI.arrLanguages){
				if(GoogleAPI.arrLanguages[q].code == bcp47code || (GoogleAPI.arrLanguages[q].altValues && GoogleAPI.arrLanguages[q].altValues.indexOf(bcp47code) != -1)){
					if(GoogleAPI.arrLanguages[q].fileName)
						fileName = GoogleAPI.arrLanguages[q].fileName;
					
					name = GoogleAPI.arrLanguages[q].name;
					supported = GoogleAPI.arrLanguages[q].supported;
					break;
				}
			}
		}
	
		return({
			urlFlag: chrome.extension.getURL('img/flags/'+fileName+'.png'),
			name: name,
			supported: supported
		});
	},

	// altValues are bing codes
	arrLanguages: [
		{name: "Afrikaans", code: "af", supported: true, fileName: 'za'},
		{name: "Albanian", code: "sq", supported: true, fileName: 'al'},
		{name: "Amharic", code: "am"},
		{name: "Arabic", code: "ar", supported: true, fileName: 'arabic'},
		{name: "Armenian", code: "hy", fileName: 'am'},
		{name: "Azerbaijani", code: "az", fileName: 'az'},
		{name: "Basque", code: "eu", fileName: 'basque'},
		{name: "Belarusian", code: "be", supported: true, fileName: 'by'},
		{name: "Bengali", code: "bn", fileName: 'bd'},
		{name: "Bihari", code: "bh"},
		{name: "Breton", code: "br", fileName: 'brittany'},
		{name: "Bulgarian", code: "bg", supported: true, fileName: 'bg'},
		{name: "Burmese", code: "my", fileName: 'mm'},
		{name: "Catalan", code: "ca", supported: true, fileName: 'catalonia'},
		{name: "Cherokee", code: "chr"},
		{name: "Chinese", code: "zh", supported: true, fileName: 'cn'},
		{name: "Chinese (Simplified)", code: "zh-CN", altValues: ["zh-chs","zh-cn"], supported: true, fileName: 'cn'},
		{name: "Chinese (Traditional)", code: "zh-TW", altValues: ["zh-cht","zh-hk","zh-tw"], supported: true, fileName: 'cn'},
		{name: "Corsican", code: "co"},
		{name: "Croatian", code: "hr", supported: true, fileName: 'hr'},
		{name: "Czech", code: "cs", supported: true, fileName: 'cs'},
		{name: "Danish", code: "da", supported: true, fileName: 'dk'},
		{name: "Dhivehi", code: "dv"},
		{name: "Dutch", code: "nl", supported: true, fileName: 'nl'},
		{name: "English", code: "en", supported: true, fileName: 'england'},
		{name: "Dhivehi", code: "dv"},
		{name: "Esperanto", code: "eo"},
		{name: "Estonian", code: "et", supported: true, fileName: 'ee'},
		{name: "Filipino", code: "tl", supported: true, fileName: 'ph'},
		{name: "Finnish", code: "fi", supported: true, fileName: 'fi'},
		{name: "French", code: "fr", supported: true, fileName: 'fr'},
		{name: "Frisian", code: "fy"},
		{name: "Galician", code: "gl", supported: true, fileName: 'galicia'},
		{name: "Georgian", code: "ka", fileName: 'ge'},
		{name: "German", code: "de", supported: true, fileName: 'de'},
		{name: "Greek", code: "el", supported: true, fileName: 'gr'},
		{name: "Gujarati", code: "gu"},
		{name: "Haitian Creole", code: "ht", supported: true, fileName: 'ht'},
		{name: "Hebrew", code: "iw", supported: true, fileName: 'il'},
		{name: "Hindi", code: "hi", supported: true, fileName: 'in'},
		{name: "Hungarian", code: "hu", supported: true, fileName: 'hu'},
		{name: "Icelandic", code: "is", supported: true, fileName: 'is'},
		{name: "Indonesian", code: "id", supported: true, fileName: 'id'},
		{name: "Inuktitut", code: "iu"},
		{name: "Irish", code: "ga", supported: true, fileName: 'ie'},
		{name: "Italian", code: "it", supported: true, fileName: 'it'},
		{name: "Japanese", code: "ja", supported: true, fileName: 'jp'},
		{name: "Javanese", code: "jw", fileName: 'id'},
		{name: "Kannada", code: "kn"},
		{name: "Kazakh", code: "kk", fileName: 'kz'},
		{name: "Khmer", code: "km", fileName: 'kh'},
		{name: "Korean", code: "ko", supported: true, fileName: 'kr'},
		{name: "Kyrgyz", code: "ky", fileName: 'kg'},
		{name: "Lao", code: "lo", fileName: 'la'},
		{name: "Latin", code: "la"},
		{name: "Latvian", code: "lv", supported: true, fileName: 'lv'},
		{name: "Lithuanian", code: "lt", supported: true, fileName: 'lt'},
		{name: "Luxembourgish", code: "lb", fileName: 'lu'},
		{name: "Macedonian", code: "mk", supported: true, fileName: 'mk'},
		{name: "Malay", code: "ms", supported: true, fileName: 'my'},
		{name: "Mayalam", code: "mt"},
		{name: "Maltese", code: "mt", supported: true, fileName: 'mt'},
		{name: "Maori", code: "mi"},
		{name: "Marathi", code: "mr", fileName: 'in'},
		{name: "Mongolian", code: "mn", fileName: 'mn'},
		{name: "Nepali", code: "ne", fileName: 'np'},
		{name: "Norwegian", code: "no", supported: true, fileName: 'no'},
		{name: "Occitan", code: "oc"},
		{name: "Oriya", code: "or"},
		{name: "Pashto", code: "ps", fileName: 'af'},
		{name: "Persian", code: "fa", supported: true},
		{name: "Polish", code: "pl", supported: true, fileName: 'pl'},
		{name: "Portuguese (Brazil)", code: "pt", supported: true, fileName: 'pt'},
		{name: "Portuguese (Portugal)", code: "pt-PT", supported: true, fileName: 'pt'},
		{name: "Punjabi", code: "pa"},
		{name: "Quechua", code: "qu"},
		{name: "Romanian", code: "ro", supported: true, fileName: 'ro'},			
		{name: "Russian", code: "ru", supported: true, fileName: 'ru'},
		{name: "Sanskrit", code: "sa", fileName: 'in'},
		{name: "Scots Gaelic", code: "gd", fileName: 'scotland'},
		{name: "Serbian", code: "sr", supported: true, fileName: 'sb'},			
		{name: "Sindhi", code: "sd", fileName: 'pk'},
		{name: "Sinhalese", code: "si", fileName: 'lk'},
		{name: "Slovak", code: "sk", supported: true, fileName: 'sk'},
		{name: "Slovenian", code: "sl", supported: true, fileName: 'si'},			
		{name: "Spanish", code: "es", supported: true, fileName: 'es'},
		{name: "Sudanese", code: "su", fileName: 'sd'},
		{name: "Swahili", code: "sw", supported: true},	
		{name: "Swedish", code: "sv", supported: true, fileName: 'se'},
		{name: "Syriac", code: "syr", fileName: 'sy'},		
		{name: "Tagalog", code: "tl", supported: true, fileName: 'ph'},			
		{name: "Tajik", code: "tg", fileName: 'tj'},
		{name: "Tamil", code: "ta", fileName: 'lk'},
		{name: "Tatar", code: "tt"},
		{name: "Telugu", code: "te"},
		{name: "Thai", code: "th", supported: true, fileName: 'th'},
		{name: "Tibetan", code: "bo"},
		{name: "Tonga", code: "to", fileName: 'to'},
		{name: "Turkish", code: "tr", supported: true, fileName: 'tr'},			
		{name: "Uighur", code: "ug"},
		{name: "Ukrainian", code: "uk", supported: true, fileName: 'ua'},
		{name: "Urdu", code: "ur"},
		{name: "Uzbek", code: "uz", fileName: 'uz'},
		{name: "Vietnamese", code: "vi", supported: true, fileName: 'vn'},			
		{name: "Welsh", code: "cy", supported: true, fileName: 'wales'},
		{name: "Yiddish", code: "yi", supported: true},
		{name: "Yoruba", code: "yo"},
	],
	
};