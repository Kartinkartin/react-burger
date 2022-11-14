import {
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_ADD_OR_CHANGE_BUN,
    CONSTRUCTOR_SORT_INGREDIENTS,
    CONSTRUCTOR_DELETE_INGREDIENT,
    CONSTRUCTOR_RESET_INGREDIENTS
} from "../actions/action-types/constructorItems";

const initialState = {
    ingredientsConstructor: [],
    counter: {},
}

export const constructorItemsReducer = (state = {
    ingredientsConstructor: initialState.ingredientsConstructor,
    counter: initialState.counter
}, action) => {
    switch (action.type) {
        case CONSTRUCTOR_ADD_INGREDIENT: {
            return {
                ...state,
                counter: checkExistence(state, action) ?
                    {
                        ...state.counter,
                        [action.item._id]: state.counter[action.item._id] + 1
                    } : {
                        ...state.counter,
                        [action.item._id]: 1
                    },
                ingredientsConstructor: state.ingredientsConstructor.concat(action.item),

            }
        }
        case CONSTRUCTOR_ADD_OR_CHANGE_BUN: {
            const hasBun = state.ingredientsConstructor.some(item => item.type === 'bun');
            const currentBun = hasBun ? state.ingredientsConstructor.find(item => item.type === 'bun') : null;
            return {
                ...state,
                counter:
                    (hasBun && currentBun._id !== action.item._id) ?
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
        case CONSTRUCTOR_SORT_INGREDIENTS: {
            const hasBun = state.ingredientsConstructor.some(item => item.type === 'bun');
            const notBuns = hasBun ? state.ingredientsConstructor.filter(prod => prod.type !== 'bun') : state.ingredientsConstructor ;
            if (action.droppedIndex > action.draggedIndex) {
                notBuns.splice(action.droppedIndex + 1, 0, action.item);
                notBuns.splice(action.draggedIndex, 1)
            }
            if (action.droppedIndex < action.draggedIndex) {
                notBuns.splice(action.draggedIndex, 1);
                notBuns.splice(action.droppedIndex, 0, action.item)
            }
            return {
                ...state,
                ingredientsConstructor: hasBun ? state.ingredientsConstructor.slice(0, 1).concat(notBuns) : notBuns
            }
        }
        case CONSTRUCTOR_DELETE_INGREDIENT: {
            if (state.counter[action.id] === 1) { delete state.counter[action.id] };
            return {
                ...state,
                ingredientsConstructor: state.ingredientsConstructor
                    .filter(item => item.type === 'bun')
                    .concat(action.ingredients),
                counter: state.counter[action.id] ?
                    {
                        ...state.counter,
                        [action.id]: state.counter[action.id] - 1
                    } :
                    state.counter

            }
        }
        case CONSTRUCTOR_RESET_INGREDIENTS: {
            return {
                ingredientsConstructor: initialState.ingredientsConstructor,
                counter: initialState.counter
            }
        }
        default: {
            return state
        }
    }
}

function checkExistence(state, action) {
    return state.ingredientsConstructor.some(item => item._id === action.item._id)
}
