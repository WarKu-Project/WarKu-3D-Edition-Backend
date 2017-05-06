//import subscriber component
let packet = require('../subscriber/packet/WorldSubscriberPacket')
let remote = require('../subscriber/remote/WorldSubscriberRemote')
let subscriber = require('../subscriber/subscriber')

//import util
let Time = require('../util/time')
let log = require('../util/log')

//import mongodb
let mongodb = require('../mongodb')

//define world
class World {

  constructor() {
      log.insert('world','World is created!')
      this.STATE = {
        RUNNING : 'RUNNING',
        WAITING : 'WAITING'
      }
      this.subscriber = subscriber.generateSubscriber('localhost',1001,packet,remote)
      console.log('World is created!');
      this.startGame()
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
    switch (this.state) {
      case this.STATE.RUNNING:
        this.waitGame()
        break
      case this.STATE.WAITING:
        this.startGame()
        break
    }
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
    mongodb.update('world',{'attr' : 'state'},{ 'value' : this.state })
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
    mongodb.update('world',{'attr' : 'time'},{ 'value' : Time.second(this.time) })
  }
}

module.exports = new World()
