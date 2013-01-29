;(function(ZLA, $, undefined) {'use strict';

    ZLA.Plane = function() {

        var dropBomb = function(planePos) {
            console.log('droping bomb')

            //var sound = new Lyria.Audio();

            console.log(ZLA.Config.sound);

            ZLA.Config.sound.play('bomb');
            //ZLA.Config.sound.play('explosion');

            var bomb = $('<div class="bomb"></div>').appendTo('#graveyard').offset({
                'left' : $('#plane').offset().left + 32,
                'top' : $('#plane').offset().top + 32
            });

            // the further away the plane from the player the more dispersal
            var randFact = ZLA.Utils.getDistance($('#character'), $('#plane')) > 400 ? 2 : 1;

            // target player or tile around player
            var randX = Math.abs(ZLA.Player.getPlayerTile().x + ZLA.Utils.random(randFact * -1, randFact));
            var randY = Math.abs(ZLA.Player.getPlayerTile().y + ZLA.Utils.random(randFact * -1, randFact));

            if (randX > ZLA.Config.tileWidth - 1) {
                randX = ZLA.Config.tileWidth - 1;
            }
            if (randY > ZLA.Config.tileHeight - 1) {
                randY = ZLA.Config.tileHeight - 1;
            }
            console.log('droping bomb to x' + randX + '-y' + randY);
            
            var targetTile = $('#x' + randX + '-y' + randY);
            // return if there is no valid target
            if (targetTile.length === 0 || targetTile.offset().left === 0 || targetTile.offset().top === 0) {
                bomb.remove();
                return;
            }
            console.log(targetTile);
            // calculate
            var left = targetTile.offset().left + ZLA.Config.tile.width / 2;
            var top = targetTile.offset().top + ZLA.Config.tile.height / 2;
            console.log(targetTile.offset().top + " left " + left + " top " + top);
            bomb.animate({
                'left' : left - 32,
                'top' : top - 32
            }, 1000, function() {
                console.log('bomb exploded at ' + randX + ' ' + randY);
                //TODO add exploding animation here
                // remove
                bomb.remove();
                targetTile.addClass('crater').attr('data-crater', new Date().getTime());
                // check if bomb hits the player and end game if this happens
                if (ZLA.Player.checkPlayerTile(randX, randY)) {
                    ZLA.Config.sound.stop('bomb');
                    ZLA.Config.sound.play('scream');
                    //alert('You died by a bomb. Game Over');
                    //window.location.reload();

                    $('#viewport').addClass('animated bounce');
                    setTimeout(function() {
                        ZLA.Plane.reset();
                        ZLA.Player.resetTileItems();
                        ZLA.Director.show('gameover');
                        $('#viewport').removeClass('animated bounce');
                    }, 300);
                }

                // check if bomb hits a grave -> remove it and maybe drop item
                if (targetTile.find('.grave').length > 0) {
                    targetTile.find('.grave').effect('explode', 100).remove();
                    targetTile.removeClass('notAccessible');
                    // drop item with 80% probablity
                    if (ZLA.Utils.random(0, 100) < 80) {
                        // add item hidden to targetTile and let it show slowls
                        // TODO add explosion dropping animation
                        ZLA.Config.sound.stop('bomb');
                        ZLA.Config.sound.play('explosion');

                        $('<div class="item ' + ZLA.Inventory.generateRandomItem() + '"></div>').hide().appendTo(targetTile).fadeIn('slow')
                    }
                }

            }).delay(2500);
        };

   
         var reset = function() {
            $('#plane').animate().stop(true, true);
            var planeStart = {
               left : 0,
               top : 0
            };
            $('#plane').offset(planeStart);
            // stop all sounds
            for (var i in ZLA.Config.soundElements) {
               if (ZLA.Config.soundElements.hasOwnProperty(i)) {
                  console.log(ZLA.Config.soundElements[i]);
                  ZLA.Config.sound.stop(ZLA.Config.soundElements[i]);
                  //$('#' + ZLA.Config.soundElements[i]).remove();
               }
            }
            ZLA.Config.time.pause = new Date().getTime();
            /* not neaded because the inventory is reseted
             if ($('.heart')[0].className.indexOf('frame') >= 0) { 
               $('.heart')[0].className = 'frame1'; 
            }
            */
         }; 


        var move = function() {
            var maxPlaneMoves = ZLA.Config.plane.maxPlaneMoves;
           // get the paused time
            if(ZLA.Config.time.pause){
               ZLA.Config.time.pause = new Date().getTime() - ZLA.Config.time.pause;
            }

            var planeStart = {
                left : 0,
                top : 0
            };
            $('#plane').offset(planeStart);
            for (var i = 0; i < maxPlaneMoves; i++) {
                var pos;
                if ($('#plane').offset() && $('#plane').offset().left >= 0) {
                    pos = (128 * i) % 1024;

                    (function(i) {
                        $('#plane').animate({
                            "left" : pos
                        }, ZLA.Config.plane.animInterval, function() {
                            if ($('#plane').offset().left > 768) {
                                //$('.bomb').addClass('hidden');
                                $('#plane').offset(planeStart);
                                // $('#plane').addClass('hidden');
                            } else {
                                if ($('#plane').offset().left < 0) {
                                    $('#plane').offset(planeStart);
                                }
                            }
                            // drop sth with 80% probability, only if the plane
                            // reached at least field 4
                            if ((i >= 4) && (ZLA.Utils.random(0, 100) < 80)) {
                                ZLA.Plane.dropBomb($('#plane').offset().left);
                            }
                        }).delay(ZLA.Config.plane.delayInterval);
                    })(i);
                }
            }
        };
        return {
            move : move,
            reset : reset,
            dropBomb : dropBomb
        };
    }();
})(this.ZLA = this.ZLA || {}, jQuery);
