// Global variables and buttons
var now = moment();
var monthDay = moment().format("dddd, MMMM Do, YYYY");
var button = $("<button></button>");
button.attr("id", "uv");
$("#uv-index").append(button);

// This click function grabs the weather info for the city placed in the search field
$("#search-button").on("click", function (event) {
  event.preventDefault();
  $("#five-day-forecast").empty();

  var searchArray = [];

  var apiKey = "4c4e0d346a190f1bd944059aca6f817d";
  var cityName = $("#search-bar").val();
  searchArray.push(cityName);

  // for loop that adds the recently searched cities
  for (var i = 0; i < searchArray.length; i++) {
    var searchIl = $("<li></li>");
    searchIl.addClass("list-group-item");
    searchIl.attr("id", cityName);
    $("#search-ul").append(searchIl);
    searchIl.text(searchArray[i]);
    console.log(searchArray);
  }
  // weather api
  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=4c4e0d346a190f1bd944059aca6f817d";

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var headerIcon = response.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + headerIcon + ".png";

    $("#icon-header").attr("src", iconUrl);

    // weather info for the main weather box
    var uvIndex = $("#city-header").text(response.name + " " + monthDay);
    $("#temp").text("Temperature (F) " + tempF.toFixed(2));
    $("#humidity").text("Humidity: " + response.main.humidity + "%");
    $("#wind-speed").text("Wind Speed: " + response.wind.speed + "mph");
    var geoUrl =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;
    // UV information being added with colored boxes that depict the UV index
    $.ajax({
      url: geoUrl,
      method: "GET",
    }).then(function (geo) {
      var uvIndex = $("#uv").text(geo.value);
      // var uvColor = $('#uv');
      if (geo.value < 3) {
        button.attr("class", "greenBtn");
      } else if (geo.value > 3 && geo.value < 6) {
        uvColor.attr("class", "yellowBtn");
      } else if (geo.value > 6 && geo.value < 8) {
        button.attr("class", "orangeBtn");
      } else if (geo.value > 8 && geo.value < 11) {
        button.attr("class", "redBtn");
      } else if (geo.value > 11) {
        button.attr("class", "purpleBtn");
      }
    });

    // This api retrieves the information for the 5 day forecast
    var forecastUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      apiKey;
    $.ajax({
      url: forecastUrl,
      method: "GET",
    }).then(function (forecast) {
      var forecastIdArray = [1, 2, 3, 4, 5];
      var fiveDayArray = [1, 2, 3, 4, 5];
      var fiveId = $("five-day-" + forecastIdArray[i]);
      // for loop that generates the weather info for the five day forecast
      for (var i = 5; i < forecast.list.length; i += 8) {
        var fiveDayForecast = forecast.list[i];
        var currentDate = moment(forecast.list[i].dt, "X").format("MM/DD/YYYY");
        var tempF = (fiveDayForecast.main.temp_max - 273.15) * 1.8 + 32;
        var forecastIcon = fiveDayForecast.weather[0].icon;
        var fiveUrl =
          "http://openweathermap.org/img/w/" + forecastIcon + ".png";

        var fiveBox = $("<div></div>");
        fiveBox.addClass("col-2 five-day-box");
        var fiveP = $("<p></p>");
        fiveP.addClass("fiveStyle");
        var fivePDiv = $("<div></div>");
        fiveBox.addClass("col-2 five-day-box");
        var fiveIcon = $("<img>");
        fiveIcon.addClass("fiveStyle");
        fiveIcon.attr("src", fiveUrl);
        var fiveTemp = $("<p></p>");
        fiveTemp.addClass("fiveStyle");
        var fiveHumid = $("<p></p>");
        fiveHumid.addClass("fiveStyle");

        $("#five-day-forecast").append(fiveBox);
        $("#five-day-forecast").append(fivePDiv);
        fiveBox.append(fiveP);
        fiveBox.append(fiveIcon);
        fiveBox.append(fiveTemp);
        fiveBox.append(fiveHumid);

        fiveP.text(currentDate);
        fiveTemp.text("Temp: " + tempF.toFixed(2) + " F");
        fiveIcon.text("placeholder");
        fiveHumid.text("Humidity: " + fiveDayForecast.main.humidity + "%");
      }
    });
  });
});
