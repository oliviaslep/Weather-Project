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
let minutes = now.getMinutes();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

let apiKey = "14255663300c51faf6e34d1dbbf5a674";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${cityInput}`;
  axios
    .get(`${apiUrl}q=${cityInput}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".tempo");
  temperatureElement.innerHTML = `${temperature}°C`;
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
