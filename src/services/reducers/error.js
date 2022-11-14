import { ERROR_SET, ERROR_RESET } from "../actions/action-types/error";

const initialState = {
    code: '',
    message: ''
};

export const errorReducer = (state = initialState, action) => {
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
