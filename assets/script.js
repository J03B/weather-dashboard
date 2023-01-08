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

}

// Function to render individual forcast modals for each day
function renderForecastModal(forecast) {

}

// Function to render the 5-day forecast strip to the page
function renderForecast(forecastList) {

    // Loop through each day of the forecastList input
}

// Function to render the weather items on the page
function renderWeather(loc, weather) {
    renderCurrent(loc, weather[0]);
    renderForecast(weather);
}

// Function to fetch weather from a location
function getWeather(geoVar) {
    var lat = geoVar.lat;
    var lon = geoVar.lon;
    var apiURL = `${OpenWeatherAPIRootURL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OpenWeatherAPIKey}`;
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
                console.log(variables[0]);
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
        console.log("Not a history-btn");
        return;
    }
    var srch = btn.getAttribute('data-id');
    getCoordinates(srch);
}

// Code we actually start running on page load
getSearchHistory();
searchArea.addEventListener('submit',handleFormSearch);
searchHistorySection.addEventListener('click',handleFormSubmit);