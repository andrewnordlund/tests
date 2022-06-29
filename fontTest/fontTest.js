let fontOL = document.getElementById("fontOL");
let fontFams = [
"Arial",
"Verdana",
"Helvetica",
"Tahoma",
"Trebuchet MS",
"Times New Roman",
"Georgia",
"Garamond",
"Courier New",
"Brush Script MT"
];

for (let i = 0; i < fontFams.length; i++) {
	let newLI = document.createElement("li");
	newLI.setAttribute("style", "font-family: " + fontFams[i]);
	newLI.textContent = fontFams[i] + ": ✓"; //i + ": " + String.fromCharCode(i);
	fontOL.appendChild(newLI);
}
