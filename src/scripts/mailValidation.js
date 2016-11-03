$(function(){


	var nickInput = $('input#inputEmail'),
	loginMailInput = $('#l-email'),
	passInput = $('input#inputPassword'),
	passConfInput = $('input#inputPassword2');

	var camaleonUUID = 0, 
	fakingUUIDAsking = 0;

	$(document).ready(function(){
		fingerprint();
	});

	$.fn.validatePass = function(){
		$(this).keyup(function(){
			var nextEl = $('p#passConfText');
			nextEl.remove();
		})

		$(this).focus(function(){

			var nextEl = $('p#passConfText');
			nextEl.remove();

		}).blur(function() {

			var confVal = $(this).val();
			
		    passConfirmation(confVal);
		});

		function passConfirmation(val){
			var pass = passInput.val();

			if(pass.length > 0 && pass !== val){

				var badConf = "<p id='passConfText' class='badText'>Las contraseñas no coinciden</p>";

				passConfInput.after(badConf);	

			}
		}


		return this;
	
	}

	passConfInput.validatePass();


	$.fn.validateMail = function(el, flag){
		$(this).keyup(function () {
			var nextEl = $('p#mailValText');
			nextEl.remove();
		})

		$(this).focus(function(){
		
			var nextEl = $('p#mailValText');
			nextEl.remove();
			var posMail = $(this).val();
			if(posMail.length > 0){
				mailValidator(posMail);
			}

		}).blur(function() {

			var posMail = $(this).val();
			mailValidator(posMail);
		    
		});


		function mailValidator(val){
			if(val.length > 0){

				var uuid = fakeUUID();
				var arr = [uuid.slice(0, 8), uuid.slice(8, 12), 
				uuid.slice(12, 16), uuid.slice(16, 20), uuid.slice(20)];
				var uuidString = arr.join('-');
				var data = JSON.stringify({'email': val, 'device': uuidString});

				$.post('https://vrummapp.net/ws/v2/usuario/validacorreo', 
					data
				).then(function(res){ 

					if(res.estado === 2){
						console.log(res.mensaje);
						mailExist(res);  
					}else if(res.estado === 1){
						newMail(res);
					}

				}).fail(function(err){

			  		mailExist('noOne');

				});	
			}	
		}


		function mailExist(val) {
			var posMail = el.val();

			if (val !== 'noOne' && flag === 'l') {
				var greenLight = "<p id='mailValText' class='goodText'>"+ posMail +" es un buen mail</p>";
				sessionStorage.setItem('mailGood', 'yes');
				
				removeLast()
				el.after(greenLight);

			} else if(val === 'noOne'){

				var wrongOne = "<p id='mailValText' class='badText'>"+ posMail +" es un mail incorrecto</p>";
				var nextEl = $('p#mailValText');
				removeLast()
				sessionStorage.setItem('mailGood', 'no');

			}else if(val !== 'noOne' && flag === 'r'){

				sessionStorage.setItem('mailGood', 'no');
				var existOne = "<p id='mailValText' class='badText'>"+ posMail +" es un mail que ya existe</p>";
				removeLast()
				el.after(existOne);
			}

		}

		function newMail(val) {
			var posMail = el.val();

			if (flag === 'r') {
				var greenLight = "<p id='mailValText' class='goodText'>"+ posMail +" es un buen mail</p>";
				sessionStorage.setItem('mailGood', 'yes');
				removeLast()
				el.after(greenLight);

			}else if(flag === 'l'){
				var existOne = "<p id='mailValText' class='badText'>"+ posMail +" es un mail que no existe aún</p>";
				sessionStorage.setItem('mailGood', 'no');
				removeLast()
				el.after(existOne);
			}
		}

		function removeLast() {
			var nextEl = $('p#mailValText');
			nextEl.remove();
		}

		return this;
	}

	nickInput.validateMail(nickInput, 'r');

	loginMailInput.validateMail(loginMailInput, 'l');




	function fingerprint(){
		new Fingerprint2().get(function(result, components){
		  fakeUUID(result);
		});
	}

	function fakeUUID(val){
		if(fakingUUIDAsking ===  0){
			camaleonUUID = val;
			fakingUUIDAsking++;
			return;
		}
			return camaleonUUID;
		
	}


	function con(val){
		console.log(val);
	}
})