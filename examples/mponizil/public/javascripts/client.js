var socketApi = new SocketAPI();
socketApi.init("",3000);

$(function() {
	events();
})

function events() {
	$("#jump").click(function() {
		var action = {
			action: "jump"
		};
		
		socketApi.send("action",action);
	})
	
  $("#left").click(function() {
		var action = {
			action: "left"
		};
		
		socketApi.send("action",action);
	})
	
  $("#private_message").click(function() {
		var message = {
			type: "private",
			message: {
				to: "12345",
				content: "here is my message"
			}
		};
		
		socketApi.send("message",message);
	})
	
  $("#shout").click(function() {
		var message = {
			type: "shout",
			message: {
				content: "shout this to y'all"
			}
		};
		
		socketApi.send("message",message);
	})
	
  $("#ready").click(function() {
		var status = {
			status: "ready"
		};
		
		socketApi.send("status",status);
	})
	
  $("#admin_message").click(function() {
		var message = {
			type: "admin",
			message: {
				content: "admin message suckas"
			}
		};
		
		socketApi.send("message",message);
	})
}