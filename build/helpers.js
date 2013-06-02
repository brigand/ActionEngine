(function() {

  this.ae = this.ae || {};

  this.ae.helpers = {
    key_event_to_char: function(e) {
      var key_codes, _ref, _ref2;
      if ((65 <= (_ref = e.which) && _ref <= 90) || (47 <= (_ref2 = e.which) && _ref2 <= 57)) {
        return String.fromCharCode(e.which).toLowerCase();
      }
      key_codes = {
        9: "TAB",
        13: "ENTER",
        17: "CONTROL",
        18: "ALT",
        20: "CAPS",
        37: "LEFT",
        38: "UP",
        39: "RIGHT",
        34: "DOWN",
        91: "SUPER"
      };
      return key_codes[e.which] || null;
    },
    resize: function(id) {
      var ch, cw;
      ae.sizer = ae.sizer || document.getElementById(id);
      ae.canvas = ae.canvas || document.getElementsByTagName('canvas')[0];
      cw = window.innerWidth;
      ch = window.innerHeight;
      if (cw / ch > 16 / 9) {
        ae.sizer.width = ch;
        ae.sizer.height = 16 / 9 * ch;
        return ae.canvas.className = "landscape";
      } else {
        ae.sizer.width = cw;
        return ae.sizer.height = 9 / 16 * cw;
      }
    }
  };

}).call(this);
