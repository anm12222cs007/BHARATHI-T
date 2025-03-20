const apiKey = '1e3e8f230b6064d27976e41163a82b77'; // Replace with your OpenWeatherMap API key
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(error.message);
        return null;
    }
}

function updateWeatherUI(data) {
    if (!data) return;

    cityElement.textContent = data.name;
    dateElement.textContent = new Date().toLocaleDateString();
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
}

searchButton.addEventListener('click', async () => {
    const city = searchInput.value.trim();
    if (city) {
        const weatherData = await getWeatherData(city);
        updateWeatherUI(weatherData);
    }
});

searchInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            const weatherData = await getWeatherData(city);
            updateWeatherUI(weatherData);
        }
    }
});

// Load default city weather
window.addEventListener('load', async () => {
    const defaultCity = 'CITY NAME';
    const weatherData = await getWeatherData(defaultCity);
    updateWeatherUI(weatherData);
});
