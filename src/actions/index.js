'use strict';

import Parse from '../parse'
import { routeActions } from 'react-router-redux'

//actions
export const PROPERTIES_REQUEST = 'PROPERTIES_REQUEST'
export const PROPERTIES_SUCCESS = 'PROPERTIES_SUCCESS'

function propertiesRequest() {
  return {
    type: PROPERTIES_REQUEST
  }
}

function propertiesSuccess(properties) {
  return {
    type: PROPERTIES_SUCCESS,
    properties: properties,
    receivedAt: Date.now()
  }
}

/**
* Get Property list from server
*/
export function fetchProperties() {
  return dispatch => {

    dispatch(propertiesRequest())

    return (new Parse.Query('Property'))
      .ascending('name')
      .include('buildings.units')
      .find()
      .then(properties => dispatch(propertiesSuccess(properties)))
  }
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  }
}

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user: user
  }
}

function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error: error
  }
}

/**
* Login user stored on server
*/
export function loginUser(username, password) {
  return dispatch => {

    dispatch(loginRequest())

    Parse.User.logIn(username, password).then(
      user => {
        dispatch(loginSuccess(user))
        dispatch(routeActions.replace('/'))
      },
      error => dispatch(loginError(error))
    )
  }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  }
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  }
}

/**
* Logout the user (locally and session on server)
*/
export function logoutUser() {
  return dispatch => {
    dispatch(logoutRequest())

    Parse.User.logOut().then(() => {
      dispatch(logoutSuccess())
      dispatch(routeActions.push('/login'))
    })
  }
}

export const LIST_FETCH_REQUEST = 'LIST_FETCH_REQUEST'
export const LIST_FETCH_SUCCESS = 'LIST_FETCH_SUCCESS'
export const LIST_FETCH_ERROR = 'LIST_FETCH_ERROR'

function listFetchRequest() {
  console.log('listFetchRequest')
  return {
    type: LIST_FETCH_REQUEST
  }
}

function listFetchSuccess() {
  console.log('listFetchSuccess')
  return {
    type: LIST_FETCH_SUCCESS
  }
}

function listFetchError(err) {
  console.log('listFetchError')
  return {
    type: LIST_FETCH_ERROR,
    error: err
  }
}

/**
* Fetch nested entities (if not already loaded)
*/
export function fetchListIfNeeded(list) {
  console.log('fetchListIfNeeded - list:', list)
  return dispatch => {
    if (!list || list.length < 1) {
      return
    }
    dispatch(listFetchRequest())

    Parse.Object.fetchAllIfNeeded(list)
      .then(results => {
        dispatch(listFetchSuccess())
      }, err => {
        console.log('Error fetching list of items:', err.message)
        dispatch(listFetchError(err.message))
      })
  }
}

//TODO work on destructive functions later

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
