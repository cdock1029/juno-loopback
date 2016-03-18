'use strict';

const async = require('async')
const models = [
  {
    name: 'property',
    data: [
      {id: 9, name: 'WEST VIEW VILLAGE', city: 'AUSTINTOWN', street: 'WESTCHESTER DR', state: 'OH', zip: '44515'},
      {id: 10, name: 'WEST VIEW VILLAGE 2', city: 'AUSTINTOWN', street: 'WESTCHESTER DR', state: 'OH', zip: '44515'},
      {id: 11, name: 'COLUMBIANA MANOR', city: 'COLUMBIANA', street: 'WEST SALEM ST', state: 'OH', zip: '44408'},
      {id: 12, name: 'WESTCHESTER EXECUTIVE', city: 'AUSTINTOWN', street: 'WESTCHESTER DR', state: 'OH', zip: '44515'},
      {id: 12, name: 'WESTCHESTER COMMONS', city: 'AUSTINTOWN', street: 'WESTCHESTER DR', state: 'OH', zip: '44515'},
      {id: 12, name: 'NILES EXECUTIVE', city: 'NILES', street: 'YOUNGSTOWN WARREN RD', state: 'OH', zip: '44446'},
      {id: 12, name: 'NEWTON COMMONS', city: 'NEWTON FALLS', street: 'RIDGE RD', state: 'OH', zip: '44444'},
      {id: 12, name: 'NEWTON VILLAGE', city: 'NEWTON FALLS', street: 'RIDGE RD', state: 'OH', zip: '44444'},
    ]
  },
  {
    name: 'building',
    data: [{id: 101, address: '5002', propertyId: 12}]
  },
  {
    name: 'unit',
    data: [{number: 7, buildingId: 101}]
  }
]

module.exports = function(app) {
  app.dataSources.postgresql.automigrate(function(err) {
    if (err) throw err;

    let steps = models.map(model => {

      return function(cb) {
        app.models[model.name].create(model.data, function(err, results) {
          //if (err) throw err;
          cb(err, results)
          //console.log('Models created: \n', results);
        });
      }

    })

    async.series(steps, (err, results) => {
      if (err) throw err;

      console.log('Models created: \n', results)
    })

  });
};
