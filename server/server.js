require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var authenticate = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/todos',(req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {

    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  })
})

app.get('/todos',(req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(err) => res.status(400).send(err))
})

app.get('/todos/:id',(req,res) => {
  var id = req.params.id;

  //valid id via isvalid
    //404 -send back empty send
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //findId
    //success
      //if todos - send it back
      //if no todos - send back 404 with empty body
    //error
      //400 - and send empty body back
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }else{
      return res.send({todo: todo})
    }
  }).catch((e) => {
    res.status(400).send();
  })
})


app.delete('/todos/:id',(req,res) => {
  //get the id
  var id = req.params.id;
  //validate the id -> not valid? return 404
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  //remove todo by Id
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo})
  }).catch((e) => {
    res.status(400).send();
  })
    //success
      //if no doc, send 404 因為就算找不到也會回傳null
      //if doc, send doc back with 200
    //error
      //400 with empty body
});

app.patch('/todos/:id',(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,["text","completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed)&&body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send()
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

})

// post /users
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ["email", "password"]);

  var user = new User({
    email: body.email,
    password: body.password
  })

  user.save().then(() => {
    console.log(user);
    return user.generateAuthToken();
  }).then((token) => {
    console.log(user);
    res.header('x-auth', token).send(user); //x-代表客製化header
  }).catch((e) => {
    res.status(400).send(e);
  })
})



app.get('/users/me',authenticate,(req,res) => {
  res.send(req.user);
})

app.listen(port, () => {
  console.log(`starting on port ${port}`);
});



module.exports = {app};
