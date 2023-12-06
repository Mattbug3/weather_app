const key = '9022275b769966d839ab137935d7ff43'
const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}&units=metric&q=`

const nextFiveDaysContainer = document.querySelector('.next-5-days__container')

export default async function dailyFetch(city){
    const res = await fetch(url + city)
    const data = await res.json()

    dailyTemp(data)
}

function dailyTemp(data){
	// -------clear daily forecast container every time before appending new child-----
	nextFiveDaysContainer.innerHTML = ''
	for(let i = 0; i < data.list.length; i+=8){
		// --------week days-----
		// -----day name(date)-----
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		const day = new Date(data.list[i].dt * 1000).getDay()
		const today = new Date(data.list[0].dt * 1000).getDay()
		const nextFiveDaysDate = document.createElement('div')
	    nextFiveDaysDate.setAttribute('class', 'next-5-days_date')
		nextFiveDaysDate.innerHTML = day === today ? 'Today' : days[day]

		// -----the dates(label)------
		const nextFiveDaysLabel = document.createElement('div')
		nextFiveDaysLabel.setAttribute('class', 'next-5-days__label')
		nextFiveDaysLabel.innerHTML = moment(new Date(data.list[0].dt * 1000)).utc().format('MM / DD')

		//apeed the day name and the label to dete container
		const nextFiveDaysDateContainer = document.createElement('div')
		nextFiveDaysDateContainer.setAttribute('class', 'next-5-days__date')
		nextFiveDaysDateContainer.appendChild(nextFiveDaysDate)
		nextFiveDaysDateContainer.appendChild(nextFiveDaysLabel)

		// -------weather icon------
		//wheather icon image
		const iconId = data.list[i].weather[0].icon
		const iconUrl = "https://openweathermap.org/img/w/"+iconId+".png"
		const iconImg = document.createElement('img')
		iconImg.setAttribute('class','icon-image')
		iconImg.src=iconUrl
		iconImg.style.width = '50px'
		//append weather description & weather icon to icon container div
		const nextFiveDaysIcon = document.createElement('div')
		nextFiveDaysIcon.setAttribute('class', 'next-5-days__icon')
		nextFiveDaysIcon.appendChild(iconImg)
		

		//-------low temp-------
		// low temp label
		const nextFiveDaysLowLabel = document.createElement('div')
		nextFiveDaysLowLabel.setAttribute('class', 'next-5-days__label')
		nextFiveDaysLowLabel.innerHTML = 'Low'
		// low temp 
		const nextFiveDaysLow = document.createElement('div')
		nextFiveDaysLow.setAttribute('class', 'next-5-days_low')
		nextFiveDaysLow.innerHTML = Math.round(data.list[i].main.temp_min) + '&deg'
        // append low temp label & low temp to the low temp container
        const nextFiveDaysLowTempContainner =  document.createElement('div')
		nextFiveDaysLowTempContainner.setAttribute('class', 'next-5-days__low')
		nextFiveDaysLowTempContainner.appendChild(nextFiveDaysLow)
		nextFiveDaysLowTempContainner.appendChild(nextFiveDaysLowLabel)

		//-------high temp-------
		// high temp label
		const nextFiveDaysHighLabel = document.createElement('div')
		nextFiveDaysHighLabel.setAttribute('class', 'next-5-days__label')
		nextFiveDaysHighLabel.innerHTML = 'High'
		// high temp 
		const nextFiveDaysHigh = document.createElement('div')
		nextFiveDaysHigh.setAttribute('class', 'next-5-days_high')
		nextFiveDaysHigh.innerHTML = Math.round(data.list[i].main.temp_max) + '&deg'
        // append high temp label & high temp to the high temp container
        const nextFiveDaysHighTempContainner =  document.createElement('div')
		nextFiveDaysHighTempContainner.setAttribute('class', 'next-5-days__high')
		nextFiveDaysHighTempContainner.appendChild(nextFiveDaysHigh)
		nextFiveDaysHighTempContainner.appendChild(nextFiveDaysHighLabel)

        //visibility
        const nextFiveDaysVisibility =  document.createElement('div')
		nextFiveDaysVisibility.setAttribute('class', 'next-5-days_rain')
        nextFiveDaysVisibility.innerHTML = Math.round(data.list[i].visibility / 1000)

        const nextFiveDaysVisibilityLabel =  document.createElement('div')
		nextFiveDaysVisibilityLabel.setAttribute('class', 'next-5-days__label')
        nextFiveDaysVisibilityLabel.innerHTML = 'Visibility'

        const nextFiveDaysVisibilityContainer =  document.createElement('div')
		nextFiveDaysVisibilityContainer.setAttribute('class', 'next-5-days__rain') 
        nextFiveDaysVisibilityContainer.appendChild(nextFiveDaysVisibility)
        nextFiveDaysVisibilityContainer.appendChild(nextFiveDaysVisibilityLabel)

		//-----wind speed--------
		//wind label
		const nextFiveDaysWindLabel = document.createElement('div')
		nextFiveDaysWindLabel.setAttribute('class', 'next-5-days__label')
		nextFiveDaysWindLabel.innerHTML = 'Wind'
		//wind spped
		const nextFiveDaysWind = document.createElement('div')
		nextFiveDaysWind.setAttribute('class', 'next-5-days_wind')
		nextFiveDaysWind.innerHTML = data.list[i].wind.speed + ' kmh'
		// append wind label & wind to the wind container
		const nextFiveDaysWindContainer = document.createElement('div')
		nextFiveDaysWindContainer.setAttribute('class', 'next-5-days__wind')
		nextFiveDaysWindContainer.appendChild(nextFiveDaysWind)
		nextFiveDaysWindContainer.appendChild(nextFiveDaysWindLabel)

		// ---------create row container---------
		const nextFiveDaysRow = document.createElement('div')
		nextFiveDaysRow.setAttribute('class', 'next-5-days__row')
		nextFiveDaysRow.appendChild(nextFiveDaysDateContainer)
		nextFiveDaysRow.appendChild(nextFiveDaysIcon)
		nextFiveDaysRow.appendChild(nextFiveDaysLowTempContainner)
		nextFiveDaysRow.appendChild(nextFiveDaysHighTempContainner)
        nextFiveDaysRow.appendChild(nextFiveDaysVisibilityContainer)
		nextFiveDaysRow.appendChild(nextFiveDaysWindContainer)
		
		nextFiveDaysContainer.appendChild(nextFiveDaysRow)
	}
	
}