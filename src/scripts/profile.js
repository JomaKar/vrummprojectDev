$(function(){


	var place = window.location.pathname;

	var lastSlash = place.lastIndexOf('/');

	place = place.slice(lastSlash);

	if(place === '/perfil.html'){
		var filterSelect = $('select#filterSelect'),
		garageImgCont = $('div.garageImgCont'),
		user = [],
		aliasSpan = $('span.aliasSpan'),
		nameSpace = $('h4.fullName'),
		carsNumber = $('span.carsNumb'),
		dateSpace = $('span.memDateNumb'),
		domDataElements = [aliasSpan, dateSpace, nameSpace, carsNumber],
		userObjKeys = ['alias', 'created_at', 'full_name', 'total_garage'];


		var askInterval = setInterval(function(){
		
			var userInfo = sessionStorage.getItem('currentUserInfo');
			checkUser(userInfo);

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

		function checkUser(userArr) {
			if(userArr !== null && userArr !== undefined && userArr !== 'nothing stored'){
				clearInterval(askInterval);
				user = JSON.parse(userArr);
				if(user !== false){
					displayUserInfo(user[0]);
				}else{
					con('no user');
				}
		    }	
		}

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
				}

				$.each(userObjKeys, function(index, val){
					if(key === val){

						var el = domDataElements[index];

						$(el).html(value);
					}
				});

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