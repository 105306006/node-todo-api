var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
    res.status(200).send(todo)
  }).catch((e) => {
    res.status(400).send();
  })
    //success
      //if no doc, send 404 因為就算找不到也會回傳null
      //if doc, send doc back with 200
    //error
      //400 with empty body
})

app.listen(port, () => {
  console.log(`starting on port ${port}`);
});



module.exports = {app};
