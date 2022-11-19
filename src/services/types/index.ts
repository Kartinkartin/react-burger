import { Dispatch } from 'redux';
import { TConstructorState } from '../reducers/constructorItems';
import { TErrorState } from '../reducers/error';
import { TIngredientsState } from '../reducers/ingredientsApi';
import { TLoadingState } from '../reducers/loading';
import { TLoginState } from '../reducers/login';
import { TOrderNumState } from '../reducers/order';
import { TSocketState } from '../websocket/reducers/socketReducer';
import { TApplicationActions, TWsActions } from './actions';

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
export type AppDispatch = Dispatch<TApplicationActions>
export type WsDispatch = Dispatch<TWsActions>
