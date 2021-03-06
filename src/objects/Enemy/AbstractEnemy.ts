import { Bullet } from 'objects/Bullet';
import { Inventory } from 'objects/Inventory';
import { FlyingCorpse } from './FlyingCorpse';
import { Blood } from './Blood';
import { Reward } from './Reward';

const ENEMY_VELOCITY = 110;

export class AbstractEnemy {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  sprite: Phaser.GameObjects.Sprite;

  hp = 2;

  spriteName: string;

  constructor(
    protected scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private inventory: Inventory,
    texture: 'guy1' | 'guy2' | 'pop',
    private reward: number = 10
  ) {
    this.spriteName = texture;

    this.sprite = this.scene.add
      .sprite(
        position.x,
        position.y,
        'master',
        `${this.spriteName}/${this.spriteName}0000`
      )
      .setScale(5)
      .setPipeline('Light2D');
    scene.physics.world.enable(this.sprite);

    this.sprite.setData('ref', this);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setImmovable(true);

    this.position = position;

    this.body.velocity.x = ENEMY_VELOCITY;

    this.body.immovable = true;
    this.sprite.anims.play(`${this.spriteName}-walk`);
  }

  public onHit(bullet: Bullet, deathCb: () => void) {
    this.hp -= bullet.damage;

    if (this.hp > 0) {
      new Blood(this.scene, this.body.position, 100, 50, 50);
    } else {
      this.destroy();

      new FlyingCorpse(this.scene, this.body.position);
      new Reward(this.scene, this.body.position, this.reward);
      this.inventory.increaseAccountBalance(this.reward);

      deathCb();
    }
  }

  public onWin() {
    this.sprite.destroy();
  }

  public onCommeradeTouch = () => {
    this.body.velocity.x -= 20;
  };

  public destroy() {
    this.sprite.destroy();
  }

  update() {}
}
