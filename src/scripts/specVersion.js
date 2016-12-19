import {con} from './commonFunc/consoling.js';
import {navigating, myLocation} from './commonFunc/locating.js';
import {queriesT, hashesExist} from './commonFunc/urlEncoder.js';


$(function(){



	if(myLocation == '/web/catalogo/specific-version.html' || myLocation == '/web/catalogo/specific-version'){
		
		//version info variables
			var version = {};
			var versions = [];

		//DOM variables
		var theCarousel = $('div.versionsCarousel');
		var versionDetailCont = $('div.versionDetailCont');
		var versionsArrows = $('span.versionArrow');

		//spans with version index number, in compare version bar

		var versionRecognizerGroup = $('div.versionRecognizerGroup');
		var spanNum = $('span.versionNum');
		var spanTotal = $('span.versionTotal');
		var isGarageImg = $('#btnAddToGarage img.isGarage');
		var addGarageBtn = $('a#btnAddToGarage');
		var addToGrgMsg = $('span.addToGrgMsg');
		var addGrgList = $('ul.addToGarage');

		//carousel variables
		var imgs = [];
		var currentVersionMainImg = '';

		//change variables
		var versionChange = false;
		var selectedVersion = {};
		var versionInGarage = false;

		//console.log(theCarousel);

		if(sessionStorage.getItem('versionsArr') !== null && sessionStorage.getItem('versionStored') !== null){
			version = JSON.parse(sessionStorage.getItem('versionStored'));
			versions = JSON.parse(sessionStorage.getItem('versionsArr'));

			//hideShowArrows(versions, 'start');

			if(hashesExist){
				//console.log(version, 'hi here', queriesT.cId);
				var storedNum = parseInt(version.id), 
				newNum = parseInt(queriesT.cId);
				
				(storedNum === newNum) ? kickStart('start') : selectVersionStart(versions, 'start');
			
			}else{

				kickStart('start')
			}

		}else{
			wait();
		}

		function wait() {
			setTimeout(function(){
				if(sessionStorage.getItem('versionStored') !== null){
					version = JSON.parse(sessionStorage.getItem('versionStored'));
					versions = JSON.parse(sessionStorage.getItem('versionsArr'));
					hideShowArrows(versions, 'wait');

					if(hashesExist){
						//console.log(version, 'hi here', queriesT.cId);
						var storedNum = parseInt(version.id), 
						newNum = parseInt(queriesT.cId);
						
						(storedNum === newNum) ? kickStart('wait') : selectVersionStart(versions, 'wait');
					
					}else{

						kickStart('wait')
					}

				}else{
					askVersionsAgain();
				}
			}, 2000);
		}

		function askVersionsAgain() {
			if(hashesExist){
				var datos = (localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? {'device': sessionStorage.getItem('deviceId'), modelId: parseInt(queriesT.mdlId), user: localStorage.getItem('aUsr')} : {'device': sessionStorage.getItem('deviceId'), modelId: parseInt(queriesT.mdlId)};
				datos = JSON.stringify(datos);
				$.post('https://vrummapp.net/ws/v2/catalogo/getversiones', datos)
				.then(function(res){
					if(res.estado === 1){
						versions = res.mensaje.rs;



						hideShowArrows(versions, 'askVersionsAgain');
						selectVersionStart(versions, 'askVersionsAgain');

					}
				}).fail(function(err){
					console.log(err)
				});
			}else{
				wait();
			}
		}

		function hideShowArrows(versns, or) {
			//console.log(versns, or);
			
			(versns.length > 1) ? null : (versionsArrows.hide(), versionRecognizerGroup.css({margin: '0 auto'}));
		}

		function selectVersionStart(vrs, or){

			//console.log('selectVersionStart', or, vrs);

			var carId = parseInt(queriesT.cId);

			var versionAr = $.grep(vrs, function(el, idx){
								var objId = parseInt(el.id);
								//console.log('selectVersionStart', objId, carId);
								if(objId === carId){

									return  el;
								} 

							});

			version = versionAr[0];

			(version !== undefined && version !== null) ? kickStart('selectVersionStart') : askVersionsAgain(); 
			//console.log('selectVersionStart', version);
		}



		function kickStart(or) {
			//console.log('kickStart', or);
			displayBrand();
			sizeCarousel();
			displayCarousel();
			selectVersion(null);
		}

		$(window).resize(function(){
			sizeCarousel();
		});



		function displayCarousel() {

			var imgsCont = $('div.thumbImgsCont');
			
			var arrowsCont = $('div.arrowsCont');

			if(!versionChange){

				($.isArray(version.pic_web)) ? imgs = version.pic_web : imgs[0] = version.pic_web;

			}else{

				imgs = [];

				($.isArray(selectedVersion.pic_web))  ? imgs = selectedVersion.pic_web : imgs[0] = selectedVersion.pic_web;

			}


			$(theCarousel).css({
				'background-image': `url(${imgs[0]})`
			});

			currentVersionMainImg = imgs[0];

			var classes = '';

			imgsCont.find('div.carThumbImgUnit').remove();

			imgs.forEach(function(item, idx){
				(idx === 0) ? classes = 'carThumb active' : classes = 'carThumb';

				var imgPrototype = `<div class="carThumbImgUnit"><img src="${item}" class="${classes} img-responsive"></div>`;

				imgsCont.append(imgPrototype);
			});

			if(imgs.length <= 1){

				arrowsCont.hide();
			}

		}


		versionsArrows.on('click', function(){
			var el = $(this);
			versionChange = true;

			if(el.hasClass('left')){
				selectVersion('left');
			}else if(el.hasClass('right')){
				selectVersion('right');
			}

		});



		var objIdx = -1;

		function selectVersion(dir){
			var info = [];


			if(!versionChange){
				findVersionIdx();
				spanNum.text(objIdx + 1);
				spanTotal.text(versions.length);
				info =  version.ficha_tecnica;
				throwInfo(info);

			}else if(dir.length > 0 && versionChange){
				versionInGarage = false;
				/*console.log(versions, 'versions');
				console.log(selectedVersion, 'selectedVersion');
				console.log(version, 'version');*/


				findVersionIdx();

				var lastVersionIdx = versions.length - 1;

				var numIdx; 

				if(objIdx === 0) {
					(dir === 'right') ? numIdx =  2 : numIdx = versions.length;

				} else if(objIdx === lastVersionIdx){

					(dir === 'right') ? numIdx = 1 : numIdx = objIdx;

				}else{

					(dir === 'right') ? numIdx = parseInt(spanNum.text()) + 1 : numIdx = parseInt(spanNum.text()) - 1;
				}
				
				spanNum.text(numIdx);

				if(objIdx === 0){

					(dir === 'left') ? selectedVersion = versions[lastVersionIdx] : selectedVersion = versions[objIdx + 1];

				}else if(objIdx === lastVersionIdx){

					(dir === 'left') ? selectedVersion = versions[objIdx - 1] : selectedVersion = versions[0];

				}else{

					(dir === 'left') ? selectedVersion = versions[objIdx - 1] : selectedVersion = versions[objIdx + 1];
				
				}

				info = selectedVersion.ficha_tecnica;
				changeUrlId(selectedVersion.id);

				throwInfo(info);
				displayBrand();
				displayCarousel();

			}
			
		}

		function findVersionIdx() {

			$.map(versions, function(itm, idx){

					if(selectedVersion.id !== undefined && selectedVersion.id !== null){

						if(itm.id === selectedVersion.id){
							objIdx = idx;
						}

					}else{

						if(itm.id === version.id){
							objIdx = idx;
						}

					}
				});
		}


		function changeUrlId(id) {
			var href = window.location.href;

			var carIdUrlIdx = href.search('cId');

			if(carIdUrlIdx !== -1){
				var nextAnIdx = href.indexOf('&', carIdUrlIdx);
				var urlBefcID = href.slice(0, carIdUrlIdx);
				var carId = 'cId=' + id;

				var newHref = (nextAnIdx !== -1) ? `${urlBefcID}${carId}${href.slice(nextAnIdx)}` : `${urlBefcID}${carId}`;

				con(newHref);
			}
		}

		function throwInfo(info) {
			$('div.fichaTecnicaDetail').empty();
			$('div.fichaCat').empty();

			var actualCat = info[0].tab;

			//this info need to be displayed with endpoint getfichatecnica
			
			info.forEach(function(itm, idx){

				if(idx === 0){
					var cat = `<div class="${itm.tab} fichaCat">
									<h2>${itm.tab}</h2>
								</div>`;
					versionDetailCont.append(cat);
					//console.log(actualCat, itm.tab);

				}else if(itm.tab !== actualCat && !versionDetailCont.find(`div.${itm.tab}`).length){
					actualCat = itm.tab;
					var cat = `<div class="${actualCat} fichaCat">
									<h2>${actualCat}</h2>
								</div>`;
					versionDetailCont.append(cat);
				}

				if(itm.dato !== null && itm.dato !== undefined){
					var plainText = `<p class="${itm.tab}">${itm.valor} : ${itm.dato}</p>`
					versionDetailCont.find(`div.${itm.tab}`).append(plainText);
				}
			});
		}

		//startAlberto

		function addToGarage(type) {

			var userId = localStorage.getItem('aUsr');
	        var deviceId = sessionStorage.getItem('deviceId');
	        var versionId = ( versionChange ) ? selectedVersion.id : version.id;

	        var addedAutos = (localStorage.getItem('addedAutosArr') !== null && localStorage.getItem('addedAutosArr') !== undefined) ? JSON.parse(localStorage.getItem('addedAutosArr')) : [];


	        var dataForGarage = { 'device': deviceId, 'user': userId, 'version': versionId, 'tipo': type };

	        dataForGarage = JSON.stringify(dataForGarage);

	        if(!versionInGarage){

		        $.post('https://vrummapp.net/ws/v2/garage/agregar',
		        	dataForGarage
		        ).then(function(data){

		            if(data.estado === 1){
		            	$('#success-modal').modal();

		            	addedAutos.push(versionId);
		            	addedAutos = JSON.stringify(addedAutos);
		            	localStorage.setItem('addedAutosArr', addedAutos);

		            	isGarageImg.attr('src', '../img/ic_OKGarage@2x.png');
		            }
		        });
	        
	        }
	           
	    }
	    
	    $('.addToGarage a').on('click', function(e) {
	    	e.preventDefault();
	    	var tipo = $(this).data('type');
	    	addToGarage(tipo);
	    });

		//endAlberto


		function displayBrand() {
			var versionsBrandImg = $('div.versionsBrandImg');
			var modelNameSpan = $('p.modelName');
			var modelPrcSpan = $('p.modelPrice');
			var versionNameP = $('p.versionName');

			var brandURL = (sessionStorage.getItem('currentBrandImg') !== null) ? sessionStorage.getItem('currentBrandImg') : version.pic_marca;
			var modelName = (localStorage.getItem('modelName') !== null) ? localStorage.getItem('modelName') : version.model_name;
			
			sessionStorage.setItem('currentBrandImg', version.pic_marca);
			localStorage.setItem('modelName', version.model_name);

			var modelPrice = '',
			versionName = '';

			if(!versionChange){
				
				modelPrice = version.starting_price;
				versionName = version.name;

				isGarage(version);

			}else{

				modelPrice = selectedVersion.starting_price;
				versionName = selectedVersion.name;

				isGarage(selectedVersion);

			}

			
			versionsBrandImg.css({
				'background-image': `url(${brandURL})`
			});

			modelNameSpan.text(modelName);
			modelPrcSpan.text(modelPrice);
			versionNameP.text(versionName);

		}

		function isGarage(vers){

			//console.log('specific-version', vers, localStorage.getItem('addedAutosArr'));

			if(localStorage.getItem('addedAutosArr') !== null && localStorage.getItem('addedAutosArr') !== undefined){

				var autosAlreadyAdded = JSON.parse(localStorage.getItem('addedAutosArr'));
				var lastAutoStored = autosAlreadyAdded.length - 1;
				var currAutoId = parseInt(vers.id);

				if(typeof vers.esta_garage === 'string'){
					isGrgTrue();
				}else if(autosAlreadyAdded.length > 0){

						$.each(autosAlreadyAdded, function(indx, item){
							var idStored = parseInt(item);

							if(currAutoId === idStored){
								isGrgTrue();
							}

							if(indx === lastAutoStored && currAutoId !== idStored && !versionInGarage){
								isGarageImg.attr('src', '../img/ic_AddGarage@2x.png');
								(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? (versionInGarage = false, addToGrgMsg.text('Agregar a Mi Garage'), addGarageBtn.removeClass('defaultPointer')) : (versionInGarage = true, addGrgList.addClass('hiddenItm'), addToGrgMsg.addClass('hiddenItm'), addGarageBtn.addClass('defaultPointer'));	
							}

						});

				}else{
					isGarageImg.attr('src', '../img/ic_AddGarage@2x.png');
					(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? (versionInGarage = false, addToGrgMsg.text('Agregar a Mi Garage'), addGarageBtn.removeClass('defaultPointer')) : (versionInGarage = true, addGrgList.addClass('hiddenItm'), addToGrgMsg.addClass('hiddenItm'), addGarageBtn.addClass('defaultPointer'));
				}


			}else if(typeof vers.esta_garage === 'string'){
			
				isGrgTrue();
			
			}else{

				isGarageImg.attr('src', '../img/ic_AddGarage@2x.png');
				(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? (versionInGarage = false, addToGrgMsg.text('Agregar a Mi Garage'), addGarageBtn.removeClass('defaultPointer')) : (versionInGarage = true, addGrgList.addClass('hiddenItm'), addToGrgMsg.addClass('hiddenItm'), addGarageBtn.addClass('defaultPointer'));
				//console.log( 'versionInGarage', versionInGarage);
			}
		}

		function isGrgTrue() {
			versionInGarage = true;
			isGarageImg.attr('src', '../img/ic_OKGarage@2x.png');
			addGrgList.addClass('hiddenItm')
			addGarageBtn.addClass('defaultPointer');
			addToGrgMsg.text('Agregado al Garage');
		}

		function sizeCarousel() {
			
			var widthImg = theCarousel.width();

			var height = widthImg * 0.6309;

			theCarousel.height(height);
		}


	}

});