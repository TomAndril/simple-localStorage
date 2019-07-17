// se crean variables que toman los valores del nombre y DNI y toma la lista de alumnos desde el localStorage

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
        botonAgregar.disabled = false
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
        botonAgregar.disabled = false
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
        botonAgregar.disabled = false
    } else {
        dni.classList.remove('is-valid')
        dni.classList.add('is-invalid')
        botonAgregar.disabled = true
    }
}

// Funcion que encuentra coincidencias con los valores DNI del localStorage y un input field. En caso de encontrar coincidencia, devuelve true

function buscarAlumnoPorDni(dniToSearch) {
    var index = JSON.parse(listaAlumnos)
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

// La funcion de abajo crea un nodo alumno

function crearNodoEstudiante() {
    var centralParentNode = document.getElementById('mainList')
    var liNodeCreator = document.createElement('li')
    var h1NodeCreator = document.createElement('h1')
    var h3NodeCreator = document.createElement('h3')

    liNodeCreator.className = 'list-group-item'

    centralParentNode.appendChild(liNodeCreator)
    liNodeCreator.appendChild(h1NodeCreator).innerHTML = 'Nombre: ' + nombre.value + ' ' + apellido.value
    liNodeCreator.appendChild(h3NodeCreator).innerHTML = 'DNI: ' + dni.value
}


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

            liNodeCreator.className = 'list-group-item'

            centralParentNode.appendChild(liNodeCreator)
            liNodeCreator.appendChild(h1NodeCreator).innerHTML = 'Nombre: ' + parsedAlumnos[i].firstName + ' ' + parsedAlumnos[i].lastName
            liNodeCreator.appendChild(h3NodeCreator).innerHTML = 'DNI: ' + parsedAlumnos[i].dni
        }
    }
}
mostrarAlumnosExistentes();

// Se agrega una funcion que sube objetos alumno al localStorage

function nuevoAlumno() {

    var parsedAlumnos = JSON.parse(localStorage.getItem("Alumno")); // se crea una variable nueva de alumnos parseados

    if (parsedAlumnos == null) parsedAlumnos = []; // en caso de no encontrar nada dentro del localStorage se crea un array de datos vacio

    var alumno = {
        firstName: nombre.value,
        dni: dni.value,
        lastName: apellido.value,
    };

    localStorage.setItem("Alumno", JSON.stringify(alumno));
    parsedAlumnos.push(alumno);
    localStorage.setItem("Alumno", JSON.stringify(parsedAlumnos));

    crearNodoEstudiante()

    nombre.value = ''
    dni.value = ''
    apellido.value = ''
    botonAgregar.disabled = true
};

botonAgregar.onclick = nuevoAlumno

// La siguiente funcion elimina un alumno del DOM y el localStorage

function eliminarAlumno() {
    var parsedAlumnos = JSON.parse(localStorage.getItem("Alumno"));
    for (let i = 0; i < parsedAlumnos.length; i++) {
        const element = parsedAlumnos[i];
        if (element.dni === eliminar.value) {
            parsedAlumnos = parsedAlumnos.filter(function (alumno) {
                var arraySinAlumno = alumno.dni !== element.dni
                return arraySinAlumno
            })
            localStorage.setItem("Alumno", JSON.stringify(parsedAlumnos));
        }
    }
    botonEliminar.disabled = true
}

botonEliminar.onclick = eliminarAlumno