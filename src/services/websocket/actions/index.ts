import { AppThunk, WsDispatch } from "../../types"
import { TDisconnectWsAction, TStartWsAction } from "../../types/actions"
import { WS_CONNECTION_DISCONNECT, WS_CONNECTION_START } from "./wsActionTypes"

const startWsAction = (): TStartWsAction => ({
    type: WS_CONNECTION_START,
    payload: '/all'
})
const startWsProtectedRouteAction = (accessToken: string): TStartWsAction => ({
    type: WS_CONNECTION_START,
    payload: `?token=${accessToken}`
})
const disconnectWsAction = ():TDisconnectWsAction => ({
    type: WS_CONNECTION_DISCONNECT
})

export const startWs: AppThunk = () => (dispatch: WsDispatch) => {
    dispatch(startWsAction())
}
export const startWsProtectedRoute: AppThunk = (accessToken: string) => (dispatch: WsDispatch) => {
    dispatch(startWsProtectedRouteAction(accessToken))
}

export const disconnectWs: AppThunk = () => (dispatch: WsDispatch) => {
    dispatch(disconnectWsAction())
}