var socket = require('socket.io-client')('http://192.168.0.106:3000');

var readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var User = require('./user');
var Msg = require('./message'); 

var usr = new User();

socket.on('connect', function () {
  readLine.question('Name: ', function (text) {
    usr.username = text;
    socket.emit('join', usr);
  });

});

socket.on('joined', function (userJoined) {
  usr.setID(userJoined.id);

  readLine.question('> ', function (text) {
    var message = new Msg(usr.id, text);
    socket.emit('message', message);  
  });
  

});

socket.on('received', function () {

  readLine.question('> ', function (text) {
    var message = new Msg(usr.id, text);
    socket.emit('message', message);  
  });

});

socket.on('sms', function (message) {
  if (message.user.username !== usr.username) {
    console.log(message.user.username + '> ' + message.message);  
  }
});





