/**
* Import MongoDB
**/
let mongodb = require('../mongodb')

/**
* Class Castle
**/
class Castle {

  constructor(){
    this.randomPosition()
  }

  /**
  * Random Assign Castle position
  **/
  randomPosition(){
    this.x = Math.random()*300+100
    this.y = Math.random()*300+100
    this.rotate = Math.random()*360
    mongodb.update('world',{attr:'castle'},{
      value:{
        x : this.x,
        y : this.y,
        rotate : this.rotate
      }
    })
  }

}

module.exports = Castle;
