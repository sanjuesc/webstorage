/* postits.js
 *
 */

window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	var borrar = document.getElementById("clearStickyNotes");
	borrar.onclick = clearStickyNotes;
	// EJERCICIO A
	// cargar las notas postit de localStorage  
	// cada nota se guarda como un par así: postit_X = texto_de_la_nota
	// donde X es el número de la nota
	// por cada una de ellas, llamar al método
	// addStickyToDOM(texto_de_la_nota);
	for (let i = 0; i < localStorage.length; i++){
		addStickyToDOM(localStorage["postit_"+i]);
	}
	mostrarEspacio() //esta llamada es para mostrar el espacio si no hay postit
}

function createSticky() {
	var value = document.getElementById("note_text").value;

	// EJERCICIO B
        // crear la nota con nombre postit_X, donde X es un número entero
	// (postit_1, postit_2, ...)  y guardarla en el localStorage
	localStorage["postit_"+localStorage.length] = value;
	addStickyToDOM(value);

}


function addStickyToDOM(value) {
	var stickies = document.getElementById("stickies");
	var postit = document.createElement("li");
	var span = document.createElement("span");
	span.setAttribute("class", "postit");
	span.innerHTML = value;
	postit.appendChild(span);
	stickies.appendChild(postit);
	mostrarEspacio()

}

function clearStickyNotes() {

	// EJERCICIO C
	// Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
	// elimine las notas de pantalla y de localStorage
	// Algoritmo:	
	// obtener una referencia a la capa "stickies"
	// recorrer los hijos (childNodes) de esa referencia,
	// eliminándolos uno a uno (removeChild)

	const stickies = document.getElementById('stickies');
	const postits = stickies.getElementsByTagName('li');

	while(postits.length){ //un poco "hack" hacer esto pero bueno
		stickies.removeChild(postits[0]);
	}
	localStorage.clear()
	mostrarEspacio()
}

function mostrarEspacio(){ //https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
	var _lsTotal = 0,
		_xLen, _x;
	for (_x in localStorage) {
		if (!localStorage.hasOwnProperty(_x)) {
			continue;
		}
		_xLen = ((localStorage[_x].length + _x.length) * 2);
		_lsTotal += _xLen;
	};
	var espacioDisponible = document.getElementById("espacio");
	espacioDisponible.innerHTML="Espacio en uso = " + (_lsTotal / 1024).toFixed(2) + " KB";
}
