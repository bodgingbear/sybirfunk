import { Money } from 'objects/Money';
import { FlyingCorpse } from './FlyingCorpse';
import { Blood } from './Blood';
import { Reward } from './Reward';

const ENEMY_VELOCITY = 110;

export class Enemy {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  sprite: Phaser.GameObjects.Sprite;

  hp = 2;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private money: Money
  ) {
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'guy1-0')
      .setScale(5)
      .setPipeline('Light2D');
    scene.physics.world.enable(this.sprite);

    this.sprite.setData('ref', this);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setImmovable(true);

    this.position = position;

    this.body.velocity.x = ENEMY_VELOCITY;

    this.body.immovable = true;
    this.sprite.anims.play('guy1-walk');
  }

  public onHit = (deathCb: () => void) => {
    this.hp--;

    if (this.hp > 0) {
      new Blood(this.scene, this.body.position, 100, 50, 50);
    } else {
      this.sprite.destroy();

      new FlyingCorpse(this.scene, this.body.position);
      new Reward(this.scene, this.body.position);
      // @TODO tween --> delete

      deathCb();
    }

    this.money.onHit();
  };

  public onCommeradeTouch = () => {
    this.body.velocity.x -= 20;
  };

  update() {}
}
