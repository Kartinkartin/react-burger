import { getCardsRequest, postOrderRequest } from "../../components/api/api";

export const GET_API_ITEMS_REQUEST = 'GET_API_ITEMS_REQUEST';
export const GET_API_ITEMS_SUCCESS = 'GET_API_ITEMS_SUCCESS';
export const GET_API_ITEMS_FAILED = 'GET_API_ITEMS_FAILED';
export const POST_CONSTRUCTOR_ITEMS_REQUEST = 'POST_CONSTRUCTOR_ITEMS_REQUEST';
export const POST_CONSTRUCTOR_ITEMS_SUCCESS = 'POST_CONSTRUCTOR_ITEMS_SUCCESS';
export const POST_CONSTRUCTOR_ITEMS_FAILED = 'POST_CONSTRUCTOR_ITEMS_FAILED';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR = 'ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR';
export const SORT_INGREDIENTS_IN_CONSTRUCTOR = 'SORT_INGREDIENTS_IN_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'DELETE_INGREDIENT_FROM_CONSTRUCTOR';
export const SET_INFO_CHOSEN_INGREDIENT = 'SET_INFO_CHOSEN_INGREDIENT';
export const DELETE_INFO_CHOSEN_INGREDIENT = 'DELETE_INFO_CHOSEN_INGREDIENT';
export const RESET_ORDER_NUMBER = 'RESET_ORDER_NUMBER';
export const RESET_INGREDIENTS_IN_CONSTRUCTOR = 'RESET_INGREDIENTS_IN_CONSTRUCTOR';
export const SET_LOADING_MODE = 'SET_LOADING_MODE';
export const RESET_LOADING_MODE = 'RESET_LOADING_MODE';




export function getApiItems() {
    return function(dispatch) {
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

export const postOrder = (orderList) => {
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