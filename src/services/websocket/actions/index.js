import { WS_CONNECTION_DISCONNECT, WS_CONNECTION_START } from "./wsActionTypes"


export const startWs = () => (dispatch) => {
    dispatch({
        type: WS_CONNECTION_START,
        payload: '/all'
    })
}
export const startWsProtectedRoute = (accessToken) => (dispatch) => {
    dispatch({
        type: WS_CONNECTION_START,
        payload: `?token=${accessToken}`
    })
}

export const disconnectWs = () => (dispatch) => {
    dispatch({
        type: WS_CONNECTION_DISCONNECT
    })
}