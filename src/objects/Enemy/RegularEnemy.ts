import { Inventory } from 'objects/Inventory';
import { AbstractEnemy } from './AbstractEnemy';

export class RegularEnemy extends AbstractEnemy {
  constructor(
    scene: Phaser.Scene,
    position: Phaser.Math.Vector2,
    inventory: Inventory
  ) {
    super(scene, position, inventory, 'guy1');
  }
}
