//import util
let Time = require('../util/time')
//define world
class World {

  constructor() {
      this.time = Time.minute(10)
      console.log("World is created!")
      this.STATE = {
        RUNNING : 0,
        WAITING : 1
      }
      this.startGame()
  }

  startGame(){
    this.state = this.STATE.RUNNING
    console.log("Start Game");
    this.startUpdate()
  }

  startUpdate(){
    this.gameUpdate = setInterval((world)=>{world.update()},Time.second(1),this)
  }

  update(){
    console.log(this.time);
    this.countdown()
    this.finishStateOrContinue()
  }

  finishStateOrContinue(){
    if (this.isFinishState()) this.finishState()
  }

  finishState(){
    clearInterval(this.gameUpdate)
  }

  //Time
  countdown() {
    this.time -= Time.second(1)
  }

  isFinishState(){
    return this.time<Time.second(0);
  }
}

module.exports = new World()
