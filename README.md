Socket.IO-API
=========

### Organize your socket.io calls into an API

Socket.IO-API is an extension to socket.io that helps you organize your socket.io calls.

### Client usage

	var socket = new SocketAPI();
	socket.init("",3000);
	socket.api("status",{ status: "ready" });
	socket.api("action",{ action: "jump" });

### Server usage

	SocketAPI = require('./lib/SocketAPI');
	var socketApi = new SocketAPI(app);
	socketApi.mapCall('status',status);
	socketApi.mapCall('action',action);
	socketApi.init();

	function status(client,data) {
		console.log(client.sessionId);
		console.log(data);
	}
	function action(client,data) {
		console.log(client.sessionId);
		console.log(data);
	}

### Client documentation

#### Properties:

- *socket*

	Reference to socket.io object

#### Methods:

- *init()*

	Creates socket listeners

- *api(call, data)*

	Make a socket.io api call passing the JSON encoded data

### Server documentation

#### Properties:

- *socket*

	Reference to socket.io object

#### Methods:

- *init()*

	Creates socket listeners

- *mapCall(functionName, functionToCall)*

	Link a client function to a backend function. Like creating loosely coupled routes.