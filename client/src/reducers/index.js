import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import {
  toUpperCase,
  toLowerCase,
  normalizePhone,
} from '../validation'


import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_START,
  FETCH_STOP,
  RECEIVE_PROPERTIES,
  RECEIVE_UNITS,
  ADD_MESSAGE,
  DISMISS_MESSAGE,
  CLEAR_MESSAGES,
  SHOW_CACHED_UNITS,
} from '../actions'

// reducers
function user(state = {}, { type, user: userObj }) {
  switch (type) {
    case LOGIN_SUCCESS:
      return userObj
    case LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}

function messages(state = [], { type, payload, index }) {
  switch (type) {
    case ADD_MESSAGE: {
      return [
        ...state,
        {
          message: payload.message,
          type: payload.type,
        },
      ]
    }
    case DISMISS_MESSAGE: {
      const newMessages = [...state]
      newMessages.splice(index, 1)
      return newMessages
    }
    case CLEAR_MESSAGES: {
      return []
    }
    default: {
      return state
    }
  }
}

function isFetching(state = 0, action) {
  switch (action.type) {
    case FETCH_START:
      return state + 1
    case FETCH_STOP:
      return state > 0 ? state - 1 : 0
    default:
      return state
  }
}

function entities(state = {
  buildings: {},
  leases: {},
  properties: {},
  tenants: {},
  units: {},
}, { buildingId, result, entities: newEntities, type }) {
  switch (type) {
    case RECEIVE_PROPERTIES:
      return {
        ...state,
        properties: {
          ...state.properties,
          ...newEntities.properties,
        },
        buildings: {
          ...state.buildings,
          ...newEntities.buildings,
        },
      }
    case RECEIVE_UNITS: {
      const { buildings, leases, tenants, units } = state
      const b = buildings[buildingId]
      return {
        ...state,
        units: {
          ...units,
          ...newEntities.units,
        },
        tenants: {
          ...tenants,
          ...newEntities.tenants,
        },
        leases: {
          ...leases,
          ...newEntities.leases,
        },
        buildings: {
          ...buildings,
          [buildingId]: {
            ...b,
            units: result.units,
            cached: true,
          },
        },
      }
    }
    default: {
      return state
    }
  }
}

function data(state = {
  properties: [],
  units: [],
}, { result, type }) {
  switch (type) {
    case RECEIVE_PROPERTIES:
      return {
        ...state,
        properties: result.properties,
      }
    case RECEIVE_UNITS:
      return {
        ...state,
        units: result.units,
      }
    case SHOW_CACHED_UNITS:
      return {
        ...state,
        units: result.units,
      }
    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  user,
  entities,
  messages,
  data,
  form: form.normalize({
    createTenant: {
      firstName: toUpperCase,
      lastName: toUpperCase,
      middleName: toUpperCase,
      email: toLowerCase,
      phone: normalizePhone,
    },
  }),
})
