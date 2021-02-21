import {combineReducers} from 'redux';

import {AuthReducer, RegisterReducer} from './AuthReducer';
import {GetUserReducer} from './UserReducer';
import {BlogReducer} from './BlogReducer';
export default combineReducers({AuthReducer, RegisterReducer, GetUserReducer, BlogReducer})

