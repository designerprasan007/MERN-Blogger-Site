import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';

import './index.css';
import App from './App';

import reducers from './reducers';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'



const userInfoFromStorage = localStorage.getItem('Userinfo')
  ? JSON.parse(localStorage.getItem('Userinfo'))
  : null

const initialState = {
     AuthReducer: {userdata:userInfoFromStorage}
}

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

ReactDOM.render(
  	<Provider store={store} >
	    <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
