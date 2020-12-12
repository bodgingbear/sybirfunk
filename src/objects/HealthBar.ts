export class HealthBar {
  health: number;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const bar = this.scene.add.rectangle(
      position.x,
      position.y,
      270,
      30,
      0xffffff
    );

    const barShrinking = this.scene.add.rectangle(
      position.x,
      position.y,
      265,
      25,
      0xff0000
    );

    this.health = 100;
  }

  update() {}
}
