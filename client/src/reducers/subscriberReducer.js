import { GET_SUBSCRIBER_COUNT, ADD_SUBSCRIBER } from '../actions/types';

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
        default:
            return state;
    }
}
