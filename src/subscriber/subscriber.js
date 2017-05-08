//import library
let dgt = require('dgt-net')

//import mongodb
let mongodb = require('../mongodb')

var subscribers = []

let generateSubscriber = (self,packet,remote,cb) =>{
  mongodb.find(self,'server',{type:'world'},(self,server)=>{
    cb(server,packet,remote)
  })
}

module.exports = {
  generateSubscriber : generateSubscriber
}
