var io = require('socket.io');

var SocketAPI = function(app) {
	var socketApi = this;
	
	this.socket = io.listen(app);
	this.calls = {};
	
	this.init = function() {
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