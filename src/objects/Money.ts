export class Money {
  rubles = 1000;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const money = this.scene.add.text(
      position.x,
      position.y,
      `${this.rubles} рб`
    );
  }

  update() {}
}
