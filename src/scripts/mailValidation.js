$(function(){


	var nickInput = $('input#inputEmail'),
	passInput = $('input#inputPassword'),
	passConfInput = $('input#inputPassword2');

	var camaleonUUID = 0, 
	fakingUUIDAsking = 0;

	$(document).ready(function(){
		fingerprint();
	});

	passConfInput.keyup(function(){
		var nextEl = $('p#passConfText');
		nextEl.remove();
	})

	passConfInput.focus(function(){

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

	nickInput.keyup(function () {
		var nextEl = $('p#mailValText');
		nextEl.remove();
	})

	nickInput.focus(function(){
		
		var nextEl = $('p#mailValText');
		nextEl.remove();

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

				mailExist(res);  

			}).fail(function(err){
				con(err)
		  		mailExist('noOne');

			});	
		}	
	}


	function mailExist(val) {
		var posMail = nickInput.val();

		if (val !== 'noOne') {
			var greenLight = "<p id='mailValText' class='goodText'>"+ posMail +" es un buen mail</p>";

			nickInput.after(greenLight);

		} else {

			var wrongOne = "<p id='mailValText' class='badText'>"+ posMail +" es un mail incorrecto o ya existe</p>";
			nickInput.after(wrongOne);

		}
	}





	function con(val){
		console.log(val);
	}
})