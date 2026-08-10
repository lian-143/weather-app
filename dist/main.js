/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   submitBtn: () => (/* binding */ submitBtn)\n/* harmony export */ });\n/* harmony import */ var _weatherApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherApi.js */ \"./src/weatherApi.js\");\n\n\nconst submitBtn = document.getElementById(\"submitBtn\");\nconst city = document.getElementById(\"weather-location\");\nconst inputLocation = document.getElementById(\"city\");\nconst weatherLocation = document.getElementById(\"weather-location\");\nconst celciusValue = document.getElementById(\"celciusValue\");\nconst dateNow = document.getElementById(\"dateNow\");\nconst timeToday = document.getElementById(\"timeToday\");\nconst weatherCondition = document.getElementById(\"weather-condition\");\nconst feelsLikeCondition = document.getElementById(\"feelsLike\");\nconst detailValueHumidity = document.getElementById(\"detailValue\");\nconst windSpeed = document.getElementById(\"windSpeed\");\nconst precipitation = document.getElementById(\"precipitation\");\nconst visibility = document.getElementById(\"visibility\");\nconst pressure = document.getElementById(\"pressure\");\nconst sunrise = document.getElementById(\"sunrise\");\nconst celciusBtn = document.getElementById(\"unit-c\");\nconst fahrenheitBtn = document.getElementById(\"unit-f\");\nlet location = \"Caloocan\";\nlet weatherData = null;\n\nsubmitBtn.addEventListener(\"click\", async (event) => {\n  event.preventDefault();\n  const locationValue = inputLocation.value.trim();\n  if (!locationValue) return;\n  let locationCapitalized =\n    locationValue.charAt(0).toUpperCase() + locationValue.slice(1);\n\n  await getWeatherData(locationCapitalized);\n});\n\n//celcius button\ncelciusBtn.addEventListener(\"click\", (event) => {\n  const temperature = Math.floor(weatherData.currentConditions.temp);\n  celciusValue.textContent = `${getCelcius(temperature)}°C`;\n  //////////feels like//////\n  const feelsLike = weatherData.currentConditions.feelslike;\n  feelsLikeCondition.textContent = `${getCelcius(feelsLike)}°C`;\n});\n\nfahrenheitBtn.addEventListener(\"click\", (e) => {\n  const temperature = Math.floor(weatherData.currentConditions.temp);\n  celciusValue.textContent = `${temperature}°F`;\n  const feelsLike = weatherData.currentConditions.feelslike;\n  feelsLikeCondition.textContent = `${feelsLike}°F`;\n});\n\nasync function getWeatherData(location) {\n  weatherData = await (0,_weatherApi_js__WEBPACK_IMPORTED_MODULE_0__.getWeather)(location);\n  currentConditions(weatherData);\n  const temperature = Math.floor(weatherData.currentConditions.temp);\n  celciusValue.textContent = `${getCelcius(temperature)}°C`;\n\n  weatherLocation.textContent =\n    weatherData.address ?? weatherData.resolvedAddress;\n  console.log(weatherData);\n  return weatherData;\n}\n\nasync function currentConditions(weatherData) {\n  // temperature\n  const temperature = weatherData.currentConditions.temp;\n  celciusValue.textContent = getCelcius(temperature);\n  // get the date and time\n  const dateMonth = weatherData.days[0].datetime;\n  const time = weatherData.currentConditions.datetime;\n  // split date and month for formatting\n  const splitDate = dateMonth.split(\"-\");\n  const splitTime = time.split(\":\");\n  const [hours, minutes] = splitTime;\n  // change to number\n  const hourValue = Number(hours);\n  const minutesValue = Number(minutes);\n  const [year, month, day] = splitDate;\n  const yearNumber = Number(year);\n  const monthNumber = Number(month) - 1;\n  const dayNumber = Number(day);\n  const date = new Date(\n    Date.UTC(yearNumber, monthNumber, dayNumber, hourValue, minutesValue),\n  );\n\n  // Request a weekday along with a long date\n  const options = {\n    year: \"numeric\",\n    month: \"long\",\n    day: \"numeric\",\n  };\n\n  const fullDate = date.toLocaleDateString(\"en-US\", options);\n  const timeContent = date.toLocaleTimeString(\"en-US\", {\n    hour: \"2-digit\",\n    minute: \"2-digit\",\n    timeZone: \"UTC\",\n  });\n\n  // text content for date and time\n  dateNow.textContent = fullDate;\n  timeToday.textContent = timeContent;\n\n  /////////weather condition//////////////\n  const condition = weatherData.currentConditions.conditions;\n  // const splitCondition = condition.split(\",\");\n  weatherCondition.textContent = condition;\n  console.log(condition);\n\n  ////////humidity/////\n  const humidity = weatherData.currentConditions.humidity;\n  detailValueHumidity.textContent = `${Math.floor(humidity)}%`;\n\n  /////////wind//////////////\n  const windSpeedValue = Math.floor(weatherData.currentConditions.windspeed);\n  windSpeed.textContent = `${windSpeedValue} km/h`;\n\n  ///////////precipitation/////////////\n  const precipitationValue = Math.floor(\n    weatherData.currentConditions.precipprob,\n  );\n  precipitation.textContent = `${precipitationValue}%`;\n\n  ////////////visibility/////////////\n  const visibilityValue = Math.floor(weatherData.currentConditions.visibility);\n  visibility.textContent = `${visibilityValue} km/h`;\n\n  ////////pressure///////////\n  const pressureValue = Math.floor(weatherData.currentConditions.pressure);\n  pressure.textContent = `${pressureValue} hPA`;\n\n  //////////////sunrise/////////////////\n  const sunriseTime = weatherData.currentConditions.sunrise;\n  const splitTimeSunrise = time.split(\":\");\n  const [hoursSunrise, minutesSunrise] = splitTimeSunrise;\n  const hourValueSunrise = Number(hoursSunrise);\n  const minutesValueSunrise = Number(minutesSunrise);\n  const timeSunrise = new Date(Date.UTC(hourValueSunrise, minutesValueSunrise));\n  const timeContentSunrise = timeSunrise.toLocaleTimeString(\"en-US\", {\n    hour: \"2-digit\",\n    minute: \"2-digit\",\n    timeZone: \"UTC\",\n  });\n  sunrise.textContent = timeContentSunrise;\n\n  return weatherData;\n}\n\nfunction getCelcius(fahrenheit) {\n  // celcius\n  // The exact formula is: °C = (°F - 32) × 5/9\n  const fahrenheitFormula = Math.floor(((fahrenheit - 32) * 5) / 9);\n  return fahrenheitFormula;\n}\n\ngetWeatherData(location);\n\n\n\n//# sourceURL=webpack:///./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/weatherApi.js":
/*!***************************!*\
  !*** ./src/weatherApi.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getWeather: () => (/* binding */ getWeather)\n/* harmony export */ });\n/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ \"./src/dom.js\");\n\nconst apiKey = \"JNEK7W6VS3FGMZHUXCF6AMJFT\";\n\nasync function getWeather(location) {\n  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;\n  const response = await fetch(url);\n  const weatherDetails = await response.json();\n  return weatherDetails;\n}\n\n\n\n\n//# sourceURL=webpack:///./src/weatherApi.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;