type Level = {
  time: number;
  position: Phaser.Math.Vector2;
  type: 'ordinary' | 'priest' | 'boombox';
}[];

const level1: Level = [
  { time: 1500, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
  { time: 2000, position: new Phaser.Math.Vector2(0, 400), type: 'boombox' },
  { time: 2500, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
];

export const levels = [level1];
