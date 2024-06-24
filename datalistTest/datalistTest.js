let inTxt = document.getElementById("inTxt");
console.log ("got inTxt.");
inTxt.addEventListener("change", warn, false);
//inTxt.addEventListener("keydown", stopSubmit, false);

function warn (e) {
	console.log ("got value: " + e.target.value + ".");
} // End of warn

function stopSubmit (e) {
	if(e.keyCode == 13) {
    	e.preventDefault();
    	return false;
	}
} // End of stopSubmit
