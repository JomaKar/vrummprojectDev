import {con} from './consoling.js';

$(function(){

	var place = window.location.pathname;

	var lastSlash = place.lastIndexOf('/');

	place = place.slice(lastSlash);


	if(place == '/specific-version.html'){
		
		var version = sessionStorage.getItem('versionStored');
		var theCarousel = $('div.versionsCarousel');
		var versionDetailCont = $('div.versionDetailCont');
		version = JSON.parse(version);



		$(document).ready(function(){
			displayBrand();
			sizeCarousel();
			displayCarousel();
			throwInfo();

		});


		var imgs = [];
		var currentVersionMainImg = '';
		function displayCarousel() {
			var imgsCont = $('div.thumbImgsCont');
			
			var arrowsCont = $('div.arrowsCont');



			($.type(version.pic_url) === 'array') ? imgs.concat(version.pic_url) : imgs.push(version.pic_url);

			$(theCarousel).css({
				'background-image': `url(${imgs[0]})`
			});

			currentVersionMainImg = imgs[0];

			var classes = '';

			imgs.forEach(function(item, idx){
				(idx === 0) ? classes = 'carThumb active' : classes = 'carThumb';

				var imgPrototype = `<div class="carThumbImgUnit"><img src="${item}" class="${classes} img${idx} img-responsive"></div>`;

				imgsCont.append(imgPrototype);
			});

			con(imgs.length);

			if(imgs.length <= 1){
				con('why')

				arrowsCont.hide();
			}

		}

		var ficha = '';

		function throwInfo() {

			var info = version.ficha_tecnica;

			con(info);
			var actualCat = info[0].ficha_tecnica;

			
			info.forEach(function(itm, idx){

				if(idx === 0){
					var cat = `<div class="${itm.ficha_tecnica} fichaCat">
									<h2>${itm.ficha_tecnica}</h2>
								</div>`;
					versionDetailCont.append(cat);
					//console.log(actualCat, itm.ficha_tecnica);

				}else if(itm.ficha_tecnica !== actualCat && !$.is(`div.${itm.ficha_tecnica}`)){
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


		function displayBrand() {
			var versionsBrandImg = $('div.versionsBrandImg');
			var modelNameSpan = $('p.modelName');
			var modelPrcSpan = $('p.modelPrice');
			var versionNameP = $('p.versionName');

			var brandURL = sessionStorage.getItem('currentBrandImg');
			var modelName = localStorage.getItem('modelName');
			var modelPrice = version.starting_price;
			var versionName = version.name;
			
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