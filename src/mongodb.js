let MongoClient = require('mongodb').MongoClient
let assert = require('assert')
const URI = 'mongodb://localhost:27017/warku'

MongoClient.connect(URI, (err, db) => {
  assert.equal(null, err)
  console.log("Connected correctly to MongoDB server.")
  db.close()
})

let insert = (collection,data) => {
  MongoClient.connect(URI,(err,db)=>{
    assert.equal(null, err)
    db.collection(collection).insertOne(data,(err,result)=>{
      assert.equal(err, null)
      console.log("Inserted a document into the restaurants collection.")
      db.close()
    })
  })
}

module.exports = {
  insert : insert
}
