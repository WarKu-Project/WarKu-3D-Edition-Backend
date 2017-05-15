/**
* Convert Millisecond to Second
**/
let msToSec = (ms)=>{
  return ms/1000
}
/**
* Convert Millisecond to Minute
**/
let msToMin = (ms)=>{
  return ms/60000
}
/**
* Convert Second to Millisecond
**/
let secToMs = (sec)=>{
  return sec*1000
}
/**
* Convert Minute to Millisecond
**/
let minToMs = (min)=>{
  return min*60000
}
/**
* Convert Second to Minute
**/
let minToSec = (min)=>{
  return min*60
}
module.exports = {
    msToSec : msToSec,
    msToMin : msToMin,
    secToMs : secToMs,
    minToMs : minToMs,
    minToSec : minToSec
}
