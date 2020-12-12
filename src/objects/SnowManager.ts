import { GameScene } from 'scenes/GameScene';

export class SnowManager {
  scene: GameScene;

  snow1: Phaser.GameObjects.Particles.ParticleEmitterManager;

  snow2: Phaser.GameObjects.Particles.ParticleEmitterManager;

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
    emitter.setLifespan(Infinity);
    emitter.setAlpha(0.3);
  }

  addSnow(quantity: Number) {
    Array.from(Array(quantity)).forEach(() => {
      const particle1 = this.scene.add
        .sprite(Math.random() * 1600, Math.random() * 800, 'snow1')
        .setScale(2)
        .setAlpha(0.3);
      const particle2 = this.scene.add
        .sprite(Math.random() * 1600, Math.random() * 800, 'snow2')
        .setScale(2)
        .setAlpha(0.3);
      this.scene.physics.world.enable(particle1);
      particle1.body.velocity.x = -10;
      particle1.body.velocity.y = Math.random() * 10 + 30;

      this.scene.physics.world.enable(particle2);
      particle2.body.velocity.x = -10;
      particle2.body.velocity.y = Math.random() * 10 + 30;
    });
  }
}
