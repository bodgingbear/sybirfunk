import { EventEmitter } from 'packages/utils';
import { Inventory } from './Inventory';

const TEXT_X_OFFSET = 35;
const TEXT_Y_OFFSET = -60;

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

  constructor(private scene: Phaser.Scene, private inventory: Inventory) {
    super();

    this.light = this.scene.lights.addLight(1150, 600, 125, 0x00ff00, 0);

    this.sprite = this.scene.add.sprite(1150, 600, 'stolik').setScale(7);
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

    this.ammoText = this.scene.add
      .text(this.ammo.x + TEXT_X_OFFSET, this.ammo.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 2 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.ammoText);

    this.sasha = this.scene.add.image(100, 0, 'sasha-on').setScale(5);
    this.uiContainer.add(this.sasha);

    this.sashaText = this.scene.add
      .text(this.sasha.x + TEXT_X_OFFSET, this.sasha.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 2 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.sashaText);

    this.boris = this.scene.add.image(200, 0, 'boris-on').setScale(5);
    this.uiContainer.add(this.boris);

    this.borisText = this.scene.add
      .text(this.boris.x + TEXT_X_OFFSET, this.boris.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 2 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.borisText);

    this.vodka = this.scene.add.image(300, 0, 'vodka-on').setScale(5);
    this.uiContainer.add(this.vodka);

    this.vodkaText = this.scene.add
      .text(this.vodka.x + TEXT_X_OFFSET, this.vodka.y + TEXT_Y_OFFSET, '', {
        color: '#000000',
      })
      .setStroke('#ffffff', 2 * 5)
      .setOrigin(0.5, 0.5);
    this.uiContainer.add(this.vodkaText);

    // this.uiContainer.setVisible(false).setScale(0.75);

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

    if (!this.tableEntered) {
      this.setTextures('off');
      this.vodkaLabel.setVisible(false);

      return;
    }

    if (this.isRoundOn) {
      this.setTextures('off');
      if (this.inventory.vodkaCounter === 0) {
        this.vodkaLabel
          .setText("You're out of vodka, buy more!")
          .setVisible(true);
        return;
      }
      this.vodkaLabel.setText("Press 'D' to drink vodka");
      this.vodka.setTexture('vodka-press');
      this.vodkaLabel.setVisible(true);
      return;
    }

    this.setTextures('on');
    this.uiContainer.setVisible(true);
  }

  setTextures = (state: 'on' | 'off') => {
    this.ammo.setTexture(`ammo-${state}`);
    this.boris.setTexture(`boris-${state}`);
    this.sasha.setTexture(`sasha-${state}`);
    this.vodka.setTexture(`vodka-${state}`);
  };

  updateVodkaSprite = () => {
    this.sprite.setFrame(this.inventory.vodkaCounter);
  };
}
