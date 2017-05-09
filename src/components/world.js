//import library
let dgt = require('dgt-net')

//import subscriber component
let packet = require('../subscriber/packet/WorldSubscriberPacket')
let remote = require('../subscriber/remote/WorldSubscriberRemote')
let subscriber = require('../subscriber/subscriber')
let Castle = require('./castle')

//import util
let Time = require('../util/time')
let log = require('../util/log')

//import mongodb
let mongodb = require('../mongodb')

//define world
class World {

  constructor() {
      this.subscribers = []
      log.insert('world','World is created!')
      this.STATE = {
        RUNNING : 'RUNNING',
        WAITING : 'WAITING'
      }
      console.log('World is created!');
      this.waitGame()
      this.setTime(Time.minute(0.5))
  }

  subscribe(){
    subscriber.generateSubscriber(this,packet,remote,this.generateSubscriber)
  }

  generateSubscriber(servers,packet,remote) {
    servers.forEach((server)=>{
      let subscriber = dgt.client.createClient()
      subscriber.setPacketObject(packet)
      subscriber.setRemoteClass(remote)
      subscriber.connect('localhost',server.port)
    })
  }
  addSubscriber(subscriber){
    this.subscribers.push(subscriber)
  }

  //Start Game
  startGame(){
    this.setTime(Time.minute(5))
    this.state = this.STATE.RUNNING
    this.updateCurrentStateDB()
    this.startUpdate()
    log.insert('world','Game is Start')
    console.log('Game is Start');
  }

  //Waiting New Game
  waitGame(){
    this.castle = new Castle()
    this.setTime(Time.minute(0.5))
    this.state = this.STATE.WAITING
    this.updateCurrentStateDB()
    this.startUpdate()
    log.insert('world','Waiting for new Game')
    console.log('Wait for new game');
  }


//Check State
  finishStateOrContinue(){
    if (this.isFinishState()) this.finishState()
  }

  finishState(){
    clearInterval(this.gameUpdate)
    log.insert('world','Finish State '+this.state)
    this.changeState()
  }

  changeState(){
    if (this.state == this.STATE.RUNNING)
      this.waitGame()
    else
      this.startGame()
  }

//Update
  update(){
    this.countdown()
    this.finishStateOrContinue()
  }

  startUpdate(){
    this.gameUpdate = setInterval((world)=>{world.update()},Time.second(1),this)
  }

  updateCurrentStateDB(){
    let self = this
    mongodb.update('world',{'attr' : 'state'},{ 'value' : this.state },()=>{
      self.notifyGameState()
    })
  }
  //Time
  setTime(time) {
    this.time = time
  }

  countdown() {
    this.time -= Time.second(1)
    this.updateTimeDB()
  }

  isFinishState(){
    return this.time<Time.second(0);
  }

  updateTimeDB(){
    let self = this
    mongodb.update('world',{'attr' : 'time'},{ 'value' : Time.toSecond(this.time) },()=>{
      self.notifyTimeChange()
    })
  }

  //Notify Change
  notifyTimeChange(){
    this.subscribers.forEach((sub)=>{
      sub.notifyTimeChange()
    })
  }

  notifyGameState(){
    this.subscribers.forEach((sub)=>{
      sub.notifyStateChange()
    })
  }
}

module.exports = new World()
