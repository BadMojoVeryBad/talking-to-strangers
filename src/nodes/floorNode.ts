import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';
import { PlayerNode } from './playerNode';

export class FloorNode extends Node {
  private position: Phaser.Math.Vector2;

  private size: Phaser.Math.Vector2;

  private emitter: Phaser.GameObjects.Particles.ParticleEmitter;

  public init(data?: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }

    if (typeof data.width === 'number' && typeof data.height === 'number') {
      this.size = new Phaser.Math.Vector2(data.width, data.height);
    }
  }

  public create(): void {
    const rectangle = this.scene.add.rectangle(this.position.x, this.position.y, this.size.x, this.size.y, 0x000000);
    rectangle.setDepth(100);
    this.scene.physics.add.existing(rectangle, true);

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.scene.physics.add.collider(player.getPlayer(), rectangle);
    });

    this.scene.events.on('npc.created', (npc: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
      this.scene.physics.add.collider(npc, rectangle);
    });

    const particles = this.scene.add.particles(CONST.TEXTURE_NAME, 'blackPixel');
    particles.setDepth(40);

    this.emitter = particles.createEmitter({
      x: 0,
      y: 0,
      speedX: { min: -60, max: 60 },
      speedY: { min: -75, max: -75 },
      gravityY: 400,
      quantity: 10,
      frequency: 10,
      lifespan: 3000,
      alpha: 0.35,
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(64 - 512, 96, 128, 1),
        quantity: 250,
        stepRate: 0,
        yoyo: false,
        seamless: true
      }
    });

    this.emitter.start();
  }

  public created(): void {
    this.scene.events.emit('floor.created', 1024);
  }

  public update(): void {
    this.emitter.setEmitZone({
      type: 'random',
      source: new Phaser.Geom.Rectangle(this.scene.cameras.main.scrollX, this.position.y - (this.size.y / 2), 128, 1),
      quantity: 1000,
      stepRate: 0,
      yoyo: false,
      seamless: true
    });
  }
}
