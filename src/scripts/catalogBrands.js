import {navigating, myLocation} from './commonFunc/locating.js';
import {con} from './commonFunc/consoling.js';
import {sendPostToGo, sendPostToGet} from './commonFunc/httpProcesor.js';

$(function(){

	var brands = [],
	rowsCont = $('div.brandsSpace'),
	linkRegCat = $('button#goToReg-Cat'),
	initialRow = $('div.firstRow');

	linkRegCat.click(function(){
		navigating('registro');
	})


	if(myLocation === "/web/catalogo/index.html" || myLocation === "/web/catalogo/index" || myLocation === "/web/catalogo/"){

		var askInterval = setInterval(function(){
		
			var brandsStored = sessionStorage.getItem('catalogBrands');
			checkBrands(brandsStored);

		}, 5);


		function checkBrands(argument) {
			if(argument !== null && argument !== undefined && argument !== 'nothing stored'){
				clearInterval(askInterval);
				brands = argument;
				displayBrands(brands);
		    }	
		}


		function displayBrands(brandsArr){

			$('p.startingText').remove();

			brands = JSON.parse(brandsArr);
			
			var num = brands.length;
			var fullRowsNumber = 0;
			var itmsLastRow = 0;
			var brandItmCounter = 0;
			
			if(num > 5){
				fullRowsNumber = Math.floor(num/5);
				itmsLastRow = num%5;
			}

			//dividing on rows
			for(var x = 0; x < fullRowsNumber; x++){

				//dividing on items initial row
				if(x === 0){
					
					for(var i = 0; i < 5; i++){
										
						var newBrand = `<div class="noPadding noMargin brandItem dynamicItem${i}">
											<span class="brandName">${brands[i].name}</span>
											<span class="brandId">${brands[i].id}</span>
											<div class="backImg centerBackImg brandItmImg" style="background-image: url('${brands[i].pic_url}');"></div>
										</div>`;

						initialRow.append(newBrand);
						brandItmCounter++;
					}
				}

				

				if(x > 0){
									 
					var newBrandRow = `<div class="row-fluid noPadding noMargin brandCatRow dynamicRow${x}"></div>`;
					rowsCont.append(newBrandRow);

					var actualRow = $('div.dynamicRow' + x);
					
					for(var i = 0; i < 5; i++){
										
						var newBrand = `<div class="noPadding noMargin brandItem dynamicItem${brandItmCounter}">
											<span class="brandName">${brands[brandItmCounter].name}</span>
											<span class="brandId">${brands[brandItmCounter].id}</span>
											<div class="backImg centerBackImg brandItmImg" style="background-image: url('${brands[brandItmCounter].pic_url}');"></div>
										</div>`;

						actualRow.append(newBrand);
						brandItmCounter++;
					}


				}
			
			}

			if(itmsLastRow > 0){
				var lastRow = fullRowsNumber + 1;

				var newBrandRow = `<div class="row-fluid noPadding noMargin brandCatRow dynamicRow${lastRow}"></div>`;
				rowsCont.append(newBrandRow);

				var actualRow = $('div.dynamicRow' + lastRow);
				
				for(var xx = 0; xx < itmsLastRow; xx++){
					var newBrand =  `<div class="noPadding noMargin brandItem dynamicItem${brandItmCounter}">
										<span class="brandName">${brands[brandItmCounter].name}</span>
										<span class="brandId">${brands[brandItmCounter].id}</span>
										<div class="backImg centerBackImg brandItmImg" style="background-image: url('${brands[brandItmCounter].pic_url}');"></div>
									</div>`;
									
					actualRow.append(newBrand);
					brandItmCounter++;
				}
			}

		}

		$(document).on('click', 'div.brandItem', function(){
			var id = $(this).find('span.brandId').html();
			var name = $(this).find('span.brandName').html();
			var brandUrl = $(this).find('div.brandItmImg').css('background-image');

			var idxFQuote = brandUrl.indexOf('"') + 1;
			var idxLQuote = brandUrl.lastIndexOf('"');

			//defining the actual image visible in carousel

			brandUrl = brandUrl.substring(idxFQuote, idxLQuote);

			if(id !== undefined && id !== null){
				sessionStorage.setItem('currentBrandAutos', id.toString());
				if(brandUrl !== undefined && brandUrl !== null){
					sessionStorage.setItem('currentBrandImg', brandUrl);
				}
				if(name !== undefined && name !== null){
					sessionStorage.setItem('currentBrandName', name);
				}
				
				askForModels(id);
				
			}else{
				sessionStorage.setItem('currentBrandAutos', 'nothing stored');
			}

		});

		function askForModels(id) {
			var theid = parseInt(id),
			modelsArr = [];
			var device = sessionStorage.getItem('deviceId');

			if(device !== undefined && device !== null && theid){
				var data = {'device': device, brandId: theid};
				data = JSON.stringify(data);

			}

			sendPostToGo('catalogo/getmodelos', data, 'mdls');
		}


	}

});