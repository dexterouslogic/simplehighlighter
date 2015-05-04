
BinaryBase64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encodeBinary:function(input){var output="";var bytebuffer;var encodedCharIndexes=new Array(4);var inx=0;var paddingBytes=0;while(inx<input.length){bytebuffer=new Array(3);for(jnx=0;jnx<bytebuffer.length;jnx++)
if(inx<input.length)
bytebuffer[jnx]=input.charCodeAt(inx++)&0xff;else
bytebuffer[jnx]=0;encodedCharIndexes[0]=bytebuffer[0]>>2;encodedCharIndexes[1]=((bytebuffer[0]&0x3)<<4)|(bytebuffer[1]>>4);encodedCharIndexes[2]=((bytebuffer[1]&0x0f)<<2)|(bytebuffer[2]>>6);encodedCharIndexes[3]=bytebuffer[2]&0x3f;paddingBytes=inx-(input.length-1);switch(paddingBytes){case 2:encodedCharIndexes[3]=64;encodedCharIndexes[2]=64;break;case 1:encodedCharIndexes[3]=64;break;default:break;}
for(jnx=0;jnx<encodedCharIndexes.length;jnx++)
output+=this._keyStr.charAt(encodedCharIndexes[jnx]);}
return output;}}
function GetBase64StringFromBinaryURL(url,cb,cbData){var xhr=new XMLHttpRequest();xhr.overrideMimeType('text/plain; charset=x-user-defined');xhr.open('GET',url,true);xhr.cb=cb;xhr.cbData=cbData;xhr.onreadystatechange=function(aEvt){if(xhr.readyState==4){if(xhr.status==200){xhr.cb({status:xhr.status,cbData:xhr.cbData,strBase64:BinaryBase64.encodeBinary(xhr.responseText)});}
else
xhr.cb({status:xhr.status,cbData:xhr.cbData});}};xhr.send(null);}
function AssertException(message){this.message=message;}
AssertException.prototype.toString=function(){return'AssertException: '+this.message;}
function _assert(exp,message){if(!exp){console.log("assert: "+message);}}
String.prototype.RemoveHash=function(){var indexHash=this.lastIndexOf("#");return(indexHash!=-1?this.substring(0,indexHash):this.toString());}
String.prototype.getHostname=function(){var re=new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)','im');return this.match(re)[1].toString();}
String.prototype.capitalize=function(){return this.replace(/(^|\s)([a-z])/g,function(m,p1,p2){return p1+p2.toUpperCase();});}
String.prototype.ellipsis=function(limit){if(limit&&this.length>limit){while(this[limit-1]==' '&limit>=1)
limit--;return this.substr(0,limit)+"...";}
else
return this;}
String.prototype.StripSpaces=function(){return this.replace(/^\s*|\s*$/g,'');}
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');}
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');}
String.prototype.alltrim=function(){return this.replace(/^\s+|\s+$/g,'');}
String.prototype.GetSearchVariables=function(){var out={};var index=this.indexOf('?');if(index!=-1){var search=this.substring(index+1);var query,qs=search;var queries=qs.split(/\&/);for(var i=0;i<queries.length;i++){query=queries[i].split(/\=/);out[query[0]]=(typeof query[1]=='undefined')?null:unescape(query[1]).replace(/\+/g," ");}}
return out;}
String.prototype.encode_utf8=function(){return unescape(encodeURIComponent(this));}
String.prototype.decode_utf8=function(){return decodeURIComponent(escape(this));}
function GetFilename(url,extension)
{if(url){var m=(extension==true?url.toString().match(/.*\/(.+?)$/):url.toString().match(/.*\/(.+?)\./));if(m&&m.length>1)
return m[1];}
return"";}
function RandomString(len,charSet){charSet=charSet||'ABCDEFGHIJKLMNOPQRSTUVWXYZ';var randomString='';for(var i=0;i<len;i++){var randomPoz=Math.floor(Math.random()*charSet.length);randomString+=charSet.substring(randomPoz,randomPoz+1);}
return randomString;}
function _clone(obj){if(obj==null||typeof(obj)!='object')
return obj;var temp=obj.constructor();for(var key in obj)
temp[key]=_clone(obj[key]);return temp;}
function TimeAgo(date,mask){var strAgo="";var no_suffix=false;var secsElapsed=Math.floor((Date.now()-date.getTime())/1000);var sec=secsElapsed%60;var min=Math.floor(secsElapsed/60)%60;var hour=Math.floor(secsElapsed/(60*60))%24;var day=Math.floor(secsElapsed/(60*60*24))%365;var year=Math.floor(secsElapsed/(60*60*24*365));if(mask==null||mask.years==true){if(year>0)
strAgo+=(year+" year"+(year==1?"":"s"));}
if(mask==null||mask.days==true){if(strAgo.length>0)
strAgo+=", ";if(day>0)
strAgo+=(day+" day"+(day==1?"":"s"));else if(day==0&&mask!=null&&mask.today==true){strAgo+="Today";no_suffix=true;}}
if(hour>0&&(mask==null||mask.hours==true)){if(strAgo.length>0)
strAgo+=", ";strAgo+=(hour+" hour"+(hour==1?"":"s"));}
if(min>0&&(mask==null||mask.minutes==true)){if(strAgo.length>0)
strAgo+=", ";strAgo+=(min+" minute"+(min==1?"":"s"));}
if(sec>0&&(mask==null||mask.seconds==true)){if(strAgo.length>0)
strAgo+=", ";strAgo+=(sec+" second"+(sec==1?"":"s"));}
return(strAgo+(no_suffix==true?"":" ago"));}
HTMLElement.prototype.classNameContains=function(arrClassNames,suffixClassName){return this.className.classNameContains(arrClassNames,suffixClassName);}
String.prototype.classNameContains=function(arrClassNames,suffixClassName){var array=this.split(" ");for(var a in array){for(var b in arrClassNames){if(array[a]==(arrClassNames[b]+(suffixClassName?suffixClassName:"")))
return true;}}
return false;}
HTMLElement.prototype.ancestorWithNodeName=function(nodeName){var elem=this;while(elem){if(elem.nodeName==nodeName)
return elem;elem=elem.parentNode;}
return null;}
HTMLElement.prototype.DisableAllChildElements=function(disabled){for(var q=0;q<this.children.length;q++){this.children[q].disabled=disabled;if(this.children[q].children.length>0)
this.children[q].DisableAllChildElements(disabled);}}
HTMLSelectElement.prototype.SortByProperty=function(propertyName){var arrOptions=[];for(var q=0;q<this.options.length;q++)
arrOptions.push(this.options[q]);arrOptions.sort(function(a,b){if(a[propertyName]>b[propertyName])return 1;else if(a[propertyName]<b[propertyName])return-1;else return 0})
var valueSelected=this.value;var innerHTML="";for(var b in arrOptions)
innerHTML+=arrOptions[b].outerHTML;this.innerHTML=innerHTML;this.value=valueSelected;}
function GetScrollBarWidth(){var inner=document.createElement('p');inner.style.width="100%";inner.style.height="200px";var outer=document.createElement('div');outer.style.position="absolute";outer.style.top="0px";outer.style.left="0px";outer.style.visibility="hidden";outer.style.width="200px";outer.style.height="150px";outer.style.overflow="hidden";outer.appendChild(inner);document.body.appendChild(outer);var w1=inner.offsetWidth;outer.style.overflow='scroll';var w2=inner.offsetWidth;if(w1==w2)
w2=outer.clientWidth;document.body.removeChild(outer);return(w1-w2);};function AddCommas(nStr)
{nStr+='';x=nStr.split('.');x1=x[0];x2=x.length>1?'.'+x[1]:'';var rgx=/(\d+)(\d{3})/;while(rgx.test(x1)){x1=x1.replace(rgx,'$1'+','+'$2');}
return x1+x2;}
function _getXPath(node,path){path=path||[];if(node.parentNode){path=_getXPath(node.parentNode,path);}
if(node.previousSibling){var count=1;var sibling=node.previousSibling
do{if(sibling.nodeType==node.nodeType&&sibling.nodeName==node.nodeName){count++;}
sibling=sibling.previousSibling;}while(sibling);if(count==1){count=null;}}else if(node.nextSibling){var sibling=node.nextSibling;do{if(sibling.nodeType==node.nodeType&&sibling.nodeName==node.nodeName){var count=1;sibling=null;}else{var count=null;sibling=sibling.previousSibling;}}while(sibling);}
if(node.nodeType==Node.ELEMENT_NODE)
path.push(node.nodeName.toLowerCase()+(node.id?"[@id='"+node.id+"']":count>0?"["+count+"]":''));else if(node.nodeType==Node.TEXT_NODE)
path.push("text()"+(count>0?"["+count+"]":''));return path;};function _xpathArrayToString(xpathArray){var xpath="";xpathArray.forEach(function(x){xpath+=("/"+x);});return xpath;};