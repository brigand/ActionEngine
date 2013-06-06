(function() {
  var movement, root;

  root = this;

  root.actions = root.actions || {};

  movement = root.actions.movement = {
    left: function(speed, now) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.x -= speed * (now == null ? delta : 1);
      };
    },
    right: function(speed, now) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.x += speed * (now == null ? delta : 1);
      };
    },
    down: function(speed, now) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.y += speed * (now == null ? delta : 1);
      };
    },
    up: function(speed, now) {
      speed = arguments[0] || 20;
      return function(game, delta) {
        return this.y -= speed * (now == null ? delta : 1);
      };
    }
  };

}).call(this);
