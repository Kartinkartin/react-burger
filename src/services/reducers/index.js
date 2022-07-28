import { bindActionCreators } from "redux"
import { GET_API_ITEMS_REQUEST,
        GET_API_ITEMS_SUCCESS,
        GET_API_ITEMS_FAILED,
        GET_CONSTRUCTOR_ITEMS_REQUEST,
        GET_CONSTRUCTOR_ITEMS_SUCCESS,
        GET_CONSTRUCTOR_ITEMS_FAILED,
        GET_INFO_CHOSEN_INGREDIENT,
        DELETE_INFO_CHOSEN_INGREDIENT,
        GET_ORDER_NUMBER } from "../actions"

export const initialState = {
    ingredientsApi: [],
    ingredientsConstructor: [],
    chosenIngredient: {},
    order: {}
}

export const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_API_ITEMS_REQUEST: {
            return state
        }
        case GET_API_ITEMS_SUCCESS: {
            return {
                ...state,
                ingredientsApi: action.items
            }
        }
        case GET_API_ITEMS_FAILED: {
            return state
        }
        default: {
            return state
        }
    }
}