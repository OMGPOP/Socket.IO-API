Socket.IO-API
=========

### Organize your socket.io calls into an API

Socket.IO-API is an extension to socket.io that helps you organize your socket.io calls.

### How to use

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

### Notes



### Documentation 

#### io.Socket

	new SocketAPI(httpObject);

##### Properties:

- *socket*

	socket.io object

##### Methods:
	
- *init()*

	Creates socket listeners
	
- *mapCall(functionName, functionToCall)*
	
	Link a client function to a backend function. Like creating loosely coupled routes.