const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')
// var id = '5c5cf9d938bbb539983d8f621';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid!');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(todos);
// })

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(todo);
// })

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('no such id')
//   }
//   console.log('Todo by id',todo);
// }).catch((e) => console.log(e));
var id = '5c591c64c3167815483ca0c1';

User.findById(id).then((user) => {
  if(!user){
    return console.log("user doesn't exist")
  }
  console.log(JSON.stringify(user,undefined,2));
}).catch((e) => {
  console.log(e);
})
