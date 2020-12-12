import { EventEmitter } from 'packages/utils';

export class Table extends EventEmitter<
  'buy-ammo' | 'buy-sasha' | 'buy-boris' | 'buy-vodka'
> {
  sprite: Phaser.GameObjects.Sprite;

  box: Phaser.GameObjects.Rectangle;

  private tableEntered = false;

  private isRoundOn = true;

  ammo: Phaser.GameObjects.Image;

  sasha: Phaser.GameObjects.Image;

  boris: Phaser.GameObjects.Image;

  vodka: Phaser.GameObjects.Image;

  uiContainer: Phaser.GameObjects.Container;

  vodkaLabel: Phaser.GameObjects.Rectangle;

  constructor(private scene: Phaser.Scene) {
    super();
    this.sprite = this.scene.add.sprite(1150, 600, 'stolik').setScale(5);
    this.box = this.scene.add.rectangle(
      this.sprite.x,
      this.sprite.y + 15,
      this.sprite.displayWidth + 50,
      this.sprite.displayHeight + 30,
      0x00ff00,
      0
    );

    this.uiContainer = this.scene.add.container(60, 100);

    this.ammo = this.scene.add.image(0, 0, 'ammo-on').setScale(5);
    this.uiContainer.add(this.ammo);
    this.sasha = this.scene.add.image(100, 0, 'sasha-on').setScale(5);
    this.uiContainer.add(this.sasha);
    this.boris = this.scene.add.image(200, 0, 'boris-on').setScale(5);
    this.uiContainer.add(this.boris);
    this.vodka = this.scene.add.image(300, 0, 'vodka-on').setScale(5);
    this.uiContainer.add(this.vodka);
    this.uiContainer.setVisible(false).setScale(0.75);

    this.vodkaLabel = this.scene.add
      .rectangle(1280 / 2 - 100, 100, 400, 100, 0x00ff00, 0.2)
      .setVisible(false);

    this.scene.input.keyboard.on(`keydown-ONE`, () => {
      this.emit('buy-ammo');
    });
    this.scene.input.keyboard.on('keyup-TWO', () => {
      this.emit('buy-sasha');
    });
    this.scene.input.keyboard.on('keyup-THREE', () => {
      this.emit('buy-boris');
    });
    this.scene.input.keyboard.on('keyup-FOUR', () => {
      this.emit('buy-vodka');
    });
  }

  setTableEntered(bool: boolean) {
    this.tableEntered = bool;
    this.displayUI();
  }

  setRoundOn(bool: boolean) {
    this.isRoundOn = bool;
    this.displayUI();
  }

  displayUI() {
    if (!this.tableEntered) {
      this.uiContainer.setVisible(false);
      this.vodkaLabel.setVisible(false);
      return;
    }

    if (this.isRoundOn) {
      this.uiContainer.setVisible(false);
      this.vodkaLabel.setVisible(true);
      return;
    }

    this.uiContainer.setVisible(true);
    this.vodkaLabel.setVisible(false);
  }
}
