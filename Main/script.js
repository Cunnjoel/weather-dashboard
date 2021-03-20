
$(document).ready(function(){
    var searchhistoryContainer = $("#past-searches");
    var searchBtn = $("#search-btn");
    var currentWeatherContainer = $("#current-weather")
    var fiveDayForcastContainer = $("#five-day-forcast")
    var apiKey = "";
    var baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
    var baseUrl2 ="https://api.openweathermap.org/data/2.5/forecast?";

    searchBtn.submit(function( event ) {
        event.preventDefault();
        console.log(event)
        var formValues = $(this).serializeArray();
        var city = formValues[0].value;
        //create element with jquery selector
        var searchTermDiv = $("<div class='past-search-term'>");
        searchTermDiv.text(city);
        searchhistoryContainer.append(searchTermDiv);
        console.log(formValues, city)
        //gives value from form
        searchForCurrentCityWeather(city);
        searchForFiveDayForcastWeather(city);
        
    });
    function searchForCurrentCityWeather(city){
        var fullUrl = baseUrl + "q=" + city + "&appid=" + apiKey;
        console.log(fullUrl);
        fetch(fullUrl)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
            var cityName = data.name;
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var weather = data.weather;
            var wind = data.wind;
            console.log(temp, humidity, weather, wind);
            var cityNameDiv = $("<h3 class='city-name'>");
            var tempDiv = $("<div class='temp-name'>");
            var humidityDiv = $("<div class='humidity-name'>");
            var weatherDiv = $("<div class='icon-name'>");
            var windDiv = $("<div class='wind-name'>");
            cityNameDiv.text(cityName);
            tempDiv.text("Temperature: " + temp);
            humidityDiv.text("Humidity: " + humidity + "%");
            windDiv.text("Wind Speed: " + wind.speed + "MPH");


            
            currentWeatherContainer.append(cityNameDiv);
            currentWeatherContainer.append(tempDiv);
            currentWeatherContainer.append(humidityDiv);
            currentWeatherContainer.append(weatherDiv);
            currentWeatherContainer.append(windDiv);
        });
    }
    function searchForFiveDayForcastWeather(city){
        var forecastUrl = baseUrl2 + "q=" + city + "&appid=" + apiKey;
        fetch(forecastUrl).then(function(responseFromOpenWeatherMapUnProcessed) {
            return responseFromOpenWeatherMapUnProcessed.json()
        }).then(function(data){
            console.log("Five Day Forcast", data);
            for (var i = 0; i < data.list.length; i++) {
                //isThreeOClock > -1 if time stored in this variable containes 15:00:00
                var isThreeOClock = data.list[i].dt_txt.search("15:00:00");
                var cityName = data.city.name;
                if (isThreeOClock > -1) {
                    var forcast = data.list[i];
                    var temp = forcast.main.temp;
                    var humidity = forcast.main.humidity;
                    var weather = forcast.weather;
                    var wind = forcast.wind;
                    console.log(forcast, temp, humidity, weather, wind, city);
                    var cityNameDiv = $("<h3 class='city-name'>");
                    var tempDiv = $("<div class='temp-name'>");
                    var humidityDiv = $("<div class='humidity-name'>");
                    var weatherDiv = $("<div class='icon-name'>");
                    var windDiv = $("<div class='wind-name'>");
                    cityNameDiv.text(cityName);
                    tempDiv.text("Temperature: " + temp);
                    humidityDiv.text("Humidity: " + humidity + "%");
                    windDiv.text("Wind Speed: " + wind.speed + "MPH");
                    fiveDayForcastContainer.append(cityName);
                    fiveDayForcastContainer.append(tempDiv);
                    fiveDayForcastContainer.append(humidityDiv);
                    fiveDayForcastContainer.append(windDiv);

                }      
            }
        })
    }
});