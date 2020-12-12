export class LightsController {
  alarmTween: Phaser.Tweens.Tween | undefined;

  alarmLights: Phaser.GameObjects.Light[];

  constructor(private scene: Phaser.Scene) {
    this.scene.lights.enable();
    this.scene.lights.setAmbientColor(0);

    const light = this.scene.lights.addLight(
      1270,
      720 / 2 + 200,
      600,
      0xff0000,
      0.75
    );
    const light2 = this.scene.lights.addLight(
      1270,
      720 / 2 - 100,
      400,
      0xff0000,
      0.75
    );

    this.alarmLights = [light, light2];

    this.scene.lights.addLight(1280 - 100, 100, 1280, 0xffffff, 1.25);
    const moon = this.scene.add
      .sprite(1280 - 100, 100, 'moon')
      .setScale(5)
      .setDepth(10);
    this.scene.lights.addLight(moon.x, moon.y, 1280, 0xffffff, 1.25);
  }

  startAlarm() {
    this.alarmTween = this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 1700,
      yoyo: true,
      repeat: -1,
      onUpdate: (tween) => {
        const value = tween.getValue();
        this.alarmLights[0].setIntensity(0.5 + value * 0.5);
        this.alarmLights[0].setRadius(400 + value * 200);

        this.alarmLights[1].setIntensity(0.5 + value * 0.5);
        this.alarmLights[1].setRadius(300 + value * 100);
      },
    });
  }

  stopAlarm = () => {
    this.alarmTween?.stop();
    this.alarmLights[0].setIntensity(0);
    this.alarmLights[1].setIntensity(0);
  };
}
