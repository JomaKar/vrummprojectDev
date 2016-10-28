$(function(){
var profileImg = $('div.p-profilePhoto');
var profileInfoCont = $('div.p-profileInfoCont'),
passCont = $('#inputPassword').closest('div.col-md-6'),
passConfCont = $('#inputPassword2').closest('div.col-md-6'),
inputAPtn = $('#inputPaterno').closest('div.col-md-6'),
inputMat = $('#inputMaterno').closest('div.col-md-6'),
sideImg = $('img.sideImage'),
classPos975 = ['NorightP', 'NoleftP'],
fileInputGrp = $('#r-fileInputGrp'),
txtACont = $('#r-textACont'),
regTitleCont = $('#registrationTitle');


var inputsNoPad = [passCont, inputAPtn, passConfCont, inputMat];


	$(document).ready(function(){
		elementsPositioning(profileImg.width());
		imageResize();

		upDown975();

	});

	$(window).resize(function(){
		elementsPositioning(profileImg.width());
		imageResize();


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

	function upDown975() {
	
		var wWidth = $(window).width();

		if(wWidth < 975){

			inputsNoPad.forEach(function(itm, indx){
				$.map(classPos975, function(item, idx){
					(indx <= 1) ? itm.removeClass(item).addClass('noPadding butVertHalf') : itm.removeClass(item).addClass('noPadding');
				});
			});

			fileInputGrp.addClass('NoleftP halfR').removeClass('NorightP');

			txtACont.css({
				height: '100%'
			}).addClass('NorightP halfL');

			sideImg.css({
				width: '108%',
				left: '-6%',
				top: '11%'
			});

		}else if(wWidth > 975){
			
			inputsNoPad.forEach(function(itm, idx){
				$.map(classPos975, function(item, idx){
					itm.removeClass('noPadding butVertHalf').addClass(item);
				});
			});

			fileInputGrp.removeClass('NoleftP halfR butVertHalf').css({
				'padding-top': '7.5px',
				'padding-bottom': '7.5px'
			}).addClass('NorightP');

			txtACont.css({
				height: 'auto'
			}).removeClass('NorightP halfL');

			sideImg.css({
				width: '98%',
				left: '0',
				top: '5%'
			});

		}
	}

});