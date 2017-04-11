# vrummprojectDev
development repository (and provisional) for the vrumm project. This repository is made mainly to be able to work remotly and to access from anywhere


to start clone the project and run npm install, after that in console run gulp and you'll start. Future steps: add angular


to work with https://vrummapp.net/ws/v2/comparador/agregar
use {'device':xx,'idUsr':xx,'version':xx}


el endpoint para actualizar solo un dato del perfil es:

https://vrummapp.net/ws/v2/usuario/actualizadato
los parametros son: device, user, geoloc, campo y dato
los valores validos para campo son: nombre, paterno, refered (para cambiar persona que te invitó, mandándole el id), materno, genero, fecha_nac,foto_perfil y tags, como strings