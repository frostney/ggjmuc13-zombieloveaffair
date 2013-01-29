(function(sender, localization) {
	
	return {
		events : {
            '#startscreen' : {
                'click' : function(event) {
                    if ($('#startscreen').hasClass('intro1')) {
                        sender.parent.show('graveyard');
                    } else {
                        $('.start').addClass('hidden');
                        $('#startscreen').removeClass('intro').addClass('intro1');
                    }
                        
                }
            },
            '.start' : {
                'click' : function(event) {
                   // TODO enter directly in the game!?
                   $('#startscreen').removeClass('intro').addClass('intro1');
                   $('.start').addClass('hidden');
                }
            },
            '.sound' : {
                'click' : function(event) {
                    if ($('.sound').hasClass('on')) {
                        $('.sound').removeClass('on').addClass('off');
                        ZLA.Config.sound.muteSounds(true);
                    } else {
                        $('.sound').removeClass('off').addClass('on');
                        ZLA.Config.sound.muteSounds(false);
                    }
                        
                }
            },
            '.next' : {
                'click' : function(event) {
                     if ($('#startscreen').hasClass('intro1')) {
                        sender.parent.show('graveyard');
                     } else {
                        $('#startscreen').removeClass('intro').addClass('intro1');
                        $('.start').addClass('hidden');
                     }
                }
            },
            '.exit' : {
                'click' : function(event) {
                        sender.parent.show('credits');
                        
                }
            }
        }
	}
})(sender, localization);
