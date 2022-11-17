import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED
} from "./action-types/ingredientsApi";
import {
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_ADD_OR_CHANGE_BUN,
    CONSTRUCTOR_DELETE_INGREDIENT,
    CONSTRUCTOR_SORT_INGREDIENTS,
    CONSTRUCTOR_RESET_INGREDIENTS
} from "./action-types/constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "./action-types/order";
import { ORDER_NUMBER_RESET } from "./action-types/order";
import { LOADING_MODE_SET, LOADING_MODE_RESET } from "./action-types/loading";
import {
    USER_SET,
    USER_RESET,
    USER_REFRESH,
    USER_CHANGE_DATA
} from "./action-types/login";
import { ERROR_SET, ERROR_RESET } from "./action-types/error";
import {
    TAddIngredientAction,
    TAddOrChangeBunAction,
    TChangeUserDataAction,
    TDeleteIngredientAction,
    TGetApiItemsFailedAction,
    TGetApiItemsRequestAction,
    TGetApiItemsSuccessAction,
    TPostItemsFailedAction,
    TPostItemsSuccessAction,
    TRefreshUserAction,
    TResetConstructorAction,
    TResetErrorAction,
    TResetLoadingModeAction,
    TResetOrderNumAction,
    TResetUserAction,
    TSetErrorAction,
    TSetLoadingModeAction,
    TSetUserAction,
    TSortIngredientAction
} from "../types/actions";
import { TIngredient, TUser } from "../types/data";
import { TChangeUserData } from "../types";


export const setErrorAction = (code: any, message: string): TSetErrorAction => ({
    type: ERROR_SET,
    code: code,
    message: message
})
export const resetErrorAction = (): TResetErrorAction => ({
    type: ERROR_RESET
})
export const setLoadingModeAction = (): TSetLoadingModeAction => ({
    type: LOADING_MODE_SET
})
export const resetLoadingModeAction = (): TResetLoadingModeAction => ({
    type: LOADING_MODE_RESET
})
export const getApiItemsRequestAction = (): TGetApiItemsRequestAction => ({
    type: GET_API_ITEMS_REQUEST
})
export const getApiItemsSuccessAction = (data: Array<TIngredient>): TGetApiItemsSuccessAction => ({
    type: GET_API_ITEMS_SUCCESS,
    items: data
})
export const getApiItemsFailedAction = (err: any): TGetApiItemsFailedAction => ({
    type: GET_API_ITEMS_FAILED,
    error: err
})
export const addIngredientAction = (prod: TIngredient): TAddIngredientAction => ({
    type: CONSTRUCTOR_ADD_INGREDIENT,
    item: prod
})
export const addOrChangeBunAction = (bun: TIngredient, key: string): TAddOrChangeBunAction => ({
    type: CONSTRUCTOR_ADD_OR_CHANGE_BUN,
    item: bun,
    key: key
})
export const sortIngredientsAction = (item: TIngredient, droppedIndex: number, draggedIndex: number): TSortIngredientAction => ({
    type: CONSTRUCTOR_SORT_INGREDIENTS,
    draggedIndex: draggedIndex,
    droppedIndex: droppedIndex,
    item: item
})
export const deleteIngredientAction = (notBunsIngredients: Array<TIngredient>, id: string): TDeleteIngredientAction => ({
    type: CONSTRUCTOR_DELETE_INGREDIENT,
    ingredients: notBunsIngredients,
    id: id,
})
export const postItemsSuccessAction = (number: number): TPostItemsSuccessAction => ({
    type: POST_CONSTRUCTOR_ITEMS_SUCCESS,
    number: number
})
export const postItemsFailedAction = (err: any): TPostItemsFailedAction => ({
    type: POST_CONSTRUCTOR_ITEMS_FAILED,
    error: err
})
export const resetConstructorAction = (): TResetConstructorAction => ({
    type: CONSTRUCTOR_RESET_INGREDIENTS
})
export const resetOrderNumAction = (): TResetOrderNumAction => ({
    type: ORDER_NUMBER_RESET
})
export const setUserAction = (user: TUser, password: string, accessToken: string): TSetUserAction => ({
    type: USER_SET,
    user: { ...user, 'password': password },
    token: accessToken,
})
export const resetUserAction = (): TResetUserAction => ({
    type: USER_RESET,
})
export const refreshUserAction = (accessToken: string): TRefreshUserAction => ({
    type: USER_REFRESH,
    token: accessToken
})
export const changeUserDataAction = (data: TChangeUserData): TChangeUserDataAction => ({
    type: USER_CHANGE_DATA,
    changed: { ...data }
})