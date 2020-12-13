import { EventEmitter } from 'packages/utils';
import { Inventory } from './Inventory';

export class Table extends EventEmitter<
  'buy-ammo' | 'buy-sasha' | 'buy-boris' | 'buy-vodka' | 'drink-vodka'
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

  vodkaLabel: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene, private inventory: Inventory) {
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
      .text(1280 / 2 - 180, 200, '')
      .setVisible(false);

    this.scene.input.keyboard.on(`keydown-ONE`, () => {
      if (this.uiContainer.visible) {
        this.emit('buy-ammo');
      }
    });
    this.scene.input.keyboard.on('keyup-TWO', () => {
      if (this.uiContainer.visible) {
        this.emit('buy-sasha');
      }
    });
    this.scene.input.keyboard.on('keyup-THREE', () => {
      if (this.uiContainer.visible) {
        this.emit('buy-boris');
      }
    });
    this.scene.input.keyboard.on('keyup-FOUR', () => {
      if (this.uiContainer.visible) {
        this.emit('buy-vodka');
      }
    });
    this.scene.input.keyboard.on('keyup-D', () => {
      if (this.vodkaLabel.visible) {
        this.emit('drink-vodka');
      }
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
      if (this.inventory.vodkaCounter === 0) {
        this.vodkaLabel
          .setText("You're out of vodka, by more!")
          .setVisible(true);
        return;
      }
      this.vodkaLabel.setText("Press 'D' to drink vodka");
      this.vodkaLabel.setVisible(true);
      return;
    }

    this.uiContainer.setVisible(true);
  }

  updateVodkaSprite = () => {
    this.sprite.setFrame(this.inventory.vodkaCounter);
  };
}
