var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json') //自動轉成object
  var envConfig = config[env];
  
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]; //object.key 吃一個物件 把Key變成陣列
  })
}
// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }


//heroku config:set key=value    =>設環境變數到heroku
