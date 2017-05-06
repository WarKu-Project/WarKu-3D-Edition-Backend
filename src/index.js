//Import Library
let server = require('dgt-net').server
let packet = require('./packet')
let RemoteProxy = require('./remote')
let World = require('./components/world')

//Initialize World
let world = new World()

//Initialize Server
let port = 1111
server.setRemoteProxyClass(RemoteProxy)
server.setPacketObject(packet)
server.listen(port)
