import {
    GET_API_ITEMS_REQUEST,
    GET_API_ITEMS_SUCCESS,
    GET_API_ITEMS_FAILED
} from "../actions/action-types/ingredientsApi";
import {
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_ADD_OR_CHANGE_BUN,
    CONSTRUCTOR_DELETE_INGREDIENT,
    CONSTRUCTOR_SORT_INGREDIENTS,
    CONSTRUCTOR_RESET_INGREDIENTS
} from "../actions/action-types/constructorItems";
import {
    POST_CONSTRUCTOR_ITEMS_SUCCESS,
    POST_CONSTRUCTOR_ITEMS_FAILED
} from "../actions/action-types/order";
import { ORDER_NUMBER_RESET } from "../actions/action-types/order";
import { LOADING_MODE_SET, LOADING_MODE_RESET } from "../actions/action-types/loading";
import { TIngredient, TUser } from "./data";
import { USER_CHANGE_DATA, USER_REFRESH, USER_RESET, USER_SET } from "../actions/action-types/login";
import { ERROR_RESET, ERROR_SET } from "../actions/action-types/error";
import { TChangeUserData } from ".";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_DISCONNECT, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../websocket/actions/wsActionTypes";
import { type } from "os";

// типизация App actions 
export type TSetErrorAction = {
    readonly type: typeof ERROR_SET,
    readonly code: string,
    readonly message?: string
}
export type TResetErrorAction = {
    readonly type: typeof ERROR_RESET
}
export type TSetLoadingModeAction = {
    readonly type: typeof LOADING_MODE_SET
}
export type TResetLoadingModeAction = {
    readonly type: typeof LOADING_MODE_RESET
}
export type TGetApiItemsRequestAction = {
    readonly type: typeof GET_API_ITEMS_REQUEST
}
export type TGetApiItemsSuccessAction = {
    readonly type: typeof GET_API_ITEMS_SUCCESS,
    readonly items: Array<TIngredient>
}
export type TGetApiItemsFailedAction = {
    readonly type: typeof GET_API_ITEMS_FAILED,
    readonly error: any
}
export type TAddIngredientAction = {
    readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT,
    readonly item: TIngredient
}
export type TAddOrChangeBunAction = {
    readonly type: typeof CONSTRUCTOR_ADD_OR_CHANGE_BUN,
    readonly item: TIngredient,
    readonly key: string
}
export type TSortIngredientAction = {
    readonly type: typeof CONSTRUCTOR_SORT_INGREDIENTS,
    readonly draggedIndex: number,
    readonly droppedIndex: number,
    readonly item: TIngredient
}
export type TDeleteIngredientAction = {
    readonly type: typeof CONSTRUCTOR_DELETE_INGREDIENT,
    readonly ingredients: Array<TIngredient>,
    readonly id: string
}
export type TPostItemsSuccessAction = {
    readonly type: typeof POST_CONSTRUCTOR_ITEMS_SUCCESS,
    readonly number: number
}
export type TPostItemsFailedAction = {
    readonly type: typeof POST_CONSTRUCTOR_ITEMS_FAILED,
    readonly error: any
}
export type TResetConstructorAction = {
    readonly type: typeof CONSTRUCTOR_RESET_INGREDIENTS
}
export type TResetOrderNumAction = {
    readonly type: typeof ORDER_NUMBER_RESET
}
export type TSetUserAction = {
    readonly type: typeof USER_SET,
    readonly user: TUser,
    readonly token: string,
}
export type TResetUserAction = {
    readonly type: typeof USER_RESET,
}
export type TRefreshUserAction = {
    readonly type: typeof USER_REFRESH,
    readonly token: string
}
export type TChangeUserDataAction = {
    readonly type: typeof USER_CHANGE_DATA,
    readonly changed: TChangeUserData
}

export type TErrorActions = TSetErrorAction | TResetErrorAction;
//юнион тип для ошибок. См. reducers/error.ts
export type TLoadingActions = TSetLoadingModeAction | TResetLoadingModeAction;
//юнион тип для ошибок. См. reducers/loading.ts 
export type TGetApiItemsActions = TGetApiItemsFailedAction | TGetApiItemsRequestAction | TGetApiItemsSuccessAction;
//юнион тип для ошибок. См. reducers/ingredientsApi.ts
export type TUserActions = TSetUserAction | TResetUserAction | TRefreshUserAction | TChangeUserDataAction;
//юнион тип для логина и данных профиля. См. reducers/login.ts
export type TConstructorActions = TAddIngredientAction | TAddOrChangeBunAction | TDeleteIngredientAction | TResetConstructorAction | TSortIngredientAction;
//юнион тип для сборки заказа. См. reducers/constructorItems.ts
export type TOrderNumActions = TPostItemsSuccessAction | TPostItemsFailedAction | TResetOrderNumAction;
//юнион тип для номера заказа. См. reducers/order.ts

export type TApplicationActions = TConstructorActions | TErrorActions | TLoadingActions | TGetApiItemsActions | TUserActions | TOrderNumActions;


//типизация webSocket actions
    //для обычного и защищенного роутинга
export type TStartWsAction = {
    readonly type: typeof WS_CONNECTION_START,
    readonly payload: string | object
}

export type TDisconnectWsAction = {
    readonly type: typeof WS_CONNECTION_DISCONNECT,
    readonly payload?: string
}
export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS
    readonly payload?: string
}
export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR
    readonly payload?: string
}
export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED
    readonly payload?: string
}
export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: {
        orders: Array<any>,
        total: number,
        totalToday: number
    }
}

export type TWsActions = TStartWsAction | TDisconnectWsAction | TWsConnectionSuccessAction | TWsConnectionErrorAction | TWsConnectionClosedAction | TWsGetMessageAction;
