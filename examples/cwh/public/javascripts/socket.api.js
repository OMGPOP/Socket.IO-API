var SocketAPI = function() {
	var socketApi = this;
	
	this.socket = null;
	this.calls = {};
	
	this.init = function(host,port) {
		socketApi.socket = new io.Socket("", {port: 3000, rememberTransport: false});
		socketApi.socket.connect();
		socketApi.socket.on('message', function(x) { if (x['api']) { socketApi.execute(x['api'],x['data']) } })
	}
	this.api = function(api,data) {
		var req = { api: api, data: data };
		socketApi.socket.send(req);
	}
	this.mapCall = function(api,execute) {
	  socketApi.calls[api] = execute
	}
	this.execute = function(api,data){
	  if(typeof(socketApi.calls[api]) == "function") socketApi.calls[api](data);
	}
}
