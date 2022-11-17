import {
    getCardsRequest,
    postOrderRequest,
    loginUserRequest,
    logoutUserRequest,
    refreshTokenRequest,
    changeUserDataRequest,
} from "../../components/api/api";
import { deleteCookie, getCookie, setCookie } from "../utils/cookie";
import { TIngredient } from "../types/data";
import { AppDispatch, TChangeUserData, TLoginData } from "../types";
import {
    addIngredientAction,
    addOrChangeBunAction,
    changeUserDataAction,
    deleteIngredientAction,
    getApiItemsFailedAction,
    getApiItemsRequestAction,
    getApiItemsSuccessAction,
    postItemsFailedAction,
    postItemsSuccessAction,
    refreshUserAction,
    resetConstructorAction,
    resetErrorAction,
    resetLoadingModeAction,
    resetOrderNumAction,
    resetUserAction,
    setErrorAction,
    setLoadingModeAction,
    setUserAction,
    sortIngredientsAction
} from "./actions";


// action creator для получения всего набора, см. ConstructorPage
export function getApiItems() {
    return function (dispatch: AppDispatch) {
        dispatch(getApiItemsRequestAction());
        // установка модалки с ожиданием
        dispatch(setLoadingModeAction());
        return getCardsRequest()
            .then(res => {
                // снятие модалки с ожиданием
                dispatch(resetLoadingModeAction())
                if (res && res.success) {
                    dispatch(getApiItemsSuccessAction(res.data));
                } else {
                    dispatch(getApiItemsFailedAction(res));
                }
            })
            .catch(err => {
                dispatch(getApiItemsFailedAction(err));
            })
    };
}

export const addIngredient = (prod: TIngredient) => (dispatch: AppDispatch) => {
    dispatch(addIngredientAction(prod));
}
export const addOrChangeBun = (bun: TIngredient, key: string) => (dispatch: AppDispatch) => {
    dispatch(addOrChangeBunAction(bun, key))
}
export const sortIngredients = (item: TIngredient, droppedIndex: number, draggedIndex: number) => (dispatch: AppDispatch) => {
    dispatch(sortIngredientsAction(item, droppedIndex, draggedIndex))
}
export const deleteIngredient = (notBunsIngredients: Array<TIngredient>, id: string) => (dispatch: AppDispatch) => {
    dispatch(deleteIngredientAction(notBunsIngredients, id))
}
export const resetOrderNum = () => (dispatch: AppDispatch) => {
    dispatch(resetOrderNumAction())
}

// action creator для отправки заказа, см. ConstructorPage
export const postOrder = (orderList: Array<TIngredient>, token: string) => {
    const orderListId = orderList.map((item): string => item._id);
    orderListId.push(orderList[0]._id);
    return function (dispatch: AppDispatch) {
        dispatch(setLoadingModeAction())
        postOrderRequest(orderListId, token)
            .then(res => {
                if (res && res.success) {
                    dispatch(postItemsSuccessAction(res.order.number))
                    dispatch(resetConstructorAction());
                } else {
                    dispatch(postItemsFailedAction(res));
                }
                dispatch(resetLoadingModeAction())
            })
            .catch(err => {
                dispatch(postItemsFailedAction(err));
            })
    }
}

export const loginUser = (loginData: TLoginData, history: any) => {
    let accessToken;
    return function (dispatch: AppDispatch) {
        loginUserRequest(loginData)
            .then(res => {
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken
                dispatch(setUserAction(res.user, loginData.password, accessToken))
                setCookie('date', new Date().toString());
                setCookie('refreshToken', res.refreshToken);
            }
            )
            .then(res => {
                history.replace({ pathname: history.location.state?.from || '/' })
            })
            .catch(err => {
                console.log(err[0])
                err[1]
                    .then((res: object & { massage: string }) => {
                        dispatch(setErrorAction(err[0], res.massage))
                    })
            })
    }
}

export const logoutUser = (token: string, history: any) => {
    let logoutData = {
        "token": token
    };
    return function (dispatch: AppDispatch) {
        logoutUserRequest(logoutData)
            .then(res => {
                dispatch(resetUserAction())
                const oldTokenCookie = getCookie('refreshToken');
                const oldDate = getCookie('date')
                deleteCookie('refreshToken', oldTokenCookie);
                deleteCookie('date', oldDate)
            }
            )
            .then(res => history.replace({ pathname: '/login' }))
            .catch(res => {
                console.log(res)
            }) //как-нибудь сказать, что наши полномочия все.

    }
}

// action creator обновляет просроченный accessToken, отправляет в запросе refreshToken 
export const refreshUser = (token: string) => {
    let refreshData = {
        "token": token
    };
    let accessToken = null;
    return function (dispatch: AppDispatch) {
        return refreshTokenRequest(refreshData)
            .then(res => {
                const oldDate = getCookie('date');
                deleteCookie('refreshToken', token);
                deleteCookie('date', oldDate);
                if (res.accessToken.indexOf('Bearer') === 0) accessToken = res.accessToken.split('Bearer ')[1]
                else accessToken = res.accessToken;
                dispatch(refreshUserAction(accessToken))
                setCookie('refreshToken', res.refreshToken);
                setCookie('date', new Date().toString());
                return accessToken;
            })
            .catch(err => console.log(err)) // я кончилась где-то на написании текста ошибок Т.Т

    }
}

// action creator обновляет данные пользователя, см. Profile
export const changeUserData = (token: string, newData: TChangeUserData) => {
    return function (dispatch: AppDispatch) {
        changeUserDataRequest(token, newData)
            .then(res => {
                dispatch(changeUserDataAction(newData))
            })
            .catch(err => console.log(err)) //честно, ни одной идеи нет. но я что-то могу и показала это в логине

    }
}

export const deleteError = () => (dispatch: AppDispatch) => {
    dispatch(resetErrorAction())
}

// проверяет актаульность и наличие токена в store, потом выполняет переданный action
// принимает набор аргументов для экшена и далее сама диспатчила переданный 
// экшен со всеми его аргументами. Будет выполнять просто экшен, 
// если с токеном все ок и обновлять токен, а потом выполнять экшен, если токен истёк. 
// Над названием можно подумать еще)
export const performActionWithRefreshedToken = (accessToken: string, action: any, ...args: any) => {
    const tokenLifeTime: number = 20 * 60 * 1000; // 20 min
    const tokenDate = new Date(getCookie('date')).getTime();
    return function (dispatch: any) {
        if ((new Date().getTime() - tokenDate < tokenLifeTime) && accessToken) {
            dispatch(action(...args, accessToken));
        }
        if ((new Date().getTime() - tokenDate > tokenLifeTime) || !accessToken) {
            const refreshToken = getCookie('refreshToken');
            dispatch(refreshUser(refreshToken))
                .then((accessToken: string) => dispatch(action(...args, accessToken)))
        }
    }
}
