var KEY_PRESS={37:{code:0},38:{code:1},39:{code:2},40:{code:3}},GRAVITY={0:["-=48","+=0"],1:["+=0","-=48"],2:["+=48","+=0"],3:["+=0","+=48"]},AVATARS=["a","b","c","d","e","f"],AVATAR_ID=0,BOX;

var socketApi = new SocketAPI();

socketApi.on("user.initialize", function(data) {
  $('body').append($('<div>').html("logged in as: " + data['user_id']))
  socketApi.send("user.join", { room: "cwh" })
})

socketApi.on("user.joined", function(data) { })

socketApi.on("user.create", function(data) {
	$('body').append($('<div>').html("created user: " + data['user_id']))
	$('body').append($('<div>', {id:'box_' + data['user_id'],'class':'avatar_a'}))
})

socketApi.on("user.destroy", function(data) {
	$('body').append($('<div>').html("destroyed user: " + data['user_id']));
	$('#box_' + data['user_id']).stop(true, true).hide("scale", {}, 1000);
	setTimeout(function() { $('#box_' + data['user_id']).remove() }, 1000)
})

socketApi.on("avatar.move", function(data) {
	$('#box_' + data['user_id']).stop(true, true).animate({left: GRAVITY[data['code']][0], top: GRAVITY[data['code']][1]});
})

socketApi.on("avatar.select", function(data) {
  $('#box_' + data['user_id']).removeClass().addClass("avatar_"+data['id']);
})


socketApi.init("",3000);

$(document).ready(function () {
	BOX=$('#box_you');
	$(document).keydown(function(e){
		if (typeof(KEY_PRESS[e.keyCode]) != "undefined") {
			BOX.stop(true, true).animate({left: GRAVITY[KEY_PRESS[e.keyCode].code][0], top: GRAVITY[KEY_PRESS[e.keyCode].code][1]});
			socketApi.send("avatar.move", { code: KEY_PRESS[e.keyCode].code })
			return false;
		}
	})
	$("#avatar").click(function() {
	  AVATAR_ID++;
	  var avatar_id = AVATARS[AVATAR_ID%AVATARS.length];
		socketApi.send("avatar.select", { id: avatar_id });
		BOX.removeClass().addClass("avatar_"+avatar_id);
	})
	$("#userlist").click(function() {
	  socketApi.send("user.list", {}, function(x) {
	    $('body').append($('<div>').html("users: " + x.join(",")))
	  })
	})
})