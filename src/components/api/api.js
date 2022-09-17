
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

export async function postOrderRequest(orderListId) {
  const order ={ ingredients: orderListId };
  return await fetch(`${config.baseUrl}/orders`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify(order)
  })
}