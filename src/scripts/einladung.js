$(function(){
	var refInput = $('input#referido'),
	posFrList = $('ul.posibleFriendsList'), 
	togglingFrList = 0, 
	friends;

	$(document).ready(function(){
		posFrList.css({ height: 0, border: 0});
	});

	refInput.on('keyup', function(e){
		var whoInvite = $(this).val();
		invitationSender(whoInvite);
	});

	refInput.focus(function() {
	    var itms = posFrList.children('li').length;
	  
	    posFrList.animate({
				height: itms *  25,
				border: '1px solid #4c4c4c'
			}, 200);
	    recordFriends();

	}).blur(function() {

	    posFrList.animate({
			height: 0,
			border: 0
		}, 300);
	});

	refInput.click(function(e){
		$(e.target).next('label#referido-error').css({display: 'none'});
	})


	function recordFriends() {
		friends = posFrList.find('li');

		friends.one('click', function(){
			var id = $(this).children('span.friendId').html();
			var nick = $(this).children('span.psFrAlias').html();
			
			if(nick !== undefined){
				refInput.val(nick);
				
				if(id !== undefined){
					id = id.toString();					
					sessionStorage.setItem("id", id);
				}
			}

			//here should bind the id to send  it to /usuario/registro
		});

	}

	function con(val){
		console.log(val);
	}


	function invitationSender(val){
		var data = JSON.stringify({'abuscar': val});
		$.post('https://vrummapp.net/ws/v2/usuario/buscarqtinv', 
			data
		).then(function(res){ 
			displayCandidates(res);  
		}).fail(function(err){

	  		displayCandidates('noOne');

		});		
	}

	function displayCandidates(argument) {
		var candidates = [];

		if(argument !== 'noOne'){
			
			candidates = argument.mensaje.rs;
			candidates.forEach(function(itm, idx){
				var listItm = '<li class="posibleFriend regInputs"><span class="psFrName">'
				+ itm.full_name +'</span><span class="friendId">'+itm.id+'</span><span class="psFrAlias"> '+ itm.alias +' </span> </li>';
				if($('li.noFriends')){
					$('li.noFriends').remove();
				}
				posFrList.append(listItm);

			});

		}else{

			var listItm = '<li class="posibleFriend noFriends regInputs"><span class="psFrName"></span><span class="psFrAlias"> Nadie con ese nombre </span> </li>';


			$('li.posibleFriend').each(function(idx, el){
				if(idx > 0){
					el.remove();
				}
			});

			if(refInput.val().length > 0){
				posFrList.append(listItm);
			}

		}
		recordFriends();
		var itms = posFrList.children('li').length;
		posFrList.animate({
			height: itms *  25,
			border: '1px solid #4c4c4c'
		}, 300);	

	}

});