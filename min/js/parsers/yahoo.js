
var Yahoo={AppID:'6KyEj2bV34ECBKBQrJlukT_A3fgzwx2fvxEUuE16BwxnRJpqa0xA9oHYx6E0GxCNhBlKjiGH2R0-',ERROR_JSONPARSE:"The server returned an incorrectly formatted response",ERROR_UNKNOWN:"An unknown error has occurred",ERROR_FORMAT_RESPONSECODE:"A <<CODE>> error has occurred",WARNING_NORESULTS:"We did not find results for: <b><<TEXT>></b>",Request:function(request){var xhr=new XMLHttpRequest();var url="http://boss.yahooapis.com/ysearch/"+request.template.options.searchType+"/v1/"+
encodeURIComponent(request.text)+"?"+"format=json&"+"appid="+this.AppID;if(request.template.options.searchType=='web'){url+="&count="+request.template.options.per_page;if(request.template.sessionData.page!=null&&request.template.sessionData.page>0)
url+="&start="+((request.template.sessionData.page-1)*request.template.options.per_page);if(request.template.options.restrictToHost==true&&request.template.sessionData.hostname)
url+="&sites="+request.template.sessionData.hostname;if(request.template.options.longAbstract==true)
url+="&abstract=long";var filter=(request.template.options.no_porn==true?"-porn":"");if(request.template.options.no_hate){if(filter.length>0)
filter+=",";filter+="-hate";}
if(filter.length>0)
url+="&filter="+filter;}
xhr.open('GET',url,true);xhr.Yahoo=this;xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status!=200){var errorHTML=(xhr.status==0?Yahoo.ERROR_UNKNOWN:xhr.status+" "+xhr.statusText);SendRequestWithTabIfPossible(request.tab,{msg:request.msgSet,index:request.index,templateId:request.template.id,data:{errorHTML:errorHTML}});return;}
try{res=JSON.parse(xhr.responseText);if(res==null){var err=new Error();throw err;}}catch(e){SendRequestWithTabIfPossible(request.tab,{msg:request.msgSet,index:request.index,templateId:request.template.id,data:{errorHTML:Yahoo.ERROR_JSONPARSE}});return;}
var data=this.Yahoo.Parse(res.ysearchresponse,request.text,request.template);if(data){SendRequestWithTabIfPossible(request.tab,{msg:request.msgSet,index:request.index,templateId:request.template.id,data:data,});}}};xhr.send(null);},Parse:function(yresp,text,template){if(yresp.responsecode!=200){var format=Yahoo.ERROR_FORMAT_RESPONSECODE.replace("<<CODE>>",yresp.responsecode);return({errorHTML:format});}
var html="";if(template.options.searchType=="web"){if(yresp.totalhits==0||yresp.resultset_web.length==0){var format=Yahoo.WARNING_NORESULTS.replace("<<TEXT>>",text);return({warningHTML:format});}
var page=Math.floor(yresp.start/template.options.per_page)+1;var pages=Math.floor(yresp.totalhits/template.options.per_page)+1;var moreResultsUrl='http://search.yahoo.com/search?p='+encodeURIComponent(text);if(template.options.restrictToHost==true&&template.sessionData.hostname)
moreResultsUrl+="&vs="+template.sessionData.hostname;return({restrictToHost:template.options.restrictToHost,yresp:yresp,moreResultsUrl:moreResultsUrl,page:page,pages:pages});}
else if(template.options.searchType=="spelling"){if(yresp.totalhits>0){for(var q in yresp.resultset_spell){var strong=document.createElement('strong');strong.innerText=yresp.resultset_spell[q].suggestion;html+=strong.outerHTML;}}
return({totalhits:yresp.totalhits,html:html,});}},};