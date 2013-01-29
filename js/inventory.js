;(function(window, ZLA) {
  
  ZLA.Inventory = (function() {
    'use strict';
    
    var invScene;
    var items = ['heart frame1','buttons'];
    var inventoryName = 'inventory';
    var itemArr = ['arm1', 'arm2', 'legs1', 'legs2', 'top1', 'top2', 'head1', 'head2'];
    
    var init = function(scene) {
      invScene = '#' + scene.name;
      
      //
      setTimeout(render, 100);
    };
    
    var setButtons = function() {
      if (items.length >= 3) {
        $('.item.buttons').html('<div class="next"></div><div class="exit"></div>');        
      } else {
        $('.item.buttons').html('<div class="exit"></div>'); 
      }
    };
    
    var render = function() {
      // Remove inventory if it already exists
      if ($('.' + inventoryName).length > 0) {
        $('.' + inventoryName).remove();
      }
      
      heartBumping();
      
      $(invScene).append('<div class="' + inventoryName + '"></div>');
        Lyria.Prefab(inventoryName, {
          target: $('.' + inventoryName)
        });
        
        setTimeout(setButtons, 250);
    };
    
    var reset = function() {
      items = ['heart frame1','buttons'];
    };
    
    var addItem = function(itemName) {
      items.push(itemName);
      setTimeout(render, 100);
    };
        
    var removeItem = function(index) {
      if (index > 2) {
        var newArray = [];
        
        for (var i = 0, j = items.length; i < j; i++) {
          if (i !== index) {
            newArray.push(items[i]);
          }
        }
        
        items = newArray;
        
        setTimeout(render, 100);       
      }
       
    };
    
    var generateRandomItem = function() {
        return itemArr[Math.abs(ZLA.Utils.random(itemArr.length * -1, itemArr.length)-1)];
    };
    
    var setInvItemsDraggable = function (isDraggable) {
      $('.inventory').find('.item').each(function() {
        if (!$(this).hasClass('buttons') || (!$(this).hasClass('heart'))) {
          $(this).draggable({
              cursor: 'move',
              revert: 'invalid',
              snap: '.item',
              snapMode: 'outer'
          });
        }
      });
        

      $('#body-container').droppable();

      
    };
    
    var heartBumping = function() {
        var timePassed = ZLA.Player.getRemainingTime() / ZLA.Config.gameDuration;
  
        var timeout = ZLA.Config.gameDuration / 8;
        
        if ($('.heart').length > 0) {
            $('.heart').effect('bounce', 1000, function() {
               setTimeout(function() {
                  heartBumping();
               }, 1500 * timePassed);
            }); 
               
            for (var i = 1; i < 9; i++) {
               (function(i) {
                  setTimeout(function() {
                     if ($('.heart').hasClass('frame' + i)) {
                        console.log('it has it');
                        $('.heart').removeClass('frame' + i);
                        var x = (i + 1);
                        $('.heart').addClass('frame' +x );
                     }
                  }, timeout * i);
               })(i);
            }
        } else {
            setTimeout(function() {
                heartBumping();
            }, 1000 * timePassed);
        }

    }
    
    return {
      init: init,
      render: render,
      reset: reset,
      addItem: addItem,
      removeItem: removeItem,
      generateRandomItem : generateRandomItem,
      setInvItemsDraggable : setInvItemsDraggable,
      heartBumping : heartBumping,
      get items() { return items; }
    };
    
  })();
  
})(this, this.ZLA = this.ZLA || {});
