Socket.IO-API
=============

Socket.IO-API is an extension to socket.io that helps you organize your socket.io calls.

## Client usage

	<script src="/socket.io/socket.io.js"></script>
	<script src="/client/socket.api.js"></script>

	var socketApi = new SocketAPI();
	socketApi.init("",3000);
	
	socketApi.send("user.status", { status: "ready" });
	socketApi.send("user.action", { action: "jump" });
	
	socketApi.mapCall("user.action", function(data) {
		console.log(data);
	})
	socketApi.mapCall("user.status", function(data) {
		console.log(data);
	})

## Server usage

	SocketAPI = require("./lib/SocketAPI");
	
	var socketApi = new SocketAPI();
	socketApi.init(app);
	
	socketApi.send("user.status", { status: "ready" })
	socketApi.send("user.action", { action: "jump" })
	
	socketApi.mapCall("user.status", function(client,data) {
		console.log(client.sessionId);
		console.log(data);
	});
	socketApi.mapCall("user.action", function(client,data) {
		console.log(client.sessionId);
		console.log(data);
	});

## Client documentation

### Properties:

- *socket*

	Reference to socket.io object

### Methods:

- *init(host, port)*

	Creates socket object and attempts to connect

- *mapCall(call, function)*

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

- *mapCall(call, function)*

	Call function upon receiving call

- *send(call, data)*

	Make a socket.io api call passing the JSON encoded data