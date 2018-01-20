$(() => {
	const socket = io();

	socket.on('user image', image);

	$("#setUname").on('click', () => {
	  //console.log($('#uname').val());
	  
	  if($('#uname').val() != "")
	  {
	  	socket.emit('username', $('#uname').val());
	  	$("#divUserName").hide();
	  	$("#hideMsgForm").show();
	  }
	})

	$('#send').on('click', () => {
	  sendMsg = $('#m').val();
	  if(sendMsg.length > 0) {
	    socket.emit('chatmessage', $('#m').val());
	    $('#m').val('');
	    return false; 
	  }
	});

	// send image 

	$('#mImage').bind('change', function(e){
	  var data = e.originalEvent.target.files[0];
	  //console.log(data);
	  if(data.type == "image/png" || data.type == "image/jpg" || data.type == "image/jpeg" || data.type == "image/gif")
	  {
	    var reader = new FileReader();
	    reader.onload = function(evt){
	    image('me', evt.target.result);
	    socket.emit('user image', evt.target.result);
	    };
	    reader.readAsDataURL(data);
	  }
	  else {
	    alert("Soory!! You can send only image");
	  }
	});

	socket.on('chatmessage', (data) => {

	   const txtHtml = ($('<li>').html('<span style="color : '+data.color+'"><b>'+data.username+' </b></span> : '+ data.message));
	  $('#messages').append(txtHtml);
	});

	function image (from, base64Image) {
	  $('#messages').append($('<li>').html('<span><b>'+from+' </b></span> : <img src="' + base64Image + '" height="25%" width="25%"/>'));
	}
	  
})