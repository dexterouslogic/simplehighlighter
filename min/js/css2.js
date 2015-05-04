
var COLOR_LOOKUP_FOREMOST="#84b7ea";var COLOR_LOOKUP_DOCKED="#336699";var CSSID_CHROME=null;var CSSID_CHROME_IFRAME=1;var CSSID_MEDIAWIKI=2;var CSSID_YAHOOWEB=3;var CSSID_TWITTER=4;var CSSID_GOOGLEIMAGESEARCH=5;var CSS2={classNames:{},BuildStyleSheet:function(type,cssId){var arrRules,arrClassVariables,suffixClassName,classNameParent,is_not_important_resetdeclarations;var styleSheet="";if(type=="lookup"){arrRules=CSS2.rules.lookup.chrome;arrClassVariables=CSS2.classVariables.lookup.chrome;suffixClassName=CSS2.classNameSuffixes.lookup.chrome;is_not_important_resetdeclarations=false;}else if(type=="tip"){var arr=[{cssId:CSSID_CHROME,varName:"chrome"},{cssId:CSSID_CHROME_IFRAME,varName:"chromeiframe",is_not_important_resetdeclarations:true},{cssId:CSSID_MEDIAWIKI,varName:"mediaWiki"},{cssId:CSSID_YAHOOWEB,varName:"yahooWeb"},{cssId:CSSID_TWITTER,varName:"twitter"},{cssId:CSSID_GOOGLEIMAGESEARCH,varName:"googleImage"},];for(var q=0;q<arr.length;q++){if(arr[q].cssId==cssId){arrRules=CSS2.rules.tip[arr[q].varName];arrClassVariables=CSS2.classVariables.tip[arr[q].varName];suffixClassName=CSS2.classNameSuffixes.tip[arr[q].varName];is_not_important_resetdeclarations=arr[q].is_not_important_resetdeclarations
break;}}
if(q==arr.length)
return;}
if(arrClassVariables){var arrResetSelectors=CSS2.CreateClassVariables(type,arrClassVariables,suffixClassName);styleSheet+=CSS2.BuildResetRule(arrResetSelectors,is_not_important_resetdeclarations);styleSheet+="\n\n";}
styleSheet+=CSS2.BuildRules(arrRules,suffixClassName);return styleSheet;},CreateClassVariables:function(type,arrClassVariables,suffixClassName){var arrSelectors=[];for(var q in arrClassVariables){if(arrClassVariables[q].className){var varName=CSS2._GetClassVariableName(type,arrClassVariables[q].varNameSuffix);if(varName!=null){this[varName]=arrClassVariables[q].className+(suffixClassName?suffixClassName:"");if(arrClassVariables[q].noResetSelector!=true)
arrSelectors.push("."+this[varName]);}}
if(arrClassVariables[q].tagName){if(arrClassVariables[q].noResetSelector!=true)
arrSelectors.push(arrClassVariables[q].tagName);}}
return arrSelectors;},_GetClassVariableName:function(type,varNameSuffix){var arrPrefix=[{type:"lookup",prefix:"LOOKUP"},{type:"tip",prefix:"TIP"},];for(var b in arrPrefix){if(arrPrefix[b].type==type){var out="CLASS_"+arrPrefix[b].prefix;if(varNameSuffix)
out+="_"+varNameSuffix;return out;}}
return null;},BuildResetRule:function(arrClassVarNames,is_not_important){var rule="";if(arrClassVarNames.length>0){var declarations="\
    background: none;\
    border: 0px;\
    border-style: none; \
    color: black; \
    direction: ltr; \
    float: none; \
    font-family: sans-serif; \
    font-size: small; \
    font-style: normal; \
    font-variant: normal; \
    font-weight: normal; \
    letter-spacing: normal; \
    line-height: normal; \
    margin: 0px;\
    padding: 0px;\
    text-align: left; \
    text-decoration: none; \
    text-indent: 0px; \
    text-transform: none; \
    vertical-align: baseline;\
    white-space: normal;";for(var q in arrClassVarNames){if(q>0)
rule+=", ";rule+=arrClassVarNames[q];}
rule+="{\n"
var arrDeclarations=declarations.split(";");for(var z in arrDeclarations){if(arrDeclarations[z].length>0){rule+="\t"+arrDeclarations[z];if(is_not_important!=true)
rule+=" !important";rule+=";\n";}}
rule+="}"}
return rule;},BuildRules:function(arrRules,suffixClassName,classNameParent){var ss="";for(var q in arrRules){if(arrRules[q].noAutoParentSelector!=true&&classNameParent)
ss+="."+classNameParent+" ";var arrComma=arrRules[q].selector.split(",");var count1=0;for(var h in arrComma){if(arrComma[h].length==0)
continue;if(count1>0)
ss+=", ";var arrSpace=arrComma[h].split(" ");var count2=0;for(var i in arrSpace){if(arrSpace[i].length==0)
continue;if(count2>0)
ss+=" ";var idxColon=arrSpace[i].indexOf(':');if(idxColon!=-1)
ss+=arrSpace[i].substring(0,idxColon);else
ss+=arrSpace[i];if(suffixClassName&&arrSpace[i].indexOf('.')!=-1)
ss+=suffixClassName;if(idxColon!=-1)
ss+=arrSpace[i].substring(idxColon);count1++;count2++;}}
ss+="{\n";if(arrRules[q].is_not_important!=true){var arrStatement=arrRules[q].declarations.split(";");for(var z in arrStatement){if(arrStatement[z].length>0)
ss+="\t"+arrStatement[z]+" !important;\n";}}
else
ss+="\t"+arrRules[q].declarations;ss+="}\n\n";}
return ss;},rules:{lookup:{chrome:[{selector:"div.lookup",noAutoParentSelector:true,declarations:"\
     display: table;\
     -webkit-transition: -webkit-box-shadow 0.25s linear, border-color 0.25s linear;"},{selector:"div.lookupforemost",declarations:""},{selector:"div.lookupdocked",declarations:""},{selector:"div.rowiframe",declarations:"\
     display: table-row;"},{selector:"div.rowiframe td.celliframe",declarations:"\
      display: table-cell;\
      width: 100%;\
      height: 100%;"},{selector:"td.celliframe iframe.iframe",declarations:"\
       display: inline;\
       width: 100%;\
       height: 100%;\
       background-color: white;"},{selector:"iframe.empty",declarations:"\
       background-image: url('"+chrome.extension.getURL('img/128.png')+"');\
       background-position: 50% 50%;\
       background-repeat: no-repeat;"},{selector:"div.bar",declarations:"\
     display: table-row;\
     -webkit-transition: background 0.25s linear;\
     width: 100%;\
     cursor: move;\
     background: lightgrey;"},{selector:"div.barforemost",declarations:"background: "+COLOR_LOOKUP_FOREMOST+";"},{selector:"div.bardocked",declarations:"background: "+COLOR_LOOKUP_DOCKED+";"},{selector:"div.bar div.cell",declarations:"\
     display: table-cell;\
     vertical-align: middle;"},{selector:"div.left",declarations:"\
     padding-right: 16px;\
     text-align: left;"},{selector:"div.right",declarations:"\
     white-space: nowrap;\
     text-align: right;"},{selector:"span.buttoncontainer",declarations:"\
     display:inline;"},{selector:"a.button:link",declarations:"\
     display:inline;\
     -webkit-user-select: none;\
     color: transparent;"},{selector:"a.button img.buttonimage",declarations:"\
     display:inline;\
     vertical-align: middle;"},{selector:"img.waiting",declarations:"\
     display:inline;\
     cursor: pointer;\
     -webkit-user-select: none;\
     vertical-align: middle;\
     padding-left: 6px; padding-right: 6px;"},{selector:"div.handle",declarations:"\
     display:block;\
     cursor: se-resize;\
     left: 100%;\
     top: 100%;\
     margin-left: -4px;\
     margin-top: -4px;\
     position: absolute;\
     width: 8px; height: 8px;"},{selector:"input.query",declarations:"\
     display:inline-block;\
     background: white;\
     vertical-align: top;\
     border: 1px solid darkgrey; \
     font-size: 13px; \
     padding-top: 1px; padding-bottom: 1px;\
     width: 12em;"},{selector:".hint",declarations:"\
      color: lightgrey;\
      font-style:italic;"},{selector:"select.template",declarations:"\
     display:inline-block;\
     background: white;\
     font-size: 13px; \
     border: 1px solid darkgrey; \
     vertical-align: top;\
     white-space: pre;\
     width: 9em;\
     margin-right: 2px;"},{selector:"optgroup.firstlevelgroup",declarations:"\
      color: blue;"},{selector:".notfirstlevelgroup",declarations:"\
      color: black;"},],},tip:{chrome:[{selector:"div.tip",noAutoParentSelector:true,declarations:"\
     position: absolute;\
     display:block;"},{selector:"div.arrow",declarations:"display:block;"},{selector:"canvas.arrowup",declarations:"\
      display: inline;\
      vertical-align: bottom;"},{selector:"canvas.downup",declarations:"\
      display: inline;\
      vertical-align: top;"},{selector:"div.main",declarations:"display: block;"},{selector:"img.close",declarations:"\
      display: block;\
      -webkit-transition: opacity 0.5s linear;\
      float: right;\
      margin-right: -5px;\
      margin-top: -5px;"},{selector:"div.bar",declarations:"\
     display: table; \
     margin-bottom: 4px;\
     -webkit-user-select: none;\
     width: 100%;"},{selector:"div.row",declarations:"display: table-row;"},{selector:"div.cell",declarations:"\
      display: table-cell;\
      vertical-align: middle;"},{selector:".left",declarations:"\
      padding-right: 16px;\
      text-align: left;"},{selector:".right",declarations:"text-align: right;"},{selector:"span.refresh",declarations:"display: inline;"},{selector:"span.paging",declarations:"\
      display: inline;\
      font-size: x-small;"},{selector:"span.buttoncontainer",declarations:"display: inline;"},{selector:"span.displaytitle",declarations:"\
      display: inline;\
      padding-left: 6px;\
      font-size: small;\
      font-weight: bold"},{selector:"span.displaytitle a:link",declarations:"\
       display: inline;\
       color: #0645AD;\
       text-decoration: none"},{selector:"span.displaytitle img",declarations:"display: inline;"},{selector:"span.brand",declarations:"\
      display: inline;\
      font-size: x-small;"},{selector:".brand a",declarations:"\
       display: inline;\
       font-size: x-small;"},{selector:".brand a:link",declarations:"\
       display: inline;\
       color: #0645AD;\
       text-decoration: none"},{selector:".brand a:visited",declarations:"\
       display: inline;\
       color: #0B0080;\
       text-decoration: none;"},{selector:"span.text",declarations:"\
      display: inline;\
      font-size: x-small;"},{selector:"label.leftlabel",declarations:"\
      display: inline;\
      font-size: x-small;\
      margin-right: 3px;"},{selector:"select.select",declarations:"\
       display: inline-block;\
       border: 1px solid darkgrey;\
       white-space: pre;\
       font-size: x-small;"},{selector:"input.checkbox",declarations:"\
      display: inline-block;\
      vertical-align: text-top;\
      font-size: x-small;\
      margin-right: 0.3em;"},{selector:"img.waiting",declarations:"\
      display: inline;\
      -webkit-user-select: none;\
      vertical-align: middle;\
      padding-left: 3px;"},{selector:"a.button, a.button:link",declarations:"\
      display: inline;\
      -webkit-user-select: none;\
      color: transparent;\
      margin-right: 2px;"},{selector:"img.buttonimage",declarations:"\
      display: inline;\
      vertical-align: middle;"},{selector:"img.flag",declarations:"\
      display: inline;\
      vertical-align: middle;\
      padding-bottom:2px;"},{selector:"img.buttonselected",declarations:"\
      display: inline;\
      background: #dd8;\
      border: 1px solid #bb6;\
      margin: -1px;\
      border-radius: 2px;"},{selector:"div.noticebarscontainer",declarations:"\
     display: block;\
     text-align: left;\
     margin-bottom: 4px;\
     overflow-y: auto;"},{selector:"div.noticebar",declarations:"\
     display: block;\
     background: white;\
     font-size: x-small;\
     border-left: 3px solid lightGrey;\
     margin-bottom: 1px;\
     padding-left: 2px;"},{selector:"div.noticebar img",declarations:"\
      display: inline;\
      margin-right: 1px;\
      vertical-align: text-top;"},{selector:"div.noticebar a",declarations:"\
      display: inline;\
      font-family: sans-serif; \
      font-style: normal; \
      font-variant: normal; \
      font-weight: normal; \
      font-size: x-small;"},{selector:"div.noticebar a:link",declarations:"\
      display: inline;\
      color: #0645AD;\
      text-decoration: none"},{selector:"div.noticebar a:visited",declarations:"\
      display: inline;\
      color: #0B0080;\
      text-decoration: none;"},{selector:"iframe.iframecontent",declarations:"\
     display: inline;\
     width: 100%;"},],chromeiframe:[{selector:"body",declarations:"\
     width:auto; \
     height: auto;"},{selector:"img.icon",declarations:"\
      vertical-align: middle;"},],mediaWiki:[{selector:".infoboxcontainer",declarations:"float: right;\
     background: -webkit-gradient(linear, 0% 0%, 100% 100%, color-stop(0, #EEEeEE), color-stop(0.2, white), color-stop(1, #EEEdEE) );\
     -webkit-box-shadow: rgba(0, 0, 0, 0.2) -5px 5px 8px;\
     margin-left: 10px;\
     margin-bottom: 10px;\
     margin-right:5px;\
     padding-right: 12px;\
     border: 3px solid #9060B0;\
     border-radius: 5px;"},{selector:"div.level2section",is_not_important:true,declarations:"overflow-y: hidden;"},{selector:"hr",declarations:"display: none;"},{selector:".interProject",declarations:"display: none;"},{selector:"div.references li.pseudotarget, sup.reference.pseudotarget, span.citation.pseudotarget",declarations:"background-color: #DDEEFF;"},{selector:".infoboxcontainer .infobox",is_not_important:true,declarations:"\
     float: none;\
     width: 22em;"},{selector:".level2section p",is_not_important:true,declarations:"margin-top: 0px;"},{selector:"#coordinates",declarations:"display: none;"},{selector:"img",is_not_important:true,declarations:"\
     border: medium none ;\
     vertical-align: middle ;"},{selector:".geo-default, .geo-dms, .geo-dec",is_not_important:true,declarations:"display: inline;"},{selector:".geo-nondefault, .geo-multi-punct",is_not_important:true,declarations:"display: none;"},{selector:"li.gallerybox",is_not_important:true,declarations:"\
     background-color: #F9F9F9;\
     border: 2px solid white;\
     display: -moz-inline-box;\
     vertical-align: top;"},{selector:"ul.gallery, li.gallerybox",is_not_important:true,declarations:"display: inline-block;"},{selector:"ul.gallery",is_not_important:true,declarations:"\
     display: block;\
     margin: 2px;\
     padding: 2px;"},{selector:"li.gallerycaption",is_not_important:true,declarations:"\
     display: block;\
     font-weight: bold;\
     text-align: center;\
     word-wrap: break-word;"},{selector:"li.gallerybox div.thumb",is_not_important:true,declarations:"\
     border: 1px solid #CCCCCC;\
     margin: 2px;\
     text-align: center;"},{selector:"div.gallerytext",is_not_important:true,declarations:"\
     font-size: 94%;\
     overflow: hidden;\
     padding: 2px 4px;\
     word-wrap: break-word;"},{selector:"div.tleft",is_not_important:true,declarations:"\
     border: medium none;\
     margin: 0.5em 1.4em 0.8em 0;\
     border-width: 0.5em 1.4em 0.8em 0 ;\
     clear: left;\
     float: left;\
     margin-right: 0.5em ;"},{selector:"div.thumb",is_not_important:true,declarations:"\
     border: medium none;\
     background-color: transparent;\
     border-color: white;\
     border-style: solid;\
     margin-bottom: 0.5em;\
     width: auto;"},{selector:"div.thumbinner",is_not_important:true,declarations:"\
     background-color: #F9F9F9;\
     border: 1px solid #CCCCCC;\
     font-size: 94%!important;\
     overflow: hidden;\
     padding: 3px ;\
     text-align: center;"},{selector:".thumbinner",is_not_important:true,declarations:"min-width: 100px ;"},{selector:"div.thumb img.thumbimage",is_not_important:true,declarations:"background-color: #FFFFFF ;"},{selector:".thumbimage",is_not_important:true,declarations:"border: 1px solid #CCCCCC ;"},{selector:".thumbcaption",is_not_important:true,declarations:"\
     text-align: left ;\
     border: medium none;\
     font-size: 94%;\
     line-height: 1.4em;\
     padding: 3px ;"},{selector:"div.tright",is_not_important:true,declarations:"\
     border: medium none;\
     margin: 0.5em 0 0.8em 1.4em;\
     border-width: 0.5em 0 0.8em 1.4em;\
     clear: right;\
     float: right;"},{selector:"div.magnify",is_not_important:true,declarations:"\
     border: medium none ;\
     float: right;"},{selector:"table.ambox",is_not_important:true,declarations:"\
     background: none repeat scroll 0 0 #FBFBFB;\
     border-color: #AAAAAA #AAAAAA #AAAAAA #1E90FF;\
     border-style: solid;\
     border-width: 1px 1px 1px 10px;\
     margin: 0 10%;"},{selector:"table.ambox-notice",is_not_important:true,declarations:"border-left: 10px solid #1E90FF;"},{selector:"table.ambox-speedy",is_not_important:true,declarations:"\
      background: none repeat scroll 0 0 #FFEEEE;\
      border-left: 10px solid #B22222;"},{selector:"table.ambox-delete",is_not_important:true,declarations:"border-left: 10px solid #B22222;"},{selector:"table.ambox-content",is_not_important:true,declarations:"border-left: 10px solid #F28500;"},{selector:"table.ambox-style",is_not_important:true,declarations:"border-left: 10px solid #F4C430;"},{selector:"table.ambox-move",is_not_important:true,declarations:"border-left: 10px solid #9932CC;"},{selector:"table.ambox-protection",is_not_important:true,declarations:"border-left: 10px solid #BBBBAA;"},{selector:"table.mbox-small",is_not_important:true,declarations:"\
     clear: right;\
     float: right;\
     font-size: 88%;\
     line-height: 1.25em;\
     margin: 4px 0 4px 1em;\
     width: 238px;"},{selector:"table.navbox",is_not_important:true,declarations:"\
     border: 1px solid #AAAAAA;\
     clear: both;\
     font-size: 88%;\
     margin: auto;\
     padding: 1px;\
     text-align: center;\
     width: 100%;"},{selector:".navbox-title, .navbox-abovebelow, table.navbox th",is_not_important:true,declarations:"\
      padding-left: 1em;\
      padding-right: 1em;\
      text-align: center;"},{selector:".navbox-group",is_not_important:true,declarations:"\
      font-weight: bold;\
      padding-left: 1em;\
      padding-right: 1em;\
      text-align: right;\
      white-space: nowrap;"},{selector:".navbox, .navbox-subgroup",is_not_important:true,declarations:"background: none repeat scroll 0 0 #FDFDFD;"},{selector:".navbox-list",is_not_important:true,declarations:"border-color: #FDFDFD;"},{selector:".navbox-title, table.navbox th",is_not_important:true,declarations:"background: none repeat scroll 0 0 #CCCCFF;"},{selector:".navbox-abovebelow, .navbox-group, .navbox-subgroup .navbox-title",is_not_important:true,declarations:"background: none repeat scroll 0 0 #DDDDFF;"},{selector:".navbox-subgroup .navbox-group, .navbox-subgroup .navbox-abovebelow",is_not_important:true,declarations:"background: none repeat scroll 0 0 #E6E6FF;"},{selector:".navbox-even",is_not_important:true,declarations:"background: none repeat scroll 0 0 #F7F7F7;"},{selector:".navbox-odd",is_not_important:true,declarations:"background: none repeat scroll 0 0 transparent;"},{selector:".navbox",is_not_important:true,declarations:"\
      font-size: 88%;\
      font-weight: normal;"},{selector:".navbox .navbar",is_not_important:true,declarations:"font-size: 100%;"},{selector:"table.fmbox",is_not_important:true,declarations:"\
      background: none repeat scroll 0 0 #F9F9F9;\
      border: 1px solid #AAAAAA;\
      clear: both;\
      margin: 0.2em 0;\
      width: 100%;"},{selector:"table.fmbox-system",is_not_important:true,declarations:"background: none repeat scroll 0 0 #F9F9F9;"},{selector:"table.fmbox-warning",is_not_important:true,declarations:"\
      background: none repeat scroll 0 0 #FFDBDB;\
      border: 1px solid #BB7070;"},{selector:"table.fmbox-editnotice",is_not_important:true,declarations:"background: none repeat scroll 0 0 transparent;"},{selector:".editsection",is_not_important:true,declarations:"\
     float: right ;\
     margin-left: 5px ;\
     font-size: 100% ;\
     font-weight: normal ;"},{selector:"div.Boxmerge, div.NavFrame",is_not_important:true,declarations:"\
     border: 1px solid #AAAAAA;\
     border-collapse: collapse;\
     font-size: 95%;\
     margin: 0 0 -1px;\
     overflow: auto;\
     padding: 2px;\
     text-align: center;\
     width: auto;"},{selector:"div.Boxmerge div.NavFrame",is_not_important:true,declarations:"border-style: hidden;"},{selector:"div.NavFrame div.NavHead",is_not_important:true,declarations:"\
     background-position: right center;\
     background-color: #EFEFEF;\
     background-image: url('"+chrome.extension.getURL('img/information-button.png')+"');\
     background-repeat: no-repeat;\
     cursor: pointer;\
     -webkit-user-select: none;\
     font-size: 100%;\
     font-weight: bold;\
     min-height: 1.6em;\
     padding-left: 10px;"},{selector:"div.NavFrame div.NavHead:hover",is_not_important:true,declarations:"background-color: #F6F6F6;"},{selector:"div.NavFrame div.NavHead:active",is_not_important:true,declarations:"background-color: #E3E3E3;"},{selector:"div.NavFrame div.NavContent",is_not_important:true,declarations:"\
     font-size: 100%;\
     display:none;"},{selector:".infobox",is_not_important:true,declarations:"\
     background-color: #F9F9F9;\
     border: 1px solid #AAAAAA;\
     clear: right;\
     color: black;\
     float: right;\
     margin: 0.5em 0 0.5em 1em;\
     padding: 0.2em;"},{selector:".infobox td, .infobox th",is_not_important:true,declarations:"vertical-align: top;"},{selector:".infobox caption",is_not_important:true,declarations:"font-size: larger;"},{selector:".infobox.bordered",is_not_important:true,declarations:"border-collapse: collapse;"},{selector:".infobox.bordered td, .infobox.bordered th",is_not_important:true,declarations:"border: 1px solid #AAAAAA;"},{selector:".infobox.bordered .borderless td, .infobox.bordered .borderless th ",is_not_important:true,declarations:"border: 0 none;"},{selector:".infobox.sisterproject",is_not_important:true,declarations:"\
      font-size: 90%;\
      width: 20em;"},{selector:".infobox.standard-talk",is_not_important:true,declarations:"\
      background-color: #F8EABA;\
      border: 1px solid #C0C090;"},{selector:".infobox.bordered .mergedtoprow td, .infobox.bordered .mergedtoprow th",is_not_important:true,declarations:"\
      border-color: #AAAAAA #AAAAAA -moz-use-text-color -moz-use-text-color;\
      border-style: solid solid none none;\
      border-width: 1px 1px 0 0;"},{selector:".infobox.bordered .mergedrow td, .infobox.bordered .mergedrow th",is_not_important:true,declarations:"\
      border-color: -moz-use-text-color #AAAAAA -moz-use-text-color -moz-use-text-color;\
      border-style: none solid none none;\
      border-width: 0 1px 0 0;"},{selector:".infobox.geography",is_not_important:true,declarations:"\
      border-collapse: collapse;\
      font-size: 90%;\
      line-height: 1.2em;\
      text-align: left;"},{selector:".infobox.geography td, .infobox.geography th",is_not_important:true,declarations:"\
      border-top: 1px solid #AAAAAA;\
      padding: 0.4em 0.6em 0.2em;"},{selector:".infobox.geography .mergedtoprow td, .infobox.geography .mergedtoprow th",is_not_important:true,declarations:"\
      border-top: 1px solid #AAAAAA;\
      display:none;"},{selector:".infobox.geography .mergedrow td, .infobox.geography .mergedrow th",is_not_important:true,declarations:"\
      border: 0 none;\
      padding: 0 0.6em 0.2em;"},{selector:".infobox.geography .mergedbottomrow td, .infobox.geography .mergedbottomrow th",is_not_important:true,declarations:"\
      border-bottom: 1px solid #AAAAAA;\
      border-top: 0 none;\
      padding: 0 0.6em 0.4em;"},{selector:".infobox.geography .maptable td, .infobox.geography .maptable th",is_not_important:true,declarations:"\
      border: 0 none;\
      padding: 0;"},{selector:".infobox_v2, .sinottico",is_not_important:true,declarations:"\
      background: none repeat scroll 0 0 #F9F9F9;\
      border: 1px solid #AAAAAA;\
      clear: right;\
      color: #000000;\
      float: right;\
      font-size: 90%;\
      line-height: 1.1em;\
      margin: 0 0 0.5em 1em;\
      padding: 0.1em;\
      width: 22.5em;"},{selector:".infobox_v2 th",is_not_important:true,declarations:"\
       text-align: left;\
       vertical-align: top;"},{selector:".infobox_v2 .entete, .infobox_v2 .topo, .infobox_v2 .cabecera",is_not_important:true,declarations:"\
       color: #000000;\
       font-size: 150%;\
       font-weight: bolder;\
       height: 45px;\
       line-height: 1.2em;\
       text-align: center;\
       vertical-align: middle;"},{selector:".infobox_v2 .media, .infobox_v2 .midia",is_not_important:true,declarations:"\
       color: #000000;\
       font-weight: bolder;\
       height: 35px;\
       text-align: center;\
       vertical-align: middle;"},{selector:".sinottico th",is_not_important:true,declarations:"\
       background-color: #F2F2F2;\
       padding: 0 0.5em;\
       text-align: right;\
       vertical-align: top;"},{selector:".sinottico td",is_not_important:true,declarations:"\
       padding: 0 0.2em;\
       vertical-align: top;"},{selector:".sinottico_testata th",is_not_important:true,declarations:"\
       background-color: #DEDEDE;\
       font-size: 120%;\
       padding: 0 0.5em;\
       text-align: center;"},{selector:".sinottico_piede",is_not_important:true,declarations:"\
       background: none repeat scroll 0 0 #EFEFEF;\
       font-size: 90%;\
       padding: 0 0.5em;\
       text-align: center;"},{selector:".sinottico_divisione th",is_not_important:true,declarations:"\
       background-color: #EEEEEE;\
       color: black;\
       font-size: 100%;\
       padding: 0 0.5em;\
       text-align: center;"},{selector:"div.mw-geshi",is_not_important:true,declarations:"\
     background-color: #F9F9F9;\
     border: 1px dashed #2F6FAB;\
     color: black;\
     line-height: 1.1em;\
     padding: 1em;"},{selector:"div.mw-geshi div, pre",is_not_important:true,declarations:'font-family: monospace,"Courier New";'},{selector:".toccolours",is_not_important:true,declarations:"\
     background-color: #F9F9F9;\
     border: 1px solid #AAAAAA;\
     font-size: 95%;\
     padding: 5px;"},{selector:".source-javascript",is_not_important:true,declarations:"line-height: normal;"},{selector:".source-javascript li, .source-javascript pre",is_not_important:true,declarations:"line-height: normal; border: 0px none white;"},{selector:".javascript.source-javascript .de1, .javascript.source-javascript .de2",is_not_important:true,declarations:"\
      font: normal normal 1em/1.2em monospace; margin:0; padding:0; background:none; vertical-align:top;"},{selector:".javascript.source-javascript",is_not_important:true,declarations:"font-family:monospace;"},{selector:".javascript.source-javascript .imp",is_not_important:true,declarations:"font-weight: bold; color: red;"},{selector:".javascript.source-javascript li, .javascript.source-javascript .li1",is_not_important:true,declarations:"\
      font-weight: normal; vertical-align:top;"},{selector:".javascript.source-javascript .ln",is_not_important:true,declarations:"width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;"},{selector:".javascript.source-javascript .li2",is_not_important:true,declarations:"font-weight: bold; vertical-align:top;"},{selector:".javascript.source-javascript .kw1",is_not_important:true,declarations:"color: #000066; font-weight: bold;"},{selector:".javascript.source-javascript .kw2",is_not_important:true,declarations:"color: #003366; font-weight: bold;"},{selector:".javascript.source-javascript .kw3",is_not_important:true,declarations:"color: #000066;"},{selector:".javascript.source-javascript .co1",is_not_important:true,declarations:"color: #006600; font-style: italic;"},{selector:".javascript.source-javascript .co2",is_not_important:true,declarations:"color: #009966; font-style: italic;"},{selector:".javascript.source-javascript .coMULTI",is_not_important:true,declarations:"color: #006600; font-style: italic;"},{selector:".javascript.source-javascript .es0",is_not_important:true,declarations:"color: #000099; font-weight: bold;"},{selector:".javascript.source-javascript .br0",is_not_important:true,declarations:"color: #009900;"},{selector:".javascript.source-javascript .sy0",is_not_important:true,declarations:"color: #339933;"},{selector:".javascript.source-javascript .st0",is_not_important:true,declarations:"color: #3366CC;"},{selector:".javascript.source-javascript .nu0",is_not_important:true,declarations:"color: #CC0000;"},{selector:".javascript.source-javascript .me1",is_not_important:true,declarations:"color: #660066;"},{selector:".javascript.source-javascript .ln-xtra, .javascript.source-javascript li.ln-xtra, .javascript.source-javascript div.ln-xtra",is_not_important:true,declarations:"\
      background-color: #ffc;"},{selector:".javascript.source-javascript span.xtra",is_not_important:true,declarations:"display:block;"},{selector:".source-html4strict",is_not_important:true,declarations:"line-height: normal;"},{selector:".source-html4strict li, .source-html4strict pre",is_not_important:true,declarations:"line-height: normal; border: 0px none white;"},{selector:".html4strict.source-html4strict .de1, .html4strict.source-html4strict .de2",is_not_important:true,declarations:"\
      font: normal normal 1em/1.2em monospace; margin:0; padding:0; background:none; vertical-align:top;"},{selector:".html4strict.source-html4strict",is_not_important:true,declarations:"font-family:monospace;"},{selector:".html4strict.source-html4strict .imp",is_not_important:true,declarations:"font-weight: bold; color: red;"},{selector:".html4strict.source-html4strict li, .html4strict.source-html4strict .li1",is_not_important:true,declarations:"\
      font-weight: normal; vertical-align:top;"},{selector:".html4strict.source-html4strict .ln",is_not_important:true,declarations:"width:1px;text-align:right;margin:0;padding:0 2px;vertical-align:top;"},{selector:".html4strict.source-html4strict .li2",is_not_important:true,declarations:"font-weight: bold; vertical-align:top;"},{selector:".html4strict.source-html4strict .kw2",is_not_important:true,declarations:"color: #000000; font-weight: bold;"},{selector:".html4strict.source-html4strict .kw3",is_not_important:true,declarations:"color: #000066;"},{selector:".html4strict.source-html4strict .es0",is_not_important:true,declarations:"color: #000099; font-weight: bold;"},{selector:".html4strict.source-html4strict .br0",is_not_important:true,declarations:"color: #66cc66;"},{selector:".html4strict.source-html4strict .sy0",is_not_important:true,declarations:"color: #66cc66;"},{selector:".html4strict.source-html4strict .st0",is_not_important:true,declarations:"color: #ff0000;"},{selector:".html4strict.source-html4strict .nu0",is_not_important:true,declarations:"color: #cc66cc;"},{selector:".html4strict.source-html4strict .sc-1",is_not_important:true,declarations:"color: #808080; font-style: italic;"},{selector:".html4strict.source-html4strict .sc0",is_not_important:true,declarations:"color: #00bbdd;"},{selector:".html4strict.source-html4strict .sc1",is_not_important:true,declarations:"color: #ddbb00;"},{selector:".html4strict.source-html4strict .sc2",is_not_important:true,declarations:"color: #009900;"},{selector:".html4strict.source-html4strict .ln-xtra, .html4strict.source-html4strict li.ln-xtra, .html4strict.source-html4strict div.ln-xtra",is_not_important:true,declarations:"\
      background-color: #ffc;"},{selector:".html4strict.source-html4strict span.xtra",is_not_important:true,declarations:"display:block;"},{selector:"table.wikitable",is_not_important:true,declarations:"\
     background: none repeat scroll 0 0 #F9F9F9;\
     border: 1px solid #AAAAAA;\
     border-collapse: collapse;\
     margin: 1em 1em 1em 0;"},{selector:".wikitable th, .wikitable td",is_not_important:true,declarations:"\
      border: 1px solid #AAAAAA;\
      padding: 0.2em;"},{selector:".wikitable th",is_not_important:true,declarations:"\
      background: none repeat scroll 0 0 #F2F2F2;\
      text-align: center;"},{selector:".wikitable caption ",is_not_important:true,declarations:"font-weight: bold;"},{selector:"a",is_not_important:true,declarations:"\
     background: none repeat scroll 0 0 transparent;\
     color: #0645AD;\
     text-decoration: none;"},{selector:"a:visited",is_not_important:true,declarations:"color: #0B0080;"},{selector:"a:active",is_not_important:true,declarations:"color: #FAA700;"},{selector:"a:hover",is_not_important:true,declarations:"text-decoration: underline;"},{selector:"a.new",is_not_important:true,declarations:"color: #ba0000;"},{selector:"a.new:visited",is_not_important:true,declarations:"color: #A55858;"},{selector:"a.external",is_not_important:true,declarations:"\
     color: #3366BB;\
     background: url('img/wikimedia/skins-1.5/vector/images/external-link-ltr-icon.png') no-repeat scroll right center transparent;\
     padding: 0 13px 0 0;"},{selector:".checktrans",is_not_important:true,declarations:"background-color: #F0FFF0;"},{selector:"div.floatright, table.floatright",is_not_important:true,declarations:"\
     border: 0 none;\
     clear: right;\
     float: right;\
     margin: 0 0 0.5em 0.5em;\
     position: relative;"},{selector:"h1, h2, h3, h4, h5, h6",is_not_important:true,declarations:"\
     overflow: hidden;\
     width: auto;\
     border-bottom: 1px solid #AAAAAA;\
     color: black;\
     font-weight: normal;\
     margin: 0;\
     padding-bottom: 0.17em;\
     padding-top: 0.5em;"},{selector:"h1",is_not_important:true,declarations:"font-size: 188%;"},{selector:"h1 .editsection",is_not_important:true,declarations:"font-size: 53%;"},{selector:"h2",is_not_important:true,declarations:"font-size: 150%;"},{selector:"h2 .editsection",is_not_important:true,declarations:"font-size: 67%;"},{selector:"h3, h4, h5",is_not_important:true,declarations:"margin-bottom: 0.3em;"},{selector:"h3, h4, h5, h6",is_not_important:true,declarations:"\
     border-bottom: medium none;\
     font-weight: bold;"},{selector:"h3",is_not_important:true,declarations:""},{selector:"h3 .editsection",is_not_important:true,declarations:"\
     font-size: 76% ;\
     font-weight: normal ;"},{selector:"h4",is_not_important:true,declarations:"font-size: 116%;"},{selector:"h4 .editsection",is_not_important:true,declarations:"\
     font-size: 86%;\
     font-weight: normal;"},{selector:"h5",is_not_important:true,declarations:"font-size: 100%;"},{selector:"h5 .editsection",is_not_important:true,declarations:"font-weight: normal;"},{selector:"h6",is_not_important:true,declarations:"font-size: 80%;"},{selector:"h6 .editsection",is_not_important:true,declarations:"\
     font-size: 125%;\
     font-weight: normal;"},],yahooWeb:[{selector:"ol.orderedlist",declarations:"margin-left: 0px;"},{selector:"li.listitem",declarations:"\
     display: list-item;\
     list-style: none;\
     margin-bottom: 1em;"},{selector:"a.header:link",declarations:"\
     color: blue;\
     text-decoration: underline;"},{selector:"div.abstract",declarations:""},{selector:"div.footer",declarations:""},{selector:"span.url",declarations:"\
      color:green;\
      margin-right: 6px;"},{selector:"span.sizedate",declarations:"color:grey;"},],twitter:[{selector:"ol.orderedlist",declarations:"margin-left: 0px;"},{selector:"li.listitem",declarations:"\
     display: list-item;\
     min-height: 48px;\
     margin-bottom: 4px;\
     padding-right: 4px;\
     list-style: none;"},{selector:"li.popular",declarations:"background: white;"},{selector:"li a.avatar",declarations:"\
      float: left;\
      margin-right: 8px;"},{selector:"a.avatar img.avatarimage",declarations:""},{selector:"a.published:link",declarations:"\
      float: right;\
      text-decoration: none;\
      font-style: italic;\
      color:grey;"},{selector:"a.atname",declarations:"\
      font-weight: bold;\
      margin-right: 0.5em;\
      font-size: medium;"},{selector:"span.realname",declarations:"\
      color: grey;\
      margin-right: 0.5em;"},{selector:"img.retweetedimage",declarations:"margin-right: 0.2em;"},{selector:"span.retweets",declarations:"color:grey;"},{selector:"div.tweet",declarations:""},],googleImage:[{selector:"div.result",declarations:"\
     display: inline-table;\
     vertical-align: bottom;\
     margin: 4px;"},{selector:"div.row",declarations:"display: table-row;"},{selector:"div.cell",declarations:"\
       display: table-cell;\
       text-align: center;"},{selector:"div.thumbnail",declarations:"\
        padding-right: 4px; padding-bottom: 4px;"},{selector:"a.thumbnailanchor",declarations:""},{selector:"img.thumbnailimage",declarations:"\
           -webkit-box-shadow: rgba(0,0,0,0.4) 2px 2px 3px;"},{selector:"div.description",declarations:"\
        overflow: hidden;"},{selector:"a.originalfile",declarations:"\
         vertical-align: super;\
         font-size: x-small;"},{selector:"div.dimensions",declarations:"\
        color: grey;\
        overflow: hidden;"},{selector:"div.context",declarations:"overflow: visible;"},{selector:"a.contextanchor:link",declarations:"color: green;"},],},},classVariables:{lookup:{chrome:[{className:"lookup",varNameSuffix:null},{className:"lookupforemost",varNameSuffix:"FOREMOST"},{className:"lookupdocked",varNameSuffix:"DOCKED"},{className:"rowiframe",varNameSuffix:"IFRAME_ROW"},{className:"celliframe",varNameSuffix:"IFRAME_CELL"},{className:"iframe",varNameSuffix:"IFRAME"},{className:"empty",varNameSuffix:"IFRAME_EMPTY"},{className:"bar",varNameSuffix:"TITLEBAR_ROW"},{className:"barforemost",varNameSuffix:"TITLEBAR_ROW_FOREMOST"},{className:"bardocked",varNameSuffix:"TITLEBAR_ROW_DOCKED"},{className:"cell",varNameSuffix:"TITLEBAR_CELL"},{className:"left",varNameSuffix:"TITLEBAR_CELL_LEFT"},{className:"right",varNameSuffix:"TITLEBAR_CELL_RIGHT"},{className:"buttoncontainer",varNameSuffix:"BUTTONCONTAINER"},{className:"button",varNameSuffix:"ANCHORBUTTON"},{className:"buttonimage",varNameSuffix:"BUTTONIMAGE"},{className:"waiting",varNameSuffix:"WAITING"},{className:"handle",varNameSuffix:"HANDLE"},{className:"query",varNameSuffix:"QUERY_INPUT"},{className:"hint",varNameSuffix:"HINT"},{className:"template",varNameSuffix:"TEMPLATE_SELECT"},{className:"firstlevelgroup",varNameSuffix:"TEMPLATE_SELECT_FIRSTLEVELGROUP"},{className:"notfirstlevelgroup",varNameSuffix:"TEMPLATE_SELECT_NOTFIRSTLEVELGROUP"},],},tip:{chrome:[{className:"tip",varNameSuffix:null},{className:"arrow",varNameSuffix:"ARROW"},{className:"arrowup",varNameSuffix:"CANVASARROWUP"},{className:"arrowdown",varNameSuffix:"CANVASARROWDOWN"},{className:"main",varNameSuffix:"MAIN"},{className:"close",varNameSuffix:"CLOSE"},{className:"bar",varNameSuffix:"BAR"},{className:"row",varNameSuffix:"BAR_ROW"},{className:"cell",varNameSuffix:"BAR_CELL"},{className:"left",varNameSuffix:"BAR_CELL_LEFT"},{className:"right",varNameSuffix:"BAR_CELL_RIGHT"},{className:"displaytitle",varNameSuffix:"BAR_DISPLAYTITLE"},{className:"refresh",varNameSuffix:"BAR_REFRESH"},{className:"paging",varNameSuffix:"BAR_PAGING"},{className:"brand",varNameSuffix:"BAR_BRAND"},{className:"text",varNameSuffix:"BAR_TEXT"},{className:"leftlabel",varNameSuffix:"BAR_LEFTLABEL"},{className:"select",varNameSuffix:"BAR_SELECT"},{className:"checkbox",varNameSuffix:"BAR_CHECKBOX"},{className:"waiting",varNameSuffix:"BAR_WAITING"},{className:"buttoncontainer",varNameSuffix:"BAR_BUTTONCONTAINER"},{className:"button",varNameSuffix:"BAR_BUTTON"},{className:"buttonimage",varNameSuffix:"BAR_BUTTONIMAGE"},{className:"flag",varNameSuffix:"BAR_FLAG"},{className:"buttonselected",varNameSuffix:"BAR_BUTTONSELECTED_X",noResetSelector:true},{className:"noticebarscontainer",varNameSuffix:"NOTICEBARSCONTAINER"},{className:"noticebar",varNameSuffix:"NOTICEBAR"},{className:"iframecontent",varNameSuffix:"IFRAMECONTENT"},],chromeiframe:[{tagName:"body"},{className:"icon",varNameSuffix:"CONTENT_ICON"},],mediaWiki:[{className:"infoboxcontainer",varNameSuffix:"CONTENT_MEDIAWIKI_INFOBOXCONTAINER"},{className:"level2section",varNameSuffix:"CONTENT_MEDIAWIKI_LEVEL2SECTION",noResetSelector:true},],yahooWeb:[{className:"orderedlist",varNameSuffix:"CONTENT_YAHOOWEB_ORDEREDLIST"},{className:"listitem",varNameSuffix:"CONTENT_YAHOOWEB_LISTITEM"},{className:"header",varNameSuffix:"CONTENT_YAHOOWEB_HEADER"},{className:"abstract",varNameSuffix:"CONTENT_YAHOOWEB_ABSTRACT"},{className:"footer",varNameSuffix:"CONTENT_YAHOOWEB_FOOTER"},{className:"url",varNameSuffix:"CONTENT_YAHOOWEB_URL"},{className:"sizedate",varNameSuffix:"CONTENT_YAHOOWEB_SIZEDATE"},],twitter:[{className:"orderedlist",varNameSuffix:"CONTENT_TWITTER_ORDEREDLIST"},{className:"listitem",varNameSuffix:"CONTENT_TWITTER_LISTITEM"},{className:"popular",varNameSuffix:"CONTENT_TWITTER_LISTITEM_POPULAR"},{className:"avatar",varNameSuffix:"CONTENT_TWITTER_AVATAR"},{className:"avatarimage",varNameSuffix:"CONTENT_TWITTER_AVATARIMAGE"},{className:"published",varNameSuffix:"CONTENT_TWITTER_PUBLISHED"},{className:"atname",varNameSuffix:"CONTENT_TWITTER_ATNAME"},{className:"realname",varNameSuffix:"CONTENT_TWITTER_REALNAME"},{className:"retweetedimage",varNameSuffix:"CONTENT_TWITTER_RETWEETEDIMAGE"},{className:"retweets",varNameSuffix:"CONTENT_TWITTER_RETWEETS"},{className:"tweet",varNameSuffix:"CONTENT_TWITTER_TWEET"},],googleImage:[{className:"result",varNameSuffix:"CONTENT_IMAGERESULT"},{className:"row",varNameSuffix:"CONTENT_IMAGERESULT_ROW"},{className:"cell",varNameSuffix:"CONTENT_IMAGERESULT_CELL"},{className:"thumbnail",varNameSuffix:"CONTENT_IMAGERESULT_CELL_THUMBNAIL"},{className:"thumbnailanchor",varNameSuffix:"CONTENT_IMAGERESULT_THUMBNAILANCHOR"},{className:"thumbnailimage",varNameSuffix:"CONTENT_IMAGERESULT_THUMBNAILIMAGE"},{className:"description",varNameSuffix:"CONTENT_IMAGERESULT_CELL_DESCRIPTION"},{className:"dimensions",varNameSuffix:"CONTENT_IMAGERESULT_CELL_DIMENSIONS"},{className:"originalfile",varNameSuffix:"CONTENT_IMAGERESULT_ORIGINALFILEANCHOR"},{className:"context",varNameSuffix:"CONTENT_IMAGERESULT_CELL_CONTEXT"},{className:"contextanchor",varNameSuffix:"CONTENT_IMAGERESULT_CONTEXTANCHOR"},],},},classNameSuffixes:{lookup:{chrome:RandomString(6),},tip:{chrome:RandomString(6),chromeiframe:RandomString(6),yahooWeb:RandomString(6),twitter:RandomString(6),googleImage:RandomString(6),},},};