/** @format */

var url =
  "https://api.weatherbit.io/v2.0/forecast/daily?city=Springfield&country=United%20States&state=IL&days=5&key=1a04278135bb4d818dd2c70acf62bf3d";
var searchBtn = document.querySelector("#searchBtn");
var weatherDataDiv = document.querySelector("#weatherData");
var stateInput = document.querySelector("#stateSearch").value;

searchBtn.addEventListener("click", localSave);

function localSave() {
    var cityInput = document.querySelector("#citySearch").value;
  window.localStorage.setItem("cityInput", JSON.stringify(cityInput));
  var stateInput = document.querySelector("#stateSearch").value;
  localStorage.setItem("stateInput", JSON.stringify(stateInput));
  getWeather();
}

function getWeather() {
  var cityRetrieved = localStorage.getItem("cityInput");
  var stateRetrieved = localStorage.getItem("stateInput");
  var requestUrl =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
    cityRetrieved +
    "&country=United%20States&state=" +
    stateRetrieved +
    "&days=5&key=1a04278135bb4d818dd2c70acf62bf3d";
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(requestUrl);
      return response.json();
    })
    .then(function (data) {
      console.log(data.data);
      var data = data.data;
      for (var i = 0; i < data.length; i++) {
        var cityDate = document.createElement("h3");
        var cityTemp = document.createElement("p");
        var cityWind = document.createElement("p");
        var cityHumidity = document.createElement("p");
        var cityUv = document.createElement("p");
        cityDate.textContent = data[i].datetime;
        cityTemp.textContent = data[i].temp;
        cityWind.textContent = data[i].wind_gust_spd;
        cityHumidity.textContent = data[i].dewpt;
        cityUv.textContent = data[i].uv;
        weatherDataDiv.append(cityDate);
        weatherDataDiv.append(cityTemp);
        weatherDataDiv.append(cityWind);
        weatherDataDiv.append(cityHumidity);
        weatherDataDiv.append(cityUv);
        console.log(typeof stringCityDate);
      }
    });
}

//API key - 1a04278135bb4d818dd2c70acf62bf3d
