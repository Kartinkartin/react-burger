import { useSelector } from "react-redux"
import { GET_API_ITEMS_REQUEST,
        GET_API_ITEMS_SUCCESS,
        GET_API_ITEMS_FAILED,
        GET_CONSTRUCTOR_ITEMS_REQUEST,
        GET_CONSTRUCTOR_ITEMS_SUCCESS,
        GET_CONSTRUCTOR_ITEMS_FAILED,
        GET_INFO_CHOSEN_INGREDIENT,
        DELETE_INFO_CHOSEN_INGREDIENT,
        GET_ORDER_NUMBER,
        RESET_ORDER_NUMBER,
        GET_CONSTRUCTOR_ITEMS, 
        ADD_INGREDIENT_TO_CONSTRUCTOR,
        ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
        DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        POST_CONSTRUCTOR_ITEMS_SUCCESS,
        POST_CONSTRUCTOR_ITEMS_FAILED} from "../actions"

export const initialState = {
    ingredientsApi: [],
    ingredientsConstructor: [],
    counter: {},
    chosenIngredient: {},
    order: {
        number: ''
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
            console.log(action.error);
            return {...state}
        }
        case GET_CONSTRUCTOR_ITEMS: { //проверить, вроде лишний
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
                ingredientsConstructor: 
                    state.ingredientsConstructor.filter(item => item.type == 'bun').length ? 
                    [action.item, ...state.ingredientsConstructor.slice(1)] :
                    [action.item, ...state.ingredientsConstructor],
            }
        }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            if (state.counter[action.id] === 1) {delete state.counter[action.id]};
            debugger;
            return {
                ...state,
                ingredientsConstructor: state.ingredientsConstructor
                                        .filter(item => item.type==='bun')
                                        .concat(action.ingredients),
                counter: state.counter[action.id] ?
                {
                    ...state.counter,
                    [action.id]: state.counter[action.id] - 1
                } : 
                {
                    ...state.counter
                }
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
        case POST_CONSTRUCTOR_ITEMS_FAILED: {
            console.log(action.error);
            return {
                ...state
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
        case RESET_ORDER_NUMBER: {
            return {
                ...state,
                order: {
                    ...state.order,
                    number: '',
                }
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