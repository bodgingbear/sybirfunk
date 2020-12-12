import { GameScene } from 'scenes/GameScene';

export class SnowManager {
  scene: GameScene;

  snow1: Phaser.GameObjects.Particles.ParticleEmitterManager;

  snow2: Phaser.GameObjects.Particles.ParticleEmitterManager;

  emitters: Phaser.GameObjects.Particles.ParticleEmitter[] = [];

  constructor(scene: GameScene) {
    this.scene = scene;
    this.snow1 = this.scene.add.particles('snow1');
    this.snow2 = this.scene.add.particles('snow2');

    this.createEmitters(this.snow1);
    this.createEmitters(this.snow2);
    this.addSnow(100);
  }

  createEmitters(
    particle: Phaser.GameObjects.Particles.ParticleEmitterManager
  ) {
    const emitter = particle.createEmitter({
      x: { min: 0, max: 1280 },
      y: -1,
      speedX: -10,
      speedY: { min: 30, max: 40 },
      frequency: 200,
    });
    emitter.setScale(2);
    emitter.setBlendMode(Phaser.BlendModes.ADD);
    emitter.setLifespan(Infinity);
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
