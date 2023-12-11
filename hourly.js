const key = '9022275b769966d839ab137935d7ff43'
const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&q=`

const weatherByHourContainer = document.querySelector('.weather-by-hour__container')

export default async function hourlyFetch(city) {
    try {
      const res = await fetch(`${url}${city}`);
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const data = await res.json();
      hourlyTemp(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, e.g., display a message to the user
    }
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
        weatherByHourImg.alt="weather_icon"

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




