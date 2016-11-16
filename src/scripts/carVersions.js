$(function(){
	var place = window.location.pathname;
	var versions = [];

	var lastSlash = place.lastIndexOf('/');

	place = place.slice(lastSlash);

	if(place === "/modelo-versiones.html"){

		var brandName = sessionStorage.getItem('currentBrandName');

		$(document).ready(function(){
			startBrandInt()
		});

		var askInterval = setInterval(function(){
		
			var versionsStored = sessionStorage.getItem('versionsArr');
			checkVersions(versionsStored);

		}, 5);


		function checkVersions(argument) {
			if(argument !== null && argument !== undefined && argument !== 'nothing stored'){
				clearInterval(askInterval);
				versions = argument;
				displayVersions(versions);
		    }	
		}


		function displayVersions(argument) {
			var versionsArr = JSON.parse(argument);
			con(versionsArr);
		}


		function startBrandInt() {
			var existBrandImgCont = false;

			var elInter = setInterval(function(){

				if($('div.versionsBrandImg').length > 0){

					brandImgContExist();
				}
			}, 10);

			function brandImgContExist() {
				existBrandImgCont = true;
				if(existBrandImgCont){
					clearInterval(elInter);
					displayBrand();
				}
			}
		}	
     

		function displayBrand() {
			var versionsBrandImg = $('div.versionsBrandImg');
			var modelNameSpan = $('span.modelName');
			var modelPrcSpan = $('span.modelPrice');

			var brandURL = sessionStorage.getItem('currentBrandImg');
			var modelName = localStorage.getItem('modelName');
			var modelPrice = localStorage.getItem('modelPrice');
			
			versionsBrandImg.css({
				'background-image': brandURL
			});

			modelNameSpan.html(modelName);
			modelPrcSpan.html(modelPrice);

		}

	}	


});

function con(argument) {
	console.log(argument);
}