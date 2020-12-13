import { loadAsset } from 'packages/utils';
import { shouldSkipIntro } from 'packages/utils/shouldSkipIntro';
import { TEAM } from '../constants';

export class LoadingScene extends Phaser.Scene {
  private introImage!: Phaser.GameObjects.Sprite;

  private timesLooped = 0;

  private animStopped = false;

  public constructor() {
    super({
      key: 'LoadingScene',
    });
  }

  private loadAssets() {
    this.load.image('bg', [
      loadAsset('images/background.png'),
      loadAsset('images/NormalMap.png'),
    ]);

    this.load.image('blood', [
      loadAsset('images/blood.png'),
      loadAsset('images/defaultNormalMap.png'),
    ]);
    this.load.image('health-bar', loadAsset('images/health_bar.png'));
    // Assets go here
    this.load.video(
      'demo',
      loadAsset('videos/demo.mp4'),
      'loadeddata',
      false,
      true
    );

    this.load.image('stolik', 'images/stolik.png');
    this.load.image('snow1', [
      'images/snowflake1.png',
      loadAsset('images/defaultNormalMap.png'),
    ]);
    this.load.image('snow2', [
      'images/snowflake2.png',
      loadAsset('images/defaultNormalMap.png'),
    ]);
    this.load.spritesheet('ivan', loadAsset('images/iwan.png'), {
      frameWidth: 11,
      frameHeight: 18,
    });

    this.load.image('moon', loadAsset('images/moon.png'));

    this.load.image('guy1-0', [
      loadAsset('images/guy1-0.png'),
      loadAsset('images/defaultNormalMap.png'),
    ]);

    this.load.image('guy1-1', [
      loadAsset('images/guy1-1.png'),
      loadAsset('images/defaultNormalMap.png'),
    ]);

    this.load.image('flag-0', [
      loadAsset('images/flag-0.png'),
      loadAsset('images/defaultNormalMap.png'),
    ]);
    this.load.image('flag-1', [
      loadAsset('images/flag-1.png'),
      loadAsset('images/defaultNormalMap.png'),
    ]);
    this.load.spritesheet('sasha', loadAsset('images/sasha.png'), {
      frameWidth: 14,
      frameHeight: 17,
    });

    this.load.image('ammo', loadAsset('images/ammo.png'));
    this.load.image('money', loadAsset('images/money.png'));

    this.load.image('ammo-on', loadAsset('images/ammo-on.png'));
    this.load.image('boris-on', loadAsset('images/boris-on.png'));
    this.load.image('knife-on', loadAsset('images/knife-on.png'));
    this.load.image('molotov-on', loadAsset('images/molotov-on.png'));
    this.load.image('sasha-on', loadAsset('images/sasha-on.png'));
    this.load.image('vodka-on', loadAsset('images/vodka-on.png'));
    this.load.spritesheet('boris', loadAsset('images/boris.png'), {
      frameWidth: 21,
      frameHeight: 20,
    });
  }

  public preload(): void {
    if (!shouldSkipIntro()) {
      this.showLoadingAnimation();
    }

    this.loadAssets();
    this.loadCreditsAssets();
  }

  public create(): void {
    this.anims.create({
      key: 'ivan-walk',
      frames: this.anims.generateFrameNumbers('ivan', {
        start: 0,
        end: -1,
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'guy1-walk',
      // @ts-ignore
      frames: [{ key: 'guy1-0' }, { key: 'guy1-1' }],
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'sasha-walk',
      frames: this.anims.generateFrameNumbers('sasha', {
        start: 0,
        end: -1,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'flag-wave',
      // @ts-ignore
      frames: [{ key: 'flag-0' }, { key: 'flag-1' }],
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'boris-walk',
      frames: this.anims.generateFrameNumbers('boris', {
        start: 0,
        end: -1,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  public update(): void {
    if (shouldSkipIntro()) {
      this.changeScene();
      return;
    }

    if (!this.animStopped && this.timesLooped > 2) {
      this.playEndingAnimation();
    }
  }

  private showLoadingAnimation = () => {
    this.introImage = this.add.sprite(0, 0, 'intro', 11);
    this.introImage.setOrigin(0, 0);
    this.introImage.setDisplaySize(
      this.cameras.main.width,
      this.cameras.main.height
    );

    this.introImage.anims.play('intro-start');
    this.introImage.anims.chain('intro-loop');

    this.introImage.on(
      'animationrepeat',
      (animation: Phaser.Animations.Animation): void => {
        if (animation.key === 'intro-loop') {
          this.timesLooped += 1;
        }
      }
    );
  };

  private playEndingAnimation = () => {
    this.animStopped = true;
    this.introImage.anims.stop();
    this.introImage.anims.playReverse('intro-start');
    this.introImage.on('animationcomplete', this.changeScene);
  };

  private loadCreditsAssets = () => {
    this.load.image('credits_logo', loadAsset('images/credits/logo.png'));
    this.load.image(
      'credits_logo_hover',
      loadAsset('images/credits/logo_outline.png')
    );
    this.load.image(
      'credits_background',
      loadAsset('images/credits/gradient.png')
    );
    for (const { imageKey, imagePath } of TEAM) {
      this.load.image(imageKey, loadAsset(imagePath));
    }
  };

  private changeScene = () => {
    this.scene.start('GameScene');
  };
}
