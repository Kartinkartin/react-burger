import { WsDispatch } from "../../types"
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

export const startWs = () => (dispatch: WsDispatch) => {
    dispatch(startWsAction())
}
export const startWsProtectedRoute = (accessToken: string) => (dispatch: WsDispatch) => {
    dispatch(startWsProtectedRouteAction(accessToken))
}

export const disconnectWs = () => (dispatch: WsDispatch) => {
    dispatch(disconnectWsAction())
}