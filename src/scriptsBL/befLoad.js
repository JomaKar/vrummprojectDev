import {navigating, myLocation} from '../scripts/commonFunc/locating.js';
import {queriesT, hashesExist} from '../scripts/commonFunc/urlEncoder.js';
import {sendPostToGo, sendPostToGet} from '../scripts/commonFunc/httpProcesor.js';

$(document).ready(function(){
  $(this).scrollTop(0);
});


var session = window.localStorage.getItem('activeSession');
var devicId = sessionStorage.getItem('deviceId');
var userInfo = sessionStorage.getItem('currentUserInfo');
var userId = sessionStorage.getItem('currentUserId');
var usrAlias = sessionStorage.getItem('currentUserAlias');
var usrGarage = sessionStorage.getItem('currentUserGarage');

var theresGarage = false;
var isDevice = false;

if(devicId !== undefined && devicId !== null){
  start();
}else{
  setTimeout(function(){
    start();
  }, 1400);
}

function start() {
    
    if(myLocation === "/web/perfil/" || myLocation === "/web/perfil/index" || myLocation === "/web/perfil/index.html"){

        //if user hasn't logged in or sign in

        if(userInfo === null || userInfo === undefined){

            if(usrAlias !== null && usrAlias !== undefined){
              if(hashesExist){
                if(queriesT.al !== undefined && queriesT.al !== null){
                  (usrAlias == queriesT.al) ? getUserInfo(usrAlias, 'al') :  getUserInfo(queriesT.al, 'al'); 
                }
              }else{
                  getUserInfo(usrAlias, 'al')
              }

            }else if(hashesExist){

                if(queriesT.al !== undefined && queriesT.al !== null){
                    if(queriesT.al.length > 0){
                        getUserInfo(queriesT.al, 'al');
                    }else{navigating('home');}
                }else{navigating('home');}

            }

        }else{

            if(usrAlias !== null && usrAlias !== undefined){
              
              if(hashesExist){
                if(queriesT.al !== undefined && queriesT.al !== null){
                  (usrAlias == queriesT.al) ? null :  getUserInfo(queriesT.al, 'al');
                }
              }

            }
        
        }


        /////


        if(usrGarage  !== null && usrGarage !== undefined && usrGarage !== 'nothing stored'){
            if(usrAlias !== null && usrAlias !== undefined){
              
              if(hashesExist){
                if(queriesT.al !== undefined && queriesT.al !== null){
                  (usrAlias == queriesT.al) ? null :  getUserInfo(queriesT.al, 'al');
                }
              }

            }

        }

    }

    if(myLocation === "/web/perfil/configuracion" ||  myLocation === "/web/perfil/configuracion.html"){
      //console.log('im in config')
        if(localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined){

          var usrId = parseInt(localStorage.getItem('aUsr'));

          if(sessionStorage.getItem('currentUserInfo') !== null && sessionStorage.getItem('currentUserInfo') !== undefined){
              
              var usrStored = JSON.parse(sessionStorage.getItem('currentUserInfo'));
              var usrIdStored = parseInt(usrStored.id);

              (usrId === usrIdStored) ? null : getUserInfo(usrId, 'id');

          }else{
              getUserInfo(usrId, 'id');
          }

        //technically, here says, if theres no a logged user, go back, to the visitted profile or to the landing page.
        }else{
          
          if(queriesT.al !== null && queriesT.al !== undefined){
            navigating(`perfil/?al=${queriesT.al}`);
          }else{

              if(sessionStorage.getItem('currentUserAlias') !== null && sessionStorage.getItem('currentUserAlias') !== undefined){
                  navigating(`perfil/?al=${sessionStorage.getItem('currentUserAlias')}`); 
              }else{
                navigating('home');
              }

          }

        }

    }


    if(myLocation === "/web/catalogo/index.html" || myLocation === "/web/catalogo/index" || myLocation === "/web/catalogo/"){
        var brandsStored = sessionStorage.getItem('catalogBrands'),
        brands = [];

        sessionStorage.removeItem('modelsArr');

        if(brandsStored === null || brandsStored === undefined || brandsStored === 'nothing stored'){
                  
            getBrands();
        
        }
    }

    if(myLocation === "/web/catalogo/brand-modelo.html" || myLocation === "/web/catalogo/brand-modelo"){

        //console.log('hello models from bfl')
        var brandId = sessionStorage.getItem('currentBrandAutos'),
        modelsStored = sessionStorage.getItem('modelsArr');

          if(brandId === null || brandId === undefined || brandId === 'nothing store'){

            if(modelsStored === null || modelsStored === undefined){

                if(hashesExist){

                  (queriesT.brdId.length > 0) ? getModelsInfo(queriesT.brdId) : navigating('catalogo');
                
                }else{

                  navigating('catalogo');

                }

            }

          
          }else if(modelsStored === null || modelsStored === undefined){

            if(hashesExist){

              (queriesT.brdId = brandId) ? getModelsInfo(brandId) : getModelsInfo(queriesT.brdId);
            
            }else{

              getModelsInfo(brandId);

            }
            
          
          }


    }

    if(myLocation === "/web/catalogo/modelo-versiones.html" || myLocation === "/web/catalogo/modelo-versiones" || myLocation === "/web/catalogo/specific-version.html" || myLocation === "/web/catalogo/specific-version"){
          //console.log(myLocation, 'onbeforeunload');
          var onVersions = (myLocation !== "/web/catalogo/specific-version.html" && myLocation !== "/web/catalogo/specific-version") ? true : false;

          var versionsStored = sessionStorage.getItem('versionsArr'),
          versionsPhotosStored = sessionStorage.getItem('versionsPhotos'),
          curUsrId = queriesT.al,
          modelId = localStorage.getItem('modelId'),
          versionsArr = [];


          if(modelId === null || modelId === undefined || modelId === 'nothing store'){
              
              if(hashesExist){
                  if(queriesT.mdlId.length > 0){

                      var urlMdlId = queriesT.mdlId;
                      
                      if(versionsStored === null || versionsStored === undefined){
                          getVersions(urlMdlId);
                      }

                      if(versionsPhotosStored === null || versionsPhotosStored === undefined){
                        
                          if(onVersions){
                            getVersionsPhotos(urlMdlId);
                          }
                      }

                  }else{

                      navigating('catalogo/brand-modelo');          
                  
                  }

              }else{

                  navigating('catalogo/brand-modelo');
              }


          }else if(versionsStored === null || versionsStored === undefined || versionsPhotosStored === null || versionsPhotosStored === undefined){

              if(hashesExist){
                console.log('hashesExist');
                  if(queriesT.mdlId.length > 0){
                      var urlMdl = queriesT.mdlId;

                      if(onVersions){

                          (modelId == urlMdl) ? (getVersions(modelId), getVersionsPhotos(modelId)) : (getVersions(urlMdl), getVersionsPhotos(urlMdl));
                      
                      }else{

                          (modelId == urlMdl) ? getVersions(modelId) : getVersions(urlMdl);

                      }
                  
                  }else{

                      (onVersions) ? (getVersions(modelId), getVersionsPhotos(modelId)) : getVersions(modelId);
                  
                  }

              }else{

                (onVersions) ? ( getVersions(modelId), getVersionsPhotos(modelId)) : getVersions(modelId);
              }
          
          }else{

              if(hashesExist){
                  if(queriesT.mdlId.length > 0){
                      var urlMdl = queriesT.mdlId;

                      (modelId == urlMdl) ? (getVersions(modelId),  getVersionsPhotos(modelId)) :  (getVersions(urlMdl), getVersionsPhotos(urlMdl));
                  
                  }else{

                    (onVersions) ? (getVersions(modelId), getVersionsPhotos(modelId)) : getVersions(modelId);
                  
                  }
              }else{

                  (onVersions) ? (getVersions(modelId), getVersionsPhotos(modelId)) : getVersions(modelId);
              
              }
          }

    }

}


function getUserInfo(idOrAl, type) {

  var data = (type === 'al') ? {alias: idOrAl} : {idUsr: idOrAl};
  console.log(localStorage.getItem('visitedUsrs'));
  if(type=== 'al'){

      if(localStorage.getItem('visitedUsrs') !== null && localStorage.getItem('visitedUsrs') !== undefined){

          var users = JSON.parse(localStorage.getItem('visitedUsrs'));

          users.forEach(function(objItm, objIdx){
              //console.log(idOrAl, objItm.al, 'bfl');
              if(idOrAl == objItm.al){
                  var device = sessionStorage.getItem('deviceId');

                  if(device !== undefined && device !== null){
                      var dataForGarage = {idUsr: objItm.id, device: sessionStorage.getItem('deviceId')};
                      dataForGarage = JSON.stringify(dataForGarage);
                      sendPostToGet('garage/listar', dataForGarage, 'usrGrg');

                  }
              }
          });

      }
  }

  data = JSON.stringify(data);

  sendPostToGet('usuario/info', data, 'usrInfoToGet');

}


function getBrands(){

    sendPostToGet('catalogo/getmarcas', null, 'brands');
  
}


function getModelsInfo(id){

    var theId = parseInt(id);
    var device = sessionStorage.getItem('deviceId');

    if(device !== undefined && device !== null && theId){
      console.log('without waiting')
      var data = {'device': device, brandId: theId};
      data = JSON.stringify(data);

      sendPostToGet('catalogo/getmodelos', data, 'mdls');

    }else{
      setTimeout(function(){

        data = {device: sessionStorage.getItem('deviceId'), brandId: theId};
        sendPostToGet('catalogo/getmodelos', JSON.stringify(data), 'mdls');


      }, 700);
    }
  
}


function getVersions(theModelId) {
    var data = {};
    theModelId = parseInt(theModelId);

    var device = sessionStorage.getItem('deviceId');
    var userId = sessionStorage.getItem('currentUserId');

    if(device !== undefined && device !== null){
          
          //console.log('sin esperar las versiones');
          data = (localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? {'device': device, modelId: theModelId, user: localStorage.getItem('aUsr')} : {'device': device, modelId: theModelId};

          (myLocation === "/web/catalogo/modelo-versiones.html" || myLocation === "/web/catalogo/modelo-versiones") ? sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'vrsInfo') : sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'spVrsInfo');

    }else{
      setTimeout(function(){
        
        data = (localStorage.getItem('aUsr') !== null && localStorage.getItem('aUsr') !== undefined) ? {'device':  sessionStorage.getItem('deviceId'), modelId: theModelId, user: localStorage.getItem('aUsr')} : {'device':  sessionStorage.getItem('deviceId'), modelId: theModelId};
        //console.log(data);

        (myLocation === "/web/catalogo/modelo-versiones.html" || myLocation === "/web/catalogo/modelo-versiones") ? sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'vrsInfo') : sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'spVrsInfo');


      }, 700);
    }

}

function getVersionsPhotos(theModelId){
    theModelId = parseInt(theModelId);


    var device = sessionStorage.getItem('deviceId');
    var data = {};

    if(device !== undefined && device !== null){
      //console.log('sin esperar fotos de las versiones', theModelId);
      data = {'device': device, modelId: theModelId};
      sendPostToGet('catalogo/getgaleria', JSON.stringify(data), 'vrsGal');
    }else{
      setTimeout(function(){
        data = {device: sessionStorage.getItem('deviceId'), modelId: theModelId};
        sendPostToGet('catalogo/getgaleria', JSON.stringify(data), 'vrsGal');
      }, 1000);
    }
            
}

window.onbeforeunload = function() { 
  sessionStorage.removeItem('currentUserGarage');
  //sessionStorage.removeItem('currentUserInfo');

    if(myLocation === "/web/catalogo/brand-modelo.html" || myLocation === "/web/catalogo/brand-modelo"){sessionStorage.removeItem('modelsArr')}

};