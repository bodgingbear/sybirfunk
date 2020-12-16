import { loadAsset } from 'packages/utils';
import { shouldSkipIntro } from 'packages/utils/shouldSkipIntro';
import { shouldSkipIntro2 } from 'packages/utils/shouldSkipIntro2';
import { Sound } from '../Sound';
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
    this.load.multiatlas('master', 'atlas/master.json', 'atlas');

    // Assets go here
    this.load.video(
      'demo',
      loadAsset('videos/demo.mp4'),
      'loadeddata',
      false,
      true
    );

    Object.values(Sound).forEach((value) => {
      this.load.audio(value, `audio/${value}.mp3`);
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
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'ivan/ivan',
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'ivan-drink',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 3,
        zeroPad: 4,
        prefix: 'ivan_shot/ivan_shot',
      }),
      frameRate: 3,
      repeat: 0,
      yoyo: true,
    });
    this.anims.create({
      key: 'guy1-walk',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'guy1/guy1',
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'guy2-walk',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'guy2/guy2',
      }),
      frameRate: 6,
      repeat: -1,
    });
    this.anims.create({
      key: 'pop-walk',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'pop/pop',
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'sasha-walk',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'sasha/sasha',
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'flag',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'flag/flag',
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'boris-walk',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 1,
        zeroPad: 4,
        prefix: 'boris/boris',
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'intro1',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 7,
        zeroPad: 4,
        prefix: 'intro1/intro1',
      }),
      frameRate: 2,
      repeat: 0,
    });

    this.anims.create({
      key: 'intro2',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 13,
        zeroPad: 4,
        prefix: 'intro2/intro2',
      }),
      frameRate: 2,
      repeat: 0,
    });

    this.anims.create({
      key: 'intro3',
      frames: this.anims.generateFrameNames('master', {
        start: 0,
        end: 22,
        zeroPad: 4,
        prefix: 'intro3/intro3',
      }),
      frameRate: 2,
      repeat: 0,
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
    if (!shouldSkipIntro2()) {
      this.scene.start('IntroScene');
    } else {
      this.scene.start('MainMenuScene');
    }
  };
}
