'use strict';

import Parse from 'parse'

import {
  normalize,
  Schema,
  arrayOf,
  valuesOf
} from 'normalizr'

import qs from 'qs'

const idAttribute = {idAttribute: 'objectId'}

const property = new Schema('properties', idAttribute)
const building = new Schema('buildings', idAttribute)
const unit = new Schema('units', idAttribute)

property.define({
  buildings: arrayOf(building)
})

building.define({
  property: property
})


const headers = {
  'X-Parse-Application-Id': process.env.PARSE_APP_ID,
  'X-Parse-REST-API-Key': process.env.PARSE_REST_KEY
}

const qstr = qs.stringify({ include: 'buildings' })
const uri = `https://api.parse.com/1/classes/Property?${qstr}`

const options = {
  method: 'GET',
  headers: headers
}
export default function fetchDataApi() {
  console.log('Fetching:', uri)

  const user = Parse.User.current()
  options.headers['X-Parse-Session-Token'] = user && user.getSessionToken()

  const p = new Promise((resolve, reject) => {
    fetch(uri, options)
      .then(res => {
        return res.json().then(json => {
          if (json.error) {
            reject(json.error)
          } else {
            let properties = {properties: (json.results)}
            const response = normalize(properties, {
              properties: arrayOf(property)
            })
            resolve(response)
          }
        })
      })
      .catch(err => {
        reject(err)
      })
  })
  return p
}
