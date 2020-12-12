const BULLET_VELOCITY = 900;

export class Bullet {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.GameObject;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    this.sprite = this.scene.add.circle(position.x, position.y, 2, 0xd9c078);
    this.scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.body.velocity.x = -BULLET_VELOCITY;
  }

  update() {
    // @TODO clear bullets
  }
}
