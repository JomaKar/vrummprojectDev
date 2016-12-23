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
		var addToCmpMsg = $('span.addToCmpMsg');
		var addGrgList = $('ul.addToGarage');

		var compareGroup = $('div.compareGroup.specificVersion');

		//carousel variables
		var imgs = [];
		var currentVersionMainImg = '';

		//change variables
		var versionChange = false;
		var selectedVersion = {};
		var versionInGarage = false;
		var versionInComparator = false;

		//console.log(theCarousel);

		if(sessionStorage.getItem('versionsArr') !== null && sessionStorage.getItem('versionStored') !== null){
			version = JSON.parse(sessionStorage.getItem('versionStored'));
			versions = JSON.parse(sessionStorage.getItem('versionsArr'));

			if(hashesExist){
				//console.log(version, 'hi here', queriesT.cId);
				var storedNum = parseInt(version.id), 
				newNum = parseInt(queriesT.cId);
				
				(storedNum === newNum) ?( kickStart('start'), hideShowArrows(versions, 'start')) : selectVersionStart(versions, 'start');
			
			}else{

				kickStart('start');
				hideShowArrows(versions, 'start');
			}

		}else{
			wait();
		}

		function wait() {
			setTimeout(function(){
				if(sessionStorage.getItem('versionStored') !== null){
					version = JSON.parse(sessionStorage.getItem('versionStored'));
					versions = JSON.parse(sessionStorage.getItem('versionsArr'));

					if(hashesExist){
						//console.log(version, 'hi here', queriesT.cId);
						var storedNum = parseInt(version.id), 
						newNum = parseInt(queriesT.cId);
						
						(storedNum === newNum) ? (kickStart('wait'), hideShowArrows(versions, 'wait')) : selectVersionStart(versions, 'wait');
					
					}else{

						kickStart('wait');
						hideShowArrows(versions, 'wait');
					}

				}else{
					askVersionsAgain();
				}
			}, 1600);
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
			//console.log(,'hideShowArrows', versns, or);
			
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
			displayBrandBar();
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
				displayBrandBar();
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

			//need to be deleted
			$('div.fichaTecnicaDetail').empty();
			$('div.fichaCat').empty();
			//til here
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
	    
	    isGarageImg.click(function(){

	    	(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? null : alert('Loguéate para añadir coches a tu garage');

	    });

	    compareGroup.click(function(e) {
			(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? addToComparator(localStorage.getItem('aUsr')) : alert('Loguéate para añadir coches a tu comparador');	    	
	    });

	    function addToComparator(id){
	    	//console.log(id, localStorage.getItem('aUsr'));
	    	var theId = parseInt(id);

	    	var deviceId = sessionStorage.getItem('deviceId');
	        var versionId = ( versionChange ) ? selectedVersion.id : version.id;

	        var addedInComparatorAutos = (localStorage.getItem('addedInComAutosArr') !== null && localStorage.getItem('addedInComAutosArr') !== undefined) ? JSON.parse(localStorage.getItem('addedInComAutosArr')) : [];


	        var dataForCompare = JSON.stringify({ 'device': deviceId, 'idUsr': theId, 'version': versionId});
	        con(dataForCompare);
	        if(!versionInComparator){

		        $.post('https://vrummapp.net/ws/v2/comparador/agregar',
		        	dataForCompare
		        ).then(function(data){

		            if(data.estado === 1){
		            	$('#successComparador').modal();

		            	addedInComparatorAutos.push(versionId);
		            	addedInComparatorAutos = JSON.stringify(addedInComparatorAutos);
		            	localStorage.setItem('addedInComAutosArr', addedInComparatorAutos);

		            	compareGroup.find('span.circle').removeClass('fa-plus-circle').addClass('fa-check-circle');
		            }
		        });
	        
	        }
	    }



		function displayBrandBar() {
			var versionsBrandImg = $('div.versionsBrandImg');
			var modelNameSpan = $('p.modelName');
			var modelPrcSpan = $('p.modelPrice');
			var versionNameP = $('p.versionName');

			var brandURL = version.pic_marca;
			var modelName = (localStorage.getItem('modelName') !== null) ? localStorage.getItem('modelName') : version.model_name;
			
			sessionStorage.setItem('currentBrandImg', version.pic_marca);
			localStorage.setItem('modelName', version.model_name);

			var modelPrice = '',
			versionName = '';

			if(!versionChange){
				
				modelPrice = version.starting_price;
				versionName = version.name;

				isInGarage(version);
				isInComparator(version);

			}else{

				modelPrice = selectedVersion.starting_price;
				versionName = selectedVersion.name;

				isInGarage(selectedVersion);
				isInComparator(selectedVersion);

			}

			
			versionsBrandImg.css({
				'background-image': `url(${brandURL})`
			});

			modelNameSpan.text(modelName);
			modelPrcSpan.text(modelPrice);
			versionNameP.text(versionName);

		}

		function isInGarage(vers){

			//console.log('specific-version', vers, localStorage.getItem('addedAutosArr'));

			if(localStorage.getItem('addedAutosArr') !== null && localStorage.getItem('addedAutosArr') !== undefined){

				var autosAlreadyAdded = JSON.parse(localStorage.getItem('addedAutosArr'));
				var lastAutoStoredIdx = autosAlreadyAdded.length - 1;
				var currAutoId = parseInt(vers.id);

				if(typeof vers.esta_garage === 'string'){
					isGrgTrue();
				}else if(autosAlreadyAdded.length > 0){

						$.each(autosAlreadyAdded, function(indx, item){
							var idStored = parseInt(item);

							if(currAutoId === idStored){
								isGrgTrue();
							}

							if(indx === lastAutoStoredIdx && currAutoId !== idStored && !versionInGarage){
								isGarageImg.attr('src', '../img/ic_AddGarage@2x.png');
								(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? (versionInGarage = false, addToGrgMsg.text('Agregar a Mi Garage'), addGarageBtn.removeClass('defaultPointer')) : (versionInGarage = true, addGrgList.addClass('hiddenItm'));	
							}

						});

				}else{
					isGarageImg.attr('src', '../img/ic_AddGarage@2x.png');
					(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? (versionInGarage = false, addToGrgMsg.text('Agregar a Mi Garage'), addGarageBtn.removeClass('defaultPointer')) : (versionInGarage = true, addGrgList.addClass('hiddenItm'));
				}


			}else if(typeof vers.esta_garage === 'string'){
			
				isGrgTrue();
			
			}else{

				isGarageImg.attr('src', '../img/ic_AddGarage@2x.png');
				(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? (versionInGarage = false, addToGrgMsg.text('Agregar a Mi Garage'), addGarageBtn.removeClass('defaultPointer')) : (versionInGarage = true, addGrgList.addClass('hiddenItm'));
				//console.log( 'versionInGarage', versionInGarage);
			}
		}

		function isInComparator(vers){
			
			//con(vers);
			if(localStorage.getItem('addedInComAutosArr') !== null && localStorage.getItem('addedInComAutosArr') !== undefined){
				//console.log(localStorage.getItem('addedInComAutosArr'));

				var autosAlreadyCompared = JSON.parse(localStorage.getItem('addedInComAutosArr'));
				var lastAutoInCmpIdx = autosAlreadyCompared.length - 1;
				var currAutoId = parseInt(vers.id);

				if(vers.esta_comparador !== null && vers.esta_comparador !== 'false'){
					isCmpTrue();
				}else if(autosAlreadyCompared.length > 0){

					var equalId = $.grep(autosAlreadyCompared, function(item, idx){
						var idStored = parseInt(item);
						return idStored === currAutoId;
					});

					//con(equalId);

					if(equalId.length > 0 && currAutoId === parseInt(equalId[0])){
						isCmpTrue();
					}else{
						compareGroup.find('span.circle').addClass('fa-plus-circle').removeClass('fa-check-circle');
						versionInComparator = false; 
						addToCmpMsg.text('Agregar al Comparador');
						compareGroup.removeClass('defaultPointer');
					}

				}


			}else if(vers.esta_comparador !== null && vers.esta_comparador !== 'false'){
			
				isCmpTrue();
			
			}
		}

		function isGrgTrue() {
			versionInGarage = true;
			isGarageImg.attr('src', '../img/ic_OKGarage@2x.png');
			addGrgList.addClass('hiddenItm')
			addGarageBtn.addClass('defaultPointer');
			addToGrgMsg.text('Agregado al Garage');
		}

		function isCmpTrue() {
			versionInComparator = true;
        	compareGroup.find('span.circle').removeClass('fa-plus-circle').addClass('fa-check-circle');
			compareGroup.addClass('defaultPointer');
			addToCmpMsg.text('Agregado al Comparador');

		}

		function sizeCarousel() {
			
			var widthImg = theCarousel.width();

			var height = widthImg * 0.6309;

			theCarousel.height(height);
		}


	}

});