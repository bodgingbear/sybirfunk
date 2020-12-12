export class CommeradesController {
  get enemiesYs(): number[] {
    return this.enemies.children
      .getArray()
      .map((e) => (e as Phaser.GameObjects.Sprite).y);
  }

  constructor(
    private commerades: Phaser.GameObjects.Group,
    private enemies: Phaser.GameObjects.Group,
    private physics: Phaser.Physics.Arcade.ArcadePhysics
  ) {
    this.physics.add.collider(
      this.enemies,
      this.commerades,
      (enemyObj, commeradeObj) => {
        enemyObj.getData('ref').onCommeradeTouch();
        commeradeObj.getData('ref').gotHit();
      }
    );
  }

  update() {
    this.commerades.children.getArray().forEach((commerade) => {
      const intersects = this.commeradeBody(
        Math.floor((commerade as Phaser.GameObjects.Sprite).y)
      ).some((body) => this.enemiesYs.includes(body));
      if (intersects) {
        commerade.getData('ref').foundEnemy();
      } else {
        commerade.getData('ref').finishShooting();
      }
    });
  }

  commeradeBody(point: number): number[] {
    return [point - 2, point - 1, point, point + 1, point + 2];
  }
}
