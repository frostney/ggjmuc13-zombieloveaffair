;(function(global, document, Lyria, undefined) {

  $(document).ready(function() {
    Lyria.Preloader.complete = function() {
      $('#loading').hide();

      ZLA.Director = new Lyria.SceneDirector('viewport');

      ZLA.Director.add('intro');
      ZLA.Director.add('graveyard');
      ZLA.Director.add('surgery');
      ZLA.Director.add('outro');
      ZLA.Director.add('gameover');
      ZLA.Director.add('credits');

      ZLA.Director.show('intro');

      Lyria.Loop.run();
      
      ZLA.Config.sound.muteSounds(false);
      ZLA.Config.sound.addAudioElement('song', {
        filepath : 'assets/audio/Song.wav',
        playAfter : 'heartBeat',
        loop : true,
        play : true
      });
      ZLA.Config.soundElements.push('song');
        ZLA.Config.sound.addAudioElement('heart', {
            filepath : 'assets/audio/HeartBeat.wav',
            loop : true,
            play : true
        });
      ZLA.Config.soundElements.push('heart');
    
        ZLA.Config.sound.addAudioElement('explosion', {
          filepath : 'assets/audio/BombExplosion.wav'
        });
      ZLA.Config.soundElements.push('heart');
       ZLA.Config.sound.addAudioElement('bomb', {
            filepath : 'assets/audio/BombDroppingShort.wav'
         });
      ZLA.Config.soundElements.push('bomb');
       ZLA.Config.sound.addAudioElement('scream', {
         filepath : 'assets/audio/ZombieGrowl.wav'
      });
      ZLA.Config.soundElements.push('scream');
      ZLA.Config.sound.addAudioElement('scream1', {
         filepath : 'assets/audio/ZombieGrowl.wav',
         play : true
      }); 
      ZLA.Config.soundElements.push('scream1');
      ZLA.Config.sound.addAudioElement('happy', {
       filepath : 'assets/audio/ZombieLaughing_2.wav'
      });
      ZLA.Config.soundElements.push('happy');
    };

    Lyria.Preloader.onProgressChange = function(value) {
      $('.loading-percent').html(parseInt(value * 100, 10) + ' %');
    };

    $.ajax({
      url: Lyria.Resource.name('assets.json'),
      dataType: 'json'
    }).done(function(data) {
      Lyria.Preloader.init(data);
    }).fail(function(err) {
      console.log(err);
    });

  });

  // Disable evil touchscreen stuff
  document.addEventListener("touchmove", function(e) {
    e.preventDefault();
  }, false);
  
})(this, document, this.Lyria, this.ZLA = this.ZLA || {});