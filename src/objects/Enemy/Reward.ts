export class Reward {
  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const reward = this.scene.add.text(
      position.x,
      position.y,
      `+10` // dać zamiast tego potem po prostu ikonkę rubli
    );
  }
}
