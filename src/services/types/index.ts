import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, StateFromReducersMapObject } from 'redux';
import { store } from '../store';
import { Dispatch } from 'redux';
import { TConstructorState } from '../reducers/constructorItems';
import { TErrorState } from '../reducers/error';
import { TIngredientsState } from '../reducers/ingredientsApi';
import { TLoadingState } from '../reducers/loading';
import { TLoginState } from '../reducers/login';
import { TOrderNumState } from '../reducers/order';
import { TSocketState } from '../websocket/reducers/socketReducer';
import { TFeedActions, TWsActions } from './actions';

export type TLoginData = {
    name: string,
    email: string,
    password: string,
}
export type TChangeUserData = Partial<TLoginData>
export type TStore = {
    ingredientsApi: TIngredientsState,
    login: TLoginState,
    error: TErrorState,
    ws: TSocketState,
    order: TOrderNumState,
    loading: TLoadingState,
    constructorItems: TConstructorState
}
export type TLocationState = {
    from?: {
        pathname: string
    }
    background?: {
        pathname: string
    }
}


// Типизация метода dispatch для проверки на валидность отправляемого экшена
// export type AppDispatch = Dispatch<TFeedActions>
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TFeedActions | TWsActions

export type AppDispatch = ThunkDispatch<RootState, any, TApplicationActions>;
export type WsDispatch = Dispatch<TWsActions>


export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;


import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';



// Теперь этот хук знает структуру хранилища
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

// Хук не даст отправить экшен, который ему не знаком
// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 