(function(sender, localization) {

    return {
        events : {
           '.exit' : {
                'click' : function(event) {
                        sender.parent.show('credits');
                }
            },
            
           '.next' : {
                'click' : function(event) {
                        sender.parent.show('graveyard');
                }
            }
            
        },
        onActive : function() {
            ZLA.Inventory.init(sender);
            setTimeout(function() {
                ZLA.Plane.reset();

                ZLA.Inventory.setInvItemsDraggable(true);
            }, 500);

        }
    }
})(sender, localization);
