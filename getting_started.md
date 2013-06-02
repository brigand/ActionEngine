# Getting Started

## Downloading

Let's take off on our journey to create some amazing games.  First you'll need the necessary files.  I recommend cloning
the repository and removing everything you don't need.

```
git clone git://github.com/brigand/ActionEngine.git
mv ActionEngine NameOfYourGame && cd NameOfYourGame
rm -rf .git _*
```

Now, open `game.html` in your favorite editor.

It includes the basic code for creating a game in ActionEngine.  You'll leave most of the HTML alone, and focus on the
inline script at the bottom (feel free to put it in it's own file).

## Objects

To create another game object, add it to the `objects` array.  It must have some kind of display.  This includes `text`,
`shape`, and `image` (with more to be added).

Here's a brief overview of each:

### Object Types

#### text

Options:
 - `text` is the text to show
 - `font` is the font size and family, e.g. `18px Arial` (any CSS sizing may be used)
 - `color` is the color of the text
 - `x` and `y` are the position from the top left

#### shape

Options:
 - `shape` may be circle/oval/ellipse
 - `color` is the fill color
 - `thickness` is the outline thickness, e.g., 3 (integer not string)
 - `strokeColor` is the color of the outline, e.g. "red" or "#00FF00"
 - `x` and `y` are the position from the top left
 - `w` and `h` are the width and height; if only one is specified it will be a circle/square

#### image

Options:
 - `image` is any valid `src` attribute for an `<img/>` element, e.g., a file path
 - `font` is the font size and family, e.g. `18px Arial` (any CSS sizing may be used)
 - `color` is the color of the text
 - `x` and `y` are the position from the top left


For example, we could create a blue square with a black outline, like this:

```
    {
        shape: "square",
        color: "blue",
        thickness: 5,
        strokeColor: "black",
        w: 100,
        x: 300,
        y: 100
    }
```

## Actions

The core of ActionEngine is, of course, Actions!  Actions are simple behaviors that respond to various events.  There
are prebuilt actions for common situations, and you can create your own for your needs.  Each object has its own actions,
so we could add some movement actions to our cube, like so.  Each of the movement actions ask for a speed at which
to move the object.

    {
        shape: "square",
        color: "blue",
        thickness: 5,
        strokeColor: "black",
        w: 100,
        x: 300,
        y: 100,
        actions: {
            a: actions.movement.left(10),
            w: actions.movement.up(10),
            d: actions.movement.right(10),
            s: actions.movement.down(10)
        }
    }

Pretty simple, eh?  Let's spice things up a bit, and create our own action that rotates our cube.  This is the wireframe
of an action.  We're passed a reference to the game object (an instance of Game) and the time in seconds since our
last frame-tick (useful for keeping consistent speed).


    ...
    r: function(game, delta){

    }
    ...



Note: Each action is bound to the `DisplayObject` of it's owner.  This means you can manipulate it directly by modifying
attributes on `this`.  To see the settings for the object, check `this.o`, however changes here have no effect.

To rotate our object, we must modify `this.rotation`, which defaults to zero.


    r: function(game, delta){
        this.rotation += 360 * delta
    }

When we hold the "r" key, our object will rotate completely once every second.  If you try this, you'll notice that the
object is rotating around it's top left.  To fix this, we must specify pivot point.  We can give a position, such as
`[50, 50]` or "center" for short.  "top-left", "middle-right", "top-center", etc. are also supported.

## What's next?

Get out there and create some awesome games!  Also, refer to the API documentation for full details and module
availability.