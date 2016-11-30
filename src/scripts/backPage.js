export function backing(currPage) {
	var treePages = [{
		name: '/index.html',
		parent: null,
		destiny: '/index.html'
	},
	{
		name: '/registro.html',
		parent: null,
		destiny: '/registro.html'
	},
	{
		name: '/catalogo-marcas.html',
		parent: ['/index.html', '/perfil.html'],
		destiny: ''
	},
	{
		name: '/perfil.html',
		parent: '/index.html',
		destiny: '/index.html'
	},
	{
		name: '/detalles.html',
		parent: '/perfil.html',
		destiny: '/perfil.html'
	},
	{
		name: '/brand-modelo.html',
		parent: '/catalogo-marcas.html',
		destiny: '/catalogo-marcas.html'
	},
	{
		name: '/modelo-versiones.html',
		parent: '/brand-modelo.html',
		destiny: '/brand-modelo.html'
	},
	{
		name: '/specific-version.html',
		parent: '/modelo-versiones.html',
		destiny: '/modelo-versiones.html'
	}];


	var lastPageArr = $.grep(treePages, function(item, index){

		return item.name === currPage;

	});


	var lastPage = lastPageArr[0];

	console.log(currPage, lastPageArr);

	
	if($.isArray(lastPage.parent)){
		
		//check the page from the user come from

		var lastPageUrl = document.referred;

		if(lastPageUrl !== undefined){

			//check if the user come from the webapp or from the web
			//first getting its host

			var lastPageHostIdx = lastPageUrl.indexOf('/');
			var lastPageHost = lastPageUrl.slice(0, lastPageHostIdx - 1);
			var wasInApp = cameFromInside(lastPageHost);


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

		if(lastPage.parent !== '/index.html'){

										
			window.location = `/pages${lastPage.parent}`;

		}else{

			window.location = lastPage.parent;
		}



	}


}

function backIt(pos) {
	$.map(pos, function(item, idex){
		if(item !== '/index.html' && item !== '/registro.html'){

								
			window.location = `/pages${pos[idex]}`;

		}
	});
}


function cameFromInside(lastHost){
	var actualHost = window.location.host;
	return (lastHost === actualHost) ?  true :  false;
}