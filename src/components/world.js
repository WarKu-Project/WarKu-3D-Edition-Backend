/**
* Import Time and MongoDB
**/
let Time = require('../util/time')
let MongoDB = require('../mongodb')
/**
* Class World
**/
class World {

  /**
  * Init world
  **/
  initWorld(){
    this.children = []
    this.state = 'Waiting'
    MongoDB.update('world',{attr:'state'},{value:this.state})
    this.waitGame()
    this.startCounting()
  }
  /**
  * Add Child Server to World
  * @param child is world child server
  **/
  addChildServer(child){
    this.children.push(child)
  }
  /**
  * Remove Child Server from world
  * @param child is world child server
  **/
  removeChildServer(child){
    this.children.splice(this.children.indexOf(child), 1)
  }
  /**
  * Notify Game state is changed
  **/
  notifyStateChangedToChildren(){
    this.children.forEach((child)=>child.notifyStateChanged())
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
  }
  /**
  * Wait State
  **/
  waitGame(){
    this.time = Time.minToSec(1)
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
    let self = this
    MongoDB.update('world',{attr:'state'},{value:this.state},()=>{
      self.notifyStateChangedToChildren()
    })
  }
  /**
  * Check End State
  **/
  checkEndState(){
    if (this.isEnd())
      this.setState()
  }
  /**
  * Is State End
  **/
  isEnd(){
    return this.time<=0
  }
}

module.exports = new World();
