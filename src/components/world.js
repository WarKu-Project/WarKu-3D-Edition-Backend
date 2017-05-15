/**
* Import Time and MongoDB
**/
let Time = require('../util/time')
let MongoDB = require('../mongodb')
/**
* Class World
**/
class World {

  constructor(){
    this.waitGame()
  }

  /**
  * Start Counting
  **/
  startCounting(){
    let self = this
    this.timer = setInterval(()=>{
      self.count()
    },Time.secToMs(1))
  }
  /**
  * Count time
  **/
  count(){
    this.time -= 1
    console.log(this.time)
    let self = this
    MongoDB.update('world',{attr:'time'},{value:this.time},()=>{
      self.checkEndState()
    })
  }
  /**
  * Start Game
  **/
  startGame(){
    this.time = Time.minToSec(1)
    this.startCounting()
  }
  /**
  * Wait State
  **/
  waitGame(){
    this.time = Time.minToSec(1)
    this.startCounting()
  }
  /**
  * Set State
  **/
  setState(){
    if (this.state == "Running"){
      this.state = "Waiting"
      this.waitGame()
    }else {
      this.state = "Running"
      this.startGame()
    }
    console.log(this.state)
    MongoDB.update('world',{attr:'state'},{value:this.state})
  }
  /**
  * Check End State
  **/
  checkEndState(){
    if (this.isEnd()){
      this.setState()
      clearInterval(this.timer)
    }
  }
  /**
  * Is State End
  **/
  isEnd(){
    return this.time<=0
  }
}

module.exports = new World();
