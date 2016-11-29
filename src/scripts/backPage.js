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
		name: 'perfil.html',
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


	var lastPageArr = $.grep(treePages, function(idx, item){

		return item.name === currPage;

	});


	var lastPage = lastPageArr[0];

	if($.isArray(lastPage.parent)){
		referred(lastPage.parent);
	}else{

		window.location = lastPage.parent;


	}


}

//averigual de que item estamos hablando
//checar si document.referred es igual a uno de los parent si se trata de un array
//conservar datos en la url
//qué si viene de otra página


function referred(posParents) {

	//check the page from the user come from

	var lastPageUrl = document.referred;


	//check if the user come from the webapp or from the web
	//first getting its host
	var lastPageHostIdx = lastPageUrl.indexOf('/');
	var lastPageHost = lastPageUrl.slice(0, lastPageHostIdx - 1);
	var wasInApp = cameFromInside(lastPageHost);

	var lastSlash = lastPageUrl.lastIndexOf('/');

	var place = lastPageUrl.slice(lastSlash);

	var indexOfQuery = place.indexOf('?');

	if(indexOfQuery !== -1){
		place = place.slice(0, indexOfQuery - 1);
	}

}


function cameFromInside(lastHost){
	var actualHost = window.location.host;
	(lastHost === actualHost) return true : return false;
}