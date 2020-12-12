import { Ivan } from 'objects/Ivan';
import { HealthBar } from 'objects/HealthBar';
import { Money } from 'objects/Money';
import { SnowManager } from 'objects/SnowManager';
import { Commerade } from 'objects/Turrets/Commerade';
import { CommeradesController } from 'objects/Turrets/CommeradesController';
import { Flag } from 'objects/Flag';
import { TourManager } from 'objects/TourManager';
import { LightsController } from './LightsController';

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
    const bg = this.add.image(1270 / 2, 720 / 2, 'bg').setPipeline('Light2D');
    bg.setScale(5);

    this.physics.world.setBounds(0, 350, 1200, 720 - 350);

    new LightsController(this);
    new Flag(this, new Phaser.Math.Vector2(1270 - 120, 720 / 2 - 30));

    new SnowManager(this);

    const keys = this.input.keyboard.createCursorKeys();

    const bullets = this.add.group();

    this.ivan = new Ivan(
      this,
      new Phaser.Math.Vector2(1270 / 2, 720 / 2),
      keys,
      bullets
    );

    this.enemies = this.add.group();

    this.commerades = this.add.group();

    this.commerades.add(
      new Commerade(this, new Phaser.Math.Vector2(1000, 600), bullets).sprite
    );

    const tourManager = new TourManager(this, this.enemies);

    this.physics.add.collider(this.enemies, bullets, (enemyObj, bulletObj) => {
      enemyObj.getData('ref').onHit();
      bulletObj.destroy();
      tourManager.onEnemyKill();
    });

    // KUBA
    const healthBar = new HealthBar(this, new Phaser.Math.Vector2(1000, 100));

    this.physics.add.collider(this.enemies, this.ivan.sprite, () => {
      healthBar.shrink();
    });

    const money = new Money(this, new Phaser.Math.Vector2(100, 100));

    // END KUBA

    this.commeradesController = new CommeradesController(
      this.commerades,
      this.enemies,
      this.physics
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
