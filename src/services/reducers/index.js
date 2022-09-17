import { combineReducers } from "@reduxjs/toolkit"
import { GET_API_ITEMS_REQUEST,
        GET_API_ITEMS_SUCCESS,
        GET_API_ITEMS_FAILED,
        SET_INFO_CHOSEN_INGREDIENT,
        DELETE_INFO_CHOSEN_INGREDIENT,
        RESET_ORDER_NUMBER,
        ADD_INGREDIENT_TO_CONSTRUCTOR,
        ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
        SORT_INGREDIENTS_IN_CONSTRUCTOR,
        DELETE_INGREDIENT_FROM_CONSTRUCTOR,
        POST_CONSTRUCTOR_ITEMS_SUCCESS,
        POST_CONSTRUCTOR_ITEMS_FAILED} from "../actions"

export const initialState = {
    ingredientsApi: [],
    ingredientsConstructor: [],
    counter: {},
    chosenIngredient: {},
    order: {
        number: '',
    }
}

const initialItemsReducer = (state=initialState.ingredientsApi, action) => {
    switch (action.type) {
        case GET_API_ITEMS_REQUEST: {
            return state
        }
        case GET_API_ITEMS_SUCCESS: {
            return [
                ...action.items
            ]
        }
        case GET_API_ITEMS_FAILED: {
            console.error(action.error);
            return state
        }
        default: {
            return state
        }
    }
}

const constructorItemsReducer = (state={
                                        ingredientsConstructor: initialState.ingredientsConstructor,
                                        counter: initialState.counter}, action) => {
    switch (action.type) {
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
            const hasBun = state.ingredientsConstructor.some(item => item.type === 'bun');
            const currentBun = state.ingredientsConstructor.filter(item => item.type === 'bun')[0];
            return {
                ...state,
                counter: 
                    hasBun ? 
                    {
                        ...state.counter,
                        [action.item._id]: 2,
                        [currentBun._id]: 0
                    } :
                    {
                        ...state.counter,
                        [action.item._id]: 2
                    },
                ingredientsConstructor: 
                    hasBun ? 
                    [action.item, ...state.ingredientsConstructor.slice(1)] :
                    [action.item, ...state.ingredientsConstructor],
            }
        }
        case SORT_INGREDIENTS_IN_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: state.ingredientsConstructor
                                        .filter(item => item.type === 'bun')
                                        .concat(action.ingredients),
            }
        }
        case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
            if (state.counter[action.id] === 1) {delete state.counter[action.id]};
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
                state.counter
                
            }
        }
        default: {
            return state
        }
    }
}

const orderReducer = (state=initialState.order, action) => {
    switch (action.type) {
        case POST_CONSTRUCTOR_ITEMS_SUCCESS: {
            return {  
            ...state,
            number: action.number,
            }
        }
        case POST_CONSTRUCTOR_ITEMS_FAILED: {
            console.error(action.error);
            return state
        }
        case RESET_ORDER_NUMBER: {
            return {
                ...state.order,
                number: '',
            }
        }
        default: {
            return state
        }
    }
}

const chosenIngredientReducer = (state=initialState.chosenIngredient, action) => {
    switch (action.type) {
        case SET_INFO_CHOSEN_INGREDIENT: {
            return {
                ...action.item
            }
        }
        case DELETE_INFO_CHOSEN_INGREDIENT: {
            return { }
        }
        
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    ingredientsApi: initialItemsReducer,
    constructorItems: constructorItemsReducer,
    order: orderReducer,
    chosenIngredient: chosenIngredientReducer
})

function checkExistence (state, action) {
    return state.ingredientsConstructor.map(item=>item._id).includes(action.item._id)
}