(function() {
  var root, text;

  root = this;

  root.actions = root.actions || {};

  text = root.actions.text = {
    set: function(to) {
      return function(game, delta) {
        return this.text = to.toString();
      };
    },
    color: function(color) {
      color = arguments[0] || "black";
      return function(game, delta) {
        return this.color = color;
      };
    }
  };

}).call(this);
