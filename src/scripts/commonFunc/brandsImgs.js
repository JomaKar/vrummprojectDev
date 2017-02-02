let brands = [];


export function askBrands(){
	$.post('https://vrummapp.net/ws/v2/catalogo/getmarcas')
	.then(function(res){
		if(res.estado === 1){
			brands = res.mensaje.rs;
		}
	})
}


export function theBrand(id) {
	return $.grep(brands, function(itm, idx){
		return itm.id == id;
	});
}
