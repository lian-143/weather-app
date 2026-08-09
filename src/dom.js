import { getWeather } from "./weatherApi.js";

const submitBtn = document.getElementById("submitBtn");
const city = document.getElementById("weather-location");
const inputLocation = document.getElementById("city");
const weatherLocation = document.getElementById("weather-location");
const celciusValue = document.getElementById("celciusValue");
const dateNow = document.getElementById("dateNow");
const timeToday = document.getElementById("timeToday");

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
  // celcius
  // The exact formula is: °C = (°F - 32) × 5/9
  const tempCelcius = ((weatherData.currentConditions.temp - 32) * 5) / 9;
  celciusValue.textContent = Math.floor(tempCelcius);
  // get the date and time
  // date
  const dateMonth = weatherData.days[0].datetime;
  const time = weatherData.currentConditions.datetime;
  const splitTime = time.split(":");
  console.log(splitTime);
  const [hours, minutes] = splitTime;
  const hourValue = Number(hours);
  const minutesValue = Number(minutes);
  const splitDate = dateMonth.split("-");
  console.log(splitDate);
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
  dateNow.textContent = fullDate;

  // text content for time
  const timeContent = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });

  timeToday.textContent = timeContent;

  // get the time
  // const time = new Date(weatherData.days[0].hours[0].datetime);
  // console.log(time);
  // console.log(time.toLocaleTimeString("en-US"));

  // toLocaleTimeString() without arguments depends on the implementation,
  // the default locale, and the default time zone
  // console.log(time.toLocaleTimeString());
  // "7:00:00 PM" if run in en-US locale with time zone America/Los_Angeles
}
export { submitBtn };
