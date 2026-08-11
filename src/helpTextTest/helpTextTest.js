var helpBtn1, helpBtn2, fnHelp1, fnHelp2 = null;

helpBtn1 = document.getElementById("helpBtn1");
helpBtn2 = document.getElementById("helpBtn2");
fnHelp1 = document.getElementById("fnHelp1");
fnHelp2 = document.getElementById("fnHelp2");

helpBtn1.addEventListener("click", toggleHelp, false);
helpBtn2.addEventListener("click", toggleHelp, false);

function toggleHelp (e) {
	e.preventDefault();
	var helpBtn = e.target;
	console.log ("Target: " + helpBtn.getAttribute("id") + ".");
	var helpSection = document.getElementById(helpBtn.getAttribute("aria-controls"));

	//console.log ("fnHelp1.className: " + fnHelp1.className + ".");
	if (helpSection.className.match(/none/)) {
		helpSection.className = helpSection.className.replace("none", "show");
		helpBtn.setAttribute("aria-describedby", helpSection.getAttribute("id"));
		helpBtn.setAttribute("aria-expanded", "true");
		//fnHelp1.removeclass("none");
		//fnHelp1.addclass("show");
	} else {
		helpSection.className = helpSection.className.replace("show", "none");
		helpBtn.removeAttribute("aria-describedby");
		helpBtn.setAttribute("aria-expanded", "false");
		//fnHelp1.removeclass("show");
		//fnHelp1.addclass("none");
	}
}
