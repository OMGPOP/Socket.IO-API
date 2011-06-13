var io = require('socket.io');

var SocketAPI = function() {
	var socketApi = this;
	
	this.socket = null;
	this.calls = {};
	
	this.init = function(app) {
		socketApi.socket = io.listen(app);
		
		socketApi.socket.on('connection', function(client) {
			socketApi.execute(client,'connection')
			client.on('message', function(x) { if (x['api']) { socketApi.execute(client,x['api'],x['data']) } })
			client.on('disconnect', function(x) { socketApi.execute(client,'disconnect') })
		})
	}
	this.send = function(api,data) {
		socketApi.socket.send({ api: api, data: data });
	}
	this.mapCall = function(api,execute) {
		socketApi.calls[api] = execute;
	}
	this.execute = function(client,api,data) {
		if(typeof(socketApi.calls[api]) == "function") socketApi.calls[api](client,data);
	}
}

module.exports = SocketAPI;