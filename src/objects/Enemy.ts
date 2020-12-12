const ENEMY_VELOCITY = 110;

/** Player
 */
export class Enemy {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const sprite = this.scene.add.rectangle(
      position.x,
      position.y,
      30,
      60,
      0x00ff00
    );
    scene.physics.world.enable(sprite);

    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    this.position = position;

    this.body.velocity.x = ENEMY_VELOCITY;
  }

  update() {}
}
