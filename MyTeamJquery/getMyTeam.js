
$(function () {
    GetMyTeamDetails();
});

function GetMyTeamDetails() {
    var siteUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetMyProperties";
    console.log(siteUrl);
    $.ajax({
        url: siteUrl,
        headers: {
            Accept: "application/json;odata=verbose"
        },
        success: function (data) {
            try {
                var peers = data.d.Peers.results;
                for (var i = 0; i < peers.length; i++) {
                    $("#peers").append(peers[i]);

                } // end of for loop

                var managers = data.d.ExtendedManagers.results;
                for (var i = 0; i < managers.length; i++) {
                    $("#manager").append(managers[i]);
                } // end of for loop	        
            } catch (err2) {
                alert(JSON.stringify(err2));
            }
        },
        error: function (jQxhr, errorCode, errorThrown) {
            alert(errorThrown);
        }
    });   
}