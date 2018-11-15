import axios from 'axios';
import { GET_ERRORS } from './types';

export const registerUser = userData => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => console.log(res))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err
    })
  );
};