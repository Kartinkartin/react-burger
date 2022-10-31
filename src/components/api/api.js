function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject([`Ошибка ${res.status}`, res.json()]);
}
function request(url, options) {
  return (fetch(url, {
    options
  })
  .then(checkRes))
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
  return request(`${config.baseUrl}/ingredients`, {
    headers: config.headers
  })
}

// отправка заказа на сервер
export function postOrderRequest(orderListId, token) {
  const order = { ingredients: orderListId };
  return request(`${config.baseUrl}/orders`, {
    headers: {
      ...config.headers, 
      authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(order)
  })
}

// сброс пароля
export function resetPassRequest(email) {
  return request(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      "email": email
    })
  })
}

// создание нового пароля
export function newPassRequest(newPassData) {
  return request(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(newPassData)
  })
}

// регистрация нового пользователя
export function registerUserRequest(userData) {
  return request(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

// авторизация пользователя
export function loginUserRequest(loginData) {
  return request(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(loginData)
  })
}

// выход из аккаунта
export function logoutUserRequest(logoutData) {
  return request(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(logoutData)
  })
}

// обновление токена
export function refreshTokenRequest(tokenData) {
  return request(`${config.baseUrl}/auth/token`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(tokenData)
  })
}

// получение информации профиля пользователя
export function getUserRequest(token) {
  return request(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'GET',
  })
}

// изменение данных профиля пользователя, пароль тоже меняется
export function changeUserDataRequest(token, userData) {
  return request(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'PATCH',
    body: JSON.stringify(userData)
  })
}