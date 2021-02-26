import {combineReducers} from 'redux';

import {AuthReducer, RegisterReducer} from './AuthReducer';
import {GetUserReducer} from './UserReducer';
import {BlogReducer} from './BlogReducer';
import {CommentReducer} from './CommentReducer'
export default combineReducers({AuthReducer, RegisterReducer, GetUserReducer, BlogReducer, CommentReducer})

