//import util
let Time = require('../util/time')
let log = require('../util/log')

//import mongodb
let mongodb = require('../mongodb')

//define world
class World {

  constructor() {
      this.time = Time.minute(10)
      log.insert('world','World is created!')
      this.STATE = {
        RUNNING : 'RUNNING',
        WAITING : 'WAITING'
      }
      this.startGame()
  }

  startGame(){
    this.state = this.STATE.RUNNING
    this.updateCurrentStateDB()
    this.startUpdate()
    log.insert('world','Game is Start')
  }

  startUpdate(){
    this.gameUpdate = setInterval((world)=>{world.update()},Time.second(1),this)
  }

  update(){
    this.countdown()
    this.finishStateOrContinue()
  }

  finishStateOrContinue(){
    if (this.isFinishState()) this.finishState()
  }

  finishState(){
    clearInterval(this.gameUpdate)
    log.insert('world','Finish Game')
  }

  updateCurrentStateDB(){
    mongodb.update('world',{'attr' : 'state'},{ 'value' : this.state })
  }
  //Time
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
