import { Bullet } from './Bullet';

const PLAYER_VELOCITY = 110;

/** Player
 */
export class Ivan {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  light: Phaser.GameObjects.Light;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys,
    private bullets: Phaser.GameObjects.Group
  ) {
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'ivan')
      .setScale(5);
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    keys.space?.on('down', () => {
      this.bullets.add(
        new Bullet(
          scene,
          this.body.position.add(new Phaser.Math.Vector2(-10, 37))
        ).sprite
      );
    });

    this.sprite.anims.play('ivan-walk');

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      200,
      0xffffff
    );
  }

  update() {
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.keys.up?.isDown) {
      velocity.subtract(new Phaser.Math.Vector2(0, PLAYER_VELOCITY * 1.5));
    }

    if (this.keys.down?.isDown) {
      velocity.add(new Phaser.Math.Vector2(0, PLAYER_VELOCITY * 1.5));
    }

    this.body.setVelocity(velocity.x, velocity.y);

    this.light.setPosition(this.sprite.x, this.sprite.y);
  }
}
