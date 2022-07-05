//b0709254826c4061a0d60560ef431ccd

//console.log(b0709254826c4061a0d60560ef431ccd)
//Geolocation.getCurrentPosition('b0709254826c4061a0d60560ef431ccd')
//let url = 'https://openweathermap.org/api/one-call-api'
//let response = fetch(url);

//const latSpb = 59.9266286
//const lonSpb = 30.3447391

navigator.geolocation.getCurrentPosition((data) => getGeo(data.coords.latitude, data.coords.longitude))


//https://api.openweathermap.org/data/2.5/onecall?lat={59.9266286}&lon={30.3447391}&appid={b0709254826c4061a0d60560ef431ccd}

async function getGeo(lat, lon) {//получили данные через переменные из getCurrentPosition
   await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=33f3d3d2d94895db4810b85a8b2dabbf`)
      .then((resp) => resp.json())
      .then((data) => {
         console.log(data)
         let temperature = data.current.temp
         let tempWeather = data.current.weather[0].description
         let ttt = Math.round(temperature - 273) + '℃'
         drawBlock(ttt, tempWeather)
      })
}

//async function getCity() { //???where is city?
//   await fetch(``)
//}

function drawBlock(temper, city) {
   let titleH2 = document.createElement('h2')
   titleH2.classList = 'main__degrees'
   titleH2.textContent = temper
   let div = document.createElement('div')
   div.classList = 'main__city'

   document.querySelector('.main__weather').prepend(div)
   document.querySelector('.main__weather').prepend(titleH2)

   document.querySelector('.main__degrees').textContent = temper
   document.querySelector('.main__city').textContent = city

}
//drawBlock()

//33f3d3d2d94895db4810b85a8b2dabbf
//navigator.geolocation.getCurrentPosition(position => {
//   console.log(position.coords.latitude)
//   console.log(position.coords.longitude)
//})

//const id = navigator.geolocation.watchPosition(position => {
//   console.log(position)
//})

////stop watching after 10 seconds
//setTimeout(() => {
//   navigator.geolocation.clearWatch(id)
//}, 10 * 1000)
