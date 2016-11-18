$(function(){
	var place = window.location.pathname;
	var versions = [];
	var currentVersion = {};
	var currentVersionImgs = [];
	var currentVersionMainImg = '';
	var versionsArr = [];
	var theCarousel = $('div.versionsCarousel');
	var infoContainer = $('div.versionDetailCont');

	var lastSlash = place.lastIndexOf('/');

	place = place.slice(lastSlash);

	if(place === "/modelo-versiones.html"){

		var brandName = sessionStorage.getItem('currentBrandName');

		$(document).ready(function(){
			displayBrand();
			startCarousel();
		});

		var askInterval = setInterval(function(){
		
			var versionsStored = sessionStorage.getItem('versionsArr');
			checkVersions(versionsStored);

		}, 5);


		function checkVersions(argument) {
			if(argument !== null && argument !== undefined && argument !== 'nothing stored'){
				clearInterval(askInterval);
				versions = argument;
				manageVersions(versions);
		    }	
		}


		function manageVersions(argument) {
			versionsArr = JSON.parse(argument);

			currentVersion = versionsArr[0];

			displayCarousel();
			displayVersionsInfo();
						
		}

		var imgs = [];
		function displayCarousel() {
			var imgsCont = $('div.thumbImgsCont');
			
			var arrowsCont = $('div.arrowsCont');

			$.map(versionsArr, function(objItem, idx){

				($.type(objItem.pic_url) === 'array') ? imgs.concat(objItem.pic_url) : imgs.push(objItem.pic_url);

			});

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

			if(imgs.length <= 1){
				arrowsCont.hide();
			}

		}

		function displayVersionsInfo() {
			var img = '';
			var versionRow = '';
			var versionRowLine = '';
			$.each(versionsArr, function(idx, objItm){

				var versName = objItm.name;
				var verPrice = objItm.starting_price;
				($.type(objItm.pic_url) === 'array') ? img = objItm.pic_url[0] : img = objItm.pic_url;

				(img === currentVersionMainImg) ? versionRowLine = `<div class="row-fluid childHeight versionDetailRow active">` : versionRowLine = `<div class="row-fluid childHeight versionDetailRow">`;
			
				versionRow = `${versionRowLine}
	                                <div class="versionImg col-xs-3 col-sm-2">
	                                    <img src="${img}" class="img-responsive">
	                                </div>
	                                <div class="col-xs-8 col-sm-9 versionDetail">
	                                    <span class="versionName">${versName}</span>
	                                    <span class="versionPrice">$ ${verPrice}</span>
	                                </div>
	                                <div class="col-xs-1 noPadding goToDetailArrow">
	                                    <span class="glyphicon glyphicon-menu-right"></span>
	                                </div>
	                            </div>`;

				infoContainer.append(versionRow);

			});
		}


		$(document).on('click', 'div.versionDetailRow', function(){
			var el = $(this);
			var selVerName = $(this).find('span.versionName').text();
			var elements = $('div.versionDetailRow');

			sessionStorage.removeItem('versionStored');

			elements.removeClass('active');

			el.addClass('active');

			var selectedVersObj = $.grep(versionsArr, function (itm, idx) {

				var currObjName = itm.name.replace(/"/g, '');

				return currObjName === selVerName;
			});

			currentVersion = selectedVersObj[0];

			var versionStored = JSON.stringify(currentVersion);

			sessionStorage.setItem('versionStored', versionStored);

		});

		$(document).on('click', 'div.goToDetailArrow', function(){
			window.location = 'specific-version.html';
		});

		//start carousel mechanich

		var carouselDirection = '';
		var nextCarouselImg = '';
		var currentCarouselImg = '';


		$(document).on('click', 'div.arrowsCont span', function(){
			var el = $(this);

			(el.hasClass('leftArr')) ? carouselDirection = 'left' : carouselDirection = 'right';

			currentCarouselImg = theCarousel.css('background-image');
			var idxFQuote = currentCarouselImg.indexOf('"') + 1;
			var idxLQuote = currentCarouselImg.lastIndexOf('"');

			currentCarouselImg = currentCarouselImg.substring(idxFQuote, idxLQuote);

			carouselMechanich(null);

		});

		$(document).on('click', 'div.carThumbImgUnit', function(){

			var imgSelectedUrl = $(this).find('img').attr('src');
			var imgSelected = $(this).find('img');
			carouselMechanich(imgSelectedUrl);

			activateThumbnails(imgSelected);

		});

		function activateThumbnails(imgSel) {
			var imgsCollection = $('div.carThumbImgUnit').find('img.carThumb');
			imgsCollection.removeClass('active');
			imgSel.addClass('active');
		}


		function carouselMechanich(img) {

			if(img === null){
				var indexOfCurrImg = imgs.indexOf(currentCarouselImg);

				if(carouselDirection === 'left'){
					(indexOfCurrImg === 0) ? nextCarouselImg = imgs[imgs.length - 1] : nextCarouselImg = imgs[indexOfCurrImg - 1];
				}else if(carouselDirection === 'right'){
					(indexOfCurrImg === (imgs.length - 1)) ? nextCarouselImg = imgs[0] : nextCarouselImg = imgs[indexOfCurrImg + 1]
				}

				theCarousel.css({'background-image': `url(${nextCarouselImg})`});

				var thumbs = $('div.carThumbImgUnit').find('img.carThumb');

				var activeImage = thumbs.filter(function(idx, el){
					return $(el).attr('src') === nextCarouselImg;
				});

				activeImage = activeImage.filter(function(idx, el){
					return !$(el).hasClass('active');
				})

				activateThumbnails(activeImage);

			}else{
				theCarousel.css({'background-image': `url(${img})`});

			}

		}

		//end carousel mechanich

		var existCarousel = false;

		$(window).resize(function(){
			(existCarousel) ? sizeCarousel() : startCarousel();
		});


		function startCarousel() {
			
			if(!existCarousel){
				
				var carInter = setInterval(function(){

					if(!$.isEmptyObject(currentVersion)){

						carouselExist();
					}
				}, 10);

				function carouselExist() {
					existCarousel = true;
					if(existCarousel){
						clearInterval(carInter);
						sizeCarousel();
					}
				}
			}else{
				return true;
			}

		}


		function sizeCarousel() {
			
			var widthImg = theCarousel.width();

			var height = widthImg * 0.6309;

			theCarousel.height(height);
		}

     

		function displayBrand() {
			var versionsBrandImg = $('div.versionsBrandImg');
			var modelNameSpan = $('p.modelName');
			var modelPrcSpan = $('p.modelPrice');

			var brandURL = sessionStorage.getItem('currentBrandImg');
			var modelName = localStorage.getItem('modelName');
			var modelPrice = localStorage.getItem('modelPrice');
			
			versionsBrandImg.css({
				'background-image': brandURL
			});

			modelNameSpan.text(modelName);
			modelPrcSpan.text(modelPrice);

		}

	}	


});

function con(argument) {
	console.log(argument);
}