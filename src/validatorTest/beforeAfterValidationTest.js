var genNewCodeBtn, newCode = null;
genNewCodeBtn = document.getElementById("genNewCodeBtn");
newCode = document.getElementById("newCode");

if (genNewCodeBtn && newCode) {
	genNewCodeBtn.addEventListener("click", addBadCode, false);

} else {
	console.error("Couldn't do the thing.");
}

function addBadCode () {
	newCode.innerHTML += "\n\t<div id=\"div1\">\n\t<label for=\"foo\">Write some stuff</label>\n<input id=\"bar\">\n";
}

function init () {
	newCode.innerHTML += "\n\t<div id=\"div1\"><font color=\"red\">Stuff goes here!</div>\n";
}

init ();
