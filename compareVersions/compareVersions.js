function isOutOfDate (lsv, thisVer) {
	//if (lsv == WWVF.stringBundle["WWNF"]) return true;
	lsv = lsv.replace(/-release/, "");
	thisVer = thisVer.replace(/-release/, "");
	var returnValue = false;
	var lsva = lsv.split(".");
	var thisVera = thisVer.split(".");
	for (var i = 0; i < Math.min(lsva.length, thisVera.length) && !returnValue; i++) {
		if (thisVera[i].match(/^\d+$/) && lsva[i].match(/^\d+$/)) {
			if (parseInt(thisVera[i]) < parseInt(lsva[i])) 	returnValue = true;
			else if (parseInt(thisVera[i]) > parseInt(lsva[i])) return false;
		} else {
			if (isStringLessThan(thisVera[i], lsva[i])) returnValue = true;
		}
	}
	return returnValue;
}
function isStringLessThan (x, y) {
	var returnValue = true;
	if (x.match(/^\d+$/)) {
		var parts = y.match(/^(\d+?)-(.*)$/);
		if (parts) {
			if (x < parts[1]) return true;
			else  return false;
		}
	} else if (y.match(/^\d+$/)) {
		var parts = x.match(/^(\d+?)-(.*)$/);
		if (parts) {
			if (parts[1] < y) return true;
			else return false;
		}
	} else if (x.match(/\d-.+/) && y.match(/\d-.+/)) {
		var xparts = x.match(/^(\d+?)-([a-z])(\d*)$/);
		var yparts = y.match(/^(\d+?)-([a-z])(\d*)$/);
		if (xparts && yparts) {
			if (xparts[1] < yparts[1]) {
				return true;
			} else if (xparts[1] > yparts[1]) {
				return false;
			} else if (xparts[1] == yparts[1]) {
				if (xparts[2] && yparts[2]) {
					if (xparts[2] < yparts[2]) {
						return true;
					} else  if (xparts[2] > yparts[2]) {
						return false;
					} else if (xparts[2] == yparts[2]) {
						if (xparts[3] && yparts[3]) {
							if (xparts[3] < yparts[3]) {
								return true;
							} else {
								return false;
							}
						} else {
							return false;
						}
					}
				} else {
					return false;
				}
			}
		}
	}
	return returnValue;
}
