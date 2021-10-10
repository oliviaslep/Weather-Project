let now = new Date();
let msec = now.getMilliseconds();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

let apiKey = "14255663300c51faf6e34d1dbbf5a674";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let h5 = document.querySelector(".location");
  h5.innerHTML = `${cityInput}`;
  axios
    .get(`${apiUrl}q=${cityInput}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
                  <div class="day">
                  ${formatDay(forecastDay.dt)} 
                   </div>
                  <img class="icon"  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" alt="Weather icon" width="60"> 
                  <div class="temperature">
                   <span class="temperature-min">
                  ${Math.round(forecastDay.temp.min)}°-
                 </span>
                  <span class="temperature-max">
                  ${Math.round(forecastDay.temp.max)}°
                  </span>
                  </div>
                </div>
              
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "14255663300c51faf6e34d1dbbf5a674";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let temperatureElement = document.querySelector(".tempo");
  temperatureElement.innerHTML = `${temperature}°C`;
  let temperatureEmoji = document.querySelector(".location-icon");
  if (temperature > 23) {
    temperatureEmoji.innerHTML = "☀️";
  } else {
    if (temperature > 5) {
      temperatureEmoji.innerHTML = "☁️";
    } else {
      temperatureEmoji.innerHTML = "❄️";
    }
  }
  let windElement = document.querySelector("#wind-strength");
  windElement.innerHTML = `Wind: ${wind} kmh`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  getForecast(response.data.coord);
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function celsius(event) {
  event.preventDefault();
  let temp = document.querySelector(".tempo");
  temp.innerHTML = 16 + "°C";
}

let cel = document.querySelector(".scalaC");
cel.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector(".tempo");
  temp.innerHTML = 66 + "°F";
}

let fahr = document.querySelector(".scalaF");
fahr.addEventListener("click", fahrenheit);
