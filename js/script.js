
//запрос у пользователя на определение местоположения
if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
      function (position) {
         let latPos = position.coords.latitude
         let lonPos = position.coords.longitude
         getGeoPositionCity(latPos, lonPos)
      },
      function (error) {
         //здесь должно открываться окно браузера с просьбой разрешить определение местоположения  
         getCityByIp()
            .then((regionCity) => {
               getWeatherByCity(regionCity)//вызвали фукнцию и передали город
                  .then((showName) => {
                     const showDataDescription = showName.weather[0].description
                     const showDataName = showName.name
                     const showTempWeather = Math.round(showName.main.temp) - 273 + '℃'
                     //const showDataIcon = showName.weather[0].icon
                     //const showDataIcon = `<img src="https://openweathermap.org/img/wn/${showName.weather[0].icon}@2x.png">`
                     reDrawBlockWeath(showDataName, showDataDescription, showTempWeather)
                     //reDrawBlockWeath(showName)
                  })
                  .then(() => document.querySelector('.main__change').addEventListener('click', () => { console.log('hh') }))//кнопка для смены города)
            })
      }
   );
}

//navigator.geolocation.getCurrentPosition((data) => getGeo(data.coords.latitude, data.coords.longitude))

async function getGeoPositionCity(lat, lon) {//получили данные через переменные из getCurrentPosition
   await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b4916a6763c5e891c385a81e2e8bfd91`)//ширина, долгота
      .then((resp) => resp.json())
      .then((data) => {
         const mainIcon = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">`
         const temperature = data.current.temp
         const descriptionWeather = data.current.weather[0].description
         const degrees = Math.round(temperature - 273) + '℃'
         drawBlockWeather(degrees, descriptionWeather, mainIcon)
      })
}

//найти город
async function getWeatherByCity(city) {//получить название поля и вернуть погоды
   return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4916a6763c5e891c385a81e2e8bfd91`)
      .then((resp) => resp.json())
      .then((data) => {
         return data
      })
}

async function getCityByIp() {
   return await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_k1srgs6BSmRfRRrcJY60twztQ7Vt6`)
      .then((resp) => resp.json())
      .then((data) => {
         return data.location.region
      })
}

function drawBlockWeather(temper, description, img, city) {
   //секция main__weather 
   let titleH2 = document.createElement('h2')//создание и вывод темпертуры
   titleH2.classList = 'main__description'
   titleH2.textContent = temper
   let divCity = document.createElement('div')//создание и вывод города
   divCity.classList = 'main__city'
   let divDegrees = document.createElement('div')//создание и вывод temp
   divDegrees.classList = 'main__degrees'

   let imgWeather = document.createElement('div')//создание и вывод картинки погоды
   imgWeather.classList = 'main__icon'

   //добавление в DOM
   document.querySelector('.main__weather').append(divCity)
   document.querySelector('.main__weather').prepend(divDegrees)
   document.querySelector('.main__weather').append(titleH2)
   document.querySelector('.main__weather').append(imgWeather)
   //
   document.querySelector('.main__degrees').textContent = temper
   document.querySelector('.main__city').textContent = city
   document.querySelector('.main__icon').innerHTML = img
   document.querySelector('.main__description').textContent = description
   //секция main__find
   let inptTypeHere = document.createElement('input')
   inptTypeHere.classList = 'main__input'
   //добавление в DOM
   document.querySelector('.main__find').prepend(inptTypeHere)
}

function reDrawBlockWeath(city, description, temperat) {
   let textShowNameCity = document.createElement('h2')
   textShowNameCity.classList = 'main__re-name'
   document.querySelector('.main__weather').append(textShowNameCity)
   textShowNameCity.textContent = city

   let showDescription = document.createElement('div')
   showDescription.classList = 'main__re-description'
   document.querySelector('.main__weather').append(showDescription)
   showDescription.textContent = description

   let showDegrees = document.createElement('div')//создание и вывод temp
   showDegrees.classList = 'main__re-temp'
   document.querySelector('.main__weather').append(showDegrees)
   showDegrees.textContent = temperat
   //let showIcon = document.createElement('div')
   //showIcon.classList = 'main__re-icon'
   //document.querySelector('.main__weather').append(showIcon)
   //showIcon.textContent = icons

   let btnChange = document.createElement('button')
   btnChange.classList = 'main__change'
   btnChange.textContent = 'Change city'
   document.querySelector('.main__weather').append(btnChange)
}

