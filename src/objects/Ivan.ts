import { Bullet } from './Bullet';

const PLAYER_VELOCITY = 110;

/** Player
 */
export class Ivan {
  body: Phaser.Physics.Arcade.Body;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys,
    private bullets: Phaser.GameObjects.Group
  ) {
    const sprite = this.scene.add.rectangle(
      position.x,
      position.y,
      50,
      50,
      0xff0000
    );
    scene.physics.world.enable(sprite);

    this.body = sprite.body as Phaser.Physics.Arcade.Body;

    keys.space?.on('down', () => {
      this.bullets.add(new Bullet(scene, this.body.position).sprite);
    });
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
  }
}
