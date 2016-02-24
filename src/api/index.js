'use strict';

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
const lease = new Schema('leases', idAttribute)
const tenant = new Schema('tenants', idAttribute)

property.define({
  buildings: arrayOf(building)
})

building.define({
  units: arrayOf(unit),
  property: property
})

unit.define({
  leases: arrayOf(lease),
  building: building
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

const qstr = qs.stringify({ include: 'buildings.units' })
const uri = `https://api.parse.com/1/classes/Property?${qstr}`

const options = {
  method: 'GET',
  headers: headers
}
export function fetchDataApi() {
  console.log('Fetching:', uri)
  const p = new Promise((resolve, reject) => {
    fetch(uri, options)
      .then(res => {
        return res.json().then(json => {
          //console.log('Raw result:', json)
          let properties = {properties: (json.results)}
          const response = normalize(properties, {
            properties: arrayOf(property)
          })
          resolve(response)
        })
      })
      .catch(err => {
        reject(err)
      })
  })
  return p
}
