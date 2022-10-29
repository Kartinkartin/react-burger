import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED,
    ORDER_NUMBER_RESET
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
        case ORDER_NUMBER_RESET: {
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