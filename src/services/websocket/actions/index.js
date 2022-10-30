import { wsUrl } from "../../../components/api/api"
import { WS_CONNECTION_DISCONNECT, WS_CONNECTION_START } from "./wsActionTypes"


export const startWs = () => (dispatch) => {
    dispatch({
        type: WS_CONNECTION_START,
        payload: `${wsUrl}/all`
    })
}
export const startWsProtectedRoute = (accessToken) => (dispatch) => {
    dispatch({
        type: WS_CONNECTION_START,
        payload: `${wsUrl}?token=${accessToken}`
    })
}

export const disconnectWs = () => (dispatch) => {
    dispatch({
        type: WS_CONNECTION_DISCONNECT
    })
}