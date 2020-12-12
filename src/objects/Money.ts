export class Money {
  rubles = 1000;

  text: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    this.text = this.scene.add.text(
      position.x,
      position.y,
      `${this.rubles} rb` // dać zamiast tego potem po prostu ikonkę rubli
    );
  }

  public onHit() {
    this.rubles += 10;
    this.text.setText(`${this.rubles} rb`);
  }

  update() {}
}
