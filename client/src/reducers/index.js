import {combineReducers} from 'redux';

import {AuthReducer, RegisterReducer} from './AuthReducer';
import {GetUserReducer} from './UserReducer.js'

export default combineReducers({AuthReducer, RegisterReducer, GetUserReducer})

