(function(sender, localization) {
	
	var onActive = function() {
	  ZLA.Plane.reset();
	  ZLA.Player.resetTileItems();
	  ZLA.Inventory.reset();
	};
	
	return {
		events: {
		  '.retry': {
		    'click': function(event) {
		      sender.parent.show('graveyard');
		    }
		  },
         '.sound' : {
            'click' : function(event) {
               if ($('.sound').hasClass('on')) {
                  $('.sound').removeClass('on').addClass('off');
                  for (var i in ZLA.Config.soundElements) {
                     if (ZLA.Config.soundElements.hasOwnProperty(i)) {
                        //Lyria.Audio.stop(ZLA.Config.soundElements[i]);
                        $('#'+ZLA.Config.soundElements[i])[0].volume = 0;
                     }
                  }
               } else {
                  $('.sound').removeClass('off').addClass('on');
                  for (var i in ZLA.Config.soundElements) {
                     if (ZLA.Config.soundElements.hasOwnProperty(i)) {
                        //Lyria.Audio.stop(ZLA.Config.soundElements[i]);
                        $('#'+ZLA.Config.soundElements[i])[0].volume = 1;
                     }
                  }
               }
   
            }
         },
         '.next' : {
            'click' : function(event) {
               sender.parent.show('intro');
            }
         },
         '.exit' : {
            'click' : function(event) {
               sender.parent.show('credits');
            }
         }
		},
		onActive: onActive
	};
	
})(sender, localization);
