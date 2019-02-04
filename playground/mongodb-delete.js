const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('unable to connect to mongodb server');
  }
  console.log('Connected to Mongodb server!');
  const db = client.db('TodoApp');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'walk the dog'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: "cook"}).then((result) => {
  //   console.log(result);
  // })

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })


  db.collection('Users').deleteMany({user: 'oldmo'}).then((result) => {
    console.log(result);
  })

  db.collection('Users').findOneAndDelete({ _id: new ObjectId('5c5527f3286c4640482ab068')}).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  })
  // client.close();
});
