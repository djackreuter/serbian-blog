import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import subscriberReducer from './subscriberReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  user: userReducer,
  post: postReducer,
  subscriber: subscriberReducer
});
