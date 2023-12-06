const key = '9022275b769966d839ab137935d7ff43'
const url = `http://api.openweathermap.org/data/2.5/weather?appid=${key}&units=metric&q=`

const location = document.querySelector('.location-and-date__location')
const date = document.querySelector('.location-and-date__date')
const iconContainer = document.querySelector('.current-temperature__icon-container')
const tempContainer = document.querySelector('.current-temperature__content-container')

async function currentWeatherFetch(city){
    const res = await fetch(url + city)
    const data = await res.json()
    currentTemp(data)
}


function currentTemp(data){
    // ---get city name---
    location.innerHTML = ''
    date.innerHTML = ''
    iconContainer.innerHTML = ''
    tempContainer.innerHTML = ''

    location.innerHTML = data.name + ', '+data.sys.country
    // ----get current date----
    date.innerHTML = moment(new Date(data.dt*1000)).utc().format('dddd Do MMM')
    // ----get current weather icon-----
    const iconId = data.weather[0].icon
	const iconUrl = "https://openweathermap.org/img/w/"+iconId+".png"
    const icon = document.createElement('img')
    icon.setAttribute('class', 'current-temperature__icon')
    icon.src= iconUrl
    iconContainer.appendChild(icon)

    // ----get current temp---
    const currentTemp = document.createElement('div')
    currentTemp.setAttribute('class', 'current-temperature__value')
    currentTemp.innerHTML = Math.round(data.main.temp) + '&deg'
    const currentTempDescription = document.createElement('div')
    currentTempDescription.setAttribute('class', 'current-temperature__summary')
    currentTempDescription.innerHTML = data.weather[0].description
    tempContainer.appendChild(currentTemp)
    tempContainer.appendChild(currentTempDescription)

    currentStatus(data)
}

// currentStatus
function currentStatus(data){
    document.querySelector('#high-temp').innerHTML = Math.ceil(data.main.temp_max) + '&deg'
    document.querySelector('#low-temp').innerHTML = Math.floor(data.main.temp_min) + '&deg'
    document.querySelector('#wind').innerHTML = Math.round(data.wind.speed) + 'kph'
    document.querySelector('#visibility').innerHTML = Math.round(data.visibility / 1000) + ' mi'
    document.querySelector('#sunrise').innerHTML = moment.unix(data.sys.sunrise).utc().add(data.timezone, 's').format('HH:mm')
    document.querySelector('#sunset').innerHTML = moment.unix(data.sys.sunset).utc().add(data.timezone, 's').format('HH:mm')
}

export default currentWeatherFetch