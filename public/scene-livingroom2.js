// living room from outside
// TODO - can we eliminate this file and simply pass the desired coordinates to the makePlayer method as in bedroom?
Crafty.scene('livingroom2', function() {
  currentLocation = 'livingroom'

  Crafty.e('PauseMsg')
  Crafty.e('PauseBox')

  Crafty.background(
    '#57342E url(assets/livingroom_update.png) no-repeat center right'
  );
  Crafty.sprite(32, 'assets/cat.png', { player: [0, 1] });
  Crafty.sprite(100, 'assets/doggo.png', { dog: [0, 0] });
  Crafty.sprite(60, 'assets/treadmill3.png', { treadmill: [0, 0] });
  Crafty.sprite(32, 'assets/dude.png', { roommate: [7, 0] }); // TODO - is this still here?
  /* wall */
  /* keep this wall here for now as a reference for the side door */ Crafty.e(
    '2D, DOM, Color, Solid, WallLeft, Collision,'
  )
    .attr({ x: 120, y: 0, h: 350, w: 5 })
    .color();

  Crafty.e('2D, DOM, Color, Solid, WallTop, Collision')
    .attr({ x: 87, y: 56, h: 5, w: 600 })
    .color();

  Crafty.e('2D, DOM, Color,  Solid, WallRight, Collision')
    .attr({ x: 690, y: 0, h: 350, w: 5 })
    .color();

  Crafty.e('2D, DOM, Color, Solid, WallBottomRight, Collision')
    .attr({ x: 70, y: 250, h: 5, w: 320 })
    .color();

  Crafty.e('2D, DOM, Color, WallBottomLeft, Solid, Collision')
    .attr({ x: 450, y: 250, h: 5, w: 320 })
    .color();

  Crafty.e('2D, DOM, Solid, WallBottomLeftVertical, Collision').attr({
    x: 390,
    y: 250,
    h: 80,
    w: 5
  });

  Crafty.e('2D, DOM, Solid, WallBottomRightVertical, Collision').attr({
    x: 440,
    y: 250,
    h: 80,
    w: 5
  });

  makePlayer(400, 220);
  generateLivingRoomItems();
  createStressBar();
});
