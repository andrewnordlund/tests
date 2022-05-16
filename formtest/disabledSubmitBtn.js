let fcs = {
	"firstname" : null,
	"lastname" : null,
	"email" : null,
	"phoneNumbersFS" : null,
	"address1" : null,
	"address2" : null,
	"city" : null,
	"province" : null,
	"postalCode" : null,
	"submitBtn1" :  null
}
let conditions = {
	"postalCode" : false,
	"email" : false
}

let phones = new Map();

function init () {
	for (let fc in fcs) {
		fcs[fc] = document.getElementById(fc);
	}
	fcs["postalCode"].addEventListener("change", checkPC, false);
	fcs["email"].addEventListener("change", checkEmail, false);

	fcs["submitBtn1"].addEventListener("click", function(){alert("Ouch!");}, false);

	addPhone();
} // End of init

function addPhone () {
	let id = phones.size;

	let div = createHTMLElement(document, "div", {"id" : "phoneHolder" + id, "parentNode":fcs["phoneNumbersFS"], "class":"phoneNumber"});
	
	let phoneLbl = createHTMLElement(document, "label", {"for":"phone"+id, "parentNode":div, "textNode":"Phone number:"});
	let phoneTxt = createHTMLElement(document, "input", {"type":"text", "id":"phone"+id, "parentNode":div, "name":"phone"+id});

	let phoneTypeLbl = createHTMLElement(document, "label", {"for":"phoneType"+id, "parentNode":div, "textNode":"Type"});
	let phoneTypeSel = createHTMLElement(document, "select", {"id":"phoneType"+id, "name":"phoneType"+id, "parentNode":div});
	let types = ["Mobile", "Land-line", "Work", "Fax", "Pager", "Party Line", "Other"];
	for (let i=0; i<types.length; i++) {
		let phoneOpt = createHTMLElement(document, "option", {"value":types[i], "parentNode":phoneTypeSel, "textNode":types[i]});
	}
	let rmBtn = createHTMLElement(document, "button", {"id":"rmPhone" + id, "parentNode":div, "aria-labelledby":"rmLbl phoneType" + id + " phone" + id, "disabled":"disabled", "textNode":"-", "type":"button"});
	let addBtn = createHTMLElement(document, "button", {"id":"addPhone" + id, "parentNode":div, "aria-labelledby":"addLbl", "textNode":"+", "disabled":"disabled", "type":"button"});

	phoneTxt.addEventListener("change", checkPhone, false);

	addBtn.addEventListener("click", function () {
			addPhone().focus();
		}, false);
	rmBtn.addEventListener("click", removePhone, false);

	phones.set(id, div);
	return phoneTxt;
} // End of addPhone

function removePhone (ev) {
	let id = ev.originalTarget.id.replace(/\D/g, "");
	phones.delete(parseInt(id));
	let phoneHolder = document.getElementById("phoneHolder" + id);
	fcs["phoneNumbersFS"].removeChild(phoneHolder);
	if (phones.size == 0) {
		addPhone().focus();
	} else {
	}
} // End of removePhone

function getPrev(mp, index) {
} // End of getPrev

function checkPC (ev) {
	setCondition ("postalCode", (fcs["postalCode"].value.match(/^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/) ? true : false)); 
} // End of checkPC

function checkEmail (ev) {
	setCondition ("email", (fcs["email"].value.match(/^\S+@\S+\.\S+$/) ? true : false)); 
} // End of checkEmail

function checkPhone(ev) {
	let id = ev.originalTarget.id.replace(/\D/g, "");
	if (ev.originalTarget.value.match(/\S/)) {
		document.getElementById("addPhone" + id).removeAttribute("disabled");
		document.getElementById("rmPhone" + id).removeAttribute("disabled");
	} else {
		
		document.getElementById("addPhone" + id).setAttribute("disabled", "disabled");
		document.getElementById("rmPhone" + id).setAttribute("disabled", "disabled");
	}
} // End of checkPhone

function setCondition (thing, value) {
	conditions[thing] = value;

	let allSet = true;
	for (let thing in conditions) {
		if (conditions[thing] === false) allSet = false;
	}
	if (allSet) fcs["submitBtn1"].removeAttribute("disabled");
	else fcs["submitBtn1"].setAttribute("disabled", "disabled");
} // End of setCondition


function createHTMLElement (creator, type, attribs) {
	var dbug = (((arguments.length == 4 &&arguments[3] != null && arguments[3] != undefined)) ? true : false);
	if (dbug) console.log ("createHTMLElement::dbug: " + dbug + " because arguments.length: " + arguments.length + ", and argument[3]: " + arguments[3] + ".");
	if (dbug) console.log("nordburg::createHTMLElement " + type + (attribs.hasOwnProperty("id") ? "#" + attribs["id"] : "") + (attribs.hasOwnProperty("textNode") ? " containing " + attribs["textNode"] : "") + ".");
	// From: http://stackoverflow.com/questions/26248599/instanceof-htmlelement-in-iframe-is-not-element-or-object
	var iwin = window;
	// idiv instanceof iwin.HTMLElement; // true
	var newEl = creator.createElement(type);
	for (var k in attribs) {
		if (dbug) console.log ("Checking attrib " + k + ".");
		if (k == "parentNode") {
			if (dbug) console.log("createHTMLElement::Dealing with parentnode.");
			var parentNode = getHTMLElement(creator, attribs[k], dbug);
			try {
				if (attribs.hasOwnProperty("insertBefore")) {
					var beforeEl = getHTMLElement(creator, attribs["insertBefore"], dbug);
					parentNode.insertBefore(newEl, beforeEl);
				} else if (attribs.hasOwnProperty("insertAfter")) {
					var afterEl = getHTMLElement(creator, attribs["insertAfter"], dbug);
					parentNode.insertBefore(newEl, afterEl.nextSibling);
				} else {
					parentNode.appendChild(newEl);
				}
			}
			catch (er) {
				console.error("Error appending newEl to parentNode: " + er.message + ".");
			}
		} else if (k == "textNode" || k == "nodeText") {
			if (typeof (attribs[k]) == "string") {
				newEl.appendChild(creator.createTextNode(attribs[k]));
			} else if (attribs[k] instanceof iwin.HTMLElement || attribs[k] instanceof HTMLElement) {
				newEl.appendChild(attribs[k]);
			} else {
				newEl.appendChild(creator.createTextNode(attribs[k].toString()));
			}
		} else if (k.match(/^insert(Before|After)$/)) {
			// Do nothing.
		} else {
			newEl.setAttribute(k, attribs[k]);
		}
	}
	return newEl;
} // End of createHTMLElement
function countObjs (obj) {
	var returnValue = 0;
	for (var i in obj) {
		returnValue++;
	}
	return returnValue;
} // End of countObjs

function getHTMLElement (creator, el) {
	var rv = null;
	var dbug = (((arguments.length == 3 && arguments[2] != null && arguments[2] != undefined && arguments[2] !== false)) ? true : false); 
	var iwin = window;
	if (el instanceof HTMLElement || el instanceof iwin.HTMLElement) {
		rv = el;
	} else if (el instanceof String || typeof(el) === "string") {
		try {
			if (dbug) console.log ("Trying to getHTMLElement " + el + ".");
			rv = creator.getElementById(el);
		} catch (er) {
			console.error("Error getting HTML Element #" + el + ".  Apparently that's not on this page.");
		}
	}
	return rv;
} // End of getHTMLElement

init ();
