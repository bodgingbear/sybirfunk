export class Flag {
  constructor(scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    scene.add
      .sprite(position.x, position.y, 'master', 'flag/flag0000')
      .setScale(5)
      .setPipeline('Light2D')
      .anims.play('flag');
  }
}
