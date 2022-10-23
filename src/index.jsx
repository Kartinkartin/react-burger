import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './services/reducers';
import { socketMiddleware } from './services/websocket/middleware/socketMiddleware';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all'
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl)));



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
