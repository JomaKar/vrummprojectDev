export function backing(currPage) {
	var treePages = [{
		name: '/index.html',
		parent: null,
		desnity: ''
	},
	{
		name: '/registro.html',
		parent: null
	},
	{
		name: '/catalogo-marcas.html',
		parent: ['/index.html', '/perfil.html']
	}]
}