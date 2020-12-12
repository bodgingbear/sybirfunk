const CORPSE_VELOCITY = 500;

export class FlyingCorpse {
  constructor(private scene: Phaser.Scene, position: Phaser.Math.Vector2) {
    const parts = Array.from(Array(4)).map(() => {
      const sprite = this.scene.add.rectangle(
        position.x,
        position.y,
        20,
        20,
        0x00ff00
      );
      this.scene.physics.world.enable(sprite);
      return sprite;
    });

    parts[0].body.velocity.x = -CORPSE_VELOCITY * 1.2;
    parts[1].body.velocity.x = -CORPSE_VELOCITY * 1.5;
    parts[2].body.velocity.x = -CORPSE_VELOCITY * 2;
    parts[3].body.velocity.x = -CORPSE_VELOCITY * 3;

    parts[0].body.velocity.y = -CORPSE_VELOCITY * 0.3;
    parts[1].body.velocity.y = -CORPSE_VELOCITY * 0.1;
    parts[2].body.velocity.y = CORPSE_VELOCITY * 0.5;
    parts[3].body.velocity.y = CORPSE_VELOCITY * 0.05;
  }
}
