'use strict'

const express  = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const localStorage = require('localStorage');
const nstatic = require('node-static');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', (socket) => {
	socket.on('username', (username) => {
		socket.username = username;
	});

	localStorage.setItem(socket.id, setUserTextColor());
	const getUserTextColor = localStorage.getItem(socket.id);
	
	socket.on('chatmessage', (data) => {
	 if(socket.username != "" && socket.username != undefined)
		 {
		    io.emit('chatmessage', {
		      username: socket.username,
		      message: data,
		      color: getUserTextColor,
		    });
		}
	});

	socket.on('user image', function (msg) {
      //console.log(msg);
      socket.broadcast.emit('user image', socket.username,msg);
    });

	// on disconnect
	socket.on('disconnect', () => {
		console.log("user disconnect");
		localStorage.removeItem(socket.id, 0);
	});
});


let setUserTextColor = ()  => {
	var rgb = [];

	for(var i = 0; i < 3; i++)
	rgb.push(Math.floor(Math.random() * 255));
	return 'rgb('+ rgb.join(',') + ')';
};

http.listen(3000 ,() => {
	console.log("You are listening on *:3000");
});