let RemoteProxy = require('dgt-net').server.RemoteProxy
let packet = require('../packet/WorldSubscriberPacket')

class Client extends RemoteProxy {

  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
  }

  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
  }

  notifyTimeChange() {
    this.send(packet.updateTime())
  }

}

module.exports = Client
