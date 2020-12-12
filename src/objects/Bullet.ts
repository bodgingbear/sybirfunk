const BULLET_VELOCITY = 900;

/** Player
 */
export class Bullet {
  body: Phaser.Physics.Arcade.Body;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const sprite = this.scene.add.circle(position.x, position.y, 5, 0x0000ff);
    scene.physics.world.enable(sprite);

    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    this.body.velocity.x = -BULLET_VELOCITY;
  }

  update() {
    // @TODO clear bullets
  }
}
