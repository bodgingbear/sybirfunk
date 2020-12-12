import { Enemy } from 'objects/Enemy';
import { Bullet } from 'objects/Bullet';

const SPEED = 100;
const TOP = 0;
const BOTTOM = 200;

export class Commerade {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  sprite: Phaser.GameObjects.Sprite;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private bullets: Phaser.GameObjects.Group,
    private state: 'searching' | 'shooting' = 'searching'
  ) {
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'sasha')
      .setScale(5);

    scene.physics.world.enable(this.sprite);

    this.sprite.anims.play('sasha-walk');

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setImmovable(true);
    this.position = position;

    this.sprite.setData('ref', this);

    this.body.setVelocityY(SPEED);
  }

  foundEnemy() {
    if (this.state === 'shooting') {
      return;
    }
    this.state = 'shooting';
    this.scene.time.addEvent({
      delay: 1200,
      loop: true,
      callback: () => this.shoot(this.body.y),
    });
  }

  shoot = (y: number) => {
    this.bullets.add(
      new Bullet(
        this.scene,
        new Phaser.Math.Vector2(this.body.position.x, y).add(
          new Phaser.Math.Vector2(-10, 37)
        )
      ).sprite
    );
  };

  update() {
    if (this.state !== 'searching') {
      this.body.setVelocityY(0);
    } else if (this.body.y <= TOP) {
      this.body.setVelocityY(SPEED);
    } else if (this.body.y >= BOTTOM) {
      this.body.setVelocityY(-SPEED);
    }
  }
}
