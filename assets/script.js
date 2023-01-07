// Needed Global Variables 
var searchHistory = [];
var OpenWeatherAPIRootURL = 'https://api.openweathermap.org';
var OpenWeatherAPIKey = 'ac787e5652c880b90a50b80752a412ca';     // From my J03B account

// Ease of access for DOM elements - references
var searchArea = document.querySelector('#search-area');
var searchInput = document.querySelector('#search-input');
var searchHistory = document.querySelector('#search-history');
var currentSection = document.querySelector('#current');
var forecastSection = document.querySelector('#forecast');

// Function to get Search History from Client
function getSearchHistory() {

}

// Function to render the search history to the page
function renderSearchHistory() {

}

// Function to add a newly searched item to the search history and rerender history
function appendSearchToHistory(srch) {


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
function getWeather(loc) {

}

// Function to fetch coordinates from the search input
function getCoordinates(srch) {

}

// Function to handle the form searches
function handleFormSearch(event) {

}

// Function to handle the history resubmissions (click history buttons)
function handleFormSubmit(event) {

}

// Code we actually start running on page load
getSearchHistory();
searchArea.addEventListener('submit',handleFormSearch);
searchHistory.addEventListener('click',handleFormSubmit);