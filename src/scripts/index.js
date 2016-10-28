$(function(){


	var fakeUUID = 0, 
	geoloc, locationAsk = 0,
	deviceIdval = 0,
	getDeviceAsk = 0,
	osAsk = 0,
	osVal = '',
	fakingUUIDAsk = 0,
	photoAsk = 0,
	photoToReturn, 
	locationToReturn, 
	photo = '',
	user = $('#alias');


	$(document).ready(function(){
		browserFingerprint();
		getGeolocalization();
	});

	function registerDevice(val) {
		var values = {};
		var uuid = fakingUUID();
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

			
			$.post('https://vrummapp.net/ws/v2/acceso/getdevice', 
				values
			).then(function(res){  

				var id = res.mensaje.rs[0].id;
				console.log(id);

				deviceId(id)


			 }).fail(function(err){
		  		console.log(err);
			});

		}

	}

	function deviceId(argument) {
		if(getDeviceAsk ===  0){
			deviceIdval = argument;
			getDeviceAsk++;
			return;
		}
			return deviceIdval;
	}

	function getOS(val){
		
		osVal = val.value;
		registerDevice(osVal);
		
	}


	function browserFingerprint(){
		new Fingerprint2().get(function(result, components){
		  fakingUUID(result);
		  getOS(components[0]);
		});
	}


	function fakingUUID(val){
		if(fakingUUIDAsk ===  0){
			fakeUUID = val;
			fakingUUIDAsk++;
			return;
		}
			return fakeUUID;
		
	}

	function currentLocation(val){
		if(locationAsk ===  0){
			locationToReturn = val;
			locationAsk++;
			return;
		}
			return locationToReturn;
		
	}

	function assignPhotoValue(val){
		if(photoAsk === 0){
			photoToReturn = val;
			photoAsk++;
			return;
		}

		return photoToReturn;
	}

	//console.log('falta terminar de recabar la información del formulario así como hacer las validaciones a partir de los endpoints')

	function getGeolocalization(){
		if(navigator.geolocation) {
        		navigator.geolocation.getCurrentPosition(function(position) {
            	var latitude = position.coords.latitude;
            	var longitude = position.coords.longitude;
            	geoloc = latitude + ', ' + longitude;
            	currentLocation(geoloc);
        	});
    	}
	}


	var registroForm = $('form#registro');
	var male= $('input.genderM'), female = $('input.genderF'), gender= {};


	registroForm.on('submit', function(e){
		e.preventDefault();
		var data = $(this).serializeArray();
		dataManagement(data);
	});


	$('#image_file').on('change', function(){

		if($(this)[0].files.length > 0){

			var pict = $(this)[0].files[0].name;
			
			assignPhotoValue(pict);

		}else{
			console.log('no hay archivos')
		}
		
	});


	function dataManagement(infoReg){
		var values = {};
		var uuid = deviceId();
		//var arr = [uuid.slice(0, 8), uuid.slice(8, 12), 
		//uuid.slice(12, 16), uuid.slice(16, 20), uuid.slice(20)];
		var uuidString =  uuid; //arr.join('-');
		var device = {'device': uuidString}, 
		localization = currentLocation(), 
		photography = assignPhotoValue();
		

		if(localization === undefined) {
				localization = {'geoloc': 'noAccesible'};
			}else{
				localization = {'geoloc': localization};
		}

		if(photography === undefined) {
				photography = {'photo': 'profileDafault.png'};
			}else{
				photography = {'photo': photography};
		}

	
		if(infoReg !== undefined && infoReg.length > 0){
			
			infoReg.unshift(device, localization, photography);
			

		
			$.each(infoReg, function(i, field) {
				if(i <= 2){

					for(var el in field){
						values[el] = infoReg[i][el];
					}

				}else{
					if(field.name === 'refered_by'){
						values[field.name] = sessionStorage.getItem('id');
					}else{
						values[field.name] = field.value;
					}
					
				}
			});

			var formData = JSON.stringify(values)
			sendForm(formData);

		}	
	}

	function sendForm(val){

		$.post('https://vrummapp.net/ws/v2/usuario/registro', 
			val
		).then(function(res){ 
			console.log(res)

			var currentUser = user.val().toString();
			var device = deviceId();
			device = device.toString();

			sessionStorage.setItem('currentUser', currentUser);
			sessionStorage.setItem('deviceId', device);
			sessionStorage.setItem('activeSession', 'yes');

			window.location = '../index.html';

		 }).fail(function(err){
	  		console.log(err);
		});
		
	}


});