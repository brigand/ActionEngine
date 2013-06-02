this.ae = this.ae or {}
this.ae.helpers =
  key_event_to_char: (e) ->
    # Check for a letter or digit
    if 65 <= e.which <= 90 or 47 <= e.which <= 57
      return String.fromCharCode(e.which).toLowerCase()

    key_codes =
      9: "TAB"
      13: "ENTER"
      17: "CONTROL"
      18: "ALT"
      20: "CAPS"
      37: "LEFT"
      38: "UP"
      39: "RIGHT"
      34: "DOWN"
      91: "SUPER" # e.g. Windows-flag key on Windows computers

    # Check if we have the keycode
    key_codes[e.which] or null

