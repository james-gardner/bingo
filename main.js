var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	bingo = require('./bingo.js'),
	io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

bingo.initialize({
	sockets : io.sockets
});

io.sockets.on('connection', function (socket) {
	socket.on('sync', function (cb) {
		bingo.onSyncRequest(cb);
	}.bind(bingo));
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});