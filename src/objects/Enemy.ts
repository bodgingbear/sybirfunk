const ENEMY_VELOCITY = 110;

export class Enemy {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  sprite: Phaser.GameObjects.GameObject;

  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    this.sprite = this.scene.add.rectangle(
      position.x,
      position.y,
      30,
      60,
      0x00ff00
    );
    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.position = position;

    this.body.velocity.x = ENEMY_VELOCITY;
  }

  update() {}
}
