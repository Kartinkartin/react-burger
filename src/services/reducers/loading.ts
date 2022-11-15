import { LOADING_MODE_SET, LOADING_MODE_RESET } from "../actions/action-types/loading";
import { TLoadingActions } from "../types/actions";

type TLoadingState = true | false;
const initialState: TLoadingState = false;

export const loadingReducer = (state = initialState, action: TLoadingActions) => {
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