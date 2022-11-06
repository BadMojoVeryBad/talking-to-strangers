import { Node } from '@/framework/node';
import { clamp, normalise } from '@/framework/support/support';
import { CONST } from '@/support/constants';
import { FLAGS } from '@/support/flags';
import { NpcNode } from './npcNode';
import { PlayerNode } from './playerNode';
import { StrangerNpcNode } from './stangerNpcNode';
import { StrangerConversationNode } from './strangerConversationNode';

export class StrangerNode extends Node {
  private player: PlayerNode;
  private position: Phaser.Math.Vector2;
  private interactionZone: Phaser.GameObjects.Rectangle;
  private lines: string[] = [];
  private conversationEndTime = 0;
  private npcColor = '';
  private npcLines = '';

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
    const conversationNode = this.addNode(StrangerConversationNode, {
      lines: this.lines
    });

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

    this.interactionZone = this.scene.add.rectangle(this.position.x, this.position.y, 2, 32, 0x000000);
    this.scene.physics.add.existing(this.interactionZone, true);
    this.interactionZone.setDepth(100).setVisible(false);

    this.addState('default', () => {
      if (!conversationNode.isConversationComplete()) {
        const distance = Phaser.Math.Distance.BetweenPoints(this.player.getPlayer(), this.position);
        const intensity = clamp(normalise(distance, 0, 64), 0, 1);
        this.scene.events.emit('stranger.intensity', intensity);

        if (this.scene.physics.overlap(this.player.getPlayer(), this.interactionZone)) {
          return 'startConversation';
        }
      }
    });

    this.addState('startConversation', () => {
      conversationNode.startConversation();

      return 'inConversation';
    });

    this.addState('inConversation', (time) => {
      if (conversationNode.isConversationComplete()) {
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
        return 'spawnNpc';
      }
    });

    this.addState('spawnNpc', () => {
      this.scene.events.emit('stranger.intensity', 0);
      this.addNode(StrangerNpcNode, {
        x: this.position.x,
        y: this.position.y,
        player: this.player,
        lines: this.npcLines,
        color: this.npcColor,
      });
      sprite.destroy();
      particles.destroy();
      return 'default';
    });
  }
}
