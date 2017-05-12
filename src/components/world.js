
let Castle = require('./castle')

/**
* Class World
**/
class World {

  constructor(){
    this.castle = new Castle()
  }

}

module.exports = new World();
