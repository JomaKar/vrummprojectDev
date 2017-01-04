import {queriesT, hashesExist} from './commonFunc/urlEncoder.js';

$(function(){

	var breadcrum = $('div.breadCrum');

	if(breadcrum.length){
		var links = breadcrum.find('a');

		//console.log(links, breadcrum);

		links.each(function(indx, el){

			if(!$(el).hasClass('noChangeHref')){

				var linkHref = $(el).attr('href');

				if($(el).hasClass('brdId')){

					linkHref += (queriesT.al) ? `?al=${queriesT.al}&brdId=${queriesT.brdId}` : `?brdId=${queriesT.brdId}`;
				
				}

				if($(el).hasClass('mdlId')){

					linkHref += (queriesT.al) ? `?al=${queriesT.al}&brdId=${queriesT.brdId}&mdlId=${queriesT.mdlId}` : `?brdId=${queriesT.brdId}&mdlId=${queriesT.mdlId}`;

				}

				$(el).attr('href', linkHref); 
			}
			
		});
	}

});