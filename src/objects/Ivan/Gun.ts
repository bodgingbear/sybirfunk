import { Bullet } from 'objects/Bullet';
import { Inventory } from 'objects/Inventory';
import { Sound } from 'Sound';

export class Gun {
  private sound: Phaser.Sound.BaseSound;

  constructor(
    private scene: Phaser.Scene,
    private parentBody: Phaser.Physics.Arcade.Body,
    private bullets: Phaser.GameObjects.Group,
    private inventory: Inventory
  ) {
    this.sound = this.scene.sound.add(Sound.ppsh40SingleShot, {
      volume: 0.1,
    });
  }

  public shoot = () => {
    if (this.inventory.ammo <= 0) {
      return;
    }

    this.inventory.useAmmo(1);
    this.sound.play();
    this.bullets.add(
      new Bullet(
        this.scene,
        this.parentBody.position.add(new Phaser.Math.Vector2(-10, 37))
      ).sprite
    );
  };

  public setBullets(bulletsCount: number) {
    this.inventory.setAmmo(bulletsCount);
  }
}
