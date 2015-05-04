
function json2xml(json,options){function convertToXml(json,tagName,parentPath,depth){var suffix=(settings.formatOutput)?'\r\n':'';var indent=(settings.formatOutput)?getIndent(depth):'';var xmlTag=indent+'<'+tagName;var children='';for(var key in json){if(json.hasOwnProperty(key)){var propertyPath=parentPath+key;var propertyName=getPropertyName(parentPath,key);if(settings.ignore.indexOf(propertyPath)==-1){if(typeof(json[key])==="object"&&json[key]instanceof Array){children+=createNodeFromArray(json[key],propertyName,propertyPath+'.',depth+1,suffix);}
else if(typeof(json[key])==='object'){children+=convertToXml(json[key],propertyName,propertyPath+'.',depth+1);}
else{if(settings.nodes.indexOf(propertyPath)!=-1){children+=createTextNode(propertyName,json[key],depth,suffix);}
else{xmlTag+=' '+propertyName+'="'+json[key]+'"';}}}}}
if(children!==''){xmlTag+='>'+suffix+children+indent+'</'+tagName+'>'+suffix;}
else{xmlTag+='/>'+suffix;}
return xmlTag;};function getIndent(depth){var output='';for(var i=0;i<depth;i++){output+=settings.indentString;}
return output;};function getPropertyName(parentPath,name){var index=settings.replace.length;var searchName=parentPath+name;while(index--){if(settings.replace[index].hasOwnProperty(searchName)){return settings.replace[index][searchName];}}
return name;};function createNodeFromArray(source,name,path,depth,suffix){var xmlNode='';if(source.length>0){for(var index in source){if(typeof(source[index])!=='object'){if(source[index]===""){xmlNode+=getIndent(depth)+'<'+name+'/>'+suffix;}
else{var textPrefix=(settings.formatTextNodes)?suffix+getIndent(depth+1):'';var textSuffix=(settings.formatTextNodes)?suffix+getIndent(depth):'';xmlNode+=getIndent(depth)+'<'+name+'>'
+textPrefix+source[index]+textSuffix
+'</'+name+'>'+suffix;}}
else{xmlNode+=convertToXml(source[index],name,path,depth);}}}
else{xmlNode+=getIndent(depth)+'<'+name+'/>'+suffix;}
return xmlNode;};function createTextNode(name,text,parentDepth,suffix){var textPrefix=(settings.formatTextNodes)?suffix+getIndent(parentDepth+2):'';var textSuffix=(settings.formatTextNodes)?suffix+getIndent(parentDepth+1):'';var xmlNode=getIndent(parentDepth+1)+'<'+name+'>'
+textPrefix+text+textSuffix
+'</'+name+'>'+suffix;return xmlNode;};var settings={formatOutput:false,formatTextNodes:false,indentString:'  ',rootTagName:'root',ignore:[],replace:[],nodes:[],exceptions:[]};if(options){for(var k in options){if(k)
settings[k]=options[k];}}
return convertToXml(json,settings.rootTagName,'',0);};