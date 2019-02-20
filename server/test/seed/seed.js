const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'oldmo@yahoo.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId,access: 'auth'},'abc123').toString()
  },{
    _id: userTwoId,
    email: 'test@yahoo.com',
    password: 'userTwoPass'
  }]
}]


const todos = [{
  _id: new ObjectID(),
  text: 'First todo'
}, {
  _id: new ObjectID(),
  text: 'second todo',
  completed: true,
  completedAt: 333
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done()).catch((e) => done(e))
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    //promise.all :等到所有promise都執行完畢
    return Promise.all([userOne,userTwo])
  }).then(() => done()).catch((e) => done(e))
}


module.exports = {todos ,populateTodos,users,populateUsers};
