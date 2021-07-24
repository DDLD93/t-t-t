// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
app.use(express.static('http://localhost:3000')); 
const rooms =[[]]
class User {
  constructor(client) {
    this.userID = client.id;
    this.room = client.id;
  }
} 


// listening for players moves
io.on('connection', function(client) {
  
  rooms.forEach(e => {
    if(e.length <= 1){
      e.push(client.id)
      console.log('paired')
      return
    } 
    rooms.push([client.id])
    console.log('solo')
    return
  });

    client.on('player1', (e) => io.emit('player1Res', e ))
    client.on('playerO', (e) => io.emit('playerORes', e ))
    client.on('reset', (e) => io.emit('resetRes', e ))
    client.on('winner', (e) => io.emit('winnerRes', e ))
   
});

server.listen(4200);