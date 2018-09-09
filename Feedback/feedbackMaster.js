var feedbackUrl = "/ms";
$(document).ready(function () {
	GetMyDetails();
	$('.tooltipFeedback').tooltipster({
		contentCloning: false,
		animation: 'grow',
		delay: 150,
		theme: 'tooltipster-punk',
		trigger: 'click',
		contentAsHTML: true,
		interactive: true
	});
	$("#submitMyFeedback1").on("click", function () {
		submitFAQToList("Excellent", $("#txtFeedback1").val());
		$("#feedbackform1").hide();
		$("#tank1").show();
	});
	$("#submitMyFeedback2").on("click", function () {
		submitFAQToList("Average", $("#txtFeedback2").val());
		$("#feedbackform2").hide();
		$("#tank2").show();
	});
	$("#submitMyFeedback3").on("click", function () {
		submitFAQToList("Poor", $("#txtFeedback3").val());
		$("#feedbackform3").hide();
		$("#tank3").show();
	});
}); // end of doc ready

function submitFAQToList(entry, feedtxt) {
	//if(validateEntries() == false) return;	
	var clientContext = new SP.ClientContext(feedbackUrl);
	var oList = clientContext.get_web().get_lists().getByTitle('Feedbacks');
	var itemCreateInfo = new SP.ListItemCreationInformation();
	this.oListItem = oList.addItem(itemCreateInfo);
	oListItem.set_item('Title', $("#meDisplayName").text());
	oListItem.set_item('FeedbackText', feedtxt);
	var feedback = entry;
	oListItem.set_item('Feedback', feedback);
	oListItem.update();
	clientContext.load(oListItem);
	clientContext.executeQueryAsync(Function.createDelegate(this, this.onRegisterSucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onRegisterSucceeded() {
	console.log("done");
	var instances = $.tooltipster.instances();
	$.each(instances, function (i, instance) {
		if (instance.status().open) {
			instance.close();
		}
	});
}

function onQueryFailed(sender, args) {
	alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

function validateEntries() {
	var name = $("#txtFeedback").val().trim();
	//console.log("N = " + name );
	if (name == "") {
		alert("Please enter some feedback...");
		return false;
	}
}

function clearDetailsDialog() {
	$("#txtFeedback").val("");
}

function GetMyDetails() {
	var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
	$.ajax({
		url: siteUrl,
		headers: {
			Accept: "application/json;odata=verbose"
		},
		success: function (data) {
			try {
				$('#mePhone').text(data.d.AccountName);
				$('#meDisplayName').text(data.d.DisplayName);
				var properties = data.d.UserProfileProperties.results;
				console.log(data);
				for (var i = 0; i < properties.length; i++) {
					var property = properties[i];
					if (property.Key == "UserName") {
						$("#meEmail").text(property.Value);
					}
				}
			} catch (err2) {
				alert(JSON.stringify(err2));
			}
		},
		error: function (jQxhr, errorCode, errorThrown) {
			alert(errorThrown);
		}
	});
}