import { Bullet } from './Bullet';

const PLAYER_VELOCITY = 110;

/** Player
 */
export class Ivan {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys
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

    this.position = position;

    keys.space?.on('down', () => {
      new Bullet(scene, this.position);
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

    this.position = this.body.position;
  }
}
