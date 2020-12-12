import { Enemy } from 'objects/Enemy';
import { Ivan } from 'objects/Ivan';
import { Commerade } from 'objects/Turrets/Commerade';
import { CommeradesController } from 'objects/Turrets/CommeradesController';

export class GameScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  private ivan!: Ivan;

  private commerades!: Phaser.GameObjects.Group;

  private commeradesController!: CommeradesController;

  enemies!: Phaser.GameObjects.Group;

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

    this.enemies = this.add.group();

    this.enemies.add(new Enemy(this, new Phaser.Math.Vector2(0, 200)).sprite);
    this.enemies.add(new Enemy(this, new Phaser.Math.Vector2(50, 400)).sprite);
    this.enemies.add(
      new Enemy(this, new Phaser.Math.Vector2(-100, 500)).sprite
    );

    this.commerades = this.add.group();

    this.commerades.add(
      new Commerade(this, new Phaser.Math.Vector2(50, 600)).sprite
    );

    this.physics.add.collider(this.enemies, bullets, () => {
      console.log('bang');
    });

    this.commeradesController = new CommeradesController(
      this.commerades,
      this.enemies
    );
  }

  update() {
    this.ivan.update();
    this.commerades.children
      .getArray()
      .forEach((obj) => obj.getData('ref').update());
    this.commeradesController.update();
  }
}
