$(function(){



	var loginForm = $('#login');
	var userE = $('#l-email'),
	userPass = $('#l-pass'),
	linkReg = $('button#goToReg'),
	passRecTxt = $('div.passRecover'),
	errMsg = $('div.errorLogin'),
	passCont = $('div#l-passCont'),
	emailCont = $('div#r-emailInputGrp'),
	recoverPass = false,
	normalText = $('span#normalText'),
	recoverPassTxt = $('span#recoverPassTxt'),
	subBtnNrTxt = $('span#subBtnNrTxt'),
	subBtnRecTxt = $('span#subBtnRecTxt'),
	registrarbtn = $('button.registrarbtn');

	userE.focus(removePrev);
	userPass.focus(removePrev);

	passRecTxt.click(function(){
		recover();
	});

	linkReg.click(function(){

		window.location = 'pages/registro.html'
	});

	function recover(){
		errMsg.css({display: 'none'});
		passCont.animate({height: 'toggle'}, 200).remove();
		passRecTxt.animate({height: 'toggle'}, 200).remove();
		normalText.css({display: 'none'});
		subBtnNrTxt.css({display: 'none'});
		subBtnRecTxt.css({display: 'block'});
		recoverPassTxt.css({display: 'block'});
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
			recoverPassTxt.css({display: 'none'});
			normalText.css({display: 'block'});
			subBtnRecTxt.css({display: 'none'});
			subBtnNrTxt.css({display: 'block'});
			passCont.animate({height: 'toggle'}, 200)
			passRecTxt.animate({height: 'toggle'}, 200).click(recover);

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
				console.log(res);

				if(res.mensaje === 2){
					console.log(res.mensaje);
				}

			 }).fail(function(err){
		  		console.log(err);
			});
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




})