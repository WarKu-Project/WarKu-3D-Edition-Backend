//import library
let pw = require('dgt-net').packet_writer

//define packet
let packet = {
  UPDATE_TIME : 10000,
  UPDATE_GAME_STATE : 10001
}

packet.updateTime = ()=>{
  let w = new pw(packet.UPDATE_TIME)
  w.finish()
  return w.buffer
}

packet.updateGameState = ()=>{
  let w = new pw(packet.UPDATE_GAME_STATE)
  w.finish()
  return w.buffer
}

module.exports = packet;
