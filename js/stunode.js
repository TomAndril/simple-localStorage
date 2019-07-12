var testList = ['CARLOS', 'GERONIMO', 'NICOLAS', 'LUCAS']

function setLocalList(key, arr) {

    if (typeof key === 'string' && Array.isArray(arr)) {
        const arrToJson = JSON.stringify(arr)
        localStorage.setItem(key, arrToJson)
    } else {
        console.log('El primer parametro debe ser un string y el segundo el array a recorrer')
    }
}

setLocalList('studentsList', testList)

function getLocalList(key) {
    var arrayVacio = []
    var getKey = localStorage.getItem(key)
    var keyParser = JSON.parse(getKey)
    if (keyParser === null) {
        return arrayVacio
    } else {
        return keyParser
    }
}

console.log(getLocalList('studentsList'))