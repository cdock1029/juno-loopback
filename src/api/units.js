'use strict';

import Parse from 'parse'

import {
  normalize,
  Schema,
  arrayOf,
  valuesOf
} from 'normalizr'

import urlencode from 'urlencode'

const idAttribute = {idAttribute: 'objectId'}

const unit = new Schema('units', idAttribute)
const lease = new Schema('leases', idAttribute)
const tenant = new Schema('tenants', idAttribute)

unit.define({
  leases: arrayOf(lease),
})

lease.define({
  tenants: arrayOf(tenant),
  unit: unit
})

tenant.define({
  leases: arrayOf(lease)
})

const headers = {
  'X-Parse-Application-Id': process.env.PARSE_APP_ID,
  'X-Parse-REST-API-Key': process.env.PARSE_REST_KEY
}

const uri = 'https://api.parse.com/1/classes/Unit?'

const options = {
  method: 'GET',
  headers: headers
}
export default function fetchUnits(buildingId) {

  const user = Parse.User.current()
  options.headers['X-Parse-Session-Token'] = user && user.getSessionToken()

  //configure query string with buildingId
  let query = {
    include: 'leases.tenants',
    where: JSON.stringify({
      building: {
        '__type': 'Pointer',
        className: 'Building',
        objectId: buildingId
      }
    })
  }
  console.log('query:', query)
  query = urlencode.stringify(query)
  console.log('Fetching:', uri + query)

  const p = new Promise((resolve, reject) => {
    fetch(uri + query, options)
      .then(res => {
        return res.json().then(json => {
          if (json.error) {
            reject(json.error)
          } else {
            let units = {units: (json.results)}
            const response = normalize(units, {
              units: arrayOf(unit)
            })
            console.log('unit response:', response)
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
