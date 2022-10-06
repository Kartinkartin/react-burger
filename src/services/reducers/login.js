import { FORGOT_PASSWORD, SET_USER } from "../actions/login";

const initialState = {
    "email": "", 
    "password": "", 
    "name": "",
    "token": "" 
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                'email': action.user.email,
                'name': action.user.name,
                'token': action.token
            }
        }
        case FORGOT_PASSWORD: { //тож мож лишний
            return {
                ...state,
                'email': action.email
            }
        }
        default: return state
    }
}