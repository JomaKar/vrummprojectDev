$(function(){

	$(document).ready(function(){
		browserFingerprint();
		getGeolocalization();
	});

	var fakeUUID = 0, geoloc, locationAsk = 0, fakingUUIDAsk = 0, locationToReturn;

	function browserFingerprint(){
		new Fingerprint2().get(function(result, components){
		  fakingUUID(result);
		});
	}


	function fakingUUID(val){
		//fakeUUID = val;
		//dataManagement('', '');
		console.log(val);
		if(fakingUUIDAsk ===  0){
			fakeUUID = val;
			fakingUUIDAsk++;
			console.log('hi first')
			return;
		}
			console.log('hi', fakeUUID)
			return fakeUUID;
		
	}

	function currentLocation(val){ 
		console.log(val)
		if(locationAsk ===  0){
			locationToReturn = val;
			locationAsk++;
			console.log('hi first')
			return;
		}
			console.log('hi', locationToReturn);
			return locationToReturn;
		
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

	/*male.click(function(){
		gender.gender = "H";
		console.log(gender);
	});

	female.click(function(){
		gender.gender = "M";
		console.log(gender);
	})*/

	registroForm.on('submit', function(e){
		e.preventDefault();
		var data = $(this).serializeArray();
		dataManagement(data);
	});





	function dataManagement(infoReg, infoLogin){
		var values = {};
		var uuid = fakingUUID();
		var arr = [uuid.slice(0, 8), uuid.slice(8, 12), 
		uuid.slice(12, 16), uuid.slice(16, 20), uuid.slice(20)];
		var uuidString = arr.join('-');
		var device = {'device': uuidString}, localization = currentLocation();
		

		if(localization === undefined) {
			localization = {'geoloc': 'noAccesible'};
		}else{
			localization = {'geoloc': localization};
		}

	

		/*usefull when we use the browser's fingerprin
			if(infoReg.length > 0){
							
				infoReg.unshift(device);

				$.each(infoReg, function(i, field) {
					if(i===1){
						values[field] = device[field];
					}else{
						values[field.name] = field.value;
					}
				    
				});	

			}else if(infoLogin.length > 0){

				infoLogin.unshift(device);

				$.each(infoLogin, function(i, field) {
					if(i===1){
						values[field] = device[field];
					}else{
						values[field.name] = field.value;
					}
				    
				});	
			}
		*/

		/*usefull while we are making tests*/
		if(infoReg !== undefined && infoReg.length > 0){
			
			device.device = '9';
			infoReg.unshift(device, localization);

			var newFields = ['device', 'geoloc', 'gender', 'foto'];	
			

		
			$.each(infoReg, function(i, field) {
				if(i <= 1){

					for(var el in field){
						values[el] = infoReg[i][el];
					}

				}else{
					values[field.name] = field.value;
				}
			});

			console.log(JSON.stringify(values));

		}	


	}


	/*
	$.post('https://vrummapp.net/ws/v2/usuario/registro', 
		JSON.stringify(myJSON)
	).then(function(res){ console.log(res)  }).fail(function(err){
  		console.log(err);
	});
	*/
});