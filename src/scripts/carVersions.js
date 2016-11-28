$(function(){
	var place = window.location.pathname;
	var versions = [];
	var currentVersion = {};
	var currentVersionImgs = [];
	var currentVersionMainImg = '';
	var versionsArr = [];
	var theCarousel = $('div.versionsCarousel');
	var infoContainer = $('div.versionDetailCont');
	var idSpan = $('span.currentVersionId');

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
		var currentVersionId;
		function displayCarousel() {
			var imgsCont = $('div.thumbImgsCont');
			
			var arrowsCont = $('div.arrowsCont');

			$.map(versionsArr, function(objItem, idx){

				($.isArray(objItem.pic_web)) ? imgs.concat({pict: objItem.pic_web, id: objItem.id}) : imgs.push({pict: objItem.pic_web, id: objItem.id});

			});

			$(theCarousel).css({
				'background-image': `url(${imgs[0].pict})`
			});

			currentVersionId = imgs[0].id;
			idSpan.text(currentVersionId);

			currentVersionMainImg = imgs[0].pict;

			var classes = '';
			imgs.forEach(function(item, idx){
				(idx === 0) ? classes = 'carThumb active' : classes = 'carThumb';

				var imgPrototype = `<div class="carThumbImgUnit"><span class="thumbIdSpan hiddenItm">${item.id}</span><img src="${item.pict}" class="${classes} img${idx} thumbImg img-responsive"></div>`;

				imgsCont.append(imgPrototype);
			});

			if(imgs.length <= 1){
				arrowsCont.hide();
			}

		}

		function displayVersionsInfo() {
			var img = {};
			var versionRow = '';
			var versionRowLine = '';
			con(versionsArr);
			$.each(versionsArr, function(idx, objItm){

				var versName = objItm.name;
				var verPrice = objItm.starting_price;
				var verId = objItm.id;
				($.isArray(objItm.pic_web)) ? img = {pict: objItm.pic_web[0], id: objItm.id} : img = {pict: objItm.pic_web, id: objItm.id};

				(img.id === currentVersionId) ? versionRowLine = `<div class="row-fluid childHeight versionDetailRow active">` : versionRowLine = `<div class="row-fluid childHeight versionDetailRow">`;
			
				versionRow = `${versionRowLine}
	                                <div class="versionImg col-xs-3 col-sm-2">
	                                    <img src="${img.pict}" class="img-responsive">
	                                </div>
	                                <div class="col-xs-8 col-sm-9 versionDetail">
	                                    <span class="versionName">${versName}</span>
	                                    <span class="versionPrice">$ ${verPrice}</span>
	                                    <span class="versionId hiddenItm">${verId}</span>
	                                </div>
	                                <div class="col-xs-1 noPadding goToDetailArrow">
	                                    <span class="glyphicon glyphicon-menu-right"></span>
	                                </div>
	                            </div>`;

				infoContainer.append(versionRow);

			});
		}

		//when clicking in version info tag under carousel

		$(document).on('click', 'div.versionDetailRow', function(){
			var el = $(this);
			
			activatingInfoTag(el);

		});

		function activatingInfoTag(el) {
			var elements = $('div.versionDetailRow');
			var selVerName = $(el).find('span.versionName').text();

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
		}

		$(document).on('click', 'div.goToDetailArrow', function(){
			window.location = 'specific-version.html';
		});

		//start carousel mechanich

		var carouselDirection = '';
		var nextCarouselImg = '',
		nextCarouselSpanId = '';
		var currentCarouselImg = '';
		var currentCarouselIdSpan = '';

		//when clicking on carousel's left-right arrows

		$(document).on('click', 'div.arrowsCont span', function(){
			var el = $(this);

			(el.hasClass('leftArr')) ? carouselDirection = 'left' : carouselDirection = 'right';

			currentCarouselImg = theCarousel.css('background-image');
			currentCarouselIdSpan = theCarousel.find('span.currentVersionId').text();
			var idxFQuote = currentCarouselImg.indexOf('"') + 1;
			var idxLQuote = currentCarouselImg.lastIndexOf('"');

			//defining the actual image visible in carousel

			currentCarouselImg = currentCarouselImg.substring(idxFQuote, idxLQuote);

			carouselMechanich(null, null);

		});

		//when clicking in the thumbnails under the carousel

		$(document).on('click', 'div.carThumbImgUnit', function(){

			var imgSelectedUrl = $(this).find('img').attr('src');
			var imgSelected = $(this).find('img');
			var spanThmbId = $(this).find('span.thumbIdSpan').text();

			carouselMechanich(imgSelectedUrl, spanThmbId);

			activateThumbnails(imgSelected);

		});

		function activateThumbnails(imgSel) {

			var imgsCollection = $('div.carThumbImgUnit').find('img.carThumb');
			imgsCollection.removeClass('active');
			imgSel.addClass('active');
		}

		var indexOfCurrImg = -1;

		function carouselMechanich(img, num) {

			if(img === null){

				$.each(imgs, function(idex, itm){
					if(itm.pict === currentCarouselImg){
						indexOfCurrImg = idex;
					}
				});

				if(carouselDirection === 'left'){
					//if is the first image in the array of images
					if(indexOfCurrImg === 0){
						//the next image is gonna be the last image in the array of images
						nextCarouselImg = imgs[imgs.length - 1].pict;
						//the id of the carousel is gonna be the last image's id in the array of images
						nextCarouselSpanId = imgs[imgs.length - 1].id;

					//if its not the first image
					}else{ 
						//the next image is gonna be the previous image in the array of images
						nextCarouselImg = imgs[indexOfCurrImg - 1].pict; 
						//the id of the carousel is gonna be the previous image's id in the array of images
						nextCarouselSpanId = imgs[indexOfCurrImg - 1].id;
					}

				}else if(carouselDirection === 'right'){
					//if is the last image in the array of images
					if(indexOfCurrImg === (imgs.length - 1)){
						//the next image is gonna be the first image in the array of images
						nextCarouselImg = imgs[0].pict;
						//the id of the carousel is gonna be the first image's id in the array of images
						nextCarouselSpanId = imgs[0].id;

					//if its not the last image	
					} else {
						//the next image is gonna be the next image in the array of images
						nextCarouselImg = imgs[indexOfCurrImg + 1].pict;
						//the id of the carousel is gonna be the next image's id in the array of images
						nextCarouselSpanId = imgs[indexOfCurrImg + 1].id;
					}
				}

				theCarousel.css({'background-image': `url(${nextCarouselImg})`});
				idSpan.text(nextCarouselSpanId);

				var el = $('div.versionDetailRow').filter(function(idx, itm){
					var spaId = $(this).find('span.versionId').text();
					if(spaId === nextCarouselSpanId) { return itm;}
				});


				//activatingInfoTag(el);

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
				idSpan.text(num);

				var el = $('div.versionDetailRow').filter(function(idx, itm){
					var spaId = $(itm).find('span.versionId').text();
					if(spaId === num) { return itm;}
				});


				//activatingInfoTag(el);
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

			var imgProportionalHeight = 0.6309;
			var exceededProportionalHeight = 0.1075502;

			var totalProportionalHeight = imgProportionalHeight + exceededProportionalHeight;

			var height = widthImg * totalProportionalHeight;


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