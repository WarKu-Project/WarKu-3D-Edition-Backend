//Convert to second
let minute = (min) => {
  return 60000 * min
}
let second = (sec) => {
  return 1000 * sec
}
let toSecond = (ms) => {
  return ms/1000
}
let toMinute = (ms)=>{
  return ms/60000
}
module.exports = {
  minute : minute,
  second : second,
  toSecond : toSecond,
  toMinute : toMinute
}
