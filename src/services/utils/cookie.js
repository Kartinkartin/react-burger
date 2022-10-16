// находит значение кука по его имени
export const getCookie = (cookieName) => {
    let foundCookie = document.cookie.split('; ')
        .filter((str) => str.includes(cookieName))[0]
        .split('=')[1]
    return (
        foundCookie
    )
}

export const setCookie = (name, value) => {
    document.cookie=`${name}=${value}`;
}

export const deleteCookie = (name, value) => {
    document.cookie=`${name}=${value}; max-age=-1`;
}