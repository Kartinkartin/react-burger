import { getCardsRequest, postOrderRequest, resetPassRequest, registerUserRequest } from "../../components/api/api";
import { GET_API_ITEMS_REQUEST, GET_API_ITEMS_SUCCESS, GET_API_ITEMS_FAILED } from "./ingredientsApi";
import { RESET_INGREDIENTS_IN_CONSTRUCTOR } from "./constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_REQUEST,
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "./order";
import { SET_LOADING_MODE, RESET_LOADING_MODE } from "./loading";
import { FORGOT_PASSWORD, REGISTER_USER } from "./login";


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

export const registerUser = (userData) => {
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