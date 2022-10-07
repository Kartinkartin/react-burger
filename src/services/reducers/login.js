import { RESET_USER, SET_USER } from "../actions/login";

const initialState = {
    "email": "",
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
        case RESET_USER: {
            return initialState
        }
        default: return state
    }
}