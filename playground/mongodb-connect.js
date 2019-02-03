// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  if(err){
    return console.log('unable to connect to mongodb server');
  }
  console.log('Connected to Mongodb server!');
  const db = client.db('TodoApp');
  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // },(err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todos', err)
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2))
  // })

  // db.collection('Users').insertOne({
    
  //   user: "oldmo",
  //   age: 21,
  //   location: "Taiwan"
  // },(err,result) => {
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // })

  client.close();
});
