import { Bullet } from 'objects/Bullet';
import { Ally } from './Ally';

const SPEED = 100;
const TOP = 350;
const BOTTOM = 635;

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export class Commerade implements Ally {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  shootingEvent: Phaser.Time.TimerEvent | undefined;

  light: Phaser.GameObjects.Light;

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
    this.body.setCollideWorldBounds(true);

    this.sprite.setData('ref', this);

    this.body.setVelocityY(SPEED);

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      135,
      0xffffff,
      0.4
    );
  }

  foundEnemy() {
    if (this.state === 'shooting') {
      return;
    }
    this.state = 'shooting';
    this.shootingEvent = this.scene.time.addEvent({
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
        ),
        undefined,
        undefined,
        2
      ).sprite
    );
  };

  finishShooting() {
    if (this.state === 'searching') {
      return;
    }

    this.state = 'searching';
    this.shootingEvent?.destroy();
    this.body.setVelocityY(getRandomInt(2) === 0 ? SPEED : -SPEED);
  }

  public gotHit() {
    this.light.intensity = 0;
    this.sprite.destroy();
    this.shootingEvent?.destroy();
  }

  update() {
    if (this.state !== 'searching') {
      this.body.setVelocityY(0);
    } else if (this.body.y <= TOP) {
      this.body.setVelocityY(SPEED);
    } else if (this.body.y >= BOTTOM) {
      this.body.setVelocityY(-SPEED);
    }

    this.light.setPosition(this.sprite.x, this.sprite.y);
  }
}
