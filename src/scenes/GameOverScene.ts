export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene',
    });
  }

  public create() {
    this.add
      .text(1280 / 2, 720 / 2, 'Game Over', {
        color: '#ffffff',
        fontSize: 100,
      })
      .setOrigin(0.5, 0.5);
  }
}
