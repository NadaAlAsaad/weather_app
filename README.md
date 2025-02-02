Weather App with City-Specific Background
This project is a simple weather application that fetches weather information for a user-specified city using the OpenWeatherMap API. In addition, it searches for a relevant background image on Unsplash based on the city name. If no image is found or if the API request fails, a fallback background color is applied. The application also includes a language toggle feature to switch between English and Arabic.

Features
Search Weather by City:
Enter a city name and get the current temperature, weather description, humidity, and wind speed.

City-Specific Background:
Automatically updates the background image using Unsplash's search API to reflect the city you searched for. If no image is found, a fallback color is used.

Language Toggle:
Switch between English and Arabic for weather descriptions and labels.

Loading State:
A loading indicator is displayed while fetching data, and it disappears once the data is loaded.

Technologies Used
JavaScript: Handles fetching data from the APIs and updating the DOM.
HTML/CSS: Provides the structure and styling for the app. CSS rules ensure the background image does not repeat and scales appropriately.
Getting Started
Prerequisites
An API key from OpenWeatherMap.
An API key from Unsplash.
