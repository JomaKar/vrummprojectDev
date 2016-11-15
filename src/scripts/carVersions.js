$(function(){
	var place = window.location.pathname;
	var versions = [];

	var lastSlash = place.lastIndexOf('/');

	place = place.slice(lastSlash);


	if(place === "/model-versiones.html"){

		var brandName = sessionStorage.getItem('currentBrandName');

		var askInterval = setInterval(function(){
		
			var versionsStored = sessionStorage.getItem('versionsArr');
			checkVersions(versionsStored);

		}, 5);


		function checkVersions(argument) {
			if(argument !== null && argument !== undefined && argument !== 'nothing stored'){
				clearInterval(askInterval);
				versions = argument;
				displayVersions(versions);
		    }	
		}


		function displayVersions(argument) {
			con(argument)
		}


	}
});

function con(argument) {
	console.log(argument);
}