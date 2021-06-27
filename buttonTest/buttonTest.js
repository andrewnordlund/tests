let emplTxt = document.getElementById("emplID");

emplTxt.addEventListener("change", warn, false);

function warn (e) {
	if (e.target.value.length < 6) {
		alert ("Not long enough!");
	} else {
		console.log ("long enough.");
	}
}
