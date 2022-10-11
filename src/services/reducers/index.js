import { combineReducers } from "@reduxjs/toolkit";

import { initialItemsReducer } from "./ingredientsApi";
import { constructorItemsReducer } from "./constructorItems";
import { orderReducer } from "./order";
import { loadingReducer } from "./loading";
import { loginReducer } from "./login";

export const rootReducer = combineReducers({
    ingredientsApi: initialItemsReducer,
    constructorItems: constructorItemsReducer,
    order: orderReducer,
    loading: loadingReducer,
    login: loginReducer
})

