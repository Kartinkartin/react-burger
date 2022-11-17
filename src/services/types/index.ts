import { Dispatch } from 'redux';
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
