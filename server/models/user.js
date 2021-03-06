const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
//用schema才能客製化method
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);

}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token
  })
};

//$pull 把符合條件的移除
UserSchema.methods.removeToken = function(token){
  var user = this;

  user.update({
    $pull: {
      tokens:{
        token: token
      }
    }
  })
}


UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }catch(e){
    // return new Promise((resolve,reject) => {
    //   reject();
    // })
    return Promise.reject('test');
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  }) //mongoose中query要用到.要加引號

}               //statics設定model的方法 methods設定instance的

UserSchema.statics.findByCredentials = function (email,password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve,reject) => {
      //use bcrypt.compare to compare password and user.password
      bcrypt.compare(password,user.password,(err,res) => {
        if(res){
          resolve(user);
        }else{
          reject();
        }
      })
    })
  })
}

UserSchema.pre('save',function(next){
  var user = this;
 
  if(user.isModified){
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hash) => {
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }

})

var User = mongoose.model('User', UserSchema)

module.exports = {User};
