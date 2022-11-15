import { ERROR_SET, ERROR_RESET } from "../actions/action-types/error";
import { TErrorActions } from "../types/actions";


type TErrorState = {
    code: string,
    message: string
}
const initialState: TErrorState = {
    code: '',
    message: ''
};

export const errorReducer = (state = initialState, action: TErrorActions) => {
    switch (action.type) {
        case ERROR_SET: {
            return {
                ...state,
                code: action.code,
                message: action.message
            }
        }
        case ERROR_RESET: {
            return initialState;
        }
        default: return state
    }
}
