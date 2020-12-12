import { Enemy } from 'objects/Enemy/Enemy';
import { Ivan } from 'objects/Ivan';
import { LightsController } from './LightsController';

export class GameScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  private ivan!: Ivan;

  public create(): void {
    new LightsController(this);

    const bg = this.add.image(1270 / 2, 720 / 2, 'bg').setPipeline('Light2D');
    bg.setScale(5);

    this.physics.world.setBounds(0, 350, 1200, 720 - 350);

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

    this.physics.add.collider(enemies, bullets, (enemyObj, bulletObj) => {
      enemyObj.getData('ref').onHit();
      bulletObj.destroy();
    });
  }

  update() {
    this.ivan.update();
  }
}
