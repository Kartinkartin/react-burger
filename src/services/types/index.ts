import { ThunkAction, ThunkDispatch } from 'redux-thunk';
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
import { 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_DISCONNECT, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE 
} from '../websocket/actions/wsActionTypes';
import { TUser } from './data';

export type TwsActions = {

    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    wsClosing: typeof WS_CONNECTION_DISCONNECT,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE
}
export interface TLoginData {
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
    from?: string & {
        pathname: string
    },
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