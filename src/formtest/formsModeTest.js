let dbug = false;
let menus = null;
let handClappingDD = null;
function init() {
	let params = (new URL(document.location)).searchParams;
	if (params.get("dbug") == "true") {
		dbug = true;
	}

	handClappingDD = document.getElementById("handClappingDD");
	
	if (params.get("handClappingDD") == "yes") {
		//document.querySelector("option[value=yes"]).
		handClappingDD.value="yes";
		let formDiv = document.getElementById("formDiv");
		let errorListDiv = document.createElement("div");
		errorListDiv.classList.add("errorList");
		let errorH2 = document.createElement("h2");
		errorH2.textContent = "You have some errors";
		errorListDiv.appendChild(errorH2);

		let errorList = document.createElement("ol");
		let errorLI = document.createElement("li");
		let errorA = document.createElement("a");
		errorA.setAttribute("href", "#handClappingDD");
		errorA.textContent = "Error: No you don't know the sound of one hand clapping!";

		errorLI.appendChild(errorA);
		errorList.appendChild(errorLI);
		errorListDiv.appendChild(errorList);

		formDiv.insertBefore(errorListDiv, formDiv.firstChild)


		let responseDiv = createNoYouDont();
		responseDiv.classList.add("errorMsg");
		responseDiv
		responseDiv.id="handClappingErr";
		handClappingDD.setAttribute("aria-describedby", "handClappingErr");
		handClappingDD.parentNode.insertBefore(responseDiv, handClappingDD.nextSibling);

	}
	menus = document.querySelectorAll("ul.menu");
	if (dbug) console.log (`Got ${menus.length} menus.`);
	for (let i = 0; i<menus.length; i++) {
		let menuitems = menus[i].querySelectorAll("li");
		if (dbug) console.log (`Got ${menuitems.length} menuitems.`);
		for (let j = 0; j<menuitems.length; j++) {
			menuitems[j].addEventListener("keydown", menuKeypressHander, false);
		}
	}

	handClappingDD.addEventListener("change", handClappingHandler, false);

} // End of init

function handClappingHandler (ev) {
	if (dbug) console.log ("Selected: " + ev.target.value);
	if (ev.target.value.match(/yes/i)) {
		let responseDiv = null;
		responseDiv = document.getElementById("responseDiv");
		if (!responseDiv) {
			responseDiv = createNoYouDont();
			responseDiv.id="responseDiv";
			ev.target.parentNode.insertBefore(responseDiv, ev.target.parentNode.firstChild);
			setTimeout (function() {
				responseDiv.parentNode.removeChild(responseDiv);
			}, 5000);
		}
	}
} // End of handClappingHandler

function createNoYouDont () {
	responseDiv = document.createElement("div");
	responseDiv.setAttribute("aria-live", "assertive");
	responseDiv.textContent = "No you don't";
	return responseDiv;
} // End of createNoYouDont

function menuKeypressHander (ev) {
	//if (dbug) console.log ("Pressed " + ev.keyCode + ".");
	if (ev.keyCode == 40) { // down
		ev.preventDefault();
		//if (dbug) console.log ("Pressed down.  nextSibling: " + ev.target.nextSibling.nodeName +".");
		if (ev.target.nextElementSibling != null) {// == "LI") {
			ev.target.nextElementSibling.focus();
		} else {
			// We're at the top....gotta get to the bottom
			ev.target.parentNode.firstElementChild.focus();
		}
	} else if (ev.keyCode == 38) { // Up
		ev.preventDefault();
		//if (dbug) console.log ("Pressed down.  previousSibling: " + ev.target.previousElementSibling.nodeName +".");
		if (ev.target.previousElementSibling != null) { // == "LI") {
			ev.target.previousElementSibling.focus();
		} else {
			// We're at the top....gotta get to the bottom
			ev.target.parentNode.lastElementChild.focus();
		}
	}
}

init()
