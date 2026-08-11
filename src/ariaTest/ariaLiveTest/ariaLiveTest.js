dbug = true;
var fcs = {
	"preloadTA" : null,
	"preloadTACharCount" : null,
	"preloadTA2" : null,
	"preloadTACharCount2" : null,
	"lastSection" : null,
	"addTABtn" : null
	}

function init () {
	if (dbug) console.log ("Initing.");
	for (var fc in fcs) {
		if (dbug) console.log("Working with tab: " + fc + ".");
		try {
			//console.log ("Trying to get " + tab + "HolderLi.");
			fcs[fc] = document.getElementById(fc);
			if (fc.match("addTABtn")) {
				fcs[fc].addEventListener("click", addContent, false);
			} else if (fc == "preloadTACharCount2") {
				fcs[fc].setAttribute("aria-live", "polite");
			} else if (fc.match(/preloadTA2?$/)) {
				if (dbug) console.log ("Adding charCount listener to " + fc + ".");
				fcs[fc].addEventListener("input", countChars, false);
			}
		}
		catch (ex) {
			console.log("Exception: " + ex.toString());
		}
	}
	//showSelected(list["friends"]["link"], list["friends"]["div"]);
}

function addContent (ev) {
	let ta = ev.target;
	let section = ta.parentNode;
	
	let newDiv = document.createElement("div");
	newDiv.setAttribute("class", "fieldHolder");

	section.appendChild(newDiv);

	let newLabel = document.createElement("label");
	newLabel.setAttribute("for", "postloadTA");
	newLabel.textContent = "Write your life story";
	newDiv.appendChild(newLabel);

	let newTA = document.createElement("textarea");
	newTA.setAttribute("id", "postloadTA");
	newTA.setAttribute("aria-describedby", "postloadTACharCount");
	newDiv.appendChild(newTA);

	let postloadTACharCount = document.createElement("div");
	postloadTACharCount.setAttribute("id", "postloadTACharCount");
	newDiv.appendChild(postloadTACharCount);

	fcs["postloadTA"] = newTA;
	fcs["postloadTACharCount"] = postloadTACharCount;

	newTA.addEventListener("input", countChars, false);
	postloadTACharCount.setAttribute("aria-live", "polite");
	postloadTACharCount.textContent = 500;

} // End of addContent

function countChars (ev) {
	try {
		let ta = ev.target;
		let taID = ta.getAttribute("id");
		let charCountID = ta.getAttribute("aria-describedby");
		let charCountDiv = fcs[charCountID];

		let charsLeft = 500 - ta.value.length;
		charCountDiv.textContent = charsLeft;
	}
	catch (ex) {
		console.error(ex.toString());
	}

} // End of countChars
init();
