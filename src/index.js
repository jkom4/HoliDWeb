import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./stores/store"
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import {ErrorProvider} from "./ErrorContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
let persistor = persistStore(store);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ErrorProvider>
                    <App/>
                </ErrorProvider>
            </PersistGate>
        </Provider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
