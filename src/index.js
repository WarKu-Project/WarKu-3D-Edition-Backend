//Import Library
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')

//Initialize MongoDB
let mongo = require('./mongodb')

//Initialize Log
let log = require('./util/log')

//Initialize World
let World = require('./components/world')

//Initialize Server
const PORT = 1111
server.setRemoteProxyClass(RemoteProxy)
server.setPacketObject(packet)
server.listen(PORT)
log.insert('server','Initialize Server at PORT = '+PORT)
