import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { store } from './services/store';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
reportWebVitals();
