var socket = new SocketAPI();
socket.init("",3000);

$(function() {
	events();
})

function events() {
	$("#jump").click(function() {
		var action = {
			action: "jump"
		};
		
		socket.api("action",action);
	})
	
  $("#left").click(function() {
		var action = {
			action: "left"
		};
		
		socket.api("action",action);
	})
	
  $("#private_message").click(function() {
		var message = {
			type: "private",
			message: {
				to: "12345",
				content: "here is my message"
			}
		};
		
		socket.api("message",message);
	})
	
  $("#shout").click(function() {
		var message = {
			type: "shout",
			message: {
				content: "shout this to y'all"
			}
		};
		
		socket.api("message",message);
	})
	
  $("#ready").click(function() {
		var status = {
			status: "ready"
		};
		
		socket.api("status",status);
	})
	
  $("#admin_message").click(function() {
		var message = {
			type: "admin",
			message: {
				content: "admin message suckas"
			}
		};
		
		socket.api("message",message);
	})
}