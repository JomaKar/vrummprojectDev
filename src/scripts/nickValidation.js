$(function(){
var nickInput = $('input#alias');


	nickInput.keyup(function () {
		var nextEl = $('p#nicknameText');
		nextEl.remove();
	})

	nickInput.focus(function(){
		
		var nextEl = $('p#nicknameText');
		nextEl.remove();

	}).blur(function() {

		var posNick = $(this).val();
		nickValidator(posNick);
	    
	});


	function nickValidator(val){
		if(val.length > 0){
			var data = JSON.stringify({'nickname': val});
			$.post('https://vrummapp.net/ws/v2/usuario/validanickname', 
				data
			).then(function(res){ 

				sayIfDoes(res);  

			}).fail(function(err){
		
		  		sayIfDoes('noOne');

			});	
		}	
	}


	function sayIfDoes(val) {
		var posNick = nickInput.val();

		if (val !== 'noOne') {
			var greenLight = "<p id='nicknameText' class='goodText'>"+ posNick +" es un nickname bueno</p>";

			nickInput.after(greenLight);

		} else {

			var wrongOne = "<p id='nicknameText' class='badText'>"+ posNick +" es un nickname que ya existe</p>";
			nickInput.after(wrongOne);

		}
	}


	function con(val){
		console.log(val);
	}
})