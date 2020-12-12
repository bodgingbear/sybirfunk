export class Flag {
  constructor(scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    scene.add
      .sprite(position.x, position.y, 'flag-0')
      .setScale(5)
      .setPipeline('Light2D')
      .anims.play('flag-wave');
  }
}
