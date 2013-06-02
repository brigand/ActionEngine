(function() {
  var movement, root;

  root = this;

  root.actions = root.actions || {};

  movement = root.actions.movement = {
    left: function(speed) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.x -= speed * delta;
      };
    },
    right: function(speed) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.x += speed * delta;
      };
    },
    down: function(speed) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.y += speed * delta;
      };
    },
    up: function(speed) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        console.log(delta, speed);
        return this.y -= speed * delta;
      };
    }
  };

}).call(this);
