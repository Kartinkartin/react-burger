import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/app' ;
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers';
import { socketMiddleware } from './services/websocket/middleware/socketMiddleware';
import { wsUrl } from './components/api/api';
import { 
  WS_CONNECTION_CLOSED, 
  WS_CONNECTION_DISCONNECT, 
  WS_CONNECTION_ERROR, 
  WS_CONNECTION_START, 
  WS_CONNECTION_SUCCESS, 
  WS_GET_MESSAGE 
} from './services/websocket/actions/wsActionTypes';


const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsActions = {
      wsInit: WS_CONNECTION_START,
      onOpen: WS_CONNECTION_SUCCESS,
      wsClosing: WS_CONNECTION_DISCONNECT,
      onClose: WS_CONNECTION_CLOSED,
      onError: WS_CONNECTION_ERROR,
      onMessage: WS_GET_MESSAGE
};
    
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
reportWebVitals();
