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
const precipitation = document.getElementById("precipitation");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const celciusBtn = document.getElementById("unit-c");
const fahrenheitBtn = document.getElementById("unit-f");
let location = "Caloocan";
let weatherData = null;

submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const locationValue = inputLocation.value.trim();
  if (!locationValue) return;
  let locationCapitalized =
    locationValue.charAt(0).toUpperCase() + locationValue.slice(1);

  await getWeatherData(locationCapitalized);
});

//celcius button
celciusBtn.addEventListener("click", (event) => {
  const temperature = Math.floor(weatherData.currentConditions.temp);
  celciusValue.textContent = `${getCelcius(temperature)}°C`;
  //////////feels like//////
  const feelsLike = weatherData.currentConditions.feelslike;
  feelsLikeCondition.textContent = `${getCelcius(feelsLike)}°C`;
});

fahrenheitBtn.addEventListener("click", (e) => {
  const temperature = Math.floor(weatherData.currentConditions.temp);
  celciusValue.textContent = `${temperature}°F`;
  const feelsLike = weatherData.currentConditions.feelslike;
  feelsLikeCondition.textContent = `${feelsLike}°F`;
});

async function getWeatherData(location) {
  weatherData = await getWeather(location);
  currentConditions(weatherData);
  const temperature = Math.floor(weatherData.currentConditions.temp);
  celciusValue.textContent = `${getCelcius(temperature)}°C`;

  weatherLocation.textContent =
    weatherData.address ?? weatherData.resolvedAddress;
  console.log(weatherData);
  return weatherData;
}

async function currentConditions(weatherData) {
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
  // const splitCondition = condition.split(",");
  weatherCondition.textContent = condition;
  console.log(condition);

  ////////humidity/////
  const humidity = weatherData.currentConditions.humidity;
  detailValueHumidity.textContent = `${Math.floor(humidity)}%`;

  /////////wind//////////////
  const windSpeedValue = Math.floor(weatherData.currentConditions.windspeed);
  windSpeed.textContent = `${windSpeedValue} km/h`;

  ///////////precipitation/////////////
  const precipitationValue = Math.floor(
    weatherData.currentConditions.precipprob,
  );
  precipitation.textContent = `${precipitationValue}%`;

  ////////////visibility/////////////
  const visibilityValue = Math.floor(weatherData.currentConditions.visibility);
  visibility.textContent = `${visibilityValue} km/h`;

  ////////pressure///////////
  const pressureValue = Math.floor(weatherData.currentConditions.pressure);
  pressure.textContent = `${pressureValue} hPA`;

  //////////////sunrise/////////////////
  const sunriseTime = weatherData.currentConditions.sunrise;
  const splitTimeSunrise = time.split(":");
  const [hoursSunrise, minutesSunrise] = splitTimeSunrise;
  const hourValueSunrise = Number(hoursSunrise);
  const minutesValueSunrise = Number(minutesSunrise);
  const timeSunrise = new Date(Date.UTC(hourValueSunrise, minutesValueSunrise));
  const timeContentSunrise = timeSunrise.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
  sunrise.textContent = timeContentSunrise;

  return weatherData;
}

function getCelcius(fahrenheit) {
  // The exact formula is: °C = (°F - 32) × 5/9
  const fahrenheitFormula = Math.floor(((fahrenheit - 32) * 5) / 9);
  return fahrenheitFormula;
}

getWeatherData(location);
export { submitBtn };
