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

var socketApi = new SocketAPI(app);
var rooms = {};

socketApi.mapCall('connection', function(client) { var data={};data.user_id=client.sessionId;client.send({api:"initialize",data:data}) });

socketApi.mapCall('disconnect', function(client) { 
  if (client.username) {
    console.log(client.sessionId + " left " + client.username);
    var pos = rooms[client.username].indexOf(client);
    if (pos >= 0) rooms[client.username].splice(pos, 1);
    if (rooms[client.username].length > 0) {
      rooms[client.username].forEach (function(c) {
        c.send({ api: "destroy_user", data: { user_id: client.sessionId } })
      })
    }
  }
});

socketApi.mapCall('message', function(client,data) { console.log(client.sessionId);console.log(data); });

socketApi.mapCall('join', function(client,data) {
  client.username = data.room;
  console.log(client.sessionId + " joined " + client.username);
  if (typeof(rooms[client.username]) == "undefined") rooms[client.username] = []
  rooms[client.username].forEach (function(c) {
    c.send({ api: "create_user", data: { user_id: client.sessionId } })
    client.send({ api: "create_user", data: { user_id: c.sessionId } })
  })
  rooms[client.username].push(client)
  client.send({ api: "joined", data: { room: client.username } })
});

socketApi.mapCall('avatar.select', function(client,data) {
  data['user_id'] = client.sessionId
  rooms[client.username].forEach (function(c) {
    c.send({ api: "avatar.select", data: data })
  })
});

socketApi.mapCall('move',function(client,data) {
	data['user_id'] = client.sessionId;
  client.broadcast({ api: "move", data: data })
});

socketApi.init();