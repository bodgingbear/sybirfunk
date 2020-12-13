import { EventEmitter } from 'packages/utils';

export class EnemyWinController extends EventEmitter<'enemy-win'> {
  constructor(
    private scene: Phaser.Scene,
    private enemies: Phaser.GameObjects.Group
  ) {
    super();
  }

  public update() {
    this.enemies.children.getArray().forEach((obj) => {
      if ((obj as Phaser.GameObjects.Sprite).x > 1280) {
        obj.getData('ref').onWin();
        this.emit('enemy-win');
      }
    });
  }
}
