;(function(window, ZLA) {
  
  ZLA.Utils = {
    'checkMovementDirect': function(coords) {
    	var diffX = coords.mouseX - (coords.charX + (ZLA.Config.tile.width / 2));
    	var diffY = coords.mouseY - (coords.charY + (ZLA.Config.tile.height / 2));
    	if (Math.abs(diffY) < (ZLA.Config.tile.height / 2) && Math.abs(diffX) < (ZLA.Config.tile.width / 2)) {
    	    // if mouse click is on the same tile as player character
    	    return '';
    	} else if (Math.abs(diffX) > Math.abs(diffY)) {
    		// move right/left
    		if (diffX > 0) {
    			return 'right';
    		} else {
    			return 'left';
    		}
    	} else if (Math.abs(diffX) < Math.abs(diffY)) {
    		// move top/down
    		if (diffY > 0) {
    			return 'down';
    		} else {
    			return 'up';
    		}
    	} else if (diffY === 0 && diffX === 0) {
    		// if user hits the character exactly then do nothing
    		return '';
    	} else {
    		// if nothing helps move right
    		return 'right';
    	}
    },
    'getDistance' : function(elem1, elem2) {
        var offElem1 = elem1.offset();
        var offElem2 = elem2.offset();
        var distX = offElem1.left - offElem2.left;
        var distY = offElem1.top - offElem2.top;
        return Math.sqrt(distX * distX + distY * distY);  
    },
    'random' : function(min, max) {
      return Math.floor((Math.random()*(max-min))+1)+ min;  
    }
  };
  
})(this, this.ZLA = this.ZLA || {});