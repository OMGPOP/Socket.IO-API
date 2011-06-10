var SocketAPI = function() {
	var socketApi = this;
	
	this.socket = null;
	
	this.init = function(host,port) {
		socketApi.socket = new io.Socket("", {port: 3000, rememberTransport: false});
		socketApi.socket.connect();
	}
	this.api = function(api,data) {
		var req = { api: api, data: data };
		socketApi.socket.send(req);
	}
}
