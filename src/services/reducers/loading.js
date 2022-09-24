import { SET_LOADING_MODE, RESET_LOADING_MODE } from "../actions/loading";

const initialState = false;

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_MODE: {
            return true
        }
        case RESET_LOADING_MODE: {
            return false
        }
        default: return state
    }
}