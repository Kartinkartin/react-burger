import { getCardsRequest, postOrderRequest, resetPassRequest, registerUserRequest, loginUserRequest, logoutUserRequest } from "../../components/api/api";
import { GET_API_ITEMS_REQUEST, GET_API_ITEMS_SUCCESS, GET_API_ITEMS_FAILED } from "./ingredientsApi";
import { RESET_INGREDIENTS_IN_CONSTRUCTOR } from "./constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_REQUEST,
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "./order";
import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";
import { SET_USER, RESET_USER } from "./login";


export function getApiItems() { //усилитель для получения всего набора, см. ConstructorPage
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

export const postOrder = (orderList) => { //усилитель для отправки заказа, см. ConstructorPage
    const orderListId = orderList.map(item => item._id);
    orderListId.push(orderList[0]._id);
    return function (dispatch) {
        dispatch({
            type: POST_CONSTRUCTOR_ITEMS_REQUEST
        });
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

export const resetPass = () => {  // призван в этот мир, чтоб сбросить пароль и переадресовать страницу, почту забери и передавай из inputa recoveryPass
    const emailObj = {
        "email": ""
    }
    debugger
    // сюда диспатчей напихать, аще нипонятна, впереди туман, лошшшадкааа Т.Т
    resetPassRequest()
        .then(res => {
            if (res && res.success) {
                console.log('я сделяль из resetPass')
            }
        })


}

export const registerUser = (userData) => { //возможно лишний
    debugger
    return function (dispatch) {
        debugger
        registerUserRequest(userData)
            .then(res => {
                // dispatch({     ПОТОМ ПЕРЕВЕСТИ НА СТРАНИЦУ ЛОГИН И ОТТУДА СОХРАНЯТЬ ДАННЫЕ
                //     type: REGISTER_USER,
                //     user: res.user,
                //     token: res.accessToken
                // })
            }
            )
            .catch(err => console.log(err))
    }
}

export const loginUser = (loginData, history) => {  //внутри коммент
    let accessToken;
    debugger
    return function (dispatch) {
        loginUserRequest(loginData)
            .then(res => {
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken
                dispatch({
                    type: SET_USER,
                    user: { ...res.user, 'password': loginData.password},
                    token: accessToken,
                })
                document.cookie = `refreshToken=${res.refreshToken}`;
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
                document.cookie = `refreshToken=${token}; max-age=-1`;
            }
            )
            .then(res => history.replace({ pathname: '/login' }))
            .catch(err => console.log(err)) //как-нибудь сказать, что наврали с паролем
            
    }
}