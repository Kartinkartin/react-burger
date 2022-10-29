export const getApiIngredients = store => store.ingredientsApi;
export const getAccessToken = store => store.login.token;
export const getError = store => store.error;
export const getWSOrders = store => store.ws.orders;
export const getTotalDone = store => store.ws.total;
export const getTodayDone = store => store.ws.totalToday;
export const getOrderNum = store => store.order.number.toString();
export const getLoadingStatus = store => store.loading;
export const getConstructorIngedients = store => store.constructorItems.ingredientsConstructor;
export const getIngredientCounter = id => store => store.constructorItems.counter[id]
