const async = require('async')
const debug = require('debug')('juno:dev:create-sample-data')
const models = [
  {
    name: 'property',
    data: [
      {
        id: 9, name: 'WEST VIEW VILLAGE', city: 'AUSTINTOWN',
        street: 'WESTCHESTER DR', state: 'OH', zip: '44515',
      },
      {
        id: 10, name: 'WEST VIEW VILLAGE 2', city: 'AUSTINTOWN',
        street: 'WESTCHESTER DR', state: 'OH', zip: '44515',
      },
      {
        id: 11, name: 'COLUMBIANA MANOR', city: 'COLUMBIANA',
        street: 'WEST SALEM ST', state: 'OH', zip: '44408',
      },
      {
        id: 12, name: 'WESTCHESTER EXECUTIVE', city: 'AUSTINTOWN',
        street: 'WESTCHESTER DR', state: 'OH', zip: '44515',
      },
      {
        id: 13, name: 'WESTCHESTER COMMONS', city: 'AUSTINTOWN',
        street: 'WESTCHESTER DR', state: 'OH', zip: '44515',
      },
      {
        id: 14, name: 'NILES EXECUTIVE', city: 'NILES',
        street: 'YOUNGSTOWN WARREN RD', state: 'OH', zip: '44446',
      },
      {
        id: 15, name: 'NEWTON COMMONS', city: 'NEWTON FALLS',
        street: 'RIDGE RD', state: 'OH', zip: '44444',
      },
      {
        id: 16, name: 'NEWTON VILLAGE', city: 'NEWTON FALLS',
        street: 'RIDGE RD', state: 'OH', zip: '44444',
      },
    ],
  },
  {
    name: 'building',
    data: [
      { id: 101, address: '5002', propertyId: 12 },
      { id: 102, address: '4840', propertyId: 12 },
      { id: 103, address: '4860', propertyId: 12 },
      { id: 104, address: '4872', propertyId: 12 },
    ],
  },
  {
    name: 'unit',
    data: [
      { id: 1, number: 7, buildingId: 101 },
      { id: 2, number: 1, buildingId: 101 },
      { id: 3, number: 2, buildingId: 101 },
      { id: 4, number: 3, buildingId: 101 },
    ],
  },
  {
    name: 'lease',
    data: [
      {
        id: 1,
        startDate: new Date('2015-01-01T00:00:01'),
        endDate: new Date('2015-12-31T23:59:59'),
        rent: 75000,
        unitId: 1,
      },
      {
        id: 2,
        startDate: new Date('2016-01-01T00:00:01'),
        nextRentDate: new Date('2016-04-01T02:00:01'),
        endDate: new Date('2016-12-31T23:59:59'),
        rent: 77500,
        unitId: 1,
      },
    ],
  },
  {
    name: 'tenant',
    data: [
      {
        id: 14,
        firstName: 'BILL',
        lastName: 'BRASKY',
        phone: '5555555555',
        email: 'billbrasky@snl.com',
      },
    ],
  },
]

module.exports = function createSampleData(app) {
  app.dataSources.postgresql.automigrate(err => {
    if (err) throw err

    const steps = models.map(model => function asyncStepFunc(cb) {
      app.models[model.name].create(model.data, (error, results) => {
        // if (err) throw err;
        cb(error, results)
        // console.log('Models created: \n', results);
      })
    })

    // add leases to tenant (id: 14)
    const createTenantLeaseRelations = cb => {
      const tenantModel = app.models.tenant
      const leaseModel = app.models.lease
      tenantModel.find({ where: { id: 14 } }, (error, tenants) => {
        if (error) return cb(error, null)
        return leaseModel.find({ where: { id: { inq: [1, 2] } } }, (error2, leases) => {
          if (error2) return cb(error2, null)
          leases.forEach(l => {
            tenants[0].leases.add(l, err3 => {
              if (err3) return cb(err3, null)
              debug('Added lease %d to tenant %d', l.id, tenants[0].id)
              return null
            })
          })
          return cb(null, { result: 'Success? I guess' })
        })
      })
    }

    steps.push(createTenantLeaseRelations)

    async.series(steps, (err3, _results) => {
      if (err3) throw err3
      // debug('Models created: \n', results)
    })
  })
}
