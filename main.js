import currentWeatherFetch from "./currentWeather.js"
import hourlyFetch  from "./hourly.js"
import dailyFetch from './dailyFetch.js'

const key = '9022275b769966d839ab137935d7ff43';
const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&q=London`;

console.log('Request URL:', currentWeatherURL);
window.addEventListener('load', async () => {
    try {
        const response = await fetch(`${currentWeatherURL}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Weather Data:', data);
		hourlyFetch(data.name)
		dailyFetch(data.name)
		currentWeatherFetch(data.name)
    } catch (error) {
        console.error('Error:', error.message);
    }
});


// -------add click event for search box--------
const searchBox = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
searchBtn.addEventListener('click', () => {
    hourlyFetch(searchBox.value)
    dailyFetch(searchBox.value)
    currentWeatherFetch(searchBox.value)
    searchBox.value = ''
    console.log(searchBox.value)
})

// -------add keyboard event for search box--------
document.addEventListener('keydown', (e) => {
	if(e.code === 13 || e.key === 'Enter'){
		hourlyFetch(searchBox.value)
		dailyFetch(searchBox.value)
		currentWeatherFetch(searchBox.value)
        console.log(searchBox.value)
		searchBox.value = ''
		
	}
})



