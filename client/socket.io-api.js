var SocketAPI = function() {
  var socketApi = this;
	
  this.socket = null;
  this.calls = {};
  this.pendingCallsId = 0;
  this.pendingCalls = {};
	
	this.init = function(host,port) {
    socketApi.socket = new io.Socket(host, { port: port, rememberTransport: false });
    socketApi.socket.connect();
    socketApi.socket.on("message", function(a) {
      if (typeof a.api!=="undefined"&&a.api!==null) {
        if (typeof a.cb!=="undefined"&&a.cb!==null) {
          if (typeof socketApi.pendingCalls[a.cb]=="function") {
            socketApi.pendingCalls[a.cb](a.data);
            delete socketApi.pendingCalls[a.cb];
          }
        } else if (typeof socketApi.calls[a.api]=="function") {
          socketApi.calls[a.api](a.data);
        }
      }
    })
  }
  this.send = function(api,data,callback) {
    if(typeof callback=="function")data.cb=this.pendingCallsId++,this.pendingCalls[data.cb]=callback;
    socketApi.socket.send({ api: api, data: data });
  }
  this.on = function(api,execute) {
    socketApi.calls[api] = execute;
  }
}