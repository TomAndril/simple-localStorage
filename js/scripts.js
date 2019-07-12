// se crean variables que toman los valores del nombre y DNI y toma la lista de alumnos desde el localStorage

var botonAgregar = document.getElementById('botonAgregar');
var botonEliminar = document.getElementById('botonEliminar')
var nombre = document.getElementById('nombreAlumno');
var dni = document.getElementById('dniAlumno');
var eliminar = document.getElementById('eliminarAlumno')
var listaAlumnos = localStorage.getItem('Alumno')

// se van a validar los cambios de nombre y DNI y se va a habilitar el boton de agregar alumno en caso de que los 2 campos esten validados

function nameValidator(event) {
    var inputNode = event.target;
    if (inputNode.value != '') {
        nombre.classList.remove('is-invalid')
        nombre.classList.add('is-valid')
        botonAgregar.disabled = false
    } else {
        nombre.classList.add('is-invalid')
        nombre.classList.remove('is-valid')
        botonAgregar.disabled = true
    }
}

function dniValidator(event) {
    var inputNode = event.target;
    var dniEncontrado = listaAlumnos.indexOf(dni.value)
    if (inputNode.value != '' && inputNode.value > 0 && dniEncontrado <= 0) {
        dni.classList.remove('is-invalid')
        dni.classList.add('is-valid')
        botonAgregar.disabled = false
    } else {
        dni.classList.add('is-invalid')
        dni.classList.remove('is-valid')
        botonAgregar.disabled = true
    }
}

function eliminarValidator(event) {
    var inputNode = event.target;
    var dniEncontrado = listaAlumnos.indexOf(eliminar.value)
    if (inputNode.value != '' && dniEncontrado >= 0) {
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
dni.onblur = dniValidator
eliminar.onblur = eliminarValidator

// La funcion de abajo crea un nodo alumno

function createStudentNode() {
    var centralParentNode = document.getElementById('mainList')
    var liNodeCreator = document.createElement('li')
    var h1NodeCreator = document.createElement('h1')
    var h3NodeCreator = document.createElement('h3')

    liNodeCreator.className = 'list-group-item'

    centralParentNode.appendChild(liNodeCreator)
    liNodeCreator.appendChild(h1NodeCreator).innerHTML = 'Nombre: ' + nombre.value
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
            liNodeCreator.appendChild(h1NodeCreator).innerHTML = 'Nombre: ' + parsedAlumnos[i].firstName
            liNodeCreator.appendChild(h3NodeCreator).innerHTML = 'DNI: ' + parsedAlumnos[i].dni
        }
    }
}
mostrarAlumnosExistentes();

// funcion que crea un nodo alumno

function createStudentNode() {
    var centralParentNode = document.getElementById('mainList')
    var liNodeCreator = document.createElement('li')
    var h1NodeCreator = document.createElement('h1')
    var h3NodeCreator = document.createElement('h3')

    liNodeCreator.className = 'list-group-item'

    centralParentNode.appendChild(liNodeCreator)
    liNodeCreator.appendChild(h1NodeCreator).innerHTML = 'Nombre: ' + nombre.value
    liNodeCreator.appendChild(h3NodeCreator).innerHTML = 'DNI: ' + dni.value
}

// Se agrega una funcion que sube objetos alumno al localStorage

function nuevoAlumno() {

    var parsedAlumnos = JSON.parse(localStorage.getItem("Alumno")); // se crea una variable nueva de alumnos parseados

    if (parsedAlumnos == null) parsedAlumnos = []; // en caso de no encontrar nada dentro del localStorage se crea un array de datos vacio
    
    var alumno = {
        firstName: nombre.value,
        dni: dni.value
    };

    localStorage.setItem("Alumno", JSON.stringify(alumno));
    parsedAlumnos.push(alumno);
    localStorage.setItem("Alumno", JSON.stringify(parsedAlumnos));
    createStudentNode()
};

botonAgregar.onclick = nuevoAlumno

function eliminarAlumno() {
    
}
