import {navigating, myLocation} from './locating.js';
import {displayErr} from './displayErrs.js';
import {con} from './consoling.js';
import {queriesT, hashesExist} from './urlEncoder.js';

//urlEnd inticate where to go

var editChangeSpan = $('#successEditProfile').find('span.datoDetail');

export function sendPostToGo(urlEnd, data, whereTo){
	//console.log('from sendPostToGo', data);
	console.log(data, 'from sendToGo processor', whereTo);

	var usr = localStorage.getItem('aUsrA');

	if(whereTo === 'specVer'){
		var brandId = urlEnd.brand_id;
		var modelId = urlEnd.model_id;
		var autoId = urlEnd.id;

		(checkIfActive()) ? navigating(`catalogo/specific-version?al=${usr}&brdId=${brandId}&mdlId=${modelId}&cId=${autoId}`) : navigating(`catalogo/specific-version?brdId=${brandId}&mdlId=${modelId}&cId=${autoId}`);

	}

	$.post(`https://vrummapp.net/ws/v2/${urlEnd}`, 
				data
		).then(function(res){

			//con(res);
			if(whereTo === 'perfilLog'){
				
				if(res.estado === 1){


					var id = res.mensaje.rs;

					localStorage.setItem('activeSession', 'yes');

					getInfo(id, 'user', true);
					id.toString();
					localStorage.setItem('aUsr', id);
					
					ssRmForSet('currentUserId', id);


				}else{
					con('whatTheFuck')
					displayErr('login');
				}

			}if(whereTo === 'perfilr' && res.estado === 1){
				
				var id = res.mensaje.usr.id,
				alias = res.mensaje.usr.alias;

				var users = (localStorage.getItem('visitedUsrs') !== null && localStorage.getItem('visitedUsrs') !== undefined) ? JSON.parse(localStorage.getItem('visitedUsrs')) : [];
				users.push({'al': alias, 'id': id});
				users = JSON.stringify(users);
				localStorage.setItem('visitedUsrs', users);

				localStorage.setItem('aUsrA', alias);

				var usrPhoto = (res.mensaje.usr.foto_perfil !== null && res.mensaje.usr.foto_perfil !== undefined) ? res.mensaje.usr.foto_perfil.toString() : '';
				if(usrPhoto.length > 0){localStorage.setItem('aUPP', usrPhoto);}
				
				var userInfo = [];
				userInfo[0] = res.mensaje.usr;
				userInfo = JSON.stringify(userInfo);
				id.toString();
				localStorage.setItem('aUsr', id);

				ssRmForSet('currentUserId', id);
				ssRmForSet('currentUserAlias', alias);
				ssRmForSet('currentUserInfo', userInfo);
				
				localStorage.setItem('activeSession', 'yes');

				navigating(`perfil?al=${alias}`);


			}else if(whereTo === 'brands' && res.estado === 1){

				var brands = JSON.stringify(res.mensaje.rs);
				sessionStorage.setItem('catalogBrands', brands);

				(checkIfActive()) ? navigating(`catalogo/?al=${usr}`) : navigating(`catalogo/?`);

			}else if(whereTo === 'mdls' && res.estado === 1){

				var modelsArr = res.mensaje.rs;
				var brandId = res.mensaje.rs[0].brand_id;
				modelsArr = JSON.stringify(modelsArr);
				sessionStorage.setItem('modelsArr', modelsArr);

				(checkIfActive()) ? navigating(`catalogo/brand-modelo?al=${usr}&brdId=${brandId}`) : navigating(`catalogo/brand-modelo?brdId=${brandId}`);
			
			}else if(whereTo === 'versiones' && res.estado === 1){
				var versionsArr = res.mensaje.rs;

				sessionStorage.setItem('currentBrandImg', versionsArr[0].pic_marca.toString());
				localStorage.setItem('modelName', versionsArr[0].model_name.toString());

				versionsArr = JSON.stringify(versionsArr);
				sessionStorage.setItem('versionsArr', versionsArr);
				var brandId = res.mensaje.rs[0].brand_id;
				var modelId = res.mensaje.rs[0].model_id;
				
				(checkIfActive()) ? navigating(`catalogo/modelo-versiones?al=${usr}&brdId=${brandId}&mdlId=${modelId}`) : navigating(`catalogo/modelo-versiones?brdId=${brandId}&mdlId=${modelId}`);

			}

		}).fail(function(err){
	  		console.log(err);
	});

}

export function sendPostToGet(urlEnd, data, flag){
	console.log(data, 'from sendToGet processor', flag);

	var datos = (data) ? data : '';

	$.post(`https://vrummapp.net/ws/v2/${urlEnd}`, 
				datos
		).then(function(res){
			//con(res);
			if(res.estado === 1 && flag === 'usrInfoToGo'){

				var userInfo = [];
				userInfo[0] = res.mensaje.rs[0];
				//console.log('from https', userInfo); goes to fast


				var usrPhoto = (userInfo[0].foto_perfil !== null && userInfo[0].foto_perfil !== undefined) ? userInfo[0].foto_perfil.toString() : '';
				if(usrPhoto.length > 0){localStorage.setItem('aUPP', usrPhoto);}

				var usrA = userInfo[0].alias;
				var userId = userInfo[0].id;

				var device = sessionStorage.getItem('deviceId');

			    if(device !== undefined && device !== null && userId){
			        var dataForGarage = {idUsr: userId, device: sessionStorage.getItem('deviceId')};
			        dataForGarage = JSON.stringify(dataForGarage);
			        sendPostToGet('garage/listar', dataForGarage, 'usrGrg');

			    }
				
				var indexOfUser = -1;

				var users = (localStorage.getItem('visitedUsrs') !== null && localStorage.getItem('visitedUsrs') !== undefined) ? JSON.parse(localStorage.getItem('visitedUsrs')) : [];
				
				users.forEach(function(itm, idx){
					var someId = parseInt(itm.id);
					if(someId === userId){
						indexOfUser = idx;
					}
				});

				if(indexOfUser === -1){

					users.push({'al': usrA, 'id': userId});
					users = JSON.stringify(users);
					localStorage.setItem('visitedUsrs', users);
				
				}


				userInfo = JSON.stringify(userInfo);
				localStorage.setItem('aUsrA', usrA);


				ssRmForSet('currentUserAlias', usrA);
				ssRmForSet('currentUserInfo', userInfo);

				if(myLocation !== "/web/perfil/" && myLocation !== "/web/perfil/index" && myLocation !== "/web/perfil/index.html"){

					navigating(`perfil?al=${usrA}`);
				
				}


			}else if(res.estado === 1 && flag === 'usrInfoToGet'){

				var userInfo = [];
				userInfo[0] = res.mensaje.rs[0];
				//console.log('from https', userInfo); goes to fast

				var usrA = userInfo[0].alias;
				var userId = userInfo[0].id;

				var indexOfUser = -1;

				var users = (localStorage.getItem('visitedUsrs') !== null && localStorage.getItem('visitedUsrs') !== undefined) ? JSON.parse(localStorage.getItem('visitedUsrs')) : [];

				users.forEach(function(itm, idx){
					var someId = parseInt(itm.id);
					if(someId === userId){
						indexOfUser = idx;
					}
				});
				

				if(indexOfUser === -1){

					users.push({'al': usrA, 'id': userId});
					users = JSON.stringify(users);
					localStorage.setItem('visitedUsrs', users);
				
				}
				
				ssRmForSet('currentUserAlias', usrA.toString());
				ssRmForSet('currentUserId', userId.toString());

				userInfo = JSON.stringify(userInfo);

				ssRmForSet('currentUserInfo', userInfo);

				var device = sessionStorage.getItem('deviceId');

			    if(device !== undefined && device !== null && userId){
			        var dataForGarage = {idUsr: userId, device: sessionStorage.getItem('deviceId')};
			        dataForGarage = JSON.stringify(dataForGarage);
			        sendPostToGet('garage/listar', dataForGarage, 'usrGrg');

			    }

			}else if(flag === 'usrGrg'){


				if(res.estado === 1){

					var userGarage = res.mensaje.rs;
					userGarage = JSON.stringify(userGarage);

					ssRmForSet('currentUserGarage', userGarage);
					
				}else{
					sessionStorage.setItem('currentUserGarage', 'nothing stored');
				}

			}else if(flag === 'usrAct'){
				//console.log('trying to change profila photo', res);

				if(res.estado === 1){

					//console.log('success', res.mensaje);

					if(sessionStorage.getItem('temptyImgForLocal') !== null && sessionStorage.getItem('temptyImgForLocal') !== undefined){
						var photoOficial = sessionStorage.getItem('temptyImgForLocal');
						localStorage.setItem('aUPP', photoOficial.toString());

						if(sessionStorage.getItem('currentUserInfo') !== null && sessionStorage.getItem('currentUserInfo') !== undefined){
							var usrString = sessionStorage.getItem('currentUserInfo');
							var usrNow = JSON.parse(usrString);

							if($.isArray(usrNow)){
								(usrNow.length > 0) ? usrNow[0].foto_perfil = photoOficial : null;
							}else if((typeof usrNow === "object") && (usrNow !== null)){
								usrNow.foto_perfil = photoOficial;
							}

							usrNow = JSON.stringify(usrNow);

							sessionStorage.setItem('currentUserInfo', usrNow);
						}

						
					}
					
				}
			
			}else if(flag === 'usrContact'){
				//console.log('trying to change profila photo', res);

				if(res.estado === 1){

					$('input.referidoEdit').attr('readonly', true);

					//console.log('success', res.mensaje);

					localStorage.setItem('contactChange', 'y');

					if(localStorage.getItem('passwordChange') !== null && localStorage.getItem('passwordChange') !== undefined){
						(localStorage.getItem('infoChange') !== null && localStorage.getItem('infoChange') !== undefined) ? editChangeSpan.text('contraseña, nuevo contacto de referencia e información general se ha guardado') : editChangeSpan.text('contraseña y nuevo contacto de referencia se han guardado. Pero la demás información no');
					}else{
						(localStorage.getItem('infoChange') !== null && localStorage.getItem('infoChange') !== undefined) ? editChangeSpan.text('nuevo contacto de referencia e información general se ha guardado') : editChangeSpan.text('nuevo contacto de referencia se ha guardado. Pero la demás información no');
					}


					if(sessionStorage.getItem('temptyNewContact') !== null && sessionStorage.getItem('temptyNewContact') !== undefined){
						var contactNew = sessionStorage.getItem('temptyNewContact');

						if(sessionStorage.getItem('currentUserInfo') !== null && sessionStorage.getItem('currentUserInfo') !== undefined){
							var usrString = sessionStorage.getItem('currentUserInfo');
							var usrNow = JSON.parse(usrString);

							if($.isArray(usrNow)){
								(usrNow.length > 0) ? usrNow[0].invitado_por = contactNew : null;
							}else if((typeof usrNow === "object") && (usrNow !== null)){
								usrNow.invitado_por = contactNew;
							}

							usrNow = JSON.stringify(usrNow);

							sessionStorage.setItem('currentUserInfo', usrNow);
						}

						
					}
					
				}else{
					console.log(res);
				}
			
			}else if(flag === 'usrPass'){

				if(res.estado === 1){
					localStorage.setItem('passwordChange', 'y');

					if(localStorage.getItem('contactChange') !== null && localStorage.getItem('contactChange') !== undefined){
						(localStorage.getItem('infoChange') !== null && localStorage.getItem('infoChange') !== undefined) ? editChangeSpan.text('contraseña, nuevo contacto de referencia e información general se ha guardado') : editChangeSpan.text('contraseña y nuevo contacto de referencia se han guardado. Pero no la demás información');
					}else{
						(localStorage.getItem('infoChange') !== null && localStorage.getItem('infoChange') !== undefined) ? editChangeSpan.text('contraseña e información general se ha guardado') : editChangeSpan.text('contraseña se ha guardado. Pero no la demás información');
					}
				}

			}else if(flag === 'usrFullEdit'){
				
				if(res.estado === 1){
					
					localStorage.setItem('infoChange', 'y');


					if(localStorage.getItem('contactChange') !== null && localStorage.getItem('contactChange') !== undefined){
						(localStorage.getItem('passwordChange') !== null && localStorage.getItem('passwordChange') !== undefined) ? editChangeSpan.text('contraseña, nuevo contacto de referencia e información general se ha guardado') : editChangeSpan.text('nuevo contacto de referencia e información se han guardado');
					}else{
						(localStorage.getItem('passwordChange') !== null && localStorage.getItem('passwordChange') !== undefined) ? editChangeSpan.text('contraseña e información general se ha guardado') : editChangeSpan.text('información general se ha guardado');
					}

					$('div#successEditProfile').modal();


					if(sessionStorage.getItem('currentUserInfo') !== null && sessionStorage.getItem('currentUserInfo') !== undefined){
						var usrString = sessionStorage.getItem('currentUserInfo');
						var usrNow = JSON.parse(usrString);
						var newData = JSON.parse(datos);

						console.log('actFullBef', newData, usrNow);

						if($.isArray(usrNow)){
							if(usrNow.length > 0){
								var usrOb = usrNow[0];

								var datosToChange = ['fecha_nac', 'foto_perfil', 'full_name', 'genero', 'materno', 'paterno', 'nombre', 'tags'];

								$.each(datosToChange, function(i, itm){
									if(itm === 'full_name'){
										usrOb[itm] = `${newData.nombre} ${newData.paterno} ${newData.materno}`;
									}else if(itm === 'fecha_nac'){
										usrOb[itm] = newData.fecha_nacimiento;
									}else if(itm === 'foto_perfil'){
										usrOb[itm] = newData.foto;
									}else{
										usrOb[itm] = newData[itm];
									}
								});

								usrNow[0] = usrOb;
							}
						}else if((typeof usrNow === "object") && (usrNow !== null)){
							var datosToChange = ['fecha_nac', 'foto_perfil', 'full_name', 'genero', 'materno', 'paterno', 'nombre', 'tags'];

								$.each(datosToChange, function(i, itm){
									if(itm === 'full_name'){
										usrNow[itm] = `${newData.nombre} ${newData.paterno} ${newData.materno}`;
									}else if(itm === 'fecha_nac'){
										usrNow[itm] = newData.fecha_nacimiento;
									}else if(itm === 'foto_perfil'){
										usrNow[itm] = newData.foto;
									}else{
										usrNow[itm] = newData[itm];
									}
								});
						}

						//console.log('actFullAft', usrNow);

						usrNow = JSON.stringify(usrNow);

						sessionStorage.setItem('currentUserInfo', usrNow);
					}

				}

			}else if(flag === 'brands' && res.estado === 1){

				var brands = res.mensaje.rs;
		        brands = JSON.stringify(brands);
		        sessionStorage.setItem('catalogBrands', brands);

			}else if(flag === 'mdls' && res.estado === 1){

				var modelsArr = res.mensaje.rs;
	            modelsArr = JSON.stringify(modelsArr);
	            sessionStorage.setItem('modelsArr', modelsArr);

			}else if(flag === 'vrsInfo' && res.estado === 1){

				var versionsArr = res.mensaje.rs;
				sessionStorage.setItem('currentBrandImg', versionsArr[0].pic_marca.toString());
				localStorage.setItem('modelName', versionsArr[0].model_name.toString());
				versionsArr = JSON.stringify(versionsArr);
				sessionStorage.setItem('versionsArr', versionsArr);

			}else if(flag === 'vrsGal' && res.estado === 1){

				var versionsPicts = res.mensaje.rs;
                versionsPicts = JSON.stringify(versionsPicts);
                sessionStorage.setItem('versionsPhotos', versionsPicts);

			}else if(flag === 'spVrsInfo' && res.estado === 1){

				var versionsArr = res.mensaje.rs;
				var versionsToTransform = res.mensaje.rs;

				sessionStorage.setItem('currentBrandImg', versionsArr[0].pic_marca.toString());
				localStorage.setItem('modelName', versionsArr[0].model_name.toString());

				if(hashesExist){

					if(queriesT.cId.length > 0){
						var carId = parseInt(queriesT.cId);

						var versionArr = $.grep(versionsToTransform, function(el, idx){
							var objId = parseInt(el.id);
							if(objId === carId){

								return  el;
							} 

						});
						
						var version = versionArr[0];
						version = JSON.stringify(version);
						sessionStorage.setItem('versionStored', version);
						
					}
				}

				versionsArr = JSON.stringify(versionsArr);
				sessionStorage.setItem('versionsArr', versionsArr);

			}

		}).fail(function(err){
	  		console.log(err);
	});

}

function checkIfActive(){
	var session = localStorage.getItem('activeSession');

	return (session === 'yes') ? true : false;
}


function getInfo(info, flag, going) {
	if(flag === 'user'){
		
		var devicId = sessionStorage.getItem('deviceId');
		var data = {idUsr: info};

		data = JSON.stringify(data);
		var dataForGarage = {idUsr: info, device: devicId};

		dataForGarage = JSON.stringify(dataForGarage);
		sendPostToGet('garage/listar', dataForGarage, 'usrGrg');

		(going) ? sendPostToGet('usuario/info', data, 'usrInfoToGo') : sendPostToGet('usuario/info', data, 'usrInfoToGet');

	}

}

function ssRmForSet(item, data) {
	sessionStorage.removeItem(item);
	sessionStorage.setItem(item, data);
}