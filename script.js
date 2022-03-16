const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');


let sprites = World.build(Levels.getLevel(3));


const controller = new Controller();




setInterval(() => {

  context.clearRect(0, 0, canvas.width, canvas.height);
  let level = 3;
  for (const sprite of sprites) {

    if (sprite.win) {
      level ++;
      
      sprites = World.build(Levels.getLevel(level));

    }
    if (sprite.isDead) {
      level = 2;
      sprites = World.build(Levels.getLevel(level));
    }
    CollisionDetector.checkCollisions(sprite, sprites);

    sprite.draw(context);

    sprite.update(canvas, controller);
  }

}, 30);


window.onload = function (){
  let img = document.createElement("img");
  img.src = "./jungle-tileset.png";
  context.drawImage(img, 10, 30);
}






