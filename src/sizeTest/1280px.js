let sizeDiv, main = null;
//let resizeBtn = null;
let theWidth = 0;

main = document.getElementsByTagName("main")[0];
sizeDiv = document.getElementById("sizeDiv");
//resizeBtn = document.getElementById("resizeBtn");

if (sizeDiv) {
	setWidthText();
	window.addEventListener("resize", setWidthText, false);

	//resizeBtn.addEventHandler("click", resizeWin, false);
}

function setWidthText () {
	sizeDiv.innerHTML = window.innerWidth + "px";
	if (window.innerWidth == 1280) {
		main.classList.add("rightSize");
		sizeDiv.innerHTML += " Ready for Reflow"
		console.log ("Adding rightSize class.");
	} else {
		main.classList.remove("rightSize");
	}
} // End of setWidthText

/*
function resizeWin () {
	window.resizeTo
} // End of resizeWin
*/
