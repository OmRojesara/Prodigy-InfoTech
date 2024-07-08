const apiKey = '9496c7c21b3899c08f9cb5df852d0ce8';

function fetchWeather() {
    const location = document.getElementById('location-input').value.trim();
    
    if (location === '') {
        showErrorAlert('Please enter a city name!');
    } else {
        fetchWeatherData(location);
    }
}

function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            changeBackground(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showErrorAlert('City not found! Please enter a valid city name.');
        });
}

function displayWeather(data) {
    const locationElem = document.getElementById('location');
    const temperatureElem = document.getElementById('temperature');
    const conditionsElem = document.getElementById('conditions');
    const weatherIconElem = document.getElementById('weather-icon');

    locationElem.textContent = `${data.name}, ${data.sys.country}`;
    temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
    conditionsElem.textContent = `${data.weather[0].description}`;

    const weatherMain = data.weather[0].main.toLowerCase();
    weatherIconElem.innerHTML = getWeatherIcon(weatherMain);
}

function getWeatherIcon(weather) {
    switch (weather) {
        case 'clear':
            return '<i class="fas fa-sun"></i>';
        case 'clouds':
            return '<i class="fas fa-cloud"></i>';
        case 'rain':
        case 'drizzle':
            return '<i class="fas fa-cloud-rain"></i>';
        case 'thunderstorm':
            return '<i class="fas fa-bolt"></i>';
        case 'snow':
            return '<i class="fas fa-snowflake"></i>';
        default:
            return '<i class="fas fa-question-circle"></i>';
    }
}

function changeBackground(data) {
    const body = document.querySelector('body');
    const weatherMain = data.weather[0].main.toLowerCase();

    switch (weatherMain) {
        case 'clear':
            body.style.backgroundImage = "url('clear.jpg')";
            break;
        case 'clouds':
            body.style.backgroundImage = "url('cloudy.jpg')";
            break;
        case 'rain':
        case 'drizzle':
            body.style.backgroundImage = "url('rainy.jpg')";
            break;
        case 'thunderstorm':
            body.style.backgroundImage = "url('thunderstorm.jpg')";
            break;
        case 'snow':
            body.style.backgroundImage = "url('snow.jpg')";
            break;
        case 'mist':
            body.style.backgroundImage = "url('mist.jpg')";
            break;
        case 'haze':
            body.style.backgroundImage = "url('haze.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('default.jpg')";
    }
}

function fetchCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherByCoords(latitude, longitude);
        }, error => {
            console.error('Error getting current location:', error);
            showErrorAlert('Failed to retrieve your location. Please try again later.');
        });
    } else {
        showErrorAlert('Geolocation is not supported by this browser.');
    }
}

function fetchWeatherByCoords(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            changeBackground(data);
        })
        .catch(error => {
            console.error('Error fetching weather data by coordinates:', error);
            showErrorAlert('Failed to fetch weather data for your current location.');
        });
}

function showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        confirmButtonText: 'OK'
    });
}

document.getElementById('btn-get-weather').addEventListener('click', fetchWeather);
document.getElementById('btn-get-location').addEventListener('click', fetchCurrentLocation);
