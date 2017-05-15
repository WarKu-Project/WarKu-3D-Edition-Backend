/**
* Import DGT-NET RemoteProxy
**/
let RemoteProxy = require('dgt-net').server.RemoteProxy
/**
* Import World
**/
let World = require('../components/world')
/**
* Import Packet
**/
let packet = require('./packet')
/**
* World Child Server Class
**/
class WorldChildServer extends RemoteProxy {

  /**
  * Call when world child server connect to server
  **/
  onConnected() {
    console.log("World Child Server is a connection from " + this.getPeerName())
    World.addChildServer(this)
  }
  /**
  * Call when world child server disconnect from server
  **/
  onDisconnected() {
    console.log("World Child Server disconnected from " + this.getPeerName())
    World.removeChildServer(this)
  }
  /**
  * Notify Game state is changed
  **/
  notifyStateChanged(){
    this.send(packet.notifyStateChanged())
  }
}

module.exports = WorldChildServer
