// находит значение кука по его имени
export const getCookie = (cookieName) => {
    let foundCookie = document.cookie.split('; ')
        .filter((str) => str.includes(cookieName))[0]
        .split('=')[1]
    return (
        foundCookie
    )
}

export const setCookie = (name, value, action='add') => {
    if(action === 'add') document.cookie=`${name}=${value}`;
    if(action === 'delete') document.cookie=`${name}=${value}; max-age=-1`;
}