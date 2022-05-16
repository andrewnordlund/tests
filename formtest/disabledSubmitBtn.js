let fcs = {
	"firstname" : null,
	"lastname" : null,
	"email" : null,
	"address1" : null,
	"address2" : null,
	"city" : null,
	"province" : null,
	"postalCode" : null,
	"submitBtn1" :  null
}
let conditions = {
	"postalCode" : false,
}

function init () {
	for (let fc in fcs) {
		fcs[fc] = document.getElementById(fc);
	}
	fcs["postalCode"].addEventListener("change", checkPC, false);
} // End of init

function checkPC () {
	setCondition ("postalCode", (fcs["postalCode"].value.match(/^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/) ? true : false)); 
} // End of checkPC

function setCondition (thing, value) {
	console.log (`Setting condition ${thing} to ${value}.`);
	conditions[thing] = value;

	let allSet = true;
	for (let thing in conditions) {
		if (conditions[thing] === false) allSet = false;
	}
	if (allSet) fcs["submitBtn1"].removeAttribute("disabled");
	else fcs["submitBtn1"].setAttribute("disabled", "disabled");
} // End of setCondition

init ();
