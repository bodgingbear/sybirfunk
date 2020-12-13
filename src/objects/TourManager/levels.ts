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

// HAJS AFTER 1: 70

const level2: Level = [
  { time: 200, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
  { time: 500, position: new Phaser.Math.Vector2(0, 460), type: 'ordinary' },
  { time: 700, position: new Phaser.Math.Vector2(0, 520), type: 'ordinary' },
  { time: 800, position: new Phaser.Math.Vector2(0, 420), type: 'ordinary' },
  { time: 4500, position: new Phaser.Math.Vector2(0, 600), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 600), type: 'boombox' },
  { time: 5500, position: new Phaser.Math.Vector2(0, 600), type: 'ordinary' },
];

// HAJS AFTER 2: 110

const level3: Level = [
  { time: 1500, position: new Phaser.Math.Vector2(0, 500), type: 'ordinary' },
  { time: 2000, position: new Phaser.Math.Vector2(0, 500), type: 'boombox' },
  { time: 2500, position: new Phaser.Math.Vector2(0, 500), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 460), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 520), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 580), type: 'ordinary' },
  { time: 8500, position: new Phaser.Math.Vector2(0, 600), type: 'ordinary' },
  { time: 9000, position: new Phaser.Math.Vector2(0, 600), type: 'boombox' },
  { time: 9500, position: new Phaser.Math.Vector2(0, 600), type: 'ordinary' },
];

// HAJS AFTER 3: 190

const level4: Level = [
  // BOOMBOX SQUAD 1
  { time: 1500, position: new Phaser.Math.Vector2(0, 400), type: 'priest' },
  { time: 2000, position: new Phaser.Math.Vector2(0, 400), type: 'boombox' },
  { time: 2500, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
  // BOOMBOX SQUAD 2
  { time: 1800, position: new Phaser.Math.Vector2(0, 500), type: 'priest' },
  { time: 2300, position: new Phaser.Math.Vector2(0, 500), type: 'boombox' },
  { time: 2800, position: new Phaser.Math.Vector2(0, 500), type: 'ordinary' },
  // ORDINARY SQUAD 1
  { time: 5000, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 460), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 520), type: 'ordinary' },
  { time: 5000, position: new Phaser.Math.Vector2(0, 580), type: 'ordinary' },
  // ORDINARY SQUAD 2
  { time: 6000, position: new Phaser.Math.Vector2(0, 410), type: 'ordinary' },
  { time: 6000, position: new Phaser.Math.Vector2(0, 420), type: 'ordinary' },
  { time: 6000, position: new Phaser.Math.Vector2(0, 490), type: 'ordinary' },
  { time: 6000, position: new Phaser.Math.Vector2(0, 550), type: 'ordinary' },
];

// HAJS AFTER 2: 180

const level5: Level = [
  // ORDINARY SQUAD 1
  { time: 700, position: new Phaser.Math.Vector2(0, 400), type: 'ordinary' },
  { time: 100, position: new Phaser.Math.Vector2(0, 460), type: 'ordinary' },
  { time: 500, position: new Phaser.Math.Vector2(0, 520), type: 'ordinary' },
  { time: 1000, position: new Phaser.Math.Vector2(0, 580), type: 'ordinary' },

  // ORDINARY SQUAD 2
  {
    time: 5000 + 2700,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 5000 + 2100,
    position: new Phaser.Math.Vector2(0, 460),
    type: 'ordinary',
  },
  {
    time: 5000 + 2500,
    position: new Phaser.Math.Vector2(0, 520),
    type: 'ordinary',
  },
  {
    time: 5000 + 2000,
    position: new Phaser.Math.Vector2(0, 580),
    type: 'ordinary',
  },

  {
    time: 5000 + 3800,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 5000 + 4300,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 5000 + 4800,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },

  {
    time: 5000 + 3800,
    position: new Phaser.Math.Vector2(0, 600),
    type: 'ordinary',
  },
  {
    time: 5000 + 4300,
    position: new Phaser.Math.Vector2(0, 600),
    type: 'ordinary',
  },
  {
    time: 5000 + 4800,
    position: new Phaser.Math.Vector2(0, 600),
    type: 'ordinary',
  },

  // BOOMBOX SQUAD 2
  {
    time: 5000 + 3800,
    position: new Phaser.Math.Vector2(0, 500),
    type: 'priest',
  },
  {
    time: 5000 + 4300,
    position: new Phaser.Math.Vector2(0, 500),
    type: 'boombox',
  },
  {
    time: 5000 + 4800,
    position: new Phaser.Math.Vector2(0, 500),
    type: 'ordinary',
  },

  {
    time: 11000,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 11000,
    position: new Phaser.Math.Vector2(0, 500),
    type: 'ordinary',
  },
  {
    time: 11000,
    position: new Phaser.Math.Vector2(0, 600),
    type: 'ordinary',
  },
  {
    time: 11700,
    position: new Phaser.Math.Vector2(0, 450),
    type: 'ordinary',
  },
  {
    time: 11700,
    position: new Phaser.Math.Vector2(0, 550),
    type: 'ordinary',
  },
  {
    time: 11700,
    position: new Phaser.Math.Vector2(0, 650),
    type: 'ordinary',
  },
];

// HAJS AFTER 5: 280

const level6: Level = [
  {
    time: 100,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 400,
    position: new Phaser.Math.Vector2(0, 380),
    type: 'boombox',
  },
  {
    time: 100,
    position: new Phaser.Math.Vector2(0, 420),
    type: 'ordinary',
  },
  {
    time: 600,
    position: new Phaser.Math.Vector2(0, 480),
    type: 'ordinary',
  },
  {
    time: 200,
    position: new Phaser.Math.Vector2(0, 520),
    type: 'ordinary',
  },
  {
    time: 600,
    position: new Phaser.Math.Vector2(0, 580),
    type: 'ordinary',
  },
  {
    time: 600,
    position: new Phaser.Math.Vector2(0, 620),
    type: 'ordinary',
  },

  {
    time: 5100,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 5400,
    position: new Phaser.Math.Vector2(0, 380),
    type: 'boombox',
  },
  {
    time: 5100,
    position: new Phaser.Math.Vector2(0, 420),
    type: 'priest',
  },
  {
    time: 5600,
    position: new Phaser.Math.Vector2(0, 480),
    type: 'ordinary',
  },
  {
    time: 5200,
    position: new Phaser.Math.Vector2(0, 520),
    type: 'boombox',
  },
  {
    time: 5600,
    position: new Phaser.Math.Vector2(0, 620),
    type: 'priest',
  },

  {
    time: 5600,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 5900,
    position: new Phaser.Math.Vector2(0, 380),
    type: 'ordinary',
  },
  {
    time: 6100,
    position: new Phaser.Math.Vector2(0, 420),
    type: 'boombox',
  },
  {
    time: 6300,
    position: new Phaser.Math.Vector2(0, 480),
    type: 'ordinary',
  },
  {
    time: 5400,
    position: new Phaser.Math.Vector2(0, 520),
    type: 'ordinary',
  },
  {
    time: 6400,
    position: new Phaser.Math.Vector2(0, 580),
    type: 'ordinary',
  },
  {
    time: 6600,
    position: new Phaser.Math.Vector2(0, 620),
    type: 'ordinary',
  },

  {
    time: 7100,
    position: new Phaser.Math.Vector2(0, 600),
    type: 'boombox',
  },
  {
    time: 6900,
    position: new Phaser.Math.Vector2(0, 380),
    type: 'ordinary',
  },
  {
    time: 6900,
    position: new Phaser.Math.Vector2(0, 420),
    type: 'ordinary',
  },
  {
    time: 6100,
    position: new Phaser.Math.Vector2(0, 480),
    type: 'ordinary',
  },
  {
    time: 8200,
    position: new Phaser.Math.Vector2(0, 520),
    type: 'ordinary',
  },
  {
    time: 8600,
    position: new Phaser.Math.Vector2(0, 580),
    type: 'ordinary',
  },
  {
    time: 6600,
    position: new Phaser.Math.Vector2(0, 620),
    type: 'ordinary',
  },

  {
    time: 11100,
    position: new Phaser.Math.Vector2(0, 400),
    type: 'ordinary',
  },
  {
    time: 10900,
    position: new Phaser.Math.Vector2(0, 380),
    type: 'ordinary',
  },
  {
    time: 10900,
    position: new Phaser.Math.Vector2(0, 420),
    type: 'ordinary',
  },
  {
    time: 9100,
    position: new Phaser.Math.Vector2(0, 480),
    type: 'ordinary',
  },
  {
    time: 10800,
    position: new Phaser.Math.Vector2(0, 520),
    type: 'ordinary',
  },
  {
    time: 10000,
    position: new Phaser.Math.Vector2(0, 580),
    type: 'boombox',
  },
  {
    time: 10600,
    position: new Phaser.Math.Vector2(0, 620),
    type: 'ordinary',
  },
];

export const levels = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level6,
  level6,
  level6,
  level6,
];
