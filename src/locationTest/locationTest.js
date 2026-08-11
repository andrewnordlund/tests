var theBtn, theBtn2, theLink, theLink2, btnHolder = null;

theBtn = document.getElementById("theBtn");
theBtn2 = document.getElementById("theBtn2");
theLink = document.getElementById("theLink");
theLink2 = document.getElementById("theLink2");
btnHolder = document.getElementById("btnHolder");

var pg1 = "locationTest.html";
var pg2 = "location2.html";

//if (theBtn) theBtn.addEventListener ("click", linkFun, false);
//if (theBtn2) theBtn2.addEventListener ("click", linkFun, false);
if (theLink) theLink.addEventListener ("click", linkFun, false);
if (theLink2) theLink2.addEventListener ("click", linkFun, false);
if (btnHolder) btnHolder.addEventListener ("click", linkFun, false);


function linkFun (e) {
	e.preventDefault();

	window.location.replace((window.location.href.match(pg1) ? pg2 : pg1));
}
