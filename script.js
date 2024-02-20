const apiKey = 'd798d28803e5eb33f00ae1532afaaeb9';
const apiGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', displayText);
clearButton.addEventListener('click', clearDisplay);

function displayText () {
    const location = locationInput.value;
    if (location) {
        locationElement.textContent = location;
        temperatureElement.textContent = location;
        descriptionElement.textContent = location;
    } else {
        alert('Please, enter a location');
    }
}

function clearDisplay () {
    locationElement.textContent = null;
    temperatureElement.textContent = null;
    descriptionElement.textContent = null;
}