export const config = {
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}


export async function getCards() {
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
