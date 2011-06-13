var io = require('socket.io'),
		ClientSays = require('./ClientSays');

var SocketAPI = function(app) {
	var socketApi = this;
	
	this.socket = io.listen(app);
	
	this.initialized = false;
	this.init = function() {
		socketApi.initialized = true;
		
		socketApi.socket.on('connection', function(client) {
			var cs = new ClientSays(client);
			for(i in socketApi.calls) cs[socketApi.calls[i].call] = socketApi.calls[i].fn;
			cs.api('connection');

			client.on('message', function(req) {
				if(req.api) cs.api(req.api,req.data);
				else console.log(req);
			})
			client.on('disconnect', function() {
				cs.api('disconnect');
				delete cs;
			})
		})
	}
	
	this.calls = [];
	this.mapCall = function(call,fn) {
		if(!socketApi.initialized) socketApi.calls.push({ call: call, fn: fn });
		else console.log("can't add calls after initialized!");
	}
}

module.exports = SocketAPI;