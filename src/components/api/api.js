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

export async function getCardsRequest() {
  return (await fetch(`${config.baseUrl}/ingredients`, {
    headers: config.headers
  })
    .then(checkRes))
}

export async function postOrderRequest(orderListId) {
  const order = { ingredients: orderListId };
  return (await fetch(`${config.baseUrl}/orders`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(order)
  })
    .then(checkRes))
}

export async function resetPassRequest(email) {
  debugger
  return (await fetch(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      "email": email
    })
    // потом тело запроса надо поменять
  })
    .then(checkRes))
}

export async function newPassRequest(newPassData) {
  return (await fetch(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(newPassData)
  })
    .then(checkRes))
}

export async function registerUserRequest(userData) {
  debugger
  return (await fetch(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(userData)
  })
    .then(checkRes))
}

export async function loginUserRequest(loginData) {
  return (await fetch(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(loginData)
  })
    .then(checkRes))
}

export async function logoutUserRequest(userData) {
  debugger
  return (await fetch(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({})
  })
    .then(checkRes))
}

export async function refreshTokenRequest(userData) {
  debugger
  return (await fetch(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({})
  })
    .then(checkRes))
}