import {
    POST_CONSTRUCTOR_ITEMS_REQUEST,
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED,
    RESET_ORDER_NUMBER
} from "../actions/order";

const initialState = {
    number: '',
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_CONSTRUCTOR_ITEMS_SUCCESS: {
            return {
                ...state,
                number: action.number,
            }
        }
        case POST_CONSTRUCTOR_ITEMS_FAILED: {
            console.error(action.error);
            return state
        }
        case RESET_ORDER_NUMBER: {
            return {
                ...state.order,
                number: '',
            }
        }
        default: {
            return state
        }
    }
}