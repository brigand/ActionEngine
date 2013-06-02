root = this
root.actions = root.actions or {}
movement = root.actions.movement =
  left: (speed) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.x -= speed * delta
  right: (speed) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.x += speed * delta
  down: (speed) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.y += speed * delta
  up: (speed) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.y -= speed * delta

