export const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}


export async function getCardsRequest() {
  return await fetch(`${config.baseUrl}/ingredients`,{
    headers: config.headers
  })
}

export function checkRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export async function postOrderRequest(orderList) {
  const idList ={ "ingredients": orderList.map(item => item._id) }
  return await fetch(`${config.baseUrl}/orders`, {
    headers: config.headers,
    method: 'POST',
    body:JSON.stringify(idList)
  })
}