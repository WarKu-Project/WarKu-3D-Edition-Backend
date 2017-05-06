//Import MongoDB
let MongoClient = require('mongodb').MongoClient
let assert = require('assert')
const URI = 'mongodb://localhost:27017/warku'

//Initialize MongoDB
MongoClient.connect(URI, (err, db) => {
  assert.equal(null, err)
  console.log("Connected correctly to MongoDB server.")
  db.close()
})

//DB Function
let insert = (collection,data) => {
  MongoClient.connect(URI,(err,db)=>{
    assert.equal(null, err)
    db.collection(collection).insertOne(data,(err)=>{
      assert.equal(err, null)
      db.close()
    })
  })
}

let update = (collection,target,data) => {
  MongoClient.connect(URI,(err,db)=>{
    assert.equal(null, err)
    db.collection(collection).updateOne(target,
      {
        $set: data,
        $currentDate: { "lastModified": true }
      }, (err) => {
        assert.equal(err, null)
        db.close()
      })
  })
}

let remove = (collection,target) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection(collection).deleteOne(target,(err) => {
      assert.equal(err, null)
      db.close()
    })
  })
}

module.exports = {
  insert : insert,
  update : update,
  remove : remove
}
