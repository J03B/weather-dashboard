# Challenge 6 - Weather Dashboard: Server-Side APIs

## Final Deployed Webpage

[Joe Black's Weather Dashboard](https://j03b.github.io/weather-dashboard/)

## Description

The ultimate goal of this project is to create a dynamic 5-day weather dashboard. The app will run in the browser featuring HTML and CSS, powered by JavaScript code, including server-side and third party APIs. It should have a clean, polished, and responsive user interface.

### Site Specifications

The site should have the following sections: a Header and footer, an aside for new and recent searches, a main body split between the current day's data points (temperature, wind, and humidity at least) and a 5-day forcast with those same points. It must be compatible with various screen sizes.

### Mock Up

![A mock up view of the dashboard, including the header, city search section, and the selected city's weather forecast in the main body.](./assets/06-weather-db-mock-up.png)

### Task Completed

This week's task was to create a weather dashboard from scratch. In this case, I am my own customer, so perfection is my own personal standard.
A dashboard helps showcase several skillsets, including the ability to use third-party APIs to access their data and functionality by making requests with specific parameters to a URL. Since developers are often tasked with retrieving data from another application's API and using it in the context of their own, this weather dashboard will demonstrate that capability.
This Challenge's requirements should help set me up for success by applying the core skills I've recently learned, namely Javascript APIs. The criteria are documented in the Acceptance Criteria section.

#### Exceeding Expectations

To impress clients, I always strive to exceed expectations and improve codebase for long-term sustainability. I ensure everything functions as perfectly as possible. I clean up, organize, and consolidate CSS selectors and properties, organizing them to follow the semantic structure of the HTML elements, and include comments before each element or section of the page.

## Instructions

### Testing the deployed site

To test this project, you can ensure that the deployed site works as expected, including when storing recent city searches. The goals for this project are listed out in the acceptance criteria below. 

### Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

```