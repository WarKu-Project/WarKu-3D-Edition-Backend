//Initialize MongoDB
let mongo = require('./mongodb')

//Initialize Log
let log = require('./util/log')

//Initialize World
let World = require('./components/world')
World.subscribe()
log.insert('world-backend','Initialize World Backend')
