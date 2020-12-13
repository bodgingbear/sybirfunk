import { Inventory } from 'objects/Inventory';
import { EventEmitter } from 'packages/utils';
import { Gun } from './Gun';

const PLAYER_VELOCITY = 300;
export const PLAYER_MAX_HP = 100;

type EventHandlers = {
  changeHealth: (health: number) => void;
};

/** Player
 */
export class Ivan extends EventEmitter<'changeHealth', EventHandlers> {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  light: Phaser.GameObjects.Light;

  gun: Gun;

  previouslyHitAt = 0;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys,
    private bullets: Phaser.GameObjects.Group,
    weapon: 'gun' | 'knife' = 'gun',
    inventory: Inventory,
    private hp: number = PLAYER_MAX_HP
  ) {
    super();
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'ivan')
      .setScale(5);
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.collideWorldBounds = true;
    this.body.immovable = true;

<<<<<<< HEAD
    this.gun = new Gun(this.scene, this.body, this.bullets);

=======
    this.gun = new Gun(this.scene, this.body, this.bullets, inventory);
>>>>>>> a669dac735e2ac2356bb9eaaa9842e78d19c201e
    keys.space?.on('down', () => {
      if (weapon === 'gun') {
        this.gun.shoot();
      } else {
        // knife.attack()
      }
    });

    this.gun.setBullets(20);

    this.sprite.anims.play('ivan-walk');

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      200,
      0xffffff,
      0.2
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

  drinkVodka() {
    this.hp = PLAYER_MAX_HP;
    const anim = this.sprite.play('ivan-drink');
    anim.on('animationcomplete', () => {
      anim.off('animationcomplete');
      this.sprite.anims.play('ivan-walk');
    });

    this.emit('changeHealth', this.hp);
  }

  hit(damage: number) {
    if (this.scene.time.now - this.previouslyHitAt <= 1000) {
      return;
    }

    this.hp = Math.max(this.hp - damage, 0);
    this.previouslyHitAt = this.scene.time.now;
    this.emit('changeHealth', this.hp);
  }
}
