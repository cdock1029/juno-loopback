import Parse from 'parse'
import {
  REQUEST_PROPERTIES,
  RECEIVE_PROPERTIES,
  UNIT_SAVE,
  UNIT_SAVE_SUCCESS,
  UNIT_DELETE,
  UNIT_DELETE_SUCCESS,
  LOGIN_START,
  LOGIN_COMPLETE,
  LOGOUT_START,
  LOGOUT_COMPLETE
} from '../actions'

//reducers
function juno(state = {
  isFetching: false,
  properties: [],
  user: Parse.User.current()
}, action) {
  switch (action.type) {
    case REQUEST_PROPERTIES:
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
    case UNIT_SAVE:
      return {
        ...state,
        isFetching: true
      }
    case UNIT_SAVE_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case UNIT_DELETE:
      return {
        ...state,
        isFetching: true
      }
    case UNIT_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case LOGIN_START:
      return {
        ...state,
        isFetching: true
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
