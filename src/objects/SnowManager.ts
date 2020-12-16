import { GameScene } from 'scenes/GameScene';

const MIN_SPEED = 30;

export class SnowManager {
  scene: GameScene;

  snow1: Phaser.GameObjects.Particles.ParticleEmitterManager;

  snow2: Phaser.GameObjects.Particles.ParticleEmitterManager;

  emitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

  constructor(scene: GameScene) {
    this.scene = scene;
    this.snow1 = this.scene.add
      .particles('master')
      .setDepth(2)
      .setPipeline('Light2D');
    this.snow2 = this.scene.add
      .particles('master')
      .setDepth(2)
      .setPipeline('Light2D');

    this.createEmitters(this.snow1);
    this.createEmitters(this.snow2);
    this.addSnow(200);
  }

  createEmitters(
    particle: Phaser.GameObjects.Particles.ParticleEmitterManager
  ) {
    const emitter = particle.createEmitter({
      x: { min: 0, max: 1280 },
      y: -1,
      speedX: -10,
      speedY: { min: MIN_SPEED, max: 40 },
      frequency: 200,
      frame: {
        frames: ['snowflakes/snowflakes0000', 'snowflakes/snowflakes0001'],
      },
    });
    emitter.setScale(2);
    emitter.setBlendMode(Phaser.BlendModes.ADD);
    emitter.setLifespan((720 / MIN_SPEED) * 1000);
    emitter.setAlpha(0.3);
    this.emitters.push(emitter);
  }

  addSnow(quantity: Number) {
    for (let index = 0; index < quantity; index++) {
      this.emitters[
        Math.round(Math.random() * (this.emitters.length - 1))
      ].emitParticleAt(Math.random() * 1600, Math.random() * 800);
    }
  }
}
