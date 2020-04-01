const redis = require('redis')
const port = 6379
const client = redis.createClient(port, 'redis')

client.on('connect', () => console.log(`Connect to redis Server at port ${port}!`))

module.exports = { client }
