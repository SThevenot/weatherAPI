/** @format */

//declared global variables
var searchBtn = document.querySelector("#searchBtn");
var day0Div = document.querySelector("#day1Div");
var day1Div = document.querySelector("#day2Div");
var day2Div = document.querySelector("#day3Div");
var day3Div = document.querySelector("#day4Div");
var day4Div = document.querySelector("#day5Div");
var stateInput = document.querySelector("#stateSearch");
var cityInput = document.querySelector("#citySearch");
var weatherDataDiv = document.querySelector("#weatherData");
var searchHistory = document.querySelector("#searchHistory");
var count = 0;
var selectedState = "";
var selectedCity = "";
var stateWithSpace = "";
var cityWithSpace = "";

//event listeners
searchBtn.addEventListener("click", localSave, clear);
// historyBtn.addEventListener("click", getWeather);
function clear() {
  count++;
  console.log(count);
  if (count > 1) {
    weatherDataDiv.innerText = "";
  }
}


//saving user input locally
function localSave() {
  selectedCity = cityInput.value;
  cityWithSpace = selectedCity.replace(" ", "%20");
  selectedState = stateInput.value;
  stateWithSpace = selectedState.replace(" ", "%20");
  var savedCity = document.createElement("button");
  savedCity.textContent = selectedCity + ", " + selectedState;
  localStorage.setItem("city", selectedCity);
  localStorage.setItem("state", selectedState);
  getWeather();
  clear();
}


//clearing data when new search is done

//getting weather API data and displaying search history
function getWeather() {
  var cityRetrieved = localStorage.getItem("city");
  var cityDisplay = document.createElement("button");
  cityDisplay.setAttribute("id", "historyBtn");
  cityDisplay.textContent = cityRetrieved;
  searchHistory.append(cityDisplay);
  var requestUrl =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
    cityWithSpace +
    "&country=United%20States&state=" +
    stateWithSpace +
    "&days=5&key=1a04278135bb4d818dd2c70acf62bf3d";
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      if (response.status !== 200) {
        alert("Please make sure there are no typos");
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    cityDisplay = document.createElement("h2");
        cityDisplay.textContent = data.city_name;
        weatherDataDiv.append(cityDisplay);
      stateDisplay = document.createElement("h2");
      stateDisplay.textContent = data.state_code;
      weatherDataDiv.append(stateDisplay);
      var data = data.data;
      for (var i = 0; i < data.length; i++) {
        var cityDate = document.createElement("h3");
        var cityTemp = document.createElement("p");
        var cityWind = document.createElement("p");
        var cityHumidity = document.createElement("p");
        var cityUv = document.createElement("p");
        var weatherDiv = document.createElement("div");
        var hr = document.createElement("hr");
        cityDate.textContent = "data: " + data[i].datetime;
        cityTemp.textContent = "temp: " + data[i].temp;
        cityWind.textContent = "wind speed: " + data[i].wind_gust_spd;
        cityHumidity.textContent = "humidity: " + data[i].dewpt;
        cityUv.textContent = "UV: " + data[i].uv;
        if (Math.floor(data[i].uv) < 2) {
          cityUv.style.backgroundColor = "green";
        }
        if (data[i].uv > 2 || data[i].uv < 8) {
          cityUv.style.backgroundColor = "yellow";
        }
        if (data[i].uv > 8) {
          cityUv.style.backgroundColor = "red";
        }
        weatherDiv.append(hr);
        weatherDataDiv.append(weatherDiv);
        weatherDiv.append(cityDate);
        weatherDiv.append(cityTemp);
        weatherDiv.append(cityWind);
        weatherDiv.append(cityHumidity);
        weatherDiv.append(cityUv);
      }
      return;
    });
}

historyBtn.addEventListener("click", renderSearch);

function renderSearch() {
  weatherDataDiv.innerText = "";
  showEvents(cityWithSpace);
}
//API key - 1a04278135bb4d818dd2c70acf62bf3d
