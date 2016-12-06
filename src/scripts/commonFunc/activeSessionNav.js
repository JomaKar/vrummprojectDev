export function navInfo() {
	
	var isNavbar = false;
	var isInfo = false;
	var userInfoObj = {};
	var userInfo = sessionStorage.getItem('currentUserInfo');
	var userId = sessionStorage.getItem('currentUserId');
	var usrGarage = sessionStorage.getItem('currentUserGarage');

	if(userInfo === null || userInfo === undefined){

		if(userId !== null && userId !== undefined){
		  	getUserInfo(userId);
		}

	}else if(userInfo !== null && userInfo !== undefined){

		var usrInf = JSON.parse(userInfo);
		userInfoObj = usrInf[0];
		isInfo = true;

	}


	var askNavInterval = setInterval(function(){
		if($('div.navbarIn').length){
			if(isInfo){stopInterval();}
		}
	}, 5);


	function stopInterval() {
		isNavbar = true;
		displayInfo();
		clearInterval(askNavInterval);
	}


	function getUserInfo(id) {

	    var data = {idUsr: id};
	    data = JSON.stringify(data);

	    $.post('https://vrummapp.net/ws/v2/usuario/info',
	        data
	      ).then(function(res){

	        if(res.estado === 1){

	          userInfoObj = res.mensaje.rs[0];
	          console.log(res.mensaje.rs, 'was not in storage');

	          isInfo = true;
	          
	        }

	       }).fail(function(err){
	          console.log(err);
	    });

	}


	function displayInfo(){
		if(isNavbar && isInfo){

			var image = (userInfoObj.foto_perfil !== null) ? `data:image/png;base64,${userInfoObj.foto_perfil}` : '../img/profileDafault.png';
			var alias = userInfoObj.alias;

			$('span.aliasNavSpan').text(alias);
			$('div.minProfileImg').css({
				'background-image': `url(${image})`
			});
		}

	}


}