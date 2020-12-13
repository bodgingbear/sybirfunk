// przekazac wszystkich enemies i sprawdzać czy są w
// ANIMACJA DO ZROBIENIA

// import { Enemy } from 'objects/Enemy/Enemy';

export class Knife {
  constructor(
    scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    private enemies: Phaser.GameObjects.Group
  ) {}

  //   attack = () => {
  //     this.enemies.children
  //       .getArray()
  //       .forEach((sprite) => {
  //          if((sprite as Phaser.GameObjects.Sprite).x // is close to player) {
  //              // kill
  //          }
  //       });

  //     Enemy.sprite.destroy();
  //     console.log('dupa');
  //   };
}
