import { TChangeUserData } from "../../services/types";
import { TUserActions } from "../../services/types/actions";
import { 
  TGetCardsResponse, 
  TAuthResponse, 
  TResponse, 
  TTokenResponse, 
  TLoginResponse, 
  TUserResponse, 
  TPostOrderResponse 
} from "../../services/types/data";

type TOptions = { 
  headers: { authorization?: string; 'Content-Type': string; }; 
  method?: string; 
  body?: string; 
}

function checkRes<T>(res: TResponse<T>): Promise<T> | Promise<never> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject([`Ошибка ${res.status}`, res.json()]);
}
function request<T>(url: string, options: TOptions): Promise<T> {
  return (fetch(url, options)
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
  return request<TGetCardsResponse>(`${config.baseUrl}/ingredients`, {
    headers: config.headers
  })
}

// отправка заказа на сервер
export function postOrderRequest(orderListId: Array<string>, token: string) {
  const order = { ingredients: orderListId };
  return request<TPostOrderResponse>(`${config.baseUrl}/orders`, {
    headers: {
      ...config.headers, 
      authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(order)
  })
}

// сброс пароля
export function resetPassRequest(email: string) {
  return request<TAuthResponse>(`${config.baseUrl}/password-reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      "email": email
    })
  })
}

// создание нового пароля
export function newPassRequest(newPassData: { [name: string]: string; }) {
  return request<TAuthResponse>(`${config.baseUrl}/password-reset/reset`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(newPassData)
  })
}

// регистрация нового пользователя
export function registerUserRequest(userData: { [name: string]: string; }) {
  return request<TLoginResponse>(`${config.baseUrl}/auth/register`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(userData)
  })
}

// авторизация пользователя
export function loginUserRequest(loginData: { [name: string]: string; }) {
  return request<TLoginResponse>(`${config.baseUrl}/auth/login`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(loginData)
  })
}

// выход из аккаунта
export function logoutUserRequest(logoutData: { token: string; }) {
  return request<TAuthResponse>(`${config.baseUrl}/auth/logout`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(logoutData)
  })
}

// обновление токена
export function refreshTokenRequest(tokenData: { token: string; }) {
  return request<TTokenResponse>(`${config.baseUrl}/auth/token`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(tokenData)
  })
}

// получение информации профиля пользователя
export function getUserRequest(token: string) {
  return request<TUserResponse>(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'GET',
  })
}

// изменение данных профиля пользователя, пароль тоже меняется
export function changeUserDataRequest(token: string, userData: TChangeUserData) {
  return request<TUserActions>(`${config.baseUrl}/auth/user`, {
    headers: {
      ...config.headers,
      authorization: `Bearer ${token}`
    },
    method: 'PATCH',
    body: JSON.stringify(userData)
  })
}