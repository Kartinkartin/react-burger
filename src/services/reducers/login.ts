import { USER_RESET, USER_SET, USER_REFRESH, USER_CHANGE_DATA } from "../actions/action-types/login";
import { TUserActions } from "../types/actions";

export type TLoginState = {
    "email": string,
    "name": string,
    "password": string,
    "token": string
}
const initialState: TLoginState = {
    "email": "",
    "name": "",
    "password": "",
    "token": ""
};

export const loginReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
        case USER_SET: {
            return {
                ...state,
                'email': action.user.email,
                'name': action.user.name,
                'password': action.user.password,
                'token': action.token

            }
        }
        case USER_RESET: {
            return initialState
        }
        case USER_REFRESH: {
            return {
                ...state,
                'token': action.token
            }
        }
        case USER_CHANGE_DATA: {
            return {
                ...state,
                "email": action.changed.email ? action.changed.email : state.email,
                "name": action.changed.name ? action.changed.name : state.name,
                "password": action.changed.password ? action.changed.password : state.password
            }
        }
        default: return state
    }
}