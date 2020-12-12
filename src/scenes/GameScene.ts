import { Enemy } from 'objects/Enemy';
import { Ivan } from 'objects/Ivan';
import { HealthBar } from 'objects/HealthBar';

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

    const bullets = this.add.group();

    this.ivan = new Ivan(
      this,
      new Phaser.Math.Vector2(1270 / 2, 720 / 2),
      keys,
      bullets
    );

    const enemies = this.add.group();

    enemies.add(new Enemy(this, new Phaser.Math.Vector2(0, 200)).sprite);
    enemies.add(new Enemy(this, new Phaser.Math.Vector2(50, 400)).sprite);
    enemies.add(new Enemy(this, new Phaser.Math.Vector2(-100, 500)).sprite);

    this.physics.add.collider(enemies, bullets, () => {
      console.log('bang');
    });

    // KUBA
    const healthBar = new HealthBar(this, new Phaser.Math.Vector2(1000, 100));
  }

  update() {
    this.ivan.update();
  }
}
