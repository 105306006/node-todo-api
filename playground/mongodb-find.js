const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('Connected to Mongodb server!');
  const db = client.db('TodoApp');
 
  // db.collection('Todos').find({
  //   _id: new ObjectId('5c567d98d6680b0a0c50ce40')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // },(err) => {
  //   console.log(err);
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log('Todos count:'+count);
    
  // }, (err) => {
  //   console.log(err);
  // })
db.collection('Users').find({user: 'oldmo'}).toArray().then((obj) => {
console.log(JSON.stringify(obj,undefined,2));
},(err) => {
  console.log(err);
})


  // client.close();
});
