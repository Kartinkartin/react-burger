import { ThunkAction } from 'redux-thunk'; 
import { Action, ActionCreator } from 'redux';
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
    name:  string,
    email: string,
    password:  string,
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
export type AppDispatch = typeof store.dispatch;
export type WsDispatch = Dispatch<TWsActions>

export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TFeedActions | TWsActions
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
