import { EventEmitter } from 'packages/utils';
import { Enemy } from './Enemy/Enemy';

export class TourManager extends EventEmitter<'round-start' | 'round-end'> {
  private enemiesCount = 0;

  private text: Phaser.GameObjects.Text;

  constructor(
    private scene: Phaser.Scene,
    private enemies: Phaser.GameObjects.Group
  ) {
    super();

    this.text = this.scene.add.text(1280 - 100, 50, '');
    this.spawnEnemies();
  }

  public onEnemyKill = () => {
    this.enemiesCount--;

    if (this.enemiesCount !== 0) {
      return;
    }
    this.emit('round-end');

    let timeLeft = 5;
    this.showTimeLeft(timeLeft);
    this.scene.time.addEvent({
      delay: 1000,
      repeat: timeLeft - 1,
      callback: () => {
        timeLeft--;
        this.showTimeLeft(timeLeft);

        if (timeLeft === 0) {
          this.onRoundStart();
        }
      },
    });
  };

  private onRoundStart() {
    this.text.setText('');
    this.emit('round-start');
    this.spawnEnemies();
  }

  private showTimeLeft(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    this.text.setText(`0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
  }

  private spawnEnemies() {
    this.enemies.add(
      new Enemy(this.scene, new Phaser.Math.Vector2(0, 400)).sprite
    );
    this.enemies.add(
      new Enemy(this.scene, new Phaser.Math.Vector2(50, 400)).sprite
    );
    this.enemies.add(
      new Enemy(this.scene, new Phaser.Math.Vector2(-100, 500)).sprite
    );
    this.enemiesCount = 3;
  }
}
