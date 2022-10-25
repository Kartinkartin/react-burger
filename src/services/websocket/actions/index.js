export const startWsProtectedRoute = (accessToken) => (dispatch) => {
    dispatch({
        type: 'WS_CONNECTION_START_PROTECTED_ROUTE',
        payload: accessToken
    })
}