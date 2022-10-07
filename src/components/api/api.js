function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}
// получение всех начальных ингредиентов
export async function getCardsRequest() {
  return (await fetch(`${config.baseUrl}/ingredients`, {
    headers: config.headers
  })
    .then(checkRes))
}

// отправка заказа на сервер
export async function postOrderRequest(orderListId) {
  const order = { ingredients: orderListId };
  return (await fetch(`${config.baseUrl}/orders`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(order)
  })
    .then(checkRes))
}

// сброс пароля
export async function resetPassRequest(email) {
  return (await fetch(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      "email": email
    })
  })
    .then(checkRes))
}

// создание нового пароля
export async function newPassRequest(newPassData) {
  return (await fetch(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(newPassData)
  })
    .then(checkRes))
}

// регистрация нового пользователя
export async function registerUserRequest(userData) {
  return (await fetch(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(userData)
  })
    .then(checkRes))
}

// авторизация пользователя
export async function loginUserRequest(loginData) {
  return (await fetch(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(loginData)
  })
    .then(checkRes))
}

// выход из аккаунта
export async function logoutUserRequest(logoutData) {
  return (await fetch(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(logoutData)
  })
    .then(checkRes))
}

export async function refreshTokenRequest() {
  debugger
  return (await fetch(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({})
  })
    .then(checkRes))
}


export async function getUserRequest(token) {
  return (await fetch(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'GET',
  })
    .then(checkRes))
}