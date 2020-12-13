import { EventEmitter } from 'packages/utils';

export class Inventory extends EventEmitter<'change'> {
  accountBalance: number = 1000;

  sashaCounter: number = 0;

  borisCounter: number = 0;

  vodkaCounter: number = 0;

  ammo: number = 20;

  increaseAccountBalance(amount: number) {
    this.accountBalance += amount;
    this.emit('change');
  }

  decreaseAccountBalance(amount: number) {
    this.accountBalance -= amount;
    this.emit('change');
  }

  increaseAmmo() {
    this.ammo += 10;
    this.emit('change');
  }

  buySasha() {
    if (this.sashaCounter < 3) {
      this.sashaCounter += 1;
      this.emit('change');
    }
  }

  buyBoris() {
    if (this.borisCounter < 2) {
      this.borisCounter += 1;
      this.emit('change');
    }
  }

  buyVodka() {
    if (this.vodkaCounter < 3) {
      this.vodkaCounter += 1;
      this.emit('change');
    }
  }

  drinkVodka() {
    this.vodkaCounter -= 1;
    this.emit('change');
  }

  useAmmo(number = 1) {
    this.ammo -= number;
    this.emit('change');
  }

  setAmmo(ammo: number) {
    this.ammo = ammo;
    this.emit('change');
  }
}
