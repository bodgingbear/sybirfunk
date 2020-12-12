export class HealthBar {
  barShrinking: Phaser.GameObjects.Rectangle;

  hasCooledDown = true;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const bar = this.scene.add
      .sprite(position.x, position.y, 'health-bar')
      .setScale(5)
      .setDepth(11);

    this.barShrinking = this.scene.add.rectangle(
      bar.x - bar.displayWidth / 2,
      bar.y,
      bar.displayWidth,
      bar.displayHeight - 2,
      0xc20c0c
    );

    this.barShrinking.setOrigin(0, 0.5);
  }

  public shrink() {
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
