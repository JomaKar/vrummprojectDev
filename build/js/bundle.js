!function n(e,i,t){function o(a,r){if(!i[a]){if(!e[a]){var c="function"==typeof require&&require;if(!r&&c)return c(a,!0);if(s)return s(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=i[a]={exports:{}};e[a][0].call(u.exports,function(n){var i=e[a][1][n];return o(i?i:n)},u,u.exports,n,e,i,t)}return i[a].exports}for(var s="function"==typeof require&&require,a=0;a<t.length;a++)o(t[a]);return o}({1:[function(n,e,i){$(function(){function n(){t=s.find("li"),t.one("click",function(){var n=$(this).children("span.friendId").html(),e=$(this).children("span.psFrAlias").html();void 0!==e&&(o.val(e),void 0!==n&&(n=n.toString(),sessionStorage.setItem("id",n)))})}function e(n){var e=JSON.stringify({abuscar:n});$.post("https://vrummapp.net/ws/v2/usuario/buscarqtinv",e).then(function(n){i(n)}).fail(function(n){i("noOne")})}function i(e){var i=[];if("noOne"!==e)i=e.mensaje.rs,i.forEach(function(n,e){var i='<li class="posibleFriend regInputs"><span class="psFrName">'+n.full_name+'</span><span class="friendId">'+n.id+'</span><span class="psFrAlias"> '+n.alias+" </span> </li>";$("li.noFriends")&&$("li.noFriends").remove(),s.append(i)});else{var t='<li class="posibleFriend noFriends regInputs"><span class="psFrName"></span><span class="psFrAlias"> Nadie con ese nombre </span> </li>';$("li.posibleFriend").each(function(n,e){n>0&&e.remove()}),o.val().length>0&&s.append(t)}n();var a=s.children("li").length;s.animate({height:25*a,border:"1px solid #4c4c4c"},300)}var t,o=$("input#referido"),s=$("ul.posibleFriendsList");$(document).ready(function(){s.css({height:0,border:0})}),o.on("keyup",function(n){var i=$(this).val();e(i)}),o.focus(function(){var e=s.children("li").length;s.animate({height:25*e,border:"1px solid #4c4c4c"},200),n()}).blur(function(){s.animate({height:0,border:0},300)}),o.click(function(n){$(n.target).next("label#referido-error").css({display:"none"})})})},{}],2:[function(n,e,i){$(function(){function n(){var n=t.css("width");t.css({height:n}),e(n)}function e(n){var e=$(window).width();o.css({top:-(n/2)+"px"}),e>420&&e<767.5?t.removeClass("col-xs-4").addClass("col-xs-3"):e<420&&t.removeClass("col-xs-3").addClass("col-xs-4")}function i(){var n=$(window).width();n<975?(v.forEach(function(n,e){$.map(u,function(i,t){e<=1?n.removeClass(i).addClass("noPadding butVertHalf"):n.removeClass(i).addClass("noPadding")})}),f.addClass("NoleftP halfR").removeClass("NorightP"),d.css({height:"100%"}).addClass("NorightP halfL"),l.css({width:"108%",left:"-6%",top:"11%"})):n>975&&(v.forEach(function(n,e){$.map(u,function(e,i){n.removeClass("noPadding butVertHalf").addClass(e)})}),f.removeClass("NoleftP halfR butVertHalf").css({"padding-top":"7.5px","padding-bottom":"7.5px"}).addClass("NorightP"),d.css({height:"auto"}).removeClass("NorightP halfL"),l.css({width:"98%",left:"0",top:"5%"}))}var t=$("div.p-profilePhoto"),o=$("div.p-profileInfoCont"),s=$("#inputPassword").closest("div.col-md-6"),a=$("#inputPassword2").closest("div.col-md-6"),r=$("#inputPaterno").closest("div.col-md-6"),c=$("#inputMaterno").closest("div.col-md-6"),l=$("img.sideImage"),u=["NorightP","NoleftP"],f=$("#r-fileInputGrp"),d=$("#r-textACont"),v=($("#registrationTitle"),[s,r,a,c]);$(document).ready(function(){e(t.width()),n(),i()}),$(window).resize(function(){e(t.width()),n(),i()})})},{}],3:[function(n,e,i){$(function(){function n(n){var i={},t=o(),s=n,a=["device","type","serie","os"],r={device:t},c={type:"web"},l={serie:t},u=[];void 0===s?s={os:"noAccesible"}:(s={os:s},u=[r,c,l,s]),0!==u.length&&(a.forEach(function(n,e){i[n]=u[e][n]}),i=JSON.stringify(i),$.post("https://vrummapp.net/ws/v2/acceso/getdevice",i).then(function(n){var i=n.mensaje.rs[0].id;console.log(i),e(i)}).fail(function(n){console.log(n)}))}function e(n){return 0===g?(m=n,void g++):m}function i(e){h=e.value,n(h)}function t(){(new Fingerprint2).get(function(n,e){o(n),i(e[0])})}function o(n){return 0===w?(v=n,void w++):v}function s(n){return 0===p?(d=n,void p++):d}function a(n){return 0===x?(f=n,void x++):f}function r(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(n){var e=n.coords.latitude,i=n.coords.longitude;u=e+", "+i,s(u)})}function c(n){var i={},t=e(),o=t,r={device:o},c=s(),u=a();if(c=void 0===c?{geoloc:"noAccesible"}:{geoloc:c},u=void 0===u?{photo:"profileDafault.png"}:{photo:u},void 0!==n&&n.length>0){n.unshift(r,c,u),$.each(n,function(e,t){if(e<=2)for(var o in t)i[o]=n[e][o];else"refered_by"===t.name?i[t.name]=sessionStorage.getItem("id"):i[t.name]=t.value});var f=JSON.stringify(i);l(f)}}function l(n){$.post("https://vrummapp.net/ws/v2/usuario/registro",n).then(function(n){console.log(n);var i=b.val().toString(),t=e();t=t.toString(),sessionStorage.setItem("currentUser",i),sessionStorage.setItem("deviceId",t),sessionStorage.setItem("activeSession","yes"),window.location="../index.html"}).fail(function(n){console.log(n)})}var u,f,d,v=0,p=0,m=0,g=0,h="",w=0,x=0,b=$("#alias");$(document).ready(function(){t(),r()});var y=$("form#registro");$("input.genderM"),$("input.genderF");y.on("submit",function(n){n.preventDefault();var e=$(this).serializeArray();c(e)}),$("#image_file").on("change",function(){if($(this)[0].files.length>0){var n=$(this)[0].files[0].name;a(n)}else console.log("no hay archivos")})})},{}],4:[function(n,e,i){$(function(){function n(n){var i={},t=o(),s=n,a=["device","type","serie","os"],r={device:t},c={type:"web"},l={serie:t},u=[];void 0===s?s={os:"noAccesible"}:(s={os:s},u=[r,c,l,s]),0!==u.length&&(a.forEach(function(n,e){i[n]=u[e][n]}),i=JSON.stringify(i),console.log(i),$.post("https://vrummapp.net/ws/v2/acceso/getdevice",i).then(function(n){var i=n.mensaje.rs[0].id;console.log(i),e(i)}).fail(function(n){console.log(n)}))}function e(n){return 0===l?(c=n,void l++):c}function i(e){u=e.value,n(u)}function t(){(new Fingerprint2).get(function(n,e){o(n),i(e[0])})}function o(n){return 0===f?(r=n,void f++):r}function s(n){var i=JSON.stringify(n);$.post("https://vrummapp.net/ws/v2/usuario/login",i).then(function(n){console.log(n);var i=d.val().toString(),t=e();t=t.toString();var o=n.mensaje.rs;sessionStorage.setItem("currentUser",i),sessionStorage.setItem("deviceId",t),sessionStorage.setItem("currentUserId",o),sessionStorage.setItem("activeSession","yes"),window.location="../index.html"}).fail(function(n){console.log(n)})}$(document).ready(function(){t()});var a=$("#login"),r=0,c=0,l=0,u="",f=0,d=$("#l-email");a.submit(function(n){n.preventDefault();var i=$(this).serializeArray(),t=e();t=t.toString();var o={device:t};$.map(i,function(n,e){o[n.name]=n.value}),s(o)})})},{}],5:[function(n,e,i){$(function(){function n(n){var e=r.val();if(e.length>0&&e!==n){var i="<p id='passConfText' class='badText'>Las contraseñas no coinciden</p>";c.after(i)}}function e(){(new Fingerprint2).get(function(n,e){i(n)})}function i(n){return 0===u?(l=n,void u++):l}function t(n){if(n.length>0){var e=i(),t=[e.slice(0,8),e.slice(8,12),e.slice(12,16),e.slice(16,20),e.slice(20)],a=t.join("-"),r=JSON.stringify({email:n,device:a});$.post("https://vrummapp.net/ws/v2/usuario/validacorreo",r).then(function(n){o(n)}).fail(function(n){s(n),o("noOne")})}}function o(n){var e=a.val();if("noOne"!==n){var i="<p id='mailValText' class='goodText'>"+e+" es un buen mail</p>";a.after(i)}else{var t="<p id='mailValText' class='badText'>"+e+" es un mail incorrecto o ya existe</p>";a.after(t)}}function s(n){console.log(n)}var a=$("input#inputEmail"),r=$("input#inputPassword"),c=$("input#inputPassword2"),l=0,u=0;$(document).ready(function(){e()}),c.keyup(function(){var n=$("p#passConfText");n.remove()}),c.focus(function(){var n=$("p#passConfText");n.remove()}).blur(function(){var e=$(this).val();n(e)}),a.keyup(function(){var n=$("p#mailValText");n.remove()}),a.focus(function(){var n=$("p#mailValText");n.remove()}).blur(function(){var n=$(this).val();t(n)})})},{}],6:[function(n,e,i){$(function(){function n(n){if(n.length>0){var i=JSON.stringify({nickname:n});$.post("https://vrummapp.net/ws/v2/usuario/validanickname",i).then(function(n){e(n)}).fail(function(n){e("noOne")})}}function e(n){var e=i.val();if("noOne"!==n){var t="<p id='nicknameText' class='goodText'>"+e+" es un nickname bueno</p>";i.after(t)}else{var o="<p id='nicknameText' class='badText'>"+e+" es un nickname que ya existe</p>";i.after(o)}}var i=$("input#alias");i.keyup(function(){var n=$("p#nicknameText");n.remove()}),i.focus(function(){var n=$("p#nicknameText");n.remove()}).blur(function(){var e=$(this).val();n(e)})})},{}]},{},[3,2,1,6,5,4]);