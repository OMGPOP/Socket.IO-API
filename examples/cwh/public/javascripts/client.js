var KEY_PRESS={37:{code:0},38:{code:1},39:{code:2},40:{code:3}},GRAVITY={0:["-=48","+=0"],1:["+=0","-=48"],2:["+=48","+=0"],3:["+=0","+=48"]},AVATARS=["a","b","c","d","e","f"],AVATAR_ID=0,BOX;
var socket = new SocketAPI();

socket.init("",3000);

socket.socket.on('message', function(x){
	if (x['api']) {
		switch (x['api']) {
			case "initialize":
				$('body').append($('<div>').html("logged in as: " + x['data']['user_id']))
				socket.api("join", { room: "cwh" })
				break;
			case "create_user":
				$('body').append($('<div>').html("created user: " + x['data']['user_id']))
				$('body').append($('<div>', {id:'box_' + x['data']['user_id'],'class':'avatar_a'}))
				break;
  		case "move":
  			$('#box_' + x['data']['user_id']).stop(true, true).animate({left: GRAVITY[x['data']['code']][0], top: GRAVITY[x['data']['code']][1]});
  			break;
    	case "avatar.select":
    	  $('#box_' + x['data']['user_id']).removeClass().addClass("avatar_"+x['data']['id']);
    		break;
			case "destroy_user":
				$('body').append($('<div>').html("destroyed user: " + x['data']['user_id']));
				$('#box_' + x['data']['user_id']).stop(true, true).hide("scale", {}, 1000);
				setTimeout(function() { $('#box_' + x['data']['user_id']).remove() }, 1000)
				break;
			default:
				break;
		}
	}
})

$(document).ready(function () {
	BOX=$('#box_you');
	$(document).keydown(function(e){
		if (typeof(KEY_PRESS[e.keyCode]) != "undefined") {
			BOX.stop(true, true).animate({left: GRAVITY[KEY_PRESS[e.keyCode].code][0], top: GRAVITY[KEY_PRESS[e.keyCode].code][1]});
			socket.api("move", { code: KEY_PRESS[e.keyCode].code })
			return false;
		}
	})
	$("#avatar").click(function() {
	  AVATAR_ID++;
	  var avatar_id = AVATARS[AVATAR_ID%AVATARS.length];
		socket.api("avatar.select", { id: avatar_id });
		BOX.removeClass().addClass("avatar_"+avatar_id);
	})
})