import { GET_CURRENT_USER, USER_LOADING, CLEAR_CURRENT_USER, GET_ADMIN_USER } from "../actions/types";

const initialState = {
  user: null,
  admin: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case GET_ADMIN_USER:
      return {
        ...state,
        admin: action.payload,
        loading: false
      }
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}