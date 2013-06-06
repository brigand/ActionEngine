root = this
root.actions = root.actions or {}
text = root.actions.text =
  set: (to) ->
    (game, delta) ->
      @text = to.toString()
  color: (color) ->
    color = arguments[0] or "black"
    (game, delta) ->
      @color = color
