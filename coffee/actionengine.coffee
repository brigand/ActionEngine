root = this

class root.Game
  constructor: (@options) ->
    @parseOptions @options
    @events = []

    document.addEventListener "keydown", (e) =>
      c = ae.helpers.key_event_to_char e
      @events.push c if c not in @events
    document.addEventListener "keyup", (e) => @events = @events.filter (x) -> x isnt ae.helpers.key_event_to_char e

    createjs.Ticker.addEventListener "tick", @tick.bind(this)

  tick: (event) ->
    for o in @objects
      for e in @events
        o.actions[e].call(o.graphic, this, event.delta / 1000) if typeof o.actions[e]  isnt "undefined"

    @stage.update()

  parseOptions: (options) ->
    if typeof options.element isnt "string"
      options.element.id = "actionenginecanvas"
      options.element = "actionenginecanvas"

    @stage = new createjs.Stage(options.element)
    @parseObjects(options.objects)

  parseObjects: (objects) ->
    @objects = (@objects or []).concat(objects)
    @parseObject(o, true) for o in objects
    @stage.update()

  parseObject: (o, preventUpdate) ->
    o.graphic =
      if o.image
        new createjs.Bitmap o.image
      else if o.shape
        new createjs.Shape
      else if o.text
        new createjs.Text o.text, o.font, o.color
      else
        new createjs.Shape

    # Draw our shapes
    if o.shape
      # Determine line strokes, or do nothing if we don't have data
      o.graphic.graphics.beginFill(o.color) if o.color
      o.graphic.graphics.setStrokeStyle(o.thickness) if o.thickness
      o.graphic.graphics.beginStroke(o.strokeColor) if o.strokeColor

      # Draw basic shapes depending on the "shape" property
      # Automatically choose beteween circle/square and eclipse/rectangle based on just width/height or both
      console.error o, "requires a w (width) and/or h (height) to be a #{o.shape}" if o.shape and not (o.w or o.w)
      if o.shape is "circle" or o.shape is "oval" or o.shape is "ellipse"
        o.graphic.graphics.drawCircle(0, 0, (o.w or o.h) / 2) if (o.w or o.h) and not (o.w and o.h)
        o.graphic.graphics.drawEllipse(0, 0, o.w, o.h) if (o.w and o.h)
      if o.shape is "square" or o.shape is "rectangle"
        o.graphic.graphics.rect(0, 0, o.w or o.h, o.w or o.h) if (o.w or o.h) and not (o.w and o.h)
        o.graphic.graphics.rect(0, 0, o.w, o.h) if (o.w and o.h)

      # If we have a strokeColor, we began the stroke, so now we end it
      o.graphic.graphics.endStroke() if o.strokeColor

    @stage.update() unless preventUpdate?

    o.graphic.x = o.x or 0
    o.graphic.y = o.y or 0

    if o.actions
      for a, k in o.actions
        o.actions[k] = a.bind o.graphic
    else o.actions = []

    o.graphic.o = o
    o.graphic.game = this
    @stage.addChild o.graphic









