import { EventEmitter } from 'packages/utils';
import { PRICES } from 'scenes/GameScene';
import { Inventory } from './Inventory';

const TEXT_X_OFFSET = 35;
const TEXT_Y_OFFSET = -60;

const PRICE_X_OFFSET = 0;
const PRICE_Y_OFFSET = -85;

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

  ammoText: Phaser.GameObjects.Text;

  sashaText: Phaser.GameObjects.Text;

  borisText: Phaser.GameObjects.Text;

  vodkaText: Phaser.GameObjects.Text;

  light: Phaser.GameObjects.Light;

  tween?: Phaser.Tweens.Tween;

  ammoPrice: Phaser.GameObjects.Text;

  sashaPrice: Phaser.GameObjects.Text;

  borisPrice: Phaser.GameObjects.Text;

  vodkaPrice: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene, private inventory: Inventory) {
    super();

    this.light = this.scene.lights.addLight(1150, 600, 125, 0x00ff00, 0);

    this.sprite = this.scene.add
      .sprite(1150, 600, 'master', 'stolik/stolik0000')
      .setScale(7);
    this.box = this.scene.add.rectangle(
      this.sprite.x,
      this.sprite.y + 15,
      this.sprite.displayWidth + 50,
      this.sprite.displayHeight + 30,
      0x00ff00,
      0
    );

    this.uiContainer = this.scene.add.container(60, 100);

    this.ammo = this.scene.add
      .sprite(0, 0, 'master', 'ui/ammo-shop')
      .setScale(5);
    this.uiContainer.add(this.ammo);

    this.ammoText = this.scene.add
      .text(this.ammo.x + TEXT_X_OFFSET, this.ammo.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.ammoText);

    this.ammoPrice = this.scene.add
      .text(
        this.ammo.x + PRICE_X_OFFSET,
        this.ammo.y + PRICE_Y_OFFSET,
        `${PRICES.ammo} ₽`,
        {
          color: '#000000',
        }
      )
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.ammoPrice);

    this.sasha = this.scene.add
      .sprite(100, 0, 'master', 'ui/sasha-shop')
      .setScale(5);
    this.uiContainer.add(this.sasha);

    this.sashaText = this.scene.add
      .text(this.sasha.x + TEXT_X_OFFSET, this.sasha.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.sashaText);

    this.sashaPrice = this.scene.add
      .text(
        this.sasha.x + PRICE_X_OFFSET,
        this.sasha.y + PRICE_Y_OFFSET,
        `${PRICES.sasha} ₽`,
        {
          color: '#000000',
        }
      )
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.sashaPrice);

    this.boris = this.scene.add
      .sprite(200, 0, 'master', 'ui/boris-shop')
      .setScale(5);
    this.uiContainer.add(this.boris);

    this.borisText = this.scene.add
      .text(this.boris.x + TEXT_X_OFFSET, this.boris.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.borisText);

    this.borisPrice = this.scene.add
      .text(
        this.boris.x + PRICE_X_OFFSET,
        this.boris.y + PRICE_Y_OFFSET,
        `${PRICES.boris} ₽`,
        {
          color: '#000000',
        }
      )
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.borisPrice);

    this.vodka = this.scene.add
      .sprite(300, 0, 'master', 'ui/vodka-shop')
      .setScale(5);
    this.uiContainer.add(this.vodka);

    this.vodkaText = this.scene.add
      .text(this.vodka.x + TEXT_X_OFFSET, this.vodka.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.vodkaText);

    this.vodkaPrice = this.scene.add
      .text(
        this.vodka.x + PRICE_X_OFFSET,
        this.vodka.y + PRICE_Y_OFFSET,
        `${PRICES.vodka} ₽`,
        {
          color: '#000000',
        }
      )
      .setStroke('#ffffff', 1 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.vodkaPrice);

    this.vodkaLabel = this.scene.add
      .text(1280 / 2 - 180, 200, '')
      .setVisible(false);

    this.scene.input.keyboard.on(`keydown-ONE`, () => {
      if (this.tableEntered && !this.isRoundOn) {
        this.emit('buy-ammo');
      }
    });
    this.scene.input.keyboard.on('keyup-TWO', () => {
      if (this.tableEntered && !this.isRoundOn) {
        this.emit('buy-sasha');
      }
    });
    this.scene.input.keyboard.on('keyup-THREE', () => {
      if (this.tableEntered && !this.isRoundOn) {
        this.emit('buy-boris');
      }
    });
    this.scene.input.keyboard.on('keyup-FOUR', () => {
      if (this.tableEntered && !this.isRoundOn) {
        this.emit('buy-vodka');
      }
    });
    this.scene.input.keyboard.on('keyup-D', () => {
      if (this.tableEntered) {
        this.emit('drink-vodka');
      }
    });

    this.displayUI();
  }

  setTableEntered(bool: boolean) {
    this.tableEntered = bool;
    this.displayUI();
  }

  setRoundOn(bool: boolean) {
    this.isRoundOn = bool;
    this.displayUI();
  }

  runLightTween() {
    if (this.tween) {
      return;
    }

    this.tween = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.light.setIntensity(0.3 + value * 0.2);
      },
    });
  }

  displayUI() {
    this.ammoText.setText(String(this.inventory.ammo));
    this.sashaText.setText(String(this.inventory.sashaCounter));
    this.borisText.setText(String(this.inventory.borisCounter));
    this.vodkaText.setText(String(this.inventory.vodkaCounter));

    if (!this.isRoundOn) {
      this.runLightTween();
    } else {
      this.tween?.stop();
      this.tween = undefined;
      this.light.setIntensity(0);
    }

    if (this.tableEntered && !this.isRoundOn) {
      this.setFrames('shop');
      this.uiContainer.setVisible(true);
      return;
    }

    this.setFrames('idle');
    this.vodkaLabel.setVisible(false);

    if (this.tableEntered) {
      if (this.inventory.vodkaCounter > 0) {
        this.vodkaLabel.setVisible(false);
        this.vodka.setFrame('ui/vodka-press');
      } else {
        this.vodkaLabel
          .setVisible(true)
          .setText("You're out of vodka, buy more!");
      }
    }

    if (this.isRoundOn && this.inventory.borisCounter > 0) {
      this.boris.setFrame('ui/boris-press');
    }
  }

  setFrames = (state: 'shop' | 'idle') => {
    this.ammo.setFrame(`ui/ammo-${state}`);
    this.boris.setFrame(`ui/boris-${state}`);
    this.sasha.setFrame(`ui/sasha-${state}`);
    this.vodka.setFrame(`ui/vodka-${state}`);

    this.ammoPrice.setVisible(state === 'shop');
    this.sashaPrice.setVisible(state === 'shop');
    this.borisPrice.setVisible(state === 'shop');
    this.vodkaPrice.setVisible(state === 'shop');
  };

  updateVodkaSprite = () => {
    this.sprite.setFrame(`stolik/stolik000${this.inventory.vodkaCounter}`);
  };
}
