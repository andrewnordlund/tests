let sizeDiv = null;
//let resizeBtn = null;
let theWidth = 0;

sizeDiv = document.getElementById("sizeDiv");
//resizeBtn = document.getElementById("resizeBtn");

if (sizeDiv) {
	setWidthText();
	window.addEventListener("resize", setWidthText, false);

	//resizeBtn.addEventHandler("click", resizeWin, false);
}

function setWidthText () {
	sizeDiv.innerHTML = window.innerWidth + "px";
} // End of setWidthText

/*
function resizeWin () {
	window.resizeTo
} // End of resizeWin
*/
