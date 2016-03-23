
import { fetchDataApi, fetchUnits } from '../api'

export const FETCH_START = 'FETCH_START'
export const FETCH_STOP = 'FETCH_STOP'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DISMISS_MESSAGE = 'DISMISS_MESSAGE'
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

function fetchStart() {
  return { type: FETCH_START }
}

function fetchStop() {
  return { type: FETCH_STOP }
}

function addMessage(message, type) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message,
      type,
    },
  }
}

export function dismissMessage(i) {
  return {
    type: DISMISS_MESSAGE,
    index: i,
  }
}

export function clearMessages() {
  return { type: CLEAR_MESSAGES }
}


export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES'

function receiveProperties(data) {
  return {
    type: RECEIVE_PROPERTIES,
    ...data,
  }
}

export function fetchProperties() {
  return dispatch => {
    dispatch(fetchStart())

    fetchDataApi()
      .then(data => {
        dispatch(receiveProperties(data))
        dispatch(fetchStop())
      }, err => {
        dispatch(addMessage(err.message, 'error'))
        dispatch(fetchStop())
      })
  }
}

export const RECEIVE_UNITS = 'RECEIVE_UNITS'
export const SHOW_CACHED_UNITS = 'SHOW_CACHED_UNITS'

function receiveUnits(buildingId, data) {
  return {
    type: RECEIVE_UNITS,
    buildingId,
    ...data,
  }
}

function showCachedUnits(units) {
  return {
    type: SHOW_CACHED_UNITS,
    result: {
      units,
    },
  }
}

export function fetchUnitsForBuilding(buildingId) {
  return (dispatch, getState) => {
    const building = getState().entities.buildings[buildingId]
    const cached = building && building.cached
    if (!cached) {
      console.log('fetching units over network')
      dispatch(fetchStart())
      return fetchUnits(buildingId)
        .then(data => {
          dispatch(receiveUnits(buildingId, data))
          return dispatch(fetchStop())
        }, err => {
          dispatch(addMessage(err.message, 'error'))
          return dispatch(fetchStop())
        })
    }
    const units = building.units
    return dispatch(showCachedUnits(units))
  }
}

/* export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
} */

/**
* Login user stored on server
*/
export function loginUser(username, _password) {
  return dispatch => {
    dispatch(fetchStart())
    // TODO replace this with loopback
    return { username: 'bb', email: 'bb@snl.com' }
    /* Parse.User.logIn(username, password).then(
      user => {
        dispatch(fetchStop())
        dispatch(loginSuccess(user))
        browserHistory.replace('/')
      },
      error => {
        dispatch(fetchStop())
        dispatch(addMessage(error.message, 'error'))
      }
    )*/
  }
}


/* export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}*/

/**
* Logout the user (locally and session on server)
*/
export function logoutUser() {
  return _dispatch => 'OK'/*
  { dispatch(fetchStart())
    Parse.User.logOut().then(() => {
      dispatch(fetchStop())
      dispatch(logoutSuccess())
      browserHistory.push('/login')
    })
  }*/
}


// TODO work on destructive functions later

/*
export function saveUnitToProperty(property, unitNumber) {
  return dispatch => {
    dispatch(initiateServerRequest())
    const unit = (new Parse.Object('Unit'))
      .set('property', property)
      .set('unitNumber', unitNumber)

    unit.save()
      .then(u => {
        property.addUnique('units', u).save()
      })
      .then(prop => {
        console.log('property updated with unit.')
        dispatch(unitSaveSuccess())
      })
  }
}
export function removeUnitFromPropertyAndDelete(property, unit) {
  return dispatch => {
    dispatch(initiateServerRequest())

    property.remove('units', unit).save()
      .then(() => unit.destroy())
      .then(() => {
        console.log('unit removed from property and destroyed')
        dispatch(unitDeleteSuccess())
      })

  }
}  */
