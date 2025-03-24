const apiKey = '1e3e8f230b6064d27976e41163a82b77'; // Get from OpenWeatherMap
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const locationButton = document.querySelector('.location-button');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        updateWeatherUI(data);
        
    } catch (error) {
        alert('Please enter a valid city name');
    }
}

function updateWeatherUI(data) {
    // Update date
    const date = new Date();
    document.querySelector('.date-dayname').textContent = 
        date.toLocaleDateString('en-US', { weekday: 'long' });
    document.querySelector('.date-day').textContent = 
        date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    
    // Update location
    document.querySelector('.location').textContent = `${data.name}, ${data.sys.country}`;
    
    // Update temperature and description
    document.querySelector('.weather-temp').textContent = 
        Math.round(data.main.temp) + '°C';
    document.querySelector('.weather-desc').textContent = 
        data.weather[0].description;
    
    // Update weather details
    document.querySelector('.humidity').textContent = 
        data.main.humidity + ' %';
    document.querySelector('.wind-speed').textContent = 
        data.wind.speed + ' km/h';
    document.querySelector('.feels-like').textContent = 
        Math.round(data.main.feels_like) + '°C';
    document.querySelector('.pressure').textContent = 
        data.main.pressure + ' hPa';
    document.querySelector('.visibility').textContent = 
        (data.visibility / 1000) + ' km';
    
    // Update weather icon
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

async function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`
                );
                const data = await response.json();
                updateWeatherUI(data);
            } catch (error) {
                alert('Error fetching weather data');
            }
        }, error => {
            alert('Unable to get location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
}
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) checkWeather(city);
});

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) checkWeather(city);
    }
});

locationButton.addEventListener('click', getCurrentLocation);
checkWeather('city name');
