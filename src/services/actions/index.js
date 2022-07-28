import { checkRes, getCards } from "../../components/api/api";

export const GET_API_ITEMS_REQUEST = 'GET_API_ITEMS_REQUEST';
export const GET_API_ITEMS_SUCCESS = 'GET_API_ITEMS_SUCCESS';
export const GET_API_ITEMS_FAILED = 'GET_API_ITEMS_FAILED';

export const GET_CONSTRUCTOR_ITEMS_REQUEST = 'GET_CONSTRUCTOR_ITEMS_REQUEST';
export const GET_CONSTRUCTOR_ITEMS_SUCCESS = 'GET_CONSTRUCTOR_ITEMS_SUCCESS';
export const GET_CONSTRUCTOR_ITEMS_FAILED = 'GET_CONSTRUCTOR_ITEMS_FAILED';

export const GET_INFO_CHOSEN_INGREDIENT = 'GET_INFO_CHOSEN_INGREDIENT';
export const DELETE_INFO_CHOSEN_INGREDIENT = 'DELETE_INFO_CHOSEN_INGREDIENT';

export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';

export function getApiItems() {
    return function(dispatch) {
        dispatch({
        type: GET_API_ITEMS_REQUEST
        });
        getCards()
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