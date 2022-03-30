let langSel, p1 = null;

langSel = document.getElementById("langSel");
p1 = document.getElementById("p1");

langSel.addEventListener("change", toggleLang, false);

function toggleLang (e) {
	console.log ("Toggling language...");
	console.log ("Language: " + document.documentElement.lang + ".");
	if (document.documentElement.lang === "en") {
		document.documentElement.lang = "fr";
		p1.textContent = "Ceci est le premier paragraphe.";
	} else {
		document.documentElement.lang = "en";
		p1.textContent = "This is the first paragraph.";
	}
	console.log ("Language: " + document.documentElement.lang + ".");
} // End of toggleLang
