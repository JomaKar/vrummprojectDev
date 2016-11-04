$(function(){

	var place = window.location.pathname,
	brands = [],
	rowsCont = $('div.brandsSpace'),
	initialRow = $('div.firstRow');



	if(place === "/pages/catalogo-marcas.html"){

		var askInterval = setInterval(function(){
		
			var brandsStored = sessionStorage.getItem('catalogBrands');
			checkBrands(brandsStored);

		}, 20);


		function checkBrands(argument) {
			if(argument !== null && argument !== undefined && argument !== 'nothing stored'){
				clearInterval(askInterval);
				brands = argument;
				displayBrands(brands);
		    }	
		}
		
		console.log('you are in catalogue', Date.now())


		function displayBrands(brandsArr){
			$('p.startingText').remove();

			brands = JSON.parse(brandsArr);
			
			var num = brands.length;
			var fullRowsNumber = 0;
			var itmsLastRow = 0;
			
			if(num > 5){
				fullRowsNumber = num/5;
				itmsLastRow = num%5;
			}
			
			//dividing on rows
			for(var x = 0; x <= fullRowsNumber; x++){

				//dividing on items initial row
				if(x == 0){
					for(var i = 0; i <= 5; i++){
						var newBrand = '<div class="col-xs-2 noPadding noMargin backImg brandItem centerBackImg dynamicItem'+ i +'" style="background-image: url('+ brands[i].pic_url +');"></div>';
						initialRow.append(newBrand);
					}
				}

				if(x > 0){
					var newBrandRow = '<div class="row-fluid noPadding noMargin brandCatRow dynamicRow'+ x +'"></div>';
					rowsCont.append(newBrand);


				}
			
			}

		}

	}

});

function con(argument) {
	console.log(argument);
}