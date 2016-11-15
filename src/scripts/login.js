$(function(){

	var loginForm = $('#login');
	var userE = $('#l-email'),
	userPass = $('#l-pass'),
	linkReg = $('button#goToReg'),
	linkBrand = $('button#goToCatBrand'),
	passRecTxt = $('div.passRecover'),
	errMsg = $('div.errorLogin'),
	passCont = $('div#l-passCont'),
	emailCont = $('div#r-emailInputGrp'),
	recoverPass = false,
	normalText = $('span#normalText'),
	recoverPassTxt = $('span#recoverPassTxt'),
	subBtnNrTxt = $('span#subBtnNrTxt'),
	subBtnRecTxt = $('span#subBtnRecTxt'),
	loginBtnCont =$('div.loginBtnCont'),
	registrarbtn = $('button.registrarbtn'),
	cancelarBtn = $('button.cancelarBtn'),
	modal = $('div.passModalCont'),
	closeModal = $('span.closeModal'),
	resendPassMail = $('div.resendPart'),
	recoverPassFragment = $('span.mailRecover');

	userE.focus(removePrev);
	userPass.focus(removePrev);

	passRecTxt.click(recover);

	cancelarBtn.click(recoverPassEnd);

	

	linkReg.click(function(){

		askForBrands();
		window.location = 'pages/registro.html';


	});

	closeModal.click(function(){
		modal.hide();
	});

	function askForBrands(){
			
		$.post('https://vrummapp.net/ws/v2/catalogo/getmarcas')
		.then(function(res){ 
			if(res.estado === 1){
				var brands = JSON.stringify(res.mensaje.rs);
				sessionStorage.setItem('catalogBrands', brands);
			}else{
				sessionStorage.setItem('catalogBrands', 'nothing stored');
			}


		 }).fail(function(err){
	  		con(err);
		});
		
	}

	linkBrand.click(function(){
		window.location = 'pages/catalogo-marcas.html'
	})

	function recover(){
		removePrev();
		errMsg.disNone();
		passCont.an().remove();
		passRecTxt.an().remove();
		normalText.disNone();
		subBtnNrTxt.disNone();
		subBtnRecTxt.disBlock();
		recoverPassTxt.disBlock();
		cancelarBtn.disBlock();
		loginBtnCont.css({display: 'flex'});
		registrarbtn.addClass('NorightM halfML');
		recoverPass = true;
	}

	function recoverPassEnd() {
		recoverPass = false;
		loginBtnCont.disBlock();
		emailCont.after(passCont);
		errMsg.after(passRecTxt);
		recoverPassTxt.disNone();
		normalText.disBlock();
		subBtnRecTxt.disNone();
		subBtnNrTxt.disBlock();
		passCont.an();
		passRecTxt.an().click(recover);
		cancelarBtn.disNone();
		registrarbtn.removeClass('NorightM halfML');
	}


	loginForm.submit(function(e){
		e.preventDefault();
		var devID = sessionStorage.getItem('deviceId');
		devID = devID.toString();

		if(!recoverPass){
			var data = $(this).serializeArray();

			var values = {device: devID};

			$.map(data, function(itm, idx){
				values[itm.name] = itm.value;

			});

			var mailGood = sessionStorage.getItem('mailGood');

			if(mailGood === 'yes'){
				sendLogin(values);
			}else{
			
				removePrev();
				var wrongOne = "<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";
				registrarbtn.before(wrongOne);

			}

		}else{
			recoverPassEnd();

			var mailTxt = userE.val();
			var geoLoc = sessionStorage.getItem('location');
			var params = {device: devID, mail: mailTxt, geoloc: geoLoc};

			params = JSON.stringify(params);

			var mailGood = sessionStorage.getItem('mailGood');

			if(mailGood === 'yes'){
				recoverPassSend(params, null);
			}else{
				if(mailTxt.length > 0){
					setTimeout(function(){
						var askMailAgain  = sessionStorage.getItem('mailGood');
						if(askMailAgain === 'yes'){
							recoverPassSend(params, null);
						}else{
							var wrongOne = "<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";
							registrarbtn.before(wrongOne);
						}
					}, 300);
				}

			}

		}

	});


	function sendLogin(val){
		

		var data = JSON.stringify(val);


		$.post('https://vrummapp.net/ws/v2/usuario/login', 
				data
			).then(function(res){

				if(res.estado === 1){
					var currentUser = userE.val().toString();

					var id = res.mensaje.rs;
					getUserInfo(id);
					id.toString();
					sessionStorage.setItem('currentUser', currentUser);
					sessionStorage.setItem('currentUserId', id);
					sessionStorage.setItem('activeSession', 'yes');


					window.location = 'pages/perfil.html';
				}else{

					showSubmitError(res);
				}

			 }).fail(function(err){
		  		console.log(err);
			});


	}

	function recoverPassSend(argument, flag) {
		//console.log(argument)
		$.post('https://vrummapp.net/ws/v2/usuario/getpasswd', 
				argument
			).then(function(res){

				if(res.estado === 2){

					if(flag === null){
						displayRecoverModal();						
					}else{
						modal.hide();
					}
				}

			 }).fail(function(err){
		  		console.log(err);
			});
	}


	function getUserInfo(id) {
		var data = {idUsr: id};
		data = JSON.stringify(data);

		$.post('https://vrummapp.net/ws/v2/usuario/info', 
				data
			).then(function(res){

				if(res.estado === 1){

					var userInfo = res.mensaje.rs;
					userInfo = JSON.stringify(userInfo);

					sessionStorage.setItem('currentUserInfo', currentUser);
					
				}

			 }).fail(function(err){
	  			console.log(err);
		});
	}

	$.fn.disNone = function(){
		
		this.css({display: 'none'});
		return this;
	}

	$.fn.disBlock = function(){
		this.css({display: 'block'});
		return this;
	}

	$.fn.an = function(){
		this.animate({height: 'toggle'}, 200);
		return this;
	}


	function showSubmitError(res) {
		errMsg.css({display: 'block'});
		userE.val("");
		userPass.val("");
	}

	function removePrev(){
		var prevEl = registrarbtn.prev('p#nicknameText');
		prevEl.remove();
	}

	function displayRecoverModal() {

		modal.css({display: 'flex'});
		
		var devID = sessionStorage.getItem('deviceId');
		devID = devID.toString();
		var mailTxt = userE.val();
		var geoLoc = sessionStorage.getItem('location');
		var params = {device: devID, mail: mailTxt, geoloc: geoLoc};

		resendPassMail.click(function(){
			params = JSON.stringify(params);

			var mailGood = sessionStorage.getItem('mailGood');

			if(mailGood === 'yes'){
				recoverPassSend(params,'etw');
			}
		});
	}




});

function con(etw){
	console.log(etw);
}