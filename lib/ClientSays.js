function ClientSays(client) {
	this.client = client;
}

ClientSays.prototype.api = function(call,data) {
	var cs = this;
	var client = cs.client;
	if(typeof(cs[call]) == "function") cs[call](client,data);
	else console.log("no such function: " + call);
}

ClientSays.prototype.connection = function(client,data) {
	console.log('connection');
}

ClientSays.prototype.disconnect = function(client,data) {
	console.log('disconnect');
}

module.exports = ClientSays;