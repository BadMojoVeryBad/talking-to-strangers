import { Node } from '@/framework/node';
import { clamp, normalise } from '@/framework/support/support';
import { CONST } from '@/support/constants';
import { FLAGS } from '@/support/flags';
import { ConversationNode } from './conversationNode';
import { NpcNode } from './npcNode';
import { PlayerNode } from './playerNode';
import { StrangerNpcNode } from './stangerNpcNode';
import { StrangerConversationNode } from './strangerConversationNode';

export class StrangerNode extends Node {
  protected player: PlayerNode;
  protected position: Phaser.Math.Vector2;
  protected interactionZone: Phaser.GameObjects.Rectangle;
  protected lines: string[] = [];
  private conversationEndTime = 0;
  protected npcColor = '';
  protected npcLines = '';
  protected sprite: Phaser.GameObjects.Sprite;
  protected particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  protected conversationNode: StrangerConversationNode;

  public init(data?: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }

    if (typeof data.lines === 'string') {
      this.lines = data.lines.split('\n');
    }

    if (typeof data.npcLines === 'string') {
      this.npcLines = data.npcLines;
    }

    if (typeof data.npcColor === 'string') {
      this.npcColor = data.npcColor;
    }

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.player = player;
    });
  }

  public create(): void {
    this.conversationNode = this.addNode(StrangerConversationNode, {
      lines: this.lines
    });

    this.sprite = this.scene.add.sprite(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'stranger1')
      .setDepth(90)
      .setVisible(false)
      .play('stranger');

    this.particles = this.scene.add.particles(CONST.TEXTURE_NAME, 'blackPixel');
    this.particles.setDepth(90);
    const emitter = this.particles.createEmitter({
      x: this.position.x,
      y: this.position.y,
      speed: { min: -60, max: 60 },
      quantity: 30,
      frequency: 10,
      lifespan: 600,
      alpha: { min: 0.25, max: 1 },
    });
    emitter.start();

    this.interactionZone = this.scene.add.rectangle(this.position.x, this.position.y, 4, 32, 0x000000);
    this.scene.physics.add.existing(this.interactionZone, true);
    this.interactionZone.setDepth(100).setVisible(false);

    this.addState('default', () => {
      this.sprite.setVisible(true);
      this.particles.setVisible(true);

      if (!this.conversationNode.isConversationComplete()) {
        const distance = Phaser.Math.Distance.BetweenPoints(this.player.getPlayer(), new Phaser.Math.Vector2(this.sprite.x, this.sprite.y));
        const intensity = clamp(normalise(distance, 0, 64), 0, 1);
        this.scene.events.emit('stranger.intensity', intensity);

        if (this.scene.physics.overlap(this.player.getPlayer(), this.interactionZone)) {
          return 'startConversation';
        }
      }
    });

    this.addState('startConversation', () => {
      this.conversationNode.startConversation();

      return 'inConversation';
    });

    this.addState('inConversation', (time) => {
      if (this.conversationNode.isConversationComplete()) {
        this.conversationEndTime = time;
        return 'conversationEnded';
      }
    });

    this.addState('conversationEnded', (time) => {
      FLAGS.PLAYER_CONTROLS_ENABLED = false;
      const distance = Phaser.Math.Distance.BetweenPoints(this.player.getPlayer(), this.position);
      const intensity = clamp(normalise(distance, 0, 64), 0, 1);
      this.scene.events.emit('stranger.intensity', intensity);

      if (this.conversationEndTime + 2000 < time) {
        return this.afterConversationEnd(time);
      }
    });

    this.addState('spawnNpc', () => {
      this.scene.events.emit('stranger.intensity', 0);
      this.spawnNpc();
      this.sprite.destroy();
      this.particles.destroy();
      return 'default';
    });
  }

  protected spawnNpc(): void {
    this.addNode(StrangerNpcNode, {
      x: this.interactionZone.body.position.x,
      y: this.position.y,
      player: this.player,
      lines: this.npcLines,
      color: this.npcColor,
    });
  }

  protected afterConversationEnd(time: number): string {
    return 'spawnNpc';
  }
}
