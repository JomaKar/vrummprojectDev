$(function(){
var profileImg = $('div.p-profilePhoto');
var profileInfoCont = $('div.p-profileInfoCont'),
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

		upDown975();

	});

	$(window).resize(function(){
		elementsPositioning(profileImg.width());
		imageResize();

		var theWidth = $(window).width();

		console.log(theWidth);

		upDown975();

	});

	function imageResize(){
		var profImgSz = profileImg.css('width');
		
		profileImg.css({
			height: profImgSz
		});

		elementsPositioning(profImgSz);
	}

	function elementsPositioning(posVal){
		var docWidth = $(window).width();

		profileInfoCont.css({
			top: -(posVal/2) + 'px'
		});

		if(docWidth > 420 && docWidth < 767.5){
			profileImg.removeClass('col-xs-4').addClass('col-xs-3')
		}else if(docWidth < 420){
			profileImg.removeClass('col-xs-3').addClass('col-xs-4')
		}
	}

	function con(argument) {
		console.log(argument);
	}

	function upDown975() {
	
		var wWidth = $(window).width();
		con(wWidth);

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