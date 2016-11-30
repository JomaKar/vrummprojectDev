import {navigating, myLocation} from './locating.js';

export function backing(currPage) {
	var treePages = [{
		name: ['/web/', '/web/index', '/web/index.html'],
		parent: null,
		destiny: 'home'
	},
	{
		name: ['/web/registro/', '/web/registro/index.html', '/web/registro/index'],
		parent: null,
		destiny: 'registro'
	},
	{
		name: ['/web/catalogo/', '/web/catalogo/index.html', '/web/catalogo/index'],
		parent: ['home', 'perfil'],
		destiny: ''
	},
	{
		name: ['/web/perfil/index.html', '/web/perfil/index','/web/perfil/'],
		parent: 'home',
		destiny: 'home'
	},
	{
		name: ['/web/perfil/detalles.html', '/web/perfil/detalles'],
		parent: 'perfil',
		destiny: 'perfil'
	},
	{
		name: ['/web/catalogo/brand-modelo.html', '/web/catalogo/brand-modelo'],
		parent: 'catalogo',
		destiny: 'catalogo'
	},
	{
		name: ['/web/catalogo/modelo-versiones.html', '/web/catalogo/modelo-versiones'],
		parent: 'catalogo/brand-modelo',
		destiny: 'catalogo/brand-modelo'
	},
	{
		name: ['/web/catalogo/specific-version.html', '/web/catalogo/specific-version'],
		parent: 'catalogo/modelo-versiones',
		destiny: 'catalogo/modelo-versiones'
	}];


	var lastPageArr = $.grep(treePages, function(item, index){

		var done = false;

		item.name.forEach(function(itm, i){
			if(currPage === itm){
				done = true;
			}
		});

		if(done){ return item;}

	});


	var lastPage = lastPageArr[0];

	
	if($.isArray(lastPage.parent)){
		
		//check the page from the user come from

		var lastPageUrl = document.referred;

		if(lastPageUrl !== undefined){

			//check if the user come from the webapp or from the web
			//first getting its host

			var lastPageHostIdx = lastPageUrl.indexOf('/', 10);
			var lastPageOrigin = lastPageUrl.slice(0, lastPageHostIdx);
			var wasInApp = cameFromInside(lastPageOrigin);


			//if it came from inside the app we return him to the last page using window history
			if(wasInApp){
				//if it was in the app already
				window.location = window.history.back();

			//else, we give priority returning the user to 
			}else{


				backIt(lastPage.parent);
				
			}

		}else{

			backIt(lastPage.parent);

		}


	}else{

		if(lastPage.parent !== 'home'){

										
			navigating(lastPage.parent);

		}else{

			navigating(lastPage.parent);
		}



	}


}

function backIt(pos) {
	$.map(pos, function(item, idex){
		if(item !== 'home' && item !== 'registro'){

			navigating(pos[idex]);

		}
	});
}


function cameFromInside(lastOrigin){
	var actualOrigin = window.location.origin;
	return (lastOrigin === actualOrigin) ?  true :  false;
}