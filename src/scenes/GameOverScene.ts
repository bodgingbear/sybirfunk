export class GameOverScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScene',
    });
  }

  public create() {
    this.add
      .text(1280 / 2, 720 / 2 - 60, 'Game Over', {
        color: '#ffffff',
        fontSize: 100,
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(1280 / 2, 720 / 2 + 60, 'Press any key to restart', {
        color: '#cccccc',
        fontSize: 20,
      })
      .setOrigin(0.5, 0.5);

    this.input.keyboard.on('keydown', () => {
      this.scene.start('GameScene');
    });
  }
}
