import Parse from 'parse'
import { routeActions } from 'redux-simple-router'

//actions
export const REQUEST_PROPERTIES = 'REQUEST_PROPERTIES'
export const RECEIVE_PROPERTIES = 'RECEIVE_PROPERTIES'
export const UNIT_SAVE = 'UNIT_SAVE'
export const UNIT_SAVE_SUCCESS = 'UNIT_SAVE_SUCCESS'
export const UNIT_DELETE = 'UNIT_DELETE'
export const UNIT_DELETE_SUCCESS = 'UNIT_DELETE_SUCCESS'
export const LOGOUT_START = 'LOGOUT_START'
export const LOGOUT_COMPLETE = 'LOGOUT_COMPLETE'
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_COMPLETE = 'LOGIN_COMPLETE'

function requestProperties() {
  return {
    type: REQUEST_PROPERTIES
  }
}

function receiveProperties(properties) {
  return {
    type: RECEIVE_PROPERTIES,
    properties: properties,
    receivedAt: Date.now()
  }
}

function unitSave() {
  return {
    type: UNIT_SAVE
  }
}

function unitSaveSuccess() {
  return {
    type: UNIT_SAVE_SUCCESS
  }
}

function unitDelete() {
  return {
    type: UNIT_DELETE
  }
}

function unitDeleteSuccess() {
  return {
    type: UNIT_DELETE_SUCCESS
  }
}

function loginStart() {
  return {
    type: LOGIN_START
  }
}

function loginComplete({error, user}) {
  return {
    type: LOGIN_COMPLETE,
    error: error,
    user: user
  }
}

function logoutStart() {
  return {
    type: LOGOUT_START
  }
}

function logoutComplete() {
  return {
    type: LOGOUT_COMPLETE
  }
}

export function fetchProperties() {
  return dispatch => {
    dispatch(requestProperties())
    /*const request = new Request('https://api.parse.com/1/classes/Property', {
      headers: {
        'X-Parse-Application-Id': 'gAnUGUxCjdUA7otkmPulOQgCBerx0JGu7zPjYNB8',
        'X-Parse-REST-API-Key': '1Pi6eZ5f7YaFwuc5VKYwC7yQI4SrkdgrFcacFlZW'
      }
    })
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveProperties(json)))*/

    const Property = Parse.Object.extend('Property')

    return (new Parse.Query(Property)).include('units').find()
      .then(properties => dispatch(receiveProperties(properties)))
  }
}

export function saveUnitToProperty(property, unitNumber) {
  return dispatch => {

    dispatch(unitSave())

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
    dispatch(unitDelete())

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
    dispatch(loginStart())

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
    dispatch(logoutStart())

    Parse.User.logOut().then(() => {
      dispatch(logoutComplete())
      dispatch(routeActions.push('/login'))
    })
  }
}
