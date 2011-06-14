var SocketAPI = function() {
	var socketApi = this;
	
	this.socket = null;
	this.calls = {};
	
	this.init = function(host,port) {
		socketApi.socket = new io.Socket("", {port: 3000, rememberTransport: false});
		socketApi.socket.connect();
		socketApi.socket.on('message', function(x) { if (x['api']) { socketApi.execute(x['api'],x['data']) } })
	}
	this.send = function(api,data) {
		socketApi.socket.send({ api: api, data: data });
	}
	this.on = function(api,execute) {
	  socketApi.calls[api] = execute
	}
	this.execute = function(api,data){
	  if(typeof(socketApi.calls[api]) == "function") socketApi.calls[api](data);
	}
}