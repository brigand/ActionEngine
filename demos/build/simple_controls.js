(function() {
  var character, game, instructions;

  character = {
    image: "../assets/img/strange_guy.png",
    w: 64,
    x: 50,
    y: 400,
    pivot: "bottom-left",
    actions: {
      "w": actions.movement.up(30),
      "a": actions.movement.left(200),
      "d": actions.movement.right(200),
      "s": actions.movement.down(30)
    }
  };

  instructions = {
    text: "Use WSAD to Move",
    x: 10,
    y: 10,
    color: "black",
    font: "20px arial",
    actions: {
      "w": actions.text.set('actions.movement.up(30)'),
      "a": actions.text.set('actions.movement.left(200)'),
      "d": actions.text.set('actions.movement.right(200)'),
      "s": actions.text.set('actions.movement.down(30)')
    }
  };

  game = new Game({
    element: "actionenginecanvas",
    objects: [character, instructions]
  });

}).call(this);
