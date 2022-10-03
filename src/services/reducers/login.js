import { FORGOT_PASSWORD } from "../actions/login";

const initialState = {
    "email": "", 
    "password": "", 
    "name": "" 
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD: {
            return state
        }
        default: return state
    }
}