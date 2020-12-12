export class GameScene extends Phaser.Scene {
  public constructor() {
    super({
      key: 'GameScene',
    });
  }

  public create(): void {
    this.lights.enable();
    this.lights.setAmbientColor(0);

    const bg = this.add.image(1270 / 2, 720 / 2, 'bg').setPipeline('Light2D');
    bg.setScale(1270 / bg.width);
    this.lights.addLight(1280 / 2 + 400, 720 / 2 - 100, 400, 0xff0000);
    this.lights
      .addLight(1280 / 2 + 50, 720 / 2 + 100, 600, 0x111111)
      .setIntensity(2);
  }
}
