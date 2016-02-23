'use strict';

const Parse = require('parse/node')
const range = require('lodash.range')

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);

const Unit = Parse.Object.extend('Unit')
const Building = Parse.Object.extend('Building')


//reference existing building
//4860 
let b = new Building()
b.id = 'g1lcWkK6i2'

//creating units
let units = []

range(1,7).forEach(i => {

  let u = new Unit()

  //set the parent building in the unit
  u.set('building', b)
  u.set('number', i)

  units.push(u)

})

//set the units in the building
b.set('units', units)

//combine all to be saved
const toSave = units.concat(b);

Parse.Object.saveAll(toSave).then(list => {
  console.log('Saved ' + list.length + ' units!') 
}, err => {
  console.log('Error saving units:', err.message) 
})





