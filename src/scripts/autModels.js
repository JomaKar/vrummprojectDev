$(function(){
	var place = window.location.pathname;

	if(place === "/pages/brand-modelo.html"){
		var models = [];

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
			$('div.hi').css({width: '100vw', background: 'green'}).html(brandsArr);

			models = JSON.parse(brandsArr);
			con(models);

		}


	}
});

function con(argument) {
	console.log(argument);
}