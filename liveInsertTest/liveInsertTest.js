var areYouSure, rName, rLang, btn = null;
function init() {
	areYouSure = document.getElementById("areYouSure");
	//areYouSure = document.createElement("p");
	//areYouSure.setAttribute("class", "shown");
	//areYouSure.setAttribute("aria-live", "assertive");
	//areYouSure.setAttribute("id", "areYouSure");
	//areYouSure.innerHTML = "Are you sure you want your resum&eacute; to be in French?";
	rName = document.getElementById("rName");
	rLang = document.getElementById("rLang");
	btn = document.getElementById("btn");

	if (areYouSure && rName && rLang) {
		rLang.addEventListener("change", langWarn, false);
	} else {
		console.error ("areYouSure: " + areYouSure + ", rName: " + rName + ", rLang: " + rLang + ".");
	}
	if (btn) {
		btn.addEventListener("click", cnfrm, false);
	} else {
		console.error ("didn't get btn.");
	}
}
function cnfrm () {
	confirm("Do you regret your decision?");
}
function langWarn() {
	console.log("rLang Value: " + rLang.value + ".");
	if (rLang.value == "fra") {
		areYouSure.innerHTML = "Are you sure you want your resum&eacute; to be in French?";
		//rLang.parentNode.insertBefore(areYouSure, rLang);
		//rLang.setAttribute("aria-describedby", "areYouSure");
	} else {
		areYouSure.innerHTML = "";
		//areYouSure.parentNode.removeChild(areYouSure);
		//rLang.removeAttribute("aria-describedby");
	}
}

