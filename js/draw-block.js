
//функция отрисовки вывода
export function drawBlockWeather(temper, description, city, img, inpt) {
   //секция main__weather 
   let titleH2 = document.createElement('h2')//создание и вывод темпертуры
   titleH2.classList = 'main__description'
   titleH2.textContent = temper
   let divCity = document.createElement('h2')//создание и вывод города
   divCity.classList = 'main__degrees'
   let divDegrees = document.createElement('div')//создание и вывод temp
   divDegrees.classList = 'main__city'
   let imgWeather = document.createElement('div')//создание и вывод картинки погоды
   imgWeather.classList = 'main__icon'
   let inptTypeHere = document.createElement('input')//создание и вывод input
   inptTypeHere.classList = 'main__input'
   //добавление в DOM
   document.querySelector('.main__weather').append(divCity)
   document.querySelector('.main__weather').prepend(divDegrees)
   document.querySelector('.main__weather').append(titleH2)
   document.querySelector('.main__weather').append(imgWeather)
   document.querySelector('.main__find').prepend(inptTypeHere)
   //
   document.querySelector('.main__degrees').textContent = temper
   document.querySelector('.main__city').textContent = city
   document.querySelector('.main__icon').innerHTML = img
   document.querySelector('.main__description').textContent = description

   let btnChanges = document.createElement('button')//кнопка изменения города
   btnChanges.classList = 'main__change'
   btnChanges.textContent = 'Change city'
   btnChanges.type = 'button'
   document.querySelector('.main__weather').append(btnChanges)

   //input для ввода города
   let inputChangeByCity = document.createElement('input')
   inputChangeByCity.id = 'main__inpt-id'
   inputChangeByCity.classList = 'main__input'
   document.querySelector('.main__weather').append(inputChangeByCity)
   inputChangeByCity.textContent = inpt
   inputChangeByCity.type = 'text'
}
