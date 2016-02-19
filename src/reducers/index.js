import Parse from 'parse'
import {
  SERVER_REQUEST,
  RECEIVE_PROPERTIES,
  UNIT_SAVE_SUCCESS,
  UNIT_DELETE_SUCCESS,
  LOGIN_COMPLETE,
  LOGOUT_COMPLETE
} from '../actions'

//reducers
function juno(state = {
  isFetching: false,
  properties: [],
  user: Parse.User.current()
}, action) {
  switch (action.type) {
    case SERVER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_PROPERTIES:
      return {
        ...state,
        isFetching: false,
        properties: action.properties,
        lastUpdated: action.receivedAt
      }
    case UNIT_SAVE_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case UNIT_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case LOGIN_COMPLETE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        user: action.user
      }
    case LOGOUT_COMPLETE:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}

module.exports = { juno }
