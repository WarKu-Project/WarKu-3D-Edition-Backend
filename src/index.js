/**
* Initialize World
**/
let world = require('./components/world')
world.initWorld()
/**
* Initialize Server
**/
let server = require('./server/server')
process.PORT = 9000
server.init()
/**
* Import MongoDB
**/
let mongodb = require('./mongodb')
/**
* Terminate Condition
**/
process.on ('uncaughtException', err => {
  mongodb.update('server',{ type:'world',port:process.PORT},{status:'Disconnected'},()=>{
    process.exit(1)
  })
})
process.on ('SIGINT', () => {
  mongodb.update('server',{ type:'world',port:process.PORT},{status:'Disconnected'},()=>{
    process.exit(0)
  })
})
process.on('exit',code=>{
  process.exit(code)
})
