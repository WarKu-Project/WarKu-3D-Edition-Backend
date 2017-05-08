let RemoteProxy = require('dgt-net').server.RemoteProxy
let packet = require('../packet/WorldSubscriberPacket')
//let World = require('../../components/world')

class Client extends RemoteProxy {

  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
    require('../../components/world').addSubscriber(this)
  }

  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
  }

  notifyTimeChange() {
    this.send(packet.updateTime())
  }

  notifyStateChange() {
    this.send(packet.updateGameState())
  }

}

module.exports = Client
