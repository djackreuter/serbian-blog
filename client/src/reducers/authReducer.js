import { SET_CURRENT_USER, SET_GOOGLE_USER, CLEAR_GOOGLE_USER } from '../actions/types';
import _ from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {},
  googleUser: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload
      }
    case SET_GOOGLE_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.payload),
        googleUser: action.payload
      }
    case CLEAR_GOOGLE_USER:
      return {
        ...state,
        isAuthenticated: false,
        googleUser: {}
      }
    default:
      return state;
  }
}