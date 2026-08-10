import { getWeather } from "./weatherApi.js";

const submitBtn = document.getElementById("submitBtn");
const city = document.getElementById("weather-location");
const inputLocation = document.getElementById("city");
const weatherLocation = document.getElementById("weather-location");
const celciusValue = document.getElementById("celciusValue");
const dateNow = document.getElementById("dateNow");
const timeToday = document.getElementById("timeToday");
const weatherCondition = document.getElementById("weather-condition");
const feelsLikeCondition = document.getElementById("feelsLike");
const detailValueHumidity = document.getElementById("detailValue");
const windSpeed = document.getElementById("windSpeed");

submitBtn.addEventListener("click", async (event) => {
  const locationValue = inputLocation.value.trim();
  let locationCapitalized =
    locationValue.charAt(0).toUpperCase() + locationValue.slice(1);
  event.preventDefault();

  currentConditions(locationCapitalized);
});

async function currentConditions(location) {
  const weatherData = await getWeather(location);
  console.log(weatherData);
  // location
  weatherLocation.textContent = weatherData.address;
  // temperature
  const temperature = weatherData.currentConditions.temp;
  celciusValue.textContent = getCelcius(temperature);
  // get the date and time
  const dateMonth = weatherData.days[0].datetime;
  const time = weatherData.currentConditions.datetime;
  // split date and month for formatting
  const splitDate = dateMonth.split("-");
  const splitTime = time.split(":");
  const [hours, minutes] = splitTime;
  // change to number
  const hourValue = Number(hours);
  const minutesValue = Number(minutes);
  const [year, month, day] = splitDate;
  const yearNumber = Number(year);
  const monthNumber = Number(month) - 1;
  const dayNumber = Number(day);
  const date = new Date(
    Date.UTC(yearNumber, monthNumber, dayNumber, hourValue, minutesValue),
  );

  // Request a weekday along with a long date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const fullDate = date.toLocaleDateString("en-US", options);
  const timeContent = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  // text content for date and time
  dateNow.textContent = fullDate;
  timeToday.textContent = timeContent;

  /////////weather condition//////////////
  const condition = weatherData.currentConditions.conditions;
  const splitCondition = condition.split(",");
  weatherCondition.textContent = splitCondition[0];
  console.log(splitCondition);

  //////////feels like//////
  const feelsLike = weatherData.currentConditions.feelslike;
  feelsLikeCondition.textContent = `${getCelcius(feelsLike)}°C`;

  ////////humidity/////
  const humidity = weatherData.currentConditions.humidity;
  detailValueHumidity.textContent = `${Math.floor(humidity)}%`;

  /////////wind//////////////
  const windSpeedValue = Math.floor(weatherData.currentConditions.windspeed);
  windSpeed.textContent = `${windSpeedValue} km/h`;
}

function getCelcius(fahrenheit) {
  // celcius
  // The exact formula is: °C = (°F - 32) × 5/9
  const fahrenheitFormula = Math.floor(((fahrenheit - 32) * 5) / 9);
  return fahrenheitFormula;
}

export { submitBtn };
