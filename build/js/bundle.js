!function t(n,e,o){function i(a,r){if(!e[a]){if(!n[a]){var l="function"==typeof require&&require;if(!r&&l)return l(a,!0);if(s)return s(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var d=e[a]={exports:{}};n[a][0].call(d.exports,function(t){var e=n[a][1][t];return i(e?e:t)},d,d.exports,t,n,e,o)}return e[a].exports}for(var s="function"==typeof require&&require,a=0;a<o.length;a++)i(o[a]);return i}({1:[function(t,n,e){"use strict";function o(t){console.log(t)}$(function(){var t=window.location.pathname,n=[],e=t.lastIndexOf("/");if(t=t.slice(e),"/brand-modelo.html"===t){var i,s,a,r,l,c;!function(){var t=function(t){null!==t&&void 0!==t&&"nothing stored"!==t&&(clearInterval(r),n=t,e(n))},e=function(t){i=JSON.parse(t);var n=[],e=[],s=[];if(""!==i){i.forEach(function(t,e){var o=$.inArray(t.year,n,0);o===-1&&n.push(t.year)});var a=[];n.forEach(function(t,e){a[e]=[],a[e]=$.grep(i,function(t,o){return t.year===n[e]&&t.uso})}),i.forEach(function(t,n){var o=$.inArray(t.uso,e,0);o===-1&&e.push(t.uso)}),i.forEach(function(t,n){var e=$.inArray(t.tipo_catalogo,s,0);e===-1&&s.push(t.tipo_catalogo)});var r=[];a.forEach(function(t,n){r[n]=[],e.forEach(function(o,i){r[n][i]=[],r[n][i]=$.grep(t,function(t,n){return t.uso===e[i]})})}),r.forEach(function(t,n){r[n]=$.grep(t,function(t,n){return t.length>0})});var l=[];r.forEach(function(t,n){l[n]=[],t.forEach(function(t,e){l[n][e]=[],s.forEach(function(o,i){l[n][e][i]=[],l[n][e][i]=$.grep(t,function(t,n){return t.tipo_catalogo===s[i]})})})}),l.forEach(function(t,n){t.forEach(function(t,e){l[n][e]=$.grep(t,function(t,n){return t.length>0})})}),o(r),o(l),d(a,r,l)}else c.html("No hay información sobre esta marca para mostrar")},d=function(t,n,e){c.remove(),n.forEach(function(t,n){t.forEach(function(t,n){var e=t[0].year,o=t[0].uso,i='<div class="galleryHead col-xs-12 noPadding noMargin yearFilter'+(e+o)+'">\n\t\t\t\t\t\t\t\t\t\t\t<span class="modelUse">'+o+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="modelY">'+e+"</span>\n\t\t\t\t\t\t\t\t\t\t</div>";l.append(i)})}),e.forEach(function(t,n){t.forEach(function(t,n){t.forEach(function(t,n){var e=t[0].year,o=t[0].uso,i=e+o,s=$("div.yearFilter"+i),a=t[0].tipo_catalogo,r=a;a=a.replace(/ /g,"");var l=i+a,c='<div class="galleryNeck col-xs-12 noPadding noMargin typeFilter'+(e+o+a)+'">\n\t\t\t\t\t\t                    <span class="gallNeckCarSp"></span>\n\t\t\t\t\t\t                    <span class="gallNeckCarTxt">'+r+'</span>\n\t\t\t\t\t\t                </div>\n\t\t\t\t\t\t                <div class="col-xs-12 noPadding noMargin">\n\t\t\t\t\t\t                    <div class="row-fluid noPadding noMargin childHeight modelBox'+(e+o+a)+'">\n\t\t\t\t\t\t                        \n\t\t\t\t\t\t                    </div>\n\t\t\t\t\t\t                </div>';s.after(c),t.forEach(function(t,n){var e=$("div.modelBox"+l),o='<div class="col-xs-12 col-sm-4 noPadding noMargin modelItem">\n\t\t\t\t                            <img src="'+t.pic_url+'" class="img-responsive carImg"/>\n\t\t\t\t                            <div class="hoverInfo">\n\t\t\t\t                                <ul class="mDetails noPadding">\n\t\t\t\t                                  <li class="mName">'+t.name+'</li>\n\t\t\t\t                                  <li class="vName">'+t.desde+" - "+t.hasta+'</li>\n\t\t\t\t                                  <li class="yModel">'+t.year+"</li>\n\t\t\t\t                                </ul>\n\t\t\t\t                            </div>\n\t\t\t\t                        </div>";e.append(o)})})})}),f()},f=function(){var t=$("div.modelItem");t.length&&u(t)},u=function(t){var n=$(t).find("img.carImg").first(),e=$(t).find("img.carImg"),o=n.width(),i=.6309*o;e.css({height:i})},v=function(){var t=sessionStorage.getItem("currentBrandImg");s.css({"background-image":t})};$(document).ready(function(){v()}),i=[],s=$("div.headerBrandImg"),a=sessionStorage.getItem("currentBrandName"),r=setInterval(function(){var n=sessionStorage.getItem("modelsArr");t(n)},5),l=$("div.modelsSpace"),c=$("p.modelsStartTxt"),$(window).resize(function(){var t=$("div.modelItem");t.length&&u(t)})}()}})},{}],2:[function(t,n,e){"use strict";function o(t){console.log(t)}$(function(){var t=window.location.pathname,n=[],e=$("div.brandsSpace"),i=$("button#goToReg-Cat"),s=$("div.firstRow"),a=t.lastIndexOf("/");if(t=t.slice(a),i.click(function(){window.location="registro.html"}),"/catalogo-marcas.html"===t){var r;!function(){var t=function(t){null!==t&&void 0!==t&&"nothing stored"!==t&&(clearInterval(r),n=t,i(n))},i=function(t){$("p.startingText").remove(),n=JSON.parse(t);var o=n.length,i=0,a=0,r=0;o>5&&(i=Math.floor(o/5),a=o%5);for(var l=0;l<i;l++){if(0===l)for(var c=0;c<5;c++){var d='<div class="noPadding noMargin brandItem dynamicItem'+c+'">\n\t\t\t\t\t\t\t\t\t\t\t<span class="brandName">'+n[c].name+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="brandId">'+n[c].id+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<div class="backImg centerBackImg brandItmImg" style="background-image: url(\''+n[c].pic_url+"');\"></div>\n\t\t\t\t\t\t\t\t\t\t</div>";s.append(d),r++}if(l>0){var f='<div class="row-fluid noPadding noMargin brandCatRow dynamicRow'+l+'"></div>';e.append(f);for(var u=$("div.dynamicRow"+l),c=0;c<5;c++){var d='<div class="noPadding noMargin brandItem dynamicItem'+r+'">\n\t\t\t\t\t\t\t\t\t\t\t<span class="brandName">'+n[r].name+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="brandId">'+n[r].id+'</span>\n\t\t\t\t\t\t\t\t\t\t\t<div class="backImg centerBackImg brandItmImg" style="background-image: url(\''+n[r].pic_url+"');\"></div>\n\t\t\t\t\t\t\t\t\t\t</div>";u.append(d),r++}}}if(a>0){var v=i+1,f='<div class="row-fluid noPadding noMargin brandCatRow dynamicRow'+v+'"></div>';e.append(f);for(var u=$("div.dynamicRow"+v),m=0;m<a;m++){var d='<div class="noPadding noMargin brandItem dynamicItem'+r+'">\n\t\t\t\t\t\t\t\t\t\t<span class="brandName">'+n[r].name+'</span>\n\t\t\t\t\t\t\t\t\t\t<span class="brandId">'+n[r].id+'</span>\n\t\t\t\t\t\t\t\t\t\t<div class="backImg centerBackImg brandItmImg" style="background-image: url(\''+n[r].pic_url+"');\"></div>\n\t\t\t\t\t\t\t\t\t</div>";u.append(d),r++}}},a=function(t){var n=parseInt(t),e=[],i=sessionStorage.getItem("deviceId");if(void 0!==i&&null!==i&&n){var s={device:i,brandId:n};s=JSON.stringify(s),o(s),$.post("https://vrummapp.net/ws/v2/catalogo/getmodelos",s).then(function(t){o(t),1===t.estado&&(e=t.mensaje.rs,e=JSON.stringify(e),sessionStorage.setItem("modelsArr",e))}).fail(function(t){o(t)})}};console.log("hello from brands again"),r=setInterval(function(){var n=sessionStorage.getItem("catalogBrands");t(n)},5),$(document).on("click","div.brandItem",function(){var t=$(this).find("span.brandId").html(),n=$(this).find("span.brandName").html(),e=$(this).find("div.brandItmImg").css("background-image");void 0!==t&&null!==t?(sessionStorage.setItem("currentBrandAutos",t.toString()),void 0!==e&&null!==e&&sessionStorage.setItem("currentBrandImg",e),void 0!==n&&null!==n&&sessionStorage.setItem("currentBrandName",n),a(t),window.location="brand-modelo.html"):sessionStorage.setItem("currentBrandAutos","nothing stored")})}()}})},{}],3:[function(t,n,e){"use strict";$(function(){function t(){i.next("label#referido-error").css({display:"none"})}function n(t){if(e(),t.length>0){t=t.replace(/ /g,"");var n=JSON.stringify({abuscar:t});$.post("https://vrummapp.net/ws/v2/usuario/buscarqtinv",n).then(function(t){o(t)}).fail(function(t){o("noOne")})}}function e(){var t='<li class="posibleFriend noFriends regInputs"><span class="psFrName"></span><span class="psFrAlias">Nadie con ese nombre </span> </li>';$("li.posibleFriend").each(function(t,n){t>0&&n.remove()}),i.val().length>0&&s.append(t);var n=s.children("li").length;s.animate({height:25*n},20)}function o(t){var n=[],e=s.children("li"),o=[];$.map(e,function(t,n){var e=$(t).find("span.friendId").html();o.push(e)}),"noOne"!==t&&(n=t.mensaje.rs,n.forEach(function(t,n){var e='<li class="posibleFriend regInputs">\n\t\t\t\t\t\t\t\t\t<span class="psFrName">'+t.full_name+'</span>\n\t\t\t\t\t\t\t\t\t<span class="friendId">'+t.id+'</span>\n\t\t\t\t\t\t\t\t\t<span class="psFrAlias">'+t.alias+"</span>\n\t\t\t\t\t\t\t\t</li>";if($("li.noFriends")&&$("li.noFriends").remove(),t.id.length>0){var i=parseInt(t.id),a=t.id.toString(),r=o.indexOf(i),l=o.indexOf(a);l===-1&&r===-1&&s.append(e)}}));var e=s.children("li").length;s.animate({height:25*e},20)}var i=$("input#referido"),s=$("ul.posibleFriendsList"),a=$("div.errorFriendNick");$(document).ready(function(){s.css({height:0,border:0,width:380})}),i.on("keyup",function(o){var i=$(this).val();8===o.which&&(setTimeout(t,5),e()),i.length>0&&n(i)}),i.focus(function(){var o=$(this).val();o.length>0?n(o):e(),setTimeout(t,5),a.css({display:"none"});var i=s.children("li").length;s.animate({height:25*i},20)}).blur(function(){setTimeout(t,5),setTimeout(function(){s.animate({height:0},20)},190)}),$(document).on("click","li.posibleFriend",function(){var t=($(this).children("span.friendId").html(),$(this).children("span.psFrAlias").html());void 0!==t&&i.val(t)})})},{}],4:[function(t,n,e){"use strict";$(function(){function t(){var t=$(window).width();t<420?(v.hide(),f.removeClass("col-xs-2").addClass("col-xs-3"),u.removeClass("col-xs-2").addClass("col-xs-3")):(f.addClass("col-xs-2").removeClass("col-xs-3"),v.show(),u.addClass("col-xs-2").removeClass("col-xs-3"))}function n(){var t=a.width(),n=t/2+20;a.css({height:t}),d.height(n),e(t)}function e(t){var n=s.children(),e=0;n.each(function(t,n){1!==t&&(e+=$(n).height())}),s.height(e-6);var o=$(window).width();l.css({top:-(t/2)+"px"}),c.css({top:-(t+6)+"px"}),o>420&&o<767.5?(a.removeClass("col-xs-4").addClass("col-xs-3"),r.removeClass("col-xs-7").addClass("col-xs-8"),f.removeClass("col-xs-offset-5").addClass("col-xs-offset-4"),v.removeClass("col-xs-offset-1").addClass("col-xs-offset-2")):o<420&&(a.removeClass("col-xs-3").addClass("col-xs-4"),r.addClass("col-xs-7").removeClass("col-xs-8"),f.addClass("col-xs-offset-5").removeClass("col-xs-offset-4"),v.addClass("col-xs-offset-1").removeClass("col-xs-offset-2"))}function o(t){console.log(t)}function i(){var t=$(window).width();o(t),t<481?m.addClass("col-xs-12").removeClass("col-xs-6"):m.removeClass("col-xs-12").addClass("col-xs-6"),t<975?(N.forEach(function(t,n){$.map(y,function(e,o){n<=1?t.removeClass(e).css({padding:"0 0 6.5px 0"}):t.removeClass(e).css({padding:"6.5px 0 0 0"})})}),S.addClass("NoleftP halfR").removeClass("NorightP"),w.css({height:"100%"}).addClass("NorightP halfL"),t<880?b.css({width:"387",left:"-6%"}):b.css({width:"459",left:"0"})):t>=975&&(N.forEach(function(t,n){$.map(y,function(n,e){t.addClass(n).css({"padding-top":0,"padding-bottom":0})})}),S.removeClass("NoleftP halfR butVertHalf").css({"padding-top":"7.5px","padding-bottom":"7.5px"}).addClass("NorightP halfL"),w.css({height:"auto"}).removeClass("NorightP halfL"),b.closest("div").css({"text-align":"center"}),b.css({width:"459",left:"0"}),t>1070&&t<1278?(b.css({width:"535"}),x.removeClass("col-lg-5 col-lg-offset-1")):t>1278&&(x.addClass("col-lg-5 col-lg-offset-1").removeClass("col-lg-offset-2 col-lg-4"),t<1472?x.removeClass("col-lg-offset-2 col-lg-4").addClass("col-lg-offset-1 col-lg-5"):t>1472&&x.removeClass("col-lg-offset-1 col-lg-5").addClass("col-lg-offset-2 col-lg-4")))}var s=$("header.p-header"),a=$("div.p-profilePhoto"),r=$("div.p-profileInfo"),l=$("div.p-profileInfoCont"),c=$("div.p-profActDetCont"),d=$("div.garagaInfoDetails"),f=$("div.garageCarsCounter"),u=$("div.garageShareCounter"),v=$("div.membershipDateCounter"),m=$("div.garageImgCont"),g=$("#inputPassword").closest("div.col-md-6"),p=$("#inputPassword2").closest("div.col-md-6"),h=$("#inputPaterno").closest("div.col-md-6"),I=$("#inputMaterno").closest("div.col-md-6"),b=$("img.sideImage"),x=$("div.sideImageCont"),y=["NorightP","NoleftP"],S=$("#r-fileInputGrp"),w=$("#r-textACont"),C=($("#registrationTitle"),$("div.errorLogin")),k=$("input#l-pass"),T=$("input#l-email");$("#simInputsCont");T.focus(function(){"block"===C.css("display")&&C.css({display:"none"})}),k.focus(function(){"block"===C.css("display")&&C.css({display:"none"})});var N=[g,h,p,I];$(document).ready(function(){e(a.width()),n(),t(),i()}),$(window).resize(function(){e(a.width()),n(),t();var o=$(window).width();console.log(o),i()})})},{}],5:[function(t,n,e){"use strict";var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};$(function(){function t(){var t=window.location.pathname;if("/pages/perfil.html"===t){n();var e=sessionStorage.getItem("currentUser");null!==e&&void 0!==e&&$(".fullName").html(e)}else"/pages/catalogo-marcas.html"===t?n():(sessionStorage.removeItem("activeSession"),sessionStorage.removeItem("currentUser"))}function n(){var t="",n=sessionStorage.getItem("deviceId");sessionStorage.removeItem("nickGood"),sessionStorage.removeItem("mailGood"),null!==n&&void 0!==n?(t=n,e("el device id fue el mismo")):(e("el device id no fue el mismo"),r(),e(t))}function e(t){console.log(t)}function i(t){var n={},e=l(),o=t,i=["device","type","serie","os"],a={device:e},r={type:"web"},c={serie:e},d=[];void 0===o?o={os:"noAccesible"}:(o={os:o},d=[a,r,c,o]),0!==d.length&&(i.forEach(function(t,e){n[t]=d[e][t]}),n=JSON.stringify(n),$.post("https://vrummapp.net/ws/v2/acceso/getdevice",n).then(function(t){if(1===t.estado){var n=t.mensaje.rs[0].id;s(n)}}).fail(function(t){console.log(t)}))}function s(t){return 0===y?(x=t.toString(),y++,void sessionStorage.setItem("deviceId",x)):x}function a(t){S=t.value,i(S)}function r(){(new Fingerprint2).get(function(t,n){l(t),a(n[0])})}function l(t){return 0===w?(I=t,void w++):I}function c(t){return 0===b?(h=t,void b++):h}function d(t){return 0===C?(p=t,void C++):p}function f(){var t=sessionStorage.getItem("location");void 0!==t&&null!==t?c(t):navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(t){var n=t.coords.latitude,e=t.coords.longitude;g=n+", "+e,c(g),sessionStorage.setItem("location",g)})}function u(t){var n=B.children("li");return $.map(n,function(e,o){var i=$(n[o]).find("span.psFrAlias").html(),s=$(n[o]).find("span.friendId").html();if(i===t)return void 0!==s&&null!==s&&s.length>0&&(s=s.toString(),sessionStorage.setItem("id",s)),!0})}function v(t){var n={},e=s(),o=e,i={device:o},a=c(),r=d();if(a=void 0===a?{geoloc:"noAccesible"}:{geoloc:a},r=void 0===r?{photo:"profileDafault.png"}:{photo:r},void 0!==t&&t.length>0){t.unshift(i,a,r),$.each(t,function(e,o){if(e<=2)for(var i in o)n[i]=t[e][i];else"refered_by"===o.name?n[o.name]=sessionStorage.getItem("id"):"tags"===o.name?n[o.name]=o.value+", "+n.alias+", "+n.email+", "+n.nombre:n[o.name]=o.value});var l=JSON.stringify(n),f=sessionStorage.getItem("mailGood"),u=sessionStorage.getItem("nickGood");if("yes"===f&&"yes"===u)m(l);else{var v="<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";M.before(v)}}}function m(t){$.post("https://vrummapp.net/ws/v2/usuario/registro",t).then(function(t){console.log(t);var n=T.val().toString();sessionStorage.setItem("currentUser",n),sessionStorage.setItem("activeSession","yes"),window.location="perfil.html"}).fail(function(t){console.log(t)})}t();var g,p,h,I=0,b=0,x=0,y=0,S="",w=0,C=0,k="",T=$("#alias"),N=$("button#goToLogin"),P=$("input#referido"),B=$("ul.posibleFriendsList"),O=$("div.errorFriendNick"),M=$("button.registrarbtn");N.click(function(){window.location="../index.html"}),$(document).ready(function(){$(this).scrollTop(0),r(),f()});var E=$("form#registro");$("input.genderM"),$("input.genderF");E.on("submit",function(t){t.preventDefault();var n=$(this).serializeArray(),e=P.val();if(e.length>0&&"Sin invitación"!==e){var o=u(e);o.length>0&&o[0]===!0?v(n):O.toggle()}else"Sin invitación"===e&&v(n)});var k;$("#image_file").on("change",function(){if($(this)[0].files.length>0){console.log(o($(this)[0].files),$(this)[0].files),k=$(this)[0].files[0];var t=$(this)[0].files[0].name;d(t)}else console.log("no hay archivos")})})},{}],6:[function(t,n,e){"use strict";function o(t){console.log(t)}$(function(){function t(){$.post("https://vrummapp.net/ws/v2/catalogo/getmarcas").then(function(t){if(1===t.estado){var n=JSON.stringify(t.mensaje.rs);sessionStorage.setItem("catalogBrands",n)}else sessionStorage.setItem("catalogBrands","nothing stored")}).fail(function(t){o(t)})}function n(){r(),g.disNone(),p.an().remove(),m.an().remove(),b.disNone(),y.disNone(),S.disBlock(),x.disBlock(),k.disBlock(),w.css({display:"flex"}),C.addClass("NorightM halfML"),I=!0}function e(){I=!1,w.disBlock(),h.after(p),g.after(m),x.disNone(),b.disBlock(),S.disNone(),y.disBlock(),p.an(),m.an().click(n),k.disNone(),C.removeClass("NorightM halfML")}function i(t){var n=JSON.stringify(t);$.post("https://vrummapp.net/ws/v2/usuario/login",n).then(function(t){if(1===t.estado){var n=d.val().toString(),e=t.mensaje.rs;sessionStorage.setItem("currentUser",n),sessionStorage.setItem("currentUserId",e),sessionStorage.setItem("activeSession","yes"),window.location="pages/perfil.html"}else a(t)}).fail(function(t){console.log(t)})}function s(t,n){$.post("https://vrummapp.net/ws/v2/usuario/getpasswd",t).then(function(t){2===t.estado&&(null===n?l():T.hide())}).fail(function(t){console.log(t)})}function a(t){g.css({display:"block"}),d.val(""),f.val("")}function r(){var t=C.prev("p#nicknameText");t.remove()}function l(){T.css({display:"flex"});var t=sessionStorage.getItem("deviceId");t=t.toString();var n=d.val(),e=sessionStorage.getItem("location"),o={device:t,mail:n,geoloc:e};P.click(function(){o=JSON.stringify(o);var t=sessionStorage.getItem("mailGood");"yes"===t&&s(o,"etw")})}var c=$("#login"),d=$("#l-email"),f=$("#l-pass"),u=$("button#goToReg"),v=$("button#goToCatBrand"),m=$("div.passRecover"),g=$("div.errorLogin"),p=$("div#l-passCont"),h=$("div#r-emailInputGrp"),I=!1,b=$("span#normalText"),x=$("span#recoverPassTxt"),y=$("span#subBtnNrTxt"),S=$("span#subBtnRecTxt"),w=$("div.loginBtnCont"),C=$("button.registrarbtn"),k=$("button.cancelarBtn"),T=$("div.passModalCont"),N=$("span.closeModal"),P=$("div.resendPart");$("span.mailRecover");d.focus(r),f.focus(r),m.click(n),k.click(e),u.click(function(){t(),window.location="pages/registro.html"}),N.click(function(){T.hide()}),v.click(function(){window.location="pages/catalogo-marcas.html"}),c.submit(function(t){t.preventDefault();var n=sessionStorage.getItem("deviceId");if(n=n.toString(),I){e();var o=d.val(),a=sessionStorage.getItem("location"),l={device:n,mail:o,geoloc:a};l=JSON.stringify(l);var c=sessionStorage.getItem("mailGood");"yes"===c?s(l,null):o.length>0&&setTimeout(function(){var t=sessionStorage.getItem("mailGood");if("yes"===t)s(l,null);else{var n="<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";C.before(n)}},300)}else{var f=$(this).serializeArray(),u={device:n};$.map(f,function(t,n){u[t.name]=t.value});var c=sessionStorage.getItem("mailGood");if("yes"===c)i(u);else{r();var v="<p id='nicknameText' class='badText'>Te falto algún dato o escribiste algo mal</p>";C.before(v)}}}),$.fn.disNone=function(){return this.css({display:"none"}),this},$.fn.disBlock=function(){return this.css({display:"block"}),this},$.fn.an=function(){return this.animate({height:"toggle"},200),this}})},{}],7:[function(t,n,e){"use strict";$(function(){var t=$("input#inputEmail"),n=$("#l-email"),e=$("input#inputPassword"),o=$("div.passRecover"),i=$("button.registrarbtn.loginBtn"),s=$("input#inputPassword2");$.fn.validatePass=function(){function t(t){var n=e.val();if(n.length>0&&n!==t){var o="<p id='passConfText' class='badText'>Las contraseñas no coinciden</p>";s.after(o)}}return $(this).keyup(function(){var t=$("p#passConfText");t.remove()}),$(this).focus(function(){var t=$("p#passConfText");t.remove()}).blur(function(){var n=$(this).val();t(n)}),this},s.validatePass(),$.fn.validateMail=function(t,n){function e(t){if(t.length>0){var n=sessionStorage.getItem("deviceId");n=n.toString();var e=JSON.stringify({email:t,device:n});$.post("https://vrummapp.net/ws/v2/usuario/validacorreo",e).then(function(t){2===t.estado?s(t):1===t.estado&&a(t)}).fail(function(t){s("noOne")})}}function s(e){var o=t.val();if("noOne"!==e&&"l"===n){var i="<p id='mailValText' class='goodText'>"+o+" es un buen mail</p>";sessionStorage.setItem("mailGood","yes"),r(),t.after(i)}else if("noOne"===e){$("p#mailValText");r(),sessionStorage.setItem("mailGood","no")}else if("noOne"!==e&&"r"===n){sessionStorage.setItem("mailGood","no");var s="<p id='mailValText' class='badText'>"+o+" es un mail que ya existe</p>";r(),t.after(s)}}function a(e){var o=t.val();if("r"===n){var i="<p id='mailValText' class='goodText'>"+o+" es un buen mail</p>";sessionStorage.setItem("mailGood","yes"),r(),t.after(i)}else if("l"===n){var s="<p id='mailValText' class='badText'>"+o+" es un mail que no existe aún</p>";sessionStorage.setItem("mailGood","no"),r(),t.after(s)}}function r(){var t=$("p#mailValText");t.remove()}return $(document).ready(function(){setTimeout(function(){var n=$(t).val();void 0!==n&&n.length>0&&e(n)},300)}),o.click(function(){var n=$(t).val();void 0!==n&&n.length>0&&e(n)}),i.click(function(){var n=$(t).val();void 0!==n&&n.length>0&&e(n)}),$(this).keyup(function(){var t=$("p#mailValText");t.remove()}),$(this).focus(function(){var t=$("p#mailValText");t.remove();var n=$(this).val();n.length>0&&e(n)}).blur(function(){var t=$(this).val();e(t)}),this},t.validateMail(t,"r"),n.validateMail(n,"l")})},{}],8:[function(t,n,e){"use strict";$(function(){function t(t){console.log(t)}var n=$("input#alias");$.fn.nicknameValidation=function(n){function e(n){if(n.length>0){var e=JSON.stringify({nickname:n});$.post("https://vrummapp.net/ws/v2/usuario/validanickname",e).then(function(n){t(n),2===n.estado?i(n):1===n.estado&&o(n)}).fail(function(t){o("noOne")})}}function o(t){var e=n.val();if("noOne"!==t){var o="<p id='nicknameText' class='goodText'>"+e+" es un nickname bueno</p>";sessionStorage.setItem("nickGood","yes"),n.after(o)}else{var i="<p id='nicknameText' class='badText'>"+e+" es un nickname que ya existe</p>";n.after(i),sessionStorage.setItem("nickGood","no")}}function i(){var t=n.val(),e="<p id='nicknameText' class='badText'>"+t+" es un nickname que ya existe</p>";sessionStorage.setItem("nickGood","no"),n.after(e)}$(this).keyup(function(){var t=$("p#nicknameText");t.remove()}),$(this).focus(function(){var t=$("p#nicknameText");t.remove()}).blur(function(){var t=$(this).val();e(t)})},n.nicknameValidation(n)})},{}],9:[function(t,n,e){"use strict";$(function(){function t(){s=!0}function n(){s=!1}var e=!0,o=$("div.passModalCont"),i=$("div.recoverPassModal"),s=!1;i.mouseleave(function(){n(),setTimeout(function(){e=!0},3)}),i.mousemove(function(){t()}),i.mouseenter(function(){t()}),o.mouseleave(function(){t(),e=!0}),o.mouseenter(function(){e&&(n(),e=!1)}),o.click(function(){setTimeout(function(){s||o.hide()},210)})})},{}]},{},[5,4,3,8,7,1,6,2,9]);