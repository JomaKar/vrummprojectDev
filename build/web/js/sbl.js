!function e(t,o,n){function r(a,i){if(!o[a]){if(!t[a]){var l="function"==typeof require&&require;if(!i&&l)return l(a,!0);if(s)return s(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var c=o[a]={exports:{}};t[a][0].call(c.exports,function(e){var o=t[a][1][e];return r(o?o:e)},c,c.exports,e,t,o,n)}return o[a].exports}for(var s="function"==typeof require&&require,a=0;a<n.length;a++)r(n[a]);return r}({1:[function(e,t,o){"use strict";function n(){$.post("https://vrummapp.net/ws/v2/catalogo/getmarcas").then(function(e){1===e.estado&&(s=e.mensaje.rs)})}function r(e){return $.grep(s,function(t,o){return t.id==e})}Object.defineProperty(o,"__esModule",{value:!0}),o.askBrands=n,o.theBrand=r;var s=[]},{}],2:[function(e,t,o){"use strict";function n(e){console.log(e)}Object.defineProperty(o,"__esModule",{value:!0}),o.con=n},{}],3:[function(e,t,o){"use strict";function n(e){return void 0!==e&&null!==e}function r(e){return void 0===e||null===e}Object.defineProperty(o,"__esModule",{value:!0}),o.notNullNotUndefined=n,o.NullOrUndefined=r},{}],4:[function(e,t,o){"use strict";function n(e){"login"===e&&(a.disBlock(),r.val(""),s.val(""))}Object.defineProperty(o,"__esModule",{value:!0}),o.displayErr=n;var r=$("#l-email"),s=$("#l-pass"),a=$("div.errorLogin");$.fn.disNone=function(){return this.css({display:"none"}),this},$.fn.disBlock=function(){return this.css({display:"block"}),this},$.fn.an=function(){return this.animate({height:"toggle"},200),this}},{}],5:[function(e,t,o){"use strict";function n(e,t,o){console.log(t,"from sendToGo processor",o);var n=localStorage.getItem("aUsrA");if("specVer"===o){var r=e.brand_id,d=e.model_id,I=e.id;s()?(0,g.navigating)("catalogo/specific-version?al="+n+"&brdId="+r+"&mdlId="+d+"&cId="+I):(0,g.navigating)("catalogo/specific-version?brdId="+r+"&mdlId="+d+"&cId="+I)}$.post("https://vrummapp.net/ws/v2/"+e,t).then(function(e){if("perfilLog"===o||"perfilLogIrgenwo"===o)if(1===e.estado){var t=e.mensaje.rs;localStorage.setItem("activeSession","yes"),"perfilLogIrgenwo"!==o?a(t,"user",!0):a(t,"user",!1),t.toString(),localStorage.setItem("aUsr",t),i("currentUserId",t)}else(0,u.con)("whatTheFuck"),(0,f.displayErr)("login");if("perfilr"===o&&1===e.estado){var t=e.mensaje.usr.id,r=e.mensaje.usr.alias;localStorage.setItem("aUsrA",r);var d=(0,c.notNullNotUndefined)(e.mensaje.usr.foto_perfil)?e.mensaje.usr.foto_perfil.toString():"";d.length>0&&localStorage.setItem("aUPP",d);var I=[];I[0]=e.mensaje.usr,I=JSON.stringify(I),t.toString(),localStorage.setItem("aUsr",t),i("currentUserId",t),i("currentUserAlias",r),i("currentUserInfo",I),localStorage.setItem("activeSession","yes"),(0,c.notNullNotUndefined)(m.queriesT.al)?((0,u.con)("why doesnt work?"),m.queriesT.al==r||(0,g.isMyLocationHideMode)("/web/perfil/")?(0,g.navigating)("perfil"):(0,g.navigating)("perfil?al="+r)):(0,g.navigating)("perfil?al="+r),l(t,r)}else if("brands"===o&&1===e.estado){var v=JSON.stringify(e.mensaje.rs);sessionStorage.setItem("catalogBrands",v),s()?(0,g.navigating)("catalogo/?al="+n):(0,g.navigating)("catalogo/?")}else if("mdls"===o&&1===e.estado){var S=e.mensaje.rs,p=e.mensaje.rs[0].brand_id;S=JSON.stringify(S),sessionStorage.setItem("modelsArr",S),s()?(0,g.navigating)("catalogo/brand-modelo?al="+n+"&brdId="+p):(0,g.navigating)("catalogo/brand-modelo?brdId="+p)}else if("versiones"===o&&1===e.estado){var N=e.mensaje.rs;sessionStorage.setItem("currentBrandImg",N[0].pic_marca.toString()),localStorage.setItem("modelName",N[0].model_name.toString()),N=JSON.stringify(N),sessionStorage.setItem("versionsArr",N);var p=e.mensaje.rs[0].brand_id,h=e.mensaje.rs[0].model_id;s()?(0,g.navigating)("catalogo/modelo-versiones?al="+n+"&brdId="+p+"&mdlId="+h):(0,g.navigating)("catalogo/modelo-versiones?brdId="+p+"&mdlId="+h)}}).fail(function(e){console.log(e)})}function r(e,t,o){console.log(t,"from sendToGet processor",o);var n=t?t:"";$.post("https://vrummapp.net/ws/v2/"+e,n).then(function(e){if("usrInfoToGetR"===o||"usrInfoToGo"===o){if(1===e.estado){var t=[];t[0]=e.mensaje.rs[0];var r=(0,c.notNullNotUndefined)(t[0].foto_perfil)?t[0].foto_perfil.toString():"";r.length>0&&localStorage.setItem("aUPP",r);var s=t[0].alias,a=t[0].id;localStorage.getItem("deviceId");if(t=JSON.stringify(t),localStorage.setItem("aUsrA",s),i("currentUserAlias",s),i("currentUserInfo",t),"usrInfoToGetR"===o){var f=window.location.href,I=f.slice(f.indexOf("?")+1),S=(I.search(s),(0,c.notNullNotUndefined)(m.queriesT.al)?window.location.pathname+"?"+I:window.location.pathname+"?al="+s+"&"+I);console.log("whereTo",S),window.location=S}else(0,g.isMyLocationHideMode)("/web/perfil/")||((0,c.notNullNotUndefined)(m.queriesT.al)?((0,u.con)("why doesnt work?"),m.queriesT.al==s||(0,g.isMyLocationHideMode)("/web/perfil/")?(0,g.navigating)("perfil"):(0,g.navigating)("perfil?al="+s)):(0,g.navigating)("perfil?al="+s));l(a,s)}}else if(1===e.estado&&"usrInfoToGet"===o){var t=[];t[0]=e.mensaje.rs[0];var s=t[0].alias,a=t[0].id;i("currentUserAlias",s.toString()),i("currentUserId",a.toString()),t=JSON.stringify(t),i("currentUserInfo",t);localStorage.getItem("deviceId");l(a,s)}else if("usrGrg"===o)if(1===e.estado){var p=e.mensaje.rs;p=JSON.stringify(p),i("currentUserGarage",p)}else sessionStorage.setItem("currentUserGarage","nothing stored");else if("validaMail"===o)(0,u.con)(e),1===e.estado&&($("div#successMailVal").find("p.textRes").empty().text(e.mensaje.rs),$("div#successMailVal").modal());else if("usrAct"===o){if(1===e.estado&&(0,c.notNullNotUndefined)(sessionStorage.getItem("temptyImgForLocal"))){var N=sessionStorage.getItem("temptyImgForLocal");if(localStorage.setItem("aUPP",N.toString()),(0,c.notNullNotUndefined)(sessionStorage.getItem("currentUserInfo"))){var h=sessionStorage.getItem("currentUserInfo"),U=JSON.parse(h);$.isArray(U)?U.length>0?U[0].foto_perfil=N:null:"object"===("undefined"==typeof U?"undefined":d(U))&&null!==U&&(U.foto_perfil=N),U=JSON.stringify(U),sessionStorage.setItem("currentUserInfo",U)}}}else if("usrContact"===o)if(1===e.estado){if($("input.referidoEdit").attr("readonly",!0),localStorage.setItem("contactChange","y"),(0,c.notNullNotUndefined)(localStorage.getItem("passwordChange"))?(0,c.notNullNotUndefined)(localStorage.getItem("infoChange"))?v.text("contraseña, nuevo contacto de referencia e información general se ha guardado"):v.text("contraseña y nuevo contacto de referencia se han guardado. Pero la demás información no"):(0,c.notNullNotUndefined)(localStorage.getItem("infoChange"))?v.text("nuevo contacto de referencia e información general se ha guardado"):v.text("nuevo contacto de referencia se ha guardado. Pero la demás información no"),(0,c.notNullNotUndefined)(sessionStorage.getItem("temptyNewContact"))){var y=sessionStorage.getItem("temptyNewContact");if((0,c.notNullNotUndefined)(sessionStorage.getItem("currentUserInfo"))){var h=sessionStorage.getItem("currentUserInfo"),U=JSON.parse(h);$.isArray(U)?U.length>0?U[0].invitado_por=y:null:"object"===("undefined"==typeof U?"undefined":d(U))&&null!==U&&(U.invitado_por=y),U=JSON.stringify(U),sessionStorage.setItem("currentUserInfo",U)}}}else console.log(e);else if("usrPass"===o)1===e.estado&&(localStorage.setItem("passwordChange","y"),(0,c.notNullNotUndefined)(localStorage.getItem("contactChange"))?(0,c.notNullNotUndefined)(localStorage.getItem("infoChange"))?v.text("contraseña, nuevo contacto de referencia e información general se ha guardado"):v.text("contraseña y nuevo contacto de referencia se han guardado. Pero no la demás información"):(0,c.notNullNotUndefined)(localStorage.getItem("infoChange"))?v.text("contraseña e información general se ha guardado"):v.text("contraseña se ha guardado. Pero no la demás información"));else if("usrFullEdit"===o){if(1===e.estado&&(localStorage.setItem("infoChange","y"),(0,c.notNullNotUndefined)(localStorage.getItem("contactChange"))?(0,c.notNullNotUndefined)(localStorage.getItem("passwordChange"))?v.text("contraseña, nuevo contacto de referencia e información general se ha guardado"):v.text("nuevo contacto de referencia e información se han guardado"):(0,c.notNullNotUndefined)(localStorage.getItem("passwordChange"))?v.text("contraseña e información general se ha guardado"):v.text("información general se ha guardado"),$("div#successEditProfile").modal(),(0,c.notNullNotUndefined)(sessionStorage.getItem("currentUserInfo")))){var h=sessionStorage.getItem("currentUserInfo"),U=JSON.parse(h),O=JSON.parse(n);if(console.log("actFullBef",O,U),$.isArray(U)){if(U.length>0){var T=U[0],b=["fecha_nac","foto_perfil","full_name","genero","materno","paterno","nombre","tags"];$.each(b,function(e,t){"full_name"===t?T[t]=O.nombre+" "+O.paterno+" "+O.materno:"fecha_nac"===t?T[t]=O.fecha_nacimiento:"foto_perfil"===t?T[t]=O.foto:T[t]=O[t]}),U[0]=T}}else if("object"===("undefined"==typeof U?"undefined":d(U))&&null!==U){var b=["fecha_nac","foto_perfil","full_name","genero","materno","paterno","nombre","tags"];$.each(b,function(e,t){"full_name"===t?U[t]=O.nombre+" "+O.paterno+" "+O.materno:"fecha_nac"===t?U[t]=O.fecha_nacimiento:"foto_perfil"===t?U[t]=O.foto:U[t]=O[t]})}U=JSON.stringify(U),sessionStorage.setItem("currentUserInfo",U)}}else if("brands"===o&&1===e.estado){var w=e.mensaje.rs;w=JSON.stringify(w),sessionStorage.setItem("catalogBrands",w)}else if("mdls"===o&&1===e.estado){var j=e.mensaje.rs;j=JSON.stringify(j),sessionStorage.setItem("modelsArr",j)}else if("vrsInfo"===o&&1===e.estado){var _=e.mensaje.rs;sessionStorage.setItem("currentBrandImg",_[0].pic_marca.toString()),localStorage.setItem("modelName",_[0].model_name.toString()),_=JSON.stringify(_),sessionStorage.setItem("versionsArr",_)}else if("vrsGal"===o&&1===e.estado){var P=e.mensaje.rs;P=JSON.stringify(P),sessionStorage.setItem("versionsPhotos",P)}else if("spVrsInfo"===o&&1===e.estado){var _=e.mensaje.rs,x=e.mensaje.rs;if(sessionStorage.setItem("currentBrandImg",_[0].pic_marca.toString()),localStorage.setItem("modelName",_[0].model_name.toString()),m.hashesExist&&m.queriesT.cId.length>0){var E=parseInt(m.queriesT.cId),M=$.grep(x,function(e,t){var o=parseInt(e.id);if(o===E)return e}),q=M[0];q=JSON.stringify(q),sessionStorage.setItem("versionStored",q)}_=JSON.stringify(_),sessionStorage.setItem("versionsArr",_)}}).fail(function(e){console.log(e)})}function s(){var e=localStorage.getItem("activeSession");return"yes"===e}function a(e,t,o){if("user"===t){var n=localStorage.getItem("deviceId"),s={idUsr:e};s=JSON.stringify(s);var a={idUsr:e,device:n};a=JSON.stringify(a),r("garage/listar",a,"usrGrg"),o?r("usuario/info",s,"usrInfoToGo"):r("usuario/info",s,"usrInfoToGetR")}}function i(e,t){sessionStorage.removeItem(e),sessionStorage.setItem(e,t)}function l(e,t){console.log("fromHTTP-visit2",e,t),setTimeout(function(){(0,I.recordNewVisitedProfile)(e,t)},400)}Object.defineProperty(o,"__esModule",{value:!0});var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};o.sendPostToGo=n,o.sendPostToGet=r;var c=e("./differentOfNullAndUndefined.js"),g=e("./locating.js"),f=e("./displayErrs.js"),u=e("./consoling.js"),m=e("./urlEncoder.js"),I=e("./visitedProfilesRecord.js"),v=$("#successEditProfile").find("span.datoDetail")},{"./consoling.js":2,"./differentOfNullAndUndefined.js":3,"./displayErrs.js":4,"./locating.js":6,"./urlEncoder.js":7,"./visitedProfilesRecord.js":8}],6:[function(e,t,o){"use strict";function n(e){"home"===e?window.location=d+"/web/":window.location=d+"/web/"+e}function r(e){return l===e||l===e+"index"||l===e+"index.html"}function s(e){return l===e||l===e+".html"}Object.defineProperty(o,"__esModule",{value:!0}),o.navigating=n,o.isMyLocationHideMode=r,o.isMyLocationExpMode=s;var a=window.location.pathname,i=a.search("/web"),l=a.slice(i),d=(o.pathnameRoot=a.slice(0,i+5),o.strongRoot=a.slice(0,i)),c=o.myLocation=l;o.myLocHref=window.location.href,o.totalRoot=d+c},{}],7:[function(e,t,o){"use strict";function n(){for(var e,t={},o=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),n=0;n<o.length;n++)e=o[n].split("="),t[e[0]]=e[1];return t}function r(){var e=window.location.href,t=e.indexOf("?");return t!==-1&&(d=e.slice(t)),d}function s(e){var t=[],o="";$.map(e,function(e,o){t.push(o+"="+e)}),$.each(t,function(e,t){t=0===e?"?"+t:"&"+t,o+=t}),console.log(o)}Object.defineProperty(o,"__esModule",{value:!0}),o.setQueriesWithObj=s;var a=window.location.href,i=a.indexOf("?"),l=i!==-1?a.slice(i):"",d="";o.hashesExist=l.length>3,o.queriesT=n(),o.queryText=r()},{}],8:[function(e,t,o){"use strict";function n(e){var t={device:localStorage.getItem("deviceId"),user:e},o=JSON.stringify(t);$.post("https://vrummapp.net/ws/v2/usuario/garagefriends",o).then(function(e){if(1===e.estado){p=e.mensaje.rs;JSON.stringify(e.mensaje.rs)}})}function r(e,t){var o=$.isNumeric(e)?e:parseInt(e),n=f(o?o:null);console.log("trying to record"),N.length>0?(console.log("alreadySomeone visited",N),n<0?(o&&t?g(o,t):g(null,null),(0,I.notNullNotUndefined)(localStorage.getItem("aUsrA"))&&(o&&t?l(o,t):l(null,null))):(0,I.notNullNotUndefined)(localStorage.getItem("aUsrA"))&&l(null,null)):(console.log("no body visited yet"),(0,I.notNullNotUndefined)(localStorage.getItem("aUsrA"))&&o&&t&&l(o,t),o&&t?g(o,t):g(null,null))}function s(){var e=-1;return v.hashesExist&&v.queriesT.al.length>0&&N.forEach(function(t,o){if(v.queriesT.al==t.al){var n=$.isNumeric(t.id)?t.id:parseInt(t.id);e=n}}),e}function a(e){var t=-1;return N.forEach(function(o,n){if(e==o.al){var r=$.isNumeric(o.id)?o.id:parseInt(o.id);t=r}}),t}function i(){var e={};return N.length>0&&((0,I.notNullNotUndefined)(localStorage.getItem("aUsr"))?d(localStorage.getItem("aUsr"),N[N.length-1].id)?e=N[N.length-1]:N.length>1&&(e=N[N.length-2]):e=N[N.length-1]),e}function l(e,t){console.log("working on api record");var o=c();if("true"!=S)o.length>0?(console.log(o,"almost on api"),o.forEach(function(e,t){var o=e;o.usrState="pending",m(o)}),localStorage.setItem("FMR","true")):localStorage.setItem("FMR","true");else if(null!==e&&null!==t&&d(e,localStorage.getItem("aUsr")))if(p.length>0)!function(){var t=0;p.forEach(function(o,n){if(d(e,o.id)){t++}}),t>=p.length?m(objectToSend):null}();else{var n={al:t,id:e,usrState:"pending"};m(n)}else p.length>0&&(console.log("retrying to insert old profiles",o),o.forEach(function(e,t){var o=0;$.map(p,function(t,n){if(d(e.id,t.id)&&o++,o>=p.length){var r=e;console.log("this is an old value that wasnt recorded yet",r),r.usrState="pending",m(r)}})}))}function d(e,t){return e!=t||e!=parseInt(t)||parseInt(e)!=t||parseInt(e)!=parseInt(t)}function c(){var e=$.isNumeric(localStorage.getItem("aUsr"))?localStorage.getItem("aUsr"):parseInt(localStorage.getItem("aUsr"));console.log("deleting record2",e,"numbers for delete");var t=f(e);return $.isNumeric(t)&&t>-1&&(N.splice(t,1),u()),N}function g(e,t){console.log(v.queriesT.al,"url",localStorage.getItem("aUsrA"),"local",sessionStorage.getItem("currentUserAlias"),"session","newTests-workOk");var o=$.isNumeric(sessionStorage.getItem("currentUserId"))?sessionStorage.getItem("currentUserId"):parseInt(sessionStorage.getItem("currentUserId"));(0,I.notNullNotUndefined)(localStorage.getItem("aUsrA"))?(c(),v.queriesT.al!==localStorage.getItem("aUsrA")&&(e&&t?N.push({al:t,id:e,usrState:"active"}):N.push({al:sessionStorage.getItem("currentUserAlias"),id:o,usrState:"active"})),l(e,t)):e&&t?N.push({al:t,id:e,usrState:"pasive"}):N.push({al:sessionStorage.getItem("currentUserAlias"),id:o,usrState:"pasive"}),u()}function f(e){var t=-1;return N.length>0&&N.forEach(function(o,n){var r=parseInt(o.id),s=e?e:currentUserId;r==s&&(t=n)}),t}function u(){var e=JSON.stringify(N);console.log(e,"recording"),localStorage.setItem("visitedUsrs",e)}function m(e){if((0,I.notNullNotUndefined)(localStorage.getItem("aUsr"))){var t={user:parseInt(localStorage.getItem("aUsr")),visito:e.id,device:localStorage.getItem("deviceId")},o=JSON.stringify(t);$.post("https://vrummapp.net/ws/v2/usuario/clicvisita",o).then(function(t){console.log(t),1===t.estado&&(console.log(t),e.usrState="recorded",p.push(e),localStorage.setItem("visitedOnAPI",JSON.stringify(p)))})}}Object.defineProperty(o,"__esModule",{value:!0}),o.visitedFriends=n,o.recordNewVisitedProfile=r,o.returnAlreadyVisitedProfileId=s,o.returnIdOfAlias=a,o.returnLastVisitedProfile=i;var I=(e("./consoling.js"),e("./differentOfNullAndUndefined.js")),v=e("./urlEncoder.js"),S=(e("./httpProcesor.js"),(0,I.notNullNotUndefined)(localStorage.getItem("FMR"))?localStorage.getItem("FMR"):"false"),p=(0,I.notNullNotUndefined)(localStorage.getItem("visitedOnAPI"))?JSON.parse(localStorage.getItem("visitedOnAPI")):[],N=(0,I.notNullNotUndefined)(localStorage.getItem("visitedUsrs"))?JSON.parse(localStorage.getItem("visitedUsrs")):[];(v.queriesT.al==localStorage.getItem("aUsr")||sessionStorage.getItem("currentUserId")==localStorage.getItem("aUsr"))&&void 0!==localStorage.getItem("aUsr")},{"./consoling.js":2,"./differentOfNullAndUndefined.js":3,"./httpProcesor.js":5,"./urlEncoder.js":7}],9:[function(e,t,o){"use strict";function n(){if((0,d.isMyLocationHideMode)("/web/perfil/")&&((0,u.notNullNotUndefined)(I)?(0,u.notNullNotUndefined)(v)?c.hashesExist?(0,u.notNullNotUndefined)(c.queriesT.al)&&(v==c.queriesT.al?r(v,"al"):r(c.queriesT.al,"al")):r(v,"al"):c.hashesExist&&(0,u.notNullNotUndefined)(c.queriesT.al)&&c.queriesT.al.length>0?r(c.queriesT.al,"al"):(0,d.navigating)("home"):(0,u.notNullNotUndefined)(v)?c.hashesExist&&(0,u.notNullNotUndefined)(c.queriesT.al)&&(v==c.queriesT.al?null:r(c.queriesT.al,"al")):c.hashesExist&&((0,u.notNullNotUndefined)(c.queriesT.al)&&c.queriesT.al.length>0?r(c.queriesT.al,"al"):(0,d.navigating)("home"))),(0,d.isMyLocationExpMode)("/web/perfil/configuracion"))if((0,u.notNullNotUndefined)(localStorage.getItem("aUsr"))){var e=parseInt(localStorage.getItem("aUsr"));if((0,u.notNullNotUndefined)(sessionStorage.getItem("currentUserInfo"))){var t=JSON.parse(sessionStorage.getItem("currentUserInfo"))[0],o=parseInt(t.id);e!==o?(r(e,"id"),sessionStorage.removeItem("currentUserInfo")):null}else r(e,"id")}else(0,u.notNullNotUndefined)(c.queriesT.al)?(0,d.navigating)("perfil/?al="+c.queriesT.al):(0,u.notNullNotUndefined)(sessionStorage.getItem("currentUserAlias"))?(0,d.navigating)("perfil/?al="+sessionStorage.getItem("currentUserAlias")):(0,d.navigating)("home");if((0,d.isMyLocationHideMode)("/web/catalogo/")){var n=sessionStorage.getItem("catalogBrands");sessionStorage.removeItem("modelsArr"),((0,u.NullOrUndefined)(n)||"nothing stored"===n)&&s()}if((0,d.isMyLocationExpMode)("/web/catalogo/brand-modelo")){var g=sessionStorage.getItem("currentBrandAutos"),f=sessionStorage.getItem("modelsArr");(0,u.NullOrUndefined)(g)||"nothing store"===g?(0,u.NullOrUndefined)(f)&&(c.hashesExist&&c.queriesT.brdId.length>0?a(c.queriesT.brdId):(0,d.navigating)("catalogo")):(0,u.NullOrUndefined)(f)?c.hashesExist&&(0,u.notNullNotUndefined)(g)&&"nothing store"!==g?a(c.queriesT.brdId==g?g:c.queriesT.brdId):(0,u.notNullNotUndefined)(g)&&"nothing store"!==g&&a(g):c.hashesExist&&(c.queriesT.brdId==g?null:a(c.queriesT.brdId))}if((0,d.isMyLocationExpMode)("/web/catalogo/modelo-versiones")||(0,d.isMyLocationExpMode)("/web/catalogo/specific-version")){var m=!(0,d.isMyLocationExpMode)("/web/catalogo/specific-version"),S=sessionStorage.getItem("versionsArr"),p=sessionStorage.getItem("versionsPhotos"),N=(c.queriesT.al,localStorage.getItem("modelId"));if((0,u.NullOrUndefined)(N)||"nothing store"===N)if(c.hashesExist)if(c.queriesT.mdlId.length>0){var h=c.queriesT.mdlId;(0,u.NullOrUndefined)(S)&&i(h),(0,u.NullOrUndefined)(p)&&m&&l(h)}else(0,d.navigating)("catalogo/brand-modelo");else(0,d.navigating)("catalogo/brand-modelo");else if((0,u.NullOrUndefined)(S)||(0,u.NullOrUndefined)(p))if(c.hashesExist)if(console.log("hashesExist"),c.queriesT.mdlId.length>0){var U=c.queriesT.mdlId;m?N==U?(i(N),l(N)):(i(U),l(U)):i(N==U?N:U)}else m?(i(N),l(N)):i(N);else m?(i(N),l(N)):i(N);else if(c.hashesExist)if(c.queriesT.mdlId.length>0){var U=c.queriesT.mdlId;N==U?(i(N),l(N)):(i(U),l(U))}else m?(i(N),l(N)):i(N);else m?(i(N),l(N)):i(N)}}function r(e,t){var o="al"===t?{alias:e}:{idUsr:e};if("al"===t&&(0,u.notNullNotUndefined)(localStorage.getItem("visitedUsrs"))){var n=JSON.parse(localStorage.getItem("visitedUsrs"));n.forEach(function(t,o){if(e==t.al||e==t.id){var n=localStorage.getItem("deviceId");if((0,u.notNullNotUndefined)(n)){var r={idUsr:t.id,device:localStorage.getItem("deviceId")};r=JSON.stringify(r),(0,g.sendPostToGet)("garage/listar",r,"usrGrg")}}})}o=JSON.stringify(o),(0,g.sendPostToGet)("usuario/info",o,"usrInfoToGet")}function s(){(0,g.sendPostToGet)("catalogo/getmarcas",null,"brands")}function a(e){var t=parseInt(e),o=localStorage.getItem("deviceId");if((0,u.notNullNotUndefined)(o)&&t){var n={device:o,brandId:t};n=JSON.stringify(n),(0,g.sendPostToGet)("catalogo/getmodelos",n,"mdls")}else setTimeout(function(){n={device:localStorage.getItem("deviceId"),brandId:t},(0,g.sendPostToGet)("catalogo/getmodelos",JSON.stringify(n),"mdls")},700)}function i(e){var t={};e=parseInt(e);var o=localStorage.getItem("deviceId");sessionStorage.getItem("currentUserId");(0,u.notNullNotUndefined)(o)?(t=(0,u.notNullNotUndefined)(localStorage.getItem("aUsr"))?{device:o,modelId:e,user:localStorage.getItem("aUsr")}:{device:o,modelId:e},(0,d.isMyLocationExpMode)("/web/catalogo/modelo-versiones")?(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(t),"vrsInfo"):(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(t),"spVrsInfo")):setTimeout(function(){t=(0,u.notNullNotUndefined)(localStorage.getItem("aUsr"))?{device:localStorage.getItem("deviceId"),modelId:e,user:localStorage.getItem("aUsr")}:{device:localStorage.getItem("deviceId"),modelId:e},(0,d.isMyLocationExpMode)("/web/catalogo/modelo-versiones")?(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(t),"vrsInfo"):(0,g.sendPostToGet)("catalogo/getversiones",JSON.stringify(t),"spVrsInfo")},700)}function l(e){e=parseInt(e);var t=localStorage.getItem("deviceId"),o={};(0,u.notNullNotUndefined)(t)?(o={device:t,modelId:e},(0,g.sendPostToGet)("catalogo/getgaleria",JSON.stringify(o),"vrsGal")):setTimeout(function(){o={device:localStorage.getItem("deviceId"),modelId:e},(0,g.sendPostToGet)("catalogo/getgaleria",JSON.stringify(o),"vrsGal")},1e3)}var d=e("../scripts/commonFunc/locating.js"),c=e("../scripts/commonFunc/urlEncoder.js"),g=e("../scripts/commonFunc/httpProcesor.js"),f=e("../scripts/commonFunc/brandsImgs.js"),u=e("../scripts/commonFunc/differentOfNullAndUndefined.js");(0,f.askBrands)(),$(document).ready(function(){$(this).scrollTop(0)});var m=(localStorage.getItem("activeSession"),localStorage.getItem("deviceId")),I=sessionStorage.getItem("currentUserInfo"),v=(sessionStorage.getItem("currentUserId"),sessionStorage.getItem("currentUserAlias"));sessionStorage.getItem("currentUserGarage");(0,u.notNullNotUndefined)(m)?n():setTimeout(function(){n()},1400),window.onbeforeunload=function(){sessionStorage.removeItem("currentUserGarage"),(0,d.isMyLocationExpMode)("/web/catalogo/brand-modelo")&&sessionStorage.removeItem("modelsArr")}},{"../scripts/commonFunc/brandsImgs.js":1,"../scripts/commonFunc/differentOfNullAndUndefined.js":3,"../scripts/commonFunc/httpProcesor.js":5,"../scripts/commonFunc/locating.js":6,"../scripts/commonFunc/urlEncoder.js":7}]},{},[9]);