import { GET_SUBSCRIBER_COUNT, ADD_SUBSCRIBER, DELETE_SUBSCRIBER } from '../actions/types';

const initialState = {
    subscribers: [],
    count: null
};


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_SUBSCRIBER_COUNT:
            return {
                ...state,
                count: action.payload
            }
        case ADD_SUBSCRIBER:
            return {
                ...state,
                subscribers: [action.payload, ...state.subscribers]
            }
        case DELETE_SUBSCRIBER:
            return {
                ...state,
                subscribers: state.subscribers.filter(sub => sub.id !== action.payload)
            }
        default:
            return state;
    }
}
