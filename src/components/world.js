//import util
let Time = require('../util/time')
//define world
class World {
  constructor() {
      this.time = Time.minute(10)
      console.log("World is created!")
      this.gameState = setInterval((world)=>{world.gameUpdate()},Time.second(1),this)
  }

  countdown() {
    this.time -= Time.second(1)
  }

  gameUpdate(){
    this.countdown()
    if (this.time<Time.second(0))
      clearInterval(this.gameState)
  }
}

module.exports = World
