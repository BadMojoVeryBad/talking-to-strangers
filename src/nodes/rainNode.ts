import { Node } from "@/framework/node";
import { CONST } from "@/support/constants";
import { injectable } from "inversify";

@injectable()
export class RainNode extends Node {
  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  public create() {
    const particles = this.scene.add.particles(CONST.TEXTURE_NAME, 'rain');
    particles.setDepth(400);

    this.emitter = particles.createEmitter({
      x: 64,
      y: 64,
      speedX: { min: -60, max: -60 },
      speedY: { min: 200, max: 400 },
      gravityY: 0,
      quantity: 20,
      frequency: 10,
      lifespan: 3000,
      alpha: 0.25,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-128, -96, 256, 32),
        quantity: 1000,
        stepRate: 0,
        yoyo: false,
        seamless: true
      }
    });

    this.emitter.start();
  }

  update(): void {
    this.emitter.setEmitZone({
      type: 'random',
      source: new Phaser.Geom.Rectangle(this.scene.cameras.main.scrollX - 128, this.scene.cameras.main.scrollY - 96, 256, 32),
      quantity: 1000,
      stepRate: 0,
      yoyo: false,
      seamless: true
    });
  }
}
