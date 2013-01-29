;(function(ZLA, $, undefined) {'use strict';

    ZLA.Player = function() {
        // current player position
        var playerTilePos = {
            'x' : 0,
            'y' : 0
        };
        var startTime = 0;
        // var to indicate if character is currently moving
        var moving = false;

        var getPlayerTile = function() {
            return playerTilePos;
        };

        /**
         * Check if player is currently on given tile
         */
        var checkPlayerTile = function(x, y) {
            if (playerTilePos.x === x && playerTilePos.y === y) {
                return true;
            }
            return false;
        };

        /**
         * Function to reset tile items
         * @param {Object} direction
         */
        var resetTileItems = function() {
           $('#tile-container').find('.grave').remove();
           $('#tile-container').find('.item').remove();
           $('#tile-container').find('.crater').remove();
           $('#tile-container').find('.notAccessible').removeClass('notAccessible')
        }
        
        
        /**
         * Function to check if movement in desired direction is possible
         * @param {Object} direction
         */
        var checkMove = function(direction) {
            var tileToMove = {
                'x' : playerTilePos.x,
                'y' : playerTilePos.y
            };
            switch(direction) {
                case 'left':
                    if (playerTilePos.x === 0) {
                        return false;
                    }
                    tileToMove.x -= 1;
                    break;
                case 'right':
                    if (playerTilePos.x === (ZLA.Config.tileWidth - 1)) {
                        return false;
                    }
                    tileToMove.x += 1;
                    break;
                case 'up':
                    if (playerTilePos.y === 0) {
                        return {};
                    }
                    tileToMove.y -= 1;
                    break;
                case 'down':
                    if (playerTilePos.y === (ZLA.Config.tileHeight - 1)) {
                        return false;
                    }
                    tileToMove.y += 1;
                    break;
            }

            // check if next tile is accessible
            if ($('#x' + tileToMove.x + '-y' + tileToMove.y).hasClass('notAccessible')) {
                return {};
            }
            return tileToMove;
        };

        /**
         * Function to check if there is sth on the current tile and pick it up
         */
        var checkAndPickUp = function() {
            $('#x' + playerTilePos.x + '-y' + playerTilePos.y).find('.item').each(function(index) {

                var itemName = $(this).attr('class').split(' ');
                ZLA.Inventory.addItem(itemName[itemName.length - 1]);
                ZLA.Config.sound.play('happy');
                $(this).remove();
            });
        };

        /**
         * Function to move player to the next tile from his position
         * @param {Object} direction
         * @param {Object} callBack
         */
        var move = function(direction, callBack) {
            if (direction === '') {
                return;
            }
            var targetTiles = checkMove(direction);
            if (!moving && !$.isEmptyObject(targetTiles)) {
                var movOptions;
                switch (direction) {
                    case 'up':
                        movOptions = {
                            'top' : '-=' + ZLA.Config.tile.width
                        };
                        break;
                    case 'down':
                        movOptions = {
                            'top' : '+=' + ZLA.Config.tile.width
                        };
                        break;
                    case 'left':
                        movOptions = {
                            'left' : '-=' + ZLA.Config.tile.width
                        };
                        break;
                    case 'right':
                        movOptions = {
                            'left' : '+=' + ZLA.Config.tile.width
                        };
                        break;
                }
                moving = true;
                playerTilePos = targetTiles;

                $('#character').animate(movOptions, 'slow', function() {
                    moving = false;
                    checkAndPickUp();
                    if (callBack) {
                        callBack();
                    }
                });
            } else {
                return;
            }
        };
        var startGameTimer = function() {

            startTime = new Date().getTime();
            var halftime = false;
            Lyria.Loop.addTask('gameTimer', function(delta) {
                var timePassed = ZLA.Player.getRemainingTime;
                if (timePassed > ZLA.Config.gameDuration) {
                    Lyria.Loop.removeTask('gameTimer');
                    ZLA.Config.sound.play('scream1');
                    ZLA.Plane.reset();
                    alert('Game Over');
                    window.location.reload();
                } else if (!halftime && timePassed > (ZLA.Config.gameDuration / 2)) {
                    halftime = true;
                    ZLA.Message('Your beloveds heart is dying, hurry up!', 300, 4000);
                }
            });
        };
        
        var getRemainingTime = function() {
          if(ZLA.Config.time.pause){
             startTime = startTime - ZLA.Config.time.pause;
          } 
          return new Date().getTime() - startTime; 
        };

        return {
            getPlayerTile : getPlayerTile,
            checkPlayerTile : checkPlayerTile,
            move : move,
            moving : moving,
            resetTileItems : resetTileItems,
            startGameTimer : startGameTimer,
            getRemainingTime : getRemainingTime
        };
    }();

})(this.ZLA = this.ZLA || {}, jQuery); 