// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
	document.getElementById ("theBody").addEventListener('scroll', OnScroll);
	
	document.getElementById ("pin").addEventListener('click', OnClickPin);
	
	document.getElementById ("session").addEventListener('click', OnClickSave);
	document.getElementById ("local").addEventListener('click', OnClickSave);

	document.getElementById ("deleteStorage").addEventListener('click', OnClickUnSave);

	document.getElementById ("import").addEventListener('click', OnClickButtonImport);
	document.getElementById ("btnHiddenImport").addEventListener('change', OnChangeImport);
	document.getElementById ("export").addEventListener('click', OnClickExport);

	document.getElementById ("removeAll").addEventListener('click', OnClickRemoveAllHighlights);

	document.getElementById ("report").addEventListener('mousedown', OnClickButtonDetailAllHighlights);
	
	document.getElementById ("cancel").addEventListener('click', OnClickPrevNext);
	document.getElementById ("prev").addEventListener('click', OnClickPrevNext);
	document.getElementById ("next").addEventListener('click', OnClickPrevNext);

	document.getElementById ("quicklanguage").addEventListener('click', OnClickQuickLanguageButton);
	document.getElementById ("allnotes").addEventListener('click', OnClickVisibilityButtons);

	document.getElementById ("selectImportURL").addEventListener('change', OnChangeSelectImport);
	document.getElementById ("selectImportURL").addEventListener('keyup', OnChangeSelectImport);

	document.getElementById ("import_gotourl").addEventListener('click', OnClickButtonImportBarGotoURL);
	document.getElementById ("import_import").addEventListener('click', OnClickButtonImportBarImport);
	document.getElementById ("import_close").addEventListener('click', OnClickButtonImportBarClose);

	document.getElementById ("selectTransHLSrcLang").addEventListener('change', OnChangeQuickTransLanguage);
	document.getElementById ("selectTransHLSrcLang").addEventListener('keyup', OnChangeQuickTransLanguage);
	document.getElementById ("selectTransHLDestLang").addEventListener('change', OnChangeQuickTransLanguage);
	document.getElementById ("selectTransHLDestLang").addEventListener('keyup', OnChangeQuickTransLanguage);

	document.getElementById ("quicklanguagebar_reset").addEventListener('click', OnClickButtonResetQuickLanguage);
	document.getElementById ("quicklanguagebar_set").addEventListener('click', OnClickButtonApplyQuickLanguage);
	document.getElementById ("quicklanguagebar_close").addEventListener('click', OnClickButtonCloseQuickLanguage);

	document.getElementById ("removedonate").addEventListener('click', OnClickButtonRemoveDonate);
	
	// previous onload function
	OnLoad();
});




////////////////////////////////
// settings

var DONATE_MODULO = 20;
var ENABLE_QL_RETRANSLATEALL = true;//false;	// t.o.s forbids batching
var ENABLE_ALLTRANS = false;

var BUG_68135_NOCACHE = true;

var KEYNAME_EXPORTPAGEHIGHLIGHTS = "TemporaryExportPage";

////////////////////////////////
// misc

var LANGUAGENAME_AUTO = "Auto Detected";
var LIMIT_DAILY_TRANSLATEDCHARS = (100000 - 5000);
var TIMEOUT_IMGWAITING  = 15000;					// 15s (only for image. network timeout is nmfup)

var INNERTEXT_EMPTYNOTE = "Enter your note here";
var ROWS_NOTE = 5;

var WIDTH_HR_SNIPPETGROUPSEPERATOR = "40px";

var OPACITY_DISABLED = 0.4;
var OPACITY_ENABLED = 1;

var MARGINLEFT_BUTTONGROUP_ADDREMDEL = 4;//"3px";

/////////////////////
// prompts

var PROMPT_IMPORTURL_MESSAGE = "Enter the URL of the exported highlights (including protocol, such as http:// or https://)";
var PROMPT_IMPORTURL_DEFAULTVALUE = "http://";

/////////////////////
// confirms
								
var CONFIRM_FORCEIMPORT = "The URL of the page associated with these highlights doesn't match that of the current page.\n\nDo you wish to try and import them anyway?";

/////////////////////
// alerts

//var ALERT_IMPORTNOMATCHEDURL = "None of the highlights in this file originate from the current page.";

/////////////////////////////////////
// shortcuts

var SHORTCUT_FIND_NEXT = "j";
var SHORTCUT_FIND_PREV = "k";
var SHORTCUT_FIND_CANCEL = "x";
var SHORTCUT_FIND_TOP = "ctrl+k";
var SHORTCUT_FIND_BOTTOM = "ctrl+j";

var SHORTCUT_SHOWTRANSHL = "t";
var SHORTCUT_ALLTRANSHL = "ctrl+t";

var SHORTCUT_QUICKLANGUAGE = "q";

var SHORTCUT_SPEAKSNIPPET = "y";
var SHORTCUT_SELECTHL = "s";
var SHORTCUT_SHOWTIP = "m";
var SHORTCUT_LOOKUPHIGHLIGHT = "l";
var SHORTCUT_REMOVEHL = "delete";

var SHORTCUT_SHOWNOTE = "n";
var SHORTCUT_ALLNOTES = "ctrl+n";

////////////////////////////////
// tooltips
// TODO: auto shortcut append

var TOOLTIP_HIGHLIGHT = "Click to flash highlight & scroll into view. Add [Alt] to just flash, [Ctrl] to alternate pin behaviour, [Shift] to select."
var TOOLTIP_PININ = "Pull pin to allow popup to close when a highlight is clicked. Add [Ctrl] to temporarily push pin whilst clicking a highlight.";
var TOOLTIP_PINOUT = "Push pin to keep popup window open when a highlight is clicked. Add [Ctrl] to temporarily push pin whilst clicking a highlight.";
var TOOLTIP_ADDNOTE = "Add Note";
var TOOLTIP_REMOVENOTE = "Delete Note";
var TOOLTIP_REMOVEHIGHLIGHT = "Remove Highlight ["+SHORTCUT_REMOVEHL+"]";
var TOOLTIP_SELECTHIGHLIGHT = "Select Highlight ["+SHORTCUT_SELECTHL+"]";
var TOOLTIP_LOOKUP = "Lookup Highlight ["+SHORTCUT_LOOKUPHIGHLIGHT+"]";
var TOOLTIP_HIDETRANSHL = "Show snippet in native language ["+SHORTCUT_SHOWTRANSHL+"]";
var TOOLTIP_SHOWTRANSHL = "Show snippet translated into <<LANGUAGE>> ["+SHORTCUT_SHOWTRANSHL+"]\nAdd [Alt] for alternate style";
var TOOLTIP_SHOWNOTE = "Reveal Note ["+SHORTCUT_SHOWNOTE+"]";
var TOOLTIP_HIDENOTE = "Hide Note ["+SHORTCUT_SHOWNOTE+"]";
var TOOLTIP_SHOWTIP = "Show Tip for Highlight ["+SHORTCUT_SHOWTIP+"]";
var TOOLTIP_SPEAKSNIPPET = "Speak Snippet ["+SHORTCUT_SPEAKSNIPPET+"]\nAdd [Alt] to use alternate speech service, [Shift] for native speech service.\nSelect spoken language by using the flag icon above.";
var TOOLTIP_QLBARSRCFLAG = "Translation Source Language, and Untranslated Speech Language: <<LANGUAGE>> ["+SHORTCUT_QUICKLANGUAGE+"]";
var TOOLTIP_QLBARDESTFLAG = "Translation Destination Language, and Translated Speech Language: <<LANGUAGE>> ["+SHORTCUT_QUICKLANGUAGE+"]";
var TOOLTIP_TRANSLATEDSNIPPET_SPANSOURCE_FROMTO = "Translated from <<SRCLANGUAGE>> into <<DESTLANGUAGE>>";
var TOOLTIP_TRANSLATEDSNIPPET_SPANSOURCE_TO = "Translated into <<DESTLANGUAGE>>";

var TOOLTIP_WAITING = "Loading...";

var TOOLTIP_SHOWTRANSLATIONS = "Show all snippets translated into <<LANGUAGE>> ["+SHORTCUT_ALLTRANSHL+"]";
var TOOLTIP_HIDETRANSLATIONS = "Show all snippets in native language ["+SHORTCUT_ALLTRANSHL+"]";
var TOOLTIP_SHOWNOTES = "Reveal all notes ["+SHORTCUT_ALLNOTES+"]";
var TOOLTIP_HIDENOTES = "Hide all notes ["+SHORTCUT_ALLNOTES+"]";

var TOOLTIP_INFORMATION_TRANSHL_DESTLANG = "Showing snippet translated into <<DESTLANGUAGE>>.";		
var TOOLTIP_INFORMATION_TRANSHL_SRCDESTLANG = "Showing snippet translated from <<SRCLANGUAGE>> into <<DESTLANGUAGE>>.";

var TOOLTIP_SOURCESNIPPET = "Native Snippet: <<SNIPPET>>"

var TOOLTIP_TEXTAREA = "Press TAB or click away from the text box to finish editing";
var TOOLTIP_NOTE = "Click to edit note";

var TOOLTIP_TITLEBAR_SESSION = "Page highlights last saved into temporary (green) storage";
var TOOLTIP_TITLEBAR_LOCAL = "Page highlights last saved into persistent (red) storage"; 
var TOOLTIP_TITLEBAR_UNSAVED = "Page highlights in their current state are not stored";

////////////////////////////////
// error/warning

var ERROR_TRANSLATION = "Translation error: <<ERROR>>";
var ERROR_IMGWAITING = "Timeout whilst waiting for translation";

////////////////////////////////
// infobar messages

var INFOBAR_INCOGNITO = "Automatic storage of highlights is disabled in Incognito mode";
var INFOBAR_TRANSLATEDCHARS = "Amount of translated characters approaching Google daily limit";

/////////////////////////////////////
// summary

var SUMMARY_FORMAT_HEAD_TITLE = "Highlights for <<TITLE>>";
var SUMMARY_UNTITLED = "Untitled Page";
var SUMMARY_FORMAT_BODY_TITLE = '<<LOGO>>Highlights for "<<TITLE>>"';
var SUMMARY_FORMAT_SUBFRAME_INNERHTML = "Subframe (<<ANCHOR>>)"
var SUMMARY_SUBFRAME_UNTITLED = "Untitled";
var SUMMARY_INNERHTML_FOOTER = 'Generated by <a href="https://chrome.google.com/extensions/detail/hljnlfolmbmibdjaikiaepgepgnldclj">Simple Highlighter</a> on <<DATE>>';

var SUMMARY_BASE64_IMG_LOGO_48 = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAAI/klEQVRoQ+2Ze3BU9RXHs7vZJe9NsmzIiwRLCCVIeAVIQhJINkSygRCCNDFEHinlKQwQobyqoBWsSEVl1BGLMnXoCEwpLbUy2hYQywgKpZaXUBUiQoBAgLyT3W+/527u8hhA3M1C/vDOnNnXvef3Od97fud37m+9vH482kwBX3qKpvm3mcf75EjA19Au02y0q7R1NON9Gt+tYUJ59S4aTEEaZA3QIbyjBvKZ9hlNfm+3R3grJLL6eaPy/UC0HPLDlS/0KMh1BrGP55jaYwSxhDoqSuen6nHt74T/TxBsZyywX0xE/VkvFFiVuyAmQbSrO9GDQKcE7vEcA+p2BqHlcAzsdfvgOOxA3TNoOO2NgkfaXzolEfyswM8u9EHDLsIfiYe94UgrfOtLw07YT/uj9rABBdnaG+/EA02nDIJXazReWFrqi6aPBb4noMDbrgfQsAv2ilDYThr4uw9q9vli1FDdA0+nkYSv1Wm98NvpfmgW+GP9CX+A7BeYNbWOIBT4YNhOOOBlUjd/5o+aXYHIGej9wKpTKeEbDd5eeKvcX4G3HUsG6j8BWr4kdwUDuMjPOxzK3wLfvDcQzbuNqP5rMHKS9Pc9naYTvsXHoMGmXwU4lD+eDtTuAJo+ZQCHHEHUbSF8iDNtVOVV+KaPgtH0t1Bc3mzCsD4GNYi99O3nqRKroeOlNLvRX4MPVlJFgT/BMlmzlanCAJp30RhE7duE5125g/IqfONfTGj8oxnVvw+DpZcziF96IgAtna4SeFOgFnvWGB1pcyIH9qsbmCqbqP42GoOoeYXwxnuGb3gvDA3vhuPoqjBoWQw4xsdtHYA3HUofg2iTFgdea4U/mQt79VqmyjqgkUE0vgdcW+lQvrXa3CltVOVV+Pp3InDu1QjodUoAB9syAGnKNgl8XKQOx9YHo3kP1f1fHuyXV1Lt1UydV2lvAleXsM4H/GDlBb7+rSisLg5W58H6tgoggI52CHxiF2+cejeE8CyHJwlftRj2a08zdZ6jvQhcmUP4QJfhN88wwaBTVugaWs+2CEBWxz0Cn9Jdj+/+EEp4qShWVsfZzPtyps5CGoOonuJQ3oW0EeU/mGeGHysax2qijWoL+Eg6OSTwOX0NuLRF4GUVHQ77+TLYr0xhlZlJm8c0KiW8n8vK71kUBqOv0la00GRtcfvoSg8nBH5MSgdc3WoivImALJWVxZy04wg+gblP1S8VKr3NvZbKGyesKH9wWSeYWdGkstFmu03emnsVAl9m8UXtNoHvSMAhsJ8dSbULCP4oK00J5wBTSZR3MW2OrwhHTKjSCwn8UzRZY9w6knn1BXpBeb4f6rnANH9ihu3LVNi/y6baOQS3stKMInwm4X1dVv7r30QgvpOzB3qpLeAtdHJFFpHlRQFo3C7wYbAdT+LDCAOoYptwbSgrzTBO4BS34M+9FIk+Mc4V922OKwuky8dQXvkOrU46ypfLAiELjMC3HEuE7dt+hE+i6gMJnwb7BX4+7eNy2lS9EoX0bh3UWr+V4xpcJueFBbRGyXeDtwYbZhmdyrcc7cFmMoFqs6+/ksgy2Z/wPQnfweW0qV4bhdxePir8RxzXxx34Eby4XqPRwhgRi3VPmK/DH+kK2+muBI4jfDxwmYGcj3MLvua1aBQN8FPhP+XYbm2tyGz/tygfEhOP7ikWFJUMR+UOps1/O8F2qjPhO1P1WMIzkMpYB7yL1abu9WhMHxqgwh/muGZ3lJdrg2hNOkMH/CQpA8m5hcgtnoTyhRNQ9YWJaocQPgK4FE34SMIbXE4bgV8wPEiF/4rjxrgLL9fraAfkDoTHJSBtxFgUT5mNaU8uxQtr5qD6tBGoCob9nNkt+Po3ovF8YTDkWZljyQN/fFvAqz4G8E2Lwc8f/S0jMfbnM1H+1HMof3oFfr3qCVw+aSS83uW0Efg3SkPV3l62Fvu1Jbzqa4+XRoOE5EzkjB2v3IFZi5ZhavkSLFo2GRcPhtz0AH7rY+Dt+nlpDwR+42QT+3qlObtGS/cEvPh8WdIoYWAaskaXoGTaHMxZ+iwmzV7geD9/HCrZRsjuwQ+B3z7LDF+9Ai8l2uopePG7VgLom25BXkkZfsY0mvrkEkyZtxhjy2Zi1ONT8IsZY1D5oVnZPbj1GfbWxkyU3z2/EwJ9FPhmWokn4cX3Xg1TyFJQpMBPmjUfk+cuxES+jps2F1ZWJsuYUoybOAJn/tRJ2T24W9rsXxwOk7/SWcpW+gxPwyeISsaQ0JvgS6fPReHEaRg9YRoKJkxFRn6xUmbHFGWjYmOEsntwO+UPL49AdIhzl22Rp+FlIdsi6ZOUlulUXoWXNSGz4DFYCscpkzspOx+9h+TCOjIDFeujlN0D9RlW0uarFZGIMzs7y9X063Zb/H0CTBb44FATJswsV9LmOvxEBT6FqvfNysPAnAIMzhuLhLQcdBuUCcuwQfhmbWflAVzgz7wQhcQo567am/TrVmf5feDyu7Id6K3XI794/F3hEwYPQ9zAoehJ+L5ZI/BQ/wx07p2K9Ix++PrFGJxfHYXUrs7OcjP96u8FwJ1zonhxjVarQ6Z11C3wjrRRlVfhY/oMRuTDg9hyDMFPU7IRwfdhPZKQktoHwx4OvLGz7OAO2L1cKw3U55I6I7IC8Mzzs5T0kQmbW3xz2gh8bOIgmGLiEBgWhQBzFIyd4xCdmIzYvmlKAObu/aD3cwbw6L0AuHNORxU+N02H2uN6VJ0Mxvwlk5D3WNlNyj/UawD8gkJUZW961eq8ERzZBeb43jD4Oxu0f9K3bHx57BB4+VcQAl9zTM8OU8vnXAPO/SMM48tGI3l4IfpkWmGKjIG0FnJua8CL+Tq6dd78jq91jt+c5+zkZ+lsPXY4lbemE/4o4S9oYPtGj+b9/mj6MAQVG6JhyUlDQEhHFVz+48q/A1E3fv9n2m7acprH/7jeqCg/mPCf+8B+Rsc2WQP7tzq0HPVB4/uh2L4gFAE+zv+q/sXzwzwmpwuO90svnjlIi7xsjcMy+T5DB2uqN6wDDOp2niz922jt6i9PibeIJu3sbSdl6/eykSoLW7s9gknW5S4mv/94eEKB/wORycr8Zu1jWQAAAABJRU5ErkJggg=="

////////////////////////////////
// class (dynamic)

var CLASS_SPAN_ADDREMDEL = "addremdel";
var CLASS_TEXTAREA_EDITNOTE = "editnote";		// in css

//var CLASS_HIGHLIGHT = "highlight";
var CLASS_HL = "hlText";
var CLASS_NOTE = "note";
var CLASS_SELECTHL = "selecthl";
var CLASS_LOOKUP = "lookup";
var CLASS_REMOVEHL = "removeHL";
var CLASS_WAITING = "waiting";
var CLASS_REMOVENOTE = "removenote";
var CLASS_ADDNOTE = "addnote";
var CLASS_INFORMATION = "information";
var CLASS_INFORMATION_IMG = "imginfo";
var CLASS_SHOWTRANSHL = "showtranshl";
var CLASS_SHOWTRANSHL_IMG = "showtranshlimg";
var CLASS_SHOWNOTE = "shownote";
var CLASS_SHOWNOTE_IMG = "shownoteimg";
var CLASS_SHOWTIP = "showtip";
var CLASS_SPEAKSNIPPET = "speak"
var CLASS_APPENDEDTRANSLATION = "appendedTranslation";
var CLASS_SPEECH = "spanspeech";
var CLASS_SPEECH_FLAG = "speechflag";
var CLASS_SPEECH_ACTIVE = "speechactive";
var CLASS_SPANSOURCE = "spansource";
var CLASS_SPANSOURCE_FLAG = "sourceflag";
var CLASS_SPANSOURCE_DIRECTION = "sourcedirection";

////////////////////////////////
// class (static)

var CLASS_QL_BUTTONSELECTED = "quicklanguagebuttonselected";
var CLASS_IMPORT_BUTTONSELECTED = "importbuttonselected";
var CLASS_BUTTONSELECTED = "buttonselected"
var CLASS_HEADERBUTTONIMAGE = "headerbuttonimage";

////////////////////////////////
// id (static)

var ID_ANCHOR_REMOVEALLHIGHLIGHTS = 'removeAll';
var ID_SPAN_FINDCURSOR = "findcursor";
var ID_ANCHOR_ALLNOTES = "allnotes";
var ID_ANCHOR_ALLTRANS = "alltrans";
var ID_ANCHOR_QUICKLANGUAGE = "quicklanguage";
var ID_ANCHOR_IMPORT = "import";
var ID_DIV_QUICKLANGUAGEBAR = "quicklanguagebar";
var ID_DIV_IMPORTBAR = "importbar";
var ID_BUTTON_IMPORTBAR_GOTOURL = "import_gotourl";
var ID_SELECT_IMPORTURL = "selectImportURL";
var ID_SPAN_IMPORTBARTEXT = "importbartext";
var ID_SPAN_NUMTRANSLATEDCHARS = "numtranslatedchars";
var ID_DIV_HIGHLIGHTS = "highlights";
var ID_DIV_NOHIGHLIGHTS = "nohighlightsmessage";
var ID_ANCHOR_EXPORT = "export";
var ID_BUTTON_QLBAR_SET = "quicklanguagebar_set";
var ID_BUTTON_QLBAR_RESET = "quicklanguagebar_reset";
var ID_BUTTON_QLBAR_SRCFLAG = "quicklanguagebarsrcflag";
var ID_BUTTON_QLBAR_DESTFLAG = "quicklanguagebardestflag";
var ID_SPAN_QLBAR_TRANSLATEDTODAY = "translatedtoday";
var ID_BUTTON_DELETESTORAGE = "deleteStorage";
var ID_BUTTON_SAVESESSION = "session";
var ID_BUTTON_SAVELOCAL = "local";
var ID_BUTTON_DETAILHIGHLIGHTS = "report";
var ID_DIV_DONATE = "donate";

//////////////////////////////////////
// id (dynamic)

var ID_OL_HIGHLIGHTS = "orderedlistHighlights";

////////////////////////////////
// messagecodes

var MSG_SNIPPETSENT = "popupSnippetSent";

var MSG_REGISTERFRAME = "popupRegisterFrame";
var MSG_ONEXPORTEDFRAME = "popupExportedFrame";
var MSG_ONDETAILHIGHLIGHTSFRAME = "popupDetailHighlightsFrame";

////////////////////////////////
// colours

var COLOUR_MOUSEOVER = "red";
var COLOUR_MOUSEOUT_NOTE = "#EBB432"
var COLOUR_MOUSEOUT_SHOWINGTRANSLATED = "#2CA4DF";

var COLOUR_TRANSLATEDSNIPPET = "#e2f2ff";

////////////////////////////////
// variables

var _indexCurrentHighlight;
var _totalNumHighlights;

var _marginLeft;
var _pageYOffsetTryAfterSnippetSent;
var _disableStorePopupPageYOffset = false;

var _currentTargetListItemMouseOver = null;

var _msgSetPopupTranslatedSnippet = "setPopupTranslatedSnippet_" + RandomString(8);
var _msgSetPopupSpeakSnippet = "setPopupSpeakSnippet_" + RandomString(8);

var _registeredFrameCount = 0;
var _reportedFrameCount = 0;
var _exportAsXml = false;
var _arrDetailHighlights = [];
var _saveDetailHighlights = false;
var _relativeDateDetailHighlights = false;

////////////////////////////////
// preference values (HL)

var _arrPrefToClassName = [
	{prefHL: PREFERENCE_HL1, className: "cl1" },
	{prefHL: PREFERENCE_HL2, className: "cl2" },
	{prefHL: PREFERENCE_HL3, className: "cl3" },
	{prefHL: PREFERENCE_HL4, className: "cl4" },
	{prefHL: PREFERENCE_HL5, className: "cl5" },
	{prefHL: PREFERENCE_HL6, className: "cl6" },
	{prefHL: PREFERENCE_HL7, className: "cl7" }
];
// convert preference_hl* value to associated classname, or null if not found
function _PrefHLToClassName(prefHL) {
	for(var i=0; i<_arrPrefToClassName.length; i++){
		if(_arrPrefToClassName[i].prefHL == prefHL)
			return _arrPrefToClassName[i].className;
	}
	return null;
};

//////////////////////////////////////////////////////
// Event Handlers

function OnLoad() {
	// listener
	chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
		if(request.msg == MSG_ONEXPORTEDFRAME){
			OnExportedFrame(request.key);
		}
		else if(request.msg == MSG_ONDETAILHIGHLIGHTSFRAME){
			OnDetailHighlightsFrame(request.hrefHashRemoved, request.title, request.arrHighlights);
		}
		else if(request.msg == MSG_REGISTERFRAME) {
			_registeredFrameCount++;
		}
		else if(request.msg == MSG_SNIPPETSENT) {
			OnSnippetSent(request.arrayInfo,
				{
					msgScrollIntoView: request.msgScrollIntoView,
					msgSetNote: request.msgSetNote,
					msgRemoveHighlight: request.msgRemoveHighlight,
					msgSelectHighlight: request.msgSelectHighlight,
					msgShowTipPopup: request.msgShowTipPopup,
					msgSetShowStatus: request.msgSetShowStatus,
					msgSetTranslatedSnippet: request.msgSetTranslatedSnippet,
					msgLookupHighlight: request.msgLookupHighlight,
				},
				sender.tab,
				{
					showAllTrans: request.stateShowAllTrans,
					showAllNotes: request.stateShowAllNotes,
				});
		
		}else if(request.msg == _msgSetPopupTranslatedSnippet)
			OnSetPopupTranslatedSnippet(request.index, request.data);//request.data.note, request.data.error, request.data.codeLanguage);
		else if(request.msg == _msgSetPopupSpeakSnippet)
			OnSetPopupSpeakSnippet(request.index, request.data, request.templateId);
	});

	// update load count
	// var count = GetPreference(PREFERENCE_POPUP_LOADCOUNT);
	// count++;
	// SetPreference(PREFERENCE_POPUP_LOADCOUNT, count);
	
	// hide donate button based on load count
	// var div = document.getElementById(ID_DIV_DONATE);
	// div.style.display = ((count % DONATE_MODULO) == 5 ? "" : "none");
		
	// hide donate button based on pref
	// var div = document.getElementById(ID_DIV_DONATE);
	// div.style.display = (GetPreference(PREFERENCE_POPUP_REMOVEDONATE) == PREFBOOL_TRUE ? "none" : "");
	
	// smargin that will be added to the right side when scroll bars are automatically shown
	_marginLeft = GetScrollBarWidth() + parseFloat(window.getComputedStyle(document.body)["margin-right"]);
	document.body.style.setProperty("margin-left", _marginLeft + "px");
	document.body.style.setProperty("margin-right", _marginLeft + "px");

	// all preferneces needed
	arrayPrefs = GetPreference([PREFERENCE_HIGHLIGHTSTYLE, 
		PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW,
			PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING, PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW,
		PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING,
			PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW,
		PREFERENCE_HL1, PREFERENCE_HL2, PREFERENCE_HL3, PREFERENCE_HL4, PREFERENCE_HL5, PREFERENCE_HL6, PREFERENCE_HL7,
		
		PREFERENCE_SHOWTRANSLATEDSNIPPETS, PREFERENCE_SHOWNOTES]);

	// add styles for each highlight to pages stylesheet
	_arrPrefToClassName.forEach(function (h) {
		var styleElement = document.createElement('style');

		styleElement.textContent = "." + h.className + " {\
			text-decoration: none; " +
			GetStyleElementText(arrayPrefs, arrayPrefs[h.prefHL], "popup") + 
			" }";

		document.head.appendChild(styleElement);
	});

	///////////////////////////////
	// shortcuts	
	var arr = [
		{shortcut: SHORTCUT_FIND_NEXT, arg: "next"},
		{shortcut: SHORTCUT_FIND_PREV, arg: "prev"},
		{shortcut: SHORTCUT_FIND_CANCEL, arg: "cancel"},
		{shortcut: SHORTCUT_FIND_TOP, arg: "top"},
		{shortcut: SHORTCUT_FIND_BOTTOM, arg: "bottom"},
	];
	
	for(var e in arr){
		shortcut.add(arr[e].shortcut, function(event, keys, opt){
			_OnClickPrevNext(opt.callbackData.arg);
		}, { 'disable_in_input': true, propagate: true, callbackData: {arg: arr[e].arg }});
	}

	shortcut.add(SHORTCUT_SHOWTRANSHL, function () {
		// pretend this is the event source
		var anchor = GetAnchorFromClassName(CLASS_SHOWTRANSHL);
		if(anchor){
			var targetOld = _currentTargetListItemMouseOver;

			OnClickToggleTranslateSnippet({currentTarget: anchor, ctrlKey: false});
			// if target becomes nulled just by changing innertext, force it back so subsequent keypresses work
			if(_currentTargetListItemMouseOver == null)
				_currentTargetListItemMouseOver = targetOld;
		}
			
	}, { 'disable_in_input': true, propagate: true });

	if(ENABLE_ALLTRANS == true){
		shortcut.add(SHORTCUT_ALLTRANSHL, function () {
			_OnClickVisibilityButtons(document.getElementById(ID_ANCHOR_ALLTRANS));
		}, { 'disable_in_input': true, propagate: true });
	}
	shortcut.add(SHORTCUT_QUICKLANGUAGE, function () {
		OnClickQuickLanguageButton();
	}, { 'disable_in_input': true, propagate: true });

	// simplified 
	var arr = [
		{shortcut: SHORTCUT_SPEAKSNIPPET, className: CLASS_SPEAKSNIPPET, func: OnClickSpeakSnippet},
		{shortcut: SHORTCUT_SELECTHL, className: CLASS_SELECTHL, func: OnClickSelectHighlight},
		{shortcut: SHORTCUT_SHOWTIP, className: CLASS_SHOWTIP, func: OnClickShowTip},
		{shortcut: SHORTCUT_LOOKUPHIGHLIGHT, className: CLASS_LOOKUP, func: OnClickLookupHighlight},
		{shortcut: SHORTCUT_REMOVEHL, className: CLASS_REMOVEHL, func: OnClickRemoveHighlight},
		{shortcut: SHORTCUT_SHOWNOTE, className: CLASS_SHOWNOTE, func: OnClickToggleShowNote},
	];
	for(var d in arr){
		shortcut.add(arr[d].shortcut, function(event, keys, opt){
			var anchor = GetAnchorFromClassName(opt.callbackData.className);
			if(anchor)
				opt.callbackData.func({currentTarget: anchor, ctrlKey: true});
		}, {'disable_in_input': true, propagate: true, callbackData: {className: arr[d].className, func: arr[d].func} });
	}
	
	shortcut.add(SHORTCUT_ALLNOTES, function () {
		_OnClickVisibilityButtons(document.getElementById(ID_ANCHOR_ALLNOTES));
	}, { 'disable_in_input': true, propagate: true });

	////////////////////////////////
	// toggle buttons
	
	// default button state is opposite of actual item default (may be overridden if OnSnippetSent returns a DOM cached version)
	if(ENABLE_ALLTRANS == true)
		SetSelectedButtonState(ID_ANCHOR_ALLTRANS, arrayPrefs[PREFERENCE_SHOWTRANSLATEDSNIPPETS] == PREFBOOL_TRUE ? false : true);
	SetSelectedButtonState(ID_ANCHOR_ALLNOTES, arrayPrefs[PREFERENCE_SHOWNOTES] == PREFBOOL_TRUE ? false : true);

	////////////////////////////////
	// populate ql

	// populate quicklanguage bar
	PopulateLanguages("selectTransHLSrcLang", {prependAuto: true, bing:true});
	PopulateLanguages("selectTransHLDestLang", {bing: true});
	// sync to options
	document.getElementById("selectTransHLSrcLang").value = GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING);
	document.getElementById("selectTransHLDestLang").value = GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING);
	// enable reset button if languages arent both teh defaults
	document.getElementById(ID_BUTTON_QLBAR_RESET).disabled = (
		GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING, true) == GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING) &&
		GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING, true) == GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING)) ? true : false;

	// sync flag to current settings
	SetQuickLanguageFlag();
		
	////////////////////////////////
	// populate highlights

	ClearList();
	PopulateList();
}

// TODO: put this in OnUnload() if it ever works
function OnScroll(){
	// store the page offset
	if(_disableStorePopupPageYOffset == false && document.SimpleHighlight && document.SimpleHighlight.tab){
		chrome.tabs.sendRequest(document.SimpleHighlight.tab.id, { msg: "setPopupPageYOffset", popupPageYOffset: window.pageYOffset } );
	}
}

function OnSetPopupTranslatedSnippet(index, data){//translatedSnippet, error, codeLanguage)
	// find correspinding list item
	var elemsLI = document.getElementsByTagName("li");
	if(index >= elemsLI.length)
		return;

	// remove 'waiting' img
	var spanWaiting = elemsLI[index].getElementsByClassName(CLASS_WAITING)[0];
	spanWaiting.style.display = "none";
	// cancel image timeout
	if(spanWaiting.timerID != null){
		clearTimeout(spanWaiting.timerID);
		spanWaiting.timerID = null;
	}

	// indicate error, or if error is null clear error status
	SetItemError(index, data.error);			
	
	// handle errors separately
	if(data.error){
		// reset status
		ShowTranslatedSnippet(false, index);
		return;
	}
	
	// translation contained in 'note'
	if(data.note){
		// pass to tab DOM to update its translated snippet
		if(document.SimpleHighlight && document.SimpleHighlight.tab){
			if(elemsLI[index].SimpleHighlight){
				chrome.tabs.sendRequest(document.SimpleHighlight.tab.id, { 
					msg: elemsLI[index].SimpleHighlight.msgSetTranslatedSnippet,
					index: index,
					data: data} );
			}
		}

		// store detected source language in info anchor
//		elemsLI[index].SimpleHighlight.spanAddRemDel.aInfo.codeLanguage = data.codeSrcLanguage;
		elemsLI[index].SimpleHighlight.spanAddRemDel.aInfo.nameSrcLanguage = data.nameSrcLanguage;

		// store detected source language/flag in aAppendedTranslation->spanSource
		elemsLI[index].SimpleHighlight.aAppendedTranslation.spanSource.nameSrcLanguage = data.nameSrcLanguage;
		elemsLI[index].SimpleHighlight.aAppendedTranslation.spanSource.nameDestLanguage = data.nameDestLanguage;
		elemsLI[index].SimpleHighlight.aAppendedTranslation.spanSource.urlSrcLanguageIcon = data.urlSrcLanguageIcon;

		// update 
		
		// update our local translated snippet
		elemsLI[index].SimpleHighlight.aHighlight.translatedSnippet = data.note;
	
		// 're-show' translation to update display (check to prevent infinite loop, probably not needed though)
		if(elemsLI[index].SimpleHighlight.aHighlight.translatedSnippet != null && elemsLI[index].SimpleHighlight.aHighlight.translatedSnippet.length != 0)
			ShowTranslatedSnippet(true, index);
			
		// update counter in quick language bar
		document.getElementById(ID_SPAN_NUMTRANSLATEDCHARS).innerText = AddCommas(GetPreference(PREFERENCE_TRANSLATEDCHARS));
	}
}

function OnSetPopupSpeakSnippet(index, data, templateId){
	// find correspinding list item
	var li = GetElementFromIndex(index);
	var spanWaiting = li.SimpleHighlight.spanWaiting;

	function StopWaitingImage(span){
		span.style.display = "none";
		// cancel image timeout
		if(span.timerID != null){
			clearTimeout(span.timerID);
			span.timerID = null;
		}
	}

	
	
	// if we already have a valid object, just replay it
	var aSpeakSnippet = li.SimpleHighlight.spanAddRemDel.aSpeakSnippet;
	
	if(!data.url && !aSpeakSnippet.audio){
		StopWaitingImage(spanWaiting);
	}
	else{
//		aSpeakSnippet.disabled = true;		// makes no difference
//		aSpeakSnippet.style.opacity = OPACITY_DISABLED;

		// only build new audio element if existing one doesnt exist
		var audio, idSpeechBy;
		var spanSpeech = li.SimpleHighlight.spanSpeech;
		
		if(aSpeakSnippet.audio){
			audio = aSpeakSnippet.audio;
			
			if(audio.ended == true){	// ie: playing from stopped at end, so ref == 0
				// addref
				var elemSpeechBy = document.getElementById(audio.idSpeechBy);
				elemSpeechBy.activeSpeechCount = (elemSpeechBy.activeSpeechCount ? elemSpeechBy.activeSpeechCount : 0) + 1;
				elemSpeechBy.style.setProperty("display", "", "important");
		//		elemSpeechBy.style.setProperty("opacity", 1, "important");
			}

			audio.currentTime = 0;	// rewind	(and possibly replay)
			templateId = audio.templateId;			// get from cache
			
			// show flag (will already have correct src)
			spanSpeech.style.setProperty("display", "");
			
			audio.play();
		}
		else{
			audio = aSpeakSnippet.audio = document.createElement('audio');
			audio.controls = false;
			//audio.preload = "none";
			
//			data.url = "http://translate.google.com/translate_tts?tl="+"en"+"&q="+"Duck STEW";
//			data.url = "http://translate.google.com/translate_tts?tl="+"auto"+"&q="+"Una collaborazione esclusiva";
			
			audio.aSpeakSnippet = aSpeakSnippet;
			audio.spanSpeech = spanSpeech;
			audio.templateId = templateId;
			audio.idSpeechBy = (templateId == ID_TIPPOPUP_GOOGLETTS ? "speechByGoogle" : "speechByBing");;
			audio.urlFallback = data.urlFallback;
			audio.speakTranslated = li.SimpleHighlight.showTranslated;		// cache invalidated if speaking different lang
			
			// set flag image (not shown yet though)
			spanSpeech.imgFlag.src = data.srcSpokenLanguageIcon;
			spanSpeech.imgFlag.title = data.spokenLanguageName;

			
			// ended
			function OnEnded(e){
				// enable button
//				e.currentTarget.aSpeakSnippet.disabled = false;
//				e.currentTarget.aSpeakSnippet.style.opacity = OPACITY_ENABLED;
				
				// remove flag
				e.currentTarget.spanSpeech.style.setProperty("display", "none");

				
				/*
				if(BUG_68135_NOCACHE == true){
					e.currentTarget.parentElement.removeChild(e.currentTarget);
					e.currentTarget.aSpeakSnippet.audio = null;
				}
*/				
				// hide logo?
				var elemSpeechBy = document.getElementById(e.currentTarget.idSpeechBy);
				if(--elemSpeechBy.activeSpeechCount == 0){
//					elemSpeechBy.style.setProperty("opacity", 0, "important");
					elemSpeechBy.style.setProperty("display", "none", "important");
				}
			}
			audio.addEventListener("error", OnEnded, false);
			audio.addEventListener("ended", OnEnded, false);
/*			
			audio.addEventListener("ended", function(e){
				e.currentTarget.aSpeakSnippet.disabled = false;
				e.currentTarget.aSpeakSnippet.style.opacity = OPACITY_ENABLED;

				if(BUG_68135_NOCACHE == true){
					e.currentTarget.parentElement.removeChild(e.currentTarget);
					e.currentTarget.aSpeakSnippet.audio = null;
				}
			}, false);
	*/		
			aSpeakSnippet.appendChild(audio);	
			
			// load
			// if(templateId == ID_TIPPOPUP_GOOGLETTS || BUG_68135_NOCACHE == true){
				function OnGetBase64(obj){
					if(obj.status == 200 && obj.strBase64){
						// cbData is audio object

						obj.cbData.audio.src = "data:audio/" + (templateId == ID_TIPPOPUP_GOOGLETTS ? "mp3" : "wav") + ";base64," + obj.strBase64;

						 window.setTimeout(function(_a) {
						
							_a.play();
							// _a.currentTime = 0;	
						}, 100, obj.cbData.audio);

						// obj.cbData.audio.play();
						// obj.cbData.audio.currentTime = 0;
						
						// show flag (will already have correct src)
						obj.cbData.spanSpeech.style.setProperty("display", "");
						
						StopWaitingImage(obj.cbData.spanWaiting);		// success
					}
					else if(/*obj.status == 404 && */obj.cbData.audio.urlFallback){
						var urlFallback = obj.cbData.audio.urlFallback;
						obj.cbData.audio.urlFallback = null;			// empty from audio object to stop recursion
						
						// use new icons
						if(obj.cbData.srcSpokenLanguageIconFallback)
							obj.cbData.spanSpeech.imgFlag.src = obj.cbData.srcSpokenLanguageIconFallback;
						if(obj.cbData.spokenLanguageNameFallback)
							obj.cbData.spanSpeech.imgFlag.title = obj.cbData.spokenLanguageNameFallback;
						
						GetBase64StringFromBinaryURL(urlFallback, OnGetBase64, obj.cbData);
					}
					else
						StopWaitingImage(obj.cbData.spanWaiting);		// fail
				}
						
				// cache as a datauri string
				GetBase64StringFromBinaryURL(data.url, OnGetBase64, {
					audio: audio, 
					spanSpeech: spanSpeech,
					srcSpokenLanguageIconFallback: data.srcSpokenLanguageIconFallback,
					spokenLanguageNameFallback: data.spokenLanguageNameFallback,
					spanWaiting: spanWaiting,
				} );
			// }
			// else{
				// audio.src = data.url;		// load direct

				//show flag (will already have correct src)
				// spanSpeech.style.setProperty("display", "");
				
				// StopWaitingImage(spanWaiting);		// dont bother waiting for start event to hide (will probably never go direct now anyway)
			// }
				
			


			// addref
			var elemSpeechBy = document.getElementById(audio.idSpeechBy);
			elemSpeechBy.activeSpeechCount = (elemSpeechBy.activeSpeechCount ? elemSpeechBy.activeSpeechCount : 0) + 1;
			elemSpeechBy.style.setProperty("display", "", "important");
	//		elemSpeechBy.style.setProperty("opacity", 1, "important");
			
		}
/*		
		var elemSpeechBy = document.getElementById(audio.idSpeechBy);
		elemSpeechBy.activeSpeechCount = (elemSpeechBy.activeSpeechCount ? elemSpeechBy.activeSpeechCount : 0) + 1;
		elemSpeechBy.style.setProperty("display", "", "important");
//		elemSpeechBy.style.setProperty("opacity", 1, "important");
*/		
		// show flag (will already have correct src)
//		spanSpeech.style.setProperty("display", "");
	
		// BUG FIXED!
		// if(templateId == ID_TIPPOPUP_MSTRANSLATE_TTS)// && BUG_68135_NOCACHE != true)
			// audio.play();
	}
}

function SetItemError(index, errorText){
	var aInfo = document.getElementsByTagName("li")[index].SimpleHighlight.spanAddRemDel.aInfo;
	
	aInfo.errorText = errorText;
	
	// null errorText means clear error status
	var imgInfos = aInfo.getElementsByClassName(CLASS_INFORMATION_IMG);
	if(imgInfos.length == 1)
		imgInfos[0].src = "img/" + (errorText == null ? "information-white" : "exclamation-red") + ".png";
}

function OnListitemMouseOut(event){
	var spanAddRemDel = event.currentTarget.SimpleHighlight.spanAddRemDel
	
	spanAddRemDel.style.display = "none";
	//event.currentTarget.style.removeProperty("border-bottom");
	//event.currentTarget.style.removeProperty("background-image");

	// mouseout colour depends on whether it has a note (note takes precedence)
	if(event.currentTarget.SimpleHighlight.arrayInfo.note)
		event.currentTarget.style.setProperty("color", COLOUR_MOUSEOUT_NOTE);
	else{
		if(event.currentTarget.SimpleHighlight.showTranslated == true){
			// translated snippet stored in highlight anchor
			if(event.currentTarget.SimpleHighlight.aHighlight.translatedSnippet)
				event.currentTarget.style.setProperty("color", COLOUR_MOUSEOUT_SHOWINGTRANSLATED); // only colour if SHOWING the translation also
			else
				event.currentTarget.style.removeProperty("color");
		}
		else
			event.currentTarget.style.removeProperty("color");
		
	}

	_currentTargetListItemMouseOver = null;
}

function OnExportedFrame(key){
	// only export when all frames accounted for
	_reportedFrameCount++;
//	console.log(_reportedFrameCount);
	
	if(_reportedFrameCount == _registeredFrameCount){
//		console.log("export");
	
		chrome.extension.sendRequest({ msg: "loadHighlights", url: key, store: "session"}, function(result){
			// export to file
			chrome.extension.sendRequest({ 
				msg: "exportHighlightFromStringifiedHL", 
				url: document.SimpleHighlight.tab.url.RemoveHash(),
				stringifiedHL: JSON.stringify(result),
				asXml: _exportAsXml,
			});			
			
			// remove temp key from session store
			chrome.extension.sendRequest({ msg: "saveHighlights", url: key, store: "session", arrayHighlights: null});
		});
	}
}

function OnDetailHighlightsFrame(hrefHashRemoved, title, arrHighlights){
	// only export when all frames accounted for
	_reportedFrameCount++;
	
	// add to locally stored array
	_arrDetailHighlights.push({
		hrefHashRemoved: hrefHashRemoved,
		title: title,
		arrHL: arrHighlights
	});
		
	if(_reportedFrameCount == _registeredFrameCount){
		// dont show href for same url
		var urlHashRemoved = document.SimpleHighlight.tab.url.RemoveHash();
		var dateNow = new Date();

		var arrayPrefs = GetPreference([PREFERENCE_HIGHLIGHTSTYLE, 
			PREFERENCE_HIGHLIGHTSTYLE_TILE_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_TILE_BOX_SHADOW,
				PREFERENCE_HIGHLIGHTSTYLE_TILE_PADDING, PREFERENCE_HIGHLIGHTSTYLE_TILE_ALPHA_SHADOW,
			PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BORDER_RADIUS, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_BOX_SHADOW, PREFERENCE_HIGHLIGHTSTYLE_SMEAR_PADDING,
				PREFERENCE_HIGHLIGHTSTYLE_SMEAR_ALPHA_SHADOW,
			PREFERENCE_HL1, PREFERENCE_HL2, PREFERENCE_HL3, PREFERENCE_HL4, PREFERENCE_HL5, PREFERENCE_HL6, PREFERENCE_HL7]);
		
		var htmlDoc = document.createElement("html");
			var head = document.createElement("head");
				// var script = document.createElement("script");
					// script.type = "text/javascript";
					// script.innerText = "function save() {\
										// var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.BlobBuilder; \
										// var bb = new BlobBuilder(); \
										// bb.append(document.documentElement.outerHTML);\
										// var blob = bb.getBlob();\
										// var objectURL = (window.webkitURL || window.URL).createObjectURL(blob);\
										// alert(objectURL);\
										// window.location.href = objectURL; }";
				// head.appendChild(script);
			
				var title = document.createElement("title");
					title.innerText = SUMMARY_FORMAT_HEAD_TITLE.replace("<<TITLE>>", 
						document.SimpleHighlight.tab.title.length > 0 ? document.SimpleHighlight.tab.title : SUMMARY_UNTITLED);
				head.appendChild(title);
			
				var meta = document.createElement("meta");
					meta.httpEquiv = "content-type"; meta.content = "text/html; charset=UTF-8";
				head.appendChild(meta);
				meta = document.createElement("meta");
					meta.httpEquiv = "date"; meta.content = dateNow.toLocaleString();
				head.appendChild(meta);
				var meta = document.createElement("meta");
					meta.httpEquiv = "last-modified"; meta.content = dateNow.toLocaleString();
				head.appendChild(meta);
				
				meta = document.createElement("meta");
					meta.name = "author"; meta.content = "Simple Highlighter";
				head.appendChild(meta);
				meta = document.createElement("meta");
					meta.name = "description"; meta.content = title.innerText;
				head.appendChild(meta);
				meta = document.createElement("meta");
					meta.name = "generator"; meta.content = "Simple Highlighter";
				head.appendChild(meta);
							
				// add styles for each highlight to pages stylesheet
				_arrPrefToClassName.forEach(function (h) {
					var styleElement = document.createElement('style');

					styleElement.textContent = "." + h.className + " {\
						text-decoration: none; " +
						GetStyleElementText(arrayPrefs, arrayPrefs[h.prefHL], "popup") + 
						" }";

					head.appendChild(styleElement);
				});
				
				// other styles
//							.list li{margin-top: 0.4em; }\				
				var styleElement = document.createElement('style');
					styleElement.textContent = "\
						body {font-family: FrancoMedium, Garamond, Baskerville, Georgia, serif !important; }\
						.header{font-size: 64px; letter-spacing: -0.04em; font-weight: normal; font-style: italic; color: black; text-align: center;}\
							.logo {margin-right: 7px; }\
							.pageanchor{ text-decoration: none; }\
						.list{list-style-type: decimal; }\
							.list li{padding: 0.2em; }\
								.alternate{background: #efe;}\
								.textcomplete {font-size: small!important; padding: 0.2em!important; }\
								.date{font-size: small; color: lightgray; font-style: italic; margin-left: 1em; padding-top: 0.2em; float: right;}\
								.subframe{font-size: 16pt; font-weight: normal; font-style: italic; color: black; margin-left: -0.5em; margin-top: 2em; }\
									.subframeanchor{ text-decoration: none; }\
								.note{font-size: small; color: gray; margin-left: 1em; margin-top: 0.4em; border-left: 5px solid #EBB432; padding-left: 0.5em; }\
						.footer{text-align: right; font-size: small; color: black; margin-top: 5em; }";
				head.appendChild(styleElement);
				
				// javascript
/*				var script = document.createElement('script');
					script.type = "text/javascript";
					script.text = 'function OnMouseOver(){event.currentTarget.style.setProperty("background", "red", null);} function OnMouseOut(){event.currentTarget.style.removeProperty("background");}'
				head.appendChild(script);
*/				
				// misc
				var commentElement = document.createComment("Modern Life Is Rubbish");
				head.appendChild(commentElement);
			htmlDoc.appendChild(head);
			
			var body = document.createElement("body");
				// save
				// var saveAnchor = document.createElement("a");
				// saveAnchor.href = "javascript:save()";
				// saveAnchor.innerText = "Save";
				// body.appendChild(saveAnchor);
			
				// h1 - main title
				var h1 = document.createElement("h1");
				h1.className = "header";
					var aLogo = document.createElement("a");
					aLogo.className = "logo";
						aLogo.href = "https://chrome.google.com/extensions/detail/hljnlfolmbmibdjaikiaepgepgnldclj";
						var img48 = document.createElement("img");
							img48.src = "data:image/png;base64," + SUMMARY_BASE64_IMG_LOGO_48;
						aLogo.appendChild(img48);
				
					var aPage = document.createElement("a");
					aPage.className = "pageanchor";
					aPage.href = urlHashRemoved;
					aPage.innerText = document.SimpleHighlight.tab.title.length > 0 ? document.SimpleHighlight.tab.title : SUMMARY_UNTITLED;
						
					var format = SUMMARY_FORMAT_BODY_TITLE.replace("<<LOGO>>", aLogo.outerHTML);
					h1.innerHTML = format.replace("<<TITLE>>", aPage.outerHTML);
				body.appendChild(h1);
							
				if(_arrDetailHighlights.length > 0){
					// list of highlights
					var ul = document.createElement("ol");
					ul.className = "list";
					
					for(var q=0; q<_arrDetailHighlights.length; q++){
						if(_arrDetailHighlights[q].arrHL.length == 0)
							continue;
							
						// h2 - optional frame href
						if(_arrDetailHighlights[q].hrefHashRemoved != urlHashRemoved){
							var h2 = document.createElement("h2");
							h2.className = "subframe";
								var aSubFrame = document.createElement("a");
									aSubFrame.className = "subframeanchor";
									aSubFrame.href = _arrDetailHighlights[q].hrefHashRemoved;
									aSubFrame.innerText = _arrDetailHighlights[q].title ? _arrDetailHighlights[q].title : SUMMARY_SUBFRAME_UNTITLED;
							
							h2.innerHTML = 	SUMMARY_FORMAT_SUBFRAME_INNERHTML.replace("<<ANCHOR>>", aSubFrame.outerHTML);
							ul.appendChild(h2);
						}
					
						// sublist: href (if different from url), date, textComplete, (prefHL is class)
						
						for(var r=0; r<_arrDetailHighlights[q].arrHL.length; r++){
							var li = document.createElement("li");
//								li.setAttribute("onmouseover", "OnMouseOver()");
//								li.setAttribute("onmouseout", "OnMouseOut()");
								if(r % 2 == 1)
									li.className = "alternate";

								// divDate
								var divDate = document.createElement("span");
									var date = new Date(_arrDetailHighlights[q].arrHL[r].date);
									divDate.innerText = (_relativeDateDetailHighlights == true ? TimeAgo(date) : date.toLocaleString());
									divDate.className = "date";
								li.appendChild(divDate);
									
								// divTextComplete
								var divTextComplete = document.createElement("span");
									divTextComplete.className = _PrefHLToClassName(_arrDetailHighlights[q].arrHL[r].prefHL) + " textcomplete";
									divTextComplete.innerText = _arrDetailHighlights[q].arrHL[r].textComplete;
								li.appendChild(divTextComplete);
								
								// divNote (optional)
								if(_arrDetailHighlights[q].arrHL[r].note){
									var divNote = document.createElement("div");
										divNote.className = "note";
										divNote.innerText = _arrDetailHighlights[q].arrHL[r].note;
									li.appendChild(divNote);
								}

							ul.appendChild(li);
						}
					}
					
					body.appendChild(ul);
				}
				
				// footer
				var divFooter = document.createElement("div");
				divFooter.className = "footer";
				divFooter.innerHTML = SUMMARY_INNERHTML_FOOTER.replace("<<DATE>>", dateNow.toLocaleString());
				body.appendChild(divFooter);
				
			htmlDoc.appendChild(body);
		
//		uriContent = "data:application/octet-stream," + encodeURIComponent( strStream );

		var doc = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">' + htmlDoc.outerHTML;

		if(_saveDetailHighlights == false){
			var uriContent = "data:text/html;charset=utf-8," + doc;

			//window.open(uriContent, '_blank');
			chrome.tabs.create({url: uriContent});
		}
		else{
			var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder || window.BlobBuilder;
			var bb = new BlobBuilder();
			
			bb.append(doc);
			
			var blob = bb.getBlob(); // <-- Here's the Blob!
			
			var windowURL = (window.webkitURL || window.URL);
			var objectURL = windowURL.createObjectURL(blob);
			
			chrome.tabs.create({url: objectURL});
			// window.open(objectURL, '_blank')
			
//			windowURL.revokeObjectURL(objectURL);		
		}
/*
		// create an xml document with all the crap removed
		//<root url="">
		// <frame href="">		no href means url
		//  <highlight prefHL="" date="">
		//   <note>sdfsfsd</note>
		//   textcontext
		// </frame>
		//  </highlight>
		var xmlDoc = document.createDocument("ns", "simplehighlighter", null);
		
		var n = xmlDoc.createElement ("magic");
		fruitNode.setAttribute ("name" , "avocado");
		xmlDoc.documentElement.appendChild (fruitNode);		
	
		console.log(_arrDetailHighlights);
*/	
	}
}

function OnSnippetSent(arrayInfo, msgs, tab, states) {
	if (arrayInfo.length == 0)
		return;

	_totalNumHighlights += arrayInfo.length;
	
	UpdateHeader();

	var ol = document.getElementById(ID_OL_HIGHLIGHTS);
	if (ol == null) {
		ol = document.createElement('ol');
		ol.id = ID_OL_HIGHLIGHTS;
		
		document.getElementById(ID_DIV_HIGHLIGHTS).appendChild(ol);
	}

	// add seperator if listitems have already been added
	var elements = document.getElementsByClassName("li");
	if (elements.length > 0) {
		var seperator = document.createElement('hr');
		seperator.width = WIDTH_HR_SNIPPETGROUPSEPERATOR;

		ol.appendChild(seperator);
	}

	// not most efficient way of remembering last state of toggle buttons (assumes this will only be called once).
	// but it should work most of the time
	if(states){
		if(ENABLE_ALLTRANS == true){
			if(states.showAllTrans != null)
				SetSelectedButtonState(ID_ANCHOR_ALLTRANS, states.showAllTrans);
		}
		if(states.showAllNotes != null)
			SetSelectedButtonState(ID_ANCHOR_ALLNOTES, states.showAllNotes);
	}
	// point buttons to the tab they should save their statuses to (in their DOMs)
	if(ENABLE_ALLTRANS == true){
		var a = document.getElementById(ID_ANCHOR_ALLTRANS);
		if(a){
			a.lastValidTabId = tab.id;
			a.msgSetShowStatus = msgs.msgSetShowStatus;
		}
	}
	var a = document.getElementById(ID_ANCHOR_ALLNOTES);
	if(a){
		a.lastValidTabId = tab.id;
		a.msgSetShowStatus = msgs.msgSetShowStatus;
	}

		
	// cache frequently accessed prefs
	var arrPrefs = GetPreference([PREFERENCE_SHOWTRANSLATEDSNIPPETS, PREFERENCE_SHOWNOTES]);
	var numNotes = 0;

	for (var i = 0; i < arrayInfo.length; i++) {
		var listItem = document.createElement("li");
//		listItem.className = CLASS_HIGHLIGHT;

		// additional info used for saving
		listItem.SimpleHighlight = {
			arrayInfo: arrayInfo[i],

			indexRelativeToMessage: i,
			msgSetTranslatedSnippet: msgs.msgSetTranslatedSnippet,
		};

		// show/hide iconspan events
		listItem.addEventListener("mouseover", function(e){
			// display all icons in the span
			e.currentTarget.SimpleHighlight.spanAddRemDel.style.display = "";
			// listitem colour when mousemove
			e.currentTarget.style.setProperty("color", COLOUR_MOUSEOVER);
			
			_currentTargetListItemMouseOver = e.currentTarget;
		});
	
		listItem.addEventListener("mouseout", OnListitemMouseOut);

		
		
		// create right floating add/rem note/del highlight span
		var spanAddRemDel = listItem.SimpleHighlight.spanAddRemDel = document.createElement("span");
		spanAddRemDel.className = CLASS_SPAN_ADDREMDEL;
		spanAddRemDel.style.display = "none";
			/////////////////////////////////
			// show/hide note button
			if(arrayInfo[i].note && arrayInfo[i].note.length > 0){
				var aShowNote = spanAddRemDel.aShowNote = document.createElement("a");
				
				aShowNote.href = "#";
				aShowNote.className = CLASS_SHOWNOTE;
				aShowNote.innerHTML = '<img class="' + CLASS_SHOWNOTE_IMG + '" src="img/note.png"/>';
				//aShowNote.index = i;       // index into source nodes info matchs our index
				aShowNote.tabId = tab.id;
				aShowNote.msgSetShowStatus = msgs.msgSetShowStatus;
				aShowNote.addEventListener("click", OnClickToggleShowNote, true);
				spanAddRemDel.appendChild(aShowNote);

				numNotes++;
			}

			// show/hide translation button
			var aShowTransHL = spanAddRemDel.aShowTransHL = document.createElement("a");
			aShowTransHL.href = "#";
			aShowTransHL.className = CLASS_SHOWTRANSHL;
			aShowTransHL.style.marginLeft = "1px";		// margin for 'selected' border
			aShowTransHL.innerHTML = '<img class="' + CLASS_SHOWTRANSHL_IMG + '" src="img/translate.png" />';
			//aShowTransHL.index = i;       // index into source nodes info matchs our index
			aShowTransHL.tabId = tab.id;
			aShowTransHL.msgSetShowStatus = msgs.msgSetShowStatus;
			aShowTransHL.addEventListener("click", OnClickToggleTranslateSnippet, true);
			spanAddRemDel.appendChild(aShowTransHL);

			/////////////////////
			// tip
			var aShowTip = spanAddRemDel.aShowTip = document.createElement("a");
			aShowTip.className = CLASS_SHOWTIP;
			aShowTip.href = "#";
			aShowTip.innerHTML = '<img src="img/balloon-ellipsis.png"/>';
			aShowTip.style.marginLeft = MARGINLEFT_BUTTONGROUP_ADDREMDEL + "px";
			aShowTip.title = TOOLTIP_SHOWTIP;
			aShowTip.msgShowTipPopup = msgs.msgShowTipPopup;
			aShowTip.msgScrollIntoView = msgs.msgScrollIntoView;
			aShowTip.tabId = tab.id;
			aShowTip.addEventListener("click", OnClickShowTip, true);
			spanAddRemDel.appendChild(aShowTip);

			// lookup
			var aLookup = spanAddRemDel.aLookup = document.createElement("a");
			aLookup.className = CLASS_LOOKUP;
			aLookup.href = "#";
			aLookup.innerHTML = '<img src="img/book-open-text.png"/>';
			aLookup.title = TOOLTIP_LOOKUP;
			aLookup.msgLookupHighlight = msgs.msgLookupHighlight;
			//aLookup.index = i;       // index into source nodes info matchs our index
			aLookup.tabId = tab.id;
			aLookup.addEventListener("click", OnClickLookupHighlight, true);
			spanAddRemDel.appendChild(aLookup);

			////////////////
			// speak
			var aSpeakSnippet = spanAddRemDel.aSpeakSnippet = document.createElement("a");
			aSpeakSnippet.className = CLASS_SPEAKSNIPPET;
				var imgSpeakSnippet = aSpeakSnippet.imgSpeakSnippet = document.createElement('img');
				imgSpeakSnippet.src = "img/speaker-volume-low2.png";
				aSpeakSnippet.appendChild(imgSpeakSnippet);
			aSpeakSnippet.title = TOOLTIP_SPEAKSNIPPET;
			aSpeakSnippet.href = "#";
			aSpeakSnippet.style.marginLeft = (MARGINLEFT_BUTTONGROUP_ADDREMDEL + 3) + "px";
	//      aSpeakSnippet.msgShowTipPopup = msgs.msgShowTipPopup;
	//      aSpeakSnippet.msgScrollIntoView = msgs.msgScrollIntoView;
			aSpeakSnippet.tabId = tab.id;
			aSpeakSnippet.addEventListener("click", OnClickSpeakSnippet, true);
			spanAddRemDel.appendChild(aSpeakSnippet);
					
			// select hightlight
			var aSelectHL = spanAddRemDel.aSelectHl = document.createElement("a");
			aSelectHL.className = CLASS_SELECTHL;
			aSelectHL.href = "#";
			aSelectHL.innerHTML = '<img src="img/selection-select-input.png"/>';
			aSelectHL.title = TOOLTIP_SELECTHIGHLIGHT;
			aSelectHL.msgSelectHighlight = msgs.msgSelectHighlight;
			aSelectHL.tabId = tab.id;
			aSelectHL.addEventListener("click", OnClickSelectHighlight, true);
			spanAddRemDel.appendChild(aSelectHL);

			// add/del note (action)(choose one)
			var hasNote = (arrayInfo[i].note && arrayInfo[i].note.length > 0) ? true : false;
			var aAction = spanAddRemDel.aAction = document.createElement("a");
			aAction.className = (hasNote == true ? CLASS_REMOVENOTE : CLASS_ADDNOTE);
			aAction.href = "#";
			aAction.innerHTML = '<img src="img/' + (hasNote == true ? 'remove' : 'add') + 'Note.png"/>';
			aAction.title = (hasNote == true ? TOOLTIP_REMOVENOTE : TOOLTIP_ADDNOTE);
			aAction.addEventListener("click", hasNote == true ? OnClickRemoveNote : OnClickAddNote, true)
			//aAction.index = i;       // index into source nodes info matchs our index
			aAction.tabId = tab.id;
			aAction.msgSetNote = msgs.msgSetNote;
			spanAddRemDel.appendChild(aAction);
		
			//////////////////////////////////////
			// add information image
			var aInfo = spanAddRemDel.aInfo = document.createElement("a");
			aInfo.className = CLASS_INFORMATION;
			aInfo.href = "#";
			aInfo.innerHTML = '<img class="' + CLASS_INFORMATION_IMG + '" style="margin-left: 2px"/>';
			aInfo.style.marginLeft = MARGINLEFT_BUTTONGROUP_ADDREMDEL + "px";
			aInfo.date = new Date(arrayInfo[i].date);
			//aInfo.index = i;
	//		aInfo.codeLanguage = arrayInfo[i].codeLanguage;
			aInfo.nameSrcLanguage = arrayInfo[i].nameSrcLanguage;
							
			aInfo.addEventListener("mouseover", function(event){
				// dynamic tooltip
				var elemLI = GetElementFromIndex( GetListItemIndexFromParents(event.currentTarget) );
				if(elemLI == null)
					return;
				
				// if snippet translated, show destination language here
				var title = "";
				
				if(event.currentTarget.errorText){
					var format = ERROR_TRANSLATION;
					title += format.replace("<<ERROR>>", event.currentTarget.errorText) + "\n\n";
				}
				
				if(elemLI.SimpleHighlight.showTranslated == true){
					var srcLanguage;
					
					var destLanguage = Bing.GetLanguageInfo(GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING)).name;
					if(event.currentTarget.nameSrcLanguage)
						srcLanguage = event.currentTarget.nameSrcLanguage;          //NOT NEEDED GoogleAPI.GetSupportedLanguageName(event.currentTarget.codeLanguage);

					var format = event.currentTarget.nameSrcLanguage ? TOOLTIP_INFORMATION_TRANSHL_SRCDESTLANG : TOOLTIP_INFORMATION_TRANSHL_DESTLANG;
					format = format.replace("<<DESTLANGUAGE>>", destLanguage != null ? destLanguage : "?");
					format = format.replace("<<SRCLANGUAGE>>", srcLanguage != null ? srcLanguage : "?");
		
					title += format + "\n\n";
				}

				// update relative time
				title += "Highlight created " + (event.altKey == true ? event.currentTarget.date.toLocaleString() : TimeAgo(event.currentTarget.date)) + "\n\n" + TOOLTIP_HIGHLIGHT;
								
				event.currentTarget.title = title;
			});
			
			aInfo.addEventListener("click", function(e){
				e.returnValue = false;
				// fake a click to the aHighlight of the indexed li
				var elemLI = GetElementFromIndex( GetListItemIndexFromParents(e.currentTarget) );
				elemLI.SimpleHighlight.aHighlight.dispatchEvent(e);
			}, true);			   
			
			spanAddRemDel.appendChild(aInfo);
			
			/////////////////////////////////////////////////	
			// 'remove highlight" item (X) (mandatory)
			var aRemoveHL = spanAddRemDel.aRemoveHL = document.createElement("a");
			aRemoveHL.className = CLASS_REMOVEHL;
			aRemoveHL.href = "#";
//			aRemoveHL.style.marginLeft = MARGINLEFT_BUTTONGROUP_ADDREMDEL;
			aRemoveHL.innerHTML = '<img src="img/removeHighlight.png"/>';
			aRemoveHL.title = TOOLTIP_REMOVEHIGHLIGHT;

			aRemoveHL.msgRemoveHighlight = msgs.msgRemoveHighlight;
			//aRemoveHL.index = i;       // index into source nodes info matchs our index
			aRemoveHL.tabId = tab.id;
			aRemoveHL.addEventListener("click", OnClickRemoveHighlight, true);

			spanAddRemDel.appendChild(aRemoveHL);

		// add span to li
		listItem.appendChild(spanAddRemDel);

		// add the waiting image
		var spanWaiting = listItem.SimpleHighlight.spanWaiting = document.createElement("span");
		spanWaiting.className = CLASS_WAITING;
		spanWaiting.style.display = "none";
//		spanWaiting.style.float = "right";
			var imgWaiting = spanWaiting.imgWaiting = document.createElement("img");
			imgWaiting.src = "img/ajax-loader2.gif";
			imgWaiting.title = TOOLTIP_WAITING;
			imgWaiting.style.marginTop = "2px";
			spanWaiting.appendChild(imgWaiting);
		listItem.appendChild(spanWaiting);
/*		
		var imgWaiting = listItem.SimpleHighlight.imgWaiting = document.createElement("img");
		imgWaiting.className = CLASS_WAITING;
		imgWaiting.src = "img/ajax-loader2.gif";
		imgWaiting.title = TOOLTIP_WAITING;
		imgWaiting.style.float = "right";
		imgWaiting.style.marginTop = "2px";
		imgWaiting.style.display = "none";
		listItem.appendChild(imgWaiting);
	*/	
		// add the highlight (in an anchor)
		var aHighlight = listItem.SimpleHighlight.aHighlight = document.createElement("a");
		aHighlight.className = _PrefHLToClassName(arrayInfo[i].prefHL) + " " + CLASS_HL;
		aHighlight.href = "#";

		aHighlight.snippet = aHighlight.innerText = arrayInfo[i].snippet;
		aHighlight.translatedSnippet = arrayInfo[i].translatedSnippet;

		//aHighlight.index = i;       // index into source nodes info matchs our index
		aHighlight.tabId = tab.id;
		//aHighlight.date = new Date(arrayInfo[i].date);
		aHighlight.msgScrollIntoView = msgs.msgScrollIntoView;
		aHighlight.msgSelectHighlight = msgs.msgSelectHighlight;
		aHighlight.addEventListener("click", OnClickHighlight, true);
		
		aHighlight.addEventListener("mouseover", function(event){
			// update tooltip dynamically
			var elemLI = GetElementFromIndex( GetListItemIndexFromParents(event.currentTarget) );
			if(elemLI == null) return;
			
			// if it has a note that's not visible, show it here (on aHighlight)
			var title = "";
			if(elemLI.SimpleHighlight.showNote == false && elemLI.SimpleHighlight.arrayInfo.note && elemLI.SimpleHighlight.arrayInfo.note.length > 0)
				title += elemLI.SimpleHighlight.arrayInfo.note;
			event.currentTarget.title = title;
		});

		listItem.appendChild(aHighlight);
		
		// add the translated highlight span (only seen when styleTranslate is 'append') - NOW both cases not just append
		var aAppendedTranslation = listItem.SimpleHighlight.aAppendedTranslation = document.createElement("a");
		aAppendedTranslation.className = CLASS_APPENDEDTRANSLATION;
		aAppendedTranslation.style.setProperty("display", "none");
		aAppendedTranslation.href = "#";
			// span (flag and >)
			var spanSource = aAppendedTranslation.spanSource = document.createElement("span");
			spanSource.className = CLASS_SPANSOURCE;
			spanSource.nameSrcLanguage = arrayInfo[i].nameSrcLanguage;				// from cache
			spanSource.nameDestLanguage = arrayInfo[i].nameDestLanguage;
			spanSource.urlSrcLanguageIcon = arrayInfo[i].urlSrcLanguageIcon;
				// flag
				var imgFlag = spanSource.imgFlag = document.createElement("img");
				imgFlag.className = CLASS_SPANSOURCE_FLAG;
				spanSource.appendChild(imgFlag);
				// >
				var imgDirection = spanSource.imgDirection = document.createElement("img");
				imgDirection.className = CLASS_SPANSOURCE_DIRECTION;
				imgDirection.src = "img/arrow-000-small-cropped.png";
				spanSource.appendChild(imgDirection);
			aAppendedTranslation.appendChild(spanSource);
			// text
			var spanText = aAppendedTranslation.spanText = document.createElement("span");
			aAppendedTranslation.appendChild(spanText);
				
		aAppendedTranslation.addEventListener("click", function(e){
			e.returnValue = false;
			// fake a click to the aHighlight of the indexed li
			var elemLI = GetElementFromIndex( GetListItemIndexFromParents(e.currentTarget) );
			elemLI.SimpleHighlight.aHighlight.dispatchEvent(e);
		}, true);			   

		listItem.appendChild(aAppendedTranslation);
		
		// add the speech flag img
		var spanSpeech = listItem.SimpleHighlight.spanSpeech = document.createElement("span");
		spanSpeech.className = CLASS_SPEECH;
		spanSpeech.style.setProperty("display", "none");
			var imgActive = document.createElement("img");
			imgActive.className = CLASS_SPEECH_ACTIVE;
			imgActive.src = "img/speaker-volume.png";
			spanSpeech.appendChild(imgActive);

			spanSpeech.imgFlag = document.createElement("img");
			spanSpeech.imgFlag.className = CLASS_SPEECH_FLAG;
			spanSpeech.appendChild(spanSpeech.imgFlag);
		listItem.appendChild(spanSpeech);
			
		// add optional note
		if (arrayInfo[i].note && arrayInfo[i].note.length > 0) {
			var divNote = listItem.SimpleHighlight.divNote = document.createElement("div");

			divNote.innerText = arrayInfo[i].note;
			divNote.className = CLASS_NOTE;
			divNote.title = TOOLTIP_NOTE;

			//divNote.index = i;       // index into source nodes info matchs our index
			divNote.tabId = tab.id;
			divNote.msgSetNote = msgs.msgSetNote;
			divNote.addEventListener("click", OnClickNote);

			listItem.appendChild(document.createElement("br"));
			listItem.appendChild(divNote);
		}

		ol.appendChild(listItem);

		// set default information image (must be done after item is added)
		SetItemError(GetListItemIndexFromParents(listItem), null);
		
		// set some default items via ShowTranslatedSnippet (null means use default)
		ShowTranslatedSnippet(arrayInfo[i].showTranslatedSnippet == null ? 
			(arrPrefs[PREFERENCE_SHOWTRANSLATEDSNIPPETS] == PREFBOOL_TRUE ? true : false) : arrayInfo[i].showTranslatedSnippet, GetListItemIndexFromParents(listItem));
		ShowNote(arrayInfo[i].showNote == null ? 
			(arrPrefs[PREFERENCE_SHOWNOTES] == PREFBOOL_TRUE ? true : false) : arrayInfo[i].showNote, GetListItemIndexFromParents(listItem));
			
		// set default colours via a fake call to mouseout
		OnListitemMouseOut({currentTarget: listItem});
	}// end for

	// only show 'toggleAllNotes' button if notes exist
	if(numNotes > 0)
		document.getElementById(ID_ANCHOR_ALLNOTES).style.removeProperty("display");
	
	// try to scroll at the end of every snippet (chunk) sent. not ideal, but never know which is the last snippet
	if(_pageYOffsetTryAfterSnippetSent != null)
		window.scrollTo(0, _pageYOffsetTryAfterSnippetSent);
	
/*            // if a horizontal scrollbar appears, compensate for it by including a margin
	if(window.innerWidth != document.width)
		document.body.style.setProperty("margin-right", _marginLeft + "px");
	else
		document.body.style.removeProperty("margin-right");*/
}

function OnClickToggleShowNote(e){
	e.returnValue = false;
	
	// get the listitem from its index (to get the current state so it can be toggled)
	var elemLI = GetElementFromIndex( GetListItemIndexFromParents(e.currentTarget) );
	if(elemLI == null)
		return;
		
	ShowNote(elemLI.SimpleHighlight.showNote == true ? false : true, GetListItemIndexFromParents(e.currentTarget) );
}

function OnClickToggleTranslateSnippet(e) {
	e.returnValue = false;

	// can also serve as a shortcut to the quicklanguage bar
	if(e.ctrlKey == true)
		OnClickQuickLanguageButton();
	else{
		// get the listitem from its index (to get the current state so it can be toggled)
		var index = GetListItemIndexFromParents(e.currentTarget);
		var elemLI = GetElementFromIndex( index );
		if(elemLI == null)
			return;
			
		// choose style
		if(elemLI.SimpleHighlight.showTranslated != true){				// ie: existing translation hidden
			var styleTranslation = GetPreference(PREFERENCE_POPUP_TRANSLATIONSTYLE);
			// toggle
			if(e.altKey == true)
				styleTranslation = (styleTranslation == TRANSLATIONSTYLE_REPLACE ? TRANSLATIONSTYLE_APPEND : TRANSLATIONSTYLE_REPLACE);
				
			elemLI.SimpleHighlight.styleTranslation = styleTranslation;
		}
			
		ShowTranslatedSnippet(elemLI.SimpleHighlight.showTranslated == true ? false : true,  index );
	}
}


function OnClickSelectHighlight(e) {
	e.returnValue = false;

	chrome.tabs.sendRequest(e.currentTarget.tabId, 
		{ msg: e.currentTarget.msgSelectHighlight,
		index: GetListItemFromParents(e.currentTarget).SimpleHighlight.indexRelativeToMessage }, function () {
		//
		if (e.ctrlKey == false && GetPreference(PREFERENCE_POPUP_PIN) != PREFBOOL_TRUE)
			window.close();
	});
}

function OnClickShowTip(e) {
	e.returnValue = false;

	// scroll into view too (ignore reply)
	chrome.tabs.sendRequest(e.currentTarget.tabId, 
		{ msg: e.currentTarget.msgScrollIntoView,
		index: GetListItemFromParents(e.currentTarget).SimpleHighlight.indexRelativeToMessage, 
		alignToTop: e.altKey == true ? false : true });
	
	// show
	chrome.tabs.sendRequest(e.currentTarget.tabId, 
		{ msg: e.currentTarget.msgShowTipPopup,
		index: GetListItemFromParents(e.currentTarget).SimpleHighlight.indexRelativeToMessage }, function () {
		//
		if (e.ctrlKey == false && GetPreference(PREFERENCE_POPUP_PIN) != PREFBOOL_TRUE)
			window.close();
	});
}

function OnClickSpeakSnippet(e){
	e.returnValue = false;

	// manually check disabled, for some reason
	if(e.currentTarget.disabled == true)
		return;

	var index = GetListItemIndexFromParents(e.currentTarget);
	var elemLI = GetElementFromIndex(index);
	// aHighlight contains the snippet
	if(elemLI == null || elemLI.SimpleHighlight.aHighlight == null)
		return;
		
	// if we already have the audio element cached (and from correct source), just call direct
	var audio = elemLI.SimpleHighlight.spanAddRemDel.aSpeakSnippet.audio;
	var idTTSTemplateID = GetPreference(PREFERENCE_POPUP_SPEECHSERVICE);

	if(e.shiftKey == true)
		idTTSTemplateID = ID_TIPPOPUP_DUMMY_NATIVETTS;
	else if(e.altKey == true)
		idTTSTemplateID = (idTTSTemplateID == ID_TIPPOPUP_MSTRANSLATE_TTS ? ID_TIPPOPUP_GOOGLETTS : ID_TIPPOPUP_MSTRANSLATE_TTS);		// alternate
	
	if(audio){
		if(audio.templateId == idTTSTemplateID && audio.speakTranslated == elemLI.SimpleHighlight.showTranslated){
			OnSetPopupSpeakSnippet(index, {});		// no need for data, reuse object
			return;
		}
		
		// clear cache
		audio.currentTime = 99999;			// trigger end event
		audio.parentElement.removeChild(audio);
		elemLI.SimpleHighlight.spanAddRemDel.aSpeakSnippet.audio = null;
	}
	// stop native speech (just in case)
	chrome.extension.sendRequest({ 
		msg: "nativeSpeak",
		stop: true,
	});
//	chrome.tts.stop();

	var showTranslated = elemLI.SimpleHighlight.showTranslated;
	
	if(idTTSTemplateID == ID_TIPPOPUP_DUMMY_NATIVETTS){
		// use builtin tts with specified language
		chrome.extension.sendRequest({ 
			msg: "nativeSpeak",
			utterance: (showTranslated == true ? elemLI.SimpleHighlight.aHighlight.translatedSnippet : elemLI.SimpleHighlight.aHighlight.snippet),
			options: {
				lang: (GetPreference(showTranslated == true ? PREFERENCE_TRANSSNIPPET_DESTLANG_BING : PREFERENCE_TRANSSNIPPET_SRCLANG_BING)),
			},
		});
/*		
		chrome.tts.speak(
			(showTranslated == true ? elemLI.SimpleHighlight.aHighlight.translatedSnippet : elemLI.SimpleHighlight.aHighlight.snippet),
			{ 
				lang: (GetPreference(showTranslated == true ? PREFERENCE_TRANSSNIPPET_DESTLANG_BING : PREFERENCE_TRANSSNIPPET_SRCLANG_BING)),
				onEvent: function(event){
					// can stop speech via context menu
					if(event.type == 'start' || event.type == 'end' || event.type == 'interrupted' || event.type == 'cancelled' || event.type == 'error')
						chrome.extension.sendRequest({ msg: "updateMenu" });
				}
			}
		);*/
	}
	else{
		// show waiting
		var spanWaiting = elemLI.SimpleHighlight.spanWaiting;
		if(spanWaiting){
			spanWaiting.style.display = "";
		
			// clear old timeout if it exists
			if(spanWaiting.timerID != null)
				clearTimeout(spanWaiting.timerID);
			
			// timeout hidese the img
			spanWaiting.timerID = setTimeout(function(paramImg, paramIndex){
				// fake a network error
				OnSetPopupSpeakSnippet(index, {error: ERROR_IMGWAITING});
			}, TIMEOUT_IMGWAITING, spanWaiting, index);
		}
		
		// use standard requestTip message by getting the tempalte from storage
		var templateCloned = GetTipTemplateClone(idTTSTemplateID);		// ID_TIPPOPUP_GOOGLETTS & MSTTS have same option variable names (currently)
		
		if(templateCloned){
			// ..but modify to speak in language of translation if the snippet is currently shown translated
//			var showTranslated = elemLI.SimpleHighlight.showTranslated;
			
			templateCloned.options.language = (GetPreference(showTranslated == true ? 
				PREFERENCE_TRANSSNIPPET_DESTLANG_BING : PREFERENCE_TRANSSNIPPET_SRCLANG_BING));
			var text = (showTranslated == true ? 
				elemLI.SimpleHighlight.aHighlight.translatedSnippet : elemLI.SimpleHighlight.aHighlight.snippet);
			templateCloned.options.autoDetectLanguage = 
				(showTranslated == true ? false : (templateCloned.options.language == "" ? true : false));
			// fallback language
			if(templateCloned.options.autoDetectLanguage == true)
				templateCloned.options.language = "en";
							
			// receive the translation ourselves, then pass it on to the page
			// fake a tip template
			chrome.extension.sendRequest({ msg: "requestTip", 
				tipTemplate: templateCloned,
				text: text,//elemLI.SimpleHighlight.aHighlight.snippet, 
				msgSet: _msgSetPopupSpeakSnippet,
				index: elemLI.SimpleHighlight.indexRelativeToMessage}
			);
		}
	}
}

function OnClickLookupHighlight(e) {
	e.returnValue = false;

	chrome.tabs.sendRequest(e.currentTarget.tabId, 
		{ msg: e.currentTarget.msgLookupHighlight, 
		index: GetListItemFromParents(e.currentTarget).SimpleHighlight.indexRelativeToMessage }, function () {
		//
		if (e.ctrlKey == false && GetPreference(PREFERENCE_POPUP_PIN) != PREFBOOL_TRUE)
			window.close();
	});
}

function OnClickRemoveHighlight(e, deleteContents) {
	e.returnValue = false;

	chrome.tabs.sendRequest(e.currentTarget.tabId, 
		{ msg: e.currentTarget.msgRemoveHighlight, 
		index: GetListItemFromParents(e.currentTarget).SimpleHighlight.indexRelativeToMessage,
		deleteContents: (deleteContents == null ? false : deleteContents) }, function () {
		//
		liCount = document.getElementsByTagName("li").length;

		ClearList();
		PopulateList();

		// close if empty
		if (liCount == 1 || (e.ctrlKey == false && GetPreference(PREFERENCE_POPUP_PIN) != PREFBOOL_TRUE))
			window.close();
	});
}

function OnClickHighlight(e) {
	e.preventDefault(true);

	chrome.tabs.sendRequest(e.target.tabId,
		{ msg: e.shiftKey == true ? e.target.msgSelectHighlight : e.target.msgScrollIntoView,
		  index: GetListItemFromParents(e.target).SimpleHighlight.indexRelativeToMessage, 
		  alignToTop: e.altKey == true ? false : true });

	// find uses metakey as 'always keep open' message
	if(e.metaKey != true){
		if(GetPreference(PREFERENCE_POPUP_PIN) == PREFBOOL_TRUE){			// pinned down
			if(e.ctrlKey == true)
				window.close();
		}
		else{
			if(e.ctrlKey != true)
				window.close();
		}
	}
//	if (e.ctrlKey == false && GetPreference(PREFERENCE_POPUP_PIN) != PREFBOOL_TRUE)
//		window.close();
}

function OnClickAddNote(e) {
	e.returnValue = false;

	// check note doesnt already exist
	var elemLI = GetElementFromIndex( GetListItemIndexFromParents(e.currentTarget) );
	if(elemLI == null)
		return;
		
	if(elemLI.SimpleHighlight.arrayInfo.note == null || elemLI.SimpleHighlight.arrayInfo.note.length == 0){
		// create textarea as sibling of event target (anchor'add note')
		textArea = document.createElement("textarea");
		textArea.className = CLASS_TEXTAREA_EDITNOTE;
		textArea.value = INNERTEXT_EMPTYNOTE;
		textArea.anchor = e.currentTarget;
		textArea.rows = ROWS_NOTE;
		textArea.title = TOOLTIP_TEXTAREA;
		textArea.hasChanged = false;

		// TODO: why not work?
		// textArea.scrollIntoView(false);

		e.currentTarget.parentNode.parentNode.appendChild(document.createElement("br"));
		e.currentTarget.parentNode.parentNode.appendChild(textArea);
		/*
		var div = document.createElement("div");
		var button = document.createElement("button");
		button.innerHTML = "Hello";
		div.appendChild(button);
		e.currentTarget.parentNode.parentNode.appendChild(div);
*/
		textArea.select();          // gives focus

		// events
		textArea.addEventListener("change", OnTextAreaChange);
		textArea.addEventListener("blur", OnTextAreaBlur);
/*
<div style="text-align: center; "><button style="text-align: center; font-size: xx-small; ">OK</button></div>
*/
	}
}

function OnClickRemoveNote(e) {
	e.returnValue = false;

	// check note already exists
	var elemLI = GetElementFromIndex( GetListItemIndexFromParents(e.currentTarget) );
	if(elemLI == null) return;
		
	if(elemLI.SimpleHighlight.arrayInfo.note != null){
		// set the note in the doc
		chrome.tabs.sendRequest(e.currentTarget.tabId, 
			{ msg: e.currentTarget.msgSetNote, index: GetListItemFromParents(e.currentTarget).SimpleHighlight.indexRelativeToMessage, 
			  data: {note: null} }, function () {
			//
			ClearList();
			PopulateList();
		});
	}
}

function OnClickNote(event) {
	// replace note anchor in popup with a textarea containing the existing note. update the documents note on losing focus
	textArea = document.createElement("textarea");
	textArea.value = event.target.innerText;
	textArea.className = CLASS_TEXTAREA_EDITNOTE;
	textArea.rows = ROWS_NOTE;
	textArea.title = TOOLTIP_TEXTAREA;
	textArea.hasChanged = false;

	textArea.anchor = event.target;

	// swap target elements, and store the old element as a property of the textarea
	event.target.parentNode.replaceChild(textArea, event.target);
	textArea.focus();

	// events
	textArea.addEventListener("change", OnTextAreaChange);
	textArea.addEventListener("blur", OnTextAreaBlur);
}

function OnTextAreaChange(event){
	event.currentTarget.hasChanged = true;
}

function OnTextAreaBlur(event){
/*          // TODO: why does popup get selected?
	window.setTimeout(function(){
		var sel = window.getSelection();
		sel.removeAllRanges();
	}, 250);
*/
	if (event.currentTarget.hasChanged == true) {
		// set the note in the doc
		chrome.tabs.sendRequest(event.currentTarget.anchor.tabId, 
			{ msg: event.currentTarget.anchor.msgSetNote, index: GetListItemFromParents(event.currentTarget).SimpleHighlight.indexRelativeToMessage,
			  data: {note: event.currentTarget.value} }, function () {
			//
			ClearList();
			PopulateList();
		});
	}
	else {
		ClearList();
		PopulateList();
	}
}

function OnClickPrevNext()
{
	_OnClickPrevNext(this);
}

function _OnClickPrevNext(anchor) {
	elements = document.getElementsByTagName("li");
	if(elements.length == 0)
		return;

	// remove old indicator
	if (_indexCurrentHighlight != null) {
		//elements[_indexCurrentHighlight].style.color = "";
		elements[_indexCurrentHighlight].style["margin-left"] = "";
		elements[_indexCurrentHighlight].SimpleHighlight.aHighlight.style.zoom = 1;
	}

	// get id string
	if (typeof anchor == "string")
		id = anchor;
	else
		id = anchor.id;

	// calculate new index
	if (id == "prev") {
		if (_indexCurrentHighlight == null || _indexCurrentHighlight == 0)
			_indexCurrentHighlight = elements.length - 1;   // last
		else
			_indexCurrentHighlight--;
	}
	else if (id == "next") {
		if (_indexCurrentHighlight == null || _indexCurrentHighlight == (elements.length - 1))
			_indexCurrentHighlight = 0;         // first
		else
			_indexCurrentHighlight++;
	}
	else if (id == "top") {
		_indexCurrentHighlight = 0;         // first
	}
	else if (id == "bottom") {
		_indexCurrentHighlight = elements.length - 1;   // last
	}
	else if (id == "cancel") {
		// hide close button, restore 
		document.getElementById("cancel").style.display = "none";
		return;
	}

	document.getElementById("cancel").style.display = '';        // show

	// _indexCurrentHighlight will now be valiud
	var aHighlight = GetElementFromIndex(_indexCurrentHighlight, CLASS_HL);
	if(aHighlight == null) return;
	
	// set new indicator
	//elements[_indexCurrentHighlight].style.color = "red";
	elements[_indexCurrentHighlight].style["margin-left"] = "-1.5em";
	aHighlight.style.zoom = 1.3;

	// fake a click to the indexed li. dont close popup  (ctrl)
	var mouseClickEvent = document.createEvent("MouseEvent");
	mouseClickEvent.initMouseEvent("click", true, true, window, 0,
		0,0,0,0,
		event.ctrlKey, event.altKey, event.shiftKey, true/*event.metaKey*/,          // use meta as 'always keep open' id
		0, null);

	aHighlight.dispatchEvent(mouseClickEvent);

	// TODO: scroll into view - why fail with click (activate)
//            elements[_indexCurrentHighlight].getElementsByClassName(CLASS_HL)[0].focus();
	elements[_indexCurrentHighlight].scrollIntoView(false);
}

function OnClickPin() {
	// toggle pin status in storage
	try{
		SetPreference(PREFERENCE_POPUP_PIN, GetPreference(PREFERENCE_POPUP_PIN) == PREFBOOL_TRUE ? PREFBOOL_FALSE : PREFBOOL_TRUE);
	}catch(e){
		return;
	}

	// sync icon
	UpdateHeader();
}

function OnClickRemoveAllHighlights() {
	chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
		{ code: 'if(typeof(RemoveAllHighlights) === "function") RemoveAllHighlights();', allFrames: true });
	window.close();
}

function OnClickSave() {
	if (/*document.SimpleHighlight.tab.incognito == true || document.SimpleHighlight.tab.url.indexOf('http') != 0 ||*/ document.SimpleHighlight.tab.url.length == 0)
		return;

	chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
		{ code: 'SaveHighlights("' + this.id + '");', allFrames: true }, function(){
		// show 'delete' icon, show messages, etc
		//UpdateStorageIcons(document.SimpleHighlight.tab);
	});

	// TODO: why does UpdateStorageIcons() not get called here, but does in OnClickUnSave()
	window.close();
}

function OnClickUnSave(){
	if (/*document.SimpleHighlight.tab.incognito == true || document.SimpleHighlight.tab.url.indexOf('http') != 0 || */document.SimpleHighlight.tab.url.length == 0)
		return;

	// clear all hrefs for this url (in both stores)
	chrome.extension.sendRequest({ msg: "saveHighlights", url: document.SimpleHighlight.tab.url.RemoveHash(), arrayHighlights: null, store: "both"}, function(result){
		if(result.res == null){
			// no error

			// dirty frame (updates page icon itself)
			// user should have opportunity to resave highlights or ignore message, meaning they're truely gone
			chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
				{ code: 'if(typeof(SetDirty) === "function") SetDirty(true, {ignoreAutoSave: true} );', allFrames: true }, function(){
					// remove delete icon (should never be stored)
				//UpdateStorageIcons(document.SimpleHighlight.tab);
			});
		}

		// TODO: why does UpdateStorageIcons() get called here, but not in OnClickSave()
		window.close();
	});
}

function OnClickVisibilityButtons()
{
	_OnClickVisibilityButtons(this);
}

function _OnClickVisibilityButtons(anchor){
	if(ENABLE_ALLTRANS == true){
		if(anchor.id == ID_ANCHOR_ALLTRANS)
			ShowAllTranslatedSnippets(anchor.show);
	}
	
	if(anchor.id == ID_ANCHOR_ALLNOTES)
		ShowAllNotes(anchor.show);
		
	SetSelectedButtonState(anchor.id, anchor.show == true ? false : true);
}

function OnClickQuickLanguageButton(){
	// toggle
	var div = document.getElementById(ID_DIV_QUICKLANGUAGEBAR);
	if(div == null)
		return;
		
	if(div.style.display == "none"){
		var aQL = document.getElementById(ID_ANCHOR_QUICKLANGUAGE);
		aQL.getElementsByClassName(CLASS_HEADERBUTTONIMAGE)[0].classList.add(CLASS_QL_BUTTONSELECTED);
//		document.getElementById(ID_IMG_QUICKLANGUAGEBAR).className = "quicklanguagebarselected";

		div.style.display = "";
		
		// only show chars count if > 3/4 of limit
		var numCharCount = new Number(GetPreference(PREFERENCE_TRANSLATEDCHARS));
		if (isNaN(numCharCount) == true && numCharCount > (LIMIT_DAILY_TRANSLATEDCHARS * 0.5) )
			document.getElementById(ID_SPAN_QLBAR_TRANSLATEDTODAY).style.setProperty("display", "", "important");		// hidden by default
	
		// update chars today count
		document.getElementById(ID_SPAN_NUMTRANSLATEDCHARS).innerText = AddCommas(GetPreference(PREFERENCE_TRANSLATEDCHARS));
	}
	else
		OnClickButtonCloseQuickLanguage();
}


function OnClickButtonApplyQuickLanguage(){
	// store language pair
	SetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING, document.getElementById("selectTransHLSrcLang").value);
	SetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING, document.getElementById("selectTransHLDestLang").value);
	// always disabled when chosen (onselect will enable)
	document.getElementById(ID_BUTTON_QLBAR_SET).disabled = true;
	document.getElementById(ID_BUTTON_QLBAR_RESET).disabled = false;

	// sync flag to current settings
	SetQuickLanguageFlag();
			
	// tell all tabs to refresh their preferences (TODO: implement mask)
   chrome.windows.getAll({ populate: true }, function (arrayWindows) {
		arrayWindows.forEach(function (w) {
			w.tabs.forEach(function (tab) {
				// will cause error on injection to pages without permission, but doesn't really matter
//				if (/*tab.url.indexOf('http') == 0 && */tab.url.length != 0) {
					chrome.tabs.executeScript(tab.id,
						{ code: 'if(typeof(LoadPreferences) === "function") LoadPreferences({maskTranslation: true});', allFrames: true }, null);
//				}
			});
		});
	});
				
	// empty our translated cache too
	var elemsLI = document.getElementsByTagName("li");
	for(var index=0; index < elemsLI.length; index++){
		elemsLI[index].SimpleHighlight.spanAddRemDel.aInfo.nameSrcLanguage = null;				
		elemsLI[index].SimpleHighlight.aHighlight.translatedSnippet = null;

		// empty cached audio
		var audio = elemsLI[index].SimpleHighlight.spanAddRemDel.aSpeakSnippet.audio;
		if(audio){
			audio.currentTime = 99999;		// trigger end event
			audio.parentElement.removeChild(audio);
			elemsLI[index].SimpleHighlight.spanAddRemDel.aSpeakSnippet.audio = null;
		}
		
		// 'reshow' those that are showing translations, in our new language (aka hidden option)
		if(elemsLI[index].SimpleHighlight.showTranslated == true){
			if(ENABLE_QL_RETRANSLATEALL == true && (event.altKey == true && event.shiftKey == true && event.ctrlKey == true))
				ShowTranslatedSnippet(elemsLI[index].SimpleHighlight.showTranslated, index);
			else
				ShowTranslatedSnippet(false, index);
		}
	}
}

function OnClickButtonResetQuickLanguage(){
	// update teh comboboxes with defaults
	document.getElementById("selectTransHLSrcLang").value = GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING, true);
	document.getElementById("selectTransHLDestLang").value = GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING, true);
	
	// fake apply (will enable reset button)
	OnClickButtonApplyQuickLanguage();
	// disable reset button
	document.getElementById(ID_BUTTON_QLBAR_RESET).disabled = true;
}

function OnClickButtonCloseQuickLanguage(){
	var div = document.getElementById(ID_DIV_QUICKLANGUAGEBAR);
	if(div){
		div.style.display = "none";

		var aQL = document.getElementById(ID_ANCHOR_QUICKLANGUAGE);
		aQL.getElementsByClassName(CLASS_HEADERBUTTONIMAGE)[0].classList.remove(CLASS_QL_BUTTONSELECTED);
//		document.getElementById(ID_IMG_QUICKLANGUAGEBAR).className = "";
	}
}

function OnChangeQuickTransLanguage(){
	document.getElementById(ID_BUTTON_QLBAR_SET).disabled = false;
}

function OnClickButtonDetailAllHighlights(){
	if (/*document.SimpleHighlight.tab.url.indexOf('http') != 0 || */document.SimpleHighlight.tab.url.length == 0)
		return;

	event.cancelBubble = true;
	event.stopPropagation();
		
	// reset counters
	_reportedFrameCount = _registeredFrameCount = 0;
	_arrDetailHighlights = [];
	
	_saveDetailHighlights = event.altKey;
	_relativeDateDetailHighlights = event.shiftKey;
	
	// exec in each frame - register first
	chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
		{ code: 'RegisterFrameInPopup(' + JSON.stringify({msgRegisterFrame: MSG_REGISTERFRAME}) + ');', allFrames: true }
	);
		
	chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
		{ code: 'DetailPageHighlights(' + JSON.stringify({msgOnDetailHighlightsFrame: MSG_ONDETAILHIGHLIGHTSFRAME}) + ');', allFrames: true }
	);
		
}

function OnClickExport(){
	if (/*document.SimpleHighlight.tab.url.indexOf('http') != 0 || */document.SimpleHighlight.tab.url.length == 0)
		return;

	// reset counters
	_reportedFrameCount = _registeredFrameCount = 0;
	_exportAsXml = (event.ctrlKey == true && event.altKey == true && event.shiftKey == true) ? true : false;
	// clear temp key just in case
	chrome.extension.sendRequest({ msg: "saveHighlights", url: KEYNAME_EXPORTPAGEHIGHLIGHTS, store: "session", arrayHighlights: null});
		
	chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
		{ code: 'RegisterFrameInPopup(' + JSON.stringify({msgRegisterFrame: MSG_REGISTERFRAME}) + ');', allFrames: true }
	);
		
	chrome.tabs.executeScript( document.SimpleHighlight.tab.id,
		{ code: 'ExportPageHighlights(' + JSON.stringify({key: KEYNAME_EXPORTPAGEHIGHLIGHTS, msgOnExportFrame: MSG_ONEXPORTEDFRAME/*, msgRegisterFrame: MSG_REGISTERFRAME*/}) + ');', allFrames: true }/*, 
		
		function(){
		// TODO: NEVER CALLED - WHY?
		// now code has run in all frames, sessionStorage[tempforexport] has completed string
		alert("executescript callback");
		
		chrome.extension.sendRequest({ msg: "loadHighlights", url: "tempForExport", store: "session"}, function(result){
			console.log("EXPORT THIS" + result);
		});
		
		// show 'delete' icon, show messages, etc
		//UpdateStorageIcons(document.SimpleHighlight.tab);
	}*/);

}

function OnClickButtonImport(){
	// toggle importbar if applicable
	var div = document.getElementById(ID_DIV_IMPORTBAR);
	if(div.style.display == ""){
		OnClickButtonImportBarClose();
		return;
	}

	if(event.altKey == true){
		var xhr = new XMLHttpRequest();
		
		// prompt for url
		var url = prompt(PROMPT_IMPORTURL_MESSAGE, PROMPT_IMPORTURL_DEFAULTVALUE);
		if(url == null)
			return;
		xhr.open('GET', url, true);
				
		xhr.onreadystatechange = function (aEvt) {
			if (xhr.readyState == 4) {
				if(xhr.status == 200){
					// text in xhr.responseText
					DoImport(xhr.responseText);
				}
			}
		};
		
		xhr.send(null);
	}
	else{
		// fake click to real import button
		document.getElementById("btnHiddenImport").click();
	}
}

function OnChangeImport(){
	var files = this.files;

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
				// text in e.target.result
				DoImport(e.target.result);
			};
		})(f);

		//reader.readAsDataURL(f);	
		reader.readAsText(f);
	}
}

function DoImport(stringifiedImportObject){
	chrome.extension.sendRequest({ msg: "getHighlightsFromStringifiedImportObject", 
		stringifiedImportObject: stringifiedImportObject }, function(res){
			if(res.error){
				alert("Error: " + res.error);
				return;
			}
			
			// arr is array of {url:x, hl: y}
				
			// if 1 object in array and its url doesnt match, then warn
			// else iterate until find matching url (and fail otherwise)
			var urlTabWithHashRemoved = document.SimpleHighlight.tab.url.RemoveHash();

			if(res.arr.length >= 1){
				// if 1 url and it matches, use it
				if(res.arr.length == 1){
					if(res.arr[0].url && res.arr[0].url == urlTabWithHashRemoved){
						chrome.tabs.executeScript(document.SimpleHighlight.tab.id, { 
							code: 'PlayIntoJournal(' + 
								JSON.stringify(res.arr[0].hl) + 
								');', 
							allFrames: true }, null);
							
						window.close();
						return;
					}
				}
			
				// show importbar
				var div = document.getElementById(ID_DIV_IMPORTBAR);
				div.style.display = "";

				var aImport = document.getElementById(ID_ANCHOR_IMPORT);
				aImport.getElementsByClassName(CLASS_HEADERBUTTONIMAGE)[0].classList.add(CLASS_IMPORT_BUTTONSELECTED);
			
			
			
				// if theres more than one url in the file, populate select
				var select = document.getElementById(ID_SELECT_IMPORTURL);
				select.options.length = 0;		// clear
				
				for(var p=0; p<res.arr.length; p++){
					if(!res.arr[p].url)
						continue;
				
					var option = new Option(res.arr[p].url, res.arr[p].url);
					option.hl = res.arr[p].hl;		// store hl array in option
					
					select.options.add(option);
				}
				
				// select matching one, if any
				select.value = urlTabWithHashRemoved;
				if(select.selectedIndex == -1){
					document.getElementById(ID_SPAN_IMPORTBARTEXT).style.display = "";		// show warning
					select.selectedIndex = 0;
				}
				
				// update just in case
				OnChangeSelectImport();
			}
	});
}

function OnChangeSelectImport(){
	var select = document.getElementById(ID_SELECT_IMPORTURL);
	
	// disable gotourl if same as current page
	document.getElementById(ID_BUTTON_IMPORTBAR_GOTOURL).disabled = 
		(select.value == document.SimpleHighlight.tab.url.RemoveHash() ? true : false);
}

function OnClickButtonImportBarImport(){
	var select = document.getElementById(ID_SELECT_IMPORTURL);
	if(select.selectedIndex == -1)
		return;
	var option = select.options[select.selectedIndex];
	
	// hl string stored in option
	var urlTabWithHashRemoved = document.SimpleHighlight.tab.url.RemoveHash();
	var ignoreMismatchedURL = false;
	
	if(option.value != urlTabWithHashRemoved){
		if(confirm(CONFIRM_FORCEIMPORT) != true)
			return;
		ignoreMismatchedURL = true;
	}

	chrome.tabs.executeScript(
		document.SimpleHighlight.tab.id, 
		{ 
			code: 'PlayIntoJournal(' + 
				JSON.stringify(option.hl) + 
	//			', ' + JSON.stringify({
	//				ignoreMismatchedURL: ignoreMismatchedURL,
	//			}) + 
				');', 
			allFrames: true 
		}
	);						
/*	
	chrome.tabs.executeScript(document.SimpleHighlight.tab.id, { 
		code: 'if(typeof(PlayIntoJournal) === "function") PlayIntoJournal(' + JSON.stringify(option.hl) + ');', 
		allFrames: true }, null);
	*/
	window.close();
}
function OnClickButtonImportBarGotoURL(){
	var select = document.getElementById(ID_SELECT_IMPORTURL);
	if(select.value == null)		// value is url
		return;
		
	// navigate
	window.open(select.value, "_blank");
/*	chrome.tabs.update(document.SimpleHighlight.tab.id, {
		url: select.value
	});
	*/
	window.close();
}

function OnClickButtonImportBarClose(){
	var div = document.getElementById(ID_DIV_IMPORTBAR);
	div.style.display = "none";

	var aImport = document.getElementById(ID_ANCHOR_IMPORT);
	aImport.getElementsByClassName(CLASS_HEADERBUTTONIMAGE)[0].classList.remove(CLASS_IMPORT_BUTTONSELECTED);
}

function OnClickButtonRemoveDonate(){
	var div = document.getElementById(ID_DIV_DONATE);
	div.style.display = "none";
	
	SetPreference(PREFERENCE_POPUP_REMOVEDONATE, PREFBOOL_TRUE);
}

/////////////////////////////////////////////////
// func

function SetQuickLanguageFlag(){
	var destLanguage = GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING);
	var destLangInfo = Bing.GetLanguageInfo(destLanguage);
	var srcLanguage = GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING);
	var srcLangInfo = Bing.GetLanguageInfo(srcLanguage);

	// source language flag
	var imgFlag = document.getElementById(ID_BUTTON_QLBAR_SRCFLAG);
	imgFlag.src = srcLangInfo.urlFlag;
	imgFlag.title = TOOLTIP_QLBARSRCFLAG.replace("<<LANGUAGE>>", srcLangInfo.name ? srcLangInfo.name : "?");
		
	// destation language flag
	imgFlag = document.getElementById(ID_BUTTON_QLBAR_DESTFLAG);
	imgFlag.src = destLangInfo.urlFlag;
	imgFlag.title = TOOLTIP_QLBARDESTFLAG.replace("<<LANGUAGE>>", destLangInfo.name ? destLangInfo.name : "?");
}

function ClearList() {
	_indexCurrentHighlight = null;             // null = none. on first 'next' click, selected the first one (index 0)
	_totalNumHighlights = 0;
	//_totalNumDirty = 0;

	// store the page offset incase its repopulated (SimpleHighlight structure created by first PopulateList() call)
	if(document.SimpleHighlight && document.SimpleHighlight.tab)
		chrome.tabs.sendRequest(document.SimpleHighlight.tab.id, { msg: "setPopupPageYOffset", popupPageYOffset: window.pageYOffset } );

	_disableStorePopupPageYOffset = true;	// enable when we get the old value back
	
	// remove list
	var ol = document.getElementById(ID_OL_HIGHLIGHTS);
	if(ol != null && ol.parentNode != null)
		ol.parentNode.removeChild(ol);

	UpdateHeader();
}

function PopulateList(){
	// populate list
	chrome.tabs.getSelected(null, function (tab) {
		// store tab for later use
		document.SimpleHighlight = {
			tab: tab,
		};

		UpdateStorageIcons(tab);

		if (/*tab.url.indexOf('http') != 0  || */tab.url.length == 0)
			return;

		// try to restore scroll offset
		chrome.tabs.sendRequest(tab.id, { msg: "getPopupPageYOffset" }, function (offset) {
			_pageYOffsetTryAfterSnippetSent = offset;     // store for later action
			_disableStorePopupPageYOffset = false;			// can now store again without fear of it being overwritten

			// tell all scripts in the selected tab send us a message containing its snippets
			// and the message we need to scroll them into view
			chrome.tabs.executeScript(tab.id,
				{ code: 'if(typeof(SendAllSnippets) === "function") SendAllSnippets("' + MSG_SNIPPETSENT + '");', allFrames: true }, null);
		});
	});

}

function UpdateHeader(){
	// update number title bar
	document.getElementById('titletext').innerHTML = 
		'<span class="number" style="vertical-align:inherit">' + _totalNumHighlights + "</span> Highlight" + (_totalNumHighlights == 1 ? "" : "s");// + " on this page";

	// display 'no highlights'
	document.getElementById(ID_DIV_NOHIGHLIGHTS).style.display = (_totalNumHighlights == 0 ? "" : "none");
	// hide export
	document.getElementById(ID_ANCHOR_EXPORT).style.display = (_totalNumHighlights == 0 ? "none" : "");
	// hide find icons
	document.getElementById(ID_SPAN_FINDCURSOR).style.display = (_totalNumHighlights == 0 ? 'none' : '');
	// removeAllHighlights
	document.getElementById(ID_ANCHOR_REMOVEALLHIGHLIGHTS).style.display = (_totalNumHighlights == 0 ? 'none' : '');
	// store local/session
	document.getElementById(ID_BUTTON_SAVELOCAL).style.display = (_totalNumHighlights == 0 ? 'none' : '');
	document.getElementById(ID_BUTTON_SAVESESSION).style.display = (_totalNumHighlights == 0 ? 'none' : '');
	// detailheighlights
	document.getElementById(ID_BUTTON_DETAILHIGHLIGHTS).style.display = (_totalNumHighlights == 0 ? 'none' : '');
	
	// sync pin icon
	var pinIn = GetPreference(PREFERENCE_POPUP_PIN) == PREFBOOL_TRUE ? true : false;
	
	var aPin = document.getElementById('pin');
	if(aPin){
		aPin.title = (pinIn == true ? TOOLTIP_PININ : TOOLTIP_PINOUT);
		aPin.getElementsByTagName("img")[0].src = "img/pin" + (pinIn == false ? "Out" : "In") + ".png";
	}
}

/////////////////////////////////////

function ShowNote(showNote, index){
	var elemLI = GetElementFromIndex(index);		
	
	if(elemLI.SimpleHighlight.divNote != null){
		// update visibility
		if(showNote == false)
			elemLI.SimpleHighlight.divNote.style.setProperty("display",  "none");
		else
			elemLI.SimpleHighlight.divNote.style.removeProperty("display");
	}
		
	// update icon
	var imgShowNote = GetElementFromIndex(index, CLASS_SHOWNOTE_IMG);
	if(imgShowNote != null){
		imgShowNote.className = CLASS_SHOWNOTE_IMG;
		if(showNote == true)
			imgShowNote.classList.add(CLASS_BUTTONSELECTED);
			
		imgShowNote.parentElement.title = (showNote == true ? TOOLTIP_HIDENOTE : TOOLTIP_SHOWNOTE);
	}

	// update status
	elemLI.SimpleHighlight.showNote = showNote;
	
	// save into DOM
	if(elemLI.SimpleHighlight.spanAddRemDel.aShowNote != null){
		chrome.tabs.sendRequest(elemLI.SimpleHighlight.spanAddRemDel.aShowNote.tabId, 
			{ msg: elemLI.SimpleHighlight.spanAddRemDel.aShowNote.msgSetShowStatus, 
			  index: elemLI.SimpleHighlight.indexRelativeToMessage,
			  itemType: "showNote", 
			  show: showNote } 
		);
	}
}

function ShowAllNotes(showAllNotes){
	var elemsLI = document.getElementsByTagName("li");
	for(var x=0; x<elemsLI.length; x++)
		ShowNote(showAllNotes, x);
}

/////////////////////////////////////

function ShowTranslatedSnippet(showTranslated, index) {
	// get the listitem from its index
	var elemLI = GetElementFromIndex(index);
	if(elemLI == null || elemLI.SimpleHighlight.aHighlight == null)
		return;
		
	var aHighlight = elemLI.SimpleHighlight.aHighlight;
	var spanWaiting = elemLI.SimpleHighlight.spanWaiting;
	// must have snippet to display, but will always have the non-translated one
	if(showTranslated == true && (aHighlight.translatedSnippet == null || aHighlight.translatedSnippet.length == 0)){
		// request translation
		
		// show waiting
		if(spanWaiting){
			spanWaiting.style.display = "";
		
			// clear old timeout if it exists
			if(spanWaiting.timerID != null)
				clearTimeout(spanWaiting.timerID);
			
			// timeout hidese the img
			spanWaiting.timerID = setTimeout(function(paramImg, paramIndex){
				// fake a network error
				OnSetPopupTranslatedSnippet(index, {error: ERROR_IMGWAITING});
				// sync icons and status to hide translated state
//						ShowTranslatedSnippet(false, paramIndex);
			}, TIMEOUT_IMGWAITING, spanWaiting, index);
		}

		
		// we cant use GetTemplateClone as we want to have the default template (master) used
		// for the tip but with our language settings
		var template = null;
        var idMatch = ID_TIPPOPUP_MSTRANSLATE_TRANSLATE;//ID_TIPPOPUP_GOOGLETRANSLATE;
        
		for(var y in _arrTipPopupMasterTemplates){
			if(_arrTipPopupMasterTemplates[y].id == idMatch){
				template = _clone(_arrTipPopupMasterTemplates[y]);
				break;
			}
		}
		if(template){
			if(template.options == null)
				template.options = {};		// create anew
			template.sessionData = {};
				
//			template.options.srcLang = GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG);
//			template.options.destLang = GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG);
			template.options.srcLang = GetPreference(PREFERENCE_TRANSSNIPPET_SRCLANG_BING);
			template.options.destLang = GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING);
		
			// validate that the template stored has all the variables of the master template. perhaps teh master template
			// has been updated after the template was stored in localStorage
			for(var q in template.defaultOptions){
				if(template.options[q] === undefined)
					template.options[q] = template.defaultOptions[q];
			}

			// receive the translation ourselves, then pass it on to the page
			// fake a tip template
			chrome.extension.sendRequest({ msg: "requestTip", 
				tipTemplate: template,
				text: aHighlight.snippet, 
				msgSet: _msgSetPopupTranslatedSnippet,
				index: elemLI.SimpleHighlight.indexRelativeToMessage}
			);
		}
		return;
	}

	// update status (even if translation requested, it's still 'showing' (will have waiting anim too))
	elemLI.SimpleHighlight.showTranslated = showTranslated;

	// update icon
	var imgTranslate = GetElementFromIndex(index, CLASS_SHOWTRANSHL_IMG);
	if(imgTranslate){
		imgTranslate.className = CLASS_SHOWTRANSHL_IMG;
		
		if(showTranslated == true){
			imgTranslate.classList.add(CLASS_BUTTONSELECTED);
			imgTranslate.parentElement.title = TOOLTIP_HIDETRANSHL;
		}
		else{
			// replace <<LANGUAGE>> in tooltip with current dest lang
			var destLanguage = elemLI.SimpleHighlight.aAppendedTranslation.spanSource.nameDestLanguage;//GoogleAPI.GetLanguageInfo(GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG)).name;
			
			var title = TOOLTIP_SHOWTRANSHL;

			imgTranslate.parentElement.title = title.replace("<<LANGUAGE>>", destLanguage != null ? destLanguage : "destination language");
		}
	}
	
	
	// clear waiting image
	if(showTranslated == false && spanWaiting){
		spanWaiting.style.display = "none";

		// cancel timers
		if(spanWaiting.timerID != null){
			clearTimeout(spanWaiting.timerID);
			spanWaiting.timerID = null;
		}
	}

	// save into DOM (valid translation now)
	var aShowTransHL = elemLI.SimpleHighlight.spanAddRemDel.aShowTransHL;
	if(aShowTransHL){
		chrome.tabs.sendRequest( aShowTransHL.tabId, 
			{ msg: aShowTransHL.msgSetShowStatus, 
			  index: elemLI.SimpleHighlight.indexRelativeToMessage, 
			  itemType: "showTranslatedSnippet", 
			  show: showTranslated } );
	}


	// common stuff - store in spanTranslation
	if(showTranslated == true){
		// text
		elemLI.SimpleHighlight.aAppendedTranslation.spanText.innerText = aHighlight.translatedSnippet;
		// if snippet is translated, set the source text here on aAppendedTranslation
		if(elemLI.SimpleHighlight.styleTranslation == "replace")
			elemLI.SimpleHighlight.aAppendedTranslation.title = TOOLTIP_SOURCESNIPPET.replace("<<SNIPPET>>", aHighlight.snippet);
		else
			elemLI.SimpleHighlight.aAppendedTranslation.title = "";

		// spanSource (flag >)
		// tooltip
		var title = TOOLTIP_TRANSLATEDSNIPPET_SPANSOURCE_FROMTO;
		title = title.replace("<<SRCLANGUAGE>>", elemLI.SimpleHighlight.aAppendedTranslation.spanSource.nameSrcLanguage);
		title = title.replace("<<DESTLANGUAGE>>", elemLI.SimpleHighlight.aAppendedTranslation.spanSource.nameDestLanguage);
		elemLI.SimpleHighlight.aAppendedTranslation.spanSource.title = title;
		// flag icon
		elemLI.SimpleHighlight.aAppendedTranslation.spanSource.imgFlag.src = 
			elemLI.SimpleHighlight.aAppendedTranslation.spanSource.urlSrcLanguageIcon;
	}
	// show translation if showing desired
	elemLI.SimpleHighlight.aAppendedTranslation.style.setProperty("display", showTranslated == true ? "" : "none");
	// margin depends on style
	elemLI.SimpleHighlight.aAppendedTranslation.style.setProperty("margin-left", 
		(elemLI.SimpleHighlight.styleTranslation == "replace" ? 0.2 : 0.5) + "em");
	
	if(elemLI.SimpleHighlight.styleTranslation == "replace"){
		// hide original text
		elemLI.SimpleHighlight.aHighlight.style.setProperty("display", showTranslated == true ? "none" : "", "important");
	}
	
/*
	// invalidate speech cached audio
	var audio = elemLI.SimpleHighlight.spanAddRemDel.aSpeakSnippet.audio;
	if(audio){
		// clear cache
		audio.parentElement.removeChild(audio);
		elemLI.SimpleHighlight.spanAddRemDel.aSpeakSnippet.audio = null;
	}
*/
	
	// font style
	if(showTranslated == true){
		elemLI.style.setProperty("border-radius", "5px", "important");
		elemLI.style.setProperty("background-color", COLOUR_TRANSLATEDSNIPPET, "important");
	}
	else{
		elemLI.style.removeProperty("background-color");
		elemLI.style.removeProperty("border-radius");
	}
	
	// visibility of translatedBy element depends on 1 or more translations being visible
	var elemsLI = document.getElementsByTagName("li");
	
	var showTranslatedByBranding = elemLI.SimpleHighlight.showTranslated;	// optimize
	if(showTranslatedByBranding != true){
		for(var x=0; x<elemsLI.length; x++){
			if(elemsLI[x].SimpleHighlight && elemsLI[x].SimpleHighlight.showTranslated == true){
				showTranslatedByBranding = true;
				break;
			}
		}
	}

//	document.getElementById("translationsBy").style.setProperty("opacity", showTranslatedByBranding == true ? 1 : 0, "important");
	document.getElementById("translationsBy").style.setProperty("display", showTranslatedByBranding == true ? "" : "none", "important");
				
	// set colours via a fake call to mouseout
	OnListitemMouseOut({currentTarget: elemLI});
}

function ShowAllTranslatedSnippets(showAllTranslatedSnippets){
	var elemsLI = document.getElementsByTagName("li");
	for(var x=0; x<elemsLI.length; x++)
		ShowTranslatedSnippet(showAllTranslatedSnippets, x);
}

function SetSelectedButtonState(id, show){
	var anchor = document.getElementById(id);
	if(anchor == null)
		return;
	var itemType;
	
	if(ENABLE_ALLTRANS == true){
		if(id == ID_ANCHOR_ALLTRANS){
			if(show == false)
				anchor.title = TOOLTIP_HIDETRANSLATIONS;
			else{
				// replace <<LANGUAGE>> in tooltip with current dest lang
				var title = TOOLTIP_SHOWTRANSLATIONS;
				var destLanguage = Bing.GetLanguageInfo(GetPreference(PREFERENCE_TRANSSNIPPET_DESTLANG_BING)).name;
				
				anchor.title = title.replace("<<LANGUAGE>>", destLanguage != null ? destLanguage : "?");
			}
			
			// save to DOM itemtype
			itemType = "showAllTrans";
		}
	}
	
	if(id == ID_ANCHOR_ALLNOTES){
		anchor.title = (show == true ? TOOLTIP_SHOWNOTES : TOOLTIP_HIDENOTES);
		// save to DOM itemtype
		itemType = "showAllNotes";
	}

	// change class to show selected
	var img = anchor.getElementsByTagName("img")[0];
	img.classList[(show == false ? "add" : "remove")](CLASS_BUTTONSELECTED);
	
	anchor.show = show;

	// save DOM
	if(anchor.lastValidTabId){
		chrome.tabs.sendRequest(anchor.lastValidTabId, 
			{ msg: anchor.msgSetShowStatus, /*index: -1, */itemType: itemType, show: show } );
	}
}

function UpdateStorageIcons(tab){
	// hide all storage icons if incognito
//  document.getElementById('icons').style.display = (tab.incognito ? 'none' : '');

	// if date has changed since last translation, reset counter
	var now = new Date();
	var dateString = now.toDateString(now);
	// probably inaccurate, as our date start/end isnt same as server...
	if(dateString != GetPreference(PREFERENCE_TRANSLATEDCHARS_DATESTRING)){
		SetPreference(PREFERENCE_TRANSLATEDCHARS_DATESTRING, dateString);
		SetPreference(PREFERENCE_TRANSLATEDCHARS, 0);
	}
	
	// translation character limit warning bar
	var numCharCount = new Number(GetPreference(PREFERENCE_TRANSLATEDCHARS));
	if (isNaN(numCharCount) == false && numCharCount > LIMIT_DAILY_TRANSLATEDCHARS){
		document.getElementById('infobar').innerHTML = INFOBAR_TRANSLATEDCHARS;
		document.getElementById('infobar').style.display = '';
	}
	else if(tab.incognito){
		// incognito warning bar
		document.getElementById('infobar').innerHTML = INFOBAR_INCOGNITO;
		document.getElementById('infobar').style.display = '';
	}

	chrome.extension.sendRequest({ msg: "getURLStore", url: tab.url.RemoveHash()}, function(store){
		// can only delete from storage if its in storage
		document.getElementById(ID_BUTTON_DELETESTORAGE).style.display = (store == null ? "none" : "");

		// bar colour indicates where highlights for this url were last saved
		document.getElementById("header").className = 
			(store == "session" ? "colourSession" : (store == "local" ? "colourLocal" : "colourNoStore"));
		// also indicate last saved location via tooltip
		document.getElementById("titletext").title = 
			(store == "session" ? TOOLTIP_TITLEBAR_SESSION : (store == "local" ? TOOLTIP_TITLEBAR_LOCAL : TOOLTIP_TITLEBAR_UNSAVED));

	});
}

function PopulateLanguages(id, args){
	var elemSelect = document.getElementById(id);
	if(elemSelect == null)
		return;

	// source language can be auto ("" code)
	if(args && args.prependAuto == true){
		var option = new Option(LANGUAGENAME_AUTO, "");
		option.className = "translateAnything";
		
		elemSelect.options.add(option);
	}
		
    if(args && args.bing == true){
        for (var x in Bing.arrLanguageNames){
            elemSelect.options.add(new Option(Bing.arrLanguageNames[x].name, Bing.arrLanguageNames[x].value));
        }
    }
    else{
        for (var x in GoogleAPI.arrLanguages){
            if(GoogleAPI.arrLanguages[x].supported == true)
                elemSelect.options.add(new Option(GoogleAPI.arrLanguages[x].name, GoogleAPI.arrLanguages[x].code));
        }
    }
}

////////////////////////////////
// helpers

function GetElementFromIndex(idx, className){
	var elemsLI = document.getElementsByTagName("li");
	if(idx >= elemsLI.length)
		return null;
	
	if(className != null){
		var elems = elemsLI[idx].getElementsByClassName(className);
		
		if(elems.length != 1)
			return null;
		else	
			return elems[0];
	}
	else
		return elemsLI[idx];
}

function GetListItemFromParents(elem){
	// walk the DOM up to a listitem, and return its value (the number shown before) minus 1
	while(elem && elem.nodeName != "LI")		// uppercase always
		elem = elem.parentNode;

	return elem;
}

function GetListItemIndexFromParents(elem){
	elem = GetListItemFromParents(elem);
	if(elem == null)
		return -1;
		
	// find the index of elem (li) in parent (ol/ul)
	var elemsLI = elem.parentNode.children;
	for(var i=0; i<elemsLI.length; i++){
		if(elemsLI[i] == elem)
			return i;
	}
	
	return -1;
}

function GetAnchorFromClassName(className){
	if(_currentTargetListItemMouseOver == null)
		return null;
	var elems = _currentTargetListItemMouseOver.getElementsByClassName(className);
	
	return (elems.length == 1 ? elems[0] : null);
}
