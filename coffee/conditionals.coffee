# Start by defining the scope

# We're in a CommonJS (e.g., running tests or NodeJS)
if module?.exports?
  root = module.exports

# We're in a browser
else
  this.cond = this.cond or {}
  root = this.cond

# Create a Condition that compares object[prop] to the conditions
root.prop = (prop) ->
  c = new Condition
  c.prop = prop
  return c

# Create a Condition where `fun` is a truth-test function that uses `this` to check the object
root.fun = (fun) ->
  c = new Condition
  c.fun = fun
  return c

root.thing = (thing) ->
  c = new Condition
  c.thing = thing
  return c

# All functions chain
class Condition
  constructor: ->
    @inverted = false
    @target = null
    @state = null
    @conditions = []
    @cbs = []

    # This function ignores all arguments, but makes sure this is returned
    @chain = (-> @).bind(@)

  # Targets
  is:   (what) -> @chain( if what? then @conditions.push([@sign("is"),   what]) else @state = "is"   )
  isnt: (what) -> @chain( if what? then @conditions.push([@sign("isnt"), what]) else @state = "isnt" )
  lt:   (what) -> @chain( if what? then @conditions.push([@sign("lt"),   what]) else @state = "lt"   )
  lte:  (what) -> @chain( if what? then @conditions.push([@sign("lte"),  what]) else @state = "lte"  )
  gt:   (what) -> @chain( if what? then @conditions.push([@sign("gt"),   what]) else @state = "gt"   )
  gte:  (what) -> @chain( if what? then @conditions.push([@sign("gte"),  what]) else @state = "gte"  )
  has:  (what) -> @chain( if what? then @conditions.push([@sign("has"),  what]) else @state = "has"  )
  not:  (what) -> @chain( if what? then @conditions.push([@sign("not"),  what]) else @state = "not"  )

  sign: (cond) ->
    if @inverted
      @inverted = false
      switch cond
        when "is" then "isnt"
        when "lt" then "gte"
        when "lte" then "gt"
        when "gt" then "lte"
        when "gte" then "lt"
        when "has" then "hasnt"
        else cond
    else
      cond

  # These use state
  # e.g., prop("x").is().prop("y") would check for x === y
  prop: (prop) ->
    if @state
      @conditions.push
        kind: "prop"
        comp: @state
        target: prop

  # This is a resolution function
  # If the Condition is true, it will be called with the parameters passed to @exec
  then: (action) -> @chain @cbs.push action

  # Execute the callbacks.  Each will recieved the array `parameters` and be bound to `self` or the current context
  exec: (parameters, self) ->
    # Defaults are done here for dynamic `this` binding
    parameters = [] unless parameters?
    self = this unless self?

    # Check for validity
    if @test(self)
      # Execute the callbacks in order registered
      cb.apply(self, parameters) for cb in @cbs

  # Test the object to see if it passes the test
  test: (self) ->
    # If we have a truth-test, just jump to that and save some processing
    if typeof @fun is "function"
      return @fun.apply(self)

    # Determine the left side of our comparisons (o)
    o =
      # If we have a property, as in `cond.prop("x")` use `self.x` for the comparison
      if @prop
        self[@prop]

      # If the user does `cond.thing(something)...` use that if there's no self
      else
        if self then self else @thing

    for comp in @conditions
      compare = (a, kind, b) ->
        switch kind
          when "is" then a is b
          when "lt" then a < b
          when "lte" then a <= b
          when "gt" then a > b
          when "gte" then a >= b
          when "has" then Object.prototype.hasOwnProperty.call(a, b)
          else throw "Bad comparison type #{kind}, search conditionals.coffee for this message which follows accepted types"

      [kind, what] = comp
      # Store a result, so if we get a false value, we know that it fails one or more tests
      # used to shortcircut the comparisons
      result =
        # These are simple comparisons, like **is** or **lte**
        if typeof kind is "string"
          compare o, kind, what

        # These are more complicated comparisons,
        # See @prop for details
        else if typeof kind is "object"
          switch  kind.kind
            when "prop" then compare o, kind.comp, what[kind.target]
            else throw "Bad special comparison #{typeof kind} with kind #{kind.kind} (should be, e.g., prop),   +
              search conditionals.coffee for this message"

      # If we have a failed test, all the tests fail, and we should short-circut
      return false unless result

    # Well, we didn't find any problems, so I guess everything passed or there were no conditions.
    true

