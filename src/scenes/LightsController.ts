export class LightsController {
  constructor(private scene: Phaser.Scene) {
    this.scene.lights.enable();
    this.scene.lights.setAmbientColor(0);

    const light = this.scene.lights.addLight(
      1270,
      720 / 2 + 200,
      600,
      0xff0000,
      0.5
    );
    const light2 = this.scene.lights.addLight(
      1270,
      720 / 2 - 100,
      400,
      0xff0000,
      0.5
    );

    this.scene.lights.addLight(1270 - 250, 720 / 2 - 30, 200, 0xffffff, 0.5);

    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1700,
      yoyo: true,
      repeat: -1,
      onUpdate(tween) {
        const value = tween.getValue();
        light.setIntensity(0.5 + value * 0.5);
        light.setRadius(400 + value * 200);

        light2.setIntensity(0.5 + value * 0.5);
        light2.setRadius(300 + value * 100);
      },
    });
  }
}
