$(function(){

	$(document).ready(function(){
		browFing();
	});



	var loginForm = $('#login');
	var fakeU = 0, 
	devVal = 0,
	getDevAsk = 0,
	osValue = '',
	fakingUIDAsk = 0, 
	userE = $('#l-email');



	function regDeviceLogin(val) {
		var values = {};
		var uuid = fakerUUID();
		var os = val;
		var keys = ['device', 'type', 'serie', 'os'];

		var device = {'device': uuid},
		type = {type: 'web'},
		serie = {serie: uuid}, 
		vals = [];


		if(os === undefined) {
				os = {'os': 'noAccesible'};
			}else{
				os = {'os': os};
				vals = [device, type, serie, os];
		}


		if(vals.length !== 0){
			keys.forEach(function(itm, i){
				values[itm] = vals[i][itm];
			});

			values = JSON.stringify(values);
			console.log(values);
			
			$.post('https://vrummapp.net/ws/v2/acceso/getdevice', 
				values
			).then(function(res){  

				var id = res.mensaje.rs[0].id;
				console.log(id);

				getDevId(id)


			 }).fail(function(err){
		  		console.log(err);
			});

		}

	}

	function getDevId(argument) {
		if(getDevAsk ===  0){
			devVal = argument;
			getDevAsk++;
			return;
		}
			return devVal;
	}

	function getOSnum(val){
		
		osValue = val.value;
		regDeviceLogin(osValue);
		
	}


	function browFing(){
		new Fingerprint2().get(function(result, components){
		  fakerUUID(result);
		  getOSnum(components[0]);
		});
	}


	function fakerUUID(val){
		if(fakingUIDAsk ===  0){
			fakeU = val;
			fakingUIDAsk++;
			return;
		}
			return fakeU;
		
	}



	loginForm.submit(function(e){
		e.preventDefault();


		var data = $(this).serializeArray();
		var devID = getDevId();
		devID = devID.toString();

		var values = {device: devID};

		$.map(data, function(itm, idx){
			values[itm.name] = itm.value;

		});

		sendLogin(values);



	});


	function sendLogin(val){
		

		var data = JSON.stringify(val);


		$.post('https://vrummapp.net/ws/v2/usuario/login', 
				data
			).then(function(res){  
				console.log(res);

				var currentUser = userE.val().toString();
				var device = getDevId();
				device = device.toString();

				var id = res.mensaje.rs;

				sessionStorage.setItem('currentUser', currentUser);
				sessionStorage.setItem('deviceId', device);
				sessionStorage.setItem('currentUserId', id);
				sessionStorage.setItem('activeSession', 'yes');


				window.location = '../index.html';


			 }).fail(function(err){
		  		console.log(err);
			});


	}




})