let ta = document.getElementById("textTest");
let ta2 = document.getElementById("textTest2");
let ta3 = document.getElementById("textTest3");
let ta4 = document.getElementById("textTest4");

let charsLeftDiv = document.createElement ("div");
charsLeftDiv.setAttribute("id", "charsLeftDiv");
charsLeftDiv.innerHTML = "You have 4000 characters left.";
ta.setAttribute("aria-describedby", (ta.hasAttribute("aria-describedby")? ta.getAttribute("aria-describedby") + " charsLeftDiv" : "charsLeftDiv"));
ta.addEventListener("input", updateCharCount, false);
ta.parentNode.appendChild(charsLeftDiv);

let charsLeftDiv2 = document.createElement ("div");
charsLeftDiv2.setAttribute("id", "charsLeftDiv2");
charsLeftDiv2.setAttribute("aria-live","polite");
charsLeftDiv2.innerHTML = "You have 4000 characters left.";
ta2.addEventListener("input", updateCharCount2, false);
ta2.parentNode.appendChild(charsLeftDiv2);

let charsLeftDiv3 = document.createElement ("div");
//ta3.setAttribute("aria-describedby", (ta.hasAttribute("aria-describedby")? ta3.getAttribute("aria-describedby") + " charsLeftDiv3" : "charsLeftDiv3"));
charsLeftDiv3.setAttribute("id", "charsLeftDiv3");
charsLeftDiv3.innerHTML = "You have 4000 characters left.";
ta3.addEventListener("input", updateCharCount3, false);
ta3.parentNode.appendChild(charsLeftDiv3);

let liveRegionDiv = document.createElement("div");
liveRegionDiv.setAttribute("aria-live", "assertive");
liveRegionDiv.setAttribute("id", "liveRegionDiv");
liveRegionDiv.classList.add("sr-only");
//liveRegionDiv.innerHTML = charsLeftDiv3.innerHTML;
ta3.parentNode.appendChild(liveRegionDiv);

let charsLeftDiv4 = document.createElement ("div");
charsLeftDiv4.setAttribute("id", "charsLeftDiv4");
charsLeftDiv4.innerHTML = "You have 4000 characters left.";
ta4.addEventListener("input", updateCharCount4, false);
//ta4.setAttribute("aria-describedby", (ta4.hasAttribute("aria-describedby")? ta4.getAttribute("aria-describedby") + " charsLeftDiv4" : "charsLeftDiv4"));
let waitInterval = null;
ta4.addEventListener("keyup", startWait, false);
ta4.addEventListener("blur", function() { clearInterval(waitInterval); waitInterval=null;});
ta4.parentNode.appendChild(charsLeftDiv4);

let liveRegionDiv2 = document.createElement("div");
liveRegionDiv2.setAttribute("aria-live", "assertive");
liveRegionDiv2.setAttribute("id", "liveRegionDiv2");
liveRegionDiv2.classList.add("sr-only");

ta4.parentNode.appendChild(liveRegionDiv2);

function updateCharCount (e) {
	let d = e.target;
	let maxlen = d.getAttribute("maxLength");
	let remain = maxlen - d.value.length;
	charsLeftDiv.innerHTML = "You have " + remain + " characters left.";
}

function updateCharCount2 (e) {
	let maxlen = e.target.getAttribute("maxLength");
	let remain = maxlen - e.target.value.length;
	charsLeftDiv2.innerHTML = "You have " + remain + " characters left.";
}

function updateCharCount3 (e) {
	let maxlen = e.target.getAttribute("maxLength");
	let remain = maxlen - e.target.value.length;
	charsLeftDiv3.innerHTML = "You have " + remain + " characters left.";
	if (remain % 10 == 0) liveRegionDiv.innerHTML = "You have " + remain + " characters left";
}

function updateCharCount4 (e) {
	let maxlen = e.target.getAttribute("maxLength");
	let remain = maxlen - e.target.value.length;
	charsLeftDiv4.innerHTML = "You have " + remain + " characters left.";
}
function startWait (e) {
	if (waitInterval) {
		//console.log ("Clearning interval: " + waitInterval);
		clearTimeout(waitInterval);
		waitInterval = null;
	}
		waitInterval = setTimeout(function(){/*console.log ("Setting text to live region.");*/liveRegionDiv2.innerHTML = charsLeftDiv4.innerHTML; clearInterval(waitInterval); waitInterval = null;}, 1000);
		//console.log ("Setting interval: " + waitInterval);
	
}
