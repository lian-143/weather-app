import { submitBtn } from "./dom.js";
const apiKey = "JNEK7W6VS3FGMZHUXCF6AMJFT";

async function getWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
  const response = await fetch(url);
  const weatherDetails = await response.json();
  return weatherDetails;
}

export { getWeather };
