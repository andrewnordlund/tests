var a1, modalBox, innerDiv, btn1 = null;

a1 = document.getElementById("a1");
modalBox = document.getElementById("modalBox");
innerDiv = document.getElementById("innerDiv");
btn1 = document.getElementById("btn1");

a1.addEventListener("click", openModal, false);

function openModal(e) {
	e.preventDefault();

	modalBox.classList.remove("hide");
	btn1.focus();
}
