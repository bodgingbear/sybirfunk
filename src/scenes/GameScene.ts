import { Enemy } from 'objects/Enemy';
import { Ivan } from 'objects/Ivan';

export class GameScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  private ivan!: Ivan;

  public create(): void {
    this.lights.enable();
    this.lights.setAmbientColor(0);

    const bg = this.add.image(1270 / 2, 720 / 2, 'bg').setPipeline('Light2D');
    bg.setScale(1270 / bg.width);
    this.lights.addLight(1280 / 2 + 400, 720 / 2 - 100, 400, 0xff0000);
    this.lights
      .addLight(1280 / 2 + 50, 720 / 2 + 100, 600, 0x111111)
      .setIntensity(2);

    const keys = this.input.keyboard.createCursorKeys();

    this.ivan = new Ivan(
      this,
      new Phaser.Math.Vector2(1270 / 2, 720 / 2),
      keys
    );

    new Enemy(this, new Phaser.Math.Vector2(0, 200));
    new Enemy(this, new Phaser.Math.Vector2(50, 400));
    new Enemy(this, new Phaser.Math.Vector2(-100, 500));
  }

  update() {
    this.ivan.update();
  }
}
