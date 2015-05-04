
var html=(function(){var lcase;if('script'==='SCRIPT'.toLowerCase()){lcase=function(s){return s.toLowerCase();};}else{lcase=function(s){return s.replace(/[A-Z]/g,function(ch){return String.fromCharCode(ch.charCodeAt(0)|32);});};}
var ENTITIES={lt:'<',gt:'>',amp:'&',nbsp:'\240',quot:'"',apos:'\''};var decimalEscapeRe=/^#(\d+)$/;var hexEscapeRe=/^#x([0-9A-Fa-f]+)$/;function lookupEntity(name){name=lcase(name);if(ENTITIES.hasOwnProperty(name)){return ENTITIES[name];}
var m=name.match(decimalEscapeRe);if(m){return String.fromCharCode(parseInt(m[1],10));}else if(!!(m=name.match(hexEscapeRe))){return String.fromCharCode(parseInt(m[1],16));}
return'';}
function decodeOneEntity(_,name){return lookupEntity(name);}
var nulRe=/\0/g;function stripNULs(s){return s.replace(nulRe,'');}
var entityRe=/&(#\d+|#x[0-9A-Fa-f]+|\w+);/g;function unescapeEntities(s){return s.replace(entityRe,decodeOneEntity);}
var ampRe=/&/g;var looseAmpRe=/&([^a-z#]|#(?:[^0-9x]|x(?:[^0-9a-f]|$)|$)|$)/gi;var ltRe=/</g;var gtRe=/>/g;var quotRe=/\"/g;var eqRe=/\=/g;function escapeAttrib(s){return s.replace(ampRe,'&amp;').replace(ltRe,'&lt;').replace(gtRe,'&gt;').replace(quotRe,'&#34;').replace(eqRe,'&#61;');}
function normalizeRCData(rcdata){return rcdata.replace(looseAmpRe,'&amp;$1').replace(ltRe,'&lt;').replace(gtRe,'&gt;');}
var INSIDE_TAG_TOKEN=new RegExp('^\\s*(?:'
+('(?:'
+'([a-z][a-z-]*)'
+('('
+'\\s*=\\s*'
+('('
+'\"[^\"]*\"'
+'|\'[^\']*\''
+'|(?=[a-z][a-z-]*\\s*=)'
+'|[^>\"\'\\s]*'
+')')
+')')+'?'
+')')
+'|(/?>)'
+'|.[^a-z\\s>]*)','i');var OUTSIDE_TAG_TOKEN=new RegExp('^(?:'
+'&(\\#[0-9]+|\\#[x][0-9a-f]+|\\w+);'
+'|<\!--[\\s\\S]*?--\>|<!\\w[^>]*>|<\\?[^>*]*>'
+'|<(/)?([a-z][a-z0-9]*)'
+'|([^<&>]+)'
+'|([<&>]))','i');function makeSaxParser(handler){return function parse(htmlText,param){htmlText=String(htmlText);var htmlLower=null;var inTag=false;var attribs=[];var tagName=void 0;var eflags=void 0;var openTag=void 0;if(handler.startDoc){handler.startDoc(param);}
while(htmlText){var m=htmlText.match(inTag?INSIDE_TAG_TOKEN:OUTSIDE_TAG_TOKEN);htmlText=htmlText.substring(m[0].length);if(inTag){if(m[1]){var attribName=lcase(m[1]);var decodedValue;if(m[2]){var encodedValue=m[3];switch(encodedValue.charCodeAt(0)){case 34:case 39:encodedValue=encodedValue.substring(1,encodedValue.length-1);break;}
decodedValue=unescapeEntities(stripNULs(encodedValue));}else{decodedValue=attribName;}
attribs.push(attribName,decodedValue);}else if(m[4]){if(eflags!==void 0){if(openTag){if(handler.startTag){handler.startTag(tagName,attribs,param);}}else{if(handler.endTag){handler.endTag(tagName,param);}}}
if(openTag&&(eflags&(html4.eflags.CDATA|html4.eflags.RCDATA))){if(htmlLower===null){htmlLower=lcase(htmlText);}else{htmlLower=htmlLower.substring(htmlLower.length-htmlText.length);}
var dataEnd=htmlLower.indexOf('</'+tagName);if(dataEnd<0){dataEnd=htmlText.length;}
if(eflags&html4.eflags.CDATA){if(handler.cdata){handler.cdata(htmlText.substring(0,dataEnd),param);}}else if(handler.rcdata){handler.rcdata(normalizeRCData(htmlText.substring(0,dataEnd)),param);}
htmlText=htmlText.substring(dataEnd);}
tagName=eflags=openTag=void 0;attribs.length=0;inTag=false;}}else{if(m[1]){if(handler.pcdata){handler.pcdata(m[0],param);}}else if(m[3]){openTag=!m[2];inTag=true;tagName=lcase(m[3]);eflags=html4.ELEMENTS.hasOwnProperty(tagName)?html4.ELEMENTS[tagName]:void 0;}else if(m[4]){if(handler.pcdata){handler.pcdata(m[4],param);}}else if(m[5]){if(handler.pcdata){switch(m[5]){case'<':handler.pcdata('&lt;',param);break;case'>':handler.pcdata('&gt;',param);break;default:handler.pcdata('&amp;',param);break;}}}}}
if(handler.endDoc){handler.endDoc(param);}};}
return{normalizeRCData:normalizeRCData,escapeAttrib:escapeAttrib,unescapeEntities:unescapeEntities,makeSaxParser:makeSaxParser};})();html.makeHtmlSanitizer=function(sanitizeAttributes){var stack;var ignoring;return html.makeSaxParser({startDoc:function(_){stack=[];ignoring=false;},startTag:function(tagName,attribs,out){if(ignoring){return;}
if(!html4.ELEMENTS.hasOwnProperty(tagName)){return;}
var eflags=html4.ELEMENTS[tagName];if(eflags&html4.eflags.FOLDABLE){return;}else if(eflags&html4.eflags.UNSAFE){ignoring=!(eflags&html4.eflags.EMPTY);return;}
attribs=sanitizeAttributes(tagName,attribs);if(attribs){if(!(eflags&html4.eflags.EMPTY)){stack.push(tagName);}
out.push('<',tagName);for(var i=0,n=attribs.length;i<n;i+=2){var attribName=attribs[i],value=attribs[i+1];if(value!==null&&value!==void 0){out.push(' ',attribName,'="',html.escapeAttrib(value),'"');}}
out.push('>');}},endTag:function(tagName,out){if(ignoring){ignoring=false;return;}
if(!html4.ELEMENTS.hasOwnProperty(tagName)){return;}
var eflags=html4.ELEMENTS[tagName];if(!(eflags&(html4.eflags.UNSAFE|html4.eflags.EMPTY|html4.eflags.FOLDABLE))){var index;if(eflags&html4.eflags.OPTIONAL_ENDTAG){for(index=stack.length;--index>=0;){var stackEl=stack[index];if(stackEl===tagName){break;}
if(!(html4.ELEMENTS[stackEl]&html4.eflags.OPTIONAL_ENDTAG)){return;}}}else{for(index=stack.length;--index>=0;){if(stack[index]===tagName){break;}}}
if(index<0){return;}
for(var i=stack.length;--i>index;){var stackEl=stack[i];if(!(html4.ELEMENTS[stackEl]&html4.eflags.OPTIONAL_ENDTAG)){out.push('</',stackEl,'>');}}
stack.length=index;out.push('</',tagName,'>');}},pcdata:function(text,out){if(!ignoring){out.push(text);}},rcdata:function(text,out){if(!ignoring){out.push(text);}},cdata:function(text,out){if(!ignoring){out.push(text);}},endDoc:function(out){for(var i=stack.length;--i>=0;){out.push('</',stack[i],'>');}
stack.length=0;}});};function html_sanitize(htmlText,opt_uriPolicy,opt_nmTokenPolicy){var out=[];html.makeHtmlSanitizer(function sanitizeAttribs(tagName,attribs){for(var i=0;i<attribs.length;i+=2){var attribName=attribs[i];var value=attribs[i+1];var atype=null,attribKey;if((attribKey=tagName+'::'+attribName,html4.ATTRIBS.hasOwnProperty(attribKey))||(attribKey='*::'+attribName,html4.ATTRIBS.hasOwnProperty(attribKey))){atype=html4.ATTRIBS[attribKey];}
if(atype!==null){switch(atype){case html4.atype.NONE:break;case html4.atype.SCRIPT:case html4.atype.STYLE:value=null;break;case html4.atype.ID:case html4.atype.IDREF:case html4.atype.IDREFS:case html4.atype.GLOBAL_NAME:case html4.atype.LOCAL_NAME:case html4.atype.CLASSES:case html4.atype.FRAME_TARGET:value=opt_nmTokenPolicy?opt_nmTokenPolicy(value,atype):value;break;case html4.atype.URI:value=opt_uriPolicy&&opt_uriPolicy(value);break;case html4.atype.URI_FRAGMENT:if(value&&'#'===value.charAt(0)){value=opt_nmTokenPolicy?opt_nmTokenPolicy(value,atype):value;if(value){value='#'+value;}}else{value=null;}
break;default:value=null;break;}}else{value=null;}
attribs[i+1]=value;}
return attribs;})(htmlText,out);return out.join('');}