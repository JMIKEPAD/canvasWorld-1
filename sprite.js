class RectSprite {
  constructor(x, y, width, height, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  update(canvas) {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    if (this.x > canvas.width - this.width || this.x < 0) {
      this.speedX = this.speedX * -1;
    }
    if (this.y > canvas.height - this.height || this.y < 0) {
      this.speedY = this.speedY * -1;
    }
  }

  draw(context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class CircleSprite {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  update(canvas) {
    this.x = this.x + this.speedX;
    this.y = this.y + this.speedY;
    if (this.x > canvas.width - this.radius || this.x < this.radius) {
      this.speedX = this.speedX * -1;
    }
    if (this.y > canvas.height - this.radius || this.y < this.radius) {
      this.speedY = this.speedY * -1;
    }
  }

  draw(context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }
}



/////////////////////////////////////////////////////////////// PLAYER ////////////////////////////////////////////////////////////////////////////////////////////////


class PlayerSprite extends RectSprite {

  constructor(x, y, width, height, speedX, speedY) {
    super(x, y, width, height, speedX, speedY, "magenta");
    this.isPlayer = true;
    this.isActive = true;
    this.isSolid = true;
    this.isJumping = false;
    this.win = false;
  }


  update(canvas, controller) {
    if (controller.isUpClicked) {
      if (this.isJumping === false) {
        this.speedY += -10;                        //AUMENTO DA 0.1 A 0.4 PER AVERE UNA FORZA MAGGIORE DELLA GRAVITA'
        this.isJumping = true;
      }
    }
    // if (controller.isDownClicked) {             //COMMENTO PER AVERE UN PLAYER CHE RIESCE A MUOVERSI CON LA GRAVITA'
    //   this.speedY += 0.1;
    // }
    if (controller.isRightClicked) {
      this.speedX += 0.2;
    }
    if (controller.isLeftClicked) {
      this.speedX += -0.2;
    }

    //AGGIUNGO LA FRICTION DALLA CLASSE PHYSIC:
    const friction = Physic.getFriction();
    this.speedX *= friction;                       //fare la friction *= 0.1 è come fare /=10 --> *=0.5 e come fare /=2
    this.speedY *= friction;

    //AGGIUNGO LA GRAVITA' DELLA CLASSE PHYSIC:
    const gravity = Physic.getGravity();
    this.speedX += gravity.x;
    this.speedY += gravity.y;

    super.update(canvas);
  }

  manageCollision(sprite, isHorizontal){
    if (sprite.isExit) {
      this.win = true;
    }
    if (isHorizontal) {
      this.isJumping = false;
    }
    
  }
}



class ExitSprite extends RectSprite{

  constructor(x, y, width, height, speedX, speedY) {
    super(x, y, width, height, speedX, speedY, "green");
    this.isExit = true;
  }

}








///////////////////////////////////// VELOCITA' - ACCELERAZIONE - GRAVITA' ///////////////////////////////////////////////////////////////////////////////////////
/*
V = a * t = m/s^2 * s = m/s
F = m * a
*/