let dgt = require('dgt-net')

let generateSubscriber = (host,port,packet,remote) =>{
  let subscriber = dgt.client.createClient(host,port)
  subscriber.setPacketObject(packet)
  subscriber.setRemoteClass(remote)
  subscriber.connect(host,port)
  return subscriber
}

module.exports = {
  generateSubscriber : generateSubscriber
}
