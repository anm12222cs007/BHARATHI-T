const apiKey = '1e3e8f230b6064d27976e41163a82b77'; // Get from OpenWeatherMap
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

// Weather backgrounds based on conditions
const weatherBackgrounds = {
    'Clear': 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1600',
    'Clouds': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600',
    'Rain': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=1600',
    'Snow': 'https://images.unsplash.com/photo-1516431883659-655d5ef1a668?w=1600',
    'Thunderstorm': 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1600',
    'Mist': 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?w=1600'
};

// Update date and time
function updateDateTime() {
    const now = new Date();
    
    document.querySelector('.date-dayname').textContent = 
        now.toLocaleDateString('en-US', { weekday: 'long' });
    document.querySelector('.date-day').textContent = 
        now.toLocaleDateString('en-US', { 
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
}

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
    // Update location and basic info
    document.querySelector('.location').textContent = 
        `${data.name}, ${data.sys.country}`;
    document.querySelector('.weather-temp').textContent = 
        `${Math.round(data.main.temp)}°C`;
    document.querySelector('.weather-desc').textContent = 
        data.weather[0].description;
    
    // Update weather details
    document.querySelector('.humidity').textContent = 
        `${data.main.humidity} %`;
    document.querySelector('.wind-speed').textContent = 
        `${data.wind.speed} km/h`;
    document.querySelector('.feels-like').textContent = 
        `${Math.round(data.main.feels_like)}°C`;
    document.querySelector('.pressure').textContent = 
        `${data.main.pressure} hPa`;
    document.querySelector('.visibility').textContent = 
        `${(data.visibility / 1000)} km`;
    
    // Update weather icon
    const weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    // Update background based on weather
    updateBackground(data.weather[0].main);
}

function updateBackground(weatherType) {
    const weatherSide = document.querySelector('.weather-side');
    const backgroundUrl = weatherBackgrounds[weatherType] || weatherBackgrounds.Clear;
    weatherSide.style.backgroundImage = `url('${backgroundUrl}')`;
}

// Event Listeners
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

// Initialize
setInterval(updateDateTime, 1000);
updateDateTime();
checkWeather('London');
