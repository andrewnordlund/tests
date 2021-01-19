
var defaultSelectedTab = "friends";

var list = {
	friends : {li : null, link : null, div : null,},
	sleepingFriends : {li : null, link : null, div : null},
	defriends : {li : null, link : null, div : null}
};

function init () {
	console.log ("Initing.");
	for (var tab in list) {
		console.log("Working with tab: " + tab + ".");
		try {
			//console.log ("Trying to get " + tab + "HolderLi.");
			list[tab]["li"] = document.getElementById(tab + "HolderLi");
			list[tab]["link"] = document.getElementById(tab + "TitleHeader");

			list[tab]["link"].addEventListener("click", toggleSelected, false);

			//console.log ("And its: " + list[tab]["link"] + ".");
			list[tab]["div"] = document.getElementById(tab + "Holder");
			if (tab == defaultSelectedTab) {
				showSelected(list[tab]["li"], list[tab]["div"]);
			} else {
				hideUnselected(list[tab]["li"], list[tab]["div"])
			}
			
		}
		catch (ex) {
			console.log("Exception: " + ex.toString());
		}
	}
	//showSelected(list["friends"]["link"], list["friends"]["div"]);
}

function toggleSelected () {
	var shown = arguments[0].currentTarget;
	var shownID = shown.getAttribute ("id");

	console.log("You clicked on " + shownID + ".");
	for (var tab in list) {
		if (shownID == tab + "TitleHeader") {
			console.log("Showing " + tab + ".");
			showSelected(list[tab]["li"], list[tab]["div"]);
		} else {
			console.log("Hiding " + tab + ".");
			hideUnselected(list[tab]["li"], list[tab]["div"]);
		}
	}
}
function showSelected (titleHeader, Holder) {
	console.log ("Showing selected on " + titleHeader.getAttribute("id"));
	titleHeader.classList.add("selectedHeaderTitle");
	Holder.classList.remove("hidden");
}
function hideUnselected (titleHeader, Holder) {
	titleHeader.classList.remove("selectedHeaderTitle");
	Holder.classList.add("hidden");
}
init();
