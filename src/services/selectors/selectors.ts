import { TIngredientsState } from "../reducers/ingredientsApi";
import { TStore } from "../types";

export const getApiIngredients = (store: TStore) => store.ingredientsApi;
export const getAccessToken = (store: TStore) => store.login.token;
export const getError = (store: TStore) => store.error;
export const getWSOrders = (store: TStore) => store.ws.orders;
export const getTotalDone = (store: TStore) => store.ws.total;
export const getTodayDone = (store: TStore) => store.ws.totalToday;
export const getOrderNum = (store: TStore) => store.order.number.toString();
export const getLoadingStatus = (store: TStore) => store.loading;
export const getConstructorIngedients = (store: TStore) => store.constructorItems.ingredientsConstructor;
