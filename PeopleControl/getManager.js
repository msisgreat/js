
$(document).ready(function () {    
    $("div[title='Manager']").css("width", "280");
    var attach = $("div[title='Manager']").closest("td");
    $("#manager1Div").detach().prependTo(attach);
    $("#manager1Div").show();

    $(".Manager1").click(function () {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', getManager1);        
    });

}); /// end of doc ready

var inputField;

function getManager1() {
    var pickerDiv = document.getElementById("Applying_x0020_Person_b8d4e590-94d1-4765-a731-b629833ffd42_$ClientPeoplePicker");
    var peoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[pickerDiv.id];
    var theUser = peoplePicker.GetAllUserInfo();
    console.log(theUser);
    
    if (theUser[0]) {
        var theUserId = theUser[0].Key;
        console.log(theUserId);
        getProfile(theUserId);
    } else {
        alert("Please enter the Applying Person");
    }
    inputField = "Manager";
}

function getProfile(user) {
    clientContext = new SP.ClientContext.get_current();
    var peopleManager = new SP.UserProfiles.PeopleManager(clientContext);
    var profilePropertyNames = ["PreferredName", "Manager", "Department", "Title", "AccountName"];
    console.log("profile for: " + user);
    var userProfilePropertiesForUser = new SP.UserProfiles.UserProfilePropertiesForUser(clientContext, user, profilePropertyNames);
    this.userProfileProperties = peopleManager.getUserProfilePropertiesFor(userProfilePropertiesForUser);
    clientContext.executeQueryAsync(onSuccess, onQueryError);
}
///////////  success state ////////////
function onSuccess() {
    console.log(userProfileProperties);
    var manager = userProfileProperties[1];
    manager = manager.replace("i:0#.f|membership|", "");
    console.log("success = " + manager + "accname= " + userProfileProperties[4])
    $("input[title='Manager']").val(userProfileProperties[3]);   
    SetAndResolvePeoplePicker(inputField, manager);
}
////////error state //////////
function onQueryError(sender, args) {
    alert(args.get_message());
}

function SetAndResolvePeoplePicker(fieldName, userAccountName) {
    var controlName = fieldName;
    var peoplePickerDiv = $("[id$='ClientPeoplePicker'][title='" + controlName + "']");
    var peoplePickerEditor = peoplePickerDiv.find("[title='" + controlName + "']");
    var spPeoplePicker = SPClientPeoplePicker.SPClientPeoplePickerDict[peoplePickerDiv[0].id];
    peoplePickerEditor.val(userAccountName);
    spPeoplePicker.AddUnresolvedUserFromEditor(true);
    //disable the field
    spPeoplePicker.SetEnabledState(false);
    //hide the delete/remove use image from the people picker
    $('.sp-peoplepicker-delImage').css('display', 'none');
}