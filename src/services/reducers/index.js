import { act } from "react-dom/test-utils"
import { useSelector } from "react-redux"
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
        ADD_INGREDIENT_TO_CONSTRUCTOR,
        ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
        POST_CONSTRUCTOR_ITEMS_SUCCESS} from "../actions"

export const initialState = {
    ingredientsApi: [],
    ingredientsConstructor: [],
    counter: {},
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
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {
                ...state,
                counter: checkExistence(state, action) ?
                {
                    ...state.counter,
                    [action.item._id]:  state.counter[action.item._id] + 1
                } : {
                    ...state.counter,
                    [action.item._id]: 1
                } ,
                ingredientsConstructor: state.ingredientsConstructor.concat(action.item),
                
            }
        }
        case ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: [action.item, ...state.ingredientsConstructor.slice(1)],
                counter:  
                {
                    ...state.counter,
                }
                 //Замени булку в счетчике
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
        case GET_INFO_CHOSEN_INGREDIENT: {
            return {
                ...state,
                chosenIngredient: action.item
            }
        }
        case DELETE_INFO_CHOSEN_INGREDIENT: {
            return {
                ...state,
                chosenIngredient: {}
            }
        }
        default: {
            return state
        }
    }
}

function checkExistence (state, action) {
    return state.ingredientsConstructor.map(item=>item._id).includes(action.item._id)
}