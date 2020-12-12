import { Ivan } from 'objects/Ivan/Ivan';
import { HealthBar } from 'objects/HealthBar';
import { Money } from 'objects/Money';
import { SnowManager } from 'objects/SnowManager';
import { Commerade } from 'objects/Turrets/Commerade';
import { CommeradesController } from 'objects/Turrets/CommeradesController';
import { Table } from 'objects/Table';
import { Flag } from 'objects/Flag';
import { TourManager } from 'objects/TourManager';
import { LightsController } from './LightsController';

export class GameScene extends Phaser.Scene {
  table!: Table;

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
    new LightsController(this);

    const bg = this.add.image(1280 / 2, 720 / 2, 'bg').setPipeline('Light2D');
    bg.setScale(5);

    this.physics.world.setBounds(0, 350, 1200, 720 - 350);

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

    this.table = new Table(this);
    this.ivan.sprite.setDepth(2);

    this.enemies = this.add.group();

    this.commerades = this.add.group();

    this.commerades.add(
      new Commerade(this, new Phaser.Math.Vector2(1000, 600), bullets).sprite
    );

    const money = new Money(this, new Phaser.Math.Vector2(100, 100));

    const tourManager = new TourManager(this, this.enemies, money);

    this.physics.add.collider(this.enemies, bullets, (enemyObj, bulletObj) => {
      enemyObj.getData('ref').onHit(tourManager.onEnemyKill);
      bulletObj.destroy();
    });

    // KUBA
    const healthBar = new HealthBar(this, new Phaser.Math.Vector2(1000, 100));

    this.physics.add.collider(this.enemies, this.ivan.sprite, () => {
      healthBar.shrink();
    });

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

    this.table.setTableEntered(
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.ivan.sprite.getBounds(),
        this.table.box.getBounds()
      )
    );
  }
}
