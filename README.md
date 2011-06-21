**DEPRECATED** -- USE [Socket.IO](http://socket.io/) >= 0.7

Socket.IO-API
=============

Socket.IO-API is an extension to socket.io that helps you organize your socket.io calls.

## Client usage

	<script src="/socket.io/socket.io.js"></script>
	<script src="/client/socket.io-api.js"></script>

	var socketApi = new SocketAPI();
	socketApi.init("",3000);
	
	// send api commands to server
	socketApi.send("user.status", { status: "ready" });
	socketApi.send("user.action", { action: "jump" });
	
	// bind to commands from server
	socketApi.on("user.action", function(data) {
		console.log(data);
	})
	socketApi.on("user.status", function(data) {
		console.log(data);
	})
	
	// now with callbacks!
	socketApi.send("user.list", {}, function(data) {
	  console.log(data)
	})
  

## Server usage

	SocketAPI = require("./lib/SocketAPI");
	
	var socketApi = new SocketAPI();
	socketApi.init(app);
	// default connection/disconnect/message handlers
	socketApi.on('connection', function(client) { 
	  console.log(client.sessionId + " connect")
	})
	socketApi.on('disconnect', function(client) {
	  console.log(client.sessionId + " disconnect")
	})
	socketApi.on('message', function(client,data) {
	  console.log(client.sessionId + " " + data)
	})
	// example api-specific function
	socketApi.on('user.join', function(client,data) {
	  console.log(client.sessionId + " user.join " + data)
	})
	// example api-specific with client-side callback
	socketApi.on('user.list', function(client,data) {
	  client.send({ api: "user.list", data: response, cb: data['cb'] })
	})

## Client documentation

### Properties:

- *socket*

	Reference to socket.io object

### Methods:

- *init(host, port)*

	Creates socket object and attempts to connect

- *on(call, function)*

	Call function upon receiving call

- *send(call, data)*

	Make a socket.io api call passing the JSON encoded data

## Server documentation

### Properties:

- *socket*

	Reference to socket.io object

### Methods:

- *init(app)*

	Reference to http.Server instance of node

- *on(call, function)*

	Call function upon receiving call

- *send(call, data)*

	Make a socket.io api call passing the JSON encoded data