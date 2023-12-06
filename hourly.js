const key = '9022275b769966d839ab137935d7ff43'
const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&q=`

const weatherByHourContainer = document.querySelector('.weather-by-hour__container')

export default async function hourlyFetch(city){
    const res = await fetch(url + city)
    const data = await res.json()

    hourlyTemp(data)
}

function hourlyTemp(data){
    weatherByHourContainer.innerHTML = ''

    for(let i = 0; i < 7; i++){

        let date = new Date(data.list[i].dt*1000)

        // get time(hour)
        const weatherByHour = document.createElement('div')
        weatherByHour.setAttribute('class', 'weather-by-hour__hour')
        weatherByHour.innerHTML = moment(date).utc().format('HH a')

        // get icon image
        const iconId = data.list[i].weather[0].icon
        const iconUrl = "https://openweathermap.org/img/w/"+iconId+".png"
        const weatherByHourImg = document.createElement('img')
        weatherByHourImg.src= iconUrl

        // get hourly temp
        const weatherByHourTmep = document.createElement('div')
        weatherByHourTmep.setAttribute('class', 'weather-by-hour__temp')
        weatherByHourTmep.innerHTML = Math.round(data.list[i].main.temp) + '&deg'

        const weatherByHourItem = document.createElement('div')
        weatherByHourItem.setAttribute('class', 'weather-by-hour__item')

        weatherByHourItem.appendChild(weatherByHour)
        weatherByHourItem.appendChild(weatherByHourImg)
        weatherByHourItem.appendChild(weatherByHourTmep)

        weatherByHourContainer.appendChild(weatherByHourItem)
        
    }
}

