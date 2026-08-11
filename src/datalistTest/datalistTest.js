let inTxt1 = document.getElementById("inTxt1");
let inTxt2 = document.getElementById("inTxt2");
let out1 = document.getElementById("output1");
let out2 = document.getElementById("output2");

console.log ("got inTxt.");
inTxt1.addEventListener("change", warn, false);
inTxt2.addEventListener("change", warn, false);
//inTxt.addEventListener("keydown", stopSubmit, false);

function warn (e) {
	console.log ("got value: " + e.target.value + ".");
	let id = e.target.id;
	let r = new RegExp("/\D/");
	let num = id.replaceAll(/\D/g, "");
	let output = out1;
	if (num ==2) output = out2;
	output.textContent = e.target.value;
} // End of warn

function stopSubmit (e) {
	if(e.keyCode == 13) {
    	e.preventDefault();
    	return false;
	}
} // End of stopSubmit
