import { Commerade } from './Commerade';

export class CommeradesController {
  get enemiesYs(): number[] {
    return this.enemies.children.getArray().map((e) => e.y);
  }

  constructor(
    private commerades: Phaser.GameObjects.Group,
    private enemies: Phaser.GameObjects.Group
  ) {}

  update() {
    this.commerades.children.getArray().forEach((commerade) => {
      const intersects = this.commeradeBody(
        Math.floor(commerade.y)
      ).some((body) => this.enemiesYs.includes(body));
      if (intersects) {
        commerade.getData('ref').foundEnemy();
      }
    });
  }

  commeradeBody(point: number): number[] {
    return [point - 2, point - 1, point, point + 1, point + 2];
  }
}
