import { Ally } from './Ally';
import { Bullet, BULLET_VELOCITY } from '../Bullet';

const JOG_SPEED = -180;
const SPRINT_SPEED = -180;

export class Boris implements Ally {
  body: Phaser.Physics.Arcade.Body;

  sprite: Phaser.GameObjects.Sprite;

  light: Phaser.GameObjects.Light;

  leftWeaponShooting: Phaser.Time.TimerEvent | undefined;

  rightWeaponShooting: Phaser.Time.TimerEvent | undefined;

  constructor(
    private scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private bullets: Phaser.GameObjects.Group,
    private state: 'awaiting' | 'running' | 'shooting' | 'finish' = 'awaiting'
  ) {
    this.sprite = this.scene.add
      .sprite(position.x, position.y, 'boris')
      .setScale(5);

    scene.physics.world.enable(this.sprite);

    this.sprite.anims.play('boris-walk');
    this.sprite.setData('ref', this);

    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;

    this.body.setCollideWorldBounds(true);

    this.body.setImmovable(true);

    this.light = this.scene.lights.addLight(
      position.x,
      position.y,
      500,
      0xff0000,
      0.2
    );
  }

  activate(): void {
    this.state = 'running';
  }

  private startShooting(): void {
    this.state = 'shooting';
    this.leftWeaponShooting = this.scene.time.addEvent({
      delay: 150,
      loop: true,
      callback: () => this.shoot(this.body.y + 10, true),
    });
    this.rightWeaponShooting = this.scene.time.addEvent({
      delay: 150,
      loop: true,
      callback: () => this.shoot(this.body.y - 10),
    });

    this.scene.tweens
      .addCounter({
        from: 0,
        to: 1,
        duration: 1500,
        onUpdate: (tween) => {
          this.sprite.angle = -30 * tween.getValue();
        },
      })
      .on('complete', () => {
        this.scene.tweens
          .addCounter({
            from: 0,
            to: 1,
            duration: 3000,
            onUpdate: (tween) => {
              this.sprite.angle = -30 + 60 * tween.getValue();
            },
          })
          .on('complete', () => {
            this.scene.tweens
              .addCounter({
                from: 0,
                to: 1,
                duration: 1500,
                onUpdate: (tween) => {
                  this.sprite.angle = 30 - 30 * tween.getValue();
                },
              })
              .on('complete', () => {
                this.sprite.flipX = false;
                this.leftWeaponShooting?.destroy();
                this.rightWeaponShooting?.destroy();
                this.state = 'finish';
              });
          });
      });
  }

  private shoot = (y: number, hideLight = true) => {
    const vel = new Phaser.Math.Vector2(BULLET_VELOCITY, 0).rotate(
      this.sprite.rotation
    );

    this.bullets.add(
      new Bullet(
        this.scene,
        new Phaser.Math.Vector2(this.body.position.x, y).add(
          new Phaser.Math.Vector2(-10, 37)
        ),
        vel.x,
        vel.y,
        1,
        { hideLight, lightIntensityMultiplier: 2 }
      ).sprite
    );
  };

  gotHit(): void {
    throw new Error('Method not implemented.');
  }

  foundEnemy(): void {
    throw new Error('Method not implemented.');
  }

  finishShooting(): void {
    throw new Error('Method not implemented.');
  }

  update() {
    this.bullets?.getChildren().forEach((b) => b.getData('ref').update());

    switch (this.state) {
      case 'awaiting':
        break;
      case 'running':
        if (this.body.x > 900) {
          this.body.setVelocityX(JOG_SPEED);
        } else if (this.body.x === 525) {
          this.startShooting();
          this.body.setVelocity(0);
        } else {
          this.body.setVelocityX(SPRINT_SPEED);
          this.body.setVelocityY(JOG_SPEED * 0.3);
        }
        break;
      case 'shooting':
        break;
      case 'finish':
        if (this.body.x === 1095) {
          this.sprite.destroy();
          this.body.setVelocity(0);
        }
        if (this.body.x < 900) {
          this.body.setVelocityX(-JOG_SPEED);
        } else {
          this.body.setVelocityX(-SPRINT_SPEED);
          this.body.setVelocityY(-JOG_SPEED);
        }
        break;
      default:
        console.warn(`Unexpected type on state ${this.state}`);
        break;
    }
    this.light.setPosition(this.sprite.x, this.sprite.y);
  }
}
