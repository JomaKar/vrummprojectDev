import {navigating, myLocation, pathnameRoot} from './commonFunc/locating.js';
import {con} from './commonFunc/consoling.js';
import {queriesT, hashesExist} from './commonFunc/urlEncoder.js';
import {sendPostToGo, sendPostToGet} from './commonFunc/httpProcesor.js';

$(function(){

	if(myLocation === "/web/perfil/configuracion" || myLocation === "/web/perfil/configuracion.html"){

		//DOM variables

		const configForm = $('form#configForm')
		const formSecondPart = $('div.formSecondPart');
		const formFirstPart = $('div.formFirstPart');
		const passChA = $('div.passwordChangeArea');
		const passEditBtn = $('button.passEditBtn');
		const passInptsCont = $('div.passwordChangeInptsCont');
		const inpPassNewConf = $('input#inpPassNewConf');
		const inpPassNew = $('input#inpPassNew');
		const mailInpEdit = $('input.mailInpEdit');
		const btnValidate = $('button.validateMailBtn');
		const contactInp = $('input#referido');

		var changeContact = true;
		var changePass = false;
		var defaultContact = '';

		var contactId;

		$(document).ready(function(){
			sizing();
		});

		$(window).resize(function(){
			sizing();
		});

		var askInt = setInterval(function(){

			checkUser(sessionStorage.getItem('currentUserInfo'));

		}, 5);


		function checkUser(usr) {
			if(usr !== undefined && usr !== null){
				clearInterval(askInt);
				usr = JSON.parse(usr);
				displayInForm(usr);
			}
		}

		passEditBtn.click(function(){
			$(this).addClass('hiddenItm');
			passInptsCont.css({visibility: 'visible'});
			changePass = true;
		})

		function displayInForm(userObj) {
			con(userObj);

			$.map(userObj[0], function(val, key){

				if(key === 'foto_perfil'){

					$(`img.${key}`).attr('src', `data:image/png;base64,${val}`);

				}else if(key === 'genero'){
					var chckBoxes = configForm.find(`input[name='${key}']`);
					chckBoxes.each(function(i, el){
						if($(el).val() === val){
							$(el).attr('checked', true);
						}
					});

				}else if(key === 'mca_okmail'){
					var value = parseInt(val);

					if(value === 1){
						adjustValBtn('y');
						mailInpEdit.css({'padding-right': '5px !important'});
						btnValidate.remove();
					}


				}else{
					configForm.find(`input[name='${key}']`).val(val);
					if(key === 'tags'){
						configForm.find(`textarea[name='${key}']`).val(val);
					}

					if(key === 'invitado_por' && val === 'Sin invitación'){
						configForm.find(`input[name='${key}']`).removeAttr('readonly');
						defaultContact = val;
					}
				}

			});
		}

		$(document).on('click', 'li.posibleFriend', function(e){
			contactId = $(e).find('span.friendId').text();
			contactId = parseInt(contactId);
		});

		configForm.submit(function(e){
			e.preventDefault();

			var data = $(this).serializeArray();

			con(data);

			var dataForFullAct = {};
			var dataForChangePass = {};

			data.forEach(function(itm, idx){

				if(itm.name === 'invitado_por' && changeContact){
					var contactVal = contactInp.val();

					(contactVal === defaultContact) ? changeContactProcess(contactId, contactVal) : null;
				
				}else if(itm.name === 'actual' || itm.name === 'nueva' || itm.name === 'nuevaConf'){
					con(itm.value);
				}

				/*$.map(itm, function(val, key){

				});*/
			});



			//sendPostToGet(, , 'usrFullEdit')
		});

		function changeContactProcess(id, name) {
			var theId = parseInt(id);
			sessionStorage.setItem('temptyNewContact', name.toString());
			var dataForChangeContact = {device: sessionStorage.getItem('deviceId'), user: localStorage.getItem('aUsr'), campo: 'refered', dato: id};
			//console.log('processing to send', data);
			dataForChangeContact = JSON.stringify(dataForChangeContact);
			sendPostToGet('usuario/actualizadato', dataForChangeContact, 'usrContact');

		}


		function sizing(){
			
			let outWidth = $(window).outerWidth();

			var passBtnContH = passChA.height();
			var passBtnContW = passChA.width();
			var btnW = passEditBtn.width();
			var btnH = passEditBtn.height();

			var btnTopMargin = passBtnContH/2 - btnH/2;
			var btnLeftMargin = passBtnContW/2 - btnW/2;

			//console.log(passBtnContH/2, btnH/2, btnTopMargin, 'heightR');
			//console.log(passBtnContW/2, btnW/2, btnLeftMargin, 'widthR');
			
			passEditBtn.css({
				'margin-top': btnTopMargin - 12,
				'margin-left': btnLeftMargin - 12
			});

			adjustValBtn(null)

			if(outWidth < 768){
			
				formSecondPart.removeClass('NorightP halfL').addClass('noPadding');
				formFirstPart.removeClass('NoleftP halfR').addClass('noPadding');
				adjustInputs('down');
			
			}else if(outWidth >= 768){

				formSecondPart.addClass('NorightP halfL').removeClass('noPadding');
				formFirstPart.addClass('NoleftP halfR').removeClass('noPadding');
				
				if(outWidth < 992){
					adjustInputs('down');
				}else{
					adjustInputs('up');
				}

			}



		}

		function adjustValBtn(stop) {
			if(stop === 'y'){
				changeContact = false;

			}else if(changeContact){

				var rightP = btnValidate.outerWidth();
				mailInpEdit.css({'padding-right': rightP + 4})
			}
			// body...
		}

		function adjustInputs(flag){
			if(flag === 'down'){
				inpPassNewConf.closest('div.col-md-6').removeClass('NorightP halfL').addClass('noPadding');
				inpPassNew.closest('div.col-md-6').removeClass('NoleftP halfR').addClass('noPadding');
			}else{
				inpPassNewConf.closest('div.col-md-6').addClass('NorightP halfL').removeClass('noPadding');
				inpPassNew.closest('div.col-md-6').addClass('NoleftP halfR').removeClass('noPadding');
			}
		} 

	}

});