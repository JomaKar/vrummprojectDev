import {queriesT, hashesExist} from './urlEncoder.js';

export function navInfo() {
	
	var isNavbar = false;
	var isInfo = false;
	var userInfoObj = {};
	var theNavbar = $('nav.myNavBar');

	var userInfo = sessionStorage.getItem('currentUserInfo');
	var visibleUserId = sessionStorage.getItem('currentUserId');
	
	var usrGarage = sessionStorage.getItem('currentUserGarage');




	//display the logged alias and picture
	//show/hide the photo and alias if the loggedUser is in its profile or not
		//compare the visible user with the loggedUser
		//if theres no info find it to compare


	if(userInfo === null || userInfo === undefined){

		if(visibleUserId !== null && visibleUserId !== undefined){

		  	getUserInfo(visibleUserId, 'id');


		}else if(hashesExist){

			if(queriesT.al.length > 0){
				
				getUserInfo(queriesT.al, 'al');

			}
		}

	}else if(userInfo !== null && userInfo !== undefined){

		var usrInf = JSON.parse(userInfo);

		//debería comparar con el usuario que tiene que estar logueado.
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


	function getUserInfo(id, type) {

	    var data = (type === 'id') ? {idUsr: id} : {alias: id};
	    data = JSON.stringify(data);

	    $.post('https://vrummapp.net/ws/v2/usuario/info',
	        data
	      ).then(function(res){

	        if(res.estado === 1){

	          userInfoObj = res.mensaje.rs[0];
	          //console.log(res.mensaje.rs, 'was not in storage');

	          isInfo = true;
	          
	        }

	       }).fail(function(err){
	          console.log(err);
	    });

	}


	function displayInfo(){
		//sólo se debe mostrar alias y foto de usuario logueado, cuando no esté en su propio perfil
		var photo = localStorage.getItem('aUPP');
		var logUsr = localStorage.getItem('aUsr');
		var logUserAlias = localStorage.getItem('aUsrA');
		//console.log('from navbar function', photo);


		if(isNavbar && isInfo){

			var image = (photo !== null && photo !== undefined) ? `data:image/png;base64,${photo}` : '../img/profileDafault.png';
			var alias = (logUserAlias !== null && logUserAlias !== undefined) ? logUserAlias : userInfoObj.alias;

			$('span.aliasNavSpan').text(alias);
			$('div.minProfileImg').css({
				'background-image': `url(${image})`
			});
		}

		if(logUsr !== undefined && logUsr !== null){
			logUsr = parseInt(logUsr);
			var visibleUser = (visibleUserId !== undefined && visibleUserId !== null) ? parseInt(visibleUserId) : parseInt(userInfoObj.id);

			console.log('aquí en navbar', logUsr, visibleUser);

			if(logUsr === visibleUser){
				if(myLocation === "/web/perfil/" || myLocation === "/web/perfil/index" || myLocation === "/web/perfil/index.html"){

					theNavbar.addClass('noPhoto')
				}
			}else{ theNavbar.removeClass('noPhoto');}
		}

	}


}