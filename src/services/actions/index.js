import {
    getCardsRequest,
    postOrderRequest,
    loginUserRequest,
    logoutUserRequest,
    refreshTokenRequest,
    changeUserDataRequest,
} from "../../components/api/api";
import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED
} from "./ingredientsApi";
import {
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_ADD_OR_CHANGE_BUN,
    CONSTRUCTOR_DELETE_INGREDIENT,
    CONSTRUCTOR_SORT_INGREDIENTS,
    CONSTRUCTOR_RESET_INGREDIENTS
} from "./constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "./order";
import { ORDER_NUMBER_RESET } from "./order";
import { LOADING_MODE_SET, LOADING_MODE_RESET } from "./loading";
import {
    USER_SET,
    USER_RESET,
    USER_REFRESH,
    USER_CHANGE_DATA
} from "./login";
import { ERROR_SET, ERROR_RESET } from "./error";
import { deleteCookie, getCookie, setCookie } from "../utils/cookie";

// action creator для получения всего набора, см. ConstructorPage
export function getApiItems() {
    return function (dispatch) {
        dispatch({
            type: GET_API_ITEMS_REQUEST
        });
        dispatch({
            type: LOADING_MODE_SET // модалка с ожиданием
        })
        return getCardsRequest()
            .then(res => {
                dispatch({
                    type: LOADING_MODE_RESET
                })
                if (res && res.success) {
                    dispatch({
                        type: GET_API_ITEMS_SUCCESS,
                        items: res.data
                    });
                } else {
                    dispatch({
                        type: GET_API_ITEMS_FAILED,
                        error: res
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_API_ITEMS_FAILED,
                    error: err
                });
            })
    };
}

export const addIngredient = (prod) => (dispatch) => {
    dispatch({
        type: CONSTRUCTOR_ADD_INGREDIENT,
        item: prod
    });
}
export const addOrChangeBun = (bun, key) => (dispatch) => {
    dispatch({
        type: CONSTRUCTOR_ADD_OR_CHANGE_BUN,
        item: bun,
        key: key
    })
}
export const sortIngredients = (item, droppedIndex, draggedIndex) => (dispatch) => {
    dispatch({
        type: CONSTRUCTOR_SORT_INGREDIENTS,
        draggedIndex: draggedIndex,
        droppedIndex: droppedIndex,
        item: item
    })
}
export const deleteIngredient = (notBunsIngredients, id) => (dispatch) => {
    dispatch({
        type: CONSTRUCTOR_DELETE_INGREDIENT,
        ingredients: notBunsIngredients,
        id: id,
    })
}
export const resetOrderNum = () => (dispatch) => {
    dispatch({
        type: ORDER_NUMBER_RESET
    })
}

// action creator для отправки заказа, см. ConstructorPage
export const postOrder = (orderList, token) => {
    const orderListId = orderList.map(item => item._id);
    orderListId.push(orderList[0]._id);
    return function (dispatch) {
        dispatch({
            type: LOADING_MODE_SET
        })
        postOrderRequest(orderListId, token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: POST_CONSTRUCTOR_ITEMS_SUCCESS,
                        number: res.order.number
                    })
                    dispatch({
                        type: CONSTRUCTOR_RESET_INGREDIENTS
                    });
                } else {
                    dispatch({
                        type: POST_CONSTRUCTOR_ITEMS_FAILED,
                        error: res
                    });
                }
                dispatch({
                    type: LOADING_MODE_RESET
                })
            })
            .catch(err => {
                dispatch({
                    type: POST_CONSTRUCTOR_ITEMS_FAILED,
                    error: err
                });
            })
    }
}

export const loginUser = (loginData, history) => {
    let accessToken;
    return function (dispatch) {
        loginUserRequest(loginData)
            .then(res => {
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken
                dispatch({
                    type: USER_SET,
                    user: { ...res.user, 'password': loginData.password },
                    token: accessToken,
                })
                setCookie('date', new Date());
                setCookie('refreshToken', res.refreshToken);
            }
            )
            .then(res => {
                history.replace({ pathname: history.location.state?.from || '/' })
            })
            .catch(err => {
                console.log(err[0])
                err[1]
                    .then(res => { console.log(res); return res })
                    .then(res => {
                        dispatch({
                            type: ERROR_SET,
                            code: err[0],
                            message: res.message
                        })
                    })
            })
    }
}

export const logoutUser = (token, history) => {
    let logoutData = {
        "token": token
    };
    return function (dispatch) {
        logoutUserRequest(logoutData)
            .then(res => {
                dispatch({
                    type: USER_RESET,
                })
                const oldTokenCookie = getCookie('refreshToken');
                const oldDate = getCookie('date')
                deleteCookie('refreshToken', oldTokenCookie);
                deleteCookie('date', oldDate)
            }
            )
            .then(res => history.replace({ pathname: '/login' }))
            .catch(res => {
                console.log(res)
            }) //как-нибудь сказать, что наши полномочия все.

    }
}

// action creator обновляет просроченный accessToken, отправляет в запросе refreshToken 
export const refreshUser = (token) => {
    let refreshData = {
        "token": token
    };
    let accessToken = null;
    return function (dispatch) {
        return refreshTokenRequest(refreshData)
            .then(res => {
                const oldDate = getCookie('date');
                deleteCookie('refreshToken', token);
                deleteCookie('date', oldDate);
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken;
                dispatch({
                    type: USER_REFRESH,
                    token: accessToken
                })
                setCookie('refreshToken', res.refreshToken);
                setCookie('date', new Date());
                return accessToken;
            })
            .catch(err => console.log(err)) // я кончилась где-то на написании текста ошибок Т.Т

    }
}

// action creator обновляет данные пользователя, см. Profile
export const changeUserData = (token, newData) => {
    return function (dispatch) {
        changeUserDataRequest(token, newData)
            .then(res => {
                dispatch({
                    type: USER_CHANGE_DATA,
                    changed: { ...newData }
                })
            }
            )
            .catch(err => console.log(err)) //честно, ни одной идеи нет. но я что-то могу и показала это в логине

    }
}

export const deleteError = () => (dispatch) => {
    dispatch({
        type: ERROR_RESET
    })
}

// проверяет актаульность и наличие токена в store, потом выполняет переданный action
// принимает набор аргументов для экшена и далее сама диспатчила переданный 
// экшен со всеми его аргументами. Будет выполнять просто экшен, 
// если с токеном все ок и обновлять токен, а потом выполнять экшен, если токен истёк. 
// Над названием можно подумать еще)
export const performActionWithRefreshedToken = (accessToken, action, ...args) => {
    const tokenLifeTime = 20 * 60 * 1000; // 20 min
    const tokenDate = new Date(getCookie('date'));
    return function (dispatch) {
        if ((new Date() - tokenDate < tokenLifeTime) && accessToken) {
            dispatch(action(...args, accessToken));
        }
        if ((new Date() - tokenDate > tokenLifeTime) || !accessToken) {
            const refreshToken = getCookie('refreshToken');
            dispatch(refreshUser(refreshToken))
                .then(accessToken => dispatch(action(...args, accessToken)))
        }
    }
}
