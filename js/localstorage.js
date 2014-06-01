///////////////////////////////////////////////
// const

var DISPLAY_MSTRANSLATE = true;

var CONFIRM_REMOVEINOTHERSTORE = "The following page already exists in the other storage database:\n\n<<URL>>\n\nHighlights can only be stored in one databse. If you proceed the other entry will be removed before this highlight is imported.\n\nDo you wish to proceed with this import?";
var CONFIRM_URLEXISTSINSTORE = "One or more of the pages you are importing already exist in this database.\n\nImporting will REPLACE existing highlights for these pages, not merge with the existing highlights.\n\nDo you wish to continue?";

var PREFBOOL_TRUE = "yes";
var PREFBOOL_FALSE = "no";
var PREFVAL_NULL = "nullValue";

var HIGHLIGHTSTYLE_TILE = "tile";
var HIGHLIGHTSTYLE_SMEAR = "smear";

var DESCRIPTION_WIKIPEDIA = "Encyclopedia containing more than 13 million articles in 266 languages";
var DESCRIPTION_WIKTIONARY = "Dictionary cataloging meanings, synonyms, etymologies and translations.";
var DESCRIPTION_WIKIBOOKS = "Collection of free educational textbooks and learning materials.";
var DESCRIPTION_WIKIQUOTE = "Collection of quotations structured in numerous ways.";
var DESCRIPTION_WIKISOURCE = "Project to provide and translate free source documents, such as public domain texts.";
var DESCRIPTION_WIKIMEDIACOMMONS = "Repository of images, sounds, videos and general media, containing over 6 million files.";
var DESCRIPTION_WIKISPECIES = "Directory of species data on animalia, plantae, fungi, bacteria, archaea, protista and all other forms of life.";
var DESCRIPTION_WIKINEWS = "News source containing original reporting by citizen journalists from many countries.";
var DESCRIPTION_WIKIVERSITY = "Educational and research materials and activities.";

var DESCRIPTION_GOOGLETRANSLATE = "Google will end their free translation service on December 1st 2011, and will be reducing the daily quota of translations upto that date. Please use Bing Translate instead.";

var TRANSLATIONSTYLE_REPLACE = "replace";
var TRANSLATIONSTYLE_APPEND = "append";

var MOBILIZER_INSTAPAPER = "instapaper";
var MOBILIZER_GWT = "gwt";

////////////////////////////////////////////////////
// serialize

var MAGIC_SIMPLEHIGHLIGHT1 = "HiThereImASimpleHighlightExportedHighlightsFileByeBye";	// "BadDreamFancyDress"
var MAGIC_SIMPLEHIGHLIGHT2 = "SimpleHighlightExportedHighlightsFile";
var VERSION_EXPORTOBJECT = 2;

var ERROR_INVALIDOBJECT = "Unable to parse the file format.\n\nPerhaps it isn't a file exported by Simple Highlighter.";

////////////////////////////////////////////////////
// tippopup id

var ID_TIPPOPUP_GOOGLETRANSLATE = "googletranslate";
var ID_TIPPOPUP_GOOGLELANGUAGEDETECT = "googletranslatedetect";
var ID_TIPPOPUP_GOOGLEIMAGESEARCH = "googleimage";
var ID_TIPPOPUP_GOOGLETTS = "googletts";
var ID_TIPPOPUP_YAHOOWEB = "yahooweb";
var ID_TIPPOPUP_FLICKR = "flickr"
var ID_TIPPOPUP_TWITTER = "twitter";
var ID_TIPPOPUP_YAHOOSPELLING = "yahoospelling";
var ID_TIPPOPUP_MSTRANSLATE_TTS = "mstts";
var ID_TIPPOPUP_MSTRANSLATE_TRANSLATE = "mstrans";
var ID_TIPPOPUP_WIKIPEDIA = "wikipedia";
var ID_TIPPOPUP_WIKTIONARY = "wiktionary";
var ID_TIPPOPUP_WIKIVERSITY = "wikiversity";
var ID_TIPPOPUP_WIKIBOOKS = "wikibooks";
var ID_TIPPOPUP_WIKIQUOTE = "wikiquote";
var ID_TIPPOPUP_WIKISOURCE = "wikisource";
var ID_TIPPOPUP_WIKINEWS = "wikinews";
var ID_TIPPOPUP_WIKIMEDIACOMMONS = "commons";
var ID_TIPPOPUP_WIKISPECIES = "wikispecies";

var ID_TIPPOPUP_DUMMY_NATIVETTS = "nativetts"

////////////////////////////////////////////////////
// prefs

var PREFERENCE_FIXUPLEVEL = "fixup";
var PREFERENCE_MOBILIZER = "mobilizer";

var PREFERENCE_WARNONUNLOAD = "warnonunload";
var PREFERENCE_CONTEXTMENU = "contextmenu";
var PREFERENCE_PAGEACTION = "pageaction";
var PREFERENCE_SNIPPETMAX = "snippetmax";
var PREFERENCE_AUTOSAVE = "autosave"
var PREFERENCE_AUTOSAVE_STORE = "autosaveStore";

var PREFERENCE_HIGHLIGHTSTYLE = "highlightStyle";

var PREFERENCE_KEYFRAMES_FLASH = "keyframesFlash";
var PREFERENCE_FLASHDURATION = "flashDuration";
var PREFERENCE_FLASHITERATIONCOUNT = "flashIterationCount";
var PREFERENCE_FLASHDIRECTION = "flashDirection";

var PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS = "borderRadius";
var PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW = "boxShadow";
var PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING = "padding";
var PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_HIGHLIGHT = "alphaHighlight";
var PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW = "alphaShadow";

var PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS = "highlightStyle_Tile_BorderRadius";
var PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW = "highlightStyle_Tile_BoxShadow";
var PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING = "highlightStyle_Tile_Padding";
var PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_HIGHLIGHT = "highlightStyle_Tile_alphaHighlight";
var PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW = "highlightStyle_Tile_alphaShadow";

var PREFERENCE_AUTOTRANS_NOTE = "autoTransNote"
var PREFERENCE_TRANSNOTE_SRCLANG = "transNoteSrcLang";
var PREFERENCE_TRANSNOTE_DESTLANG = "transNoteDestLang";
var PREFERENCE_TRANSNOTE_SRCLANG_BING = "transNoteSrcLangBing";
var PREFERENCE_TRANSNOTE_DESTLANG_BING = "transNoteDestLangBing";
var PREFERENCE_AUTOTRANS_SNIPPET = "autoTransSnippet"
var PREFERENCE_TRANSSNIPPET_SRCLANG = "transSnippetSrcLang";
var PREFERENCE_TRANSSNIPPET_DESTLANG = "transSnippetDestLang";
var PREFERENCE_TRANSSNIPPET_SRCLANG_BING = "transSnippetSrcLangBing";
var PREFERENCE_TRANSSNIPPET_DESTLANG_BING = "transSnippetDestLangBing";

var PREFERENCE_SHOWTRANSLATEDSNIPPETS = "showTransSnippets";			// ie: state that new items get in the popup
var PREFERENCE_SHOWNOTES = "showTransHighlights";

var PREFERENCE_HL1 = "hl1";
var PREFERENCE_HL2 = "hl2";
var PREFERENCE_HL3 = "hl3";
var PREFERENCE_HL4 = "hl4";
var PREFERENCE_HL5 = "hl5";
var PREFERENCE_HL6 = "hl6";
var PREFERENCE_HL7 = "hl7";

var PREFERENCE_NATIVESPEAK = "menunativespeak";
var PREFERENCE_STOPNATIVESPEAK = "menunativestop";
var PREFERENCE_MOBILIZEPAGE = "mob";
var PREFERENCE_DELHL = "delhl";
var PREFERENCE_UNHL = "unhl";
var PREFERENCE_UNHL_ALL = "unhlall";
var PREFERENCE_SETNOTEHL = "setnotehl";
var PREFERENCE_SELECTHL = "selhl";
var PREFERENCE_TRANSHLTONOTE = "transhltonote";
var PREFERENCE_LOOKUP = "lookup";
var PREFERENCE_LOOKUP_OPENINNEW = "lookupopeninnew";
var PREFERENCE_LOOKUP_CREATEEMPTY = "lookupcreateempty";
var PREFERENCE_TIPPOPUP = "tippopup";
var PREFERENCE_TIPPOPUP_MULTIPLE = "tippopupmulti";

var PREFERENCE_TRANSLATEDCHARS = "translatedchars";
var PREFERENCE_TRANSLATEDCHARS_DATESTRING = "translatedcharsdate";

var PREFERENCE_STORESESSION = "storeSession";
var PREFERENCE_STORELOCAL = "storeLocal";

var PREFERENCE_POPUP_PIN = "popupPin";
var PREFERENCE_POPUP_TRANSLATIONSTYLE = "popupTranslationStyle";
var PREFERENCE_POPUP_SPEECHSERVICE = "popupSpeechService";
var PREFERENCE_POPUP_REMOVEDONATE = "popupRemoveDonate";
var PREFERENCE_POPUP_LOADCOUNT = "popupCount";


var PREFERENCE_LOOKUP_TEMPLATES = "lookuptemplates";
var PREFERENCE_LOOKUPPOPUP_PLACEMENT = "lookupPopupPlacement";
var PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT = "lookupPopupRememberPlacement";
//var PREFERENCE_LOOKUPPOPUP_OPACITY = "lookupPopupOpacity";
var PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE = "lookupPopupMouse";
var PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR = "lookupWordUnderCursor";

var PREFERENCE_TIPPOPUP_TEMPLATES = "tippopuptemplates";
var PREFERENCE_TIPPOPUP_MOUSEACTIVATE = "tippopupMouse";
var PREFERENCE_TIPPOPUP_WORDUNDERCURSOR = "tippopupWordUnderCursor";

//////////////////////////
// stringify these before storage

var _arrayStringify = [PREFERENCE_HL1, PREFERENCE_HL2, PREFERENCE_HL3, PREFERENCE_HL4, PREFERENCE_HL5, PREFERENCE_HL6, PREFERENCE_HL7,
	PREFERENCE_DELHL, PREFERENCE_MOBILIZEPAGE, PREFERENCE_NATIVESPEAK, PREFERENCE_STOPNATIVESPEAK,
	PREFERENCE_UNHL, PREFERENCE_UNHL_ALL, PREFERENCE_SETNOTEHL, PREFERENCE_TRANSHLTONOTE, PREFERENCE_SELECTHL,
	PREFERENCE_LOOKUP, PREFERENCE_LOOKUP_OPENINNEW, PREFERENCE_LOOKUP_CREATEEMPTY,
	PREFERENCE_TIPPOPUP, PREFERENCE_TIPPOPUP_MULTIPLE,
	
	PREFERENCE_STORESESSION, PREFERENCE_STORELOCAL, 
	PREFERENCE_LOOKUP_TEMPLATES, PREFERENCE_LOOKUPPOPUP_PLACEMENT, PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE,
	PREFERENCE_TIPPOPUP_MOUSEACTIVATE, PREFERENCE_TIPPOPUP_TEMPLATES
];

////////////////////////////

var _arrayPrefDefaults = [ 
	[PREFERENCE_FIXUPLEVEL, 0],
	[PREFERENCE_MOBILIZER, MOBILIZER_INSTAPAPER],

    [PREFERENCE_WARNONUNLOAD, PREFBOOL_TRUE],
    [PREFERENCE_CONTEXTMENU, PREFBOOL_TRUE],
    [PREFERENCE_PAGEACTION, PREFBOOL_TRUE],		// false = never, true = when hl present, "always" = always
    [PREFERENCE_SNIPPETMAX, 200],
    [PREFERENCE_AUTOSAVE, PREFBOOL_FALSE],
    [PREFERENCE_AUTOSAVE_STORE, "session"],     // session or local

    [PREFERENCE_HIGHLIGHTSTYLE, HIGHLIGHTSTYLE_TILE],
    
    [PREFERENCE_KEYFRAMES_FLASH, ' \
        0% { \
            opacity: 1; \
        } \
        100% { \
            opacity: 0; \
        }'],
    [PREFERENCE_FLASHITERATIONCOUNT, 4],                                       // even number, else ends up opacity = 0
    [PREFERENCE_FLASHDURATION, "0.4s"],
    [PREFERENCE_FLASHDIRECTION, "alternate"],

    [PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS, "0.7em"],           // was 7px
    [PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING, "0em"],
    [PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW, "0px 0px 12px"],
    [PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW, 1],                  // max (scaled by alpha_highlight/1) (see below)

    [PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS, "6px"],            // was 0.4em
    [PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING, "0.2em"],
    [PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW, "3px 3px 4px"],
//    [PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING, "2px 2px 2px 3px"],          // inspector style
//    [PREFERENCE_HIGHLIGHTSTYLE_TILE_MARGIN, "-2px -2px -2px -3px"],
    [PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW, 0.6],                  // max (scaled by alpha_highlight/1)
	
	// ********* REMEMBER TO ADD FOLLOWING TO STRINGIFY ARRAY (PLUS ANY OTHER RELEVANT OBJECTS) ******************
    [PREFERENCE_HL1, { showInContextMenu: true, colourbg: "#ff0000", colourfg: "#000000", upperCase: false, fontSize: "inherit", shortcut: null, label: "Red", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
    [PREFERENCE_HL2, { showInContextMenu: true, colourbg: "#FFa500", colourfg: "#000000", upperCase: false, fontSize: "inherit", shortcut: null, label: "Orange", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
    [PREFERENCE_HL3, { showInContextMenu: true, colourbg: "#ffff60", colourfg: "#000000", upperCase: false, fontSize: "inherit", shortcut: null, label: "Yellow", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
    [PREFERENCE_HL4, { showInContextMenu: true, colourbg: "#60ff60", colourfg: "#000000", upperCase: false, fontSize: "inherit", shortcut: null, label: "Green", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
    [PREFERENCE_HL5, { showInContextMenu: true, colourbg: "#60ffff", colourfg: "#000000", upperCase: false, fontSize: "inherit", shortcut: null, label: "Cyan", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
    [PREFERENCE_HL6, { showInContextMenu: true, colourbg: "#ff60ff", colourfg: "#000000", upperCase: false, fontSize: "inherit", shortcut: null, label: "Purple", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
    [PREFERENCE_HL7, { showInContextMenu: true, colourbg: "#000000", colourfg: "#ffffff", upperCase: false, fontSize: "inherit", shortcut: null, label: "Black", addNote: false,
		transparentbg: false, underline: false, linethrough: false, bold: false, italic: false}],
	[PREFERENCE_NATIVESPEAK, { label: "Speak Selection" }],
	[PREFERENCE_STOPNATIVESPEAK, { label: "Stop Speaking" }],
    [PREFERENCE_DELHL, { label: "Delete contents of Highlight..."}],
    [PREFERENCE_UNHL, { label: "Remove Highlight"}],
	[PREFERENCE_MOBILIZEPAGE, { label: "Simplify Page Format"}],
    //[PREFERENCE_UNHL_ALL, { /*label: "Remove all Highlights", */shortcut: null}],       // storing shortcut would remove label from array, so background.html always sets it (ie: if has shortcut key,dont put label here)
	[PREFERENCE_UNHL_ALL, { label: "Remove All Highlights..."}],
    [PREFERENCE_SETNOTEHL, { label: "Edit Note..."}],
	[PREFERENCE_TRANSHLTONOTE, { label: "Create Note in <<LANGUAGE>> from Highlight"}],
    [PREFERENCE_SELECTHL, { label: "Select Highlight"}],
    [PREFERENCE_LOOKUP, { label: "Open in Lookup Session..."/*, shortcut: "ctrl+shift+l"*/}],
	[PREFERENCE_LOOKUP_OPENINNEW, {label: "Open in New Lookup Session..."/*, shortcut: "ctrl+shift+k"*/}],				// should preferably be PREFERENCE_LOOKUP + ctrl
	[PREFERENCE_LOOKUP_CREATEEMPTY, {/*shortcut: "ctrl+shift+j"*/}],		// should preferably be PREFERENCE_LOOKUP_SHORTCUT_CREATENEW + somethiung
	[PREFERENCE_TIPPOPUP, {label: "Open in Tip..."/*, shortcut: "ctrl+shift+h"*/}],
	[PREFERENCE_TIPPOPUP_MULTIPLE, {/*shortcut: "ctrl+shift+g"*/}],			// preferably would be above + SHIFT
	// *** END REMEMBER TO STRINGIFY
    
	[PREFERENCE_STORESESSION, {shortcut: null}],
    [PREFERENCE_STORELOCAL, { shortcut: null}],
	
    [PREFERENCE_POPUP_PIN, PREFBOOL_FALSE],         // false = out
	[PREFERENCE_POPUP_TRANSLATIONSTYLE, TRANSLATIONSTYLE_APPEND],
	[PREFERENCE_POPUP_SPEECHSERVICE, ID_TIPPOPUP_GOOGLETTS],
	[PREFERENCE_POPUP_REMOVEDONATE, PREFBOOL_FALSE],
	[PREFERENCE_POPUP_LOADCOUNT, 0],
	
	[PREFERENCE_AUTOTRANS_NOTE, PREFBOOL_FALSE],
	[PREFERENCE_TRANSNOTE_SRCLANG, ""],				// "" = auto
	[PREFERENCE_TRANSNOTE_DESTLANG, "en"],
     [PREFERENCE_TRANSNOTE_SRCLANG_BING, ""],				// "" = auto
     [PREFERENCE_TRANSNOTE_DESTLANG_BING, "en"],
	[PREFERENCE_AUTOTRANS_SNIPPET, PREFBOOL_FALSE],
	[PREFERENCE_TRANSSNIPPET_SRCLANG, ""],				// "" = auto
	[PREFERENCE_TRANSSNIPPET_DESTLANG, "en"],
    [PREFERENCE_TRANSSNIPPET_SRCLANG_BING, ""],				// "" = auto
    [PREFERENCE_TRANSSNIPPET_DESTLANG_BING, "en"],
	
	[PREFERENCE_TRANSLATEDCHARS, 0],
	[PREFERENCE_TRANSLATEDCHARS_DATESTRING, ""],
	
	[PREFERENCE_SHOWTRANSLATEDSNIPPETS, PREFBOOL_FALSE],
	[PREFERENCE_SHOWNOTES, PREFBOOL_TRUE],
	// id is just a random unique number (generated auto if undefined). everything (including groupstart/end) needs one
	[PREFERENCE_LOOKUP_TEMPLATES, [
       {enabled: true, name: 'Bing', groupStart: true},
           {enabled: true, name: 'Web', urlTemplate: 'http://www.bing.com/search?q={searchTerms}'},
           {enabled: true, name: 'Web (on this site)', urlTemplate: 'http://www.bing.com/search?q=site:{locationHostname} {searchTerms}'},
           {enabled: true, name: 'Images', urlTemplate: 'http://www.bing.com/images/search?q={searchTerms}'},
           {enabled: true, name: 'Images (on this site)', urlTemplate: 'http://www.bing.com/images/search?q=site:{locationHostname} {searchTerms}'},
           {enabled: true, name: 'Videos', urlTemplate: 'http://www.bing.com/videos/search?q={searchTerms}'},
           {enabled: true, name: 'News', urlTemplate: 'http://www.bing.com/news/search?q={searchTerms}'},
           {enabled: true, name: 'Maps', urlTemplate: 'http://www.bing.com/maps/default.aspx?q={searchTerms}'},
       {enabled: true, groupEnd: true},
                                   
		{enabled: true, name: 'Google', groupStart: true},
//			{enabled: true, name: 'Web Search', urlTemplate: 'http://www.google.com/search?q={searchTerms}', default: true},
//			{enabled: true, name: 'Web Search (on this site)', urlTemplate: 'http://www.google.com/search?q=site:{locationHostname} {searchTerms}'},
//			{enabled: true, name: 'Images', urlTemplate: 'http://www.google.com/images?q={searchTerms}'},
//			{enabled: true, name: 'Images (on this site)', urlTemplate: 'http://www.google.com/images?q=site:{locationHostname} {searchTerms}'},
//			{enabled: true, name: 'Video', urlTemplate: 'http://www.google.com/search?tbs=vid:1&q={searchTerms}'},
//			{enabled: true, name: 'Maps', urlTemplate: 'http://maps.google.com/maps?q={searchTerms}'},
////			{enabled: true, name: 'News', urlTemplate: 'http://news.google.com/news?q={searchTerms}'},
			{enabled: true, name: 'Shopping', urlTemplate: 'http://www.google.com/products?q={searchTerms}'},
//			{enabled: true, name: 'Finance', urlTemplate: 'http://www.google.com/finance?q={searchTerms}'},
			{enabled: true, name: 'Translate', urlTemplate: 'http://translate.google.com/translate_t?q={searchTerms}'},
//			{enabled: true, name: 'Scholar', urlTemplate: 'http://scholar.google.com/scholar?q={searchTerms}'},
//			{enabled: true, name: 'Blogs', urlTemplate: 'http://www.google.com/search?tbs=blg:1&q={searchTerms}'},
//			{enabled: true, name: 'Realtime', urlTemplate: 'http://www.google.com/search?tbs=mbl:1&q={searchTerms}'},
////			{enabled: true, name: 'Youtube', urlTemplate: 'http://www.youtube.com/results?q={searchTerms}'},
			{enabled: true, name: 'Photos', urlTemplate: 'https://picasaweb.google.com/lh/view?q={searchTerms}'},
//			{enabled: true, name: 'Groups', urlTemplate: 'http://groups.google.com/groups?q={searchTerms}'},
//			{enabled: true, name: 'Definitions', urlTemplate: 'http://www.google.com/search?q=define:{searchTerms}'},
		{enabled: true, groupEnd: true},			

		{enabled: true, name: 'Yahoo!', groupStart: true},
			{enabled: true, name: 'Web', urlTemplate: 'http://search.yahoo.com/search?p={searchTerms}'},
			{enabled: true, name: 'Web (on this site)', urlTemplate: 'http://search.yahoo.com/search?p=site:{locationHostname} {searchTerms}'},
			{enabled: true, name: 'Images', urlTemplate: 'http://images.search.yahoo.com/search/images?p={searchTerms}'},
			{enabled: true, name: 'Images (on this site)', urlTemplate: 'http://images.search.yahoo.com/search/images?p=site:{locationHostname} {searchTerms}'},
			{enabled: true, name: 'Video', urlTemplate: 'http://video.search.yahoo.com/search/video?p={searchTerms}'},
			{enabled: true, name: 'Local', urlTemplate: 'http://local.yahoo.com/results?stx={searchTerms}'},
			{enabled: true, name: 'Shopping', urlTemplate: 'http://shopping.yahoo.com/search?p={searchTerms}'},
			{enabled: true, name: 'News', urlTemplate: 'http://news.search.yahoo.com/search/news?p={searchTerms}'},
			{enabled: true, name: 'Answers', urlTemplate: 'http://answers.yahoo.com/search/search_result?p={searchTerms}'},
		{enabled: true, groupEnd: true},
				
		{enabled: true, name: 'Wikimedia Foundation', groupStart: true},
			{enabled: true, name: 'Wikipedia', urlTemplate: 'http://www.wikipedia.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKIPEDIA},
			{enabled: true, name: 'Wiktionary', urlTemplate: 'http://www.wiktionary.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKTIONARY},
			{enabled: true, name: 'Wikibooks', urlTemplate: 'http://www.wikibooks.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKIBOOKS},
			{enabled: true, name: 'Wikiquote', urlTemplate: 'http://www.wikiquote.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKIQUOTE},
			{enabled: true, name: 'Wikisource', urlTemplate: 'http://www.wikisource.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKISOURCE},
			{enabled: true, name: 'Wikimedia Commons', urlTemplate: 'http://commons.wikimedia.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKIMEDIACOMMONS},
			{enabled: true, name: 'Wikispecies', urlTemplate: 'http://species.wikimedia.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKISPECIES},
			{enabled: true, name: 'Wikinews', urlTemplate: 'http://www.wikinews.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKINEWS},
			{enabled: true, name: 'Wikiversity', urlTemplate: 'http://www.wikiversity.org/wiki/{searchTerms}', hash: "firstHeading",
				description: DESCRIPTION_WIKIVERSITY},
		{enabled: true, groupEnd: true},			
		//
		{enabled: true, name: 'Wolfram|Alpha', urlTemplate: 'http://www.wolframalpha.com/input/?i={searchTerms}'},
		{enabled: true, name: 'Twitter', urlTemplate: 'http://twitter.com/search/{searchTerms}'},
		{enabled: true, name: 'IMDB', urlTemplate: 'http://www.imdb.com/find?q={searchTerms}&amp;sourceid=mozilla-search', shortcut: null},
		{enabled: true, name: 'Flickr', urlTemplate: 'http://www.flickr.com/search/?q={searchTerms}'},
		{enabled: true, name: 'Amazon', urlTemplate: 'http://www.amazon.co.uk/s?ie=UTF8&index=blended&field-keywords={searchTerms}'},
		//
		{enabled: true, name: 'The Free Dictionary', groupStart: true},
			{enabled: true, name: 'Dictionary/Thesaurus', groupStart: true},
				{enabled: true, name: 'Word/Article', urlTemplate: 'http://www.thefreedictionary.com/{searchTerms}'},
				{enabled: true, name: 'Starts With', urlTemplate: 'http://www.thefreedictionary.com/s/{searchTerms}'},
				{enabled: true, name: 'Ends With', urlTemplate: 'http://www.thefreedictionary.com/e/{searchTerms}'},
				{enabled: true, name: 'In Definition', urlTemplate: 'http://www.thefreedictionary.com/d/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: 'Medical Dictionary', urlTemplate: 'http://medical-dictionary.thefreedictionary.com/{searchTerms}'},
			{enabled: true, name: 'Legal Dictionary', urlTemplate: 'http://legal-dictionary.thefreedictionary.com/{searchTerms}'},
			{enabled: true, name: 'Financial Dictionary', urlTemplate: 'http://financial-dictionary.thefreedictionary.com/{searchTerms}'},
			{enabled: true, name: 'Acronyms', urlTemplate: 'http://acronyms.thefreedictionary.com/{searchTerms}'},
			{enabled: true, name: 'Idioms', urlTemplate: 'http://idioms.thefreedictionary.com/{searchTerms}'},
			{enabled: true, name: 'Encyclopedia', urlTemplate: 'http://encyclopedia2.thefreedictionary.com/{searchTerms}'},
		{enabled: true, groupEnd: true},

		{enabled: true, name: 'Dictionary.com', groupStart: true},
			{enabled: true, name: 'Dictionary', urlTemplate: 'http://dictionary.reference.com/browse/{searchTerms}'},
			{enabled: true, name: 'Thesaurus', urlTemplate: 'http://thesaurus.com/browse/{searchTerms}'},
			{enabled: true, name: 'Quotes', urlTemplate: 'http://quotes.dictionary.com/search/{searchTerms}'},
			{enabled: true, name: 'Reference', urlTemplate: 'http://www.reference.com/browse/{searchTerms}'},
			
			{enabled: true, name: 'Crossword', groupStart: true},
				{enabled: true, name: 'Clue', urlTemplate: 'http://dictionary.reference.com/crossword/index.html?query={searchTerms}&type=answer&n=10&pattern=&l=any'},
				{enabled: true, name: 'Answer', urlTemplate: 'http://dictionary.reference.com/crossword/index.html?query=&type=answer&n=10&pattern={searchTerms}&l=any'},
			{enabled: true, groupEnd: true},
		{enabled: true, groupEnd: true},
		//
//		{enabled: true, name: 'dict.cc', urlTemplate: 'http://www.dict.cc/?s={searchTerms}'},	// breakout
		{enabled: true, name: 'Leo', urlTemplate: 'http://dict.leo.org/ende?search={searchTerms}'},		
		{enabled: true, name: 'Canoo', urlTemplate: 'http://canoo.net/services/Controller?input={searchTerms}&service=canooNet'},		
		{enabled: true, name: 'Priberam', urlTemplate: 'http://www.priberam.pt/dlpo/default.aspx?pal={searchTerms}'},
		{enabled: true, name: 'HowJsay', urlTemplate: 'http://www.howjsay.com/index.php?word={searchTerms}&submit=Submit',
			description: "A free online Talking Dictionary of English Pronunciation"},

		{enabled: true, name: 'Wordreference', groupStart: true},
			{enabled: true, name: '->English', groupStart: true},
				{enabled: true, name: 'French', urlTemplate: 'http://www.wordreference.com/fren/{searchTerms}'},
				{enabled: true, name: 'French Conjugation', urlTemplate: 'http://www.wordreference.com/conj/FRverbs.asp?v={searchTerms}'},
				{enabled: true, name: 'Spanish', urlTemplate: 'http://www.wordreference.com/esen/{searchTerms}'},
				{enabled: true, name: 'Spanish Conjugation', urlTemplate: 'http://www.wordreference.com/conj/EsVerbs.asp?v={searchTerms}'},
				{enabled: true, name: 'Spanish Legal', urlTemplate: 'http://www.wordreference.com/esenl/{searchTerms}'},
				{enabled: true, name: 'Spanish Business', urlTemplate: 'http://www.wordreference.com/esenb/{searchTerms}'},
				{enabled: true, name: 'Spanish False Friends', urlTemplate: 'http://www.wordreference.com/esend/{searchTerms}'},
				{enabled: true, name: 'Italian', urlTemplate: 'http://www.wordreference.com/iten/{searchTerms}'},
				{enabled: true, name: 'Italian Conjugation', urlTemplate: 'http://www.wordreference.com/conj/ItVerbs.asp?v={searchTerms}'},
				{enabled: true, name: 'Portuguese', urlTemplate: 'http://www.wordreference.com/pten/{searchTerms}'},
				{enabled: true, name: 'German', urlTemplate: 'http://www.wordreference.com/deen/{searchTerms}'},
				{enabled: true, name: 'Russian', urlTemplate: 'http://www.wordreference.com/ruen/{searchTerms}'},
				{enabled: true, name: 'Polish', urlTemplate: 'http://www.wordreference.com/plen/{searchTerms}'},
				{enabled: true, name: 'Romanian', urlTemplate: 'http://www.wordreference.com/roen/{searchTerms}'},
				{enabled: true, name: 'Czech', urlTemplate: 'http://www.wordreference.com/czen/{searchTerms}'},
				{enabled: true, /*id: "1.1.13", */name: 'Greek', urlTemplate: 'http://www.wordreference.com/gren/{searchTerms}'},
				{enabled: true, name: 'Turkish', urlTemplate: 'http://www.wordreference.com/tren/{searchTerms}'},
				{enabled: true, name: 'Chinese', urlTemplate: 'http://www.wordreference.com/zhen/{searchTerms}'},
				{enabled: true, name: 'Japanese', urlTemplate: 'http://www.wordreference.com/jaen/{searchTerms}'},
				{enabled: true, name: 'Korean', urlTemplate: 'http://www.wordreference.com/koen/{searchTerms}'},
				{enabled: true, name: 'Arabic', urlTemplate: 'http://www.wordreference.com/aren/{searchTerms}'},
				{enabled: true, name: 'Definition', urlTemplate: 'http://www.wordreference.com/definition/{searchTerms}'},
			{enabled: true, groupEnd: true},
			
			{enabled: true, name: '->Français', groupStart: true},
				{enabled: true, name: 'Anglais', urlTemplate: 'http://www.wordreference.com/enfr/{searchTerms}'},
				{enabled: true, name: 'Espagnol', urlTemplate: 'http://www.wordreference.com/esfr/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Español', groupStart: true},
				{enabled: true, name: 'Inglés', urlTemplate: 'http://www.wordreference.com/enes/{searchTerms}'},
				{enabled: true, name: 'Inglés Legal', urlTemplate: 'http://www.wordreference.com/enesl/{searchTerms}'},
				{enabled: true, name: 'Inglés Comercial', urlTemplate: 'http://www.wordreference.com/enesb/{searchTerms}'},
				{enabled: true, name: 'Inglés Falsos Amigos', urlTemplate: 'http://www.wordreference.com/enesd/{searchTerms}'},
/*				
				{enabled: true, name: 'InglÃ©s Legal', urlTemplate: 'http://www.wordreference.com/enesl/{searchTerms}'},
				{enabled: true, name: 'InglÃ©s Comercial', urlTemplate: 'http://www.wordreference.com/enesb/{searchTerms}'},
				{enabled: true, name: 'InglÃ©s Falsos Amigos', urlTemplate: 'http://www.wordreference.com/enesd/{searchTerms}'},
*/				{enabled: true, name: 'Francés', urlTemplate: 'http://www.wordreference.com/fres/{searchTerms}'},
				{enabled: true, name: 'Portugués', urlTemplate: 'http://www.wordreference.com/ptes/{searchTerms}'},
				{enabled: true, name: 'Definición', urlTemplate: 'http://www.wordreference.com/definicion/{searchTerms}'},
				{enabled: true, name: 'Sinónimos', urlTemplate: 'http://www.wordreference.com/sinonimos/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Italiano', groupStart: true},
				{enabled: true, name: 'Inglese', urlTemplate: 'http://www.wordreference.com/enit/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Português', groupStart: true},
				{enabled: true, name: 'Inglês', urlTemplate: 'http://www.wordreference.com/enpt/{searchTerms}'},
				{enabled: true, name: 'Español', urlTemplate: 'http://www.wordreference.com/espt/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Deutsch', groupStart: true},
				{enabled: true, name: 'Englisch', urlTemplate: 'http://www.wordreference.com/ende/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Russian', groupStart: true},
				{enabled: true, name: 'English', urlTemplate: 'http://www.wordreference.com/enru/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Polish', groupStart: true},
				{enabled: true, name: 'Angielski', urlTemplate: 'http://www.wordreference.com/enpl/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Român', groupStart: true},
				{enabled: true, name: 'Englez', urlTemplate: 'http://www.wordreference.com/enro/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Cesko', groupStart: true},
				{enabled: true, name: 'Anglický', urlTemplate: 'http://www.wordreference.com/encz/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Greek', groupStart: true},
				{enabled: true, name: 'English', urlTemplate: 'http://www.wordreference.com/engr/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Türkçe', groupStart: true},
				{enabled: true, name: 'Ingilizce', urlTemplate: 'http://www.wordreference.com/entr/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Chinese', groupStart: true},
				{enabled: true, name: 'English', urlTemplate: 'http://www.wordreference.com/enzh/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Japanese', groupStart: true},
				{enabled: true, name: 'English', urlTemplate: 'http://www.wordreference.com/enja/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Korean', groupStart: true},
				{enabled: true, name: 'English', urlTemplate: 'http://www.wordreference.com/enko/{searchTerms}'},
			{enabled: true, groupEnd: true},

			{enabled: true, name: '->Arabic', groupStart: true},
				{enabled: true, name: 'English', urlTemplate: 'http://www.wordreference.com/enar/{searchTerms}'},
			{enabled: true, groupEnd: true},
		{enabled: true, groupEnd: true},

	]],
	
	[PREFERENCE_LOOKUPPOPUP_PLACEMENT, {}],//{clientX: null, clientY: null, width: 500, height: 300, locked: true, pinned: false}],
	[PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT, PREFBOOL_TRUE],
//	[PREFERENCE_LOOKUPPOPUP_OPACITY, 0.9],
	[PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE, {enabled: false, button: 0, dbl: false, ctrlKey: true, altKey: false, shiftKey: false}],
	[PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR, PREFBOOL_TRUE],
	
	[PREFERENCE_TIPPOPUP_MOUSEACTIVATE, {enabled: false, button: 2, dbl: false, ctrlKey: false, altKey: true, shiftKey: false}],
	[PREFERENCE_TIPPOPUP_TEMPLATES, [/*
		{id: ID_TIPPOPUP_GOOGLETRANSLATE, default: true, shortcut: "ctrl+A", 
			options: {srcLang: "", destLang: "es"} },*/
	]],
	[PREFERENCE_TIPPOPUP_WORDUNDERCURSOR, PREFBOOL_TRUE],
];

//var IDARRAY_TIPPOPUP_MEDIAWIKI = [ID_TIPPOPUP_WIKIPEDIA, ID_TIPPOPUP_WIKTIONARY];

var BRANDING_GOOGLE = 'Powered by<img src="' + chrome.extension.getURL('img/branding/Google/small-logo.png')+ '" style="padding-left: 1px!important; vertical-align: middle!important;"/>';
var BRANDING_FLICKR = 'Results by<img src="' + chrome.extension.getURL('img/branding/Flickr/flickr12.png') + '" style="padding-left: 0.2em!important; vertical-align: text-top!important;"/>';
var BRANDING_WIKIMEDIA = '<img src="' + chrome.extension.getURL('img/branding/wikimedia/Small_icon_wikimedia.png')+ '" style="vertical-align: text-top!important; padding-right: 2px!important;"/>A Wikimedia Project';
var BRANDING_YAHOO = 'Powered by<img src="' + chrome.extension.getURL('img/branding/Yahoo/yahoo.png')+ '"/>';
var BRANDING_TWITTER = 'Content from<img src="' + chrome.extension.getURL('img/branding/twitter/logo_twitter_bird_12_allblue.png')+ '" style="padding-left: 4px!important; vertical-align: text-top!important;"/>';
//var BRANDING_BING = "Speech by Bing&trade;";
var BRANDING_BING = 'Powered by<img src="' + chrome.extension.getURL('img/branding/bing/bing.png')+ '" style="padding-left: 0.3em!important; vertical-align: middle!important;"/>';

// defaultoptions get merged into the template
var _arrTipPopupMasterTemplates = [

	{groupStart: true, label: "Bing", display: DISPLAY_MSTRANSLATE, },
		{id: ID_TIPPOPUP_MSTRANSLATE_TTS, name: "Text to Speech", branding: BRANDING_BING, display: DISPLAY_MSTRANSLATE,
			defaultOptions: { language: "en", autoDetectLanguage: true,
				//const
				sourceType: "TTS", method: "Speak"} },

		{id: ID_TIPPOPUP_MSTRANSLATE_TRANSLATE, name: "Translate", branding: BRANDING_BING, default: true, display: DISPLAY_MSTRANSLATE,
			defaultOptions: {srcLang: "", destLang: "en", 
				//const
				sourceType: "method", method: "Translate" } },
				
	{groupEnd: true, display: DISPLAY_MSTRANSLATE, },
	
	{groupStart: true, label: "Google" },
		{id: ID_TIPPOPUP_GOOGLETRANSLATE, name: "Translate (deprecated)",  branding: BRANDING_GOOGLE,
			description: DESCRIPTION_GOOGLETRANSLATE,
			defaultOptions: {srcLang: "", destLang: "en"} },
		{id: ID_TIPPOPUP_GOOGLELANGUAGEDETECT, name: "Language Detector", branding: BRANDING_GOOGLE,
			//description: "Google Language Detector is a free service which tries to detect the language that text is written in",
			defaultOptions: {}},
		{id: ID_TIPPOPUP_GOOGLEIMAGESEARCH, name: "Image Search", branding: BRANDING_GOOGLE,
			//description: "Google Image Search iallows users to search the Web for image content.",	
			defaultOptions: {restrictToHost: false, restrictSafeSearch: "moderate", 
				enableRestrictImageSize: false, restrictImageSize: "medium",
				enableRestrictImageType: false, restrictImageType: "faces"} },
		{id: ID_TIPPOPUP_GOOGLETTS, name: "Text to Speech", branding: BRANDING_GOOGLE,
			defaultOptions: { language: "en", autoDetectLanguage: true } },
	{groupEnd: true },
			
	{groupStart: true, label: "Wikimedia" },
		{id: ID_TIPPOPUP_WIKIPEDIA, name: "Wikipedia", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKIPEDIA,
			defaultOptions: {editionLanguage: "en", rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikipedia.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true,
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKTIONARY, name: "Wiktionary", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKTIONARY,
			defaultOptions: {editionLanguage: "en", rememberLastSection: true, defaultSection: null,
				// const
				domain: "wiktionary.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKIBOOKS, name: "Wikibooks", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKIBOOKS,
			defaultOptions: {editionLanguage: "en", rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikibooks.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKIQUOTE, name: "Wikiquote", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKIQUOTE,
			defaultOptions: {editionLanguage: "en", rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikiquote.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKISOURCE, name: "Wikisource", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKISOURCE,
			defaultOptions: {editionLanguage: "en", rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikisource.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKIMEDIACOMMONS, name: "Commons", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKIMEDIACOMMONS,
			defaultOptions: {editionLanguage: "commons", monolingual: true, rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikimedia.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKISPECIES, name: "Wikispecies", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKISPECIES,
			defaultOptions: {editionLanguage: "species", monolingual: true, rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikimedia.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKINEWS, name: "Wikinews", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKINEWS,
			defaultOptions: {editionLanguage: "en", rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikinews.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
		{id: ID_TIPPOPUP_WIKIVERSITY, name: "Wikiversity", branding: BRANDING_WIKIMEDIA,
			description: DESCRIPTION_WIKIVERSITY,
			defaultOptions: {editionLanguage: "en", rememberLastSection: false, defaultSection: null,
				// const
				domain: "wikiversity.org", pathPHP: "/w/api.php", pathWiki: "/wiki/", getSections: true, getIntro: true, 
					openSearchOnNoEntries: true, hasMediaWikiAPI: true, includeSubsectionHeadings: true} },
	{groupEnd: true },

	{groupStart: true, label: "Yahoo! (deprecated)" },
		{id: ID_TIPPOPUP_YAHOOWEB, name: "Web Search", branding: BRANDING_YAHOO,
			defaultOptions: {per_page: 10, restrictToHost: false, no_porn: false, no_hate: false, longAbstract: false,
				// const
				searchType: 'web'} },
		{id: ID_TIPPOPUP_YAHOOSPELLING, name: "Spelling Suggestions", branding: BRANDING_YAHOO,
			defaultOptions: { 
				// const
				searchType: 'spelling'} },
	{groupEnd: true},

	// per_page must be string not number (??)
	{groupStart: true, label: "Miscellaneous" },
		{id: ID_TIPPOPUP_FLICKR, name: "Flickr", branding: BRANDING_FLICKR,
			description: "This product uses the Flickr API but is not endorsed or certified by Flickr",
			defaultOptions: {sort: "relevance", media: "all", in_gallery: false, per_page: 20} },
		{id: ID_TIPPOPUP_TWITTER, name: "Twitter", branding: BRANDING_TWITTER,
			defaultOptions: {per_page: 10, result_type: "mixed", refresh_style: "replace",/*replace|append*/} },
	{groupEnd: true},
];

function DoesTemplateIdHaveMediaWikiAPI(tipTemplateId){
	for(var p in _arrTipPopupMasterTemplates){
		if(_arrTipPopupMasterTemplates[p].id == tipTemplateId)
			return _arrTipPopupMasterTemplates[p].defaultOptions.hasMediaWikiAPI;
	}
	return false;
}

// legal urls

function CanExecuteScriptOnURL(url)
{
	if(url.indexOf("http:") == 0 ||
		url.indexOf("https:") == 0 ||
		url.indexOf("file:") == 0)
		return true;
	else
		return false;
}

/////////////////////////////////////////////////////////////////
// highlight storage

function SaveHighlights(url, store, arrayHighlights, append, href, keyRedirectToSessionStorage) {//, clearHREF) {
    // key is url. must stringify array. null array == remove, null url == clear all
    // we handle exceptions
	var stringified;
	
    try {
        if (store == "both") {
            var e1 = SaveHighlights(url, "session", arrayHighlights, append, href, keyRedirectToSessionStorage);
            if (e1.result == null)
                e1 = SaveHighlights(url, "local", arrayHighlights, append, href, keyRedirectToSessionStorage);
            
			return e1;
        }

        var storage = (store == "session" ? sessionStorage : localStorage);

        if (url == null) {
            // remove all keys beginning with http: or https:, file: ftp: chrome-extension:
			if(!keyRedirectToSessionStorage){
				for (var x = 0; x < storage.length; x++) {
					// legal url schemes (http/https/file)
					if (CanExecuteScriptOnURL(storage.key(x)) == true) {
						//
						SaveHighlights(storage.key(x), store, null);
						x--;
					}
				}
			}
            //storage.clear();
			stringified = null;
        }
        else if (arrayHighlights == null/* || arrayHighlights.length == 0*/){
			if(keyRedirectToSessionStorage)
				sessionStorage.removeItem(keyRedirectToSessionStorage);
			else
				storage.removeItem(url);
			
			stringified = null;
		}
        else {
//			if(arrayHighlights.length > 0)
//				console.log("SOMETHING");
		
			// load existing hgihglights for the URL (ie: all HREFS)
			// remove all for this HREF
			// add all for this HREF
			if (append == true) {
				// load existing hgihglights for the URL (ie: all HREFS)
				var arrayExisting = LoadHighlights(
					keyRedirectToSessionStorage ? keyRedirectToSessionStorage : url, 
					keyRedirectToSessionStorage ? "session" : store);
					
				if(arrayExisting){
					// remove all for this HREF
					if(href == null)
						href = url;
						
					for(var k=arrayExisting.length-1; k>=0; k--){
						if((!arrayExisting[k].href && href == url) || (arrayExisting[k].href == href))
							arrayExisting.splice(k, 1);
					}
					
					//arrayHighlights = arrayExisting.concat(arrayHighlights);
					var arrJoined = arrayExisting.concat(arrayHighlights);
					arrayHighlights = arrJoined;		// TODO: why is debugger not updated
//					console.log(arrayHighlights);
				}
			}

/*		
            // try to load existing highlights
            if (append == true) {
                // remove all items from the existing array that have hrefs equal to any in the new array
                var arrayExisting = LoadHighlights(url, store);
                if (arrayExisting) {
                    var arrayTemp = [];

                    arrayExisting.forEach(function (existingHighlight) {
                        // if matches forceHREF, all these WONT be in the new arrayHighlights
                        //                        if (forceHREF == null || existingHighlight.href != forceHREF) {
                        // if its not in the new array, copy it to a temp array
						var hrefExisting = (existingHighlight.href == null ? url : existingHighlight.href);

						for (var z = 0; z < arrayHighlights.length; z++) {
							// if existingHighlight.href == null its been optimised away (href was equal to url)
							var hrefThis = (arrayHighlights[z].href == null ? url : arrayHighlights[z].href);
							
							if (hrefThis == hrefExisting)
								break;
						}
                        if (z == arrayHighlights.length)    // not found
                            arrayTemp.push(existingHighlight);
                        //                        }// end if
                    });

                    // append the new highlights, which will have unique hrefs
                    arrayHighlights = arrayTemp.concat(arrayHighlights);
                }
            }
*/
            if (arrayHighlights.length > 0){
            	// TODO: Add title to arrayHighlights here
            
                stringified = JSON.stringify(arrayHighlights);
			
				if(keyRedirectToSessionStorage)
					sessionStorage[keyRedirectToSessionStorage] = stringified;
				else
					storage[url] = stringified;
            }else{
				if(keyRedirectToSessionStorage)
					sessionStorage.removeItem(keyRedirectToSessionStorage);
				else
					storage.removeItem(url);
					
				stringified = null;
			}

            // can't be in 2 stores at the same time. remove the other
			if(!keyRedirectToSessionStorage)
				SaveHighlights(url, store == "session" ? "local" : "session", null);
        }
    } catch (e) {
        return {result: e};
    }

    return {result: null, stringified: stringified};
}
/*
function ClearHighlightsByHREF(url, store, href) {
    var arrayExisting = LoadHighlights(url, store);

    if (arrayExisting) {
        var arrayTemp = [];

        arrayExisting.forEach(function (existingHighlight) {
			var hrefExisting = (existingHighlight.href != null ? existingHighlight.href : url);
		
		
            // if matches href, all these WONT be in the new arrayHighlights
			if (href == null || hrefExisting != href)
				arrayTemp.push(existingHighlight);			// keep
        });

        return SaveHighlights(url, store, arrayTemp, false).result;
    }

    return null;
}
*/
function LoadHighlights(url, store) {
    // url is key, we handle exceptions
    try {
        if (store == "auto") {
            arrayHighlights = LoadHighlights(url, "session");
            return (arrayHighlights == null ? LoadHighlights(url, "local") : arrayHighlights);
        }

        var stringifiedArrayHighlights = (store == "session" ? sessionStorage : localStorage)[url];
				
        if (stringifiedArrayHighlights == null || stringifiedArrayHighlights.length == 0)
            return null;

		return JSON.parse(stringifiedArrayHighlights);
    } catch (e) {
        return null;
    }
}

function LoadAllHighlights(store) {
    var arrayOut = {};
    var storage = (store == "session" ? sessionStorage : localStorage);

    for (var x = 0; x < storage.length; x++) {
        // legal url schemes (http/https/file)
		if (CanExecuteScriptOnURL(storage.key(x)) == true) {
			//
            arrayOut[storage.key(x)] = LoadHighlights(storage.key(x), store);
		}
    }

    return arrayOut;
}

function GetURLStore(url) {
    var value;

    value = sessionStorage[url];
    if (value != null)
        return "session";
    value = localStorage[url];
    if (value != null)
        return "local";

    return null;
}

////////////////////////////
//GetHighlightsFromStringifiedImportObjectByURL
function GetHighlightsFromStringifiedImportObject(stringifiedImportObj/*, url*/)
{
	var objImport = GetImportObjectFromString(stringifiedImportObj);
	var res = {
		arr: [],
	};
	
	if(!objImport)
		res.error = ERROR_INVALIDOBJECT;
	else if(objImport.highlights){
		// return array of {url:xx, hl:yy} (ie: same structure as current) - let popup process
		for(var q=0; q<objImport.highlights.length; q++){
			res.arr.push({
				url: objImport.highlights[q].url,
				hl: objImport.highlights[q].hl
			});
		}
	}	
	
	return res;
}

function ImportHighlightFromStringifiedImportObject(stringifiedImportObj, store){
	var res = {
		importCount: 0,
	};
	
	var objImport = GetImportObjectFromString(stringifiedImportObj);
	if(!objImport || !objImport.highlights){
		res.error = ERROR_INVALIDOBJECT;	// TODO: more info
		return res;
	}
	
	var storage = (store == "session" ? sessionStorage : localStorage);
	
	var storeOther = (store == "session" ? "local" : "session");
	var storageOther = (storeOther == "session" ? sessionStorage : localStorage);

	// warn if ANY of the urls exist in the desired store (overwrite not merge)
	for(var q=0; q<objImport.highlights.length; q++){
		var item = objImport.highlights[q];	// item.url & item.hl
		if(item && item.url && storage.getItem(item.url) != null){
			if(!confirm(CONFIRM_URLEXISTSINSTORE))
				return res;
			break;
		}
	}		
	
	for(var q=0; q<objImport.highlights.length; q++){
		var item = objImport.highlights[q];	// item.url & item.hl
		
		// muyst have valid url
		if(item.url == null && item.length == 0)
			continue;
		if(item.hl == null)
			continue;
		
		// storage hl as string
		var strHL;
		try{
			strHL = JSON.stringify(item.hl);
		}catch(e){
			continue;
		}
					
		// can only exist on one storage obejct, so remove from other if it exists
		if(storageOther.getItem(item.url) != null){
			if(confirm(CONFIRM_REMOVEINOTHERSTORE.replace("<<URL>>", item.url)) ){
				// remove from other store
				SaveHighlights(item.url, storeOther, null);
			}
			else
				continue;
		}
		
		// actually add
		storage[item.url] = strHL;
		res.importCount++;
	}// end for
	
	return res;
}

function ExportHighlightFromStringifiedHL(url, stringifiedHL, asXml){
	var hl = JSON.parse(stringifiedHL);
	
	return ExportObject(
	{
		// always 1 highlight
		highlights:[{
			url: url,
			hl: hl
		}], 
	},
	asXml);
}

function ExportHighlights(arrURLs, store, asXml) {
	// if arrURLs null, all in store.
	// if store null, find correct one for each array
	// if both null, error
	var storage;
	var objExport = {
		highlights:[]
	};

	if(store)
		storage = (store == "session" ? sessionStorage : localStorage);
	
	if(arrURLs == null){
		if(store == null)
			return;
			
		// keys of valid highlights begin with http: or https: file: ftp: chrome-extension:
		for(var q=0; q<storage.length; q++){
			var url = storage.key(q);
//			if(url.indexOf("http:") == 0 || url.indexOf("https:") == 0 ||
//				url.indexOf("file:") == 0 || url.indexOf("ftp:") == 0 ||
//				url.indexOf("chrome-extension:") == 0){
			if(CanExecuteScriptOnURL(url) && url.length > 0){
				//
				var hl = JSON.parse(storage[url]);	// hgihlight string
				
				// TODO: extract title and remove from hl, then add to export object after url, before hl

				if(hl != null){
					objExport.highlights.push({
						url: url,			// url is 'key'
						hl: hl,					// highlights are the value
					});
				}
			}
		}
	}
	else{
		for(var q=0; q<arrURLs.length; q++){
			// get correct storage per-url
			if(store == null){
				var tempStore = GetURLStore(arrURLs[q]);
				if(tempStore == null)
					continue;
				storage = (tempStore == "session" ? sessionStorage : localStorage);
			}
		
			var hl = JSON.parse(storage[arrURLs[q]]);			// hgihlight string

			if(hl != null){
				objExport.highlights.push({
					url: arrURLs[q],			// url is 'key'
					hl: hl,					// highlights are the value
				});
			}
		}
	}
	
	if(objExport.highlights.length > 0)
		ExportObject(objExport, asXml);
}

///////////////////////////////////////////////////////////////////
// preferences

function RemovePreference(key)
{
	localStorage.removeItem(key);
}

function SetPreference(key, value) {
    // caller handles exceptions
    if(_arrayStringify.indexOf(key) != -1)
        value = JSON.stringify(value);

    localStorage.setItem(key, value);
}

function GetPreference(key, getDefault) {
    // key can actually be an array
    if (key instanceof Array) {
        var itemArray = {};        // associative array

        key.forEach( function(keyThis) {
            itemArray[keyThis] = _GetPreference(keyThis, getDefault);
        });

        return itemArray;
    }
    else
        return _GetPreference(key, getDefault);
}

function _GetPreference(key, getDefault)
{
    // prefix dictionary key with a character to distinguish from
    // hostnames stored as listed items
    var item = null;

    if (getDefault != true)
        item = localStorage.getItem(key);

    if (item == null) {
        for (i = 0; i < _arrayPrefDefaults.length; i++) {
            if (_arrayPrefDefaults[i][0] == key) {
                item = _arrayPrefDefaults[i][1];
                break;
            }
        }
    }
    else {
        // special cases in which array must be stringify/parsed
        if(_arrayStringify.indexOf(key) != -1)
            item = JSON.parse(item);
    }

    return item;
}

/////////////////////////////////////////////////////
// TODO: this is a shit place to put this

function GetStyleElementText(arrayPrefs, hl, source) {
    // build textcontent of styleElement

    // bgcolor is always stored in #XXYYZZ form (easier for colour picker). convert to rgba format
    var colorbg = colorbgShadow = null;

    if (hl.colourbg != null) {
        r = Number("0x" + hl.colourbg.substr(1, 2));
        g = Number("0x" + hl.colourbg.substr(3, 2));
        b = Number("0x" + hl.colourbg.substr(5, 2));
        a = 0.7;

        colorbg = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        if (arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE] == HIGHLIGHTSTYLE_TILE)
            r = g = b = 0;        // black, for later

        colorbgShadow = "rgba(" + r + "," + g + "," + b + "," + (a * arrayPrefs[(arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE] == HIGHLIGHTSTYLE_SMEAR ?
            PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW : PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW)]) + ")";
    } // end if

    // build css rule for each class, and append to main single rule
    var textContent =
        ("display: inline!important;") + ("font-family:inherit!important; font-style:inherit!important; font-variant:inherit!important; font-weight:inherit!important; ") +
        ("border-color: transparent !important; ") +
        ((hl.transparentbg != true && hl.colourfg != null) ? ("color: " + hl.colourfg + "!important; ") : "") +
        ((hl.transparentbg != true && colorbg != null) ? "background-color: " + colorbg + "!important; " : "") +
        (hl.upperCase == true ? "text-transform: uppercase!important; " : "") +
		((hl.underline == true || hl.linethrough == true) ? 
			("text-decoration: " + (hl.underline == true ? "underline" : "line-through") + "!important; ") : "") +
		(hl.bold == true ? "font-weight: bold!important; " : "") +
		(hl.italic == true ? "font-style: italic!important; " : "");

    if (source == "page"){
        textContent += (hl.fontSize != null ? ("font-size: " + hl.fontSize + "!important; ") : "") +
            ("-webkit-transition-property: color, background-color, -webkit-box-shadow; ") +            // change highlight colour (not flash)
            ("-webkit-transition-duration: 0.5s, 0.5s, 0.5s; ") +
            ("-webkit-transition-timing-function: linear, linear, linear; ");
    }

    if (arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE] == HIGHLIGHTSTYLE_SMEAR) {
        if (source == "page")
            textContent += "padding: " + arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING] + "!important; ";

        textContent += "border-radius: " + arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS] + "!important; ";
        
		if (source != "popup" && hl.transparentbg != true)
			textContent += (colorbgShadow != null ? "-webkit-box-shadow: " + colorbgShadow + " " + arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW] + "!important; " : "");
    } else if (arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE] == HIGHLIGHTSTYLE_TILE) {
        if (source == "page")
            textContent += "padding: " + arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING] + "!important; ";

		if (source != "popup" && hl.transparentbg != true)
			textContent += (colorbgShadow != null ? "-webkit-box-shadow: " + colorbgShadow + " " + arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW] + "!important; " : "");
			
        textContent += "border-radius: " + arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS] + "!important; ";
    }

    return textContent;
}

/////////////////////////////////////
// serialize objects

function GetImportObjectFromString(str){
	var objImport;

	try{
		// convert to obejct - try JSON first
		objImport = JSON.parse(str);
		if(objImport == null)
			throw new Error("Error parsing JSON string");
	}catch(e){
		// JSON parse fail

		// textToXML throws error on invalid string
		try{
			var xmlDoc = XMLObjectifier.textToXML(str);
		
			// xmlToJSON doesnt
			objImport = XMLObjectifier.xmlToJSON(xmlDoc);
			if(objImport == null)
				return null;
		}
		catch(e){
			return null;
		}
	}

	// check magic
	if((objImport.magic != MAGIC_SIMPLEHIGHLIGHT1 && objImport.magic != MAGIC_SIMPLEHIGHLIGHT2) || objImport.version > VERSION_EXPORTOBJECT)
		return null;

	// xml fixup - xpathRange is an array containing 1 object, but should just be the object
	if(objImport.highlights){		
		for(var f=0; f<objImport.highlights.length; f++){
			if(objImport.highlights[f].hl){
				for(var g=0; g<objImport.highlights[f].hl.length; g++){
					var hlEntry = objImport.highlights[f].hl[g];
					
					// ie $.isArray(json[key])
					if(hlEntry.xpathRange && typeof(hlEntry.xpathRange) === "object" && hlEntry.xpathRange instanceof Array){
						if(hlEntry.xpathRange.length != 1)
							return null;		// unexpected

						// replace array with single object
						objImport.highlights[f].hl[g].xpathRange = hlEntry.xpathRange[0];
					}
				}
			}
		}
	}
	
	return objImport;
}

function ExportObject(object, asXml){
	// create the object that will be serialized
	var objExport = {
		magic: MAGIC_SIMPLEHIGHLIGHT1,
		version: VERSION_EXPORTOBJECT,
	};

	// iterate over object (a {name: value, name2: value2}), adding to objExport
	for(var key in object){
		if(key != null)
			objExport[key] = object[key];
	}
	
	// encode
	//var uriContent;
	var strStream;
	
	try{
		strStream = (asXml == true ? 
			json2xml(objExport, {
				formatOutput: true,
				rootTagName: "simplehighlight",
			}) : JSON.stringify(objExport));

		// the old data URI way (window.open(uri,'_blank'))
		//uriContent = "data:application/octet-stream," + encodeURIComponent( strStream );
	}catch(e){
		return;
	}
	
	// 'open'
	
	// new way (http://stackoverflow.com/questions/10473932/browser-html-force-download-of-image-from-src-dataimage-jpegbase64)
	if(strStream.length > 0){
		var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.BlobBuilder;
	
		var bb = new BlobBuilder();
		bb.append(strStream);
		var blob = bb.getBlob(); // <-- Here's the Blob!

		// Use the URL object to create a temporary URL
		var windowURL = (window.webkitURL || window.URL);
		var objectURL = windowURL.createObjectURL(blob);
		
		window.open(objectURL, '_blank')

		// windowURL.revokeObjectURL(objectURL);
		
		//location.href = URL; // <-- Download!

	}
	
//	if(uriContent.length > 0)
//		window.open(uriContent, '_blank');
}
