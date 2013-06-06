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
      # Key Press Actions
      for e in @events
        o.actions[e].call(o.graphic, this, event.delta / 1000) if typeof o.actions[e]  isnt "undefined"

      # Always actions happen every frame
      o.actions.always.call(o.graphic, this, event.delta / 1000) if o.actions.always?

      # Execute conditional actions
      if typeof o.actions.if is "object" and typeof o.actions.if.length is "number"
        for a in o.actions.if
          a.exec([this, event.delta / 1000], window.q=o.graphic)


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
    # Determine graphic type based on provided information
    o.graphic =
      if o.image
        new createjs.Bitmap o.image
      else if o.shape
        new createjs.Shape
      else if o.text
        new createjs.Text o.text, o.font, o.color
      else
        new createjs.Shape

    # Determine line strokes, or do nothing if we don't have data
    o.graphic.graphics.setStrokeStyle(o.thickness) if o.thickness
    o.graphic.graphics.beginStroke(o.strokeColor) if o.strokeColor

    # Draw our shapes
    if o.shape
      o.graphic.graphics.beginFill(o.color) if o.color

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

    # Determine pivot type (if one is given)
    # First, do we have coordinates?
    if typeof o.pivot is "object" and o.pivot.length is 2
      o.graphic.regX = o.pivot[0]
      o.graphic.regX = o.pivot[1]

    # pivot: "center" is a shortcut to having it centered on both axis
    else if o.pivot is "center" or o.pivot is "middle"
      o.graphic.regX = (o.w or 0) / 2 or (o.h) / 2
      o.graphic.regY = (o.h or 0) / 2 or (o.w) / 2

    # Otherwise we hope to have some combination of a X and/or Y description, like top-right or bottom-middle
    else if typeof o.pivot is "string"
      parts = o.pivot.split "-"
      for p in parts
        switch p
          when "left" then o.graphic.regX = 0
          when "top" then o.graphic.regY = 0
          when "right" then o.graphic.regX = o.w or o.h
          when "bottom" then o.graphic.regY = o.h or o.w
          when "center" then o.graphic.regX = (o.w or 0) / 2 or (o.h) / 2
          when "middle" then o.graphic.regY = (o.h or 0) / 2 or (o.w) / 2

    if o.actions
      for a, k in o.actions
        o.actions[k] = a.bind o.graphic
    else o.actions = []

    o.graphic.o = o
    o.graphic.game = this
    @stage.addChild o.graphic









