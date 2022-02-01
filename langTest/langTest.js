let langSel = null;

langSel = document.getElementById("langSel");
langSel.addEventListener("change", toggleLang, false);

function toggleLang (e) {
	console.log ("Toggling language...");
	console.log ("Language: " + document.documentElement.lang + ".");
	document.documentElement.lang = (document.documentElement.lang === "en" ? "fr" : "en");
	console.log ("Language: " + document.documentElement.lang + ".");
} // End of toggleLang
