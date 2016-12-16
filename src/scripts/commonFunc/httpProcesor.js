import {navigating, myLocation} from './locating.js';
import {displayErr} from './displayErrs.js';
import {con} from './consoling.js';
import {queriesT, hashesExist} from './urlEncoder.js';

//urlEnd inticate where to go

export function sendPostToGo(urlEnd, data, whereTo){
	//console.log('from sendPostToGo', data);

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
	console.log(data, 'from processor');

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
			}
			else if(flag === 'brands' && res.estado === 1){

				var brands = res.mensaje.rs;
		        brands = JSON.stringify(brands);
		        sessionStorage.setItem('catalogBrands', brands);

			}else if(flag === 'mdls' && res.estado === 1){

				var modelsArr = res.mensaje.rs;
	            modelsArr = JSON.stringify(modelsArr);
	            sessionStorage.setItem('modelsArr', modelsArr);

			}else if(flag === 'vrsInfo' && res.estado === 1){

				var versionsArr = res.mensaje.rs;
				versionsArr = JSON.stringify(versionsArr);
				sessionStorage.setItem('versionsArr', versionsArr);

			}else if(flag === 'vrsGal' && res.estado === 1){

				var versionsPicts = res.mensaje.rs;
                versionsPicts = JSON.stringify(versionsPicts);
                sessionStorage.setItem('versionsPhotos', versionsPicts);

			}else if(flag === 'spVrsInfo' && res.estado === 1){

				var versionsArr = res.mensaje.rs;
				var versionsToTransform = res.mensaje.rs;


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