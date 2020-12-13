import { Bullet } from 'objects/Bullet';
import { Inventory } from 'objects/Inventory';
import { Sound } from 'Sound';

export class Gun {
  constructor(
    private scene: Phaser.Scene,
    private parentBody: Phaser.Physics.Arcade.Body,
    private bullets: Phaser.GameObjects.Group,
    private inventory: Inventory
  ) {
    this.scene.sound.add(Sound.ppsh40SingleShot);
  }

  public shoot = () => {
    if (this.inventory.ammo <= 0) {
      return;
    }

    this.inventory.useAmmo(1);
    this.scene.sound.play(Sound.ppsh40SingleShot);
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
