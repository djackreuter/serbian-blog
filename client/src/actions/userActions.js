import axios from 'axios';
import { GET_CURRENT_USER, CLEAR_CURRENT_USER, USER_LOADING, GET_ERRORS } from './types';

export const getCurrentUser = () => dispatch => {
  dispatch(setUserLoading());
  axios.get('/api/users')
    .then((res) => dispatch({
      type: GET_CURRENT_USER,
      payload: res.data
      })
    )
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

export const editUser = (userData, history) => dispatch => {
  axios.patch('/api/users', userData)
    .then((res) => history.push('/dashboard'))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  }
}

export const clearCurrentUser = () => {
  return {
    type: CLEAR_CURRENT_USER
  }
}