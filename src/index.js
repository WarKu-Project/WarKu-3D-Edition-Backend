//Import Library
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')

//Initialize Server
let port = 1111
server.setRemoteProxyClass(RemoteProxy)
server.setPacketObject(packet)
server.listen(port)
