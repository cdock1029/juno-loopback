'use strict';

const normalizr = require('normalizr') 

const normalize = normalizr.normalize
const Schema = normalizr.Schema
const arrayOf = normalizr.arrayOf
const valuesOf = normalizr.valuesOf

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




const rp = require('request-promise')

const headers = {
  'X-Parse-Application-Id': process.env.PARSE_APP_ID,
  'X-Parse-REST-API-Key': process.env.PARSE_REST_KEY
}

const uri = 'https://api.parse.com/1/classes/Property/D64k4fx293'

const qs = { include: 'buildings.units.leases.tenants' }


const options = {
  uri: uri,
  qs: qs,
  headers: headers,
  json: true
}

rp(options)
  .then(res => {
   
    let properties = {properties: [res]}
    //console.log(JSON.stringify(properties))
    const response = normalize(properties, {
      properties: arrayOf(property)
    })

    console.log(JSON.stringify(response))
  })
  .catch(err => {
    console.error(err)
  })
