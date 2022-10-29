import { LOADING_MODE_SET, LOADING_MODE_RESET } from "../actions/loading";

const initialState = false;

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_MODE_SET: {
            return true
        }
        case LOADING_MODE_RESET: {
            return false
        }
        default: return state
    }
}