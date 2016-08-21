var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	express = require('express'),
	path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('A user connected');

	socket.on('disconnect', function() {
		console.log('User disconnected');
	});

	socket.on('chat message', function(msg) {
		console.log('message: ' + msg.val);

		io.emit('chat message', msg);
	});
});

http.listen(3000, function() {
	console.log('Listening on *:3000');
});