import { Sound } from 'Sound';

export class IntroScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'IntroScene',
    });
  }

  public create() {
    const anim1 = this.add
      .sprite(1280 / 2, 720 / 2, 'intro1-frames')
      .setScale(5)
      .setDepth(100);

    const anim2 = this.add
      .sprite(1280 / 2, 720 / 2, 'intro1-frames')
      .setScale(26)
      .setDepth(100)
      .setVisible(false);

    const anim3 = this.add
      .sprite(1280 / 2, 720 / 2, 'intro1-frames')
      .setScale(5)
      .setDepth(100)
      .setVisible(false);

    const funk = this.sound.add(Sound.getDownOnIt);

    anim1.play('intro1');
    anim1.on('animationcomplete', () => {
      anim1.setVisible(false);
      anim2.setVisible(true);
      anim2.play('intro2');

      this.time.addEvent({
        delay: 3000,
        callback: () => {
          funk.play();
        },
      });

      anim2.on('animationcomplete', () => {
        anim2.setVisible(false);
        anim3.setVisible(true);
        anim3.play('intro3');

        anim3.on('animationcomplete', () => {
          funk.stop();
          this.scene.start('MainMenuScene');
        });
      });
    });
  }
}
