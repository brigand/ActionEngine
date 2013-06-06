(function() {
  var Condition, root;

  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    root = module.exports;
  } else {
    this.cond = this.cond || {};
    root = this.cond;
  }

  root.prop = function(prop) {
    var c;
    c = new Condition;
    c.prop = prop;
    return c;
  };

  root.fun = function(fun) {
    var c;
    c = new Condition;
    c.fun = fun;
    return c;
  };

  root.thing = function(thing) {
    var c;
    c = new Condition;
    c.thing = thing;
    return c;
  };

  Condition = (function() {

    function Condition() {
      this.inverted = false;
      this.target = null;
      this.state = null;
      this.conditions = [];
      this.cbs = [];
      this.chain = (function() {
        return this;
      }).bind(this);
    }

    Condition.prototype.is = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("is"), what]) : this.state = "is");
    };

    Condition.prototype.isnt = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("isnt"), what]) : this.state = "isnt");
    };

    Condition.prototype.lt = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("lt"), what]) : this.state = "lt");
    };

    Condition.prototype.lte = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("lte"), what]) : this.state = "lte");
    };

    Condition.prototype.gt = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("gt"), what]) : this.state = "gt");
    };

    Condition.prototype.gte = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("gte"), what]) : this.state = "gte");
    };

    Condition.prototype.has = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("has"), what]) : this.state = "has");
    };

    Condition.prototype.not = function(what) {
      return this.chain(what != null ? this.conditions.push([this.sign("not"), what]) : this.state = "not");
    };

    Condition.prototype.sign = function(cond) {
      if (this.inverted) {
        this.inverted = false;
        switch (cond) {
          case "is":
            return "isnt";
          case "lt":
            return "gte";
          case "lte":
            return "gt";
          case "gt":
            return "lte";
          case "gte":
            return "lt";
          case "has":
            return "hasnt";
          default:
            return cond;
        }
      } else {
        return cond;
      }
    };

    Condition.prototype.prop = function(prop) {
      if (this.state) {
        return this.conditions.push({
          kind: "prop",
          comp: this.state,
          target: prop
        });
      }
    };

    Condition.prototype.then = function(action) {
      return this.chain(this.cbs.push(action));
    };

    Condition.prototype.exec = function(parameters, self) {
      var cb, _i, _len, _ref, _results;
      if (parameters == null) parameters = [];
      if (self == null) self = this;
      if (this.test(self)) {
        _ref = this.cbs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cb = _ref[_i];
          _results.push(cb.apply(self, parameters));
        }
        return _results;
      }
    };

    Condition.prototype.test = function(self) {
      var comp, compare, kind, o, result, what, _i, _len, _ref;
      if (typeof this.fun === "function") return this.fun.apply(self);
      o = this.prop ? self[this.prop] : self ? self : this.thing;
      _ref = this.conditions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        comp = _ref[_i];
        compare = function(a, kind, b) {
          switch (kind) {
            case "is":
              return a === b;
            case "lt":
              return a < b;
            case "lte":
              return a <= b;
            case "gt":
              return a > b;
            case "gte":
              return a >= b;
            case "has":
              return Object.prototype.hasOwnProperty.call(a, b);
            default:
              throw "Bad comparison type " + kind + ", search conditionals.coffee for this message which follows accepted types";
          }
        };
        kind = comp[0], what = comp[1];
        result = (function() {
          if (typeof kind === "string") {
            return compare(o, kind, what);
          } else if (typeof kind === "object") {
            switch (kind.kind) {
              case "prop":
                return compare(o, kind.comp, what[kind.target]);
              default:
                throw "Bad special comparison " + (typeof kind) + " with kind " + kind.kind + " (should be, e.g., prop),   +              search conditionals.coffee for this message";
            }
          }
        })();
        if (!result) return false;
      }
      return true;
    };

    return Condition;

  })();

}).call(this);
