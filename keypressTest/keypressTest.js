let results = null;

results = document.getElementById("results");

document.addEventListener("keydown", checkKeyDown, false);


function checkKeyDown(e) {
	results.innerHTML += `KeyCode: ${e.keyCode}, key: ${e.key}, code: ${e.code}.<br>`;
} // End of checkKeyDown
