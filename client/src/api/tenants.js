import {
  normalize,
  Schema,
  arrayOf,
} from 'normalizr'
import delay from 'delay'

const tenantModel = new Schema('tenants')

const options = {
  method: 'GET',
  headers: { Accept: 'application/json' },
}
export function fetchTenantsSearch() {
  const qstr = {
    fields: {
      id: true,
      firstName: true,
      middleName: true,
      lastName: true,
    },
  }

  console.log('Pre fetch qstr:', qstr)
  const uri = `http://localhost:3000/api/tenants?filter=${JSON.stringify(qstr)}`

  console.log('Fetching:', uri)

  const p = new Promise((resolve, reject) => {
    fetch(uri, options)
    .then(delay(500))
    .then(res => res.json().then(json => {
      if (json.error) {
        reject(json.error)
      } else {
        const tenants = { tenants: json }
        const response = normalize(tenants, {
          tenants: arrayOf(tenantModel),
        })
        console.log('tenants search response:', response)
        resolve(response)
      }
    }))
    .catch(err => {
      reject(err)
    })
  })
  return p
}
