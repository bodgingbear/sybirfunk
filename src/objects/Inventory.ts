import { EventEmitter } from 'packages/utils';

export class Inventory extends EventEmitter<'change'> {
  accountBallance = 0;

  sashaCounter = 0;

  vodkaCounter = 0;

  ammo = 20;
}
