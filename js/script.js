
import { drawBlockWeather } from './draw-block.js'

//запрос у пользователя на определение местоположения
if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
      function (position) {
         let latPos = position.coords.latitude
         let lonPos = position.coords.longitude
         getGeoPositionCity(latPos, lonPos)
      },
      function () {
         //здесь должно открываться окно браузера с просьбой разрешить определение местоположения  
         getCityByIp()
            .then((regionCity) => {
               getWeatherByCity(regionCity)//вызвали фукнцию и передали город
                  .then(() => document.querySelector('.active').style.display = 'flex')//показать кнопку "change city"
                  .then(() => document.querySelector('.main__change').addEventListener('click', () => document.getElementById('main__inpt-id').style.display = 'flex'))//кнопка для смены города
                  .then(() => document.getElementById('main__inpt-id').addEventListener("change", () => {
                     getWeatherByCity(event.target.value)
                  }))//получение input и вывод города
            })
      });
}

export async function getGeoPositionCity(lat, lon) {//получили данные через переменные из getCurrentPosition
   await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=b4916a6763c5e891c385a81e2e8bfd91`)//ширина, долгота
      .then((resp) => resp.json())
      .then((data) => {
         const temperature = data.current.temp
         const showDataDescription = data.current.weather[0].description
         const showDataIcon = `<img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">`
         const showTempWeather = Math.round(temperature - 273) + '℃'
         drawBlockWeather(showTempWeather, showDataDescription, '', showDataIcon)
      })
}

//найти город
export async function getWeatherByCity(city) {//получить название поля и вернуть погоды
   return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b4916a6763c5e891c385a81e2e8bfd91`)
      .then((resp) => resp.json())
      .then((data) => {

         const showDataDescription = data.weather[0].description
         const showDataName = data.name
         const showTempWeather = Math.round(data.main.temp) - 273 + '℃'
         const showDataIcon = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`
         document.querySelector('.main__weather').textContent = ''
         drawBlockWeather(showTempWeather, showDataDescription, showDataName, showDataIcon)

         document.querySelector('.main__error').classList.add('displ-del')

         return data
      })
}
//at_UniXayB0JL7H6kd3XNohsWcIkQ6uh
//at_oI4JbCU9ZemAS6KTTdDewKQuB1ce9
export async function getCityByIp() {
   return await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_oI4JbCU9ZemAS6KTTdDewKQuB1ce9`)
      .then((resp) => resp.json())
      .then((data) => {

         return data.location.region
      })
}

