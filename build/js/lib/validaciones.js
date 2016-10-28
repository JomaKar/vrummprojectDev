$('#registro').submit(function(e) {

e.preventDefault();
}).validate({
debug: false,
rules: {
"inputAlias": {
required: true
},
"inputEmail": {
required: true
},
"inputPassword": {
required: true
},
"inputPassword2": {
required: true
},

"inputcontacto": {
required: true
},
"foto": {
required: true
},
"cpostal": {
required: true,
number:true,
minlength: 5,
maxlength: 5
}
},
messages: {

"inputAlias": {
required: "es necesario llenar este campo."

},
"inputEmail": {
required: "ingrese correo."

},
"inputPassword": {
required: "porfavor Ingresa una contraseña."
},
"inputPassword2": {
required: "porfavor confirmar tu contraseña."
},
"referido": {
required: "es necesario llenar este campo."
},


"inputEdad": {
required: "es necesario llenar este campo.",
number: "Introduce edad válida."

},
"inputcontacto": {
required: "es necesario llenar este campo."
},
"foto": {
required: "es necesario agregar imagen."
},
"cpostal": {
required: "Introduce tu código postal.",
number: "Introduce un código postal válido.",
maxlength: "Debe contener 5 dígitos.",
minlength: "Debe contener 5 dígitos."
}

}
});
