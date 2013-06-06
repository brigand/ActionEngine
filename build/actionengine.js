(function() {
  var root,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  root = this;

  root.Game = (function() {

    function Game(options) {
      var _this = this;
      this.options = options;
      this.parseOptions(this.options);
      this.events = [];
      document.addEventListener("keydown", function(e) {
        var c;
        c = ae.helpers.key_event_to_char(e);
        if (__indexOf.call(_this.events, c) < 0) return _this.events.push(c);
      });
      document.addEventListener("keyup", function(e) {
        return _this.events = _this.events.filter(function(x) {
          return x !== ae.helpers.key_event_to_char(e);
        });
      });
      createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }

    Game.prototype.tick = function(event) {
      var a, e, o, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
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
        if (o.actions.always != null) {
          o.actions.always.call(o.graphic, this, event.delta / 1000);
        }
        if (typeof o.actions["if"] === "object" && typeof o.actions["if"].length === "number") {
          _ref3 = o.actions["if"];
          for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
            a = _ref3[_k];
            a.exec([this, event.delta / 1000], window.q = o.graphic);
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
      var a, k, p, parts, _i, _len, _len2, _ref;
      o.graphic = o.image ? new createjs.Bitmap(o.image) : o.shape ? new createjs.Shape : o.text ? new createjs.Text(o.text, o.font, o.color) : new createjs.Shape;
      if (o.thickness) o.graphic.graphics.setStrokeStyle(o.thickness);
      if (o.strokeColor) o.graphic.graphics.beginStroke(o.strokeColor);
      if (o.shape) {
        if (o.color) o.graphic.graphics.beginFill(o.color);
        if (o.shape && !(o.w || o.w)) {
          console.error(o, "requires a w (width) and/or h (height) to be a " + o.shape);
        }
        if (o.shape === "circle" || o.shape === "oval" || o.shape === "ellipse") {
          if ((o.w || o.h) && !(o.w && o.h)) {
            o.graphic.graphics.drawCircle(0, 0, (o.w || o.h) / 2);
          }
          if (o.w && o.h) o.graphic.graphics.drawEllipse(0, 0, o.w, o.h);
        }
        if (o.shape === "square" || o.shape === "rectangle") {
          if ((o.w || o.h) && !(o.w && o.h)) {
            o.graphic.graphics.rect(0, 0, o.w || o.h, o.w || o.h);
          }
          if (o.w && o.h) o.graphic.graphics.rect(0, 0, o.w, o.h);
        }
      }
      if (o.strokeColor) o.graphic.graphics.endStroke();
      if (preventUpdate == null) this.stage.update();
      o.graphic.x = o.x || 0;
      o.graphic.y = o.y || 0;
      if (typeof o.pivot === "object" && o.pivot.length === 2) {
        o.graphic.regX = o.pivot[0];
        o.graphic.regX = o.pivot[1];
      } else if (o.pivot === "center" || o.pivot === "middle") {
        o.graphic.regX = (o.w || 0) / 2 || o.h / 2;
        o.graphic.regY = (o.h || 0) / 2 || o.w / 2;
      } else if (typeof o.pivot === "string") {
        parts = o.pivot.split("-");
        for (_i = 0, _len = parts.length; _i < _len; _i++) {
          p = parts[_i];
          switch (p) {
            case "left":
              o.graphic.regX = 0;
              break;
            case "top":
              o.graphic.regY = 0;
              break;
            case "right":
              o.graphic.regX = o.w || o.h;
              break;
            case "bottom":
              o.graphic.regY = o.h || o.w;
              break;
            case "center":
              o.graphic.regX = (o.w || 0) / 2 || o.h / 2;
              break;
            case "middle":
              o.graphic.regY = (o.h || 0) / 2 || o.w / 2;
          }
        }
      }
      if (o.actions) {
        _ref = o.actions;
        for (k = 0, _len2 = _ref.length; k < _len2; k++) {
          a = _ref[k];
          o.actions[k] = a.bind(o.graphic);
        }
      } else {
        o.actions = [];
      }
      o.graphic.o = o;
      o.graphic.game = this;
      return this.stage.addChild(o.graphic);
    };

    return Game;

  })();

}).call(this);
