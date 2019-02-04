const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('Connected to Mongodb server!');
  const db = client.db('TodoApp');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectId('5c57b2c3d6680b0a0c50dfa8')
  // },{
  //   $set:{
  //     completed: true
  //   }
  // },{
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectId('5c5527dbf4387453044365b5')
  },{
    $set:{
      user: 'oldmo'
    },
    $inc:{
      age:1
    }
  },{
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
  // client.close();
});
