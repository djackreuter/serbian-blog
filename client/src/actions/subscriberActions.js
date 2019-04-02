import axios from 'axios';
import { GET_SUBSCRIBER_COUNT, GET_ERRORS, ADD_SUBSCRIBER, DELETE_SUBSCRIBER } from './types';

export const getSubscriberCount = () => dispatch => {
    axios.get('/api/subscribe/count')
        .then(res => 
            dispatch({
                type: GET_SUBSCRIBER_COUNT,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const addSubscriber = subData => dispatch {
    axios.post('/api/subscribe', subData)
        .then(res => 
            dispatch({
                type: ADD_SUBSCRIBER,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const deleteSubscriber = id => dispatch => {
    axios.delete(`/api/subscribe/unsubscribe/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_SUBSCRIBER,
                payload: id
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
