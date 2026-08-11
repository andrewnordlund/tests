var testRange2, testRange2Out, testRange3, testRange3Out = null;

function init () {
	console.log("Initting.");
	try {
		testRange2 = document.getElementById("testRange2");
		testRange2Out = document.getElementById("testRange2Out");
		testRange3 = document.getElementById("testRange3");
		testRange3Out = document.getElementById("testRange3Out");

		addEvent("input", testRange2, updateOutputs)
		addEvent("input", testRange3, updateOutputs)
		//testRange2.addEventListener("input", updateOutputs, false);
		testRange2Out.innerHTML = testRange2.value;
		//testRange3.addEventListener("input", updateOutputs, false);
		testRange3Out.innerHTML = testRange3.value;
		console.log("init worked.");
	}
	catch (ex) {
		console.error("Exception: " + ex.toString());
	}
}
function updateOutputs(e) {
	console.log("Updating output.");
	//alert("Updating output.");
	var control = e.srcElement || e.originalTarget || event.target;

	console.log(control.getAttribute("id"));
	
	try {
		var out = document.getElementById(control.getAttribute("id") + "Out");
		removeChildren(out);
		out.appendChild(document.createTextNode(control.value));
	}
	catch (ex) {
		console.error("Exception: " + ex.toString());
	}
}
function removeChildren (el) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}
function addEvent(evnt, elem, func) {
   console.log ("Going to attach event " + evnt + " to " + elem.getAttribute("id") + ".");
   if (elem.addEventListener)  { // W3C DOM
	  console.log ("adding event " + evnt + " to " + elem.getAttribute("id") + ".");
	   elem.addEventListener(evnt,func,false);
	   if (evnt == "input") { 
		   evnt = "change";
		elem.addEventListener(evnt,func,false);
	   }
      elem.addEventListener(evnt,func,false);
   } else if (elem.attachEvent) { // IE DOM
	   if (evnt == "input") evnt = "change";
	   console.log ("attaching event " + evnt + " to " + elem.getAttribute("id") + ".");
      elem.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      elem[evnt] = func;
   }
}
console.log("slider.js loaded.");
