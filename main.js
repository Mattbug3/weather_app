import currentWeatherFetch from "./currentWeather.js"
import hourlyFetch  from "./hourly.js"
import dailyFetch from './dailyFetch.js'

const key = '9022275b769966d839ab137935d7ff43'
const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&q=`
const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&q=London`

window.addEventListener('load', async () => {
	const response = await fetch(currentWeatherURL)
	const data = await response.json()
	hourlyFetch(data.name)
	dailyFetch(data.name)
	currentWeatherFetch(data.name)
})


// -------add click event for search box--------
const searchSec = document.querySelector('.search-sec')
const searchBox = document.querySelector('.search-box')
const searchBoxValue = document.querySelector('.search-box')
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
		searchBox.value = ''
		console.log(searchBox.value)
	}
})



