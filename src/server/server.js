/**
* Import MongoDB
**/
let mongodb = require('../mongodb')
/**
* Import Server Components
**/
let packet = require('./packet')
let Remote = require('./remote')
let server = require('dgt-net').server
/**
* Init Server
**/
server.init = ()=>{
  server.setRemoteProxyClass(Remote)
  server.setPacketObject(packet)
  server.listen(process.PORT)
  mongodb.update('server',{ type:'world'},{port:process.PORT,status:'Running'},()=>{
    server.startProcessCounting()
  })
}
/**
* Start Update time to server
**/
server.startProcessCounting = ()=>{
  let time = 0
  setInterval(()=>{
    mongodb.update('server',{type:'world',port:process.PORT},{time:++time,response:0})
  },1000)
}
module.exports = server
