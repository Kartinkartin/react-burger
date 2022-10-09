import {
    getCardsRequest,
    postOrderRequest,
    loginUserRequest,
    logoutUserRequest,
    refreshTokenRequest,
    changeUserDataRequest
} from "../../components/api/api";
import { GET_API_ITEMS_REQUEST, GET_API_ITEMS_SUCCESS, GET_API_ITEMS_FAILED } from "./ingredientsApi";
import { RESET_INGREDIENTS_IN_CONSTRUCTOR } from "./constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "./order";
import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";
import {
    SET_USER,
    RESET_USER,
    REFRESH_USER,
    CHANGE_USER_DATA
} from "./login";

// усилитель для получения всего набора, см. ConstructorPage
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

// усилитель для отправки заказа, см. ConstructorPage
export const postOrder = (orderList) => { 
    const orderListId = orderList.map(item => item._id);
    orderListId.push(orderList[0]._id);
    return function (dispatch) {
        dispatch({
            type: SET_LOADING_MODE
        })
        postOrderRequest(orderListId)
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

export const loginUser = (loginData, history) => {  //внутри коммент
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
                document.cookie = `refreshToken=${res.refreshToken}`; 
                document.cookie = `password=${loginData.password}`;
            }
            )
            .then(res => history.replace({ pathname: '/' }))
            .catch(err => console.log(err)) //как-нибудь сказать, что наврали с паролем

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
                const oldTokenCookie = document.cookie.split('; ')[0];
                const oldPassCookie = document.cookie.split('; ')[1];
                document.cookie = `${oldTokenCookie}; max-age=-1`;
                document.cookie = `${oldPassCookie}; max-age=-1`;

            }
            )
            .then(res => history.replace({ pathname: '/login' }))
            .catch(err => console.log(err)) //как-нибудь сказать, что наврали с паролем

    }
}

export const refreshUser = (token) => {
    let refreshData = {
        "token": token
    };
    let accessToken = null;
    return function (dispatch) {
        refreshTokenRequest(refreshData)
            .then(res => {
                document.cookie = `refreshToken=${token}; max-age=-1`;
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken;
                dispatch({
                    type: REFRESH_USER,
                    token: accessToken
                })
                document.cookie = `refreshToken=${res.refreshToken}`;
            }
            )
            .catch(err => console.log(err)) //как-нибудь сказать

    }
}

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
            .catch(err => console.log(err)) //как-нибудь сказать

    }
}