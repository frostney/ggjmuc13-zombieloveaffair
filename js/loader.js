;(function(global, $LAB) {
  
  $LAB
      // Load dependencies
      .script('js/lib/es6-shim.js')
      .script('js/lib/jquery.js')
      .script('js/lib/less.js')
      .script('js/lib/detectr.js')
      .script('js/lib/modernizr.js')
      .script('js/lib/handlebars.js')
      .script('js/lib/jquery-ui.js').wait()
      // Load libraries
      .script('js/lyria/constants.js')
      .script('js/lyria/base.js')
      .script('js/lyria/core.js')
      .script('js/lyria/console.js')
      .script('js/lyria/utils.js').wait()
      .script('js/lyria/loop.js')
      .script('js/lyria/achievements.js')
      .script('js/lyria/assets.js')
      .script('js/lyria/audio.js')
      .script('js/lyria/localization.js')
      .script('js/lyria/preloader.js')
      .script('js/lyria/scene.js')
      .script('js/lyria/prefab.js')
      .script('js/lyria/scenedirector.js')
      .script('js/lyria/ui.js')
      .script('js/lyria/video.js').wait()
      // Game-specific elements
      .script('js/lyria/component.js')
      .script('js/lyria/entity.js').wait()
      // Load application 
      .script('js/config.js').wait()
      .script('js/utils.js').wait()
      .script('js/plane.js')
      .script('js/player.js')
      .script('js/message.js')
      .script('js/inventory.js').wait()
      .script('js/game.js');
  
})(this, this.$LAB);
