import { Enemy } from 'objects/Enemy';

const HEIGHT = 60;
const WIDTH = 30;
const SPEED = 100;

const TOP = 0;
const BOTTOM = 200;

export class Commerade {
  body: Phaser.Physics.Arcade.Body;

  position: Phaser.Math.Vector2;

  sprite: Phaser.GameObjects.GameObject;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private state: 'searching' | 'shooting' = 'searching'
  ) {
    this.sprite = this.scene.add.rectangle(
      position.x,
      position.y,
      WIDTH,
      HEIGHT,
      0xdfdfdf
    );

    scene.physics.world.enable(this.sprite);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setImmovable(true);
    this.position = position;

    this.sprite.setData('ref', this);

    this.body.setVelocityY(SPEED);
  }

  foundEnemy() {
    this.state = 'shooting';
  }

  update() {
    if (this.state !== 'searching') {
      this.body.setVelocityY(0);
      return;
    }

    if (this.body.y <= TOP) {
      this.body.setVelocityY(SPEED);
    } else if (this.body.y >= BOTTOM) {
      this.body.setVelocityY(-SPEED);
    }
  }
}
