let mongodb = require('../mongodb')

class Castle {
  constructor(){
      this.x = (Math.random() * 200) + 200
      this.y = (Math.random() * 200) + 200
      this.rx = (Math.random() * 360)
      this.ry = (Math.random() * 360)
      mongodb.update('world',{attr:'castle'},{
        value: {
          position : {
            x : this.x,
            y : this.y
          },
          rotation : {
            x : this.rx,
            y : this.ry
          },
          progress : {
            value : 0,
            progresser : null
          }
        }
      },()=>{})
  }
}

module.exports = Castle
