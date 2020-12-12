export class Flag {
  constructor(scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    scene.add
      .sprite(position.x, position.y, 'flag')
      .setScale(5)
      .anims.play('flag-wave');
  }
}
