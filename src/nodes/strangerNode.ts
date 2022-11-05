import { Node } from '@/framework/node';
import { clamp, normalise } from '@/framework/support/support';
import { CONST } from '@/support/constants';
import { PlayerNode } from './playerNode';

export class StrangerNode extends Node {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private position: Phaser.Math.Vector2;

  public init(data?: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }
  }

  public create(): void {
    const sprite = this.scene.add.sprite(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'stranger1');
    sprite.setDepth(90);
    sprite.play('stranger');

    const particles = this.scene.add.particles(CONST.TEXTURE_NAME, 'blackPixel');
    particles.setDepth(90);

    const emitter = particles.createEmitter({
      x: this.position.x,
      y: this.position.y,
      speed: { min: -60, max: 60 },
      quantity: 30,
      frequency: 10,
      lifespan: 600,
      alpha: { min: 0.25, max: 1 },
    });

    emitter.start();

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.player = player.getPlayer();
    });
  }

  public update(): void {
    const distance = Phaser.Math.Distance.BetweenPoints(this.player, this.position);
    const intensity = clamp(normalise(distance, 0, 64), 0, 1);
    this.scene.events.emit('stranger.intensity', intensity);
  }
}
