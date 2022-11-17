import { Dispatch } from 'redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_DISCONNECT, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from '../websocket/actions/wsActionTypes';
import { TApplicationActions, TWsActions } from './actions';

export type TLoginData = {
    name:  string,
    email: string,
    password:  string,
}
export type TChangeUserData = Partial<TLoginData>

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>
export type WsDispatch = Dispatch<TWsActions>
