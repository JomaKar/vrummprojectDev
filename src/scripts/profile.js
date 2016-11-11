$(function(){

	var filterItms = $('li.filterGarage');
	var grid = $('div.garageGrid');
	var listCont = $('div.filtrationListDiv');
	var filterTxt = $('span.filterText');
	var list = $('ul.filterList');

	listCont.click(function(){
		list.slideToggle();
	});

	filterItms.click(function(){
		var value = $(this).attr('data-filter');
		var txt = $(this).html();

		filterTxt.html(txt);

		grid.isotope({filter: value});

		$(this).parent().slideToggle();

	});

});