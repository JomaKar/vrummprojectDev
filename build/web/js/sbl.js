!function e(o,s,t){function r(n,a){if(!s[n]){if(!o[n]){var l="function"==typeof require&&require;if(!a&&l)return l(n,!0);if(i)return i(n,!0);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}var d=s[n]={exports:{}};o[n][0].call(d.exports,function(e){var s=o[n][1][e];return r(s?s:e)},d,d.exports,e,o,s,t)}return s[n].exports}for(var i="function"==typeof require&&require,n=0;n<t.length;n++)r(t[n]);return r}({1:[function(e,o,s){"use strict";function t(){if("/web/perfil/"!==c.myLocation&&"/web/perfil/index"!==c.myLocation&&"/web/perfil/index.html"!==c.myLocation||(null===m||void 0===m?null!==f&&void 0!==f?f==d.queriesT.al?r(f,"al"):r(d.queriesT.al,"al"):d.hashesExist&&(void 0!==d.queriesT.al&&null!==d.queriesT.al&&d.queriesT.al.length>0?r(d.queriesT.al,"al"):(0,c.navigating)("home")):null!==f&&void 0!==f&&(f==d.queriesT.al?null:r(d.queriesT.al,"al")),null!==v&&void 0!==v&&"nothing stored"!==v&&null!==f&&void 0!==f&&(f==d.queriesT.al?null:r(d.queriesT.al,"al"))),"/web/catalogo/index.html"===c.myLocation||"/web/catalogo/index"===c.myLocation||"/web/catalogo/"===c.myLocation){var e=sessionStorage.getItem("catalogBrands");sessionStorage.removeItem("modelsArr"),null!==e&&void 0!==e&&"nothing stored"!==e||i()}if("/web/catalogo/brand-modelo.html"===c.myLocation||"/web/catalogo/brand-modelo"===c.myLocation){var o=sessionStorage.getItem("currentBrandAutos"),s=sessionStorage.getItem("modelsArr");null===o||void 0===o||"nothing store"===o?null!==s&&void 0!==s||(d.hashesExist&&d.queriesT.brdId.length>0?n(d.queriesT.brdId):(0,c.navigating)("catalogo")):null!==s&&void 0!==s||n(d.hashesExist?(d.queriesT.brdId=o)?o:d.queriesT.brdId:o)}if("/web/catalogo/modelo-versiones.html"===c.myLocation||"/web/catalogo/modelo-versiones"===c.myLocation||"/web/catalogo/specific-version.html"===c.myLocation||"/web/catalogo/specific-version"===c.myLocation){console.log(c.myLocation,"onbeforeunload");var t="/web/catalogo/specific-version.html"!==c.myLocation&&"/web/catalogo/specific-version"!==c.myLocation,g=sessionStorage.getItem("versionsArr"),u=sessionStorage.getItem("versionsPhotos"),I=localStorage.getItem("modelId");if(null===I||void 0===I||"nothing store"===I)if(d.hashesExist)if(d.queriesT.mdlId.length>0){var S=d.queriesT.mdlId;null!==g&&void 0!==g||a(S),null!==u&&void 0!==u||t&&l(S)}else(0,c.navigating)("catalogo/brand-modelo");else(0,c.navigating)("catalogo/brand-modelo");else if(null===g||void 0===g||null===u||void 0===u)if(d.hashesExist)if(console.log("hashesExist"),d.queriesT.mdlId.length>0){var h=d.queriesT.mdlId;t?I==h?(a(I),l(I)):(a(h),l(h)):a(I==h?I:h)}else t?(a(I),l(I)):a(I);else t?(a(I),l(I)):a(I);else if(d.hashesExist)if(d.queriesT.mdlId.length>0){var h=d.queriesT.mdlId;I==h?(a(I),l(I)):(a(h),l(h))}else t?(a(I),l(I)):a(I);else t?(a(I),l(I)):a(I)}}function r(e,o){var s="al"===o?{alias:e}:{idUsr:e};s=JSON.stringify(s),(0,g.sendPostToGet)("usuario/info",s,"usrInfoToGet")}function i(){(0,g.sendPostToGet)("catalogo/getmarcas",null,"brands")}function n(e){var o=parseInt(e),s=sessionStorage.getItem("deviceId");if(void 0!==s&&null!==s&&o){console.log("without waiting");var t={device:s,brandId:o};t=JSON.stringify(t),(0,g.sendPostToGet)("catalogo/getmodelos",t,"mdls")}else setTimeout(function(){t={device:sessionStorage.getItem("deviceId"),brandId:o},(0,g.sendPostToGet)("catalogo/getmodelos",JSON.stringify(t),"mdls")},700)}function a(e){var o={};e=parseInt(e);var s=sessionStorage.getItem("deviceId");sessionStorage.getItem("currentUserId");void 0!==s&&null!==s?(console.log("sin esperar las versiones"),o={device:s,modelId:e},"/web/catalogo/modelo-versiones.html"===c.myLocation||"/web/catalogo/modelo-versiones"===c.myLocation?(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"vrsInfo"):(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"spVrsInfo")):setTimeout(function(){o={device:sessionStorage.getItem("deviceId"),modelId:e},console.log(o),"/web/catalogo/modelo-versiones.html"===c.myLocation||"/web/catalogo/modelo-versiones"===c.myLocation?(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"vrsInfo"):(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(o),"spVrsInfo")},700)}function l(e){e=parseInt(e);var o=sessionStorage.getItem("deviceId"),s={};void 0!==o&&null!==o?(console.log("sin esperar fotos de las versiones",e),s={device:o,modelId:e},(0,g.sendPostToGet)("catalogo/getgaleria",JSON.stringify(s),"vrsGal")):setTimeout(function(){s={device:sessionStorage.getItem("deviceId"),modelId:e},(0,g.sendPostToGet)("catalogo/getgaleria",JSON.stringify(s),"vrsGal")},1e3)}var c=e("../scripts/commonFunc/locating.js"),d=e("../scripts/commonFunc/urlEncoder.js"),g=e("../scripts/commonFunc/httpProcesor.js");$(document).ready(function(){$(this).scrollTop(0)});var u=(window.localStorage.getItem("activeSession"),sessionStorage.getItem("deviceId")),m=sessionStorage.getItem("currentUserInfo"),f=(sessionStorage.getItem("currentUserId"),sessionStorage.getItem("currentUserAlias")),v=sessionStorage.getItem("currentUserGarage");void 0!==u&&null!==u?t():setTimeout(function(){t()},1400),window.onbeforeunload=function(){sessionStorage.removeItem("currentUserGarage"),"/web/catalogo/brand-modelo.html"!==c.myLocation&&"/web/catalogo/brand-modelo"!==c.myLocation||sessionStorage.removeItem("modelsArr")}},{"../scripts/commonFunc/httpProcesor.js":4,"../scripts/commonFunc/locating.js":5,"../scripts/commonFunc/urlEncoder.js":6}],2:[function(e,o,s){"use strict";function t(e){console.log(e)}Object.defineProperty(s,"__esModule",{value:!0}),s.con=t},{}],3:[function(e,o,s){"use strict";function t(e){"login"===e&&(n.disBlock(),r.val(""),i.val(""))}Object.defineProperty(s,"__esModule",{value:!0}),s.displayErr=t;var r=(e("./locating.js"),$("#l-email")),i=$("#l-pass"),n=$("div.errorLogin");$.fn.disNone=function(){return this.css({display:"none"}),this},$.fn.disBlock=function(){return this.css({display:"block"}),this},$.fn.an=function(){return this.animate({height:"toggle"},200),this}},{"./locating.js":5}],4:[function(e,o,s){"use strict";function t(e,o,s){var t=sessionStorage.getItem("currentUserId");if("specVer"===s){var r=e.brand_id,g=e.model_id,u=e.id;i()?(0,l.navigating)("catalogo/specific-version?usrId="+t+"&brdId="+r+"&mdlId="+g+"&cId="+u):(0,l.navigating)("catalogo/specific-version?brdId="+r+"&mdlId="+g+"&cId="+u)}$.post("https://vrummapp.net/ws/v2/"+e,o).then(function(e){if("perfilLog"===s)if(1===e.estado){var o=e.mensaje.rs;localStorage.setItem("activeSession","yes"),n(o,"user",!0),o.toString(),localStorage.setItem("aUsr",o),a("currentUserId",o)}else(0,d.con)("whatTheFuck"),(0,c.displayErr)("login");if("perfilr"===s&&1===e.estado){var o=e.mensaje.usr.id,r=e.mensaje.usr.alias;localStorage.setItem("aUsrA",r);var g=null!==e.mensaje.usr.foto_perfil&&void 0!==e.mensaje.usr.foto_perfil?e.mensaje.usr.foto_perfil.toString():"";g.length>0&&localStorage.setItem("aUPP",g);var u=[];u[0]=e.mensaje.usr,u=JSON.stringify(u),o.toString(),localStorage.setItem("aUsr",o),a("currentUserId",o),a("currentUserAlias",r),a("currentUserInfo",u),localStorage.setItem("activeSession","yes"),(0,l.navigating)("perfil?al="+r)}else if("brands"===s&&1===e.estado){var m=JSON.stringify(e.mensaje.rs);sessionStorage.setItem("catalogBrands",m),i()?(0,l.navigating)("catalogo/?usrId="+t):(0,l.navigating)("catalogo/?")}else if("mdls"===s&&1===e.estado){var f=e.mensaje.rs,v=e.mensaje.rs[0].brand_id;f=JSON.stringify(f),sessionStorage.setItem("modelsArr",f),i()?(0,l.navigating)("catalogo/brand-modelo?usrId="+t+"&brdId="+v):(0,l.navigating)("catalogo/brand-modelo?brdId="+v)}else if("versiones"===s&&1===e.estado){var I=e.mensaje.rs;I=JSON.stringify(I),sessionStorage.setItem("versionsArr",I);var v=e.mensaje.rs[0].brand_id,S=e.mensaje.rs[0].model_id;i()?(0,l.navigating)("catalogo/modelo-versiones?usrId="+t+"&brdId="+v+"&mdlId="+S):(0,l.navigating)("catalogo/modelo-versiones?brdId="+v+"&mdlId="+S)}}).fail(function(e){console.log(e)})}function r(e,o,s){console.log(o,"from processor");var t=o?o:"";$.post("https://vrummapp.net/ws/v2/"+e,t).then(function(e){if(1===e.estado&&"usrInfoToGo"===s){var o=[];o[0]=e.mensaje.rs[0];var t=null!==o[0].foto_perfil&&void 0!==o[0].foto_perfil?o[0].foto_perfil.toString():"";t.length>0&&localStorage.setItem("aUPP",t);var i=o[0].alias,n=o[0].id;o=JSON.stringify(o),localStorage.setItem("aUsrA",i),a("currentUserAlias",i),a("currentUserInfo",o),"/web/perfil/"!==l.myLocation&&"/web/perfil/index"!==l.myLocation&&"/web/perfil/index.html"!==l.myLocation&&(0,l.navigating)("perfil?al="+i)}else if(1===e.estado&&"usrInfoToGet"===s){var o=[];o[0]=e.mensaje.rs[0];var i=o[0].alias,n=o[0].id;a("currentUserAlias",i.toString()),a("currentUserId",n.toString()),o=JSON.stringify(o),a("currentUserInfo",o);var c=sessionStorage.getItem("deviceId");if(void 0!==c&&null!==c&&n){var u={idUsr:n,device:sessionStorage.getItem("deviceId")};u=JSON.stringify(u),r("garage/listar",u,"usrGrg")}}else if("usrGrg"===s)if(1===e.estado){var m=e.mensaje.rs;m=JSON.stringify(m),a("currentUserGarage",m)}else sessionStorage.setItem("currentUserGarage","nothing stored");else if("usrAct"===s)console.log("trying to change profila photo",e),1===e.estado&&(0,d.con)("success",e.mensaje);else if("brands"===s&&1===e.estado){var f=e.mensaje.rs;f=JSON.stringify(f),sessionStorage.setItem("catalogBrands",f)}else if("mdls"===s&&1===e.estado){var v=e.mensaje.rs;v=JSON.stringify(v),sessionStorage.setItem("modelsArr",v)}else if("vrsInfo"===s&&1===e.estado){var I=e.mensaje.rs;I=JSON.stringify(I),sessionStorage.setItem("versionsArr",I)}else if("vrsGal"===s&&1===e.estado){var S=e.mensaje.rs;S=JSON.stringify(S),sessionStorage.setItem("versionsPhotos",S)}else if("spVrsInfo"===s&&1===e.estado){var I=e.mensaje.rs,h=e.mensaje.rs;if(g.hashesExist&&g.queriesT.cId.length>0){var p=parseInt(g.queriesT.cId),y=$.grep(h,function(e,o){var s=parseInt(e.id);if(s===p)return e}),b=y[0];b=JSON.stringify(b),sessionStorage.setItem("versionStored",b)}I=JSON.stringify(I),sessionStorage.setItem("versionsArr",I)}}).fail(function(e){console.log(e)})}function i(){var e=localStorage.getItem("activeSession");return"yes"===e}function n(e,o,s){if("user"===o){var t=sessionStorage.getItem("deviceId"),i={idUsr:e};i=JSON.stringify(i);var n={idUsr:e,device:t};n=JSON.stringify(n),r("garage/listar",n,"usrGrg"),s?r("usuario/info",i,"usrInfoToGo"):r("usuario/info",i,"usrInfoToGet")}}function a(e,o){sessionStorage.removeItem(e),sessionStorage.setItem(e,o)}Object.defineProperty(s,"__esModule",{value:!0}),s.sendPostToGo=t,s.sendPostToGet=r;var l=e("./locating.js"),c=e("./displayErrs.js"),d=e("./consoling.js"),g=e("./urlEncoder.js")},{"./consoling.js":2,"./displayErrs.js":3,"./locating.js":5,"./urlEncoder.js":6}],5:[function(e,o,s){"use strict";function t(e){"home"===e?window.location=a+"/web/":window.location=a+"/web/"+e}Object.defineProperty(s,"__esModule",{value:!0}),s.navigating=t;var r=window.location.pathname,i=r.search("/web"),n=r.slice(i),a=s.strongRoot=r.slice(0,i),l=s.myLocation=n;s.myLocHref=window.location.href,s.totalRoot=a+l},{}],6:[function(e,o,s){"use strict";function t(){for(var e,o={},s=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),t=0;t<s.length;t++)e=s[t].split("="),o[e[0]]=e[1];return o}function r(){var e=window.location.href,o=e.indexOf("?");return o!==-1&&(c=e.slice(o)),c}function i(e){var o=[],s="";$.map(e,function(e,s){o.push(s+"="+e)}),$.each(o,function(e,o){o=0===e?"?"+o:"&"+o,s+=o}),console.log(s)}Object.defineProperty(s,"__esModule",{value:!0}),s.setQueriesWithObj=i;var n=window.location.href,a=n.indexOf("?"),l=a!==-1?n.slice(a):"",c="";s.hashesExist=l.length>3,s.queriesT=t(),s.queryText=r()},{}]},{},[1]);