/* eslint-disable no-nested-ternary */
import { EventEmitter } from 'packages/utils';
import { RegularEnemy } from '../Enemy/RegularEnemy';
import { BoomboxEnemy } from '../Enemy/BoomboxEnemy';
import { PriestEnemy } from '../Enemy/PriestEnemy';
import { Inventory } from '../Inventory';
import { levels } from './levels';

const BUY_TIME = process.env.BALANCING_MODE === 'true' ? 30 : 5;

export class TourManager extends EventEmitter<'round-start' | 'round-end'> {
  private enemiesCount = 0;

  private levelId = 0;

  private text: Phaser.GameObjects.Text;

  private startText: Phaser.GameObjects.Text;

  private waitEvent: Phaser.Time.TimerEvent | undefined;

  constructor(
    private scene: Phaser.Scene,
    private enemies: Phaser.GameObjects.Group,
    private inventory: Inventory
  ) {
    super();

    this.text = this.scene.add
      .text(150, 680, '', { color: 'yellow' })
      .setOrigin(0.5, 1);

    this.startText = this.scene.add
      .text(480, 680, '', { color: 'yellow' })
      .setOrigin(0.5, 1);
    this.onRoundStart();

    this.scene.input.keyboard.on('keydown-S', () => {
      if (this.waitEvent) {
        this.waitEvent.destroy();
        this.onRoundStart();
      }
    });
  }

  public onEnemyFinished = () => {
    this.enemiesCount--;

    if (this.enemiesCount !== 0) {
      return;
    }
    this.levelId++;
    this.emit('round-end');

    let timeLeft = BUY_TIME;
    this.showTimeLeft(timeLeft);
    this.waitEvent = this.scene.time.addEvent({
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
    this.waitEvent = undefined;
    this.text.setText('');
    this.startText.setText('');
    this.emit('round-start');
    this.spawnEnemies();
  }

  private showTimeLeft(timeLeft: number) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    this.text.setText(`0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    this.startText.setText("Press 'S' to start the round.");
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
