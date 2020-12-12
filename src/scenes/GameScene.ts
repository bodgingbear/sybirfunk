import { Ivan } from 'objects/Ivan/Ivan';
import { HealthBar } from 'objects/HealthBar';
import { Money } from 'objects/Money';
import { SnowManager } from 'objects/SnowManager';
import { Commerade } from 'objects/Turrets/Commerade';
import { CommeradesController } from 'objects/Turrets/CommeradesController';
import { Table } from 'objects/Table';
import { Flag } from 'objects/Flag';
import { TourManager } from 'objects/TourManager';
import { Boris } from 'objects/Turrets/Boris';
import { Inventory } from 'objects/Inventory';
import { LightsController } from './LightsController';

export class GameScene extends Phaser.Scene {
  table!: Table;

  bullets!: Phaser.GameObjects.Group;

  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  private ivan!: Ivan;

  private commerades!: Phaser.GameObjects.Group;

  private boris: Boris | undefined;

  private commeradesController!: CommeradesController;

  enemies!: Phaser.GameObjects.Group;

  public create(): void {
    const lightsController = new LightsController(this);
    lightsController.startAlarm();

    const bg = this.add.image(1280 / 2, 720 / 2, 'bg').setPipeline('Light2D');
    bg.setScale(5);

    this.physics.world.setBounds(0, 350, 1200, 720 - 350);

    new Flag(this, new Phaser.Math.Vector2(1270 - 250, 720 / 2 - 30));

    new SnowManager(this);
    const keys = this.input.keyboard.createCursorKeys();

    const inventory = new Inventory();

    this.bullets = this.add.group();

    this.ivan = new Ivan(
      this,
      new Phaser.Math.Vector2(1270 / 2, 720 / 2),
      keys,
      this.bullets,
      'knife'
    );

    this.table = new Table(this);
    this.ivan.sprite.setDepth(2);

    this.enemies = this.add.group();

    this.commerades = this.add.group();

    this.commerades.add(
      new Commerade(this, new Phaser.Math.Vector2(1000, 600), this.bullets)
        .sprite
    );

    const money = new Money(this, new Phaser.Math.Vector2(100, 200));

    const tourManager = new TourManager(this, this.enemies, money);
    tourManager.on('round-start', () => {
      this.table.setRoundOn(true);
      lightsController.startAlarm();
    });
    tourManager.on('round-end', () => {
      this.table.setRoundOn(false);
      lightsController.stopAlarm();
    });

    this.physics.add.collider(
      this.enemies,
      this.bullets,
      (enemyObj, bulletObj) => {
        enemyObj
          .getData('ref')
          .onHit(bulletObj.getData('ref'), tourManager.onEnemyKill);
        bulletObj.getData('ref').destroy();
      }
    );
    this.boris = new Boris(
      this,
      new Phaser.Math.Vector2(1300, 600),
      this.bullets
    );
    this.boris.activate();

<<<<<<< HEAD
    const healthBar = new HealthBar(this, new Phaser.Math.Vector2(865, 105));
=======
    const healthBar = new HealthBar(this, inventory);
    inventory.on('change', healthBar.onChange);
>>>>>>> 4ad3fb6b0d16806216538237ae4b8f1d332662fe

    this.physics.add.collider(this.enemies, this.ivan.sprite, () => {
      healthBar.shrink();
    });

    this.commeradesController = new CommeradesController(
      this.commerades,
      this.enemies,
      this.physics
    );
  }

  update() {
    this.ivan.update();
    this.boris?.update();
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
    this.bullets?.getChildren().forEach((b) => b.getData('ref').update());
  }
}
