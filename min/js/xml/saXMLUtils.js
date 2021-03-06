
var XMLObjectifier=(function(){var _clone=function(obj){if(!!obj&&typeof(obj)==="object"){function F(){}
F.prototype=obj;return new F();}};var isNumeric=function(s){var testStr="";if(!!s&&typeof(s)==="string"){testStr=s;}
var pattern=/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/;return pattern.test(testStr);};var _self={xmlToJSON:function(xdoc){try{if(!xdoc){return null;}
var tmpObj={};tmpObj.typeOf="JSXBObject";var xroot=(xdoc.nodeType==9)?xdoc.documentElement:xdoc;tmpObj.RootName=xroot.nodeName||"";if(xdoc.nodeType==3||xdoc.nodeType==4){return xdoc.nodeValue;}
function trim(s){return s.replace(/^\s+|\s+$/gm,'');}
function formatName(name){var regEx=/-/g;var tName=String(name).replace(regEx,"_");return tName;}
function setAttributes(obj,node){if(node.attributes.length>0){var a=node.attributes.length-1;var attName;obj._attributes=[];do{attName=String(formatName(node.attributes[a].name));obj._attributes.push(attName);obj[attName]=trim(node.attributes[a].value);}while(a--);}}
var _node=(function(){var _self={activate:function(){var nodes=[];if(!!nodes){nodes.getNodesByAttribute=function(attr,obj){if(!!nodes&&nodes.length>0){var out=[];var cNode;var maxLen=nodes.length-1;try{do{cNode=nodes[maxLen];if(cNode[attr]===obj){out.push(cNode);}}while(maxLen--);out.reverse();return out;}catch(e){return null;}
return null;}};nodes.getNodeByAttribute=function(attr,obj){if(!!nodes&&nodes.length>0){var cNode;var maxLen=nodes.length-1;try{do{cNode=nodes[maxLen];if(cNode[attr]===obj){return cNode;}}while(maxLen--);}catch(e){return null;}
return null;}};nodes.getNodesByValue=function(obj){if(!!nodes&&nodes.length>0){var out=[];var cNode;var maxLen=nodes.length-1;try{do{cNode=nodes[maxLen];if(!!cNode.Text&&cNode.Text===obj){out.push(cNode);}}while(maxLen--);return out;}catch(e){return null;}
return null;}};nodes.contains=function(attr,obj){if(!!nodes&&nodes.length>0){var maxLen=nodes.length-1;try{do{if(nodes[maxLen][attr]===obj){return true;}}while(maxLen--);}catch(e){return false;}
return false;}};nodes.indexOf=function(attr,obj){var pos=-1;if(!!nodes&&nodes.length>0){var maxLen=nodes.length-1;try{do{if(nodes[maxLen][attr]===obj){pos=maxLen;}}while(maxLen--);}catch(e){return-1;}
return pos;}};nodes.SortByAttribute=function(col,dir){if(!!nodes&&nodes.length>0){function getValue(pair,idx){var out=pair[idx];out=(bam.validation.isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var tA,tB;tA=getValue(a,col);tB=getValue(b,col);var res=(tA<tB)?-1:(tB<tA)?1:0;if(!!dir){res=(dir.toUpperCase()==="DESC")?(0-res):res;}
return res;}
nodes.sort(sortFn);}};nodes.SortByValue=function(dir){if(!!nodes&&nodes.length>0){function getValue(pair){var out=pair.Text;out=(bam.validation.isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var tA,tB;tA=getValue(a);tB=getValue(b);var res=(tA<tB)?-1:(tB<tA)?1:0;if(!!dir){res=(dir.toUpperCase()==="DESC")?(0-res):res;}
return res;}
nodes.sort(sortFn);}};nodes.SortByNode=function(node,dir){if(!!nodes&&nodes.length>0){function getValue(pair,node){var out=pair[node][0].Text;out=(bam.validation.isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var tA,tB;tA=getValue(a,node);tB=getValue(b,node);var res=(tA<tB)?-1:(tB<tA)?1:0;if(!!dir){res=(dir.toUpperCase()==="DESC")?(0-res):res;}
return res;}
nodes.sort(sortFn);}};}
return nodes;}};return _self;})();var makeNode=function(){var _fn=_clone(_node);return _fn.activate();}
function setHelpers(grpObj){grpObj.getNodeByAttribute=function(attr,obj){if(this.length>0){var cNode;var maxLen=this.length-1;try{do{cNode=this[maxLen];if(cNode[attr]==obj){return cNode;}}while(maxLen--);}catch(e){return false;}
return false;}};grpObj.contains=function(attr,obj){if(this.length>0){var maxLen=this.length-1;try{do{if(this[maxLen][attr]==obj){return true;}}while(maxLen--);}catch(e){return false;}
return false;}};grpObj.indexOf=function(attr,obj){var pos=-1;if(this.length>0){var maxLen=this.length-1;try{do{if(this[maxLen][attr]==obj){pos=maxLen;}}while(maxLen--);}catch(e){return-1;}
return pos;}};grpObj.SortByAttribute=function(col,dir){if(this.length){function getValue(pair,idx){var out=pair[idx];out=(isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var res=0;var tA,tB;tA=getValue(a,col);tB=getValue(b,col);if(tA<tB){res=-1;}else if(tB<tA){res=1;}
if(dir){res=(dir.toUpperCase()=="DESC")?(0-res):res;}
return res;}
this.sort(sortFn);}};grpObj.SortByValue=function(dir){if(this.length){function getValue(pair){var out=pair.Text;out=(isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var res=0;var tA,tB;tA=getValue(a);tB=getValue(b);if(tA<tB){res=-1;}else if(tB<tA){res=1;}
if(dir){res=(dir.toUpperCase()=="DESC")?(0-res):res;}
return res;}
this.sort(sortFn);}};grpObj.SortByNode=function(node,dir){if(this.length){function getValue(pair,node){var out=pair[node][0].Text;out=(isNumeric(out))?parseFloat(out):out;return out;}
function sortFn(a,b){var res=0;var tA,tB;tA=getValue(a,node);tB=getValue(b,node);if(tA<tB){res=-1;}else if(tB<tA){res=1;}
if(dir){res=(dir.toUpperCase()=="DESC")?(0-res):res;}
return res;}
this.sort(sortFn);}};}
function setObjects(obj,node){var elemName;var cnode;var tObj;var cName="";if(!node){return null;}
if(node.attributes.length>0){setAttributes(obj,node);}
obj.Text="";if(node.hasChildNodes()){var nodeCount=node.childNodes.length-1;var n=0;do{cnode=node.childNodes[n];switch(cnode.nodeType){case 1:obj._children=[];elemName=(cnode.localName)?cnode.localName:cnode.baseName;elemName=formatName(elemName);if(cName!=elemName){obj._children.push(elemName);}
if(!obj[elemName]){obj[elemName]=[];}
tObj={};obj[elemName].push(tObj);if(cnode.attributes.length>0){setAttributes(tObj,cnode);}
if(!obj[elemName].contains){setHelpers(obj[elemName]);}
cName=elemName;if(cnode.hasChildNodes()){setObjects(tObj,cnode);}
break;case 3:obj.Text+=trim(cnode.nodeValue);break;case 4:obj.Text+=(cnode.text)?trim(cnode.text):trim(cnode.nodeValue);break;}}while(n++<nodeCount);}}
setObjects(tmpObj,xroot);xdoc=null;xroot=null;return tmpObj;}catch(e){return null;}},textToXML:function(strXML){var xmlDoc=null;try{xmlDoc=(document.all)?new ActiveXObject("Microsoft.XMLDOM"):new DOMParser();xmlDoc.async=false;}catch(e){throw new Error("XML Parser could not be instantiated");}
var out;try{if(document.all){out=(xmlDoc.loadXML(strXML))?xmlDoc:false;}else{out=xmlDoc.parseFromString(strXML,"text/xml");}}catch(e){throw new Error("Error parsing XML string");}
return out;}};return _self;})();