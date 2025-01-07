let cakeType = [
  { name: 'apple', price: 1000, volume: 1000 },
  { name: 'banana', price: 2000, volume: 1000 },
  { name: 'orange', price: 4000, volume: 1000 },
]
let jamType = [
  { name: 'apple', price: 500, volume: 1000 },
  { name: 'banana', price: 1200, volume: 1000 },
  { name: 'orange', price: 400, volume: 1000 },
]
let fruitType = [
  { name: 'apple', price: 400, volume: 1000 },
  { name: 'banana', price: 200, volume: 1000 },
  { name: 'orange', price: 350, volume: 1000 },
]
let userCoast
let lastUserOrder = []
let userCakeOrder = ''
let userJamOrder = ''
let userFruitOrder = ''
let userWeightOrder = ''

const dataElementPopup = document.getElementById('dataPop-up')
const alertElementPopup = document.getElementById('alertPop-up')
let content = document.getElementById('alertContent')

// Вешаем слушателя на кнопку Рассчитать
document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault()

  let currentUserCoast = 0
  let userCake = this.cake.value
  let userJam = this.jam.value
  let userFruit = this.fruit.value
  let userWeight = this.weight.value

  newUserOrder = [this.cake.value, this.jam.value, this.fruit.value, this.weight.value]

  if (JSON.stringify(newUserOrder) !== JSON.stringify(lastUserOrder)) {
    for (let i = 0; i < cakeType.length; i++) {
      if (userCake === cakeType[i].name) {
        userCakeOrder = cakeType[i].name
        currentUserCoast += cakeType[i].price * userWeight
      }
    }
    for (let i = 0; i < jamType.length; i++) {
      if (userJam === jamType[i].name) {
        userJamOrder = jamType[i].name
        currentUserCoast += jamType[i].price * userWeight
      }
    }
    for (let i = 0; i < fruitType.length; i++) {
      if (userFruit === fruitType[i].name) {
        userFruitOrder = fruitType[i].name
        currentUserCoast += fruitType[i].price * userWeight
      }
    }

    userCoast = currentUserCoast
    let content = document.getElementById('coast')
    content.innerText = `${currentUserCoast} руб.`
    lastUserOrder = [this.cake.value, this.jam.value, this.fruit.value, this.weight.value]

    let sendButton = document.getElementById('sendButton')
    sendButton.removeAttribute('disabled', '')
    sendButton.classList.remove('calc_form-button-disabled')

    console.log(userCake, userJam, userFruit, userWeight)
    console.log(currentUserCoast)
  } else {
    content.innerHTML = `<h1>Для нового расчета измените параметры заказа!</h1>`
    // elementPopup.style.borderColor = 'red'
    // elementPopup.style.color = 'red'
    alertElementPopup.show()

    setTimeout(() => {
      alertElementPopup.close()
      alertElementPopup.style.borderColor = ''
    }, 2000)
  }
})

// Вешаем слушателя на кнопку Отправить в форме данных пользователя

document.getElementById('tg-form').addEventListener('submit', function (e) {
  e.preventDefault()

  let userName = this.name.value
  let userPhone = this.phone.value

  if (this.name.value === '' || this.phone.value === '') {
    content.innerHTML = `<h1>Все поля должны быть заполнены!</h1>`
    alertElementPopup.style.borderColor = 'red'
    alertElementPopup.style.color = 'red'
    alertElementPopup.show()

    setTimeout(() => {
      alertElementPopup.close()
      alertElementPopup.style.borderColor = ''
    }, 2000)
  } else {
    sendOrder(userName, userPhone)
    dataElementPopup.close()
  }
})

// Функция получения данных пользователя
function openUserDataForm() {
  console.log(userCoast)

  if (userCoast === 0) {
    content.innerHTML = `<h1>Выберите параметры заказа и нажмите кнопку "Рассчитать"</h1>`
    alertElementPopup.style.borderColor = 'red'
    alertElementPopup.style.color = 'red'
    alertElementPopup.show()

    setTimeout(() => {
      alertElementPopup.close()
      alertElementPopup.style.borderColor = ''
    }, 2000)
  } else {
    dataElementPopup.show()
  }
}
// Функция отправки параметров заказа

function sendOrder(userName, userPhone) {
  const userOrder = {
    name: userName,
    phone: userPhone,
    order: lastUserOrder,
    coast: userCoast,
  }

  let sendButton = document.getElementById('sendButton')
  sendButton.setAttribute('disabled', '')
  sendButton.classList.add('calc_form-button-disabled')

  content.innerHTML = `<h1>Заказ отправлен. Мы с Вами свяжемся в ближайшее время.</h1>`
  alertElementPopup.show()
  console.log('Заказ:', userOrder)
  userCoast = 0

  setTimeout(() => {
    alertElementPopup.close()
    alertElementPopup.style.borderColor = ''
  }, 2000)
}

function closeDataForm() {
  dataElementPopup.close()
}
