let fontOL = document.getElementById("fontOL");

for (let i = 9984; i <= 10020; i++) {
	let newLI = document.createElement("li");
	newLI.textContent = i + ": " + String.fromCharCode(i);
	fontOL.appendChild(newLI);
}
