import { GET_API_ITEMS_REQUEST, GET_API_ITEMS_SUCCESS, GET_API_ITEMS_FAILED } from "../actions/ingredientsApi";

const initialState = [];

export const initialItemsReducer = (state = initialState, action) => {
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