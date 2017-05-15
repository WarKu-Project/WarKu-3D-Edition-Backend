/**
* Import Packet Writer
**/
let PacketWriter = require('dgt-net').packet_writer

/**
* Initialize Packet
**/
let packet = {
  SERVER_NOTIFY_STATE_CHANGE : 10000
}

/**
* Notify Server that game state is changed
**/
packet.notifyStateChanged = ()=>{
  let pw = new PacketWriter(packet.SERVER_NOTIFY_STATE_CHANGE)
  pw.finish()
  return pw.buffer
}

module.exports = packet;
