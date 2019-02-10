import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER, SET_GOOGLE_USER, CLEAR_GOOGLE_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

export const setGoogleUser = token => {
  localStorage.setItem('googleToken', token);
  setAuthToken(token);
  const decoded = jwt_decode(token);
  return {
    type: SET_GOOGLE_USER,
    payload: decoded
  }
}

export const clearGoogleUser = () => {
  localStorage.removeItem('googleToken');
  setAuthToken(false);
  return {
    type: CLEAR_GOOGLE_USER,
    payload: {}
  }
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}