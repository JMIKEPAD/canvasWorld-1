const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


const sprites = World.build(Levels.getLevel(4));


const controller = new Controller();




setInterval(() => {

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (const sprite of sprites) {

    CollisionDetector.checkCollisions(sprite, sprites);

    sprite.draw(context);

    sprite.update(canvas, controller);

  }


}, 30);





