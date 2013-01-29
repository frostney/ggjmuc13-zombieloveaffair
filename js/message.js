;(function(global, ZLA) {
  
  ZLA.Message = function(content, animInterval, showInterval, callback) {
    $('.message').html(content).fadeIn(animInterval).delay(showInterval).fadeOut(animInterval, callback);
  };
  
})(this, this.ZLA = this.ZLA || {});
