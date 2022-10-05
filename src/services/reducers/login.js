import { FORGOT_PASSWORD, REGISTER_USER } from "../actions/login";

const initialState = {
    "email": "", 
    "password": "", 
    "name": "",
    "token": "" 
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER: {
            debugger;
            return {
                ...state,
                'email': action.user.email,
                'name': action.user.name,
                'token': action.token
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