import { FORGOT_PASSWORD, REGISTER_USER } from "../actions/login";

const initialState = {
    "email": "", 
    "password": "", 
    "name": "" 
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER: {
            debugger;
            return {
                ...state,
                'email': action.user.email,
                'name': action.user.name
            }
        }
        case FORGOT_PASSWORD: {
            return {
                ...state,
                'email': action.email
            }
        }
        default: return state
    }
}