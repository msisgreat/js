$(document).ready(function () {

  var app = new Vue({
    el: '#appvue2',
    data: {
      message: 'Click the button to see feedbacks',
      feedbackList: [],
      sliderContents: []
    },
    methods: {
      getSliders: function () {
        this.message = "Calling the slider function...";
        var endPointUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbyTitle('BootstrapSlider')/items";
        var headers = {
          "accept": "application/json;odata=verbose"
        };
        $.ajax({
          url: endPointUrl,
          type: "GET",
          headers: headers,
          success: data => this.sliderContents = data.d.results
        }); // jquery ajax
        this.message = "Success";
        console.log(this.sliderContents);
      } // getSliders end 
    } // methods end
  }); // vue end
}); // doc ready end