import {
  normalize,
  Schema,
  arrayOf,
} from 'normalizr'
import delay from 'delay'

const propertyModel = new Schema('properties')
const buildingModel = new Schema('buildings')

propertyModel.define({
  buildings: arrayOf(buildingModel),
})

/* building.define({
  property: property
})*/


const headers = {
  'X-Parse-Application-Id': process.env.PARSE_APP_ID,
  'X-Parse-REST-API-Key': process.env.PARSE_REST_KEY,
  Accept: 'application/json',
}

const qstr = JSON.stringify({ include: 'buildings' })
const uri = `http://localhost:3000/api/properties?filter=${qstr}`

const options = {
  method: 'GET',
  headers,
}
export default function fetchDataApi() {
  console.log('Fetching:', uri)

  const user = null// TODO Parse.User.current()
  options.headers['X-Parse-Session-Token'] = user && user.getSessionToken()

  const p = new Promise((resolve, reject) => {
    fetch(uri, options)
    .then(delay(700))
    .then(res => res.json().then(json => {
      if (json.error) {
        reject(json.error)
      } else {
        const properties = { properties: (json) }
        const response = normalize(properties, {
          properties: arrayOf(propertyModel),
        })
        console.log('Properties response:', response)
        resolve(response)
      }
    }))
    .catch(err => {
      // TODO examine?
      reject(err.toString())
    })
  })
  return p
}
