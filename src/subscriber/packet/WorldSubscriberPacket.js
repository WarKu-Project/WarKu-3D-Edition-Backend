//import library
let pw = require('dgt-net').packet_writer

//define packet
let packet = {
  UPDATE_TIME : 10000
}

packet.updateTime = ()=>{
  let w = new pw(packet.UPDATE_TIME)
  w.finish()
  return w.buffer
}

module.exports = packet;
