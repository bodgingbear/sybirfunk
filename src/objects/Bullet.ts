const BULLET_VELOCITY = 900;

export class Bullet {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.GameObject;

  light: Phaser.GameObjects.Light;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    this.sprite = this.scene.add.circle(position.x, position.y, 2, 0xd9c078);

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      200,
      0xffffff,
      0.1
    );

    this.scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.sprite.setData('ref', this);

    this.body.velocity.x = -BULLET_VELOCITY;
  }

  destroy() {
    this.sprite.destroy();
    this.scene.lights.removeLight(this.light);
  }

  update() {
    this.light.setPosition(this.body.x, this.body.y);
  }
}
