console.log("hello");

// var queryUrl =
//   "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=4c4e0d346a190f1bd944059aca6f817d";

$("#search-button").on("click", function (event) {
  event.preventDefault();
  var cityName = $("#search-bar").val();

  var queryUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=4c4e0d346a190f1bd944059aca6f817d";
  console.log(cityName);
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    console.log(response.weather[0].main)
  });
});
// $.ajax({
//   url: searchCity,
//   method: "GET",
// }).then(function (response) {
//   console.log(response);
// });
