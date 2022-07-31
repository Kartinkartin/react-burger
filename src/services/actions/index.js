import { useSelector } from "react-redux";
import { checkRes, getCardsRequest, postOrderRequest } from "../../components/api/api";

export const GET_API_ITEMS_REQUEST = 'GET_API_ITEMS_REQUEST';
export const GET_API_ITEMS_SUCCESS = 'GET_API_ITEMS_SUCCESS';
export const GET_API_ITEMS_FAILED = 'GET_API_ITEMS_FAILED';

export const GET_CONSTRUCTOR_ITEMS_REQUEST = 'GET_CONSTRUCTOR_ITEMS_REQUEST';
export const GET_CONSTRUCTOR_ITEMS_SUCCESS = 'GET_CONSTRUCTOR_ITEMS_SUCCESS';
export const GET_CONSTRUCTOR_ITEMS_FAILED = 'GET_CONSTRUCTOR_ITEMS_FAILED';
export const GET_CONSTRUCTOR_ITEMS = 'GET_CONSTRUCTOR_ITEMS';

export const POST_CONSTRUCTOR_ITEMS_REQUEST = 'GET_CONSTRUCTOR_ITEMS_REQUEST';
export const POST_CONSTRUCTOR_ITEMS_SUCCESS = 'GET_CONSTRUCTOR_ITEMS_SUCCESS';
export const POST_CONSTRUCTOR_ITEMS_FAILED = 'GET_CONSTRUCTOR_ITEMS_FAILED';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR = 'ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR';

export const GET_INFO_CHOSEN_INGREDIENT = 'GET_INFO_CHOSEN_INGREDIENT';
export const DELETE_INFO_CHOSEN_INGREDIENT = 'DELETE_INFO_CHOSEN_INGREDIENT';

export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';



export function getApiItems() {
    return function(dispatch) {
        dispatch({
        type: GET_API_ITEMS_REQUEST
        });
        getCardsRequest()
        .then(res => checkRes(res))
        .then(res => {
        if (res && res.success) {
            dispatch({
            type: GET_API_ITEMS_SUCCESS,
            items: res.data
            });
        } else {
            dispatch({
            type: GET_API_ITEMS_FAILED
            });
        }
        })
        .catch(err => {
        dispatch({
            type: GET_API_ITEMS_FAILED
            });
        })
    };
}

export const postOrder = (orderList) => {
    return function (dispatch) {
        dispatch({
            type: POST_CONSTRUCTOR_ITEMS_REQUEST
        });
        postOrderRequest(orderList)
        .then(res => checkRes(res))
        .then(res => {
            if (res && res.success) {
                dispatch({
                type: POST_CONSTRUCTOR_ITEMS_SUCCESS,
                number: res.order.number
                });
            } else {
                dispatch({
                type: POST_CONSTRUCTOR_ITEMS_FAILED
                });
            }
            })
        .catch(err => {
            dispatch({
                type: POST_CONSTRUCTOR_ITEMS_FAILED
            });
        })
    }
}