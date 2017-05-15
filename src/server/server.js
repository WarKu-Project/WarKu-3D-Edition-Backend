/**
* Import Server Components
**/
let packet = require('./packet')
let Remote = require('./remote')
/**
* Init Server
**/
let server = require('dgt-net').server
server.setRemoteProxyClass(Remote)
server.setPacketObject(packet)
server.listen(9000)
