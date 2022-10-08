import { RESET_USER, SET_USER, REFRESH_USER } from "../actions/login";

const initialState = {
    "email": "",
    "name": "",
    "password": "",
    "token": "" 
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                'email': action.user.email,
                'name': action.user.name,
                'password': action.user.password,
                'token': action.token
                
            }
        }
        case RESET_USER: {
            return initialState
        }
        case REFRESH_USER: {
            return {
                ...state,
                'token': action.token
            }
        }
        default: return state
    }
}