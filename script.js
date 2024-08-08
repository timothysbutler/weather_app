const apiKey = 'd798d28803e5eb33f00ae1532afaaeb9';
const apiGeoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const errorElement = document.getElementById('error-1');
const cityInput = document.getElementById('cityInput');
const stateInput = document.getElementById('stateInput');

searchButton.addEventListener('click', fetchCity);
clearButton.addEventListener('click', clearDisplay);

// Find the Lat and Lon of the input City
function fetchCity () {
    clearDisplay();
    // Grab the input value
    const city = cityInput.value;
    const state = stateInput.value;

    //Check to see if there was an input
    if (city) {
        const url = `${apiGeoUrl}?q=${city},${state},us&appid=${apiKey}`;
        
        // Fetch the url, if there is no response, there was an error
        fetch(url)
            .then(response => response.json())
            // Send the Lat and Lon to find the weather at that location
            .then(data => {
                const lat = data[0].lat;
                const lon = data[0].lon;
                fetchWeather(lat, lon);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                errorElement.textContent = url;
            });
            
    } else {
        errorElement.textContent = 'Please, enter a location.';
    }
}

// Find the weather at the given Lat and Lon
function fetchWeather(lat, lon) {
        const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
        // Check the URL for the weather and get a response, then update HTML page
        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = data.name;

                const temp = tempConvert(data.main.temp);
                temperatureElement.textContent = `${Math.round(temp)}°F`;

                descriptionElement.textContent = data.weather[0].main;

            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
}

// Helper function to convert Kelvin to Fahrenheit
function tempConvert(temp) {
    return (temp - 273.15) * (9 / 5) + 32;
}

// Clear the Search for a new one
function clearDisplay () {
    locationElement.textContent = null;
    temperatureElement.textContent = null;
    descriptionElement.textContent = null;
    errorElement.textContent = null;
}
