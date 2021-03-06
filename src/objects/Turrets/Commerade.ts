import { Bullet } from 'objects/Bullet';
import { Sound } from 'Sound';
import { Ally } from './Ally';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

const TOP = 350;
const BOTTOM = 635;

export class Commerade implements Ally {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  shootingEvent: Phaser.Time.TimerEvent | undefined;

  light: Phaser.GameObjects.Light;

  speed = getRandomInt(80) + 20;

  shootSound: Phaser.Sound.BaseSound;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private bullets: Phaser.GameObjects.Group,
    private state: 'searching' | 'shooting' = 'searching'
  ) {
    this.shootSound = this.scene.sound.add(Sound.mosinShoot, { volume: 0.35 });
    this.scene.sound.add(Sound.sashaDying);
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'master', 'sasha/sasha0000')
      .setScale(5);

    scene.physics.world.enable(this.sprite);

    this.sprite.anims.play('sasha-walk');

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setCollideWorldBounds(true);

    this.sprite.setData('ref', this);

    this.body.setVelocityY(this.speed);

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      135,
      0xffffff,
      0.1
    );
  }

  foundEnemy() {
    if (this.state === 'shooting') {
      return;
    }
    this.state = 'shooting';
    // @FIXME: Add Cooldown for initial shoot
    this.shoot(this.body.y);
    this.shootingEvent = this.scene.time.addEvent({
      delay: 4000,
      loop: true,
      callback: () => this.shoot(this.body.y),
    });
  }

  shoot = (y: number) => {
    this.shootSound.play();
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
    this.body.setVelocityY(getRandomInt(2) === 0 ? this.speed : -this.speed);
  }

  public gotHit() {
    this.scene.sound.play(Sound.sashaDying);
    this.light.intensity = 0;
    this.sprite.destroy();
    this.shootingEvent?.destroy();
  }

  update() {
    if (this.state !== 'searching') {
      this.body.setVelocityY(0);
    } else if (this.body.y <= TOP) {
      this.body.setVelocityY(this.speed);
    } else if (this.body.y >= BOTTOM) {
      this.body.setVelocityY(-this.speed);
    }

    this.light.setPosition(this.sprite.x, this.sprite.y);
  }
}
