(function(sender, localization) {
	
	return {
		item: ZLA.Inventory.items,
		events: {
		  '.item': {
		    'click': function(event) {
		      var index = $('.item').index($(this));
		      
		      ZLA.Inventory.removeItem(index);
		    }
		  },
		  '.next': {
		    'click': function(event) {
		      if (ZLA.Director.currentScene.name === 'graveyard') {
		        ZLA.Director.show('surgery');
		      }
		    }
		  }
		}
	};
	
})(sender, localization);
