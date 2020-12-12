export class Reward {
  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const reward = this.scene.add.text(
      position.x,
      position.y,
      `+10` // dać zamiast tego potem po prostu ikonkę rubli
    );

    this.scene.tweens.add({
      targets: reward,
      x: reward.x + 50,
      y: reward.y - 50,
      alpha: 0,
      ease: 'Cubic',
      duration: 1000,
      delay: 0,
      repeat: 0,
      yoyo: false,
      onComplete: (): void => {
        reward.destroy();
      },
    });
  }
}
