import { Inventory } from 'objects/Inventory';
import { bound, EventEmitter } from 'packages/utils';
import { Gun } from './Gun';

const PLAYER_VELOCITY = 1200;
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

  // knife: Knife;

  previouslyHitAt = 0;

  callBoris: () => void;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private keys: Phaser.Types.Input.Keyboard.CursorKeys,
    private bullets: Phaser.GameObjects.Group,
    weapon: 'gun' | 'knife' = 'gun',
    inventory: Inventory,
    callBoris: () => void,
    private hp: number = PLAYER_MAX_HP,
    private state: 'idle' | 'drinking' = 'idle'
  ) {
    super();
    this.callBoris = callBoris;
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'ivan')
      .setScale(5);
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.setBoundsRectangle(
      new Phaser.Geom.Rectangle(1280 / 2, 720 / 2, 1280 / 2 - 30, 720 / 2)
    );

    this.gun = new Gun(this.scene, this.body, this.bullets, inventory);
    // this.knife = new Knife(this.scene, position);
    this.scene.input.keyboard.on('keydown-SPACE', () => {
      if (weapon === 'gun') {
        this.gun.shoot();
      } else {
        // this.knife.attack();
      }
    });

    this.gun.setBullets(30);

    this.sprite.anims.play('ivan-walk');

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      200,
      0xffffff,
      0.2
    );

    this.scene.input.keyboard.on('keyup-Q', () => {
      this.callBoris();
    });
  }

  getState(): 'idle' | 'drinking' {
    return this.state;
  }

  update() {
    let velocity = new Phaser.Math.Vector2(0, 0);

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

    if (velocity.x !== 0 && velocity.y !== 0) {
      velocity = velocity.normalize().scale(PLAYER_VELOCITY);
    }

    this.body.setVelocity(velocity.x, velocity.y);

    this.light.setPosition(this.sprite.x, this.sprite.y);
  }

  drinkVodka() {
    this.state = 'drinking';
    this.hp = bound(0, PLAYER_MAX_HP, this.hp + PLAYER_MAX_HP / 4);
    const anim = this.sprite.play('ivan-drink');
    anim.on('animationcomplete', () => {
      anim.off('animationcomplete');
      this.sprite.anims.play('ivan-walk');
    });

    this.emit('changeHealth', this.hp);
  }

  finishDrinking() {
    this.state = 'idle';
  }

  hit(damage: number, force = false) {
    if (this.scene.time.now - this.previouslyHitAt <= 1000 && !force) {
      return;
    }

    this.hp = Math.max(this.hp - damage, 0);
    this.previouslyHitAt = this.scene.time.now;
    this.emit('changeHealth', this.hp);
  }
}
