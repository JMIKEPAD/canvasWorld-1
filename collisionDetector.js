class CollisionDetector {

    
/**
 * Check if two sprites are colliding, and if they are, manage the collision and check if the sprite is
 * solid
 * @param sprite1 - The first sprite to check for collisions.
 * @param spriteArray - The array of sprites that the sprite is going to check against.
 */
  static checkCollisions(sprite1, spriteArray) {
    //prende lo sprite array perchè deve checkare quelle che si spostano con tutte quelle ferme nel mondo.
    if (sprite1.isActive) {
      for (const sprite2 of spriteArray) {
        if (sprite1 !== sprite2) {
          if (this.isColliding(sprite1, sprite2)) {
              
              if (sprite1.isSolid) {
                  const isHorizontal = this.solidCollision(sprite1, sprite2);
                  sprite1.manageCollision(sprite2, isHorizontal)
              }else {
                sprite1.manageCollision(sprite2);
              }
          }
        }
      }
    }
  }


/**
 * "Check if the activeSprite is colliding with the wall."
 * 
 * The function takes two parameters: activeSprite and wall
 * @param activeSprite - The sprite that is currently moving.
 * @param wall - The wall object that the sprite is colliding with.
 * @returns a boolean value.
 */
  static isColliding(activeSprite, wall) {
    const collidingX =
      activeSprite.x <= wall.x + wall.width &&
      activeSprite.x + activeSprite.width >= wall.x;
    const collidingY =
      activeSprite.y <= wall.y + wall.height &&
      activeSprite.y + activeSprite.height >= wall.y;
    return collidingX && collidingY;
  }


/**
 * If the activeSprite is moving towards the wall, stop it
 * @param activeSprite - The sprite that is colliding with the wall.
 * @param entity - The entity that the activeSprite is colliding with.
 */

  static solidCollision(activeSprite, entity) {
    const activeSpriteXmid = activeSprite.x + activeSprite.width / 2;
    const activeSpriteYmid = activeSprite.y + activeSprite.height / 2;
    const wallXmid = entity.x + entity.width / 2;
    const wallYmid = entity.y + entity.height / 2;

    const dx = wallXmid - activeSpriteXmid;
    const dy = wallYmid - activeSpriteYmid;

    const absDX = Math.abs(dx);
    const absDY = Math.abs(dy);

    if (absDX > absDY) {
      if (dx < 0) {
        activeSprite.x = entity.x + entity.width + 0.1;
      } else {
        activeSprite.x = entity.x - activeSprite.width - 0.1;
      }
      activeSprite.speedX = 0;
      if (entity.color === "green") {
        //   document.location.reload(true);
      } else {
        return false; }                                                    //ritrono un boolean per avere le collisioni orizzontali o verticali --> queste verticali 

    } else if (absDY > absDX) {
      if (dy < 0) {
        activeSprite.y = entity.y + entity.height + 0.1;
      } else {
        activeSprite.y = entity.y - activeSprite.height - 0.1;
      }
      activeSprite.speedY = 0;
      return true;                                                           //queste orizzontali
    }
  }
}
