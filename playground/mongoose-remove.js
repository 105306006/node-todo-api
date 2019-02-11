const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')

// todo.remove({})

//todo.findOneAndRemove
//todo.findByIdAndRemove
//上面兩個都會回傳被刪除的項目
Todo.findOneAndRemove({_id: id}).then((todo) => {
  console.log(todo);
})
