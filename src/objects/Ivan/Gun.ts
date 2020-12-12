import { Bullet } from 'objects/Bullet';

export class Gun {
  private bulletsCount = 0;

  private text: Phaser.GameObjects.Text;

  constructor(
    private scene: Phaser.Scene,
    private parentBody: Phaser.Physics.Arcade.Body,
    private bullets: Phaser.GameObjects.Group
  ) {
    this.text = this.scene.add.text(1280 - 200, 720 - 80, '0 bullets');
  }

  public shoot = () => {
    if (this.bulletsCount <= 0) {
      return;
    }

    this.bulletsCount--;

    this.text.setText(`${this.bulletsCount} bullets`);

    this.bullets.add(
      new Bullet(
        this.scene,
        this.parentBody.position.add(new Phaser.Math.Vector2(-10, 37))
      ).sprite
    );
  };

  public setBullets(bulletsCount: number) {
    this.bulletsCount = bulletsCount;

    this.text.setText(`${this.bulletsCount} bullets`);
  }
}
