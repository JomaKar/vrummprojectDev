$(function(){
	var place = window.location.pathname;
	var brands = [];

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
				extractModels(brands);
		    }	
		}


		function extractModels(brandsArr){
			models = JSON.parse(brandsArr);
			var availableYears = [],
			availableUses = [],
			availableTypes = [],
			diffUses = [], 
			tipo = [];

			//figuring out the different years available

			models.forEach(function(itm, idx){
				var inArray = $.inArray(itm.year, availableYears, 0);
				if(inArray === -1){
					availableYears.push(itm.year);				}
			});

			//asking which of the elements in the full array
			//match the available years and grouping them

			var itmsDependingOnYear = [];
			
			availableYears.forEach(function(yearName, idx){
				itmsDependingOnYear[idx] = [];

				itmsDependingOnYear[idx] = $.grep(models, function(el, idex){
					return (el.year === availableYears[idx] && el.uso);
				});

			});


			//figuring out the different uses available

			models.forEach(function(itm, idx){
				var inArr = $.inArray(itm.uso, availableUses, 0);
				if(inArr === -1){
					availableUses.push(itm.uso);
				}
			});

			models.forEach(function(itm, idx){
				var inArray = $.inArray(itm.tipo_catalogo, availableTypes, 0);
				if(inArray === -1){
					availableTypes.push(itm.tipo_catalogo);
				}
			});

			var itmsYearUse = [];

			itmsDependingOnYear.forEach(function(yearColl, indx){
				itmsYearUse[indx] = [];

				availableUses.forEach(function(useName, index){
					itmsYearUse[indx][index] = [];

					itmsYearUse[indx][index] = $.grep(yearColl, function(el, idx){
						return el.uso === availableUses[index];
					});
				});

			});
			
			// con(itmsYearUse);

			var itmsYearUseType = [];

			itmsYearUse.forEach(function(yearColl, indx){
				itmsYearUseType[indx] = [];

				yearColl.forEach(function(useColl, index){
					itmsYearUseType[indx][index] = [];

					availableTypes.forEach(function(typeName, ind){
						itmsYearUseType[indx][index][ind] = [];

						itmsYearUseType[indx][index][ind] = $.grep(useColl, function(el, idx){
							return el.tipo_catalogo === availableTypes[ind];
						});
					});

				});

			});

			itmsYearUseType.forEach(function(yearColl, indx){

				yearColl.forEach(function(useColl, index){

					itmsYearUseType[indx][index] = $.grep(useColl, function(arr, idx){
							return arr.length > 0;
						});
				});

			});
			con(itmsYearUse);
			con(itmsYearUseType);
			displayModels(itmsDependingOnYear, itmsYearUse, itmsYearUseType);

		}

		var yearCollCounter = 0;
		var modelsSpace = $('div.modelsSpace');
		var initialTxt = $('p.modelsStartTxt');
		var iterateInYears = true;
		var iterateInUse = true;
		var iterateInTypes = true;

		function displayModels(collYear, collYearUse, collYearUseType) {
			initialTxt.remove();

			collYearUse.forEach(function(yearColl, ind){
				yearColl.forEach(function(useColl, indx){
					var year = useColl[0].year;
					var use = useColl[0].uso;

					var yearUseFilter = `<div class="galleryHead col-xs-12 noPadding noMargin yearFilter${year + use}">
											<span class="modelUse">${use}</span>
											<span class="modelY">${year}</span>
										</div>`;

					modelsSpace.append(yearUseFilter);					

				});
			});

			collYearUseType.forEach(function(yearColl, ind){
				yearColl.forEach(function(useColl, indx){

					useColl.forEach(function(typeColl, index){
						var year = typeColl[0].year;
						var use =  typeColl[0].uso;
						var yearUse = year + use;
						var currentYearUseFilter = $('div.yearFilter' + yearUse);
						var type = typeColl[0].tipo_catalogo;
						type = type.replace(/ /g, '');
						
						var yearUseType = yearUse + type;


						var typeFilter = `<div class="galleryNeck col-xs-12 noPadding noMargin typeFilter${year + use + type}">
						                    <span class="gallNeckCarSp"></span>
						                    <span class="gallNeckCarTxt">${type}</span>
						                </div>
						                <div class="col-xs-12 noPadding noMargin">
						                    <div class="row-fluid noPadding noMargin childHeight modelBox${year + use + type}">
						                        
						                    </div>
						                </div>`;

						currentYearUseFilter.after(typeFilter);
						
						typeColl.forEach(function(typeItem, indexx){
							var currentBox = $('div.modelBox' + yearUseType);

							var model = `<div class="col-xs-12 col-sm-4 noPadding noMargin backImg centerBackImg modelItem" style="background-image:url('${typeItem.pic_url}')">
				                            <div class="hoverInfo">
				                                <ul class="mDetails noPadding">
				                                  <li class="mName">${typeItem.name}</li>
				                                  <li class="vName">${typeItem.desde} - ${typeItem.hasta}</li>
				                                  <li class="yModel">${typeItem.year}</li>
				                                </ul>
				                            </div>
				                        </div>`;

				            currentBox.append(model);            
						});


					});
				});
			});


           

			var modelContainer = `<div class="col-xs-12 noPadding noMargin">
				                    <div class="row-fluid noPadding noMargin childHeight modelBox">
				                        
				                    </div>
				                </div>`;

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