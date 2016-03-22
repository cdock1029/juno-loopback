'use strict';

import Parse from 'parse'

import {
  normalize,
  Schema,
  arrayOf,
  valuesOf
} from 'normalizr'

const unitModel = new Schema('units')
const leaseModel = new Schema('leases')
const tenantModel = new Schema('tenants')

unitModel.define({
  leases: arrayOf(leaseModel),
})

leaseModel.define({
  tenants: arrayOf(tenantModel),
})

const options = {
  method: 'GET',
  headers: { 'Accept': 'application/json' }
}
export default function fetchUnits(buildingId) {

  // TODO DATE is just an example. Make more precise
  const qstr = { include: {relation: 'leases', scope: {
      where: { nextRentDate: { gt: (new Date()).toISOString() } },
      include: 'tenants' } } }

  console.log('Pre fetch qstr:', qstr)
  const uri = 'http://localhost:3000/api/buildings/' + buildingId + '/units?filter=' + JSON.stringify(qstr)

  console.log('Fetching:', uri)

  const p = new Promise((resolve, reject) => {
    fetch(uri, options)
      .then(res => {
        return res.json().then(json => {
          if (json.error) {
            reject(json.error)
          } else {
            let units = { units: json }
            const response = normalize(units, {
              units: arrayOf(unitModel)
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
