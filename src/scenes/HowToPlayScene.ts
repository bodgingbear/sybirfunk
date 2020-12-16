import { TextButton } from 'packages/text-button';
import { centerElement } from 'packages/utils';

export class HowToPlayScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'HowToPlayScene',
    });
  }

  public create(): void {
    const { width: DISPLAY_WIDTH, height: DISPLAY_HEIGHT } = this.cameras.main;

    const background = this.add.sprite(
      DISPLAY_WIDTH / 2,
      DISPLAY_HEIGHT / 2,
      'credits_background'
    );
    background.setDisplaySize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

    const howToPlayButton = new TextButton(this, 32, 720 - 32, 'Back', {
      originX: 0,
      originY: 1,
    });

    howToPlayButton.on('click', () => this.scene.start('MainMenuScene'));
    const text = this.add.text(
      1280 / 2,
      720 / 2,
      [
        'Use ARROWS to move',
        'Press SPACE to shoot',
        'Buy things with 1,2,3,4',
        'Make Boris shoot with Q',
        'Drink vodka with D',
      ],
      {
        color: 'white',
        fontSize: 32,
        align: 'center',
        lineSpacing: 16,
      }
    );
    centerElement(text);
  }
}
