import { EventEmitter } from 'packages/utils';
import { AbstractEnemy } from './Enemy/AbstractEnemy';

type EventHandlers = {
  'enemy-win': (enemy: AbstractEnemy) => void;
};

export class EnemyWinController extends EventEmitter<
  'enemy-win',
  EventHandlers
> {
  constructor(
    private scene: Phaser.Scene,
    private enemies: Phaser.GameObjects.Group
  ) {
    super();
  }

  public update() {
    this.enemies.children.getArray().forEach((obj) => {
      if ((obj as Phaser.GameObjects.Sprite).x > 1280) {
        const enemy = obj.getData('ref');
        enemy.onWin();
        this.emit('enemy-win', enemy);
      }
    });
  }
}
