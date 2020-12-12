import { Bullet } from '../Bullet';
import { Gun } from './Gun';

const PLAYER_VELOCITY = 300;

/** Player
 */
export class Ivan {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  light: Phaser.GameObjects.Light;

  gun: Gun;

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
    this.body.collideWorldBounds = true;
    this.body.immovable = true;

    this.gun = new Gun(this.scene, this.body, this.keys, this.bullets);

    this.gun.setBullets(20);

    this.sprite.anims.play('ivan-walk');

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      300,
      0xffffff,
      0.6
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

    if (this.keys.left?.isDown) {
      velocity.subtract(new Phaser.Math.Vector2(PLAYER_VELOCITY, 0));
    }

    if (this.keys.right?.isDown) {
      velocity.add(new Phaser.Math.Vector2(PLAYER_VELOCITY, 0));
    }

    this.body.setVelocity(velocity.x, velocity.y);

    this.light.setPosition(this.sprite.x, this.sprite.y);
  }
}
