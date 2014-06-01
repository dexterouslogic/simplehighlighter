// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
	// tabs
	document.getElementById ("tab1").addEventListener('click', _OnClickTab);
	document.getElementById ("tab2").addEventListener('click', _OnClickTab);
	document.getElementById ("tab3").addEventListener('click', _OnClickTab);
	document.getElementById ("tab4").addEventListener('click', _OnClickTab);
	document.getElementById ("tab5").addEventListener('click', _OnClickTab);
	document.getElementById ("tab6").addEventListener('click', _OnClickTab);

	// page 1
	document.getElementById ("inputAutosave").addEventListener('change', OnChange);
	document.getElementById ("inputAutosave").addEventListener('keyup', OnChange);

	document.getElementById ("selectHighlightStyle").addEventListener('change', OnChangeHighlight);
	document.getElementById ("selectHighlightStyle").addEventListener('keyup', OnChangeHighlight);

	document.getElementById ("buttonForgetPosLookup").addEventListener('click', OnClickButtonForgetPosLookup);
	
	// page 3
	document.getElementById ("selectTemplate").addEventListener('change', _OnChangeSelectTemplate);
	document.getElementById ("selectTemplate").addEventListener('keyup', _OnChangeSelectTemplate);

	document.getElementById ("buttonTemplateMoveUp").addEventListener('click', OnClickButtonMoveTemplate);
	document.getElementById ("buttonTemplateMoveDown").addEventListener('click', OnClickButtonMoveTemplate);

	document.getElementById ("buttonAddGroupStartTemplate").addEventListener('click', OnClickButtonAddRemoveTemplate);
	document.getElementById ("buttonAddGroupEndTemplate").addEventListener('click', OnClickButtonAddRemoveTemplate);
	document.getElementById ("buttonAddTemplate").addEventListener('click', OnClickButtonAddRemoveTemplate);
	document.getElementById ("buttonRemoveTemplate").addEventListener('click', OnClickButtonAddRemoveTemplate);

	document.getElementById ("inputTemplateEnabled").addEventListener('change', OnChangeTemplateElement);
	document.getElementById ("inputTemplateName").addEventListener('change', OnChangeTemplateElement);
	document.getElementById ("inputTemplateURL").addEventListener('change', OnChangeTemplateElement);
	document.getElementById ("inputTemplateHash").addEventListener('change', OnChangeTemplateElement);
	document.getElementById ("textareaTemplateDescription").addEventListener('change', OnChangeTemplateElement);
	document.getElementById ("inputTemplateFramebuster").addEventListener('change', OnChangeTemplateElement);
	document.getElementById ("buttonTemplateDefault").addEventListener('change', OnChangeTemplateElement);
	
	document.getElementById ("buttonTemplateResetAll").addEventListener('click', OnClickRestoreDefaultTemplates);

	// page 4
	document.getElementById ("selectTipTemplate").addEventListener('change', _OnChangeSelectTipTemplate);
	document.getElementById ("selectTipTemplate").addEventListener('keyup', _OnChangeSelectTipTemplate);
	
	document.getElementById ("buttonTipTemplateDefault").addEventListener('click', OnChangeTipTemplateElement);

	// page 5
	document.getElementById ("listSession").addEventListener('dblclick', OnClickButtonStorage);
	document.getElementById ("listSession").addEventListener('change', OnChange);
	document.getElementById ("listSession").addEventListener('keyup', OnChange);
	document.getElementById ("listSession").addEventListener('dragover', OnHighlightListDragOver);
	document.getElementById ("listSession").addEventListener('drop', OnHighlightListDrop);

	document.getElementById ("btnImportSession").addEventListener('click', OnClickButtonImport);
	
	document.getElementById ("btnHiddenImportSession").addEventListener('change', _OnChangeImport);

	document.getElementById ("btnExportSession").addEventListener('click', OnClickButtonExport);
	document.getElementById ("btnExportAllSession").addEventListener('click', OnClickButtonExport);
	
	document.getElementById ("btnRemoveSession").addEventListener('click', OnClickButtonStorage);
	document.getElementById ("btnRemoveAllSession").addEventListener('click', OnClickButtonStorage);
	document.getElementById ("btnGotoSession").addEventListener('click', OnClickButtonStorage);	
	
	//
	document.getElementById ("listLocal").addEventListener('dblclick', OnClickButtonStorage);
	document.getElementById ("listLocal").addEventListener('change', OnChange);
	document.getElementById ("listLocal").addEventListener('keyup', OnChange);
	document.getElementById ("listLocal").addEventListener('dragover', OnHighlightListDragOver);
	document.getElementById ("listLocal").addEventListener('drop', OnHighlightListDrop);
	
	document.getElementById ("btnImportLocal").addEventListener('click', OnClickButtonImport);
	
	document.getElementById ("btnHiddenImportLocal").addEventListener('change', _OnChangeImport);
	
	document.getElementById ("btnExportLocal").addEventListener('click', OnClickButtonExport);
	document.getElementById ("btnExportAllLocal").addEventListener('click', OnClickButtonExport);
	
	document.getElementById ("btnRemoveLocal").addEventListener('click', OnClickButtonStorage);
	document.getElementById ("btnRemoveAllLocal").addEventListener('click', OnClickButtonStorage);
	document.getElementById ("btnGotoLocal").addEventListener('click', OnClickButtonStorage);	

	// page 6
	document.getElementById ("buttonSave").addEventListener('click', OnClickButtonSave);	
	
	// misc
	document.getElementById ("restoredefaults").addEventListener('click', OnClickRestoreDefaultSettings);	
	
	// previous onload function
	OnLoad();
	
	// page 2
	for(var x=1; x<=_arrPrefToClassName.length; x++){
		document.getElementById ("checkboxEnable" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("textBGColour" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("textFGColour" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("checkboxTransparentBG" + x).addEventListener('change', OnChangeHighlight);

		document.getElementById ("selectFontSize" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("selectFontSize" + x).addEventListener('keyup', OnChangeHighlight);

		document.getElementById ("checkboxUnderline" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("checkboxLinethrough" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("checkboxBold" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("checkboxItalic" + x).addEventListener('change', OnChangeHighlight);
		document.getElementById ("checkboxUpperCase" + x).addEventListener('change', OnChangeHighlight);

		document.getElementById ("buttonReset" + x).addEventListener('click', OnClickButtonReset);	
	}
	
});




///////////////////
// tooltips

var TOOLTIP_SHORTCUTKEY = 'Enter the number or letter part of your shortcut here (without the CTRL+/SHIFT+/ALT+ part).\n\n\
Valid keys:\n\
  All alpha/numeric keys - abc...xyz,01..89\n\
  Tab, Space, Return, Enter, Backspace, Scroll_lock, Caps_lock, Num_lock, Pause, Insert, Home, Delete, End, Page_up, Page_down, Left, Up, Right, Down, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10, F11, F12\n\n\
  These keys are case insensitive - so don\'t worry about using the correct case. If a key doesn\'t work it\'s probably been assigned to another function, or blocked.';

var TOOLTIP_BUTTONRESET = "Reset this shortcut to its default";

var TOOLTIP_TIP_MEDIAWIKI_LABEL_REMEMBERLASTSECTION = "When navigating between MediaWiki pages, try to go to the same section of the next page as that of the current. For example if querying the Italian section of the English language Wiktionary, then the next time the tip is opened (or a link is clicked on), if there is an Italian section to the page, you will be shown it first. This takes precedence over the Default Section setting";
var TOOLTIP_TIP_MEDIAWIKI_LABEL_DEFAULTSECTION = "Name of the section of the MediaWiki page to go to by default when it is first opened. Leave blank to use the first section (usually the Introduction). This item is case-insensitive. Only applies to main sections (ie: sections without decimal points)";

//var TOOLTIP_MOUSEACTIVATE_SHIFT = "Be careful which using Shift as a modifier, as it changes the boundaries of the currently selected text";	

///////////////////
// confirmations

var CONFIRM_RESTOREDEFAULTSETTINGS = "Are you sure you would like to restore the default settings?\n\nYour stored highlights and modified lookup templates will not be deleted, but all other settings will be restored.\n\nThis action can not be undone.";
var CONFIRM_RESTOREDEFAULTTEMPLATES = "Are you sure you wish to restore the list of templates to the default set?\n\nAny changes you have made will be lost. This action can not be undone.";
var CONFIRM_REMOVEALLSTORAGE = "Are you sure you wish to remove all the stored highlights from this specific database?\n\nThis action can not be undone.";

/////////////////////
// prompts

var PROMPT_IMPORTURL_MESSAGE = "Enter the URL of the exported highlights (including protocol, such as http:// or https://)";
var PROMPT_IMPORTURL_DEFAULTVALUE = "http://";

///////////////////
// ?

var LANGUAGENAME_AUTO = "Auto Detected";

var INNERHTML_BUTTONRESET = "Reset";

///////////////////
// template labels

var DEFAULTNAME_TEMPLATE = "Unnamed Template";
var DEFAULTNAME_GROUPSTART = "Unnamed Group";
//var DEFAULTNAME_GROUPEND = "";

var FORMAT_GROUPSTART = '<<GROUPNAME>> (Group Start)';
var FORMAT_GROUPEND = '<<GROUPNAME>> (Group End)';
var FORMAT_UNASSIGNED_GROUPEND = 'End of Group (unassigned)';

///////////////////
// innerhtml

var INNERHTML_MOUSEACTIVATE_ENABLE = "Enable this combination";
var INNERHTML_MOUSEACTIVATE_CLICK = "click the";
var INNERHTML_MOUSEACTIVATE_MOUSEBUTTON = "mouse button, whilst pressing";
var INNERHTML_MOUSEACTIVATE_CTRL = "Ctrl";
var INNERHTML_MOUSEACTIVATE_ALT = "Alt";
var INNERHTML_MOUSEACTIVATE_SHIFT = "Shift";

var INNERHTML_MOUSEACTIVATE_WARNING_CTRLALTSHIFT = "You must choose at least one of Ctrl, Alt or Shift when using Single-Click activation.";
var INNERHTML_MOUSEACTIVATE_WARNING_DOUBLECLICK = "Double-Clicking is currently only detected when using the Left mouse button.";
var INNERHTML_MOUSEACTIVATE_WARNING_SHIFT = "Using Shift as a modifier changes the boundaries of the current selection.";

var INNERHTML_TIP_LABEL_HEADING_RESTRICTIONS = "Restrictions"
var INNERHTML_TIP_LABEL_HEADING_PRESENTATION = "Presentation";
var INNERHTML_TIP_LABEL_HEADING_SPOKENLANGUAGES = "Spoken Languages";
var INNERHTML_TIP_LABEL_HEADING_SECTIONS = "Sections";
var INNERHTML_TIP_LABEL_HEADING_EDITIONS = "Editions";

var INNERHTML_TIP_GOOGLETRANSLATE_LABEL_HEADING_TRANSLATE = "Translation"
var INNERHTML_TIP_GOOGLETRANSLATE_LABEL_FROM = "From";
var INNERHTML_TIP_GOOGLETRANSLATE_LABEL_TO = "into";

var INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTTOHOST = "Limit scope of search to the current site";
var INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTSAFESEARCH = "Automated pornography filtering level (aka SafeSearch)";
var INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTIMAGESIZE = "Only search for images of size";
var INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTIMAGETYPE = "Only search for images containing";

var INNERHTML_TIP_FLICKR_LABEL_PRE_SORT = "Order results by";
var INNERHTML_TIP_FLICKR_LABEL_PRE_PERPAGE = "Show up to";
var INNERHTML_TIP_FLICKR_LABEL_POST_PERPAGE = "results per page";
var INNERHTML_TIP_FLICKR_LABEL_PRE_MEDIA = "Only search for";
var INNERHTML_TIP_FLICKR_LABEL_POST_INGALLERY = "Results must belong to a gallery";

var INNERHTML_TIP_MEDIAWIKI_LABEL_PRE_EDITION = "Query the";
var INNERHTML_TIP_MEDIAWIKI_LABEL_POST_EDITION = "language edition of the Wiki";
var INNERHTML_TIP_MEDIAWIKI_LABEL_POST_REMEMBERLASTSECTION = "Attempt to go to the same section of subsequent queries";
var INNERHTML_TIP_MEDIAWIKI_LABEL_PRE_DEFAULTSECTION = "Go to the";
var INNERHTML_TIP_MEDIAWIKI_LABEL_POST_DEFAULTSECTION = "section of the page by default, if it exists";

var INNERHTML_TIP_YAHOOWEB_LABEL_POST_RESTRICTTOHOST = "Limit scope of search to the current site";
var INNERHTML_TIP_YAHOOWEB_LABEL_POST_NOPORN = "Filter out results deemed pornographic";
var INNERHTML_TIP_YAHOOWEB_LABEL_POST_NOHATE = "Filter out results deemed hateful";
var INNERHTML_TIP_YAHOOWEB_LABEL_POST_LONGABSTRACT = "Show extended abstract for each result";
var INNERHTML_TIP_YAHOOWEB_LABEL_PRE_PERPAGE = "Show up to";
var INNERHTML_TIP_YAHOOWEB_LABEL_POST_PERPAGE = "results per page";

var INNERHTML_TIP_TWITTER_LABEL_PRE_PERPAGE = "Show up to";
var INNERHTML_TIP_TWITTER_LABEL_POST_PERPAGE = "tweets per page";
var INNERHTML_TIP_TWITTER_LABEL_PRE_RESULTTYPE = "Limit scope of search to";
var INNERHTML_TIP_TWITTER_LABEL_POST_RESULTTYPE = "tweets";
var INNERHTML_TIP_TWITTER_LABEL_PRE_REFRESHSTYLE = "When refreshing results, show latest tweets";

var INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_POST_AUTODETECT = "Try to speak in the native language of the text";
var INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_PRE_LANGUAGE = "Speak in";
var INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_POST_LANGUAGE = "if unable to determine native language";

///////////////////
// id

var ID_TIP_GOOGLETRANSLATE_FROM = "selectTipTemplate_GoogleTranslate_SrcLang";
var ID_TIP_GOOGLETRANSLATE_TO = "selectTipTemplate_GoogleTranslate_DestLang";

var ID_TIP_GOOGLEIMAGESEARCH_RESTRICTTOHOST = "inputTipTemplate_GoogleImageSearch_RestrictToHost";
var ID_TIP_GOOGLEIMAGESEARCH_RESTRICTSAFESEARCH = "inputTipTemplate_GoogleImageSearch_RestrictSafeSearch";
var ID_TIP_GOOGLEIMAGESEARCH_ENABLERESTRICTIMAGESIZE = "inputTipTemplate_GoogleImageSearch_EnableRestrictImageSize";
var ID_TIP_GOOGLEIMAGESEARCH_RESTRICTIMAGESIZE = "inputTipTemplate_GoogleImageSearch_RestrictImageSize";
var ID_TIP_GOOGLEIMAGESEARCH_ENABLERESTRICTIMAGETYPE = "inputTipTemplate_GoogleImageSearch_EnableRestrictImageType";
var ID_TIP_GOOGLEIMAGESEARCH_RESTRICTIMAGETYPE = "inputTipTemplate_GoogleImageSearch_RestrictImageType";

var ID_TIP_GOOGLETTS_LANGUAGE = "selectTipTemplate_GoogleTTS_Language";
var ID_TIP_GOOGLETTS_AUTODETECT = "inputTipTemplate_GoogleTTS_Autodetect";

var ID_TIP_FLICKR_SORT = "selectTipTemplate_Flickr_Sort";
var ID_TIP_FLICKR_MEDIA = "selectTipTemplate_Flickr_Media";
var ID_TIP_FLICKR_INGALLERY = "inputTipTemplate_Flickr_InGallery";
var ID_TIP_FLICKR_PERPAGE = "selectTipTemplate_Flickr_PerPage";

var ID_TIP_MEDIAWIKI_EDITION = "selectTipTemplate_Wikipedia_Edition";
var ID_TIP_MEDIAWIKI_REMEMBERLASTSECTION = "checkboxTipTemplate_Wikipedia_RememberLastSection";
var ID_TIP_MEDIAWIKI_DEFAULTSECTION = "inputTipTemplate_Wikipedia_DefaultSection"

var ID_TIP_YAHOOWEB_RESTRICTTOHOST = "inputTipTemplate_YWeb_RestrictToHost";
var ID_TIP_YAHOOWEB_NOPORN = "inputTipTemplate_YWeb_NoPorn";
var ID_TIP_YAHOOWEB_NOHATE = "inputTipTemplate_YWeb_NoHate";
var ID_TIP_YAHOOWEB_LONGABSTRACT = "inputTipTemplate_YWeb_LongAbstract";
var ID_TIP_YAHOOWEB_PERPAGE = "selectTipTemplate_YWeb_PerPage";

var ID_TIP_TWITTER_PERPAGE = "selectTipTemplate_Twitter_PerPage";
var ID_TIP_TWITTER_RESULTTYPE = "selectTipTemplate_Twitter_ResultType";
var ID_TIP_TWITTER_REFRESHSTYLE = "selectTipTemplate_Twitter_RefreshStyle";

var ID_TIP_MSTRANSLATE_TTS_LANGUAGE = "selectTipTemplate_MSTranslateTTS_Language";
var ID_TIP_MSTRANSLATE_TTS_AUTODETECT = "inputTipTemplate_MSTranslateTTS_Autodetect";

var ID_TIP_MSTRANSLATE_FROM = "selectTipTemplate_MSTranslate_SrcLang";
var ID_TIP_MSTRANSLATE_TO = "selectTipTemplate_MSTranslate_DestLang";

///////////////////
// maps preference values to the ids of the elements of its dynamically generated page, and also any similar stuff with a prference value

var _arrPrefToNodeID = [
	{prefHL: PREFERENCE_HL1, tdID: "tdEnable1", showInContextMenu: "checkboxEnable1", reset: "buttonReset1", label: "textLabel1", selectModPrefix: "selectShortcut1Modifier", shortcutText: "textShortcut1",
		bgColour: "textBGColour1", fgColour: "textFGColour1", fontSize: "selectFontSize1", uppercase: "checkboxUpperCase1", note: "checkboxNote1",
		transparentbg: "checkboxTransparentBG1", underline: "checkboxUnderline1", linethrough: "checkboxLinethrough1", bold: "checkboxBold1", italic: "checkboxItalic1"},
	{prefHL: PREFERENCE_HL2, tdID: "tdEnable2", showInContextMenu: "checkboxEnable2", reset: "buttonReset2", label: "textLabel2", selectModPrefix: "selectShortcut2Modifier", shortcutText: "textShortcut2",
		bgColour: "textBGColour2", fgColour: "textFGColour2", fontSize: "selectFontSize2", uppercase: "checkboxUpperCase2", note: "checkboxNote2",
		transparentbg: "checkboxTransparentBG2", underline: "checkboxUnderline2", linethrough: "checkboxLinethrough2", bold: "checkboxBold2", italic: "checkboxItalic2"},
	{prefHL: PREFERENCE_HL3, tdID: "tdEnable3", showInContextMenu: "checkboxEnable3", reset: "buttonReset3", label: "textLabel3", selectModPrefix: "selectShortcut3Modifier", shortcutText: "textShortcut3",
		bgColour: "textBGColour3", fgColour: "textFGColour3", fontSize: "selectFontSize3", uppercase: "checkboxUpperCase3", note: "checkboxNote3",
		transparentbg: "checkboxTransparentBG3", underline: "checkboxUnderline3", linethrough: "checkboxLinethrough3", bold: "checkboxBold3", italic: "checkboxItalic3"},
	{prefHL: PREFERENCE_HL4, tdID: "tdEnable4", showInContextMenu: "checkboxEnable4", reset: "buttonReset4", label: "textLabel4", selectModPrefix: "selectShortcut4Modifier", shortcutText: "textShortcut4",
		bgColour: "textBGColour4", fgColour: "textFGColour4", fontSize: "selectFontSize4", uppercase: "checkboxUpperCase4", note: "checkboxNote4",
		transparentbg: "checkboxTransparentBG4", underline: "checkboxUnderline4", linethrough: "checkboxLinethrough4", bold: "checkboxBold4", italic: "checkboxItalic4"},
	{prefHL: PREFERENCE_HL5, tdID: "tdEnable5", showInContextMenu: "checkboxEnable5", reset: "buttonReset5", label: "textLabel5", selectModPrefix: "selectShortcut5Modifier", shortcutText: "textShortcut5",
		bgColour: "textBGColour5", fgColour: "textFGColour5", fontSize: "selectFontSize5", uppercase: "checkboxUpperCase5", note: "checkboxNote5",
		transparentbg: "checkboxTransparentBG5", underline: "checkboxUnderline5", linethrough: "checkboxLinethrough5", bold: "checkboxBold5", italic: "checkboxItalic5"},
	{prefHL: PREFERENCE_HL6, tdID: "tdEnable6", showInContextMenu: "checkboxEnable6", reset: "buttonReset6", label: "textLabel6", selectModPrefix: "selectShortcut6Modifier", shortcutText: "textShortcut6",
		bgColour: "textBGColour6", fgColour: "textFGColour6", fontSize: "selectFontSize6", uppercase: "checkboxUpperCase6", note: "checkboxNote6",
		transparentbg: "checkboxTransparentBG6", underline: "checkboxUnderline6", linethrough: "checkboxLinethrough6", bold: "checkboxBold6", italic: "checkboxItalic6"},
	{prefHL: PREFERENCE_HL7, tdID: "tdEnable7", showInContextMenu: "checkboxEnable7", reset: "buttonReset7", label: "textLabel7", selectModPrefix: "selectShortcut7Modifier", shortcutText: "textShortcut7",
		bgColour: "textBGColour7", fgColour: "textFGColour7", fontSize: "selectFontSize7", uppercase: "checkboxUpperCase7", note: "checkboxNote7",
		transparentbg: "checkboxTransparentBG7", underline: "checkboxUnderline7", linethrough: "checkboxLinethrough7", bold: "checkboxBold7", italic: "checkboxItalic7"},
//          [PREFERENCE_UNHL_ALL, "btnResetRemoveAll", null, "selectShortcutRemoveAllModifier", "textShortcutRemoveAll", null, null, null, null, null],
	{prefHL: PREFERENCE_STORESESSION, reset: "btnResetShortcutSaveSession", selectModPrefix: "selectShortcutSaveSessionModifier", shortcutText: "textShortcutSaveSession" },
	{prefHL: PREFERENCE_STORELOCAL, reset: "btnResetShortcutSaveLocal", selectModPrefix: "selectShortcutSaveLocalModifier", shortcutText: "textShortcutSaveLocal" },

	{prefHL: PREFERENCE_LOOKUP, reset: "btnResetShortcutLookup", selectModPrefix: "selectShortcutLookupModifier", shortcutText: "textShortcutLookup" },
	{prefHL: PREFERENCE_LOOKUP_OPENINNEW, reset: "btnResetShortcutLookupNew", selectModPrefix: "selectShortcutLookupModifierNew", shortcutText: "textShortcutLookupNew" },
	{prefHL: PREFERENCE_LOOKUP_CREATEEMPTY, reset: "btnResetShortcutLookupEmpty", selectModPrefix: "selectShortcutLookupModifierEmpty", shortcutText: "textShortcutLookupEmpty" },

	{prefHL: PREFERENCE_TIPPOPUP, reset: "btnResetShortcutTip", selectModPrefix: "selectShortcutTipModifier", shortcutText: "textShortcutTip" },
	{prefHL: PREFERENCE_TIPPOPUP_MULTIPLE, reset: "btnResetShortcutTipMultiple", selectModPrefix: "selectShortcutTipMultipleModifier", shortcutText: "textShortcutTipMultiple" },
];

//////////////////////////////////////////////
// maps prefHL value to class name (selector) and id (of style element containing rules)

var _arrPrefToClassName = [
	{ prefHL: PREFERENCE_HL1, className: "cl1", id: "id1" },
	{ prefHL: PREFERENCE_HL2, className: "cl2", id: "id2" },
	{ prefHL: PREFERENCE_HL3, className: "cl3", id: "id3" },
	{ prefHL: PREFERENCE_HL4, className: "cl4", id: "id4" },
	{ prefHL: PREFERENCE_HL5, className: "cl5", id: "id5" },
	{ prefHL: PREFERENCE_HL6, className: "cl6", id: "id6" },
	{ prefHL: PREFERENCE_HL7, className: "cl7", id: "id7" }
];
/*
// convert preference_hl* value to associated classname, or null if not found
function _PrefHLToClassName(prefHL) {
	for (var i = 0; i < _arrPrefToClassName.length; i++) {
		if (_arrPrefToClassName[i].prefHL == prefHL)
			return _arrPrefToClassName[i].className;
	}
	return null;
};
*/

//////////////////////////////////////////////////////////////
// preference sources master list

var _PrefSourcesMasterList = [
	{id: "inputContextMenu", type: "checkbox", preference: PREFERENCE_CONTEXTMENU},
	{id: "inputWarnOnLeave", type: "checkbox", preference: PREFERENCE_WARNONUNLOAD},
//	{id: "inputIconPageAction", type: "checkbox", preference: PREFERENCE_PAGEACTION},
	{id: "selectMobilizer", type: "value", preference: PREFERENCE_MOBILIZER},
	{id: "selectPageIcon", type: "value", preference: PREFERENCE_PAGEACTION},
		{id: "selectHighlightStyle", type: "value", preference: PREFERENCE_HIGHLIGHTSTYLE},
	{id: "inputAutosave", type: "checkbox", preference: PREFERENCE_AUTOSAVE},
		{id: "selectAutosaveStorage", type: "value", preference: PREFERENCE_AUTOSAVE_STORE},
	
	{id: "textSnippetMax", type: "number", preference: PREFERENCE_SNIPPETMAX},
	{id: "selectTranslationStyle", type: "value", preference: PREFERENCE_POPUP_TRANSLATIONSTYLE},
	{id: "selectSpeechService", type: "value", preference: PREFERENCE_POPUP_SPEECHSERVICE},
	
	{id: "inputAutoTransNote", type: "checkbox", preference: PREFERENCE_AUTOTRANS_NOTE},
	{id: "inputAutoTransHL", type: "checkbox", preference: PREFERENCE_AUTOTRANS_SNIPPET},
	{id: "selectTransHLSrcLang", type: "value", preference: PREFERENCE_TRANSSNIPPET_SRCLANG_BING},
	{id: "selectTransHLDestLang", type: "value", preference: PREFERENCE_TRANSSNIPPET_DESTLANG_BING},
	{id: "selectTransNoteSrcLang", type: "value", preference: PREFERENCE_TRANSNOTE_SRCLANG_BING},
	{id: "selectTransNoteDestLang", type: "value", preference: PREFERENCE_TRANSNOTE_DESTLANG_BING},

	{id: "inputDefaultShowTransHLs", type: "checkbox", preference: PREFERENCE_SHOWTRANSLATEDSNIPPETS},
	{id: "inputDefaultShowNotes", type: "checkbox", preference: PREFERENCE_SHOWNOTES},

	{id: "inputRememberPosLookup", type: "checkbox", preference: PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT},
	{id: "inputWordUnderCursorLookup", type: "checkbox", preference: PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR},
	{id: "inputWordUnderCursorTip", type: "checkbox", preference: PREFERENCE_TIPPOPUP_WORDUNDERCURSOR},
//		{id: "selectOpacityLookup", type: "value", preference: PREFERENCE_LOOKUPPOPUP_OPACITY},
	
	{id: {enable: "inputEnableMouseLookup", button: "selectButtonMouseLookup", click: "selectDoubleClickMouseLookup",
			ctrl: "inputCtrlMouseLookup", alt: "inputAltMouseLookup", shift: "inputShiftMouseLookup"},
		type: "mouseactivate", preference: PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE},
	{id: {enable: "inputEnableMouseTip", button: "selectButtonMouseTip", click: "selectDoubleClickMouseTip",
			ctrl: "inputCtrlMouseTip", alt: "inputAltMouseTip", shift: "inputShiftMouseTip"},
		type: "mouseactivate", preference: PREFERENCE_TIPPOPUP_MOUSEACTIVATE},
];


// Restores select box state to saved value from localStorage.
function OnLoad() {
	//////////////////////////////////
	// 1. build dynamic bit
	
	//////////////////////////////////////
	// 1.1 shortcut elements
	
	// 1.1.1 save (page 'lookup')
	CreateShortcutElement(document.getElementById("divShortcutSaveSession"), {
		idSelectModifier: "selectShortcutSaveSessionModifier", idInputKey: "textShortcutSaveSession", idButtonReset: "btnResetShortcutSaveSession" });
	CreateShortcutElement(document.getElementById("divShortcutSaveLocal"), {
		idSelectModifier: "selectShortcutSaveLocalModifier", idInputKey: "textShortcutSaveLocal", idButtonReset: "btnResetShortcutSaveLocal" });
	// 1.1.2 lookup (page 'lookup')
	CreateShortcutElement(document.getElementById("divShortcutLookup"), {
		idSelectModifier: "selectShortcutLookupModifier", idInputKey: "textShortcutLookup", idButtonReset: "btnResetShortcutLookup" });
	CreateShortcutElement(document.getElementById("divShortcutLookupNew"), {
		idSelectModifier: "selectShortcutLookupModifierNew", idInputKey: "textShortcutLookupNew", idButtonReset: "btnResetShortcutLookupNew" });
	CreateShortcutElement(document.getElementById("divShortcutLookupEmpty"), {
		idSelectModifier: "selectShortcutLookupModifierEmpty", idInputKey: "textShortcutLookupEmpty", idButtonReset: "btnResetShortcutLookupEmpty" });
	CreateMouseActivateElements(document.getElementById("divActivateMouseLookup"),
		{enable: "inputEnableMouseLookup", button: "selectButtonMouseLookup", click: "selectDoubleClickMouseLookup",
			ctrl: "inputCtrlMouseLookup", alt: "inputAltMouseLookup", shift: "inputShiftMouseLookup"});
	// 1.1.3 per-template lookup (page 'lookup')
	CreateShortcutElement(document.getElementById("divTemplateShortcut"), {
		idSelectModifier: "selectShortcutTemplateModifier", idInputKey: "textShortcutTemplate", idButtonReset: "btnResetShortcutTemplate" }, OnChangeTemplateElement);
		
	// 1.1.4 tip (page 'tip')
	CreateShortcutElement(document.getElementById("divShortcutTip"), {
		idSelectModifier: "selectShortcutTipModifier", idInputKey: "textShortcutTip", idButtonReset: "btnResetShortcutTip" });
	CreateShortcutElement(document.getElementById("divShortcutTipMultiple"), {
		idSelectModifier: "selectShortcutTipMultipleModifier", idInputKey: "textShortcutTipMultiple", idButtonReset: "btnResetShortcutTipMultiple" });
	CreateMouseActivateElements(document.getElementById("divActivateMouseTip"),	// dbl click only works with left button
		{enable: "inputEnableMouseTip", button: "selectButtonMouseTip", hideLeftButton: true, hideDoubleClick: true, click: "selectDoubleClickMouseTip",
			ctrl: "inputCtrlMouseTip", alt: "inputAltMouseTip", shift: "inputShiftMouseTip"});
	// per-tiptemplate shortcut (page 'lookup')
	CreateShortcutElement(document.getElementById("divTipTemplateShortcut"), {
		idSelectModifier: "selectShortcutTipTemplateModifier", idInputKey: "textShortcutTipTemplate", idButtonReset: "btnResetShortcutTipTemplate" }, OnChangeTipTemplateElement);
	
	//////////////////////////////////////
	// 1.2 populate selectors
	// page 1
	PopulateLanguages("selectTransHLSrcLang", {prependAuto: true, bing: true});
	PopulateLanguages("selectTransHLDestLang", {bing:true});
	PopulateLanguages("selectTransNoteSrcLang", {prependAuto: true, bing: true});
	PopulateLanguages("selectTransNoteDestLang", {bing:true});
	
	//////////////////////////////////////
	// 1.3
	BuildPage2();			
	
	//////////////////////////////////////
	// 1.4 set values for in elements from PREFERENCE_ codes
/*
	var sources = [
		{id: "inputContextMenu", type: "checkbox", preference: PREFERENCE_CONTEXTMENU},
		{id: "inputWarnOnLeave", type: "checkbox", preference: PREFERENCE_WARNONUNLOAD},
		{id: "inputIconPageAction", type: "checkbox", preference: PREFERENCE_PAGEACTION},
			{id: "selectHighlightStyle", type: "value", preference: PREFERENCE_HIGHLIGHTSTYLE},
		{id: "inputAutosave", type: "checkbox", preference: PREFERENCE_AUTOSAVE},
			{id: "selectAutosaveStorage", type: "value", preference: PREFERENCE_AUTOSAVE_STORE},
		
		{id: "textSnippetMax", type: "number", preference: PREFERENCE_SNIPPETMAX},
		{id: "selectTranslationStyle", type: "value", preference: PREFERENCE_POPUP_TRANSLATIONSTYLE},
		{id: "selectSpeechService", type: "value", preference: PREFERENCE_POPUP_SPEECHSERVICE},
		
		{id: "inputAutoTransNote", type: "checkbox", preference: PREFERENCE_AUTOTRANS_NOTE},
		{id: "inputAutoTransHL", type: "checkbox", preference: PREFERENCE_AUTOTRANS_SNIPPET},
		{id: "selectTransHLSrcLang", type: "value", preference: PREFERENCE_TRANSSNIPPET_SRCLANG},
		{id: "selectTransHLDestLang", type: "value", preference: PREFERENCE_TRANSSNIPPET_DESTLANG},
		{id: "selectTransNoteSrcLang", type: "value", preference: PREFERENCE_TRANSNOTE_SRCLANG},
		{id: "selectTransNoteDestLang", type: "value", preference: PREFERENCE_TRANSNOTE_DESTLANG},

		{id: "inputDefaultShowTransHLs", type: "checkbox", preference: PREFERENCE_SHOWTRANSLATEDSNIPPETS},
		{id: "inputDefaultShowNotes", type: "checkbox", preference: PREFERENCE_SHOWNOTES},

		{id: "inputRememberPosLookup", type: "checkbox", preference: PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT},
		{id: "inputWordUnderCursorLookup", type: "checkbox", preference: PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR},
		{id: "inputWordUnderCursorTip", type: "checkbox", preference: PREFERENCE_TIPPOPUP_WORDUNDERCURSOR},
//		{id: "selectOpacityLookup", type: "value", preference: PREFERENCE_LOOKUPPOPUP_OPACITY},
		
		{id: {enable: "inputEnableMouseLookup", button: "selectButtonMouseLookup", click: "selectDoubleClickMouseLookup",
				ctrl: "inputCtrlMouseLookup", alt: "inputAltMouseLookup", shift: "inputShiftMouseLookup"},
			type: "mouseactivate", preference: PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE},
		{id: {enable: "inputEnableMouseTip", button: "selectButtonMouseTip", click: "selectDoubleClickMouseTip",
				ctrl: "inputCtrlMouseTip", alt: "inputAltMouseTip", shift: "inputShiftMouseTip"},
			type: "mouseactivate", preference: PREFERENCE_TIPPOPUP_MOUSEACTIVATE},
	];
*/	
	for(var q in _PrefSourcesMasterList){
		var elem;
		if(_PrefSourcesMasterList[q].type == "mouseactivate")
			elem = null;
		else
			elem = document.getElementById(_PrefSourcesMasterList[q].id);
			
		var pref = GetPreference(_PrefSourcesMasterList[q].preference);
		
		if(_PrefSourcesMasterList[q].type == "checkbox")
			elem.checked = (pref == PREFBOOL_TRUE ? true : false);
//				else if(sources[q].type == "select")
//					elem.selectedIndex = elem.options[pref].index;
		else if(_PrefSourcesMasterList[q].type == "number"){
			var num = new Number(pref);
			if (isNaN(num) == false)
				elem.value = num;
		}
		else if(_PrefSourcesMasterList[q].type == "value")
			elem.value = pref;
		else if(_PrefSourcesMasterList[q].type == "mouseactivate"){
			document.getElementById(_PrefSourcesMasterList[q].id.button).value = pref.button;
			document.getElementById(_PrefSourcesMasterList[q].id.ctrl).checked = (pref.ctrlKey == true ? true : false);
			document.getElementById(_PrefSourcesMasterList[q].id.alt).checked = (pref.altKey == true ? true : false);
			document.getElementById(_PrefSourcesMasterList[q].id.shift).checked = (pref.shiftKey == true ? true : false);
			
			document.getElementById(_PrefSourcesMasterList[q].id.click).value = (pref.dbl == true ? true : false);
			OnChangeSelectClickMouseActivate({currentTarget: document.getElementById(_PrefSourcesMasterList[q].id.click)});		// sync
			
			document.getElementById(_PrefSourcesMasterList[q].id.enable).checked = (pref.enabled == true ? true : false);
			OnChangeInputEnableMouseActivate({currentTarget: document.getElementById(_PrefSourcesMasterList[q].id.enable)});		// sync
		}
	}
	
	// 1.4.1 set vlauees highlight & shortcuts 
	_arrPrefToNodeID.forEach(function (arr) {
		SetHighlight(arr.prefHL, GetPreference(arr.prefHL));
	});

	// 1.4.2 populate templates
	// Populate the template selector
	PopulateSelectLookupTemplate();
	// Populate tip master template selector
	PopulateSelectTipTemplate();
	
	// 1.4.3 load the sessionStorage/localStorage highlights (could do local ourselves)
	PopulateHighlightList();
	
	// fake events
	OnChange();
	OnChangeHighlight();

	// select tab
	var numberTab = 1;		// default
	var searchVars = location.search.GetSearchVariables();
	if(searchVars.tab){
		// first check name
		var arr = [
			{value: "tip", number: 4}
		];
		for(var y in arr){
			if(arr[y].value == searchVars.tab){
				numberTab = arr[y].number;
				break;
			}
		}
		
		// fail?
		if(y == arr.length){
			var value = new Number(searchVars.tab);
			if(isNaN(value) != true)
				numberTab = value;
		}
	}	
	
	OnClickTab(document.getElementById("tab" + numberTab));
}

/////////////////////////////////////////////////////////////////////////
// events (not lookup/tip)

// create/replace stylesheet for every highlight
function OnChangeHighlight() {
	// create classes for highlights, read from the document not preferences
	var arrayPrefs = GetPreference([
		PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW,
			PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING, PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW,
		PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING,
			PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW]);

	// override with current value
	arrayPrefs[PREFERENCE_HIGHLIGHTSTYLE] =
		document.getElementById("selectHighlightStyle").options[document.getElementById("selectHighlightStyle").selectedIndex].value

	// add styles for each highlight to pages stylesheet
	for(var h in _arrPrefToClassName){
		// corresponding row for prefHL in arrayPrefHLToNodeID
		for (var x in _arrPrefToNodeID) {
			if (_arrPrefToNodeID[x].prefHL == _arrPrefToClassName[h].prefHL) {
				// create style element with this id, for this class
				var styleElement = document.createElement('style');
				styleElement.id = _arrPrefToClassName[h].id;

				styleElement.textContent = "." + _arrPrefToClassName[h].className + " { " +
					GetStyleElementText(arrayPrefs, BuildPrefHLObject(_arrPrefToNodeID[x]), "options");
				styleElement.textContent +=	" }";

				// change opacity for highlights not shown in context menu
				styleElement.textContent +=	" #" + _arrPrefToNodeID[x].tdID + " { opacity: ";
				styleElement.textContent += (document.getElementById(_arrPrefToNodeID[x].showInContextMenu).checked) == true ? 1 : 0.2;
				styleElement.textContent +=	" }";
							
				// if it exists, replace it
				var elem = document.getElementById(_arrPrefToClassName[h].id);
				if (elem != null)
					document.head.replaceChild(styleElement, elem);
				else
					document.head.appendChild(styleElement);

					
				break;
			}
		} // end for
	}
}

// General 'OnChange' for elements'. disable if now in specific state
function OnChange() {
	var arr = [
		{idDisable: "selectAutosaveStorage", idCheck: "inputAutosave", varName: "checked", value: false},
		
		{idDisable: "btnExportSession", idCheck: "listSession", varName: "selectedIndex", value: -1},
		{idDisable: "btnExportAllSession", idCheck: "listSession", varName: "length", value: 0},
		{idDisable: "btnRemoveAllSession", idCheck: "listSession", varName: "length", value: 0},
		{idDisable: "btnRemoveSession", idCheck: "listSession", varName: "selectedIndex", value: -1},
		{idDisable: "btnGotoSession", idCheck: "listSession", varName: "selectedIndex", value: -1},
		
		{idDisable: "btnExportLocal", idCheck: "listLocal", varName: "selectedIndex", value: -1},
		{idDisable: "btnExportAllLocal", idCheck: "listLocal", varName: "length", value: 0},
		{idDisable: "btnRemoveAllLocal", idCheck: "listLocal", varName: "length", value: 0},
		{idDisable: "btnRemoveLocal", idCheck: "listLocal", varName: "selectedIndex", value: -1},
		{idDisable: "btnGotoLocal", idCheck: "listLocal", varName: "selectedIndex", value: -1},
	];
	
	for(var q in arr){
		document.getElementById(arr[q].idDisable).disabled = 
			(document.getElementById(arr[q].idCheck)[arr[q].varName] == arr[q].value) ? true : false;
	}
/*
		
	document.getElementById("selectAutosaveStorage").disabled =
		document.getElementById("inputAutosave").checked ? false : true;

	document.getElementById("btnRemoveAllSession").disabled =
		document.getElementById("listSession").length == 0 ? true : false;
	document.getElementById("btnRemoveSession").disabled =
		document.getElementById("listSession").selectedIndex == -1 ? true : false;
	document.getElementById("btnGotoSession").disabled =
		document.getElementById("listSession").selectedIndex == -1 ? true : false;

	document.getElementById("btnRemoveAllLocal").disabled =
		document.getElementById("listLocal").length == 0 ? true : false;
	document.getElementById("btnRemoveLocal").disabled =
		document.getElementById("listLocal").selectedIndex == -1 ? true : false;
	document.getElementById("btnGotoLocal").disabled =
		document.getElementById("listLocal").selectedIndex == -1 ? true : false;*/
}

// Reset button for a specific item. reload the defaults
function OnClickButtonReset() {
	// special case - btnResetShortcutTemplate is not in _arrPrefToNodeID
	if(event.currentTarget.id == "btnResetShortcutTemplate"){
		SetShortcutElements(null, [
			document.getElementById("selectShortcutTemplateModifier1"),
			document.getElementById("selectShortcutTemplateModifier2"), 
			document.getElementById("selectShortcutTemplateModifier3")],
			document.getElementById("textShortcutTemplate"));
	}
	else if(event.currentTarget.id == "btnResetShortcutTipTemplate"){
		SetShortcutElements(null, [
			document.getElementById("selectShortcutTipTemplateModifier1"),
			document.getElementById("selectShortcutTipTemplateModifier2"), 
			document.getElementById("selectShortcutTipTemplateModifier3")],
			document.getElementById("textShortcutTipTemplate"));
	}
	else{
		for(var i in _arrPrefToNodeID) {
			if (_arrPrefToNodeID[i].reset == event.currentTarget.id) {
				// force default preference get with true option
				SetHighlight(_arrPrefToNodeID[i].prefHL, GetPreference(_arrPrefToNodeID[i].prefHL, true) );
				break;
			}
		}
	}
}

// save all values into localstorage
function OnClickButtonSave() {
	// 1 - individual values
/*	var sources = [
		{id: "inputContextMenu", type: "checkbox", preference: PREFERENCE_CONTEXTMENU},
		{id: "inputWarnOnLeave", type: "checkbox", preference: PREFERENCE_WARNONUNLOAD},
		{id: "inputIconPageAction", type: "checkbox", preference: PREFERENCE_PAGEACTION},
		{id: "selectHighlightStyle", type: "value", preference: PREFERENCE_HIGHLIGHTSTYLE},
		{id: "inputAutosave", type: "checkbox", preference: PREFERENCE_AUTOSAVE},
		{id: "selectAutosaveStorage", type: "value", preference: PREFERENCE_AUTOSAVE_STORE},

		{id: "textSnippetMax", type: "number", preference: PREFERENCE_SNIPPETMAX},
		{id: "selectTranslationStyle", type: "value", preference: PREFERENCE_POPUP_TRANSLATIONSTYLE},
		{id: "selectSpeechService", type: "value", preference: PREFERENCE_POPUP_SPEECHSERVICE},
		
		{id: "inputAutoTransNote", type: "checkbox", preference: PREFERENCE_AUTOTRANS_NOTE},
		{id: "inputAutoTransHL", type: "checkbox", preference: PREFERENCE_AUTOTRANS_SNIPPET},
		{id: "selectTransHLSrcLang", type: "value", preference: PREFERENCE_TRANSSNIPPET_SRCLANG},
		{id: "selectTransHLDestLang", type: "value", preference: PREFERENCE_TRANSSNIPPET_DESTLANG},
		{id: "selectTransNoteSrcLang", type: "value", preference: PREFERENCE_TRANSNOTE_SRCLANG},
		{id: "selectTransNoteDestLang", type: "value", preference: PREFERENCE_TRANSNOTE_DESTLANG},

		{id: "inputDefaultShowTransHLs", type: "checkbox", preference: PREFERENCE_SHOWTRANSLATEDSNIPPETS},
		{id: "inputDefaultShowNotes", type: "checkbox", preference: PREFERENCE_SHOWNOTES},

		{id: "inputRememberPosLookup", type: "checkbox", preference: PREFERENCE_LOOKUPPOPUP_REMEMBER_PLACEMENT},
		{id: "inputWordUnderCursorLookup", type: "checkbox", preference: PREFERENCE_LOOKUPPOPUP_WORDUNDERCURSOR},
		{id: "inputWordUnderCursorTip", type: "checkbox", preference: PREFERENCE_TIPPOPUP_WORDUNDERCURSOR},
//		{id: "selectOpacityLookup", type: "value", preference: PREFERENCE_LOOKUPPOPUP_OPACITY},

		{id: {enable: "inputEnableMouseLookup", button: "selectButtonMouseLookup", click: "selectDoubleClickMouseLookup",
				ctrl: "inputCtrlMouseLookup", alt: "inputAltMouseLookup", shift: "inputShiftMouseLookup"},
			type: "mouseactivate", preference: PREFERENCE_LOOKUPPOPUP_MOUSEACTIVATE},
		{id: {enable: "inputEnableMouseTip", button: "selectButtonMouseTip", click: "selectDoubleClickMouseTip",
				ctrl: "inputCtrlMouseTip", alt: "inputAltMouseTip", shift: "inputShiftMouseTip"},
			type: "mouseactivate", preference: PREFERENCE_TIPPOPUP_MOUSEACTIVATE},
	];
	*/
	for(var q in _PrefSourcesMasterList){
		var elem = document.getElementById(_PrefSourcesMasterList[q].id);
		var pref = GetPreference(_PrefSourcesMasterList[q].preference);
		var value;
		
		if(_PrefSourcesMasterList[q].type == "checkbox")
			value = elem.checked ? PREFBOOL_TRUE : PREFBOOL_FALSE;
		else if(_PrefSourcesMasterList[q].type == "value")
			value = elem.value;
		else if(_PrefSourcesMasterList[q].type == "number"){
			value = new Number(elem.value);
			if(value == 0 || isNaN(value) == true)
				continue;
		}
		else if(_PrefSourcesMasterList[q].type == "mouseactivate"){
			value = {
				enabled: document.getElementById(_PrefSourcesMasterList[q].id.enable).checked,
				button: document.getElementById(_PrefSourcesMasterList[q].id.button).value,
				dbl: document.getElementById(_PrefSourcesMasterList[q].id.click).value == PREFBOOL_TRUE ? true : false,
				ctrlKey: document.getElementById(_PrefSourcesMasterList[q].id.ctrl).checked,
				altKey: document.getElementById(_PrefSourcesMasterList[q].id.alt).checked,
				shiftKey: document.getElementById(_PrefSourcesMasterList[q].id.shift).checked,
			};

			// ignore single click with no modifier
			if(value.dbl == false && value.ctrlKey == false && value.altKey == false && value.shiftKey == false)
				continue;
		}
		else
			continue;
			
		SetPreference(_PrefSourcesMasterList[q].preference, value);
	}
	
	// 2 - save templates
	
	// build a lookupTemplates array from the select options
	var optionsTemplate = document.getElementById("selectTemplate").options;
	var arrLookupTemplates = [];
	
	for(var x=0; x<optionsTemplate.length; x++)
		arrLookupTemplates.push(optionsTemplate[x].SimpleHighlight.lookupTemplate);
	SetPreference(PREFERENCE_LOOKUP_TEMPLATES, arrLookupTemplates);

	// build a tipPopupTemplates array from teh select options
	var optionsTemplate = document.getElementById("selectTipTemplate").options;
	var arrTipPopupTemplates = [];
	for(var x=0; x<optionsTemplate.length; x++)
		arrTipPopupTemplates.push(optionsTemplate[x].SimpleHighlight.tipPopupTemplate);
	SetPreference(PREFERENCE_TIPPOPUP_TEMPLATES, arrTipPopupTemplates);

	// 3 - everything in _arrPrefToNodeID (mostly highlights and shortcuts)
	
	// save highlights (also anything with a shortcut)
	// iterate through each applicable value in arrayPrefHLToNodeID, saving to localstorage
	for(var i in _arrPrefToNodeID) {
		// build structure which can be sent to SetPreference for this HL
		var key = _arrPrefToNodeID[i].prefHL;
		if (key != null){
			var prefHLObject = BuildPrefHLObject(_arrPrefToNodeID[i]);		// prefHLObject is what gets stored for highlight descriptions (and also anything in the menu)
			// workaround - things that only have a shortcut would erase anything else in the array,
			// so copy them back
			if(_arrPrefToNodeID[i].label == null)
				prefHLObject.label = GetPreference(_arrPrefToNodeID[i].prefHL).label;
			
			SetPreference(key, prefHLObject);
		}
	}

	// tell tabs to re-read
	SendReloadPreferencesMessage();
}

function OnClickRestoreDefaultTemplates(){
	var elem = event.currentTarget;
	var pref;

	// get the key which is to be removed
	if(elem.id == "buttonTemplateResetAll")
		pref = PREFERENCE_LOOKUP_TEMPLATES;
	else if(elem.id == "buttonTipTemplateResetAll")
		pref = PREFERENCE_TIPPOPUP_TEMPLATES;
	else
		return;
	
	// confirmation
	if (confirm(CONFIRM_RESTOREDEFAULTTEMPLATES) == true) {
		RemovePreference( pref );
		
		// re-read
		SendReloadPreferencesMessage();
		// refresh options page
		location.reload(true);
	}
}

// clear everything in localstorage except with prefix http: or https: (stored highlights)
function OnClickRestoreDefaultSettings() {
	if (confirm(CONFIRM_RESTOREDEFAULTSETTINGS) == true) {
		// leave http* values in localstorage
		for (var x=localStorage.length-1; x>=0; x--) {
			var pref = localStorage.key(x);
			
			if (pref.indexOf("http:") != 0 && pref.indexOf("https:") != 0 &&
				pref != PREFERENCE_LOOKUP_TEMPLATES/* && pref != PREFERENCE_TIPPOPUP_TEMPLATES*/){
				//
				RemovePreference( localStorage.key(x) );
//				localStorage.removeItem( localStorage.key(x) );
			}
		}
	
//		// nuclear force option
//		localStorage.clear();

		// clear all highlights in session storage
//		chrome.extension.sendRequest({ msg: "saveHighlights", url: null, store: "session" }, function (result) {
			// make tabs reread new prefs
			SendReloadPreferencesMessage();
		
			// refresh options page
			location.reload(true);
//		});
	}
}

function _OnClickTab()
{
	OnClickTab(this);
}

function OnClickTab(spanTabClicked) {
	event.returnValue = false;			// dont scroll page

	// iterate each tab, hiding page if it's not selected
	var numberTab = 1;

	while (true) {
		// break loop on first non-tab
		var spanTab = document.getElementById("tab" + numberTab);
		if (spanTab == null)
			break;

		// select correct tab
		if(spanTab == spanTabClicked)
			spanTab.classList.add("selectedtab");
		else
			spanTab.classList.remove("selectedtab");
		
		// show/hide correct page
		document.getElementById("page" + numberTab).style.setProperty("display", (spanTab == spanTabClicked ? "" : "none"), "important");

		numberTab++;
	}

	// dog on 6
	if (spanTabClicked.id == "tab6")
		document.getElementById("logoimage").src = "img/toby_alsation_x_airedale.png";
//	document.getElementById("logoimage").src = "img/" + (spanTabClicked.id == "tab2" ? "toby_alsation_x_airedale.png" : "128.png");
}

function OnClickButtonStorage() {
	var btn = this;

	if (btn.id == "btnRemoveSession" || btn.id == "btnRemoveLocal") {
		var listObject = document.getElementById(btn.id == "btnRemoveSession" ? "listSession" : "listLocal");

		// handle multiple selections
		for (x = 0; x < listObject.options.length; x++) {
			if (listObject.options[x].selected == true) {
				chrome.extension.sendRequest({ msg: "saveHighlights", url: listObject.options[x].value,
					store: (btn.id == "btnRemoveSession" ? "session" : "local"), arrayHighlights: null
				}, function () {
					//
					listObject.options.remove(listObject.selectedIndex);
				});
			}
		}
	}
	else if (btn.id == "btnRemoveAllSession" || btn.id == "btnRemoveAllLocal") {
		if(confirm(CONFIRM_REMOVEALLSTORAGE) == true){
			var listObject = document.getElementById(btn.id == "btnRemoveAllSession" ? "listSession" : "listLocal");

			chrome.extension.sendRequest({ msg: "saveHighlights", url: null, store: (btn.id == "btnRemoveAllSession" ? "session" : "local") }, function () {
				// remove all
				while (listObject.options.length > 0)
					listObject.remove(0);
			});
		}
	}
	else if (btn.id == "btnGotoSession" || btn.id == "btnGotoLocal" || btn.id == "listSession" || btn.id == "listLocal" ) {
		var listObject = document.getElementById( (btn.id == "btnGotoSession" || btn.id == "listSession") ? "listSession" : "listLocal");

		for (x = 0; x < listObject.options.length; x++) {
			if (listObject.options[x].selected == true)
				chrome.tabs.create({ url: listObject.options[x].value });
		}
	}

	OnChange();
}

function OnClickButtonExport(){
	var btn = this;

	if(btn.id == "btnExportAllSession" || btn.id == "btnExportAllLocal") {
		chrome.extension.sendRequest({ 
			msg: "exportHighlights", 
			urls: null,
			asXml: (event.ctrlKey == true && event.altKey == true && event.shiftKey == true) ? true : false,
			store: (btn.id == "btnExportAllSession" ? "session" : "local")});
	}
	else if(btn.id == "btnExportSession" || btn.id == "btnExportLocal"){
		var listObject = document.getElementById(btn.id == "btnExportSession" ? "listSession" : "listLocal");

		var arrURLs = [];			// list of urls for called routine to place in export array
				
		// handle multiple selections
		for (var x = 0; x < listObject.options.length; x++) {
			if (listObject.options[x].selected == true) 
				arrURLs.push(listObject.options[x].value);		// key is listitem name (url)
		}
		
		if(arrURLs.length > 0){
			chrome.extension.sendRequest({ 
				msg: "exportHighlights", 
				urls:arrURLs,
				asXml: (event.ctrlKey == true && event.altKey == true && event.shiftKey == true) ? true : false,
				store: (btn.id == "btnExportSession" ? "session" : "local")});
		}
	}
}

function OnClickButtonImport(){
	var btn = this;

	if(event.altKey == true){
		var xhr = new XMLHttpRequest();
		
		// prompt for url
		var url = prompt(PROMPT_IMPORTURL_MESSAGE, PROMPT_IMPORTURL_DEFAULTVALUE);
		if(url == null)
			return;
		xhr.open('GET', url, true);
		
		// get storename depending on source of event
		xhr.store = (btn.id == "btnImportSession" ? "session" : "local");
				
		xhr.onreadystatechange = function (aEvt) {
			if (xhr.readyState == 4) {
				if(xhr.status == 200){
					// text in xhr.responseText
					chrome.extension.sendRequest({ msg: "importHighlightFromStringifiedImportObject", 
						stringifiedImportObject: xhr.responseText, store: xhr.store }, function(res){
							if(res.error)
								alert("Error: " + res.error);
							else{
								// only refresh if changes made
								if(res.importCount > 0)
									PopulateHighlightList();//location.reload(true);
							}
						});
					
				}
//				else
//					dump("Error loading page\n");
			}
		};
		
		xhr.send(null);	
	}
	else{
		// fake click to real import button
		var btnReal = document.getElementById(btn.id == "btnImportSession" ? 
			"btnHiddenImportSession" : "btnHiddenImportLocal");
		btnReal.click();
	}
}

function _OnChangeImport()
{
	OnChangeImport(this.files);
}

function OnChangeImport(files){
	//var files = event.target.files; // FileList object
	
	// get storename depending on source of event
	var store = (event.currentTarget.id == "btnHiddenImportSession" || event.currentTarget.id == "listSession") ? 
		"session" : "local"

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				// text in e.target.result
				chrome.extension.sendRequest({ msg: "importHighlightFromStringifiedImportObject", 
					stringifiedImportObject: e.target.result, store: store }, function(res){
						if(res.error)
							alert("Error: " + res.error);
						else{
							// only refresh if changes made
							if(res.importCount > 0)
								PopulateHighlightList();//location.reload(true);
						}
					});
			};
		})(f);

		//reader.readAsDataURL(f);	
		reader.readAsText(f);
	}
}

// drag and drop for import

function OnHighlightListDragOver() {
    event.stopPropagation();
    event.preventDefault();
}

function OnHighlightListDrop() {
    event.stopPropagation();
    event.preventDefault();

    OnChangeImport(event.dataTransfer.files); // FileList object.
}

function PopulateHighlightList(){
	// empty and populate each

	document.getElementById("listLocal").options.length = 0;
	chrome.extension.sendRequest({ msg: "loadAllHighlights", store: "local" }, function (arrayHighlights) {
		var list = document.getElementById("listLocal");
		for (key in arrayHighlights)
			list.options.add(new Option(key, key));

		OnChange();
	});

	document.getElementById("listSession").options.length = 0;
	chrome.extension.sendRequest({ msg: "loadAllHighlights", store: "session" }, function (arrayHighlights) {
		var list = document.getElementById("listSession");
		for (key in arrayHighlights)
			list.options.add(new Option(key, key));

		OnChange();
	});
}

/*
function OnChangeEnableMouseLookup(e){
	var arrID = ["selectButtonMouseLookup", "selectDoubleClickMouseLookup", "inputCtrlMouseLookup", "inputAltMouseLookup", "inputShiftMouseLookup"];
	for(var x in arrID)
		document.getElementById(arrID[x]).disabled = (e.currentTarget.checked == true ? false : true);
}

function OnChangeSelectDoubleClickMouseLookup(e){
	// e.currentTarget is selectDoubleClickMouseLookup
	document.getElementById("spanSingleClickWarningMouseLookup").style.display =
		(e.currentTarget.value == PREFBOOL_FALSE ? "" : "none");
}
*/		

/////////////////////////		

function BuildPage2(){
	for(var x=1; x<=_arrPrefToClassName.length; x++){
		var innerHTML = "";

		innerHTML += '<tr>';
		innerHTML +=  '<td><div class="option_name option_highlight ' + _arrPrefToClassName[x-1].className + '" title="Preview of the appearance of the highlight for this label.">';
		innerHTML +=   '<input id="checkboxEnable' + x + '" type="checkbox" title="Enable this highlight definition" style="position: absolute;" />';
		innerHTML +=   x + '</div>';
		innerHTML +=  '</td>';

		innerHTML +=  '<td id="tdEnable' + x + '" class="showHighlightTransition">';
		innerHTML +=   '<table>';
/*
		innerHTML +=    '<tr style="color: grey; font-size: small; font-style: italic;">';
		innerHTML +=     '<td>';
		innerHTML +=      '<input id="checkboxEnable' + x + '" type="checkbox"/><label for="checkboxEnable' + x + '" title="Enable this highlight definition to be used.">Enable</label>';
		innerHTML +=     '</td>';
		innerHTML +=    '</tr>';
*/		
		innerHTML +=    '<tr>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker_label"><label for="textLabel' + x + '">Label</label></div>';
		innerHTML +=     '</td>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker"> <input id="textLabel' + x + '" type="text" title="Label associated with this highlight, as shown in the context menu."/> <input id="checkboxNote' + x + '" type="checkbox"/> <label for="checkboxNote' + x + '" title="Always ask for a note to add this type of highlight. You can also add a highlight from the omnibar icon, or press Ctrl when you click the right mouse button to access the menu (NOT when you click the label).">Request Note</label> </div>'
		innerHTML +=     '</td>';
		innerHTML +=    '</tr>';

		innerHTML +=    '<tr>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker_label"><label for="selectShortcut' + x + 'Modifier1" title="Shortcut to highlight the selected text with the style associated with this label">Shortcut</label></div>';
		innerHTML +=     '</td>';    
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker">';
		innerHTML +=       '<select id="selectShortcut' + x + 'Modifier1">';
		innerHTML +=        '<option name="null" value="null"></option> <option name="ctrl" value="ctrl">Ctrl</option> <option name="alt" value="alt">Alt</option> <option name="shift" value="shift">Shift</option> <option name="meta" value="meta">Meta</option>';
		innerHTML +=       '</select> +';
		innerHTML +=       '<select id="selectShortcut' + x + 'Modifier2">';
		innerHTML +=        '<option name="null" value="null"></option> <option name="ctrl" value="ctrl">Ctrl</option> <option name="alt" value="alt">Alt</option> <option name="shift" value="shift">Shift</option> <option name="meta" value="meta">Meta</option>';
		innerHTML +=       '</select> +';
		innerHTML +=       '<select id="selectShortcut' + x + 'Modifier3">';
		innerHTML +=        '<option name="null" value="null"></option> <option name="ctrl" value="ctrl">Ctrl</option> <option name="alt" value="alt">Alt</option> <option name="shift" value="shift">Shift</option> <option name="meta" value="meta">Meta</option>';
		innerHTML +=       '</select> + ';
		innerHTML +=       '<input id="textShortcut' + x + '" type="text" class="shortcutkey" style="width: 4em" />';
		innerHTML +=      '</div>';
		innerHTML +=     '</td>';
		innerHTML +=    '</tr>';

	
		innerHTML +=    '<tr>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker_label"><label for="textBGColour' + x + '">Background</label></div>';
		innerHTML +=     '</td>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker">';
		innerHTML +=       '<input id="textBGColour' + x + '" type="text" spellcheck="false" class="color" style="width: 5em" title="Colour of the main part of the highlight."/>';
		innerHTML +=       '<label for="textFGColour' + x + '" style="margin-left:1em">Text </label>';
		innerHTML +=       '<input id="textFGColour' + x + '" type="text" spellcheck="false" class="color" style="width: 5em"  title="Colour of the text part of the highlight."/>';
		innerHTML +=       '<br/>';
		innerHTML +=       '<input id="checkboxTransparentBG' + x + '" type="checkbox"/><label for="checkboxTransparentBG' + x + '" title="Do not use a colour for the highlight">Transparent Background</label>';
		innerHTML +=      '</div>';
		innerHTML +=     '</td>';
		innerHTML +=    '</tr>';

		innerHTML +=    '<tr>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker_label"><label for="selectFontSize' + x + '">Font Size</label></div>';
		innerHTML +=     '</td>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker">';
		innerHTML +=       '<select id="selectFontSize' + x + '" title="Modification of the font size of the highlight. Relative sizes relate to the size of the original text in the highlight, but absolute sizes are the same throughout the page.">';
		innerHTML +=        '<option name="inherit" value="inherit">Unchanged</option>';
		innerHTML +=        '<option name="inherit" value="inherit">-- RELATIVE SIZES --</option>';
		innerHTML +=        '<option name="larger" value="larger">Larger</option>';
		innerHTML +=        '<option name="1.5em" value="1.5em">1.5x Larger</option>';
		innerHTML +=        '<option name="2em" value="2em">2x Larger</option>';
		innerHTML +=        '<option name="4em" value="4em">4x Larger</option>';
		innerHTML +=        '<option name="8em" value="8em">8x Larger</option>';
		innerHTML +=        '<option name="inherit" value="inherit">-- ABSOLUTE SIZES --</option>';
		innerHTML +=        '<option name="xx-small" value="xx-small">XX Small</option>';
		innerHTML +=        '<option name="x-small" value="x-small">X Small</option>';
		innerHTML +=        '<option name="small" value="small">Small</option>';
		innerHTML +=        '<option name="medium" value="medium">Medium</option>';
		innerHTML +=        '<option name="large" value="large">Large</option>';
		innerHTML +=        '<option name="x-large" value="x-large">X Large</option>';
		innerHTML +=        '<option name="xx-large" value="xx-large">XX Large</option>';
		innerHTML +=       '</select>';
		innerHTML +=      '</div>';
		innerHTML +=     '</td>';
		innerHTML +=    '</tr>';
	
		innerHTML +=    '<tr>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker_label"><label>Font Style</label></div>';
		innerHTML +=     '</td>';
		innerHTML +=     '<td>';
		innerHTML +=      '<div class="option_picker">';
		innerHTML +=       '<input id="checkboxUnderline' + x + '" type="checkbox"/><label class="labelFontStyle" for="checkboxUnderline' + x + '" title="Choose Underline OR Strikeout (not both)" style="text-decoration: underline;">Underline</label>';
		innerHTML +=       '<input id="checkboxLinethrough' + x + '" type="checkbox"/><label class="labelFontStyle" for="checkboxLinethrough' + x + '" title="Choose Underline OR Strikeout (not both)" style="text-decoration: line-through;">Strikeout</label>';		
		innerHTML +=       '<br/>';		
		innerHTML +=       '<input id="checkboxBold' + x + '" type="checkbox"/><label class="labelFontStyle" for="checkboxBold' + x + '" style="font-weight: bold;">Bold</label>';		
		innerHTML +=       '<input id="checkboxItalic' + x + '" type="checkbox"/><label class="labelFontStyle" for="checkboxItalic' + x + '" style="font-style: italic;">Italic</label>';		
		innerHTML +=       '<input id="checkboxUpperCase' + x + '" type="checkbox"/><label class="labelFontStyle" for="checkboxUpperCase' + x + '" style="text-transform: uppercase;">Upper Case</label>';
		innerHTML +=      '</div>';
		innerHTML +=     '</td>';
		innerHTML +=    '</tr>';
		
		innerHTML +=   '</table>';
		innerHTML +=  '</td>';

		innerHTML +=  '<td class="reset"><button id="buttonReset' + x + '" title="Restore this label to its default settings.">Reset</button></td>';
		innerHTML += '</tr>';

		innerHTML += '<tr><td></td><td> <hr width="4px" style="margin: 0px auto;"/> </td><td></td></tr>';

		document.getElementById("tablehighlights").innerHTML += innerHTML;
	}

	// manually bind all color objects
	colorElements = document.getElementsByClassName("color");
	for(var y=0; y<colorElements.length; y++){
		colorElements[y].color = new jscolor.color(colorElements[y], { hash: true });
	}
}

function PopulateLanguages(id, args, elemSelect){
	if(elemSelect == null){
		elemSelect = document.getElementById(id);
		if(elemSelect == null)
			return;
	}
			
    if(args && args.bing == true){
        for (x in Bing.arrLanguageNames){
            elemSelect.options.add(new Option(Bing.arrLanguageNames[x].name, Bing.arrLanguageNames[x].value));
        }
    }
    else{
        for (x in GoogleAPI.arrLanguages){
            if(GoogleAPI.arrLanguages[x].supported == true)
                elemSelect.options.add(new Option(GoogleAPI.arrLanguages[x].name, GoogleAPI.arrLanguages[x].code));
        }
    }
	
    
	elemSelect.SortByProperty("text");
	
	// source language can be auto ("" code)
	if(args && args.prependAuto == true){
		var option = new Option(LANGUAGENAME_AUTO, "");
		option.className = "translateAnything";

		elemSelect.options.add(option, 0);
	}
}

function SendReloadPreferencesMessage(){
	// signal to background to rebuild the menu
	chrome.extension.sendRequest({ msg: "updateMenu" });

	// signal to all tabs in all windows' content scripts to reload their preferences
	chrome.windows.getAll({ populate: true }, function (arrayWindows) {
		arrayWindows.forEach(function (w) {
			w.tabs.forEach(function (tab) {
				// will cause error on injection to pages without permission, but doesn't really matter
				if(CanExecuteScriptOnURL(tab.url) == true){
/*				if (tab.url.indexOf('http:') == 0 || tab.url.indexOf('https:') == 0 ||
					tab.url.indexOf('ftp:') == 0 || tab.url.indexOf('file:') == 0 ||
					tab.url.indexOf('chrome-extension:') == 0) {
*/					//
					chrome.tabs.executeScript(tab.id,
						{ code: 'if(typeof(LoadPreferences) === "function") LoadPreferences();', allFrames: true }, null);
				}
			});
		});
	});
}

// prefHLObject is what is stored in localstorage to describe a highlight
function BuildPrefHLObject(_arr) {
	// _arr is a row from _arrPrefToNodeID. a prefhl object is what's stored in storage or passed to a function in the helper js
	var value = {};

	if(_arr.showInContextMenu)
		value.showInContextMenu = document.getElementById(_arr.showInContextMenu).checked;
	
	if(_arr.label)
		value.label = document.getElementById(_arr.label).value;
	if(_arr.bgColour)
		value.colourbg = document.getElementById(_arr.bgColour).value;
	if(_arr.fgColour)
		value.colourfg = document.getElementById(_arr.fgColour).value;
	if(_arr.uppercase)
		value.upperCase = document.getElementById(_arr.uppercase).checked;
	if(_arr.fontSize)
		value.fontSize = document.getElementById(_arr.fontSize).value;
	if(_arr.note)
		value.addNote = document.getElementById(_arr.note).checked;
	if(_arr.shortcutText){
		value.shortcut = GetShortcutText([
			document.getElementById(_arr.selectModPrefix + "1"),
			document.getElementById(_arr.selectModPrefix + "2"),
			document.getElementById(_arr.selectModPrefix + "3")],
			document.getElementById(_arr.shortcutText));
	}

	if(_arr.transparentbg)
		value.transparentbg = document.getElementById(_arr.transparentbg).checked;

	if(_arr.underline)
		value.underline = document.getElementById(_arr.underline).checked;
	if(_arr.linethrough)
		value.linethrough = document.getElementById(_arr.linethrough).checked;
	if(_arr.bold)
		value.bold = document.getElementById(_arr.bold).checked;
	if(_arr.italic)
		value.italic = document.getElementById(_arr.italic).checked;

	return value;
}

// update shown highlight with values from arrPrefHL
function SetHighlight(prefHL, arrPrefHL) {
	// find the corresponding row in the map
	for(var i in _arrPrefToNodeID) {
		if (_arrPrefToNodeID[i].prefHL != prefHL)
			continue;

		// using map to get the ids for each node, transfer values from arrPrefHighligh
		if (_arrPrefToNodeID[i].showInContextMenu){
			document.getElementById(_arrPrefToNodeID[i].showInContextMenu).checked = (arrPrefHL.showInContextMenu == false ? false : true);    // not PREFBOOL_ because array
			OnChangeHighlight();  //force event
		}

		if (_arrPrefToNodeID[i].bgColour) {
			document.getElementById(_arrPrefToNodeID[i].bgColour).color.fromString(arrPrefHL.colourbg);
			OnChangeHighlight();  //force event
		}
		if (_arrPrefToNodeID[i].fgColour) {
			document.getElementById(_arrPrefToNodeID[i].fgColour).color.fromString(arrPrefHL.colourfg);
			OnChangeHighlight();  //force event
		}
		if (_arrPrefToNodeID[i].label)
			document.getElementById(_arrPrefToNodeID[i].label).value = arrPrefHL.label;
		if (_arrPrefToNodeID[i].fontSize)
			document.getElementById(_arrPrefToNodeID[i].fontSize).value = arrPrefHL.fontSize;
		if (_arrPrefToNodeID[i].uppercase)
			document.getElementById(_arrPrefToNodeID[i].uppercase).checked = arrPrefHL.upperCase;    // not PREFBOOL_ because array
		if (_arrPrefToNodeID[i].note)
			document.getElementById(_arrPrefToNodeID[i].note).checked = arrPrefHL.addNote;    // not PREFBOOL_ because array
		if (_arrPrefToNodeID[i].shortcutText) {
			SetShortcutElements(arrPrefHL.shortcut, [
				document.getElementById(_arrPrefToNodeID[i].selectModPrefix + "1"),
				document.getElementById(_arrPrefToNodeID[i].selectModPrefix + "2"),
				document.getElementById(_arrPrefToNodeID[i].selectModPrefix + "3")
				], document.getElementById(_arrPrefToNodeID[i].shortcutText));
		}

		if (_arrPrefToNodeID[i].transparentbg)
			document.getElementById(_arrPrefToNodeID[i].transparentbg).checked = arrPrefHL.transparentbg;    // not PREFBOOL_ because array
		
		if (_arrPrefToNodeID[i].underline)
			document.getElementById(_arrPrefToNodeID[i].underline).checked = arrPrefHL.underline;    // not PREFBOOL_ because array
		if (_arrPrefToNodeID[i].linethrough)
			document.getElementById(_arrPrefToNodeID[i].linethrough).checked = arrPrefHL.linethrough;    // not PREFBOOL_ because array
		if (_arrPrefToNodeID[i].bold)
			document.getElementById(_arrPrefToNodeID[i].bold).checked = arrPrefHL.bold;    // not PREFBOOL_ because array
		if (_arrPrefToNodeID[i].italic)
			document.getElementById(_arrPrefToNodeID[i].italic).checked = arrPrefHL.italic;    // not PREFBOOL_ because array

		break;
	}// end for
}



function CreateShortcutElement(elemParent, ids, onChange){
	function CreateSelect(id, onChange){
		var select = document.createElement("select");
		select.id = id;
		
		if(onChange)
			select.addEventListener("change", onChange, false);
		
		var arrOptions = [
			{nameAndValue: "null", innerHTML: null},
			{nameAndValue: "ctrl", innerHTML: "Ctrl"},
			{nameAndValue: "alt", innerHTML: "Alt"},
			{nameAndValue: "shift", innerHTML: "Shift"},
			{nameAndValue: "meta", innerHTML: "Meta"}];
		
		for(var x in arrOptions){
			var option = new Option(arrOptions[x].nameAndValue, arrOptions[x].nameAndValue);
			if(arrOptions[x] != null)
				option.innerHTML = arrOptions[x].innerHTML;
			
			select.appendChild(option);
		}
		
		return select;
	}

	// name is id + (1..3)
	for(var t=1; t<=3; t++){
		elemParent.appendChild(CreateSelect(ids.idSelectModifier + t, onChange));
		elemParent.appendChild(document.createTextNode("+"));
/*				elemParent.appendChild(CreateSelect(ids.idSelectModifier2, onChange));
		elemParent.appendChild(document.createTextNode("+"));
		elemParent.appendChild(CreateSelect(ids.idSelectModifier3, onChange));
		elemParent.appendChild(document.createTextNode("+"));*/
	}
	
	var inputKey = document.createElement("input");
	if(onChange)
		inputKey.addEventListener("change", onChange, false);
		
	inputKey.type = "text";
	inputKey.className = "shortcutkey";
	inputKey.id = ids.idInputKey;
	elemParent.appendChild(inputKey);
	
	var buttonReset = document.createElement("button");
	buttonReset.className = "reset";
	buttonReset.id = ids.idButtonReset;
	
	// our event caller MUST be called after OnClickButtonReset (so it picks up the empty values)
	buttonReset.addEventListener("click", OnClickButtonReset, false);
	if(onChange)
		buttonReset.addEventListener("click", onChange, false);
	
	buttonReset.title = TOOLTIP_BUTTONRESET;
	buttonReset.innerHTML = INNERHTML_BUTTONRESET;
	elemParent.appendChild(buttonReset);
}

function GetShortcutText(arrSelectModPrefix, inputShortcutText){
	var shortcut = "";

	for(var k in arrSelectModPrefix){
		// add modifiers
		if (arrSelectModPrefix[k].value != "null") {
			if (shortcut.length > 0)
				shortcut += "+";
			shortcut += arrSelectModPrefix[k].value;
		}
	}
	// add text
	if (inputShortcutText.value.length > 0) {
		if (shortcut.length > 0)
			shortcut += "+";
		shortcut += inputShortcutText.value;
	}

	return shortcut;
}

function SetShortcutElements(shortcut, arrSelectModPrefix, inputShortcutText){
	// shortcut: string(m+M+m+text), the rest are elements
	
	// do this here as its as good a place as any
	inputShortcutText.title = TOOLTIP_SHORTCUTKEY;
	
	// empty all 3 dropdowns and the key value, by default
	for(var t in arrSelectModPrefix)
		arrSelectModPrefix[t].selectedIndex = "null";
	inputShortcutText.value = "";
	
	if(shortcut){
		// convert stored shortcut format (MOD+MOD+MOD+KEY) to our 3 dropdown thing
		var arrToken = shortcut.split("+");
		
		// now convert it
		for (var z=0, q=0; z < arrToken.length; z++) {
			// if it isnt ctrl/alt/shift/meta, its the token
			arrToken[z] = arrToken[z].toLowerCase();

			if (arrToken[z] != "ctrl" && arrToken[z] != "alt" && arrToken[z] != "shift" && arrToken[z] != "meta")
				inputShortcutText.value = arrToken[z];
			else {
				// map token to name/value of option (should always match, always lower case)
				if (q < arrSelectModPrefix.length)
					arrSelectModPrefix[q++].value = arrToken[z];
			}
		}
	}
}


////////////////////////////

//////////////////////
// lookup

function PopulateSelectLookupTemplate(){
	var select = document.getElementById("selectTemplate");
	var arrLookupTemplates = GetPreference(PREFERENCE_LOOKUP_TEMPLATES);

	for(var x in arrLookupTemplates){
		// arrLookupTemplates[x].name may be invalid, but doesnt matter, fixed in fixselect...()
		
		// generate random id if unspecified
		if(arrLookupTemplates[x].id === undefined)
			arrLookupTemplates[x].id = RandomString(32);
			
		var option = new Option(null, arrLookupTemplates[x].id);
		
		// this object and the style MUST be kept in sync with OnButtonMove
		option.SimpleHighlight = {
			lookupTemplate: arrLookupTemplates[x],
		};
		// colour separators differently
		option.className = CreateClassNameFromLookupTemplate(option.SimpleHighlight.lookupTemplate);
							
		select.options.add( option );				
	}
	
	// process select to choose the correct labels for groups based on their parentage
	FixSelectLookupTemplateGroupNames();
	
	// fake select message for first item
	if(select.options.length > 0){
		select.selectedIndex = 0;
		OnChangeSelectTemplate(select);
	}
}

// process select to choose the correct labels for groups based on their parentage
function FixSelectLookupTemplateGroupNames(){
	var options = document.getElementById("selectTemplate").options;
	var arrNamesGroupStart = [];
	var innerHTML;
	
	for(var x=0; x<options.length; x++){
		// get text to be used for options

		// decode name
		var nameTemplate;
		if(options[x].SimpleHighlight.lookupTemplate.name){
			try{ nameTemplate = options[x].SimpleHighlight.lookupTemplate.name.decode_utf8(); }
			catch(ex){ nameTemplate = options[x].SimpleHighlight.lookupTemplate.name; }
		}
		else
			nameTemplate = "";
		
		// group ending names are generataed dynamically from the last groupStart seen
		if(options[x].SimpleHighlight.lookupTemplate.groupEnd == true){
			// last used group name
			var nameGroupStart = arrNamesGroupStart.pop();
			if(nameGroupStart === undefined)
				innerHTML = FORMAT_UNASSIGNED_GROUPEND;
			else
				innerHTML = FORMAT_GROUPEND.replace("<<GROUPNAME>>", nameGroupStart);
		}
		else if(options[x].SimpleHighlight.lookupTemplate.groupStart == true){
			// remember last groupstart name
			arrNamesGroupStart.push(nameTemplate);//options[x].SimpleHighlight.lookupTemplate.name);
			innerHTML = FORMAT_GROUPSTART.replace("<<GROUPNAME>>", nameTemplate);//options[x].SimpleHighlight.lookupTemplate.name);
		}
		else
			innerHTML = nameTemplate;//options[x].SimpleHighlight.lookupTemplate.name;
			
		// offset depending on level
		for(var q=0, prefixHTML=""; q<arrNamesGroupStart.length - (options[x].SimpleHighlight.lookupTemplate.groupStart == true ? 1 : 0); q++)
			prefixHTML += "\u00a0\u00a0\u00a0";
		
		options[x].innerHTML = prefixHTML + innerHTML;	// assign
	}
}


function CreateClassNameFromLookupTemplate(lookupTemplate){
	var className = null;
	var arr = [
		{varName: "enabled", varValue: false, className: "disabledTemplate"},
		{varName: "default", varValue: true, className: "defaultTemplate"},
		{varName: "groupStart", varValue: true, className: "groupStartTemplate"},
		{varName: "groupEnd", varValue: true, className: "groupEndTemplate"},
	];

	var div = document.createElement('div');
	
	for(var z in arr){
		if(lookupTemplate[arr[z].varName] == arr[z].varValue)
			div.classList.add(arr[z].className);
	}
	
	return div.className;
}

function CreateMouseActivateElements(elemParent, ids){
	function AddOptions(select, opt){
		for(var x in opt){
			var option = document.createElement('option');
			option.value = opt[x].value;
			option.innerHTML = opt[x].innerHTML;
			select.appendChild(option);
		}
	}

	// [] enable || [single|double]click [l|m|r] mouse button || with []ctrl and []alt and [] shift
	var label;
	
	// enable/disable checkbox
	var inputEnable = document.createElement('input');
	inputEnable.type = "checkbox";
	inputEnable.id = ids.enable;
	inputEnable.addEventListener("change", OnChangeInputEnableMouseActivate, false);
	elemParent.appendChild(inputEnable);
	// and associated label
	label = document.createElement('label');
	label.htmlFor = inputEnable.id;
	label.innerHTML = INNERHTML_MOUSEACTIVATE_ENABLE;
	elemParent.appendChild(label);
	
	elemParent.appendChild(document.createElement('br'));

	// enclose in div
	var divCombination = inputEnable.divCombination = document.createElement('div')
	divCombination.className = "subgroup1";
	
		// single/double
		var selectClick = document.createElement('select');
		selectClick.id = ids.click;
		selectClick.addEventListener("change", OnChangeSelectClickMouseActivate, false);
		selectClick.addEventListener("keyup", OnChangeSelectClickMouseActivate, false);
		var clicks = [
			{value: PREFBOOL_FALSE, innerHTML: "Single"}, 
			{value: PREFBOOL_TRUE, innerHTML: "Double"}
		];
		if(ids.hideDoubleClick == true)
			clicks.splice(1,1);
			
		AddOptions(selectClick, clicks);
		divCombination.appendChild(selectClick);
		// and associated label
		label = document.createElement('label');
		label.className = "labelmid";
		label.htmlFor = selectClick.id;
		label.innerHTML = INNERHTML_MOUSEACTIVATE_CLICK;
		divCombination.appendChild(label);

		// l|m|r
		var selectButton = document.createElement('select');
		selectButton.id = ids.button;
		var buttons = [
			{value: 0, innerHTML: "Left"},
			{value: 1, innerHTML: "Middle"},
			{value: 2, innerHTML: "Right"}];
//		if(ids.hideLeftButton == true)
//			buttons.splice(0, 1);		// slice out first one
			
		AddOptions(selectButton, buttons);
		divCombination.appendChild(selectButton);
		// and associated label
		label = document.createElement('label');
		label.className = "labelmid";
		label.htmlFor = selectButton.id;
		label.innerHTML = INNERHTML_MOUSEACTIVATE_MOUSEBUTTON;
		divCombination.appendChild(label);

		divCombination.appendChild(document.createElement('br'));
		
		var checkboxes = [
			{id: ids.ctrl, elem: "inputCtrl", labelInnerHTML: INNERHTML_MOUSEACTIVATE_CTRL},
			{id: ids.alt, elem: "inputAlt", labelInnerHTML: INNERHTML_MOUSEACTIVATE_ALT},
			{id: ids.shift, elem: "inputShift", labelInnerHTML: INNERHTML_MOUSEACTIVATE_SHIFT/*, title: TOOLTIP_MOUSEACTIVATE_SHIFT*/}
		];
		for(var y in checkboxes){
			var inputCheckbox = selectClick[checkboxes[y].elem] = document.createElement('input');	// also store in selectClick
			inputCheckbox.type = "checkbox";
			inputCheckbox.id = checkboxes[y].id;
			if(checkboxes[y].title)
				inputCheckbox.title = checkboxes[y].title;
			inputCheckbox.selectClick = selectClick;
			inputCheckbox.addEventListener("change", function(e){
				// fake selectClick event
				OnChangeSelectClickMouseActivate({currentTarget: e.currentTarget.selectClick});
			});
			divCombination.appendChild(inputCheckbox);
			
			// and associated label
			label = document.createElement('label');
			label.className = "modifierlabel";
			label.htmlFor = inputCheckbox.id;
			label.innerHTML = checkboxes[y].labelInnerHTML;
			if(checkboxes[y].title)
				label.title = checkboxes[y].title;
			divCombination.appendChild(label);
		}
		
		var warnings = [
			{varName: "divWarningCtrlAltShift", innerHTML: INNERHTML_MOUSEACTIVATE_WARNING_CTRLALTSHIFT},
			{varName: "divWarningDoubleClick", innerHTML: INNERHTML_MOUSEACTIVATE_WARNING_DOUBLECLICK},
			{varName: "divWarningShift", innerHTML: INNERHTML_MOUSEACTIVATE_WARNING_SHIFT},
		];
		
		for(var g in warnings){
			var divWarning = document.createElement('div');
			divWarning.className = "mouseactivationwarning";
			divWarning.innerHTML = 
				'<img src="img/exclamation.png" style="vertical-align: text-top; padding-right: 4px;"/>' + warnings[g].innerHTML;
			selectClick[warnings[g].varName] = divWarning;

			divCombination.appendChild(divWarning);
		}
/*		
		var divWarning = selectClick.divWarning = document.createElement('div');
		divWarning.className = "mouseactivationwarning";
		divWarning.innerHTML = INNERHTML_MOUSEACTIVATE_WARNING_CTRLALTSHIFT;
		divCombination.appendChild(divWarning);
	*/
	elemParent.appendChild(divCombination);
	
}

//////////////////////
// events
		
function OnClickButtonForgetPosLookup(){
	SetPreference(PREFERENCE_LOOKUPPOPUP_PLACEMENT, null);
	SendReloadPreferencesMessage();
}

//////////////
function OnChangeInputEnableMouseActivate(e){
	// disable all children of divCombination, except for us
	e.currentTarget.divCombination.DisableAllChildElements(e.currentTarget.checked == true ? false : true);	
//	for(var x=0; x<e.currentTarget.divCombination.children.length; x++)
//		e.currentTarget.divCombination.children[x].disabled = (e.currentTarget.checked == true ? false : true);
}

function OnChangeSelectClickMouseActivate(e){
	// e.currentTarget is selectClick (single or double)
	
	// show warning if none of ctrl alt shift are selected
	var show = (e.currentTarget.value == PREFBOOL_FALSE && e.currentTarget.inputCtrl.checked == false && 
		e.currentTarget.inputAlt.checked == false && e.currentTarget.inputShift.checked == false);
	e.currentTarget.divWarningCtrlAltShift.style.display = (show == true ? "" : "none");
	
	// show if double click selected
	show = (e.currentTarget.value == PREFBOOL_TRUE) ? true : false;
	e.currentTarget.divWarningDoubleClick.style.display = (show == true ? "" : "none");

	// show if shift selected
	show = (e.currentTarget.inputShift.checked == true) ? true : false;
	e.currentTarget.divWarningShift.style.display = (show == true ? "" : "none");
}

///////////////////

function _OnChangeSelectTemplate()
{
	OnChangeSelectTemplate(this);
}

function OnChangeSelectTemplate(select){
	// make sure change did really occur
	if(select.selectedIndex == select.lastSelectedIndex)
		return;
	select.lastSelectedIndex = select.selectedIndex;

	// fill out the form values from the selected option
	var optionTemplate = select.options[select.selectedIndex];
	var lookupTemplate = optionTemplate.SimpleHighlight.lookupTemplate;
	
	// fill in
	document.getElementById("inputTemplateEnabled").checked = lookupTemplate.enabled;
	document.getElementById("inputTemplateURL").value = lookupTemplate.urlTemplate ? lookupTemplate.urlTemplate : "";		// template url template
	document.getElementById("inputTemplateHash").value = lookupTemplate.hash ? lookupTemplate.hash : "";		// template url template
	document.getElementById("inputTemplateFramebuster").checked = lookupTemplate.framebuster;
	document.getElementById("textareaTemplateDescription").value = lookupTemplate.description ? lookupTemplate.description : "";		// template description
	
	var nameTemplate;
	if( lookupTemplate.name ){
		try{ nameTemplate = lookupTemplate.name.decode_utf8(); }
		catch(ex){ nameTemplate = lookupTemplate.name; }
	}
	else
		nameTemplate = "";
	document.getElementById("inputTemplateName").value = nameTemplate;		// template name
	
	//	
	SetShortcutElements(lookupTemplate.shortcut,
		[document.getElementById("selectShortcutTemplateModifier1"),
		document.getElementById("selectShortcutTemplateModifier2"),
		document.getElementById("selectShortcutTemplateModifier3")], document.getElementById("textShortcutTemplate"));

	// update disabilities
	document.getElementById("buttonTemplateMoveUp").disabled = (select.selectedIndex == 0 || select.selectedIndex == -1) ? true : false;
	document.getElementById("buttonTemplateMoveDown").disabled = (select.selectedIndex == (select.options.length-1) || select.selectedIndex == -1) ? true : false;
	document.getElementById("buttonRemoveTemplate").disabled = (select.selectedIndex == -1) ? true : false;

/*	// all these disabled if selection is group thing
	var arrID = ["selectShortcutTemplateModifier1", "selectShortcutTemplateModifier2", "selectShortcutTemplateModifier3",
		"textShortcutTemplate", "btnResetShortcutTemplate", 
		"inputTemplateURL", "textareaTemplateDescription", "inputTemplateHash"];
	for(var x in arrID)
		document.getElementById(arrID[x]).disabled = (lookupTemplate.groupStart == true || lookupTemplate.groupEnd == true);
	*/
	
	// hide for groups (everything except name)
	document.getElementById("subgroupNotTemplateName").style.display = 
		(lookupTemplate.groupStart == true || lookupTemplate.groupEnd == true) ? "none" : "";
	// hide for group ends (name)
	document.getElementById("subgroupTemplateName").style.display = 
		(lookupTemplate.groupEnd == true) ? "none" : "";


	// disable for groups (groups should always be enabled)
	document.getElementById("inputTemplateEnabled").disabled = 
		(lookupTemplate.groupStart == true || lookupTemplate.groupEnd == true);
	// disabled button if selecttion is group OR is current default
	document.getElementById("buttonTemplateDefault").disabled = 
		(lookupTemplate.groupStart == true || lookupTemplate.groupEnd == true || lookupTemplate.default == true);
}

function OnChangeTemplateElement(){
	var elem = event.currentTarget;
	
	var select = document.getElementById("selectTemplate");
	var option = select.options[select.selectedIndex];
	
	switch(elem.id){
	case "inputTemplateEnabled":
		option.SimpleHighlight.lookupTemplate.enabled = elem.checked;
		
		// disable everything
//		document.getElementById("subgroupTemplateName").DisableChildElements(elem.checked == true ? false : true);
//		document.getElementById("subgroupNotTemplateName").DisableChildElements(elem.checked == true ? false : true);
		break;
	case "inputTemplateName":
		try{ option.SimpleHighlight.lookupTemplate.name = elem.value.encode_utf8(); }
		catch(ex){ option.SimpleHighlight.lookupTemplate.name = elem.value; }

//		option.SimpleHighlight.lookupTemplate.name = elem.value;
		//option.text = option.SimpleHighlight.lookupTemplate.name;	// sync name to list
		break;
	case "inputTemplateURL":
		option.SimpleHighlight.lookupTemplate.urlTemplate = elem.value;
		break;
	case "inputTemplateFramebuster":
		option.SimpleHighlight.lookupTemplate.framebuster = elem.checked;
		break;
	case "selectShortcutTemplateModifier1":
	case "selectShortcutTemplateModifier2":
	case "selectShortcutTemplateModifier3":
	case "textShortcutTemplate":
	case "btnResetShortcutTemplate":
		option.SimpleHighlight.lookupTemplate.shortcut = GetShortcutText([
			document.getElementById("selectShortcutTemplateModifier1"),
			document.getElementById("selectShortcutTemplateModifier2"),
			document.getElementById("selectShortcutTemplateModifier3")],
			document.getElementById("textShortcutTemplate"));
		break;
	case "textareaTemplateDescription":
		option.SimpleHighlight.lookupTemplate.description = elem.value;
		break;
	case "inputTemplateHash":
		option.SimpleHighlight.lookupTemplate.hash = elem.value;
		break;
	case "buttonTemplateDefault":
		// only one can be default
		for(var x=0; x<select.options.length; x++){
			// ignore separators
			if(select.options[x].SimpleHighlight.lookupTemplate.groupStart == true || select.options[x].SimpleHighlight.lookupTemplate.groupEnd == true)
				continue;
				
			select.options[x].SimpleHighlight.lookupTemplate.default = 
				(x == select.selectedIndex ? true : false);

			// update background of new default below. clear them all here
			select.options[x].className = "";
		}
		
		break;
	}
	
	// reflect any new values in classname
	option.className = CreateClassNameFromLookupTemplate(option.SimpleHighlight.lookupTemplate);
	
	// sync new names in template to option
	FixSelectLookupTemplateGroupNames();
}
/*
function GetNameOfLastGroupStartTemplate(select, startIndex){
	var options = select.options;
	for(var x=startIndex; x>=0; x--){
		if(options[x].SimpleHighlight.groupStart == true)
			return options[x].name;
	}

	return null;
}
*/	
function OnClickButtonMoveTemplate(){
	var select = document.getElementById("selectTemplate");
	var direction = (event.currentTarget.id == "buttonTemplateMoveUp" ? "up" : "down");
	
	// exit cases
	if(select.selectedIndex == -1 || (select.selectedIndex == 0 && direction == "up") || 
		(direction == "down" && select.selectedIndex == (select.options.length-1)) ){
		return;
	}

	// swap with item in chosen direction
	function swapOptions(obj,i,j) {
		var o = obj.options;
		var i_selected = o[i].selected;
		var j_selected = o[j].selected;
		var temp = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
		var temp2= new Option(o[j].text, o[j].value, o[j].defaultSelected, o[j].selected);
		
		temp.className = o[i].className;
		temp.SimpleHighlight = o[i].SimpleHighlight;
		
		temp2.className = o[j].className;
		temp2.SimpleHighlight = o[j].SimpleHighlight;
		
		o[i] = temp2;
		o[j] = temp;
		o[i].selected = j_selected;
		o[j].selected = i_selected;
	}
	
	swapOptions(select, select.selectedIndex, (direction == "up" ? select.selectedIndex-1 : select.selectedIndex+1));

	// sync new names/hierachy in template to option
	FixSelectLookupTemplateGroupNames();

	// fake event
	OnChangeSelectTemplate(select);
}
		
function OnClickButtonAddRemoveTemplate(){
	var select = document.getElementById("selectTemplate");

	if(event.currentTarget.id == "buttonAddTemplate" || event.currentTarget.id == "buttonAddGroupStartTemplate" || event.currentTarget.id == "buttonAddGroupEndTemplate"){
		var name = (event.currentTarget.id == "buttonAddTemplate" ? DEFAULTNAME_TEMPLATE : 
			(event.currentTarget.id == "buttonAddGroupStartTemplate" ? DEFAULTNAME_GROUPSTART : null));
//			(event.currentTarget.id == "buttonAddGroupEndTemplate" ? DEFAULTNAME_GROUPEND : null)));
			
		var optionTemplate = new Option(name, RandomString(64));		// id (value) is random string
		optionTemplate.SimpleHighlight = {
			lookupTemplate: {
				enabled: true,
				id: optionTemplate.value,
				name: optionTemplate.text,

				urlTemplate: null,
				description: null,
				shortcut: null,
				framebuster: false,
				default: false,
				
				groupStart: (event.currentTarget.id == "buttonAddGroupStartTemplate"),
				groupEnd: (event.currentTarget.id == "buttonAddGroupEndTemplate"),
			},
		};

		optionTemplate.selected = true;			// select by default
		optionTemplate.className = CreateClassNameFromLookupTemplate(optionTemplate.SimpleHighlight.lookupTemplate);
		select.options.add( optionTemplate );				
	}
	else if(event.currentTarget.id == "buttonRemoveTemplate"){
		if(select.options.selectedIndex != -1){
			var oldSelectedIndex = select.options.selectedIndex;
			select.remove(select.options.selectedIndex);
			select.options.selectedIndex = oldSelectedIndex;
		}
	}

	// sync new names/hierachy in template to option
	FixSelectLookupTemplateGroupNames();
	
	// fake select message for first item
	if(select.selectedIndex != -1)
		OnChangeSelectTemplate(select);
}

/////////////////////////////////////
// tip

function PopulateSelectTipTemplate(){
	var select = document.getElementById("selectTipTemplate");
	var arrTipPopupTemplates = GetPreference(PREFERENCE_TIPPOPUP_TEMPLATES);
	var valueDefault = null;
	var optgroup = null;

	for(var x in _arrTipPopupMasterTemplates){
		// ignore
		if(_arrTipPopupMasterTemplates[x].display == false)
			continue;
	
		// identify option group
		if(_arrTipPopupMasterTemplates[x].groupStart == true){
			optgroup = document.createElement('optgroup');
			optgroup.label = _arrTipPopupMasterTemplates[x].label;
			
			select.appendChild(optgroup);
			continue;
		}
		else if(_arrTipPopupMasterTemplates[x].groupEnd == true){
			optgroup = null;
			continue;
		}
		else{
			var option = new Option(_arrTipPopupMasterTemplates[x].name, _arrTipPopupMasterTemplates[x].id);
			
			// store link to master template and specific template (if available)
			option.SimpleHighlight = {
				tipPopupMasterTemplate: _arrTipPopupMasterTemplates[x],
				tipPopupTemplate: null,
			};
			for(var y in arrTipPopupTemplates){
				if(arrTipPopupTemplates[y].id == _arrTipPopupMasterTemplates[x].id){
					option.SimpleHighlight.tipPopupTemplate = arrTipPopupTemplates[y];
					break;
				}
			}

			// must have tipPopupTemplate structure
			// empty case defaults (defined here, not in localStorage.js
			if(option.SimpleHighlight.tipPopupTemplate == null){
				option.SimpleHighlight.tipPopupTemplate = {
					id: _arrTipPopupMasterTemplates[x].id,
					shortcut: null,
					options: {},		// copied below			_arrTipPopupMasterTemplates[x].defaultOptions,
					default: _arrTipPopupMasterTemplates[x].default,
					// default: is not now done via OnChangeSelectTipTemplate()
				}
				// indicate if this is to be the selected template by its default setting in the master templates
				if(_arrTipPopupMasterTemplates[x].default == true)
					valueDefault = option.value;
			}
			else{
				if(option.SimpleHighlight.tipPopupTemplate.default == true)
					valueDefault = option.value;		// value is id 	//SimpleHighlight.tipPopupTemplate.default;
			}
			
			option.className = (option.SimpleHighlight.tipPopupTemplate.default == true ? "defaultTemplate" : "");

			// validate that the template stored has all the variables of the master template. perhaps teh master template
			// has been updated after the template was stored in localStorage
			for(var q in _arrTipPopupMasterTemplates[x].defaultOptions){
				if(option.SimpleHighlight.tipPopupTemplate.options[q] === undefined)
					option.SimpleHighlight.tipPopupTemplate.options[q] = _arrTipPopupMasterTemplates[x].defaultOptions[q];
			}
			
			if(optgroup)
				optgroup.appendChild(option);
			else
				select.options.add( option );				
		}
	}// end for(x)
	
	// fake select message for default item
	if(select.options.length > 0){
		if(valueDefault)
			select.value = valueDefault;
		else
			select.selectedIndex = 0;
			
		OnChangeSelectTipTemplate(select);
	}
}

/////////////////////////
// events

function _OnChangeSelectTipTemplate()
{
	OnChangeSelectTipTemplate(this);
}

function OnChangeSelectTipTemplate(select){
	// selecting group causes index to be -1
	// TODO: check
	if(select.selectedIndex == -1){
		event.preventDefault();
		event.returnValue = false;
		return false;
	}

	// fill out the form values from the selected option
	var optionSelected = select.options[select.selectedIndex];
	var tipPopupMasterTemplate = optionSelected.SimpleHighlight.tipPopupMasterTemplate;
	var tipPopupTemplate = optionSelected.SimpleHighlight.tipPopupTemplate;

	// TODO: no longer needed, get rid
	function GetValidOptionValue(nameOption){
/*				// if there is an option not set in the template, perhaps the master template has changed after the template was set. use the master default version of this value
		if(tipPopupTemplate.options[nameOption] === undefined)
			return tipPopupMasterTemplate.defaultOptions[nameOption];
		else*/
			return tipPopupTemplate.options[nameOption];
	}
	
	// fill in general template elements
	
	// master
	document.getElementById("textareaTipTemplateDescription").value = 
		tipPopupMasterTemplate.description ? tipPopupMasterTemplate.description : "";
		
/*	// selected option becomes the default
	// only one can be default
	for(var x=0; x<select.options.length; x++){
		select.options[x].SimpleHighlight.tipPopupTemplate.default = (x == select.selectedIndex ? true : false);
		// update background of new default below. clear them all here
		select.options[x].className = "";
	}
	*/			
	// specific
	SetShortcutElements(tipPopupTemplate.shortcut,
		[document.getElementById("selectShortcutTipTemplateModifier1"),
		document.getElementById("selectShortcutTipTemplateModifier2"),
		document.getElementById("selectShortcutTipTemplateModifier3")], document.getElementById("textShortcutTipTemplate"));
	
	// create template elements specific to this type
	var divSpecifics = document.getElementById("divTipTemplateSpecificOptions");
	// empty container for specific elements
	divSpecifics.innerHTML = "";
		
	function Build(arr, div){
		for(var a in arr){
			var elem = labelPost = labelPre = null;

			if(arr[a].labelPreHTML){
				labelPre = document.createElement('label');
				labelPre.innerHTML = arr[a].labelPreHTML;
				if(arr[a].tooltip)
					labelPre.title = arr[a].tooltip;
				if(arr[a].id)
					labelPre.htmlFor = arr[a].id;
			}
			if(arr[a].labelPostHTML){
				labelPost = document.createElement('label');
				labelPost.innerHTML = arr[a].labelPostHTML;
				if(arr[a].tooltip)
					labelPost.title = arr[a].tooltip;
				if(arr[a].id)
					labelPost.htmlFor = arr[a].id;
			}
			
			if(arr[a].type == "select"){
				elem = document.createElement('select');
				elem.addEventListener("change", OnChangeTipTemplateElement, false);
				elem.addEventListener("keyup", OnChangeTipTemplateElement, false);
				
				// populate
				if(arr[a].populate == "populateLanguages")
					PopulateLanguages(null/*elem.id*/, {prependAuto: arr[a].prependAuto, bing: arr[a].bing}, elem);		// use element direct, because not in DOM yet
				else{
					// default. .populate is an array
					for(var b in arr[a].populate){
						var option = new Option(arr[a].populate[b].name ? arr[a].populate[b].name : arr[a].populate[b].value, arr[a].populate[b].value);
						elem.options.add( option );										
					}
				}
				
				// select
				elem.value = GetValidOptionValue(arr[a].nameOption);
				
				if(arr[a].sortBy)
					elem.SortByProperty(arr[a].sortBy);
			}
			else if(arr[a].type == "checkbox"){
				elem = document.createElement('input');
				elem.type = "checkbox";
				elem.addEventListener("click", OnChangeTipTemplateElement, false);
				// select
				// if there is an option not set in the template, perhaps the master template has changed after the template was set. use the master default version of this value
				elem.checked = GetValidOptionValue(arr[a].nameOption);
			}
            else if(arr[a].type == "text"){
                elem = document.createElement('input');
                elem.type = "text";
				elem.addEventListener("change", OnChangeTipTemplateElement, false);
                elem.value = GetValidOptionValue(arr[a].nameOption);
            }
			else{
				// no type means its a heading (class 'sublabel')
				if(labelPre)
					labelPre.className = 'sublabel';
				if(labelPost)
					labelPost.className = 'sublabel';
				elem = null;
			}

			if(elem){
				elem.id = arr[a].id;
				elem.nameOption = arr[a].nameOption;
			}
						
			// add label
			if(labelPre)
				div.appendChild(labelPre);
			// add element
			if(elem)
				div.appendChild(elem);
			// add label
			if(labelPost)
				div.appendChild(labelPost);
				
			// seperate lines by default (only count elems added, not labels)
			if(elem && arr[a].noBreak != true && a != (arr.length-1))
				div.appendChild(document.createElement('br'));
			
		}// end for
	}
	
		
	if(tipPopupMasterTemplate.id == ID_TIPPOPUP_GOOGLETRANSLATE){
		// src & dest languages select
		var arr = [
			{labelPreHTML: INNERHTML_TIP_GOOGLETRANSLATE_LABEL_HEADING_TRANSLATE},
				{labelPreHTML: INNERHTML_TIP_GOOGLETRANSLATE_LABEL_FROM, type: "select", id: ID_TIP_GOOGLETRANSLATE_FROM, nameOption: "srcLang", noBreak: true,
					populate: "populateLanguages", prependAuto: true },
				{labelPreHTML: INNERHTML_TIP_GOOGLETRANSLATE_LABEL_TO, type: "select", id: ID_TIP_GOOGLETRANSLATE_TO, nameOption: "destLang",
					populate: "populateLanguages", prependAuto: null},
		];
		
		Build(arr, divSpecifics);
	}
	else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_GOOGLEIMAGESEARCH){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_RESTRICTIONS},
				{id: ID_TIP_GOOGLEIMAGESEARCH_RESTRICTTOHOST, type: "checkbox", nameOption: "restrictToHost", labelPostHTML: INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTTOHOST},
				{id: ID_TIP_GOOGLEIMAGESEARCH_RESTRICTSAFESEARCH, type: "select", labelPreHTML: INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTSAFESEARCH, nameOption: "restrictSafeSearch", 
					populate: [{name: "Strict", value: "active"}, {name: "Moderate", value: "moderate"}, {name: "Off", value:"off"}] },
		];
				
		Build(arr, divSpecifics);
		divSpecifics.appendChild(document.createElement('br'));
		
		// others (select) (TODO merge into build)
		var arr = [
			{idCheckBox: ID_TIP_GOOGLEIMAGESEARCH_ENABLERESTRICTIMAGESIZE, nameOptionChecked: "enableRestrictImageSize", 
				labelHTML: INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTIMAGESIZE,
				idSelect: ID_TIP_GOOGLEIMAGESEARCH_RESTRICTIMAGESIZE, nameOption: "restrictImageSize", //selectValue: tipPopupTemplate.options.restrictImageSize,
				populate: [{name: "Small", value: "small"}, {name: "Medium", value: "medium"}, {name: "Large", value:"large"}, {name: "Extra Large", value:"xlarge"}]},
			
			{idCheckBox: ID_TIP_GOOGLEIMAGESEARCH_ENABLERESTRICTIMAGETYPE, nameOptionChecked: "enableRestrictImageType", 
				labelHTML: INNERHTML_TIP_GOOGLEIMAGESEARCH_LABEL_RESTRICTIMAGETYPE,  
				idSelect: ID_TIP_GOOGLEIMAGESEARCH_RESTRICTIMAGETYPE, nameOption: "restrictImageType", //selectValue: tipPopupTemplate.options.restrictImageType,
				populate: [{name: "Faces", value: "faces"}, {name: "Photos", value: "photo"}, {name: "Clip art", value:"clipart"}, {name: "Line drawings", value:"lineart"}]} ,
		];

		function OnClickInputElement(e){
			for(var x in e.currentTarget.elemsAssociated)
				e.currentTarget.elemsAssociated[x].disabled = (e.currentTarget.checked == true ? false : true);
		}

		for(var a in arr){
			var label = document.createElement('label');
			label.innerHTML = arr[a].labelHTML;
			var input = null;

			if(a > 0)
				divSpecifics.appendChild(document.createElement('br'));
			
			//build
			if(arr[a].idCheckBox){		// optional checkbox
				input = document.createElement('input');
				input.type = "checkbox";
				input.nameOption = arr[a].nameOptionChecked;
				input.elemsAssociated = [];
				input.checked = GetValidOptionValue(arr[a].nameOptionChecked);
				input.addEventListener("click", OnClickInputElement, false);
				input.addEventListener("click", OnChangeTipTemplateElement, false);
				
				input.id = label.htmlFor = arr[a].idCheckBox;
				divSpecifics.appendChild(input);
				divSpecifics.appendChild(label);
			}

			var select = document.createElement('select');
			if(input)
				input.elemsAssociated.push(select);
			select.id = arr[a].idSelect;
			select.nameOption = arr[a].nameOption;
			select.addEventListener("change", OnChangeTipTemplateElement, false);
			select.addEventListener("keyup", OnChangeTipTemplateElement, false);
			if(arr[a].idCheckBox == null){
				label.htmlFor = select.id;
				divSpecifics.appendChild(label);
			}
			divSpecifics.appendChild(select);
			// populate
			for(var b in arr[a].populate){
				var option = new Option(arr[a].populate[b].name, arr[a].populate[b].value);
				select.options.add( option );										
			}
			// select
			select.value = GetValidOptionValue(arr[a].nameOption);
			// fake events to checkboxes to enable/disable associated elements
			if(input)
				OnClickInputElement({currentTarget: input});
				
/*			if(arr[a].idCheckBox){
				var eventMouse = document.createEvent("MouseEvent");
				eventMouse.initMouseEvent("click", true, true, window, 0, 
					0,0,0,0,//event.screenX, event.screenY, event.clientX, event.clientY, 
					false,false,false,false,//event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
					0, null);
				input.dispatchEvent(eventMouse);
			}*/
		}
	}
	else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_GOOGLETTS){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_SPOKENLANGUAGES},
				{id: ID_TIP_GOOGLETTS_AUTODETECT, type: "checkbox", labelPostHTML: INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_POST_AUTODETECT, nameOption: "autoDetectLanguage"},
				{id: ID_TIP_GOOGLETTS_LANGUAGE, type: "select", labelPreHTML: INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_PRE_LANGUAGE, labelPostHTML: INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_POST_LANGUAGE, nameOption: "language",
					populate: "populateLanguages",  },
		];	
		Build(arr, divSpecifics);
	}
	else if(DoesTemplateIdHaveMediaWikiAPI(tipPopupMasterTemplate.id) == true){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_SECTIONS},	
				{id: ID_TIP_MEDIAWIKI_DEFAULTSECTION, type: "text", nameOption: "defaultSection",
					labelPreHTML: INNERHTML_TIP_MEDIAWIKI_LABEL_PRE_DEFAULTSECTION, labelPostHTML: INNERHTML_TIP_MEDIAWIKI_LABEL_POST_DEFAULTSECTION,  tooltip: TOOLTIP_TIP_MEDIAWIKI_LABEL_DEFAULTSECTION},
				{id: ID_TIP_MEDIAWIKI_REMEMBERLASTSECTION, type: "checkbox", nameOption: "rememberLastSection",
					labelPostHTML: INNERHTML_TIP_MEDIAWIKI_LABEL_POST_REMEMBERLASTSECTION, tooltip: TOOLTIP_TIP_MEDIAWIKI_LABEL_REMEMBERLASTSECTION},
		];
		
		// not every wiki is multilingual
		if(GetValidOptionValue("monolingual") != true){
			var entry = {
				id: ID_TIP_MEDIAWIKI_EDITION,
				type: "select",
				labelPreHTML: INNERHTML_TIP_MEDIAWIKI_LABEL_PRE_EDITION, 
				labelPostHTML: INNERHTML_TIP_MEDIAWIKI_LABEL_POST_EDITION, 
				nameOption: "editionLanguage", 
				populate: [/*{name: "English", value: "en"}*/], sortBy: "text" 
			};
			
			for(var x in MediaWiki.arrFlagToFileName){
				if(MediaWiki.arrFlagToFileName[x].notLanguage != true)
					entry.populate.push({name: MediaWiki.arrFlagToFileName[x].name, value: MediaWiki.arrFlagToFileName[x].editionLanguage});
			}
			
            arr.push({labelPreHTML: INNERHTML_TIP_LABEL_HEADING_EDITIONS});
			arr.push(entry);
		}
		
		// copy the list of editions from MediaWiki
		
		Build(arr, divSpecifics);
	}
	else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_FLICKR){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_PRESENTATION},
				{id: ID_TIP_FLICKR_SORT, type: "select", labelPreHTML: INNERHTML_TIP_FLICKR_LABEL_PRE_SORT, nameOption: "sort", 
					populate: [{name: "Relevance", value: "relevance"}, 
						{name: "Date Posted (Descending)", value: "date-posted-desc"}, {name: "Date Posted (Ascending)", value: "date-posted-asc"},
						{name: "Date Taken (Descending)", value: "date-taken-desc"}, {name: "Date Taken (Ascending)", value: "date-taken-asc"},
						{name: "Interestingness (Descending)", value: "interestingness-desc"}, {name: "Interestingness (Ascending)", value: "interestingness-asc"}]},
				{id: ID_TIP_FLICKR_PERPAGE, type: "select", labelPreHTML: INNERHTML_TIP_FLICKR_LABEL_PRE_PERPAGE, labelPostHTML: INNERHTML_TIP_FLICKR_LABEL_POST_PERPAGE, nameOption: "per_page",
					populate: [{value: 1}, {value: 5}, {value: 8}, {value: 10}, {value: 20}, {value: 30}]},
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_RESTRICTIONS},
				{id: ID_TIP_FLICKR_MEDIA, type: "select", labelPreHTML: INNERHTML_TIP_FLICKR_LABEL_PRE_MEDIA, nameOption: "media", 
					populate: [{name: "Photos", value: "photos"},  {name: "Videos", value: "videos"}, {name: "Photos & Videos", value: "all"},]},
				{id: ID_TIP_FLICKR_INGALLERY, type: "checkbox", labelPostHTML: INNERHTML_TIP_FLICKR_LABEL_POST_INGALLERY, nameOption: "in_gallery"},
		];	
		
		Build(arr, divSpecifics);
	}
	else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_YAHOOWEB){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_RESTRICTIONS},
				{id: ID_TIP_YAHOOWEB_RESTRICTTOHOST, type: "checkbox", labelPostHTML: INNERHTML_TIP_YAHOOWEB_LABEL_POST_RESTRICTTOHOST, nameOption: "restrictToHost"},
				{id: ID_TIP_YAHOOWEB_NOPORN, type: "checkbox", labelPostHTML: INNERHTML_TIP_YAHOOWEB_LABEL_POST_NOPORN, nameOption: "no_porn"},
				{id: ID_TIP_YAHOOWEB_NOHATE, type: "checkbox", labelPostHTML: INNERHTML_TIP_YAHOOWEB_LABEL_POST_NOHATE, nameOption: "no_hate"},
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_PRESENTATION},
				{id: ID_TIP_YAHOOWEB_LONGABSTRACT, type: "checkbox", labelPostHTML: INNERHTML_TIP_YAHOOWEB_LABEL_POST_LONGABSTRACT, nameOption: "longAbstract"},
				{id: ID_TIP_YAHOOWEB_PERPAGE, type: "select", labelPreHTML: INNERHTML_TIP_YAHOOWEB_LABEL_PRE_PERPAGE, labelPostHTML: INNERHTML_TIP_YAHOOWEB_LABEL_POST_PERPAGE, nameOption: "per_page",
					populate: [{value: 1}, {value: 3}, {value: 5}, {value: 10}, {value: 20}]},
		];	
		
		Build(arr, divSpecifics);
	}
	else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_TWITTER){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_RESTRICTIONS},
				{id: ID_TIP_TWITTER_RESULTTYPE, type: "select", labelPreHTML: INNERHTML_TIP_TWITTER_LABEL_PRE_RESULTTYPE, labelPostHTML: INNERHTML_TIP_TWITTER_LABEL_POST_RESULTTYPE, nameOption: "result_type",
					populate: [{name: "Recent", value: "recent"}, {name: "Popular", value: "popular"}, {name: "Recent or Popular", value: "mixed"}]},
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_PRESENTATION},
				{id: ID_TIP_TWITTER_PERPAGE, type: "select", labelPreHTML: INNERHTML_TIP_TWITTER_LABEL_PRE_PERPAGE, labelPostHTML: INNERHTML_TIP_TWITTER_LABEL_POST_PERPAGE, nameOption: "per_page",
					populate: [{value: 1}, {value: 3}, {value: 5}, {value: 10}, {value: 20}] },
				{id: ID_TIP_TWITTER_REFRESHSTYLE, type: "select", labelPreHTML: INNERHTML_TIP_TWITTER_LABEL_PRE_REFRESHSTYLE, nameOption: "refresh_style",
					populate: [{name: "On their own", value: "replace"}, {name: "Appended to existing list", value: "append"}]},
		];	
		
		Build(arr, divSpecifics);
	}
	else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_MSTRANSLATE_TTS){
		var arr = [
			{labelPreHTML: INNERHTML_TIP_LABEL_HEADING_SPOKENLANGUAGES},
				{id: ID_TIP_MSTRANSLATE_TTS_AUTODETECT, type: "checkbox", labelPostHTML: INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_POST_AUTODETECT, nameOption: "autoDetectLanguage"},
				{id: ID_TIP_MSTRANSLATE_TTS_LANGUAGE, type: "select", labelPreHTML: INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_PRE_LANGUAGE, labelPostHTML: INNERHTML_TIP_MSTRANSLATE_TTS_LABEL_POST_LANGUAGE, nameOption: "language",
					populate: [], sortBy: "text" },
		];	
		// GetLanguagesForSpeak 8th Jan 2011 
		for(var q in Bing.arrLanguageNames){
			if(Bing.arrLanguageNames[q].forSpeak == true)
				arr[2].populate.push({name: Bing.arrLanguageNames[q].name, value: Bing.arrLanguageNames[q].value});
		}
		
		Build(arr, divSpecifics);
	}
    else if(tipPopupMasterTemplate.id == ID_TIPPOPUP_MSTRANSLATE_TRANSLATE){
        var arr = [
           {labelPreHTML: INNERHTML_TIP_GOOGLETRANSLATE_LABEL_HEADING_TRANSLATE},
           {labelPreHTML: INNERHTML_TIP_GOOGLETRANSLATE_LABEL_FROM, type: "select", id: ID_TIP_MSTRANSLATE_FROM, nameOption: "srcLang", noBreak: true,
                   populate: "populateLanguages", prependAuto: true, bing: true},
           {labelPreHTML: INNERHTML_TIP_GOOGLETRANSLATE_LABEL_TO, type: "select", id: ID_TIP_MSTRANSLATE_TO, nameOption: "destLang",
                   populate: "populateLanguages", prependAuto: null, bing: true},
           ];

		Build(arr, divSpecifics);
    }
    
    
    
    
}

function OnChangeTipTemplateElement(){
	var select = document.getElementById("selectTipTemplate");
	if(select.selectedIndex == -1)
		return;

	var elem = event.currentTarget;
	var option = select.options[select.selectedIndex];

	// general (per template)
	switch(elem.id){
	case "selectShortcutTipTemplateModifier1":
	case "selectShortcutTipTemplateModifier2":
	case "selectShortcutTipTemplateModifier3":
	case "textShortcutTipTemplate":
	case "btnResetShortcutTipTemplate":
		option.SimpleHighlight.tipPopupTemplate.shortcut = GetShortcutText([
			document.getElementById("selectShortcutTipTemplateModifier1"),
			document.getElementById("selectShortcutTipTemplateModifier2"),
			document.getElementById("selectShortcutTipTemplateModifier3")],
			document.getElementById("textShortcutTipTemplate"));
		break;
		
	case "buttonTipTemplateDefault":
		// only one can be default
		for(var x=0; x<select.options.length; x++){
			// ignore separators
			if(select.options[x].SimpleHighlight.tipPopupTemplate.groupStart == true || select.options[x].SimpleHighlight.tipPopupTemplate.groupEnd == true)
				continue;
				
			select.options[x].SimpleHighlight.tipPopupTemplate.default = 
				(x == select.selectedIndex ? true : false);

			// update background of new default & clear others
			select.options[x].className = (x == select.selectedIndex ? "defaultTemplate" : "");
		}
		break;
		
	default:
		// specific to a template
		if(elem.tagName == "INPUT" && elem.type == "checkbox")
			option.SimpleHighlight.tipPopupTemplate.options[elem.nameOption] = elem.checked;
		else
			option.SimpleHighlight.tipPopupTemplate.options[elem.nameOption] = elem.value;
	}
}
