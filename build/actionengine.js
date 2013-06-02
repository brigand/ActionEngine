(function() {
  var root;

  root = this;

  root.Game = (function() {

    function Game(options) {
      var _this = this;
      this.options = options;
      this.parseOptions(this.options);
      this.events = [];
      document.addEventListener("keydown", function(e) {
        return _this.events.push(String.fromCharCode(e.which).toLowerCase());
      });
      document.addEventListener("keyup", function(e) {
        return _this.events = _this.events.filter(function(x) {
          return x !== String.fromCharCode(e.which).toLowerCase();
        });
      });
      createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    Game.prototype.tick = function(event) {
      var e, o, _i, _j, _len, _len2, _ref, _ref2;
      _ref = this.objects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        _ref2 = this.events;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          e = _ref2[_j];
          if (typeof o.actions[e] !== "undefined") {
            o.actions[e].call(o.graphic, this, event.delta / 1000);
          }
        }
      }
      return this.stage.update();
    };

    Game.prototype.parseOptions = function(options) {
      if (typeof options.element !== "string") {
        options.element.id = "actionenginecanvas";
        options.element = "actionenginecanvas";
      }
      this.stage = new createjs.Stage(options.element);
      return this.parseObjects(options.objects);
    };

    Game.prototype.parseObjects = function(objects) {
      var o, _i, _len;
      this.objects = (this.objects || []).concat(objects);
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        o = objects[_i];
        this.parseObject(o, true);
      }
      return this.stage.update();
    };

    Game.prototype.parseObject = function(o, preventUpdate) {
      var a, k, _len, _ref;
      o.graphic = o.image ? new createjs.Bitmap(o.image) : o.shape ? new createjs.Shape : o.text ? new createjs.Text(o.text, o.font, o.color) : new createjs.Shape;
      if (o.shape) {
        if (o.color) o.graphic.graphics.beginFill(o.color);
        if (o.thickness) o.graphic.graphics.setStrokeStyle(o.thickness);
        if (o.strokeColor) o.graphic.graphics.beginStroke(o.strokeColor);
        if (o.shape && !(o.w || o.w)) {
          console.error(o, "requires a w (width) and/or h (height) to be a " + o.shape);
        }
        if (o.shape === "circle" || o.shape === "oval" || o.shape === "eclipse") {
          if ((o.w || o.h) && !(o.w && o.h)) {
            o.graphic.graphics.drawCircle(0, 0, o.w || o.h);
          }
          if (o.w && o.h) o.graphic.graphics.drawCircle(0, 0, o.w, o.h);
        }
        if (o.shape === "square" || o.shape === "rectangle") {
          if ((o.w || o.h) && !(o.w && o.h)) {
            o.graphic.graphics.rect(0, 0, o.w || o.h);
          }
          if (o.w && o.h) o.graphic.graphics.rect(0, 0, o.w, o.h);
        }
        if (o.strokeColor) o.graphic.graphics.endStroke();
      }
      if (preventUpdate == null) this.stage.update();
      o.graphic.x = o.x || 0;
      o.graphic.y = o.y || 0;
      _ref = o.actions;
      for (k = 0, _len = _ref.length; k < _len; k++) {
        a = _ref[k];
        o.actions[k] = a.bind(o.graphic);
      }
      o.graphic.o = o;
      o.graphic.game = this;
      return this.stage.addChild(o.graphic);
    };

    return Game;

  })();

}).call(this);
