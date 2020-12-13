import { Bullet } from 'objects/Bullet';
import { Inventory } from 'objects/Inventory';
import { AbstractEnemy } from './AbstractEnemy';

const LIGHT_OFFSET_X = 15;
const LIGHT_OFFSET_Y = 50;

export class BoomboxEnemy extends AbstractEnemy {
  light: Phaser.GameObjects.Light;

  tween: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    inventory: Inventory
  ) {
    super(scene, position, inventory, 'guy2', 50);
    this.sprite.setData('ref', this);

    this.light = this.scene.lights.addLight(
      position.x + LIGHT_OFFSET_X,
      position.y + LIGHT_OFFSET_Y,
      120,
      0xe181d9
    );

    this.tween = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 500,
      yoyo: true,
      loop: -1,
      onUpdate: (tween) => {
        this.light.setRadius(120 + 40 * tween.getValue());
      },
    });
  }

  public onHit = (bullet: Bullet, deathCb: () => void) => {
    const cb = () => {
      this.scene.lights.removeLight(this.light);
      this.tween.stop();
      deathCb();
    };
    super.onHit(bullet, cb);
  };

  public onWin() {
    super.onWin();
    this.scene.lights.removeLight(this.light);
    this.tween.stop();
  }

  update() {
    super.update();

    this.light.setPosition(
      this.sprite.body.position.x + LIGHT_OFFSET_X,
      this.sprite.body.position.y + LIGHT_OFFSET_Y
    );
  }

  public destroy() {
    super.destroy();
    this.scene.lights.removeLight(this.light);
  }
}
