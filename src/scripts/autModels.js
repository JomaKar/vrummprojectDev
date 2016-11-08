$(function(){
	var place = window.location.pathname;

	if(place === "/pages/brand-modelo.html"){
		$(document).ready(function(){
			displayBrand();
		});

		var models = [],
		headerBrandImg = $('div.headerBrandImg'),
		brandName = sessionStorage.getItem('currentBrandName');

		var askInterval = setInterval(function(){
		
			var modelsStored = sessionStorage.getItem('modelsArr');
			checkBrands(modelsStored);

		}, 5);


		function checkBrands(argument) {
			if(argument !== null && argument !== undefined && argument !== 'nothing stored'){
				clearInterval(askInterval);
				brands = argument;
				displayModels(brands);
		    }	
		}


		function displayModels(brandsArr){

			models = JSON.parse(brandsArr);
			con(models);

		}


		function displayBrand() {
			var brandURL = sessionStorage.getItem('currentBrandImg');
			
			headerBrandImg.css({
				'background-image': brandURL
			});

		}


	}
});

function con(argument) {
	console.log(argument);
}