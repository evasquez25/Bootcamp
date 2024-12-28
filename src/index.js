import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {
    ReactReduxFirebaseProvider,
    firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from '@redux-devtools/extension';

const firebaseConfig = {
    apiKey: "AIzaSyAmCpikt3yRESgjlZlYVyoR7iONUsufsec",
    authDomain: "datamatch-bootcamp-1dadb.firebaseapp.com",
    databaseURL: "https://datamatch-bootcamp-1dadb-default-rtdb.firebaseio.com",
    projectId: "datamatch-bootcamp-1dadb",
    storageBucket: "datamatch-bootcamp-1dadb.firebasestorage.app",
    messagingSenderId: "427061366578",
    appId: "1:427061366578:web:84ef776acf5b91667a512b"
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
});

// Create store with reducers
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>
);
