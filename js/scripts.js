// se crean variables que toman los valores del nombre y DNI y toma la lista de alumnos desde el localStorage
var parsedAlumnos =  JSON.parse(localStorage.getItem("Alumno"));
var botonAgregar = document.getElementById('botonAgregar');
var botonEliminar = document.getElementById('botonEliminar')
var nombre = document.getElementById('nombreAlumno');
var apellido = document.getElementById('apellidoAlumno')
var dni = document.getElementById('dniAlumno');
var email = document.getElementById('emailAlumno')
var eliminar = document.getElementById('eliminarAlumno')
var listaAlumnos = localStorage.getItem('Alumno')

// se van a validar los campos de nombre y en caso de que el campo de DNI coincida con alguno almacenado en localStorage se va a deshabilitar el boton de agregar

function nameValidator(event) {
    var inputNode = event.target
    var numberInput = isNaN(inputNode.value)
    if (inputNode.value != '' && numberInput === true) {
        nombre.classList.remove('is-invalid')
        nombre.classList.add('is-valid')
        botonValidator()
    } else {
        nombre.classList.add('is-invalid')
        nombre.classList.remove('is-valid')
        botonAgregar.disabled = true
    }
}

function apellidoValidator(event) {
    var inputNode = event.target
    var numberInput = isNaN(inputNode.value)
    if (numberInput === true) {
        apellido.classList.remove('is-invalid')
        apellido.classList.add('is-valid')
        botonValidator()
    } else {
        apellido.classList.add('is-invalid')
        apellido.classList.remove('is-valid')
        botonAgregar.disabled = true
    }
}

function dniValidator(event) {
    var inputNode = event.target
    if (inputNode.value != '' && inputNode.value > 0 && buscarAlumnoPorDni(inputNode.value) !== true) {
        dni.classList.add('is-valid')
        dni.classList.remove('is-invalid')
        botonValidator()
    } else {
        dni.classList.remove('is-valid')
        dni.classList.add('is-invalid')
        botonAgregar.disabled = true
    }
}

function emailValidator(event) {
    var inputNode = event.target
    if (inputNode.value !== '' && inputNode.value.indexOf('@') >= 0 && inputNode.value.indexOf('.') >= 0) {
        email.classList.add('is-valid')
        email.classList.remove('is-invalid')
        botonValidator()
    } else {
        email.classList.remove('is-valid')
        email.classList.add('is-invalid')
        botonAgregar.disabled = true
    }
}

function botonValidator() {
    if (nombre.classList.contains('is-valid') && apellido.classList.contains('is-valid') && dni.classList.contains('is-valid') && email.classList.contains('is-valid')) {
        botonAgregar.disabled = false
    }
}

botonValidator()

// Funcion que encuentra coincidencias con los valores DNI del localStorage y un input field. En caso de encontrar coincidencia, devuelve true

function buscarAlumnoPorDni(dniToSearch, parsedAlumnos) {

    var index = parsedAlumnos
    if (index == null) { // en caso de no haber econtrado ningun alumno en localStorage el boton es validado
        dni.classList.add('is-valid')
        dni.classList.remove('is-invalid')
        botonValidator()    
    }
    for (let i = 0; i < index.length; i++) {
        var element = index[i];
        if (dniToSearch === element.dni) {
            return true
        }
    }
}



// esta funcion valida que el campo de dni coincida con un DNI almacenado en local storage y en caso de encontrar coincidencia habilita el boton de borrar

function eliminarValidator(event) {
    var inputNode = event.target;
    console.log(inputNode.value)
    if (buscarAlumnoPorDni(inputNode.value) === true) {
        eliminar.classList.remove('is-invalid')
        eliminar.classList.add('is-valid')
        botonEliminar.disabled = false
    } else {
        eliminar.classList.add('is-invalid')
        eliminar.classList.remove('is-valid')
        botonEliminar.disabled = true
    }
}

nombre.onblur = nameValidator
apellido.onblur = apellidoValidator
dni.onblur = dniValidator
eliminar.onblur = eliminarValidator
email.onblur = emailValidator


// la funcion de abajo toma los alumnos existentes en el localStorage y en caso de encontrarlos los agrega al DOM, caso contrario imprime un mensaje

function mostrarAlumnosExistentes() {

    var parsedAlumnos = JSON.parse(listaAlumnos)
    
    if (parsedAlumnos === null) {

        console.log('No hay alumnos almacenados en localStorage') // <-- en caso de no encontrar nada dispara este console log

    } else if (parsedAlumnos !== null) {
        for (let i = 0; i < parsedAlumnos.length; i++) {

            var centralParentNode = document.getElementById('mainList')
            var liNodeCreator = document.createElement('li')
            var h1NodeCreator = document.createElement('h1')
            var h3NodeCreator = document.createElement('h3')
            var h3NodeCreator2 = document.createElement('h3')

            liNodeCreator.className = 'list-group-item'
            liNodeCreator.id = parsedAlumnos[i].id

            centralParentNode.appendChild(liNodeCreator)
            liNodeCreator.appendChild(h1NodeCreator).innerHTML = parsedAlumnos[i].firstName + ' ' + parsedAlumnos[i].lastName
            liNodeCreator.appendChild(h3NodeCreator).innerHTML = 'DNI: ' + parsedAlumnos[i].dni
            liNodeCreator.appendChild(h3NodeCreator2).innerHTML = 'Email: ' + parsedAlumnos[i].email
        }
    }   
}
mostrarAlumnosExistentes()


// La siguiente funcion crea un nodo alumno en el DOM y tambien sube el objeto alumno al localStorage

function nuevoAlumno() {
    
    var parsedAlumnos = JSON.parse(localStorage.getItem("Alumno"));

    if (parsedAlumnos == null) parsedAlumnos = []; // en caso de no encontrar nada dentro del localStorage se crea un array de datos 

    var alumno = {
        firstName: nombre.value,
        dni: dni.value,
        lastName: apellido.value,
        email: email.value,
        id: dni.value,
    };

    localStorage.setItem("Alumno", JSON.stringify(alumno));
    parsedAlumnos.push(alumno);
    localStorage.setItem("Alumno", JSON.stringify(parsedAlumnos));

    var centralParentNode = document.getElementById('mainList')
    var liNodeCreator = document.createElement('li')
    var h1NodeCreator = document.createElement('h1')
    var h3NodeCreator = document.createElement('h3')
    var h3Nodecreator2 = document.createElement('h3')


    liNodeCreator.className = 'list-group-item'
    liNodeCreator.id = alumno.id

    centralParentNode.appendChild(liNodeCreator)
    liNodeCreator.appendChild(h1NodeCreator).innerHTML = nombre.value + ' ' + apellido.value
    liNodeCreator.appendChild(h3NodeCreator).innerHTML = 'DNI: ' + dni.value
    liNodeCreator.appendChild(h3Nodecreator2).innerHTML = 'Email: ' + email.value

    nombre.value = ''
    nombre.classList.remove('is-valid')
    dni.value = ''
    dni.classList.remove('is-valid')
    apellido.value = ''
    apellido.classList.remove('is-valid')
    dni.value = ''
    dni.classList.remove('is-valid')
    email.value = ''
    email.classList.remove('is-valid')
    botonAgregar.disabled = true

};

botonAgregar.onclick = nuevoAlumno

// La siguiente funcion elimina un alumno del DOM y el localStorage

function eliminarAlumno() {

    var parsedAlumnos = JSON.parse(localStorage.getItem("Alumno"));
    var nodoAlumno = document.getElementById(eliminar.value)

    nodoAlumno.remove()

    for (let i = 0; i < parsedAlumnos.length; i++) {
        const element = parsedAlumnos[i];

        // El siguiente if va a comparar si el dni del array de alumnos coincide con el valor del campo eliminar. En caso de que coincidan, se va a crear un array nuevo SIN el elemento encontrado y se va a subir al localStorage

        if (element.dni === eliminar.value) {
            parsedAlumnos = parsedAlumnos.filter(function (alumno) {
                var arraySinAlumno = alumno.dni !== element.dni
                return arraySinAlumno
            })
            localStorage.setItem("Alumno", JSON.stringify(parsedAlumnos));
        }
    }

    eliminar.value = ''
    eliminar.classList.remove('is-valid')
    botonEliminar.disabled = true
    
}

botonEliminar.onclick = eliminarAlumno

// Funciones varias de jQuery

$('.list-group-item').hover(function () {
    $(this).addClass('active');        
    }, function () {
    $(this).removeClass('active');
    }
);