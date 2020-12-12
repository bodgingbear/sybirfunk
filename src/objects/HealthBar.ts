export class HealthBar {
  barShrinking: Phaser.GameObjects.Rectangle;

  hasCooledDown = true;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const bar = this.scene.add.rectangle(
      position.x,
      position.y,
      270,
      30,
      0xffffff
    );

    this.barShrinking = this.scene.add.rectangle(
      position.x - 130,
      position.y,
      260,
      25,
      0xff0000
    );

    this.barShrinking.setOrigin(0, 0.5);

    // this.health = 100;
  }

  shrink() {
    if (this.hasCooledDown === false) {
      return;
    }
    this.barShrinking.scaleX -= 0.1;
    this.barShrinking.scaleX = Math.max(this.barShrinking.scaleX, 0);

    this.hasCooledDown = false;

    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        this.hasCooledDown = true;
      },
    });
  }

  update() {}
}
