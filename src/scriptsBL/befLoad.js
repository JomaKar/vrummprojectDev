import {navigating, myLocation, isMyLocationHideMode, isMyLocationExpMode} from '../scripts/commonFunc/locating.js';
import {queriesT, hashesExist} from '../scripts/commonFunc/urlEncoder.js';
import {sendPostToGo, sendPostToGet} from '../scripts/commonFunc/httpProcesor.js';
import {askBrands, theBrand} from '../scripts/commonFunc/brandsImgs.js';
import {notNullNotUndefined, NullOrUndefined} from '../scripts/commonFunc/differentOfNullAndUndefined.js';


// the main purpose of this function is to speed the information downloading time
// to have all the required information for the pages as soon as posible

askBrands();

$(document).ready(function(){
  $(this).scrollTop(0);
});


var session = localStorage.getItem('activeSession');
var devicId = localStorage.getItem('deviceId');
var userInfo = sessionStorage.getItem('currentUserInfo');
var userId = sessionStorage.getItem('currentUserId');
var usrAlias = sessionStorage.getItem('currentUserAlias');
var usrGarage = sessionStorage.getItem('currentUserGarage');

var theresGarage = false;
var isDevice = false;

if(notNullNotUndefined(devicId)){
  start();
}else{
  setTimeout(function(){
    start();
  }, 1400);
}

function start() {
    
    if(isMyLocationHideMode("/web/perfil/")){

        //if the user info is in sessionStorage
        if(notNullNotUndefined(userInfo)){

            // question if the alias is sessionStorage
            if(notNullNotUndefined(usrAlias)){

              // question if the alias is in the url
              if(hashesExist){
                if(notNullNotUndefined(queriesT.al)){
                  // question if the alias in the url is the same as the alias in the sessionStorage
                  // and ask for the userInfo depending on the answer
                  (usrAlias == queriesT.al) ? getUserInfo(usrAlias, 'al') :  getUserInfo(queriesT.al, 'al'); 
                }

              // if there's nothing in the url use the alias of the sessionStorage
              }else{
                  getUserInfo(usrAlias, 'al');
              }

            // if there's no alias in the sessionStorage
            }else if(hashesExist){
                // question the alias in the url and if its not an empty value
                (notNullNotUndefined(queriesT.al) && queriesT.al.length > 0) ? getUserInfo(queriesT.al, 'al') : navigating('home');

            }else{
              navigating('home');
            }

        // if the user info is not in sessionStorage
        }else{

            // but the alias is in sessionStorage
            if(notNullNotUndefined(usrAlias)){
              
              if(hashesExist){
                if(notNullNotUndefined(queriesT.al)){
                  (usrAlias == queriesT.al) ? null :  getUserInfo(queriesT.al, 'al');
                }
              }

            // but if any are in sessionStorage
            }else if(hashesExist){
              (notNullNotUndefined(queriesT.al) && queriesT.al.length > 0) ? getUserInfo(queriesT.al, 'al') : navigating('home');
            }
        
        }

    }

    if(isMyLocationExpMode("/web/perfil/configuracion")){
      //console.log('im in config')
        if(notNullNotUndefined(localStorage.getItem('aUsr'))){

          var usrId = parseInt(localStorage.getItem('aUsr'));

          if(notNullNotUndefined(sessionStorage.getItem('currentUserInfo'))){
              
              var usrStored = JSON.parse(sessionStorage.getItem('currentUserInfo'))[0];
              var usrIdStored = parseInt(usrStored.id);
              
              //console.log('perfil/config', usrId, usrIdStored, usrStored);

              (usrId !== usrIdStored) ? (getUserInfo(usrId, 'id'), sessionStorage.removeItem('currentUserInfo')) : null;

          }else{
              getUserInfo(usrId, 'id');
          }

        //technically, here says, if theres no a logged user, go back, to the visitted profile or to the landing page.
        }else{
          
          if(notNullNotUndefined(queriesT.al)){
            navigating(`perfil/?al=${queriesT.al}`);
          }else{

              if(notNullNotUndefined(sessionStorage.getItem('currentUserAlias'))){
                  navigating(`perfil/?al=${sessionStorage.getItem('currentUserAlias')}`); 
              }else{
                navigating('home');
              }

          }

        }

    }


    if(isMyLocationHideMode("/web/catalogo/")){
        var brandsStored = sessionStorage.getItem('catalogBrands'),
        brands = [];

        sessionStorage.removeItem('modelsArr');

        if(NullOrUndefined(brandsStored) || brandsStored === 'nothing stored'){
                  
            getBrands();
        
        }
    }

    if(isMyLocationExpMode("/web/catalogo/brand-modelo")){

        //console.log('hello models from bfl')
        var brandId = sessionStorage.getItem('currentBrandAutos'),
        modelsStored = sessionStorage.getItem('modelsArr');

          if(NullOrUndefined(brandId) || brandId === 'nothing store'){

            if(NullOrUndefined(modelsStored)){

                if(hashesExist){

                  (queriesT.brdId.length > 0) ? getModelsInfo(queriesT.brdId) : navigating('catalogo');
                
                }else{

                  navigating('catalogo');

                }

            }

          
          }else if(NullOrUndefined(modelsStored)){

            if(hashesExist && notNullNotUndefined(brandId) && brandId !== 'nothing store'){

              (queriesT.brdId == brandId) ? getModelsInfo(brandId) : getModelsInfo(queriesT.brdId);
            
            }else if(notNullNotUndefined(brandId) && brandId !== 'nothing store'){

              getModelsInfo(brandId);

            }
            
          
          }else{

            if(hashesExist){

              (queriesT.brdId == brandId) ? null : getModelsInfo(queriesT.brdId);
            
            }
            
          }


    }

    if(isMyLocationExpMode("/web/catalogo/modelo-versiones") || isMyLocationExpMode("/web/catalogo/specific-version")){
          //console.log(myLocation, 'onbeforeunload');
          var onVersions = ( isMyLocationExpMode("/web/catalogo/specific-version") ) ? true : false;

          var versionsStored = sessionStorage.getItem('versionsArr'),
          versionsPhotosStored = sessionStorage.getItem('versionsPhotos'),
          curUsrId = queriesT.al,
          modelId = localStorage.getItem('modelId'),
          versionsArr = [];


          if(NullOrUndefined(modelId) || modelId === 'nothing store'){
              
              if(hashesExist){
                  if(queriesT.mdlId.length > 0){

                      var urlMdlId = queriesT.mdlId;
                      
                      if(NullOrUndefined(versionsStored)){
                          getVersions(urlMdlId);
                      }

                      if(NullOrUndefined(versionsPhotosStored)){
                        
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


          }else if(NullOrUndefined(versionsStored) || NullOrUndefined(versionsPhotosStored)){

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
  // console.log(localStorage.getItem('visitedUsrs'), idOrAl, 'bfl');
  if(type=== 'al'){

      if(notNullNotUndefined(localStorage.getItem('visitedUsrs'))){

          var users = JSON.parse(localStorage.getItem('visitedUsrs'));

          users.forEach(function(objItm, objIdx){
              //console.log(idOrAl, objItm.al, 'bfl');
              if(idOrAl == objItm.al || idOrAl == objItm.id){
                  var device = localStorage.getItem('deviceId');

                  if(notNullNotUndefined(device)){
                      var dataForGarage = {idUsr: objItm.id, device: localStorage.getItem('deviceId')};
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
    var device = localStorage.getItem('deviceId');

    if(notNullNotUndefined(device) && theId){
      // console.log('without waiting');
      var data = {'device': device, brandId: theId};
      data = JSON.stringify(data);

      sendPostToGet('catalogo/getmodelos', data, 'mdls');

    }else{
      setTimeout(function(){

        data = {device: localStorage.getItem('deviceId'), brandId: theId};
        sendPostToGet('catalogo/getmodelos', JSON.stringify(data), 'mdls');


      }, 700);
    }
  
}


function getVersions(theModelId) {
    var data = {};
    theModelId = parseInt(theModelId);

    var device = localStorage.getItem('deviceId');
    var userId = sessionStorage.getItem('currentUserId');

    if(notNullNotUndefined(device)){
          
          //console.log('sin esperar las versiones');
          data = (notNullNotUndefined(localStorage.getItem('aUsr'))) ? {'device': device, modelId: theModelId, user: localStorage.getItem('aUsr')} : {'device': device, modelId: theModelId};

          (isMyLocationExpMode("/web/catalogo/modelo-versiones")) ? sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'vrsInfo') : sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'spVrsInfo');

    }else{
      setTimeout(function(){
        
        data = (notNullNotUndefined(localStorage.getItem('aUsr'))) ? {'device':  localStorage.getItem('deviceId'), modelId: theModelId, user: localStorage.getItem('aUsr')} : {'device':  localStorage.getItem('deviceId'), modelId: theModelId};
        //console.log(data);
        (isMyLocationExpMode("/web/catalogo/modelo-versiones")) ? sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'vrsInfo') : sendPostToGet('catalogo/getversiones', JSON.stringify(data), 'spVrsInfo');

      }, 700);
    }

}

function getVersionsPhotos(theModelId){
    theModelId = parseInt(theModelId);


    var device = localStorage.getItem('deviceId');
    var data = {};

    if(notNullNotUndefined(device)){
      //console.log('sin esperar fotos de las versiones', theModelId);
      data = {'device': device, modelId: theModelId};
      sendPostToGet('catalogo/getgaleria', JSON.stringify(data), 'vrsGal');
    }else{
      setTimeout(function(){
        data = {device: localStorage.getItem('deviceId'), modelId: theModelId};
        sendPostToGet('catalogo/getgaleria', JSON.stringify(data), 'vrsGal');
      }, 1000);
    }
            
}

window.onbeforeunload = function() { 
  sessionStorage.removeItem('currentUserGarage');
  //sessionStorage.removeItem('currentUserInfo');

    if(isMyLocationExpMode("/web/catalogo/brand-modelo")){sessionStorage.removeItem('modelsArr')}

};