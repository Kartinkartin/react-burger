import { 
    GET_API_ITEMS_REQUEST, 
    GET_API_ITEMS_SUCCESS, 
    GET_API_ITEMS_FAILED 
} from "../actions/action-types/ingredientsApi";
import { TGetApiItemsActions } from "../types/actions";

type TIngredientsState = [];
const initialState: TIngredientsState = [];

export const initialItemsReducer = (state = initialState, action: TGetApiItemsActions) => {
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
