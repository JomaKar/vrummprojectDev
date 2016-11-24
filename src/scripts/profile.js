$(function(){


	var place = window.location.pathname;

	var lastSlash = place.lastIndexOf('/');

	place = place.slice(lastSlash);

	if(place === '/perfil.html'){
		var filterSelect = $('select#filterSelect'),
		garageImgCont = $('div.garageImgCont'),
		user = [],
		usrGarageArr = [],
		aliasSpan = $('span.aliasSpan'),
		nameSpace = $('h4.fullName'),
		askingTimes = 0,
		carsNumber = $('span.carsNumb'),
		dateSpace = $('span.memDateNumb'),
		photoDiv = $('div.p-profilePhoto'),
		domDataElements = [aliasSpan, dateSpace, nameSpace, carsNumber, photoDiv],
		userObjKeys = ['alias', 'created_at', 'full_name', 'total_garage', 'foto_perfil'];


		var askInterval = setInterval(function(){
		
			var userInfo = sessionStorage.getItem('currentUserInfo');
			checkUser(userInfo);

		}, 5);

		var askForGarage = setInterval(function(){
		
			var userGargage = sessionStorage.getItem('currentUserGarage');
			checkUserGarage(userGargage);
			askingTimes++;

		}, 5);

		$(document).on('click', 'span.dots', function(){
			var sideInfoBar = $(this).closest('div.sideInfoBar'),
			toggleableIcons = sideInfoBar.find('div.toggleableIcons');
			

			toggleableIcons.css({display: 'flex'});
			sideInfoBar.height('100%');

			$(this).hide();
			
		});

		$(document).on('click', 'div.toggleableIcons div', function(){
			var sideInfoBar = $(this).closest('div.sideInfoBar'),
			toggleableIcons = $(this).closest('div.toggleableIcons'),
			dotsSpan = sideInfoBar.find('span.dots');
			

			toggleableIcons.css({display: 'none'});
			sideInfoBar.height('auto');

			dotsSpan.show();
			
		});

		$(document).on('click', 'div.selectedCat', function(){
			var catContainer = $(this).closest('div.userCarCatCont'),
			bar = $(this).closest('div.selectionContainer'),
			innerDiv = $(this).find('div'),
			notSelected = bar.find('div.notSelectedCat');

			toggleCarSelection(catContainer, bar, innerDiv, notSelected);

		});


		$(document).on('click', 'div.notSelectedCat div', function(){
			var catContainer = $(this).closest('div.userCarCatCont'),
			categories = ['love', 'soon', 'now'],
			bar = catContainer.find('div.selectionContainer'),
			notSelectedCont = $(this).closest('div.notSelectedCat'),
			selectedCat = notSelectedCont.prev('div.selectedCat'),
			prevCat = selectedCat.children('div');

			var el = $(this);
			var mainContainer = catContainer.closest('div.garageImgCont');

			addCategory(el, mainContainer, categories);

			prevCat.appendTo(notSelectedCont);

			selectedCat.append($(this));

			toggleCarSelection(catContainer, bar, prevCat, notSelectedCont);

		});

		function toggleCarSelection(parent, selCont, selCat, notSelCont) {
			if(notSelCont.css('display') === 'none'){
				notSelCont.css({display: 'flex'});
				parent.width(108);
				selCont.width(108);
				selCat.addClass('grayColor');
			}else{
				notSelCont.css({display: 'none'});
				parent.width('100%');
				selCont.width(36);
				selCat.removeClass('grayColor');
			}
		}

		function addCategory(el, mainEl, cat) {
			var newCat = '';
			
			cat.forEach(function(itm, idx){
				if(el.hasClass(itm)){
					newCat = itm;
				}
			});

			cat.forEach(function(itm, idx){
				if(mainEl.hasClass(itm)){
					mainEl.removeClass(itm);
				}
			});


			mainEl.addClass(newCat);
		}

		function checkUserGarage(garageArr) {
			if(garageArr !== null && garageArr !== undefined && garageArr !== 'nothing stored'){
	        	clearInterval(askForGarage);
	        	usrGarageArr = JSON.parse(garageArr);
	        	con(usrGarageArr);
	        }else if(garageArr === null){

	        	if(askingTimes >= 60 || garageArr === 'nothing stored'){
	        		clearInterval(askForGarage);
	        		 getUserGarage();
	        	}

	        }
		}

		function checkUser(userArr) {
			if(userArr !== null && userArr !== undefined && userArr !== 'nothing stored'){
				clearInterval(askInterval);
				user = JSON.parse(userArr);
				//con(user);
				if(user.length > 0){
					displayUserInfo(user[0]);
				}else{
					con('no user');
				}
		    }	
		}


		function getUserGarage() {

			var userId = sessionStorage.getItem('currentUserId');
            var devicId = sessionStorage.getItem('deviceId');
            var dataForGarage = {idUsr: userId, device: devicId};

            dataForGarage = JSON.stringify(dataForGarage);

              $.post('https://vrummapp.net/ws/v2/garage/listar', 
                dataForGarage
              ).then(function(res){

                if(res.estado === 1){

                  usrGarageArr = res.mensaje.rs;

                  displayGarage(usrGarageArr);
                   
                }else if(res.estado === 2){
                	con('sin autos en garage');
                }

               }).fail(function(err){
                  console.log(err);
            });
               
        }

		var imageOk = false;

		function displayUserInfo(userObj){

			$.map(userObj, function(value, key){

				if(key === 'created_at'){
					value.trim();

					var whiteSpaceIdx = value.indexOf(' ');

					value = value.slice(0, whiteSpaceIdx);
				}else if(key === 'full_name'){
					value.trim();

					var whiteSpaceIdx = value.indexOf(' ');

					value = value.slice(0, whiteSpaceIdx);

				}else if(key === 'foto_perfil'){

					if(value !== null){
						imageOk = true;

						value = `data:image/png;base64,${value}`;

					}
				}

				$.each(userObjKeys, function(index, val){
					if(key === val){

						var el = domDataElements[index];

						if(val === 'foto_perfil' && imageOk){

							$(el).css({'background-image': `url(${value})`});

						}else{
							$(el).html(value);
						}

					}
				});

			});
		}

		function displayGarage(grgArr) {
			var availableCats = [
				`<div class="calendarGroup soon">
	                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" class="undefined">
	                      <path d="M16.2 2.2v0.6 0.6 0 0.4c0 0.9-0.8 1.7-1.7 1.7s-1.7-0.7-1.7-1.7V3.4 2.8 2.2H8.1v0.6 0.6 0.4c0 0.9-0.8 1.7-1.7 1.7 -0.9 0-1.7-0.7-1.7-1.7V3.4v0V2.8v0V2.2C3.2 2.3 2 3.4 2 4.8v0.3 2.5 8.6C2 17.7 3.3 19 4.9 19h11.2c1.6 0 2.9-1.3 2.9-2.9V7.5 5.1 4.8C19 3.4 17.7 2.2 16.2 2.2zM17.7 16.1c0 0.9-0.7 1.6-1.6 1.6H4.9c-0.9 0-1.6-0.7-1.6-1.6V7.5h14.5V16.1zM6.4 4.5c0.4 0 0.7-0.3 0.7-0.7V3.4 2.8 2.2 1.7C7.2 1.3 6.8 1 6.4 1 6 1 5.7 1.3 5.7 1.7v0.5 0.6 0.6 0.4C5.7 4.2 6 4.5 6.4 4.5zM14.5 4.5c0.4 0 0.7-0.3 0.7-0.7V3.4 2.8 2.2 1.7c0-0.4-0.3-0.7-0.7-0.7 -0.4 0-0.7 0.3-0.7 0.7v0.5 0.6 0.6 0.4C13.8 4.2 14.1 4.5 14.5 4.5zM8.4 16.1c0.8 0 1.4-0.2 1.9-0.7 0.4-0.5 0.6-1 0.6-1.6 0-0.6-0.2-1-0.5-1.3 -0.1-0.1-0.2-0.2-0.3-0.2 -0.1-0.1-0.2-0.2 0-0.3 0.1-0.1 0.2-0.1 0.2-0.2 0.2-0.3 0.4-0.6 0.4-1.1 0-0.6-0.2-1.1-0.6-1.4C9.6 9 9.1 8.8 8.4 8.8 8 8.8 7.7 8.9 7.4 9S7 9.2 6.8 9.3c-0.2 0.2-0.4 0.5-0.5 0.8 -0.1 0.2-0.1 0.5-0.2 0.7 0 0.2 0.1 0.3 0.3 0.3h0.7c0.2 0 0.3-0.1 0.3-0.3 0-0.2 0.1-0.4 0.2-0.5C7.8 10.1 8 10 8.3 10 8.6 10 8.8 10 9 10.2c0.2 0.2 0.2 0.4 0.2 0.7 0 0.4-0.2 0.7-0.5 0.8 -0.1 0.1-0.3 0.1-0.6 0.1 -0.2 0-0.3 0.2-0.3 0.3v0.4c0 0.2 0.1 0.3 0.3 0.3 0.3 0 0.5 0.1 0.7 0.1 0.4 0.2 0.6 0.5 0.6 0.9 0 0.4-0.1 0.6-0.3 0.8C8.9 14.9 8.7 15 8.4 15c-0.4 0-0.8-0.2-0.9-0.5 -0.1-0.1-0.1-0.2-0.1-0.4 0-0.2-0.2-0.3-0.3-0.3H6.3c-0.2 0-0.3 0.1-0.3 0.3 0 0.4 0.2 0.8 0.3 1.1C6.7 15.8 7.4 16.1 8.4 16.1zM12.3 11.1h1.1c0.2 0 0.3 0.1 0.3 0.3v4.3c0 0.2 0.1 0.3 0.3 0.3h0.8c0.2 0 0.3-0.1 0.3-0.3V9.2c0-0.2-0.1-0.3-0.3-0.3h-0.5c-0.2 0-0.3 0.1-0.3 0.1 0 0 0 0.1 0 0.1 -0.1 0.2-0.2 0.4-0.3 0.5 -0.2 0.2-0.4 0.3-0.7 0.4 -0.1 0-0.3 0.1-0.6 0.1 -0.2 0-0.3 0.2-0.3 0.3v0.3C12 10.9 12.1 11.1 12.3 11.1z" />
	                </svg>
	            </div>`,
	            `<div class="heartGroup love">
                    <span class="userCarCat fa fa-heart"></span>
                </div>`,
                `<div class="soonGroup now">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                            <path d="M10.4 2c-3.7 0-6.8 2.3-8 5.5l2.2 1c0.8-2.4 3.1-4.1 5.8-4.1 3.4 0 6.1 2.7 6.1 6.1s-2.7 6.1-6.1 6.1c-2.4 0-4.5-1.4-5.5-3.4l1.8-0.7L2.2 9.7l-1.2 5 1.6-0.7C4 17 7 19 10.4 19c4.7 0 8.6-3.8 8.6-8.5S15.2 2 10.4 2z"/>
                            <rect x="9" y="6" width="2" height="5"/>
                            <rect x="11" y="10" transform="matrix(0.6002 -0.7999 0.7999 0.6002 -5.2003 14.5968)" width="2" height="5"/>
                    </svg>
                </div>`
			];
			var filterClass = '',
			selectedCategory = '',
			notSelectedCategories = '';
			
			grgArr.forEach(function(itm, idx){

				if(itm.tipo === 'soonday'){
					filterClass = 'now';
					selectedCategory = availableCats[2];
					notSelectedCategories = `${availableCats[1]}${availableCats[0]}`;

				}else if(itm.tipo === 'someday'){
					filterClass = 'soon';
					selectedCategory = availableCats[0];
					notSelectedCategories = `${availableCats[1]}${availableCats[2]}`;

				}else if(itm.tip === 'dream'){
					filterClass = 'love';
					selectedCategory = availableCats[1];
					notSelectedCategories = `${availableCats[2]}${availableCats[0]}`;

				}


				var auto = `<div class="col-xs-12 noPadding col-sm-6 col-md-4 garageImgCont ${filterClass}">
	                            <div class="sideInfoBar">
	                                <div class="userCarCatCont">
	                                    <div class="selectionContainer">
	                                        <div class="selectedCat">
	                                            ${selectedCategory}
	                                        </div>
	                                        <div class="notSelectedCat">
	                                            ${notSelectedCategories}
	                                        </div>
	                                    </div>
	                                </div>
	                                <div class="toggleableIcons">
	                                    <div class="compareGroup">
	                                        <span class="fa fa-long-arrow-right right"></span>
	                                        <span class="fa fa-long-arrow-left left"></span>
	                                        <span class="fa fa-plus-circle circle"></span>
	                                        <span class="message">Agrega al comparador</span>
	                                    </div>
	                                    <div class="shareGroup">
	                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
	                                          <g>
	                                                <path d="M17.8 6.2h-2.2c-0.4 0-0.8 0.4-0.8 0.8s0.4 0.8 0.8 0.8h1.4v10.7H4.2v-10.7h1.7c0.4 0 0.8-0.4 0.8-0.8s-0.4-0.8-0.9-0.8h-2.4c-0.5 0-0.8 0.4-0.8 0.8v12.3c0 0.4 0.3 0.7 0.8 0.7h14.5c0.4 0 0.8-0.3 0.8-0.7v-12.3C18.6 6.6 18.3 6.2 17.8 6.2zM9.4 3.9l0.3-0.1v10.2c0 0.4 0.4 0.8 0.8 0.8s0.8-0.4 0.8-0.8v-10.6l0.8 0.5c0.1 0.1 0.3 0.2 0.5 0.2 0.2 0 0.4-0.1 0.6-0.3 0.3-0.3 0.3-0.8-0.1-1.1l-2-1.5c-0.3-0.2-0.7-0.3-1 0 -0.1 0.1-1.8 1.5-1.8 1.5 -0.3 0.3-0.3 0.8 0 1.1C8.6 4.2 9.1 4.2 9.4 3.9z" />
	                                          </g>
	                                        </svg>
	                                        <!-- <span class="fa fa-long-arrow-up arUp"></span>
	                                        <span class="fa fa-square-o sqEmp"></span> -->
	                                        <span class="message">Compartir</span>
	                                    </div>
	                                    <div class="toggleTrashGrp">
	                                        <span class="fa fa-trash trash"></span>
	                                        <span class="message">Eliminar</span>
	                                    </div>
	                                </div>
	                                <span class="fa fa-ellipsis-h dots"></span>
	                            </div>
	                            <img  src="${imt.pic_url}" class="noMargin garageImg img-responsive" border="0"/>
	                            <span class="hiddenItm garageUsrId">${itm.garage_id}</span>
	                            <span class="hiddenItm garageUsrVersionId">${itm.version_id}</span>
	                            <span class="hiddenItm garageUsrBrandId">${itm.brand_id}</span>
	                        </div>`;


			});
			
		}


		filterSelect.change(function(){
			var val = $(this).val();

			garageImgCont.each(function(idx, el){

				if($(el).hasClass(val)){
					$(el).show();
				}else{
					$(el).hide();
				}
			});
		});
	}

});

function con(val){
	console.log(val);
}