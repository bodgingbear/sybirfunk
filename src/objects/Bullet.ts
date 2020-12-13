export const BULLET_VELOCITY = -900;

interface BulletLightConfig {
  hideLight: boolean;
  lightIntensityMultiplier: number;
}

export class Bullet {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.GameObject;

  light?: Phaser.GameObjects.Light;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    xVelocity: number = BULLET_VELOCITY,
    yVelocity: number = 0,
    public damage = 1,
    lightConfig?: BulletLightConfig
  ) {
    const { hideLight = false, lightIntensityMultiplier = 1 } =
      lightConfig || {};

    this.sprite = this.scene.add.circle(position.x, position.y, 2, 0xd9c078);

    if (!hideLight) {
      this.light = this.scene.lights.addLight(
        position.x,
        position.y,
        200,
        0xffffff,
        0.1 * lightIntensityMultiplier
      );
    }

    this.scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.sprite.setData('ref', this);

    this.body.velocity.x = xVelocity;
    this.body.velocity.y = yVelocity;
  }

  destroy() {
    this.sprite.destroy();
    if (this.light) this.scene.lights.removeLight(this.light);
  }

  update() {
    if (this.body.x < 0) {
      this.sprite.destroy();
      this.body.destroy();
      if (this.light) this.scene.lights.removeLight(this.light);
    }

    this.light?.setPosition(this.body.x, this.body.y);
  }
}
