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
	registrarbtn = $('button.registrarbtn'),
	modal = $('div.passModalCont'),
	recoverPassFragment = $('span.mailRecover');

	userE.focus(removePrev);
	userPass.focus(removePrev);

	passRecTxt.click(function(){
		recover();
	});

	linkReg.click(function(){

		window.location = 'pages/registro.html';

		askForBrands();

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
		errMsg.disNone();
		passCont.an().remove();
		passRecTxt.an().remove();
		normalText.disNone();
		subBtnNrTxt.disNone();
		subBtnRecTxt.disBlock();
		recoverPassTxt.disBlock();
		recoverPass = true;
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
			recoverPass = false;
			emailCont.after(passCont);
			errMsg.after(passRecTxt);
			recoverPassTxt.disNone();
			normalText.disBlock();
			subBtnRecTxt.disNone();
			subBtnNrTxt.disBlock();
			passCont.an();
			passRecTxt.an().click(recover);

			var mailTxt = userE.val();
			var geoLoc = sessionStorage.getItem('location');
			var params = {device: devID, mail: mailTxt, geoloc: geoLoc};

			params = JSON.stringify(params);

			var mailGood = sessionStorage.getItem('mailGood');

			if(mailGood === 'yes'){
				recoverPassSend(params);
			}else{
			
				var wrongOne = "<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";
				registrarbtn.before(wrongOne);

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

	function recoverPassSend(argument) {
		//console.log(argument)
		$.post('https://vrummapp.net/ws/v2/usuario/getpasswd', 
				argument
			).then(function(res){

				if(res.estado === 2){

					displayRecoverModal();
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

		var textVal = userE.val();

		recoverPassFragment.html(textVal);

		modal.css({display: 'flex'});
		setTimeout(function(){ modal.hide(); }, 2000)
	}




})