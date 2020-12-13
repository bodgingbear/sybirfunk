/* eslint-disable no-nested-ternary */
import { EventEmitter } from 'packages/utils';
import { RegularEnemy } from '../Enemy/RegularEnemy';
import { BoomboxEnemy } from '../Enemy/BoomboxEnemy';
import { PriestEnemy } from '../Enemy/PriestEnemy';
import { Inventory } from '../Inventory';
import { levels } from './levels';

export class TourManager extends EventEmitter<'round-start' | 'round-end'> {
  private enemiesCount = 0;

  private levelId = 0;

  private text: Phaser.GameObjects.Text;

  constructor(
    private scene: Phaser.Scene,
    private enemies: Phaser.GameObjects.Group,
    private inventory: Inventory
  ) {
    super();

    this.text = this.scene.add
      .text(150, 680, '', { color: 'yellow' })
      .setOrigin(0.5, 1);
    this.onRoundStart();
  }

  public onEnemyFinished = () => {
    this.enemiesCount--;

    if (this.enemiesCount !== 0) {
      return;
    }
    this.levelId++;
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
    levels[this.levelId].forEach(({ time, position, type }) => {
      this.scene.time.addEvent({
        delay: time,
        callback: () => {
          const enemy =
            type === 'ordinary'
              ? new RegularEnemy(this.scene, position, this.inventory)
              : type === 'boombox'
              ? new BoomboxEnemy(this.scene, position, this.inventory)
              : new PriestEnemy(this.scene, position, this.inventory);

          this.enemies.add(enemy.sprite);
        },
      });
    });

    this.enemiesCount = levels[this.levelId].length;
  }
}
