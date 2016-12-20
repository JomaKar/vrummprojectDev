import {navigating, myLocation, pathnameRoot} from './commonFunc/locating.js';
import {alleGleichlich, sizingModelItms} from './commonFunc/sizingGarageImgs.js';
import {con} from './commonFunc/consoling.js';
import {sendPostToGo, sendPostToGet} from './commonFunc/httpProcesor.js';
import {getVersions} from './commonFunc/getversiones.js';


$(function(){
	
	var brands = [];


	if(myLocation === "/web/catalogo/brand-modelo.html" || myLocation === "/web/catalogo/brand-modelo"){



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


		var modelsSpace = $('div.modelsSpace');
		var initialTxt = $('p.modelsStartTxt');


		function extractModels(brandsArr){
			models = JSON.parse(brandsArr);
			var availableYears = [],
			availableUses = [],
			availableTypes = [],
			diffUses = [], 
			tipo = [];

			if(models !== ''){
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

				//creating clasification depending on their use

				itmsDependingOnYear.forEach(function(yearColl, indx){
					itmsYearUse[indx] = [];

					availableUses.forEach(function(useName, index){
						itmsYearUse[indx][index] = [];

						itmsYearUse[indx][index] = $.grep(yearColl, function(el, idx){
							return el.uso === availableUses[index];
						});
					});

				});

				//deleting arrays with nothing inside them in the useCollection 

				itmsYearUse.forEach(function(yearColl, indx){

					itmsYearUse[indx] = $.grep(yearColl, function(arr, idx){
						return arr.length > 0;
					});

				});
				
				// con(itmsYearUse);

				var itmsYearUseType = [];

				//creating last clasification depending on their type

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

				//deleting arrays with nothing inside them in typeCollection

				itmsYearUseType.forEach(function(yearColl, indx){

					yearColl.forEach(function(useColl, index){

						itmsYearUseType[indx][index] = $.grep(useColl, function(arr, idx){
								return arr.length > 0;
							});
					});

				});
				//con(itmsYearUse);
				//con(itmsYearUseType);
				displayModels(itmsDependingOnYear, itmsYearUse, itmsYearUseType);
	
			}else{
				initialTxt.html('No hay información sobre esta marca para mostrar');
			}

		}


		function displayModels(collYear, collYearUse, collYearUseType) {
			initialTxt.remove();

			collYearUse.forEach(function(yearColl, ind){
				yearColl.forEach(function(useColl, indx){
					var year = useColl[0].year;
					var use = useColl[0].uso;

					var yearUseFilter = `<div class="galleryHead col-xs-12 noPadding noMargin yearFilter${year + use}">
											<span class="modelUse">${use}</span>
											<span class="modelY">${year}</span>
										</div>
										<div class="col-xs-12 noPadding noMargin yearFilterCont${year + use}"></div>`;

					modelsSpace.append(yearUseFilter);					

				});
			});

			collYearUseType.forEach(function(yearColl, ind){
				yearColl.forEach(function(useColl, indx){
					
					useColl.forEach(function(typeColl, index){
						var year = typeColl[0].year;
						var use =  typeColl[0].uso;
						var yearUse = year + use;
						var currentYearUseFilter = $('div.yearFilterCont' + yearUse);
						var type = typeColl[0].tipo_catalogo;
						var typeName = type;
						type = type.replace(/ /g, '');
						
						var yearUseType = yearUse + type;


						var typeFilter = `<div class="galleryNeck col-xs-12 noPadding noMargin typeFilter${year + use + type}">
						                    <span class="gallNeckCarSp"></span>
						                    <span class="gallNeckCarTxt">${typeName}</span>
						                </div>
						                <div class="col-xs-12 noPadding noMargin">
						                    <div class="row-fluid noPadding noMargin childHeight modelBox${year + use + type}">
						                        
						                    </div>
						                </div>`;

						currentYearUseFilter.append(typeFilter);
						
						typeColl.forEach(function(typeItem, indexx){
							var currentBox = $('div.modelBox' + yearUseType);

							var hrefPath = (localStorage.getItem('aUsrA') !== null && localStorage.getItem('aUsrA') !== undefined) ? `${pathnameRoot}catalogo/modelo-versiones?al=${localStorage.getItem('aUsrA')}&brdId=${typeItem.brand_id}&mdlId=${typeItem.model_id}` : `${pathnameRoot}catalogo/modelo-versiones?brdId=${typeItem.brand_id}&mdlId=${typeItem.model_id}`;

							var model = `<div class="col-xs-12 col-sm-4 noPadding noMargin modelItem">
				                            <img src="${typeItem.pic_url}" class="img-responsive carImg"/>
				                            <a href="${hrefPath}" class="modelItmAnchor">
					                            <div class="hoverInfo">
					                                <ul class="mDetails noPadding">
					                                  <li class="mName">${typeItem.name}</li>
					                                  <li class="vPrice">${typeItem.desde} - ${typeItem.hasta}</li>
					                                  <li class="yModel">${typeItem.year}</li>
					                                  <li class="hiddenItm modelId">${typeItem.model_id}</li>
					                                </ul>
					                            </div>
					                        </a>
				                        </div>`;

				            currentBox.append(model);            
						});


					});
				});
			});

			sizingModelItms();

		}

		$(document).on('click', 'a.modelItmAnchor', function(e){
			e.preventDefault();
		});


		$(document).on('click', 'div.hoverInfo', function(){
			var modelId = $(this).find('li.modelId').text();
			var modelN = $(this).find('li.mName').text();
			var modelP = $(this).find('li.vPrice').text();
			getVersions(modelId, modelN, modelP, 'mdls');
			//console.log('hi from models') 
		});


		$(window).resize(function(){
			var carContainer = $('div.modelItem');
			if(carContainer.length){
				alleGleichlich(carContainer);
			}
		});

		function displayBrand() {
			if(sessionStorage.getItem('currentBrandImg') !== null){

				var brandURL = sessionStorage.getItem('currentBrandImg');
				
				headerBrandImg.css({
					'background-image': `url(${brandURL})`
				});
			
			}else{

				con('no image brand')

			}

		}

		var backBtn = $('span.backBtn');

		backBtn.click(function(){
			navigating('catalogo');
		})


	}
});