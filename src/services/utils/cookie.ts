// находит значение кука по его имени
export const getCookie = (cookieName: string): string => {
    let foundCookie = document.cookie.split('; ')
        .filter((str) => str.includes(cookieName))[0]
        .split('=')[1]
    return (
        foundCookie
    )
}

export const setCookie = (name: string, value: string): void => {
    document.cookie=`${name}=${value}; path=/`;
}

export const deleteCookie = (name: string, value: string): void => {
    document.cookie=`${name}=${value}; path=/; max-age=-1`;
}