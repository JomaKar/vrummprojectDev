import {con} from './commonFunc/consoling.js';
import {navigating, myLocation} from './commonFunc/locating.js';


$(function(){



	if(myLocation == '/web/catalogo/specific-version.html' || myLocation == '/web/catalogo/specific-version'){
		
		//version info variables
		var version = sessionStorage.getItem('versionStored');
		var versions = sessionStorage.getItem('versionsArr');
		versions = JSON.parse(versions);
		version = JSON.parse(version);

		//DOM variables
		var theCarousel = $('div.versionsCarousel');
		var versionDetailCont = $('div.versionDetailCont');
		var versionsArrows = $('span.versionArrow');

		//change variables
		var versionChange = false;
		var selectedVersion = {};



		$(document).ready(function(){
			displayBrand();
			sizeCarousel();
			displayCarousel();
			selectVersion(null);

		});

		$(window).resize(function(){
			sizeCarousel();
		});

		var imgs = [];
		var currentVersionMainImg = '';

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

		//DOM variables

		var spanNum = $('span.versionNum');
		var spanTotal = $('span.versionTotal');

		spanNum.text('1');

		spanTotal.text(versions.length);

		function selectVersion(dir){
			var info = [];
			var objIdx = -1;

			if(!versionChange){

				info =  version.ficha_tecnica;
				throwInfo(info);

			}else if(dir.length > 0 && versionChange){



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

				throwInfo(info);
				displayBrand();
				displayCarousel();

			}
			
		}


		function throwInfo(info) {
			$('div.fichaTecnicaDetail').empty();
			$('div.fichaCat').empty();

			var actualCat = info[0].ficha_tecnica;

			
			info.forEach(function(itm, idx){

				if(idx === 0){
					var cat = `<div class="${itm.ficha_tecnica} fichaCat">
									<h2>${itm.ficha_tecnica}</h2>
								</div>`;
					versionDetailCont.append(cat);
					//console.log(actualCat, itm.ficha_tecnica);

				}else if(itm.ficha_tecnica !== actualCat && !versionDetailCont.find(`div.${itm.ficha_tecnica}`).length){
					actualCat = itm.ficha_tecnica;
					var cat = `<div class="${itm.ficha_tecnica} fichaCat">
									<h2>${itm.ficha_tecnica}</h2>
								</div>`;
					versionDetailCont.append(cat);
				}

				if(itm.dato !== null && itm.dato !== undefined){
					var plainText = `<p class="${itm.ficha_tecnica}">${itm.valor} : ${itm.dato}</p>`
					versionDetailCont.find(`div.${itm.ficha_tecnica}`).append(plainText);
				}
			});
		}

		//startAlberto

		function addToGarage(type) {

			var userId = sessionStorage.getItem('currentUserId');
	        var deviceId = sessionStorage.getItem('deviceId');
	        var versionId = ( versionChange )? selectedVersion.id : version.id;

	        var dataForGarage = { 'device': deviceId, 'user': userId, 'version': versionId, 'tipo': type };

	        dataForGarage = JSON.stringify(dataForGarage);

	        $.post('https://vrummapp.net/ws/v2/garage/agregar',
	        	dataForGarage
	        ).then(function(data){

	            if(data.estado === 1){
	            	$('#success-modal').modal()
	            	$('#btnAddToGarage img').attr('src', '../img/ic_OKGarage@2x.png');
	            }
	        });
	           
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

			var brandURL = sessionStorage.getItem('currentBrandImg');
			var modelName = localStorage.getItem('modelName');
			
			var modelPrice = '',
			versionName = '';

			if(!versionChange){
				
				modelPrice = version.starting_price;
				versionName = version.name;

			}else{

				modelPrice = selectedVersion.starting_price;
				versionName = selectedVersion.name;

			}

			
			versionsBrandImg.css({
				'background-image': brandURL
			});

			modelNameSpan.text(modelName);
			modelPrcSpan.text(modelPrice);
			versionNameP.text(versionName);

		}

		function sizeCarousel() {
			
			var widthImg = theCarousel.width();

			var height = widthImg * 0.6309;

			theCarousel.height(height);
		}


	}

});