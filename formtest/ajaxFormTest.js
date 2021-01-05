console.log ("loaded the jsFile.");
window.addEventListener ("load", function () {
	console.log("Load event fired.");
	var theForm = null, submitBtn = null;
	theForm = document.getElementById("theForm");
	if (theForm) {
		submitBtn = document.getElementById("submitBtn1");
		submitBtn.addEventListener("click", function (e) {
			e.preventDefault();
			console.log("Clicked");
			theForm.submit();
		}, false);
	} else {
		console.log("Couldn't get form");
	}
}, false);
