import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { wsUrl } from '../components/api/api';
import { rootReducer } from './reducers';
import { 
    WS_CONNECTION_CLOSED, 
    WS_CONNECTION_DISCONNECT, 
    WS_CONNECTION_ERROR, 
    WS_CONNECTION_START, 
    WS_CONNECTION_SUCCESS, 
    WS_GET_MESSAGE 
} from './websocket/actions/wsActionTypes';
import { socketMiddleware } from './websocket/middleware/socketMiddleware';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    wsClosing: WS_CONNECTION_DISCONNECT,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
export const store = createStore(rootReducer, enhancer); 