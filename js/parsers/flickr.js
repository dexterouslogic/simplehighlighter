var Flickr = {
	AppID: '436508ad99838747018dc4bbafe5efe0',

	ERROR_UNKNOWN: "An unknown error has occurred",
	WARNING_NORESULTS: "We couldn't find anything matching your search <b><<TEXT>></b>",

	Request: function(request/*tipObject, text, tab, msgSet, index, template*/){
		var xhr = new XMLHttpRequest();
	   //"http://api.flickr.com/services/rest/?" +
		var url = "https://secure.flickr.com/services/rest/?" +
			"method=flickr.photos.search&" +
			"api_key=" + Flickr.AppID + "&" +
			"content_type=7&" +  // 7 is all (photos, screenshots, other)
			"sort=" + request.template.options.sort + "&" +
			"media=" + request.template.options.media + "&" +
			"in_gallery=" + (request.template.options.in_gallery == true ? "true" : "false") + "&" +
			"per_page=" + request.template.options.per_page + "&" +
			"page=" + (request.template.sessionData.page ? request.template.sessionData.page : 1) + "&" +			// not in options struct
			"extras=date_uploaded,date_taken,owner_name,original_format,views,media,url_t,url_o&" +	//description,last_update,
			"text=" + encodeURIComponent(request.text);

		xhr.open('GET', url, true);
		xhr.Flickr = this;
		
		xhr.onreadystatechange = function (){
			if (xhr.readyState == 4){
				// html error
				if (xhr.status != 200){
					var errorHTML = (xhr.status == 0 ? Flickr.ERROR_UNKNOWN : xhr.status + " " + xhr.statusText);

					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: {errorHTML: errorHTML} });
					return;
				}
			
				var data = this.Flickr.Parse(xhr.responseXML, request);// text, template, index/*, tipObject*/);
				if(data){
					SendRequestWithTabIfPossible(request.tab, { msg: request.msgSet, index: request.index, templateId: request.template.id, 
						data: data,} );
				}
			}
		};
	
		xhr.send(null);
	},

	Parse: function(xmlDoc, request){
		// check the rsp node's stat attribute
		if(xmlDoc.documentElement.attributes["stat"].value != "ok"){
			if(!xmlDoc.documentElement.firstChild.attributes)
				return({errorHTML:  Flickr.ERROR_UNKNOWN});
			else
				return({errorHTML: xmlDoc.documentElement.firstChild.attributes["code"].value + " " + xmlDoc.documentElement.firstChild.attributes["msg"].value});
		}
		
		// fill out photos info
		var elems = xmlDoc.getElementsByTagName("photos");
		if(elems.length != 1)
			return;
		var page = Number(elems[0].attributes["page"].value);
		var pages = Number(elems[0].attributes["pages"].value);
		var perpage = Number(elems[0].attributes["perpage"].value);
		var total = Number(elems[0].attributes["total"].value);
		
		if(total == 0){
			var format = Flickr.WARNING_NORESULTS.replace("<<TEXT>>", request.text);
			return({warningHTML: format});
		}
		else{
			// process each photo
			var elems = xmlDoc.getElementsByTagName("photo");
			var html = "";
	
			// cant JSON xml so build array
			var arrObjPhotos = [];
			for (var i = 0, photo; photo = elems[i]; i++) {
				var obj = {
					thumbnail: {},
				};
								
				obj.thumbnail.width = parseInt(photo.getAttribute('width_t'));
				obj.thumbnail.height = parseInt(photo.getAttribute('height_t'));
				obj.thumbnail.src = photo.getAttribute('url_t');
				
				obj.title = photo.getAttribute('title');
				obj.datetaken = photo.getAttribute('datetaken') ? new Date(photo.getAttribute('datetaken')) : null;
				obj.ownername = photo.getAttribute('ownername');
				obj.originalformat = photo.getAttribute('originalformat');
				
				if(photo.getAttribute('url_o')){
					obj.originalimage = {
						width: parseInt(photo.getAttribute('width_o')),
						height: parseInt(photo.getAttribute('height_o')),
						src: photo.getAttribute('url_o'),
					}
				}
				
				obj.hrefPhoto = 'http://www.flickr.com/photos/' + photo.getAttribute('owner') + '/' + photo.getAttribute('id');
				obj.hrefProfile = 'http://www.flickr.com/photos/' + photo.getAttribute('owner') + '/';
				
				arrObjPhotos.push(obj);
			}

			return({
				page: page,
				pages: pages, 
				perpage: perpage,
				total: total,
				
				photos: arrObjPhotos,
//				html: html,
			});
		}
	},
};
/*
<photo id="4647994588" owner="42381338@N04" secret="0ab2a4a691" server="4067" farm="5" title="People posing outside a building, probably pioneers on the Olympic Peninsula" ispublic="1" isfriend="0" isfamily="0" datetaken="0000-01-01 00:00:00" datetakengranularity="0" ownername="IMLS DCC" originalsecret="b92ba6816c" originalformat="jpg" lastupdate="1275078239" views="0" media="photo" media_status="ready" url_t="http://farm5.static.flickr.com/4067/4647994588_0ab2a4a691_t.jpg" height_t="72" width_t="100" url_o="http://farm5.static.flickr.com/4067/4647994588_b92ba6816c_o.jpg" height_o="504" width_o="700">
	<description>
		<a href="http://content.lib.washington.edu/u?/ftm,512" rel="nofollow">View source image</a>
		<a href="http://nooksack.lib.washington.edu/cmpweb/copyright.html" rel="nofollow">More information on the commercial rights for this photo</a>.

		<b>Part of</b>& <a href="http://nooksack.lib.washington.edu/cmpweb/index.html" rel="nofollow">Olympic Peninsula Community Museum</a>
		<a href="http://www.lib.washington.edu/" rel="nofollow">University of Washington Libraries</a>.

		<b>Brought to you by</b>& <a href="http://imlsdcc.grainger.uiuc.edu/" rel="nofollow">IMLS Digital Collections and Content</a>.

		Unrestricted access; use with attribution.
	</description>
</photo>					
*/
