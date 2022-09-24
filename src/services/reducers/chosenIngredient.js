import {
    SET_INFO_CHOSEN_INGREDIENT,
    DELETE_INFO_CHOSEN_INGREDIENT
} from "../actions/chosenIngredient";

const initialState = {};

export const chosenIngredientReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case SET_INFO_CHOSEN_INGREDIENT: {
            debugger
            return action.item

        }
        case DELETE_INFO_CHOSEN_INGREDIENT: {
            return initialState
        }

        default: {
            return state
        }
    }
}
