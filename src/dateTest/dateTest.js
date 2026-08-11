var dateTestTxt = document.getElementById("dateTest");
var results = document.getElementById("results");
var submitBtn =document.getElementById("submitBtn");
var clearBtn =document.getElementById("clearBtn");

//dateTestTxt.addEventListener("change", getDay, false);
submitBtn.addEventListener("click", function() {
	let result = nordburg.getDateAsString(dateTestTxt.value);
	results.innerHTML = "Date: " + result + ".";
}, false);

clearBtn.addEventListener("click", function() {
	dateTestTxt.value = "";
	dateTestTxt.focus();
}, false);

function getDay() {
	console.log ("Got date: " + dateTestTxt.value + ".");
	var parts = dateTestTxt.value.match(/(\d+)-(\d+)-(\d+)/);
	var year = parts[1];
	var month = parts[2];
	var day = parts[3];
	console.log ("Got date: " + year + "-" + month + "-" + day + ".");

	var date = new Date(year, month-1, day);
	console.log ("Which translates to " + date.toString() + ".");

	results.innerHTML = "day of week: " + date.getDay() + ".";
}
