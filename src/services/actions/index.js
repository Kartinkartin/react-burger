import {
    getCardsRequest,
    postOrderRequest,
    loginUserRequest,
    logoutUserRequest,
    refreshTokenRequest,
    changeUserDataRequest
} from "../../components/api/api";
import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED
} from "./ingredientsApi";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR,
    SORT_INGREDIENTS_IN_CONSTRUCTOR,
    RESET_INGREDIENTS_IN_CONSTRUCTOR
} from "./constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "./order";
import { RESET_ORDER_NUMBER } from "./order";
import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";
import {
    SET_USER,
    RESET_USER,
    REFRESH_USER,
    CHANGE_USER_DATA
} from "./login";
import { SET_ERROR, RESET_ERROR } from "./error";
import { getCookie, setCookie } from "../utils/cookie";

// action creator для получения всего набора, см. ConstructorPage
export function getApiItems() {
    return function (dispatch) {
        dispatch({
            type: GET_API_ITEMS_REQUEST
        });
        dispatch({
            type: SET_LOADING_MODE // модалка с ожиданием
        })
        getCardsRequest()
            .then(res => {
                dispatch({
                    type: RESET_LOADING_MODE
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
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item: prod
    });
}
export const addOrChangeBun = (bun) => (dispatch) => {
    dispatch({
        type: ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
        item: bun
    })
}
export const sortIngredients = (item, droppedIndex, draggedIndex) => (dispatch) => {
    dispatch({
        type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
        draggedIndex: draggedIndex,
        droppedIndex: droppedIndex,
        item: item
    })
}
export const deleteIngredient = (notBunsIngredients, id) => (dispatch) => {
    dispatch({
        type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        ingredients: notBunsIngredients,
        id: id,
    })
}
export const resetOrderNum = () => (dispatch) => {
    dispatch({
        type: RESET_ORDER_NUMBER
    })
}

// action creator для отправки заказа, см. ConstructorPage
export const postOrder = (orderList, token) => {
    const orderListId = orderList.map(item => item._id);
    orderListId.push(orderList[0]._id);
    return function (dispatch) {
        dispatch({
            type: SET_LOADING_MODE
        })
        postOrderRequest(orderListId, token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: POST_CONSTRUCTOR_ITEMS_SUCCESS,
                        number: res.order.number
                    })
                    dispatch({
                        type: RESET_INGREDIENTS_IN_CONSTRUCTOR
                    });
                } else {
                    dispatch({
                        type: POST_CONSTRUCTOR_ITEMS_FAILED,
                        error: res
                    });
                }
                dispatch({
                    type: RESET_LOADING_MODE
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
                    type: SET_USER,
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
                            type: SET_ERROR,
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
                    type: RESET_USER,
                })
                const oldTokenCookie = getCookie('refreshToken');
                const oldDate = getCookie('date')
                setCookie('refreshToken', oldTokenCookie, 'delete');
                setCookie('date', oldDate, 'delete')
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
                setCookie('refreshToken', token, 'delete');
                setCookie('date', oldDate, 'delete');
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken;
                dispatch({
                    type: REFRESH_USER,
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
                    type: CHANGE_USER_DATA,
                    changed: { ...newData }
                })
            }
            )
            .catch(err => console.log(err)) //честно, ни одной идеи нет. но я что-то могу и показала это в логине

    }
}

export const deleteError = () => (dispatch) => {
    dispatch({
        type: RESET_ERROR
    })
}