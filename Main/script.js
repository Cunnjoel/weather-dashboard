// f7c1de4bc14295c86f377a66ad57e67d
console.log("hello world");


$(document).ready(function(){
    var searchhistoryContainer = $("#past-searches");
    var searchBtn = $("#search-btn");
    var apiKey = "f7c1de4bc14295c86f377a66ad57e67d"

    searchBtn.submit(function( event ) {
        event.preventDefault();
        console.log(event)
        var formValues = $(this).serializeArray();
        var city = formValues[0].value;
        console.log(formValues, city)
      });
})