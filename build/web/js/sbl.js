!function e(o,t,s){function r(n,i){if(!t[n]){if(!o[n]){var l="function"==typeof require&&require;if(!i&&l)return l(n,!0);if(a)return a(n,!0);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}var g=t[n]={exports:{}};o[n][0].call(g.exports,function(e){var t=o[n][1][e];return r(t?t:e)},g,g.exports,e,o,t,s)}return t[n].exports}for(var a="function"==typeof require&&require,n=0;n<s.length;n++)r(s[n]);return r}({1:[function(e,o,t){"use strict";function s(){if("/web/perfil/"!==c.myLocation&&"/web/perfil/index"!==c.myLocation&&"/web/perfil/index.html"!==c.myLocation||(null===f||void 0===f?null!==v&&void 0!==v?g.hashesExist?void 0!==g.queriesT.al&&null!==g.queriesT.al&&(v==g.queriesT.al?r(v,"al"):r(g.queriesT.al,"al")):r(v,"al"):g.hashesExist&&void 0!==g.queriesT.al&&null!==g.queriesT.al&&g.queriesT.al.length>0?r(g.queriesT.al,"al"):(0,c.navigating)("home"):null!==v&&void 0!==v&&g.hashesExist&&void 0!==g.queriesT.al&&null!==g.queriesT.al&&(v==g.queriesT.al?null:r(g.queriesT.al,"al")),null!==I&&void 0!==I&&"nothing stored"!==I&&null!==v&&void 0!==v&&g.hashesExist&&void 0!==g.queriesT.al&&null!==g.queriesT.al&&(v==g.queriesT.al?null:r(g.queriesT.al,"al"))),"/web/perfil/configuracion"===c.myLocation||"/web/perfil/configuracion.html"===c.myLocation)if(null!==localStorage.getItem("aUsr")&&void 0!==localStorage.getItem("aUsr")){var e=parseInt(localStorage.getItem("aUsr"));if(null!==sessionStorage.getItem("currentUserInfo")&&void 0!==sessionStorage.getItem("currentUserInfo")){var o=JSON.parse(sessionStorage.getItem("currentUserInfo"))[0],t=parseInt(o.id);e!==t?(r(e,"id"),sessionStorage.removeItem("currentUserInfo")):null}else r(e,"id")}else null!==g.queriesT.al&&void 0!==g.queriesT.al?(0,c.navigating)("perfil/?al="+g.queriesT.al):null!==sessionStorage.getItem("currentUserAlias")&&void 0!==sessionStorage.getItem("currentUserAlias")?(0,c.navigating)("perfil/?al="+sessionStorage.getItem("currentUserAlias")):(0,c.navigating)("home");if("/web/catalogo/index.html"===c.myLocation||"/web/catalogo/index"===c.myLocation||"/web/catalogo/"===c.myLocation){var s=sessionStorage.getItem("catalogBrands");sessionStorage.removeItem("modelsArr"),null!==s&&void 0!==s&&"nothing stored"!==s||a()}if("/web/catalogo/brand-modelo.html"===c.myLocation||"/web/catalogo/brand-modelo"===c.myLocation){var d=sessionStorage.getItem("currentBrandAutos"),m=sessionStorage.getItem("modelsArr");null===d||void 0===d||"nothing store"===d?null!==m&&void 0!==m||(g.hashesExist&&g.queriesT.brdId.length>0?n(g.queriesT.brdId):(0,c.navigating)("catalogo")):null===m||void 0===m?g.hashesExist&&null!==d&&void 0!==d&&"nothing store"!==d?n(g.queriesT.brdId==d?d:g.queriesT.brdId):null!==d&&void 0!==d&&"nothing store"!==d&&n(d):g.hashesExist&&(g.queriesT.brdId==d?null:n(g.queriesT.brdId))}if("/web/catalogo/modelo-versiones.html"===c.myLocation||"/web/catalogo/modelo-versiones"===c.myLocation||"/web/catalogo/specific-version.html"===c.myLocation||"/web/catalogo/specific-version"===c.myLocation){var u="/web/catalogo/specific-version.html"!==c.myLocation&&"/web/catalogo/specific-version"!==c.myLocation,S=sessionStorage.getItem("versionsArr"),p=sessionStorage.getItem("versionsPhotos"),h=(g.queriesT.al,localStorage.getItem("modelId"));if(null===h||void 0===h||"nothing store"===h)if(g.hashesExist)if(g.queriesT.mdlId.length>0){var y=g.queriesT.mdlId;null!==S&&void 0!==S||i(y),null!==p&&void 0!==p||u&&l(y)}else(0,c.navigating)("catalogo/brand-modelo");else(0,c.navigating)("catalogo/brand-modelo");else if(null===S||void 0===S||null===p||void 0===p)if(g.hashesExist)if(console.log("hashesExist"),g.queriesT.mdlId.length>0){var b=g.queriesT.mdlId;u?h==b?(i(h),l(h)):(i(b),l(b)):i(h==b?h:b)}else u?(i(h),l(h)):i(h);else u?(i(h),l(h)):i(h);else if(g.hashesExist)if(g.queriesT.mdlId.length>0){var b=g.queriesT.mdlId;h==b?(i(h),l(h)):(i(b),l(b))}else u?(i(h),l(h)):i(h);else u?(i(h),l(h)):i(h)}}function r(e,o){var t="al"===o?{alias:e}:{idUsr:e};if(console.log(localStorage.getItem("visitedUsrs"),e),"al"===o&&null!==localStorage.getItem("visitedUsrs")&&void 0!==localStorage.getItem("visitedUsrs")){var s=JSON.parse(localStorage.getItem("visitedUsrs"));s.forEach(function(o,t){if(e==o.al||e==o.id){var s=sessionStorage.getItem("deviceId");if(void 0!==s&&null!==s){var r={idUsr:o.id,device:sessionStorage.getItem("deviceId")};r=JSON.stringify(r),(0,d.sendPostToGet)("garage/listar",r,"usrGrg")}}})}t=JSON.stringify(t),(0,d.sendPostToGet)("usuario/info",t,"usrInfoToGet")}function a(){(0,d.sendPostToGet)("catalogo/getmarcas",null,"brands")}function n(e){var o=parseInt(e),t=sessionStorage.getItem("deviceId");if(void 0!==t&&null!==t&&o){console.log("without waiting");var s={device:t,brandId:o};s=JSON.stringify(s),(0,d.sendPostToGet)("catalogo/getmodelos",s,"mdls")}else setTimeout(function(){s={device:sessionStorage.getItem("deviceId"),brandId:o},(0,d.sendPostToGet)("catalogo/getmodelos",JSON.stringify(s),"mdls")},700)}function i(e){var o={};e=parseInt(e);var t=sessionStorage.getItem("deviceId");sessionStorage.getItem("currentUserId");void 0!==t&&null!==t?(o=null!==localStorage.getItem("aUsr")&&void 0!==localStorage.getItem("aUsr")?{device:t,modelId:e,user:localStorage.getItem("aUsr")}:{device:t,modelId:e},"/web/catalogo/modelo-versiones.html"===c.myLocation||"/web/catalogo/modelo-versiones"===c.myLocation?(0,d.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"vrsInfo"):(0,d.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"spVrsInfo")):setTimeout(function(){o=null!==localStorage.getItem("aUsr")&&void 0!==localStorage.getItem("aUsr")?{device:sessionStorage.getItem("deviceId"),modelId:e,user:localStorage.getItem("aUsr")}:{device:sessionStorage.getItem("deviceId"),modelId:e},"/web/catalogo/modelo-versiones.html"===c.myLocation||"/web/catalogo/modelo-versiones"===c.myLocation?(0,d.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"vrsInfo"):(0,d.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"spVrsInfo")},700)}function l(e){e=parseInt(e);var o=sessionStorage.getItem("deviceId"),t={};void 0!==o&&null!==o?(t={device:o,modelId:e},(0,d.sendPostToGet)("catalogo/getgaleria",JSON.stringify(t),"vrsGal")):setTimeout(function(){t={device:sessionStorage.getItem("deviceId"),modelId:e},(0,d.sendPostToGet)("catalogo/getgaleria",JSON.stringify(t),"vrsGal")},1e3)}var c=e("../scripts/commonFunc/locating.js"),g=e("../scripts/commonFunc/urlEncoder.js"),d=e("../scripts/commonFunc/httpProcesor.js"),m=e("../scripts/commonFunc/brandsImgs.js");(0,m.askBrands)(),$(document).ready(function(){$(this).scrollTop(0)});var u=(window.localStorage.getItem("activeSession"),sessionStorage.getItem("deviceId")),f=sessionStorage.getItem("currentUserInfo"),v=(sessionStorage.getItem("currentUserId"),sessionStorage.getItem("currentUserAlias")),I=sessionStorage.getItem("currentUserGarage");void 0!==u&&null!==u?s():setTimeout(function(){s()},1400),window.onbeforeunload=function(){sessionStorage.removeItem("currentUserGarage"),"/web/catalogo/brand-modelo.html"!==c.myLocation&&"/web/catalogo/brand-modelo"!==c.myLocation||sessionStorage.removeItem("modelsArr")}},{"../scripts/commonFunc/brandsImgs.js":2,"../scripts/commonFunc/httpProcesor.js":5,"../scripts/commonFunc/locating.js":6,"../scripts/commonFunc/urlEncoder.js":7}],2:[function(e,o,t){"use strict";function s(){$.post("https://vrummapp.net/ws/v2/catalogo/getmarcas").then(function(e){1===e.estado&&(a=e.mensaje.rs)})}function r(e){return $.grep(a,function(o,t){return o.id==e})}Object.defineProperty(t,"__esModule",{value:!0}),t.askBrands=s,t.theBrand=r;var a=[]},{}],3:[function(e,o,t){"use strict";function s(e){console.log(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.con=s},{}],4:[function(e,o,t){"use strict";function s(e){"login"===e&&(n.disBlock(),r.val(""),a.val(""))}Object.defineProperty(t,"__esModule",{value:!0}),t.displayErr=s;var r=(e("./locating.js"),$("#l-email")),a=$("#l-pass"),n=$("div.errorLogin");$.fn.disNone=function(){return this.css({display:"none"}),this},$.fn.disBlock=function(){return this.css({display:"block"}),this},$.fn.an=function(){return this.animate({height:"toggle"},200),this}},{"./locating.js":6}],5:[function(e,o,t){"use strict";function s(e,o,t){console.log(o,"from sendToGo processor",t);var s=localStorage.getItem("aUsrA");if("specVer"===t){var r=e.brand_id,l=e.model_id,m=e.id;a()?(0,c.navigating)("catalogo/specific-version?al="+s+"&brdId="+r+"&mdlId="+l+"&cId="+m):(0,c.navigating)("catalogo/specific-version?brdId="+r+"&mdlId="+l+"&cId="+m)}$.post("https://vrummapp.net/ws/v2/"+e,o).then(function(e){if("perfilLog"===t||"perfilLogIrgenwo"===t)if(1===e.estado){var o=e.mensaje.rs;localStorage.setItem("activeSession","yes"),"perfilLogIrgenwo"!==t?n(o,"user",!0):n(o,"user",!1),o.toString(),localStorage.setItem("aUsr",o),i("currentUserId",o)}else(0,d.con)("whatTheFuck"),(0,g.displayErr)("login");if("perfilr"===t&&1===e.estado){var o=e.mensaje.usr.id,r=e.mensaje.usr.alias,l=null!==localStorage.getItem("visitedUsrs")&&void 0!==localStorage.getItem("visitedUsrs")?JSON.parse(localStorage.getItem("visitedUsrs")):[];l.push({al:r,id:o}),l=JSON.stringify(l),localStorage.setItem("visitedUsrs",l),localStorage.setItem("aUsrA",r);var m=null!==e.mensaje.usr.foto_perfil&&void 0!==e.mensaje.usr.foto_perfil?e.mensaje.usr.foto_perfil.toString():"";m.length>0&&localStorage.setItem("aUPP",m);var u=[];u[0]=e.mensaje.usr,u=JSON.stringify(u),o.toString(),localStorage.setItem("aUsr",o),i("currentUserId",o),i("currentUserAlias",r),i("currentUserInfo",u),localStorage.setItem("activeSession","yes"),(0,c.navigating)("perfil?al="+r)}else if("brands"===t&&1===e.estado){var f=JSON.stringify(e.mensaje.rs);sessionStorage.setItem("catalogBrands",f),a()?(0,c.navigating)("catalogo/?al="+s):(0,c.navigating)("catalogo/?")}else if("mdls"===t&&1===e.estado){var v=e.mensaje.rs,I=e.mensaje.rs[0].brand_id;v=JSON.stringify(v),sessionStorage.setItem("modelsArr",v),a()?(0,c.navigating)("catalogo/brand-modelo?al="+s+"&brdId="+I):(0,c.navigating)("catalogo/brand-modelo?brdId="+I)}else if("versiones"===t&&1===e.estado){var S=e.mensaje.rs;sessionStorage.setItem("currentBrandImg",S[0].pic_marca.toString()),localStorage.setItem("modelName",S[0].model_name.toString()),S=JSON.stringify(S),sessionStorage.setItem("versionsArr",S);var I=e.mensaje.rs[0].brand_id,p=e.mensaje.rs[0].model_id;a()?(0,c.navigating)("catalogo/modelo-versiones?al="+s+"&brdId="+I+"&mdlId="+p):(0,c.navigating)("catalogo/modelo-versiones?brdId="+I+"&mdlId="+p)}}).fail(function(e){console.log(e)})}function r(e,o,t){console.log(o,"from sendToGet processor",t);var s=o?o:"";$.post("https://vrummapp.net/ws/v2/"+e,s).then(function(e){if("usrInfoToGetR"===t||"usrInfoToGo"===t){if(1===e.estado){var o=[];o[0]=e.mensaje.rs[0];var r=null!==o[0].foto_perfil&&void 0!==o[0].foto_perfil?o[0].foto_perfil.toString():"";r.length>0&&localStorage.setItem("aUPP",r);var a=o[0].alias,n=o[0].id,g=(sessionStorage.getItem("deviceId"),-1),d=null!==localStorage.getItem("visitedUsrs")&&void 0!==localStorage.getItem("visitedUsrs")?JSON.parse(localStorage.getItem("visitedUsrs")):[];if(d.forEach(function(e,o){var t=parseInt(e.id);t===n&&(g=o)}),g===-1&&(d.push({al:a,id:n}),d=JSON.stringify(d),localStorage.setItem("visitedUsrs",d)),o=JSON.stringify(o),localStorage.setItem("aUsrA",a),i("currentUserAlias",a),i("currentUserInfo",o),"/web/perfil/"!==c.myLocation&&"/web/perfil/index"!==c.myLocation&&"/web/perfil/index.html"!==c.myLocation)if("usrInfoToGetR"===t){var f=window.location.href,v=f.slice(f.indexOf("?")+1);window.location=window.location.pathname+"?al="+a+"&"+v}else(0,c.navigating)("perfil?al="+a)}}else if(1===e.estado&&"usrInfoToGet"===t){var o=[];o[0]=e.mensaje.rs[0];var a=o[0].alias,n=o[0].id,g=-1,d=null!==localStorage.getItem("visitedUsrs")&&void 0!==localStorage.getItem("visitedUsrs")?JSON.parse(localStorage.getItem("visitedUsrs")):[];d.forEach(function(e,o){var t=parseInt(e.id);t===n&&(g=o)}),g===-1&&(d.push({al:a,id:n}),d=JSON.stringify(d),localStorage.setItem("visitedUsrs",d)),i("currentUserAlias",a.toString()),i("currentUserId",n.toString()),o=JSON.stringify(o),i("currentUserInfo",o);sessionStorage.getItem("deviceId")}else if("usrGrg"===t)if(1===e.estado){var I=e.mensaje.rs;I=JSON.stringify(I),i("currentUserGarage",I)}else sessionStorage.setItem("currentUserGarage","nothing stored");else if("usrAct"===t){if(1===e.estado&&null!==sessionStorage.getItem("temptyImgForLocal")&&void 0!==sessionStorage.getItem("temptyImgForLocal")){var S=sessionStorage.getItem("temptyImgForLocal");if(localStorage.setItem("aUPP",S.toString()),null!==sessionStorage.getItem("currentUserInfo")&&void 0!==sessionStorage.getItem("currentUserInfo")){var p=sessionStorage.getItem("currentUserInfo"),h=JSON.parse(p);$.isArray(h)?h.length>0?h[0].foto_perfil=S:null:"object"===("undefined"==typeof h?"undefined":l(h))&&null!==h&&(h.foto_perfil=S),h=JSON.stringify(h),sessionStorage.setItem("currentUserInfo",h)}}}else if("usrContact"===t)if(1===e.estado){if($("input.referidoEdit").attr("readonly",!0),localStorage.setItem("contactChange","y"),null!==localStorage.getItem("passwordChange")&&void 0!==localStorage.getItem("passwordChange")?null!==localStorage.getItem("infoChange")&&void 0!==localStorage.getItem("infoChange")?u.text("contraseña, nuevo contacto de referencia e información general se ha guardado"):u.text("contraseña y nuevo contacto de referencia se han guardado. Pero la demás información no"):null!==localStorage.getItem("infoChange")&&void 0!==localStorage.getItem("infoChange")?u.text("nuevo contacto de referencia e información general se ha guardado"):u.text("nuevo contacto de referencia se ha guardado. Pero la demás información no"),null!==sessionStorage.getItem("temptyNewContact")&&void 0!==sessionStorage.getItem("temptyNewContact")){var y=sessionStorage.getItem("temptyNewContact");if(null!==sessionStorage.getItem("currentUserInfo")&&void 0!==sessionStorage.getItem("currentUserInfo")){var p=sessionStorage.getItem("currentUserInfo"),h=JSON.parse(p);$.isArray(h)?h.length>0?h[0].invitado_por=y:null:"object"===("undefined"==typeof h?"undefined":l(h))&&null!==h&&(h.invitado_por=y),h=JSON.stringify(h),sessionStorage.setItem("currentUserInfo",h)}}}else console.log(e);else if("usrPass"===t)1===e.estado&&(localStorage.setItem("passwordChange","y"),null!==localStorage.getItem("contactChange")&&void 0!==localStorage.getItem("contactChange")?null!==localStorage.getItem("infoChange")&&void 0!==localStorage.getItem("infoChange")?u.text("contraseña, nuevo contacto de referencia e información general se ha guardado"):u.text("contraseña y nuevo contacto de referencia se han guardado. Pero no la demás información"):null!==localStorage.getItem("infoChange")&&void 0!==localStorage.getItem("infoChange")?u.text("contraseña e información general se ha guardado"):u.text("contraseña se ha guardado. Pero no la demás información"));else if("usrFullEdit"===t){if(1===e.estado&&(localStorage.setItem("infoChange","y"),null!==localStorage.getItem("contactChange")&&void 0!==localStorage.getItem("contactChange")?null!==localStorage.getItem("passwordChange")&&void 0!==localStorage.getItem("passwordChange")?u.text("contraseña, nuevo contacto de referencia e información general se ha guardado"):u.text("nuevo contacto de referencia e información se han guardado"):null!==localStorage.getItem("passwordChange")&&void 0!==localStorage.getItem("passwordChange")?u.text("contraseña e información general se ha guardado"):u.text("información general se ha guardado"),$("div#successEditProfile").modal(),null!==sessionStorage.getItem("currentUserInfo")&&void 0!==sessionStorage.getItem("currentUserInfo"))){var p=sessionStorage.getItem("currentUserInfo"),h=JSON.parse(p),b=JSON.parse(s);if(console.log("actFullBef",b,h),$.isArray(h)){if(h.length>0){var U=h[0],w=["fecha_nac","foto_perfil","full_name","genero","materno","paterno","nombre","tags"];$.each(w,function(e,o){"full_name"===o?U[o]=b.nombre+" "+b.paterno+" "+b.materno:"fecha_nac"===o?U[o]=b.fecha_nacimiento:"foto_perfil"===o?U[o]=b.foto:U[o]=b[o]}),h[0]=U}}else if("object"===("undefined"==typeof h?"undefined":l(h))&&null!==h){var w=["fecha_nac","foto_perfil","full_name","genero","materno","paterno","nombre","tags"];$.each(w,function(e,o){"full_name"===o?h[o]=b.nombre+" "+b.paterno+" "+b.materno:"fecha_nac"===o?h[o]=b.fecha_nacimiento:"foto_perfil"===o?h[o]=b.foto:h[o]=b[o]})}h=JSON.stringify(h),sessionStorage.setItem("currentUserInfo",h)}}else if("brands"===t&&1===e.estado){var T=e.mensaje.rs;T=JSON.stringify(T),sessionStorage.setItem("catalogBrands",T)}else if("mdls"===t&&1===e.estado){var O=e.mensaje.rs;O=JSON.stringify(O),sessionStorage.setItem("modelsArr",O)}else if("vrsInfo"===t&&1===e.estado){var j=e.mensaje.rs;sessionStorage.setItem("currentBrandImg",j[0].pic_marca.toString()),localStorage.setItem("modelName",j[0].model_name.toString()),j=JSON.stringify(j),sessionStorage.setItem("versionsArr",j)}else if("vrsGal"===t&&1===e.estado){var N=e.mensaje.rs;N=JSON.stringify(N),sessionStorage.setItem("versionsPhotos",N)}else if("spVrsInfo"===t&&1===e.estado){var j=e.mensaje.rs,_=e.mensaje.rs;if(sessionStorage.setItem("currentBrandImg",j[0].pic_marca.toString()),localStorage.setItem("modelName",j[0].model_name.toString()),m.hashesExist&&m.queriesT.cId.length>0){var q=parseInt(m.queriesT.cId),x=$.grep(_,function(e,o){var t=parseInt(e.id);if(t===q)return e}),J=x[0];J=JSON.stringify(J),sessionStorage.setItem("versionStored",J)}j=JSON.stringify(j),sessionStorage.setItem("versionsArr",j)}}).fail(function(e){console.log(e)})}function a(){var e=localStorage.getItem("activeSession");return"yes"===e}function n(e,o,t){if("user"===o){var s=sessionStorage.getItem("deviceId"),a={idUsr:e};a=JSON.stringify(a);var n={idUsr:e,device:s};n=JSON.stringify(n),r("garage/listar",n,"usrGrg"),t?r("usuario/info",a,"usrInfoToGo"):r("usuario/info",a,"usrInfoToGetR")}}function i(e,o){sessionStorage.removeItem(e),sessionStorage.setItem(e,o)}Object.defineProperty(t,"__esModule",{value:!0});var l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.sendPostToGo=s,t.sendPostToGet=r;var c=e("./locating.js"),g=e("./displayErrs.js"),d=e("./consoling.js"),m=e("./urlEncoder.js"),u=$("#successEditProfile").find("span.datoDetail")},{"./consoling.js":3,"./displayErrs.js":4,"./locating.js":6,"./urlEncoder.js":7}],6:[function(e,o,t){"use strict";function s(e){"home"===e?window.location=i+"/web/":window.location=i+"/web/"+e}Object.defineProperty(t,"__esModule",{value:!0}),t.navigating=s;var r=window.location.pathname,a=r.search("/web"),n=r.slice(a),i=(t.pathnameRoot=r.slice(0,a+5),t.strongRoot=r.slice(0,a)),l=t.myLocation=n;t.myLocHref=window.location.href,t.totalRoot=i+l},{}],7:[function(e,o,t){"use strict";function s(){for(var e,o={},t=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),s=0;s<t.length;s++)e=t[s].split("="),o[e[0]]=e[1];return o}function r(){var e=window.location.href,o=e.indexOf("?");return o!==-1&&(c=e.slice(o)),c}function a(e){var o=[],t="";$.map(e,function(e,t){o.push(t+"="+e)}),$.each(o,function(e,o){o=0===e?"?"+o:"&"+o,t+=o}),console.log(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.setQueriesWithObj=a;var n=window.location.href,i=n.indexOf("?"),l=i!==-1?n.slice(i):"",c="";t.hashesExist=l.length>3,t.queriesT=s(),t.queryText=r()},{}]},{},[1]);