import Parse from 'parse'
import { routeActions } from 'react-router-redux'

//actions
export const SERVER_REQUEST = 'SERVER_REQUEST'

export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES'
export const UNIT_SAVE_SUCCESS = 'UNIT_SAVE_SUCCESS'
export const UNIT_DELETE_SUCCESS = 'UNIT_DELETE_SUCCESS'
export const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE'
export const LOGIN_COMPLETE = 'LOGIN_COMPLETE'

function initiateServerRequest() {
  return {
    type: SERVER_REQUEST
  }
}

function receiveProperties(properties) {
  return {
    type: RECEIVE_PROPERTIES,
    properties: properties,
    receivedAt: Date.now()
  }
}

function unitSaveSuccess() {
  return {
    type: UNIT_SAVE_SUCCESS
  }
}

function unitDeleteSuccess() {
  return {
    type: UNIT_DELETE_SUCCESS
  }
}

function loginComplete({error, user}) {
  return {
    type: LOGIN_COMPLETE,
    error: error,
    user: user
  }
}

function logoutComplete() {
  return {
    type: LOGOUT_COMPLETE
  }
}

export function fetchProperties() {
  return dispatch => {
    dispatch(initiateServerRequest())

    const Property = Parse.Object.extend('Property')

    return (new Parse.Query(Property)).include('units').find()
      .then(properties => dispatch(receiveProperties(properties)))
  }
}

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
}

export function loginUser(username, password) {
  return dispatch => {
    dispatch(initiateServerRequest())

    Parse.User.logIn(username, password).then(
      user => {
        dispatch(loginComplete({user}))
        dispatch(routeActions.replace('/'))
      },
      error => dispatch(loginComplete({error}))
    )
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(initiateServerRequest())

    Parse.User.logOut().then(() => {
      dispatch(logoutComplete())
      dispatch(routeActions.push('/login'))
    })
  }
}
