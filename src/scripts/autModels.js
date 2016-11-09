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
			diffUses = [], 
			tipo = [];
			var collections = {};

			//figuring out of how many different years the cars belong
			//the different years are gonna be stored in the 'availableYears' array
			models.forEach(function(itm, idx){
				var inArray = $.inArray(itm.year, availableYears, 0);
				if(inArray === -1){
					availableYears.push(itm.year);
					collections[`year${itm.year}`] = [];
				}
			});


			
			//we split the full models in chunks depending of the year they belong
			//and we use the same array where the years where stored to stored this new
			//chunks, which are a number of groups equal to the number of differents dates
			availableYears.forEach(function(yearName, yearBoxIdx){
				availableYears[yearBoxIdx] = $.grep(models, function(el, idex){
					return el.year === availableYears[yearBoxIdx];
				});
			});

			availableYears.forEach(function(yearColl, idxColl){
				$.each(yearColl, function(idexYear, yearItm){
					diffUses[idxColl] = [];
					var inArr = $.inArray(yearItm.uso, diffUses[idxColl], 0);
					if(inArr === -1){
						diffUses[idxColl].push(yearItm.uso);
					}
				});
			});


			//con(availableYears);


			//divide again the yearsChunksModels in smaller usesChunks

			$.map(diffUses, function(usoName, idx){
				$.each(usoName, function(indx, item){
					diffUses[idx][indx] = $.grep(availableYears[idx], function(el, idex){
						return el.uso === diffUses[idx][indx];
					});
				});
			});

			//con(diffUses);


			//extract the different types to filter then. Coll = collection
			diffUses.forEach(function(yearColl, yearIdx){
				tipo[yearIdx] = [];
				yearColl.forEach(function(useColl, useIdx){
					tipo[yearIdx][useIdx] = [];
					useColl.forEach(function(useItm, idx){
						var inArr = $.inArray(useItm.tipo_catalogo, tipo[yearIdx][useIdx], 0);
						if(inArr === -1){
							tipo[yearIdx][useIdx].push(useItm.tipo_catalogo);
						}

					});
				});
			});

			//con(tipo);

			tipo.forEach(function(yearColl, yearIdx){
				yearColl.forEach(function(useColl, useIdx){
					useColl.forEach(function(typeName, idx){
						tipo[yearIdx][useIdx][idx] = $.grep(diffUses[yearIdx][useIdx], function(el, elIdx){
							return el.tipo_catalogo === typeName;
						})

					});
				});
			});

			con(tipo);
			displayModels(tipo);

		}

		var yearCollCounter = 0;
		var modelsSpace = $('div.modelsSpace');
		var initialTxt = $('p.modelsStartTxt');

		function displayModels(arrModels) {
			initialTxt.remove();

            arrModels.forEach(function(yearColl, yearIdx){
				yearColl.forEach(function(useColl, useIdx){
					useColl.forEach(function(typeColl, typeIdx){
						typeColl.forEach(function(typeItems, typeIdx){
							
							if(typeItems.length > 1){

								typeItems.sort(function(a, b){
									return parseFloat(a.year) - parseFloat(b.year);
								});

							}

							yearColl.forEach(function(yearItem, ycollIdx){
								yearCollCounter = ycollIdx;
								var yearUseFilter = `<div class="galleryHead col-xs-12 noPadding noMargin yearFilter${yearCollCounter}"><span class="modelUse"></span><span class="modelY">${typeItems.year}</span></div>`;

								modelsSpace.append(yearUseFilter);
							});

							useColl.forEach(function(useItem, ucIdx){
								for(var i = 0; i <= yearCollCounter; i++){
									var actualFilter = $('div.yearFilter' + i);
									actualFilter.find('span.modelUse').html(typeItems.uso);
								}
							});

							//////////am here
							//////
							//////
							/////
							
							var typeFilter = `<div class="galleryNeck col-xs-12 noPadding noMargin">
							                    <span class="gallNeckCarSp"></span>
							                    <span class="gallNeckCarTxt">SUVs</span>
							                </div>`;

							var modelContainer = `<div class="col-xs-12 noPadding noMargin">
								                    <div class="row-fluid noPadding noMargin childHeight modelBox">
								                        
								                    </div>
								                </div>`;
							
							var model = `<div class="col-xs-12 col-sm-4 noPadding noMargin backImg centerBackImg modelItem" style="background-image:url('')">
				                            <div class="hoverInfo">
				                                <ul class="mDetails noPadding">
				                                  <li class="mName"></li>
				                                  <li class="vName"></li>
				                                  <li class="yModel"></li>
				                                </ul>
				                            </div>
				                        </div>`;




						});
					});
				});
			});
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