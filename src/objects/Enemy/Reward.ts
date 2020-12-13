export class Reward {
  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    amount: number
  ) {
    const reward = this.scene.add.text(position.x, position.y, `+${amount}`);

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
