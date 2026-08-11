//addListener("load", window, init);

function stopDef(e) {
	if (e && e.preventDefault) {
		e.preventDefault();
	} else if (window.event && window.event.returnValue) {
		window.eventReturnValue = false;
	}
	e.returnValue = false;
}
function handleSubmit (e) {
	var e = e || window.event;
	//console.log("Got e: " + typeof(e) + ".");
	stopDef(e);
}
function removeChildren (el) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}

function checkDD (e) {
	var e = e || window.event;
	var KeyID = e.keyCode;// || e.which; //(window.event) ? event.keyCode : e.keyCode;
	//alert ("Checking key: " + KeyID);
	var target = (e.currentTarget) ? e.currentTarget : e.srcElement;
	var extraFields, moreInfo1, moreInfoTxt, submitBtn1 = null;
	extraFields = document.getElementById("extraFields");
	//moreInfoTxt1 = document.getElementById("moreInfoTxt1");
	submitBtn1 = document.getElementById("submitBtn1");
	if (extraFields && submitBtn1) {
		if (target.value == "yes") {
			//alert ("Checking DD");
			//console.log("Showing other part...");
			if (!document.getElementById("moreInfoTxt1")) {
				var moreInfoLbl = document.createElement("label");
				moreInfoLbl.setAttribute("for", "moreInfoTxt1");
				moreInfoLbl.appendChild(document.createTextNode("What did it sound like?"));
				
				moreInfoTxt = document.createElement("input");
				moreInfoTxt.setAttribute("id", "moreInfoTxt1");
				moreInfoTxt.setAttribute("name", "moreInfoTxt1");
				moreInfoTxt.setAttribute("type", "text");

				extraFields.appendChild(moreInfoLbl);
				extraFields.appendChild(moreInfoTxt);

				var testElement = document.createElement("div");
				testElement.setAttribute("id", "testElement");
				extraFields.appendChild(testElement);

				testElement.innerHTML = "<p>This is a redundant paragraph.</p></p>";

				//console.log("Active element: " + document.activeElement + ".");
				//if (document.activeElement == submitBtn1 || document.activeElement == document.body) moreInfoTxt.focus();
			}

		} else {
			//console.log("Hiding other part...");
			//console.log("Active element: " + document.activeElement + ".");
			//submitBtn1.focus();
			//extraFields.classList.add("hidden");
			var removing = false;
			if (document.getElementById("moreInfoTxt1")) {
				removing = true;
				//console.log("Active element: " + document.activeElement + ".");
				removeChildren(extraFields);
			}
			//console.log("Active element: " + document.activeElement + ".");
			//if (removing && document.activeElement == document.body) submitBtn1.focus();
		}
	}
}

function init () {
	var submitBtn1 = null;
	submitBtn1 = document.getElementById("submitBtn1");
	if (submitBtn1) {
		submitBtn1.addEventListener("click", handleSubmit, false);
	}

	var handClappingDD = null;
	handClappingDD = document.getElementById("handClappingDD");
	if (handClappingDD) {
		handClappingDD.addEventListener("blur", checkDD, false);
	}
	//alert ("Inited...");
}
//alert ("Loaded");
