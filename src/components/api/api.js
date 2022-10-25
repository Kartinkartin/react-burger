function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject([`Ошибка ${res.status}`, res.json()]);
}

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const wsUrl =  'wss://norma.nomoreparties.space/orders'

// получение всех начальных ингредиентов
export function getCardsRequest() {
  return (fetch(`${config.baseUrl}/ingredients`, {
    headers: config.headers
  })
    .then(checkRes))
}

// отправка заказа на сервер
export function postOrderRequest(orderListId, token) {
  const order = { ingredients: orderListId };
  return (fetch(`${config.baseUrl}/orders`, {
    headers: {
      ...config.headers, 
      authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(order)
  })
    .then(checkRes))
}

// сброс пароля
export function resetPassRequest(email) {
  return (fetch(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      "email": email
    })
  })
    .then(checkRes))
}

// создание нового пароля
export function newPassRequest(newPassData) {
  return (fetch(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(newPassData)
  })
    .then(checkRes))
}

// регистрация нового пользователя
export function registerUserRequest(userData) {
  return (fetch(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(userData)
  })
    .then(checkRes))
}

// авторизация пользователя
export function loginUserRequest(loginData) {
  return (fetch(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(loginData)
  })
    .then(checkRes))
}

// выход из аккаунта
export function logoutUserRequest(logoutData) {
  return (fetch(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(logoutData)
  })
    .then(checkRes))
}

// обновление токена
export function refreshTokenRequest(tokenData) {
  return (fetch(`${config.baseUrl}/auth/token`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(tokenData)
  })
    .then(checkRes))
}

// получение информации профиля пользователя
export function getUserRequest(token) {
  return (fetch(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'GET',
  })
    .then(checkRes))
}

// изменение данных профиля пользователя, пароль тоже меняется
export function changeUserDataRequest(token, userData) {
  return (fetch(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'PATCH',
    body: JSON.stringify(userData)
  })
    .then(checkRes))
}