function getVersionsPhotos(modelId){

    var device = sessionStorage.getItem('deviceId');
    var data = {};

    if(device !== undefined && device !== null && modelId){
      data = {'device': device, modelId: modelId};
    }
            
    data = JSON.stringify(data);

    $.post('https://vrummapp.net/ws/v2/catalogo/getgaleria',
      data).then(function(res){
        if(res.estado === 1){
          var versionsPicts = res.mensaje.rs;
          versionsPicts = JSON.stringify(versionsPicts);
          sessionStorage.setItem('versionsPhotos', versionsPicts);
        }
      }).fail(function(err){
        console.log(err);
      });
}