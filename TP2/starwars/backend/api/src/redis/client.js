const redis = require('redis')
const port = 6379
const client = redis.createClient(port, 'db-star-wars')

client.on('connect', () => console.log(`Connect to redis Server at port ${port}!`))

module.exports = { client }
