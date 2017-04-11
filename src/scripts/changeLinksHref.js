import {myLocation} from './commonFunc/locating.js';

$(function(){

	var askNavInterval = setInterval(function(){

		if(myLocation !== "/web/" && myLocation !== "/web/index" && myLocation !== "/web/index.html" && myLocation !== "/web/registro/" && myLocation !== "/web/registro/index" && myLocation !== "/web/registro/index.html"){

			if($('div.navbarInserted').length && $('div#appStoreFooter').length){


				if(localStorage.getItem('activeSession') == 'yes'){

					if(sessionStorage.getItem('hrefNav') == 'setted'){

						if($('div.breadCrum').length){
							if(sessionStorage.getItem('hrefBreadCrumb') == 'setted'){
								stopInterval();					
							}
						}else{
							stopInterval();
						}

					}

				}else{

					if($('div.breadCrum').length){
						if(sessionStorage.getItem('hrefBreadCrumb') == 'setted'){
							stopInterval();					
						}
					}else{
						stopInterval();
					}
				}
			}
		}

		else{
			console.log('wtf');

			if($('div#vrummFooter').length){
				stopInterval();
			}

		}

	}, 5);


	function stopInterval() {
		clearInterval(askNavInterval);
		changeLinks();
	}



	function changeLinks(){
		var environment = window.location.hostname;

		var linksToChange = $('a.linkChangeOnEnv');

		console.log(environment, linksToChange);

		if(environment == 'localhost'){

			linksToChange.each((id, el) => {
				var hrefChange = $(el).data('dev');
				$(el).attr('href', hrefChange);
			});
		
		}else if(environment == "www.vrummapp.net" || environment == "vrummapp.net"){

			linksToChange.each((id, el) => {
				var hrefChange = $(el).data('prod');
				$(el).attr('href', hrefChange);
			});
		}
	}


});