import { SET_ERROR, RESET_ERROR } from "../actions/error";

const initialState = {
    code: '',
    message: ''
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR: {
            return {
                ...state,
                code: action.code,
                message: action.message
            }
        }
        case RESET_ERROR: {
            return initialState;
        }
        default: return state
    }
}