import {navigating, myLocation} from './locating.js';
import {displayErr} from './displayErrs.js';
import {con} from './consoling.js';

//urlEnd inticate where to go

export function sendPostToGo(urlEnd, data, whereTo){

	var usr = sessionStorage.getItem('currentUserId');

	if(whereTo === 'specVer'){
		var brandId = urlEnd.brand_id;
		var modelId = urlEnd.model_id;
		var autoId = urlEnd.id;

		(checkIfActive()) ? navigating(`catalogo/specific-version?ss=1&usrId=${usr}&brdId=${brandId}&mdlId=${modelId}&cId=${autoId}`) : navigating(`catalogo/specific-version?ss=0&brdId=${brandId}&mdlId=${modelId}&cId=${autoId}`);

	}

	$.post(`https://vrummapp.net/ws/v2/${urlEnd}`, 
				data
		).then(function(res){

			con(res);
			
			if(whereTo === 'perfil'){
				
				if(res.estado === 1){


					var id = res.mensaje.rs;
					getInfo(id, 'user');
					id.toString();
					

					ssRmForSet('currentUserId', id);

					sessionStorage.setItem('activeSession', 'yes');

					navigating(`perfil?ss=1&usrId=${id}`);

				}else{

					displayErr('login');
				}

			}if(whereTo === 'perfilr' && res.estado === 1){
				
				var id = res.mensaje.usr.id,
				alias = res.mensaje.usr.alias;
				var userInfo = [];
				userInfo[0] = res.mensaje.usr;
				userInfo = JSON.stringify(userInfo);
				id.toString();

				ssRmForSet('currentUserId', id);
				ssRmForSet('currentUserInfo', userInfo);
				
				sessionStorage.setItem('activeSession', 'yes');

				navigating(`perfil?ss=1&usrId=${id}&alias=${alias}`);

			}else if(whereTo === 'brands' && res.estado === 1){

				var brands = JSON.stringify(res.mensaje.rs);
				sessionStorage.setItem('catalogBrands', brands);

				(checkIfActive()) ? navigating(`catalogo/?ss=1&usrId=${usr}`) : navigating(`catalogo/?ss=0`);

			}else if(whereTo === 'mdls' && res.estado === 1){

				var modelsArr = res.mensaje.rs;
				var brandId = res.mensaje.rs[0].brand_id;
				modelsArr = JSON.stringify(modelsArr);
				sessionStorage.setItem('modelsArr', modelsArr);

				(checkIfActive()) ? navigating(`catalogo/brand-modelo?ss=1&usrId=${usr}&brdId=${brandId}`) : navigating(`catalogo/brand-modelo?ss=0&brdId=${brandId}`);
			
			}else if(whereTo === 'versiones' && res.estado === 1){
				var versionsArr = res.mensaje.rs;
				versionsArr = JSON.stringify(versionsArr);
				sessionStorage.setItem('versionsArr', versionsArr);
				var brandId = res.mensaje.rs[0].brand_id;
				var modelId = res.mensaje.rs[0].model_id;
				
				(checkIfActive()) ? navigating(`catalogo/modelo-versiones?ss=1&usrId=${usr}&brdId=${brandId}&mdlId=${modelId}`) : navigating(`catalogo/modelo-versiones?ss=0&brdId=${brandId}&mdlId=${modelId}`);

			}

		}).fail(function(err){
	  		console.log(err);
	});

}

export function sendPostToGet(urlEnd, data, flag){

	var datos = (data) ? data : '';

	$.post(`https://vrummapp.net/ws/v2/${urlEnd}`, 
				datos
		).then(function(res){
			con(res);
			if(res.estado === 1 && flag === 'usrInfo'){

				//console.log(res)
				
				var userInfo = res.mensaje.rs;
				userInfo = JSON.stringify(userInfo);

				ssRmForSet('currentUserInfo', currentUser);


			}else if(flag === 'usrGrg'){


				if(res.estado === 1){

					var userGarage = res.mensaje.rs;
					userGarage = JSON.stringify(userGarage);

					ssRmForSet('currentUserGarage', userGarage);
					
				}else{
					sessionStorage.setItem('currentUserGarage', 'nothing stored');
				}

			}else if(flag === 'vrsGal' && res.estado === 1){

				var versionsPicts = res.mensaje.rs;
                versionsPicts = JSON.stringify(versionsPicts);
                sessionStorage.setItem('versionsPhotos', versionsPicts);

			}

		}).fail(function(err){
	  		console.log(err);
	});

}

function checkIfActive(){
	var session = sessionStorage.getItem('activeSession');

	return (session === 'yes') ? true : false;
}


function getInfo(info, flag) {
	if(flag === 'user'){
		
		var data = {idUsr: info};
		data = JSON.stringify(data);
		var devicId = sessionStorage.getItem('deviceId');

		var dataForGarage = {idUsr: info, device: devicId};

		dataForGarage = JSON.stringify(dataForGarage);

		sendPostToGet('usuario/info', data, 'usrInfo');
		sendPostToGet('garage/listar', dataForGarage, 'usrGrg');
	}

}

function ssRmForSet(item, data) {
	sessionStorage.removeItem(item);
	sessionStorage.setItem(item, data);
}