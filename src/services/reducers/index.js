import { bindActionCreators } from "redux"
import { GET_API_ITEMS_REQUEST,
        GET_API_ITEMS_SUCCESS,
        GET_API_ITEMS_FAILED,
        GET_CONSTRUCTOR_ITEMS_REQUEST,
        GET_CONSTRUCTOR_ITEMS_SUCCESS,
        GET_CONSTRUCTOR_ITEMS_FAILED,
        GET_INFO_CHOSEN_INGREDIENT,
        DELETE_INFO_CHOSEN_INGREDIENT,
        GET_ORDER_NUMBER,
        GET_CONSTRUCTOR_ITEMS, 
        POST_CONSTRUCTOR_ITEMS_SUCCESS} from "../actions"

export const initialState = {
    ingredientsApi: [],
    ingredientsConstructor: [],
    chosenIngredient: {},
    order: {
        number: 0
    }
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
        case GET_CONSTRUCTOR_ITEMS: {
            return {
                ...state,
                ingredientsConstructor: action.items
            }
        }
        case POST_CONSTRUCTOR_ITEMS_SUCCESS: {
            return {
                ...state,
                order: {
                    ...state.order,
                    number: action.number,
                }
            }
        }
        default: {
            return state
        }
    }
}