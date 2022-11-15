import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED,
    ORDER_NUMBER_RESET
} from "../actions/action-types/order";
import { TOrderNumActions } from "../types/actions";

type TOrderNumState = {
    number: string
}
const initialState: TOrderNumState = {
    number: '',
};

export const orderReducer = (state = initialState, action: TOrderNumActions) => {
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
                ...state,
                number: '',
            }
        }
        default: {
            return state
        }
    }
}