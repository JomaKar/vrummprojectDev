import {backing} from './commonFunc/backPage.js';
import {myLocation, strongRoot, totalRoot, navigating} from './commonFunc/locating.js';
import {navInfo} from './commonFunc/activeSessionNav.js';
import {sendPostToGo, sendPostToGet} from './commonFunc/httpProcesor.js';
import {con} from './commonFunc/consoling.js';
import {askBrands, theBrand} from './commonFunc/brandsImgs.js';

askBrands();

$(function(){
	browserFingerprint();
	var theresDevice = false;

	if(theresDevice){
		getDeviceIDStarting();
	}

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
	var myNavBar = $('nav.myNavBar');
	var mainFooter = $('div.mainFooter');
	

	linkLogin.click(function(){

		navigating('home');

	});

	$(document).ready(function(){
		$(this).scrollTop(0);
		getGeolocalization();
		//setImgDataAttr();

		if(myLocation !== "/web/" && myLocation !== "/web/registro/" && myLocation !== "/web/index" && myLocation !== "/web/registro/index" && myLocation !== "/web/index.html" && myLocation !== "/web/registro/index.html"){

			addNavFooter(null, null);

		}else{

			addNavFooter('never', 'never');
		}

	});

	const failModal = $('div#failLog');

	$(document).on('click', 'li.disabled', function(){
		failModal.modal();
	});

	$(window).resize(function(){
		//setImgDataAttr();
	});


	$(document).on('click', 'span.navbarBackBtn', function(){
		//con('here');
		backing(myLocation);
	});

	function addNavFooter(navFlag, footerFlag) {
		var session = localStorage.getItem('activeSession');
		
		if(navFlag !== 'never'){


			(session === 'yes') ? (myNavBar.load('../templates/navbarIn.html'), navInfo()) : myNavBar.load('../templates/navbarOut.html');

		}



		if(footerFlag === null){

			(session === 'yes') ? mainFooter.load('../templates/footerIn.html') : mainFooter.load('../templates/footerOut.html');
		
		}else{

			(myLocation !== "/web/" && myLocation !== "/web/index" && myLocation !== "/web/index.html") ? mainFooter.load('../templates/footerIn.html') : mainFooter.load('./templates/footerIndex.html');

		}

	}

	var newWidth = 0;

	function setImgDataAttr(){

		
		if(myLocation === "/registro/" || myLocation === "/registro/index" || myLocation === "/registro/index.html"){
			 
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
					sessionStorage.setItem("idPsFriend", idTxt);
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
				photography = {'foto': ''};
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
						values[field.name] = sessionStorage.getItem('idPsFriend');
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
				//sendForm(formData);
				sendPostToGo('usuario/registro', formData, 'perfilr');
			}else{
			
				var wrongOne = "<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";
				registrarbtn.before(wrongOne);

			}
		}	

	}

	var userInfo = [];

	function sendForm(val){

		sendPostToGo('usuario/registro', val, 'perfilr');
		
	}

	$(document).on('click', 'a.closeSession', function(){
		
		localStorage.clear();

		var sess = ['currentUserId', 'currentUserInfo', 'idPsFriend', 'currentUserAlias', 'currentUserGarage', 'infoChange', 'contactChange', 'passwordChange'];

		$.map(sess, function(arrItm, indx){
			console.log(arrItm)

			sessionStorage.removeItem(arrItm);
		
		});
	});


});