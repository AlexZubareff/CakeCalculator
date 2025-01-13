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
  { name: 'apple', price: 400, volume: 1000 },
  { name: 'banana', price: 200, volume: 1000 },
  { name: 'orange', price: 350, volume: 1000 },
]

let userCoast = 0
let lastUserOrder = []
let userJamOrder = ''
let userFruitOrder = ''
let userWeightOrder = ''

const dataElementPopup = document.getElementById('dataPop-up')
const alertElementPopup = document.getElementById('alertPop-up')
let content = document.getElementById('alertContent')

// Вешаем слушателя на кнопку Рассчитать
document.getElementById('calc-form').addEventListener('submit', function (e) {
  e.preventDefault()

  const inputFields = document.querySelectorAll('.calc_form-input')
  console.log(inputFields)

  let currentUserCoast = 0
  let currentSelection = []

  inputFields.forEach(item => {
    let inputField = {
      name: item.name,
      selectedType: item.value,
    }
    // console.log(inputField)

    currentSelection.push(inputField)
  })

  console.log(currentSelection)

  if (JSON.stringify(currentSelection) !== JSON.stringify(lastUserOrder)) {
    for (let i = 0; i < currentSelection.length - 1; i++) {
      currentUserCoast += ingredientCoast(
        currentSelection[i].selectedType,
        choseData(currentSelection[i].name),
        currentSelection[currentSelection.length - 1].selectedType
      )
    }

    userCoast = currentUserCoast
    let content = document.getElementById('coast')
    content.innerText = `${currentUserCoast} руб.`
    lastUserOrder = currentSelection

    let sendButton = document.getElementById('sendButton')
    sendButton.removeAttribute('disabled', '')
    sendButton.classList.remove('calc_form-button-disabled')

    // console.log(userCake, userJam, userFruit, userWeight)
    // console.log(currentUserCoast)
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
  } else if (!ValidPhone(userPhone)) {
    content.innerHTML = `<h1>Номер телефона введен не верно!</h1>`
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

//Функция определения источника данных для расчета стоимости ингридиента
function choseData(dataType) {
  switch (dataType) {
    case 'cakeType':
      return cakeType
      break
    case 'jamType':
      return jamType
      break
    case 'fruitType':
      return fruitType
      break
    default:
      break
  }
}

//Функция расчёта стоимости ингридиента в заказе
function ingredientCoast(ingredient, data, weight) {
  let coast = 0
  for (let i = 0; i < data.length; i++) {
    if (ingredient === data[i].name) {
      coast = data[i].price * weight
      return coast
    }
  }
}

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

// Функция закрытия формы ввода данных пользователя
function closeDataForm() {
  dataElementPopup.close()
}

// Функция проверки валидности номера телефона
function ValidPhone(userPhone) {
  let re = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
  let valid = re.test(userPhone)
  return valid
}
