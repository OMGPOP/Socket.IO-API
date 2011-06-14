var express = require('express');

var app = module.exports = express.createServer();

// configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// routes
app.get('/', function(req, res){
  res.render('index');
});

app.listen(3000);

// setup socket
var SocketAPI = require('../../lib/SocketAPI');

var socketApi = new SocketAPI();
socketApi.init(app);

socketApi.on('connection',connection);
socketApi.on('disconnect',disconnect);
socketApi.on('message',message);
socketApi.on('status',status);
socketApi.on('action',action);

function connection(client) {
	console.log(client.sessionId);
}
function disconnect(client) {
	console.log(client.sessionId);
}
function message(client,data) {
	console.log(client.sessionId);
	console.log(data);
}
function status(client,data) {
	console.log(client.sessionId);
	console.log(data);
}
function action(client,data) {
	console.log(client.sessionId);
	console.log(data);
}