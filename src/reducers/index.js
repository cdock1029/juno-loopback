'use strict';

import Parse from '../parse'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import {
  toUpperCase,
  toLowerCase,
  normalizePhone
} from '../validation'


import {
  PROPERTIES_REQUEST,
  PROPERTIES_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LIST_FETCH_REQUEST,
  LIST_FETCH_SUCCESS,
  LIST_FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_ERROR
} from '../actions'

//reducers
function juno(state = {
  isFetching: false,
  properties: [],
  user: Parse.User.current(),
  error: null
}, action) {
  switch (action.type) {
    case PROPERTIES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case PROPERTIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        properties: action.properties,
        lastUpdated: action.receivedAt
      }
    case LIST_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case LIST_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case LIST_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: null
      }
    default:
      return state
  }
}

function data(state = {
  
}, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_SUCCESS:
      console.log('state:')
      console.log(state)
      console.log('action.data')
      console.log(action.data)
      return {
        ...state,
        ...action.data,
        isFetching: false
      }
    case FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }

}



export default combineReducers({
  juno,
  data,
  form: form.normalize({
    createTenant: {
      firstName: toUpperCase,
      lastName: toUpperCase,
      middleName: toUpperCase,
      email: toLowerCase,
      phone: normalizePhone
    }
  }),
  routing
})
