
var fcs = {"trueDiv" : null,
	"falseDiv" : null,
	"absentDiv" : null,
	"trueAddBtn" : null,
	"falseAddBtn" : null,
	"absentAddBtn" : null,
	"trueTxt" : null,
	"falseTxt" : null,
	"absentTxt" : null,
}

function init () {
	console.log ("Initing.");
	for (var fc in fcs) {
		console.log("Working with tab: " + fc + ".");
		try {
			//console.log ("Trying to get " + tab + "HolderLi.");
			fcs[fc] = document.getElementById(fc);
			if (fc.match("AddBtn")) {
				fcs[fc].addEventListener("click", addContent, false);
			} else {
			}
		}
		catch (ex) {
			console.log("Exception: " + ex.toString());
		}
	}
	//showSelected(list["friends"]["link"], list["friends"]["div"]);
}

function addContent (ev) {
	ev.preventDefault();
	var fc = ev.target.getAttribute("id");
	var div = fcs[fc.replace("AddBtn", "Div")];
	var txt = fcs[fc.replace("AddBtn", "Txt")].value;

	let youSaidSpan = document.createElement("span");
	youSaidSpan.setAttribute("class", "wb-inv");
	youSaidSpan.appendChild(document.createTextNode("You said "));

	let yourQuestionP = document.createElement("p");
	yourQuestionP.setAttribute("tabindex", "0");
	//yourQuestionP.setAttribute("aria-label", "You said");  // <-- This ain't workin' in either Chrome or Firefox
	yourQuestionP.setAttribute("class", "convoBit myBit");
	
	yourQuestionP.appendChild(youSaidSpan);
	yourQuestionP.appendChild(document.createTextNode(txt));

	div.appendChild(yourQuestionP);
	fcs[fc.replace("AddBtn", "Txt")].value = "";
	//fcs[fc.replace("AddBtn", "Txt")].setAttribute("disabled", "disabled");
	setTimeout(function() {
		let compySaidSpan = document.createElement("span");
		compySaidSpan.setAttribute("class", "wb-inv");
		compySaidSpan.appendChild(document.createTextNode("Computer said "));

		let resp = document.createElement("p");
		resp.setAttribute("tabindex", "0");
		//resp.setAttribute("aria-label", "Compy said");
		resp.setAttribute("class", "convoBit compyBit");
		resp.appendChild(compySaidSpan);
		resp.appendChild(document.createTextNode("I know you are, but what am I?"));

		div.appendChild(resp);
		//fcs[fc.replace("AddBtn", "Txt")].removeAttribute("disabled");
	}, 1500);

} // End of addContent
init();
