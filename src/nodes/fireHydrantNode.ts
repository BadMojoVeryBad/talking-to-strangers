import { CONST } from "@/support/constants";
import { InteractableImageNode } from "./interactableImageNode";

export class FireHydrantNode extends InteractableImageNode {
  private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  private isEmitting = false;

  public create(): void {
    super.create();

    this.particles = this.scene.add.particles(CONST.TEXTURE_NAME, 'blackPixel')
      .setDepth(90);

    this.emitter = this.particles.createEmitter({
      x: this.position.x,
      y: this.position.y,
      speed: { min: -60, max: 60 },
      angle: { min: 240, max: 300 },
      quantity: 15,
      frequency: 10,
      lifespan: 600,
      gravityY: 128,
      alpha: { min: 0.25, max: 1 },
    });
    this.emitter.stop();
  }

  protected doAction() {
    this.isEmitting = !this.isEmitting;
    (this.isEmitting) ? this.emitter.start() : this.emitter.stop();
  }

  protected isActionComplete() {
    return true;
  }
}
