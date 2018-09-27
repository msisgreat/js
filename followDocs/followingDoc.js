function GetFollowingDocuments() {
	$("#itemContainerMyDoc").empty();
	$("#myDocProgress").show();

	var followUrl = "https://<sitecollection>/ms/_api/social.following/my/Followed(types=2)";
	$.ajax({
		url: followUrl,
		headers: {
			"accept": "application/json;odata=verbose"
		},
		success: followedRetrieval,
		error: requestFailed
	});
}

function followedRetrieval(data) {
	var htmlSingleResult = "<li><div id='[ID]' class='singleResult'><div class='topResult'><div class='resultDetails'>	<div class='resultIcon'><img class='resultIconImg' src='[URL]'></img></div><div title='[FNAME]' class='resultTitle'><a target='_blank' class='resultTitleUrl' href='[PATH]'>[FNAME]</a></div></div></div><div class='bottomResult'><div class='resultOtherDetails'><div class='resultFolder'><a title='open file folder' class='mytip folderLink' target='_blank' href='[FLDR]'><span class='fa-stack'><i class='fas fa-circle fa-stack-2x'></i><i class='fas fa-folder-open fa-stack-1x fa-inverse fa-inverse'></i></span></a></div><div class='resultShare'><a class='shareLink mytip' title='share via email' href='mailto:?subject=FollowingDocument&body=[PATH]'><span class='fa-stack'><i class='fas fa-circle fa-stack-2x'></i><i class='fas fa-envelope fa-stack-1x fa-inverse'></i></span></a></div><div class='resultCopy'><a title='copy link' copypath='[PATH]' class='mytip copyIcon' href='#'><span class='fa-stack'><i class='fas fa-circle fa-stack-2x'></i><i class='fas fa-clipboard fa-stack-1x fa-inverse'></i></span></a></div></div></div></div></li>"

	var jsonObject = data;
	$.each(jsonObject.d.Followed.results, function (i, singleResult) {
		$("#myDocProgress").hide();
		var str = htmlSingleResult;
		var doc = singleResult;

		var imgPath = GetImagePath(GetFileExtn(doc.Name));

		str = str.replace(new RegExp('\\[ID\\]', 'g'), doc.Id);
		str = str.replace(new RegExp('\\[FNAME\\]', 'g'), doc.Name);
		str = str.replace(new RegExp('\\[PATH\\]', 'g'), doc.Uri);
		str = str.replace(new RegExp('\\[URL\\]', 'g'), imgPath);

		var url = doc.Uri;
		var path = url.substring(0, url.lastIndexOf("/"));
		str = str.replace(new RegExp('\\[FLDR\\]', 'g'), path);

		$('#itemContainerMyDoc').append(str);

	});
	$("div#holderMyDoc").jPages({
		containerID: "itemContainerMyDoc",
		perPage: 6,
		animation: "fadeInDown"
	});

	$(".copyIcon").on("click", function () {
		pathText = $(this).attr("copypath");
		copyTextToClipboard(pathText);
		$().toastmessage('showNoticeToast', 'Copied to clipboard!');
	});
	$('.mytip').tooltipster({
		theme: 'tooltipster-punk',
		animation: 'grow',
		delay: 300,
		interactive: true,
		contentAsHTML: true,
		repositionOnScroll: true,
		side: 'top'
	});
}

function requestFailed(xhr, ajaxOptions, thrownError) {
	$("#myDocProgress").hide();
	alert('Error:\n' + xhr.status + '\n' + thrownError + '\n' + xhr.responseText);
}

function GetFileExtn(fname) {
	return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

function GetImagePath(extn) {
	var imgPath = "";
	switch (extn) {
		case "pptx":
			imgPath = "/_layouts/15/images/icpptx.png";
			break;
		case "ppt":
			imgPath = "/_layouts/15/images/icpptx.png";
			break;
		case "docx":
			imgPath = "/_layouts/15/images/icdocx.png";
			break;
		case "doc":
			imgPath = "/_layouts/15/images/icdocx.png";
			break;
		case "xlsx":
			imgPath = "/_layouts/15/images/icxlsx.png";
			break;
		case "xls":
			imgPath = "/_layouts/15/images/icxlsx.png";
			break;
		case "pdf":
			imgPath = "/_layouts/15/images/icpdf.png";
			break;
		case "xml":
			imgPath = "/_layouts/15/images/icxml.gif";
			break;
		case "xlsm":
			imgPath = "/_layouts/15/images/icxlsm.png";
			break;
		case "csv":
			imgPath = "/_layouts/15/images/icxls.png";
			break;
		case "txt":
			imgPath = "/_layouts/15/images/ictxt.gif";
			break;
		default:
			imgPath = "/_layouts/15/images/icgen.gif";
	}
	return imgPath;
}

function GetEncodedText(keyword) {
	var returnVal = keyword;
	if (keyword != "") {
		var find = '&';
		var re = new RegExp(find, 'g');
		returnVal = returnVal.replace(re, '%26');
	}
	return returnVal;
}

function copyTextToClipboard(text) {
	var textArea = document.createElement("textarea");
	textArea.style.position = 'fixed';
	textArea.style.top = 0;
	textArea.style.left = 0;
	textArea.style.width = '2em';
	textArea.style.height = '2em';
	textArea.style.padding = 0;
	textArea.style.border = 'none';
	textArea.style.outline = 'none';
	textArea.style.boxShadow = 'none';
	textArea.style.background = 'transparent';
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		console.log('Copying text command was ' + msg);
	} catch (err) {
		console.log('Oops, unable to copy');
	}
	document.body.removeChild(textArea);
}