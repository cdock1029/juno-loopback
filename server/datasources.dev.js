const postgresUrl = process.env.DATABASE_URL

module.exports = {
  postgresql: {
    name: 'postgresql',
    connector: 'postgresql',
    url: postgresUrl,
  },
}
