root = this
root.actions = root.actions or {}
movement = root.actions.movement =
  left: (speed, now) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.x -= speed * (unless now? then delta else 1)
  right: (speed, now) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.x += speed * (unless now? then delta else 1)
  down: (speed, now) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.y += speed * (unless now? then delta else 1)
  up: (speed, now) ->
    speed = arguments[0] or 20
    (game, delta) ->
      this.y -= speed * (unless now? then delta else 1)



