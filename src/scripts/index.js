$(function(){

	whereIam();

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
	user = $('#alias'),
	linkLogin = $('button#goToLogin'),
	refInput = $('input#referido'),
	posFrList = $('ul.posibleFriendsList'),
	noFriendMsg = $('div.errorFriendNick'),
	registrarbtn = $('button.registrarbtn');
	var divImgCont = $('div#r-inpFileImgCont');

	linkLogin.click(function(){

		window.location = '../index.html'

	});

	$(document).ready(function(){
		$(this).scrollTop(0);
		browserFingerprint();
		getGeolocalization();
		//setImgDataAttr();
	});

	$(window).resize(function(){
		//setImgDataAttr();
	})

	function whereIam() {
		var place = window.location.pathname;

		var lastSlash = place.lastIndexOf('/');

		place = place.slice(lastSlash);
		
		if(place === "/perfil.html"){

			 getDeviceIDStarting();

			 var currUsrName = sessionStorage.getItem('currentUser');

			 if(currUsrName !== null && currUsrName !== undefined){
			 	$('.fullName').html(currUsrName);
			 }
		}else if(place === "/catalogo-marcas.html"){
			getDeviceIDStarting();
		}
		/*else{

			sessionStorage.removeItem('activeSession');
			sessionStorage.removeItem('currentUser');

		}*/

		
	}

	var newWidth = 0;

	function setImgDataAttr(){
		var place = window.location.pathname;

		var lastSlash = place.lastIndexOf('/');

		place = place.slice(lastSlash);
		
		if(place === "/registro.html"){
			 
			 var wid = divImgCont.width();

			 if(newWidth === 0){

			 	divImgCont.attr('data-width', wid);

			 }

			 if(newWidth !== wid && newWidth !== 0){

			 	divImgCont.attr('data-width', wid);
			 	 console.log(wid);
			 }

			 setTimeout(function(){
			 	newWidth = wid;
			 }, 3)

		}
	}

	function getDeviceIDStarting(){
		var currentDeviceId = '',
		 storedDeviceId = sessionStorage.getItem('deviceId');
		 sessionStorage.removeItem('nickGood');
		 sessionStorage.removeItem('mailGood');

		 if(storedDeviceId !== null && storedDeviceId !== undefined)
		 {
		 	currentDeviceId = storedDeviceId;
		 	con('el device id fue el mismo')

		 }else{
		 	con('el device id no fue el mismo')
		 	browserFingerprint();
		 	con(currentDeviceId);
		 }
	}

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
				//con(res);
				if(res.estado === 1){

					var id = res.mensaje.rs[0].id;
					deviceId(id)

				}

			 }).fail(function(err){
		  		console.log(err);
			});

		}

	}

	function deviceId(argument) {
		if(getDeviceAsk ===  0){
			deviceIdval = argument.toString();
			getDeviceAsk++;
			sessionStorage.setItem('deviceId', deviceIdval);
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

	function getGeolocalization(){
		var loc = sessionStorage.getItem('location');

		if(loc !== undefined && loc !== null){

			currentLocation(loc);

		}else{

			if(navigator.geolocation) {
	        		navigator.geolocation.getCurrentPosition(function(position) {
	            	var latitude = position.coords.latitude;
	            	var longitude = position.coords.longitude;
	            	geoloc = latitude + ', ' + longitude;
	            	currentLocation(geoloc);
	            	sessionStorage.setItem('location', geoloc); 
        		});
    		}
		}
	}


	function checkFriend(val) {
		var itms = posFrList.children('li');

		return $.map(itms, function(value, key){
			
			var nickTxt = $(itms[key]).find('span.psFrAlias').html();
			var idTxt = $(itms[key]).find('span.friendId').html();
			if(nickTxt === val){ 

				if(idTxt !== undefined && idTxt !== null && idTxt.length > 0){
					idTxt = idTxt.toString();					
					sessionStorage.setItem("id", idTxt);
				}
				
				return true;
			}

		});
	}


	var registroForm = $('form#registro');
	var male= $('input.genderM'), female = $('input.genderF'), gender= {};


	registroForm.on('submit', function(e){
		e.preventDefault();
		var data = $(this).serializeArray();
		var value = refInput.val();


		if(value.length > 0 && value !== 'Sin invitación'){
			var exist = checkFriend(value);
			
			if(exist.length > 0 && exist[0] === true){
				dataManagement(data);

			}else{

				noFriendMsg.toggle();
			}

		}else if(value === 'Sin invitación'){
			
			dataManagement(data);

		}

	});

	$(document).on('click', 'div.ok', function(){

		setTimeout(function(){

			if(divImgCont.find('img').length){
				var dataImg = divImgCont.find('img').attr('src').replace(/^data:image\/(png|jpg);base64,/, "");
				assignPhotoValue(dataImg);
			}

		}, 200);

	});

	function assignPhotoValue(val){
		if(val !== null){
			photoToReturn = val;
			return;
		}

		return photoToReturn;
	}


	function dataManagement(infoReg){
		var values = {};
		var uuid = deviceId();
		//var arr = [uuid.slice(0, 8), uuid.slice(8, 12), 
		//uuid.slice(12, 16), uuid.slice(16, 20), uuid.slice(20)];
		var uuidString =  uuid; //arr.join('-');
		var device = {'device': uuidString}, 
		localization = currentLocation(), 
		photography = assignPhotoValue(null);
		

		if(localization === undefined) {
				localization = {'geoloc': 'noAccesible'};
			}else{
				localization = {'geoloc': localization};
		}

		if(photography === undefined || photography === null) {
				photography = {'foto': 'profileDafault.png'};
			}else{
				photography = {'foto': photography};
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
					}else if(field.name === 'tags'){
						values[field.name] = field.value + ', ' + values.alias + ', '+ values.email + ', '+ values.nombre;
					}else{
						values[field.name] = field.value;
					}
					
				}
			});

			var formData = JSON.stringify(values)
			var mailGood = sessionStorage.getItem('mailGood'),
			goodNick = sessionStorage.getItem('nickGood');

			if(mailGood === 'yes' && goodNick === 'yes'){
				sendForm(formData);
			}else{
			
				var wrongOne = "<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";
				registrarbtn.before(wrongOne);

			}
		}	

	}

	var userInfo = [];

	function sendForm(val){
		sessionStorage.setItem('inforToReg', val);
		$.post('https://vrummapp.net/ws/v2/usuario/registro', 
			val
		).then(function(res){ 
			console.log(res)

			if(res.estado === 1){
				var currentUser = user.val().toString();

				var id = res.mensaje.usr.id;

				con(id);

				userInfo[0] = res.mensaje.usr;

				userInfo = JSON.stringify(userInfo);

				sessionStorage.setItem('currentUserInfo', userInfo);
				
				//getUserInfo(id);
				
				id.toString();

				sessionStorage.setItem('currentUser', currentUser);
				sessionStorage.setItem('currentUserId', id);
				sessionStorage.setItem('activeSession', 'yes');

				
				window.location = 'perfil.html';
			}

		 }).fail(function(err){
	  		console.log(err);
		});
		
	}


});

function con(argument) {
	console.log(argument);
}