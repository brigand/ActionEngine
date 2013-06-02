# ActionEngine

## Why?

Creating games on the canvas is difficult because there aren't any good, **easy**, **quick**, **free** game engines.  Using a **modular structure**, ActionEngine attempts to build a library of **common game actions** gradually, by a variety of developers.

## Making a Game

ActionScript depends on EaselJS, and can use SoundJS, but it doesn't need to be loaded in silent games.

Start by cloning this repository.

    git clone {todo}
    rm -rf .git # to discard repository information 

Now you may begin editing the `game.html` file.  In the bottom, there's an object called `prop`.  This is the structure for your game.  

`objects` is an array of all objects in your scene.  You can create objects in a variety of ways.

1. shape:  Currently circle/oval/eclipse and square/rectangle are supported.

2. image: Any valid `src` property of an `<img/>` element.  Or an image element it self.  Most common is an image path relative to the html file.

Each object can have actions.  Actions may be created inline, or you can choose from an ever-expanding set of premade actions.  The simplest are in `actions.movement.js`.  Here's an example `actions` object.

    actions: {
        "w": actions.movement.up(7),
        "a": actions.movement.left(10),
        "d": actions.movement.right(10),
        "s": actions.movement.down(7)
    }

Let's look at the `actions.movement.left` function (written in CoffeeScript).  It takes a speed, and returns a function that will be called every time the action is triggered (in the above, that means each frame "a" is down).

Notice that the callback takes two options.  The first is a reference to the game instance, so variables like `score` or `health` may be updated, or other objects may be interacted with.  `delta` is the time in seconds since the last tick.  `this` is the `Shape`/`Bitmap` object.  You can change any properties EaselJS exposes, like `x`, `y`, `rotation`, `scaleX`, etc.

    actions.movement =
      left: (speed) ->
        speed = arguments[0] or 20
        (game, delta) ->
          this.x -= speed * delta

### More info will be added in time.
