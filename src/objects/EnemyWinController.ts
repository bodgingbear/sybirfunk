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
        obj.destroy();
        this.emit('enemy-win');
      }
    });
  }
}
