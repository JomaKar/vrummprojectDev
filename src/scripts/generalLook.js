$(function(){
	//profile elements
	var header = $('header.p-header');
	var profileImg = $('div.p-profilePhoto'),
	profileInfo = $('div.p-profileInfo');
	var profileInfoCont = $('div.p-profileInfoCont'),
	infoDetailsCont = $('div.p-profActDetCont'),
	garagaInfoDetails = $('div.garagaInfoDetails'),
	carsCounter = $('div.garageCarsCounter'),
	shareCounter = $('div.garageShareCounter'),
	membershipDateCounter = $('div.membershipDateCounter'),
	garageImgCont = $('div.garageImgCont'),

	//registration elements
	passCont = $('#inputPassword').closest('div.col-md-6'),
	passConfCont = $('#inputPassword2').closest('div.col-md-6'),
	inputAPtn = $('#inputPaterno').closest('div.col-md-6'),
	inputMat = $('#inputMaterno').closest('div.col-md-6'),


	sideImg = $('img.sideImage'),
	sideImageCont = $('div.sideImageCont'),
	classPos975 = ['NorightP', 'NoleftP'],
	fileInputGrp = $('#r-fileInputGrp'),
	txtACont = $('#r-textACont'),
	regTitleCont = $('#registrationTitle'),
	errMsg = $('div.errorLogin'),
	loginPassInput = $('input#l-pass'),
	loginMailInput = $('input#l-email'),
	simInputsCont = $('#simInputsCont');

	loginMailInput.focus(function(){
		if(errMsg.css('display') === 'block'){
			errMsg.css({display: 'none'});
		}
	});

	loginPassInput.focus(function(){
		if(errMsg.css('display') === 'block'){
			errMsg.css({display: 'none'});
		}
	});


	var inputsNoPad = [passCont, inputAPtn, passConfCont, inputMat];


		$(document).ready(function(){
			elementsPositioning(profileImg.width());
			imageResize();
			hideBef400()

			upDown975();

		});

		$(window).resize(function(){
			elementsPositioning(profileImg.width());
			imageResize();
			hideBef400()

			var theWidth = $(window).width();

			console.log(theWidth);

			upDown975();

		});

		function hideBef400() {
			var docWidth = $(window).width();

			if(docWidth < 420){
				membershipDateCounter.hide();
				carsCounter.removeClass('col-xs-2').addClass('col-xs-3');
				shareCounter.removeClass('col-xs-2').addClass('col-xs-3');
			}else{
				carsCounter.addClass('col-xs-2').removeClass('col-xs-3');
				membershipDateCounter.show();
				shareCounter.addClass('col-xs-2').removeClass('col-xs-3');
			}
		}

		function imageResize(){
			var profImgSz = profileImg.width();
			var garageInfoH = (profImgSz/2) + 20;
			
			profileImg.css({
				height: profImgSz
			});

			garagaInfoDetails.height(garageInfoH);
			elementsPositioning(profImgSz);
		}

		function elementsPositioning(posVal){

			var elems = header.children();
			var elemsHeight = 0;

			elems.each(function(idx, elem){
				if(idx !== 1){
					elemsHeight += $(elem).height();
				}				
			});

			header.height(elemsHeight - 6);

			var docWidth = $(window).width();

			profileInfoCont.css({
				top: -(posVal/2) + 'px'
			});

			infoDetailsCont.css({
				top: -(posVal + 6) + 'px'
			});

			if(docWidth > 420 && docWidth < 767.5){
				profileImg.removeClass('col-xs-4').addClass('col-xs-3');
				profileInfo.removeClass('col-xs-7').addClass('col-xs-8');
				carsCounter.removeClass('col-xs-offset-5').addClass('col-xs-offset-4');
				membershipDateCounter.removeClass('col-xs-offset-1').addClass('col-xs-offset-2');
			}else if(docWidth < 420){
				profileImg.removeClass('col-xs-3').addClass('col-xs-4');
				profileInfo.addClass('col-xs-7').removeClass('col-xs-8');
				carsCounter.addClass('col-xs-offset-5').removeClass('col-xs-offset-4');
				membershipDateCounter.addClass('col-xs-offset-1').removeClass('col-xs-offset-2');
			}
		}

		function con(argument) {
			console.log(argument);
		}

		function upDown975() {
		
			var wWidth = $(window).width();
			con(wWidth);

			if(wWidth < 481){
				garageImgCont.addClass('col-xs-12').removeClass('col-xs-6');
			}else{
				garageImgCont.removeClass('col-xs-12').addClass('col-xs-6');
			}

			if(wWidth < 975){

				inputsNoPad.forEach(function(itm, indx){
					$.map(classPos975, function(item, idx){
						(indx <= 1) ? itm.removeClass(item).css({'padding': '0 0 6.5px 0'}) : itm.removeClass(item).css({'padding': '6.5px 0 0 0'});
					});
				});

				fileInputGrp.addClass('NoleftP halfR').removeClass('NorightP');

				txtACont.css({
					height: '100%'
				}).addClass('NorightP halfL');

				if(wWidth < 880){

					sideImg.css({
						width: '387',
						left: '-6%'
					});

				}else{
					sideImg.css({
						width: '459',
						left: '0'
					});
				}
				

			}else if(wWidth >= 975){
				
				inputsNoPad.forEach(function(itm, idx){
					$.map(classPos975, function(item, idx){
						itm.addClass(item).css({'padding-top': 0, 'padding-bottom': 0});
					});
				});
				fileInputGrp.removeClass('NoleftP halfR butVertHalf').css({
					'padding-top': '7.5px',
					'padding-bottom': '7.5px'
				}).addClass('NorightP halfL');

				txtACont.css({
					height: 'auto'
				}).removeClass('NorightP halfL');

				sideImg.closest('div').css({
					'text-align': 'center'
				})

				sideImg.css({
						width: '459',
						left: '0'
					});


				if(wWidth > 1070 && wWidth < 1278){

					sideImg.css({
						width: '535',
					});

					sideImageCont.removeClass('col-lg-5 col-lg-offset-1');

				}else if(wWidth > 1278){

					sideImageCont.addClass('col-lg-5 col-lg-offset-1')
								 .removeClass('col-lg-offset-2 col-lg-4');



					if(wWidth < 1472){
						sideImageCont.removeClass('col-lg-offset-2 col-lg-4')
						.addClass('col-lg-offset-1 col-lg-5');
					}else if(wWidth > 1472){
						sideImageCont.removeClass('col-lg-offset-1 col-lg-5')
						.addClass('col-lg-offset-2 col-lg-4')
					}


				}

			}
		}

});