import type { Inventory } from './Inventory';
import { PLAYER_MAX_HP } from './Ivan/Ivan';

const HEALTH_BAR_X = 865;
const HEALTH_BAR_Y = 105;

const TOP_LINE_Y = 60;
const AMMO_X = 722;
const MONEY_X = 880;
const TEXT_OFFSET_X = 2 * 5;

export class HealthBar {
  barShrinking: Phaser.GameObjects.Rectangle;

  ammoText: Phaser.GameObjects.Text;

  moneyText: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene, private inventory: Inventory) {
    const bar = this.scene.add
      .sprite(HEALTH_BAR_X, HEALTH_BAR_Y, 'health-bar')
      .setScale(5)
      .setDepth(11);

    this.barShrinking = this.scene.add.rectangle(
      bar.x - bar.displayWidth / 2,
      bar.y,
      bar.displayWidth,
      bar.displayHeight - 2,
      0xc20c0c
    );

    const ammo = this.scene.add.sprite(AMMO_X, TOP_LINE_Y, 'ammo').setScale(5);
    const money = this.scene.add
      .sprite(MONEY_X, TOP_LINE_Y, 'money')
      .setScale(5);

    this.ammoText = this.scene.add.text(
      AMMO_X + ammo.displayWidth / 2 + TEXT_OFFSET_X,
      TOP_LINE_Y,
      String(this.inventory.ammo),
      {
        fontSize: 24,
      }
    );
    this.ammoText.setOrigin(0, 0.5);

    this.moneyText = this.scene.add.text(
      MONEY_X + money.displayWidth / 2 + TEXT_OFFSET_X,
      TOP_LINE_Y,
      String(this.inventory.accountBalance),
      {
        fontSize: 24,
      }
    );
    this.moneyText.setOrigin(0, 0.5);

    this.barShrinking.setOrigin(0, 0.5);
  }

  public onChange = () => {
    this.moneyText.setText(String(this.inventory.accountBalance));
    this.ammoText.setText(String(this.inventory.ammo));
  };

  onHealthChange = (health: number) => {
    this.barShrinking.scaleX = health / PLAYER_MAX_HP;
  };

  update() {}
}
