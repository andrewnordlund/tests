let fontOL = document.getElementById("fontOL");
let fontFams = [
"Arial",
"Verdana",
"Helvetica",
"Tahoma",
"Trebuchet MS",
"Times New Roman",
"Times",
"Georgia",
"Geneva",
"Garamond",
"Courier New",
"Brush Script MT",
"cursive",
"Courier New",
"Courier",
"Coperplate",
"Papyrus",
"fantasy",
"monospace",
"serif",
"sans-serif",
];

for (let i = 0; i < fontFams.length; i++) {
	let newLI = document.createElement("li");
	newLI.setAttribute("style", "font-family: " + fontFams[i]);
	newLI.textContent = fontFams[i] + ": ✓"; //i + ": " + String.fromCharCode(i);
	fontOL.appendChild(newLI);
}
