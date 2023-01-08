// Needed Global Variables 
var OpenWeatherAPIRootURL = 'https://api.openweathermap.org';
var OpenWeatherAPIKey = 'ac787e5652c880b90a50b80752a412ca';     // From my J03B account
var searchHistory = [];

// Ease of access for DOM elements - references
var searchArea = document.querySelector('#search-area');
var searchInput = document.querySelector('#search-input');
var searchHistorySection = document.querySelector('#search-history');
var currentSection = document.querySelector('#current');
var forecastSection = document.querySelector('#forecast');

// Function to render the search history to the page
function renderSearchHistory() {
    searchHistorySection.innerHTML = "";

    for (let i = searchHistory.length - 1; i >= 0 ; i--) {
        const srchTerm = searchHistory[i];
        var histBtn = document.createElement('button');

        histBtn.setAttribute('type','button');
        histBtn.setAttribute('aria-controls','current forecast');
        histBtn.setAttribute('data-id', srchTerm);
        histBtn.classList.add('btn', 'btn-secondary', 'w-100', 'my-1', 'history-btn');
        histBtn.textContent = srchTerm;
        searchHistorySection.append(histBtn);
    }
}

// Function to add a newly searched item to the search history and rerender history
function appendSearchToHistory(srch) {
    // If srch doesn't exist at all or already exists in history - don't append anything
    if (searchHistory.indexOf(srch) !== -1) {
        return;
    }
    searchHistory.push(srch);

    localStorage.setItem('j03b-wthr-srch-hstry',JSON.stringify(searchHistory));
    renderSearchHistory();
}

// Function to get Search History from Client
function getSearchHistory() {
    var userHistory = localStorage.getItem('j03b-wthr-srch-hstry');
    if (userHistory) {
        searchHistory = JSON.parse(userHistory);
    }
    renderSearchHistory();
}

// Function to render the current weather block to the page
function renderCurrent(loc,weather) {
    // Define all needed variables from weather API data
    var dt = dayjs().format('MM/DD/YYYY');
    var degFCur = weather.main.temp;
    var degFHigh = weather.main.temp_max;
    var degFLow = weather.main.temp_min;
    var degFFeelsLike = weather.main.feels_like;
    var humidity = weather.main.humidity;
    var windSpeed = weather.wind.speed;
    var weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var weatherIconDesc = weather.weather[0].description;

    // Create DOM elements for the current weather section
    var curWeatherSection = document.createElement('div');
    var secBody = document.createElement('div');
    var cityHeader = document.createElement('h3');
    var iconImg = document.createElement('img');
    var curTempEl = document.createElement('p');
    var tempEl = document.createElement('p');
    var tempFLEl = document.createElement('p');
    var humidEl = document.createElement('p');
    var windEl = document.createElement('p');

    // Create bootstrap classes for the new elements
    curWeatherSection.setAttribute('class', 'card');
    secBody.setAttribute('class', 'card-body');
    cityHeader.setAttribute('class', 'h3 card-title');
    iconImg.setAttribute('src', weatherIcon);
    iconImg.setAttribute('alt', weatherIconDesc);
    curTempEl.setAttribute('class', 'h2');
    tempEl.setAttribute('class', 'my-0');

    // Add all necessary text to elements
    cityHeader.textContent = `${loc} (${dt})`;
    curTempEl.textContent = `${degFCur}°F`;
    tempEl.textContent = `H: ${degFHigh}°F  L: ${degFLow}°F`;
    tempFLEl.textContent = `Feels like: ${degFFeelsLike}°F`;
    humidEl.textContent = `Humidity: ${humidity}%`;
    windEl.textContent = `Wind: ${windSpeed} mph`;

    // Connect DOM elements to display to page
    curWeatherSection.append(secBody);
    cityHeader.append(iconImg);
    secBody.append(cityHeader, curTempEl, tempEl, tempFLEl, humidEl, windEl);
    currentSection.innerHTML = "";
    currentSection.append(curWeatherSection);
}

// Function to render individual forcast modals for each day
function renderForecastModal(forecast) {
    // Define all needed variables from weather API data
    var dt = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
    var degFHigh = forecast.main.temp_max;
    var degFLow = forecast.main.temp_min;
    var humidity = forecast.main.humidity;
    var windSpeed = forecast.wind.speed;
    var weatherIcon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    var weatherIconDesc = forecast.weather[0].description;

    // Create DOM elements for the current weather section
    var modalSec = document.createElement('div');
    var secBody = document.createElement('div');
    var dtHeader = document.createElement('h3');
    var iconImg = document.createElement('img');
    var tempHEl = document.createElement('p');
    var tempLEl = document.createElement('p');
    var humidEl = document.createElement('p');
    var windEl = document.createElement('p');

    // Create bootstrap classes for the new elements
    modalSec.setAttribute('class', 'card col-lg-2 col-5 m-1');
    secBody.setAttribute('class', 'card-body px-0 py-2');
    dtHeader.setAttribute('class', 'h4 card-title');
    iconImg.setAttribute('src', weatherIcon);
    iconImg.setAttribute('alt', weatherIconDesc);
    tempHEl.setAttribute('class', 'h5');
    tempLEl.setAttribute('class', 'h5');

    // Add all necessary text to elements
    dtHeader.textContent = `${dt}`;
    tempHEl.textContent = `H: ${degFHigh}°F`;
    tempLEl.textContent = `L: ${degFLow}°F`;
    humidEl.textContent = `Humidity: ${humidity}%`;
    windEl.textContent = `Wind: ${windSpeed} mph`;

    // Connect DOM elements to display to page
    modalSec.append(secBody);
    dtHeader.append(iconImg);
    secBody.append(dtHeader, tempHEl, tempLEl, humidEl, windEl);
    forecastSection.append(modalSec);
}

// Function to render the 5-day forecast strip to the page
function renderForecast(loc, forecastList) {
    // Get the unix values to validate the right days are displayed
    var dt1 = dayjs().add(1, 'day').startOf('day').unix();
    var dt5 = dayjs().add(6, 'day').startOf('day').unix();
  
    // Create bootstrap DOM elements and set attributes for forecast header
    var headingSection = document.createElement('div');
    var headingTextEl = document.createElement('h4');
    headingSection.setAttribute('class', 'container-fluid row my-2');
    headingTextEl.setAttribute('class', 'col-12');
    headingTextEl.textContent = `5-Day Forecast for ${loc}:`;
    headingSection.append(headingTextEl);
    forecastSection.innerHTML = '';
    forecastSection.append(headingSection);
  
    // Loop through each day of the forecastList input
    for (var i = 0; i < forecastList.length; i++) {
        // Filter the list to only return days between 1 and 5 after today with unix vars
        if ((forecastList[i].dt >= dt1) && (forecastList[i].dt < dt5)) {
            // Then filter to get values for midday (unix)
            if (forecastList[i].dt_txt.slice(11, 13) == "12") {
                renderForecastModal(forecastList[i]);
            }
        }
    }
}

// Function to render the weather items on the page
function renderWeather(loc, weather) {
    renderCurrent(loc, weather.list[0]);
    renderForecast(loc, weather.list);
}

// Function to fetch weather from a location
function getWeather(geoVar) {
    var lat = geoVar.lat;
    var lon = geoVar.lon;
    var apiURL = `${OpenWeatherAPIRootURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${OpenWeatherAPIKey}`;
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (variables) {
            renderWeather(geoVar.name, variables);
            console.log(variables);
        })
        .catch(function (er) {
            console.error(er);
        });
}

// Function to fetch coordinates from the search input
function getCoordinates(srch) {
    var coordinatesURL = `${OpenWeatherAPIRootURL}/geo/1.0/direct?q=${srch}&limit=5&appid=${OpenWeatherAPIKey}` // max limit
    fetch(coordinatesURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (variables) {
            if (!variables[0]) {
                window.alert(`Could not find a location for "${srch}".`);
            }
            else {
                appendSearchToHistory(`${variables[0].name}, ${variables[0].state}, ${variables[0].country}`);
                getWeather(variables[0]);
            }
        })
        .catch(function (er) {
            console.error(er);
        });
}

// Function to handle the form searches
function handleFormSearch(event) {
    var srch = searchInput.value.trim();
    searchInput.value = "";
    // Validation checks - if blank
    if (!srch) {
        return;
    }
    event.preventDefault();
    getCoordinates(srch);
}

// Function to handle the history resubmissions (click history buttons)
function handleFormSubmit(event) {
    var btn = event.target;
    // Make sure the user is pressing a history button
    if (!btn.matches('.history-btn')) {
        return;
    }
    var srch = btn.getAttribute('data-id');
    getCoordinates(srch);
}

// Code we actually start running on page load
getSearchHistory();
searchArea.addEventListener('submit',handleFormSearch);
searchHistorySection.addEventListener('click',handleFormSubmit);