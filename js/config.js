;(function(window, ZLA) {
  
  ZLA.Config = {
    sky: {
      height: 128
    },
    mute: false,
    sound: new Lyria.Audio(),
    soundElements: [],
    time: {
      pause: 0
    },
    inventory: {
      height: 128
    },
    plane: {
      maxPlaneMoves: 128,
      animInterval: 750,
      delayInterval: 500
    },
    tile: {
      width: 128,
      height: 128
    },
    tileWidth: 8,
    tileHeight: 4,
    maxGraveStones: 9,
    gameDuration: 120000 // 3 minutes
  };
  
})(this, this.ZLA = this.ZLA || {});
