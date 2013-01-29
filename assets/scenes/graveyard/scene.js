(function(sender, localization) {

    // sky tiles
    var sky = [];

    var skyHeight = ZLA.Config.sky.height;

    console.log(skyHeight);

    for (var a = 0; a < ZLA.Config.tileWidth; a++) {
        var skyStyle = 'width: ' + skyHeight + 'px; height: ' + skyHeight + 'px; left: ' + (skyHeight * a) + 'px; top: 0px';
        sky.push({
            id : 's' + a,
            style : skyStyle
        });
    }

    var tile = [];

    var maxTiles = ZLA.Config.tileWidth * ZLA.Config.tileHeight;

    for (var i = 0; i < ZLA.Config.tileWidth; i++) {
        for (var j = 0; j < ZLA.Config.tileHeight; j++) {
            var style = 'width: ' + ZLA.Config.tile.width + 'px; height: ' + ZLA.Config.tile.height + 'px; left: ' + (ZLA.Config.tile.width * i) + 'px; top: ' + (ZLA.Config.sky.height + (ZLA.Config.tile.height * j)) + 'px';

            tile.push({
                id : 'x' + i + '-y' + j,
                style : style
            });
        }
    }
    
    var cloud = ['image1', 'image2', 'image3'];
  
ZLA.Inventory.heartBumping();
    return {
        events : {
            '#tile-container' : {
                'touchstart': function(event) {
                    Lyria.Loop.addTask('movementTask', function(delta) {
                        if (!ZLA.Player.moving) {
                            var charPos = $('#character').offset();
                            ZLA.Player.move(ZLA.Utils.checkMovementDirect({
                                'mouseX' : event.originalEvent.pageX,
                                'mouseY' : event.originalEvent.pageY,
                                'charX' : charPos.left,
                                'charY' : charPos.top
                            }));
                        }
                    });
                },
                'mousedown' : function(event) {
                    Lyria.Loop.addTask('movementTask', function(delta) {
                        if (!ZLA.Player.moving && Lyria.Platform.isMobile() === null) {
                            var charPos = $('#character').offset();
                            ZLA.Player.move(ZLA.Utils.checkMovementDirect({
                                'mouseX' : event.pageX,
                                'mouseY' : event.pageY,
                                'charX' : charPos.left,
                                'charY' : charPos.top
                            }));
                        }
                    });
                },
                'mouseup' : function(event) {
                    Lyria.Loop.removeTask('movementTask');
                },
                'touchend' : function(event) {
                    console.log('ending touch movement')
                    Lyria.Loop.removeTask('movementTask');
                }
            },
            '.item.assemble' : {
                'click' : function(event) {
                    sender.parent.show('surgery');
                }
            },
            '.exit' : {
                'click' : function(event) {
                        sender.parent.show('credits');
                }
            }
        },
        tile : tile,
        sky : sky,
        cloud: cloud,
        onActive : function() {
            ZLA.Inventory.init(sender);

            setTimeout(function() {
                $('#character').fadeIn('slow', function() {
                    ZLA.Player.startGameTimer();
                    ZLA.Plane.move();
                });
            }, 250);

            // start graveStone spawning
            Lyria.Loop.addTask('graveStoneSpawner', function(delta) {
                // remove old crates
                $('#tile-container .tile.crater').each(function(index) {
                    if ((parseInt($(this).attr('data-crater'), 10) + 15000) < new Date().getTime()) {
                        $(this).fadeOut('slow', function() {
                          $(this).removeClass('crater').removeAttr('data-crater');
                          $(this).show();
                        });
                    }
                });
                if ($('#tile-container .tile .grave').length < ZLA.Config.maxGraveStones) {
                    var x = Math.abs(ZLA.Utils.random((ZLA.Config.tileWidth) * -1, ZLA.Config.tileWidth) - 1);
                    var y = Math.abs(ZLA.Utils.random((ZLA.Config.tileHeight) * -1, ZLA.Config.tileHeight) - 1);
                    // check if player is currently on this tile
                    if (!ZLA.Player.checkPlayerTile(x, y)) {
                        // check if there is an item or another grave there
                        if (!$('#x' + x + '-y' + y).hasClass('crater') && $('#x' + x + '-y' + y).find('.item').length === 0 && $('#x' + x + '-y' + y).find('.grave').length === 0) {
                            $('#x' + x + '-y' + y).html('<div class="grave stone' +(Math.abs(ZLA.Utils.random(-2, 2))+1)+ '" style="display:none;"></div>').addClass('notAccessible').find('.grave').fadeIn('slow');
                        }
                    }

                }
            });
            
            $.each($('.cloud'), function() {
              $(this).css('left', ZLA.Utils.random(0, 1024 - 128));
              $(this).fadeIn('slow');
            });

            Lyria.Loop.addTask('cloudMovement', function(dt) {
              $('.cloud.image1').css('left', parseFloat($('.cloud.image1').css('left')) + dt / 20);
              $('.cloud.image2').css('left', parseFloat($('.cloud.image2').css('left')) + dt / 16);
              $('.cloud.image3').css('left', parseFloat($('.cloud.image3').css('left')) - dt / 10);
              
              if (parseInt($('.cloud.image1').css('left'), 10) >= 1024) {
                $('.cloud.image1').fadeOut('slow', function() {
                  $('.cloud.image1').css('left', ZLA.Utils.random(0, 1024 - 128));
                  $('.cloud.image1').fadeIn('slow');
                })
              }
              
              if (parseInt($('.cloud.image2').css('left'), 10) >= 1024) {
                $('.cloud.image2').fadeOut('slow', function() {
                  $('.cloud.image2').css('left', ZLA.Utils.random(0, 1024 - 128));
                  $('.cloud.image2').fadeIn('slow');
                });
              }
              
              if (parseInt($('.cloud.image3').css('left'), 10) <= -128) {
                $('.cloud.image3').fadeOut('slow', function() {
                  $('.cloud.image3').css('left', ZLA.Utils.random(0, 1024 - 128));
                  $('.cloud.image3').fadeIn('slow');
                });
              }
            });
        },
        onDeactivated: function() {
          Lyria.Loop.removeTask('cloudMovement');
        },
        update : function() {

        }
    }
})(sender, localization); 