import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';
import { FLAGS } from '@/support/flags';
import { ConversationNode } from './conversationNode';
import { PlayerNode } from './playerNode';

export class NpcNode extends Node {
  private position = new Phaser.Math.Vector2(0, 0);
  private npc: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private arrow: Phaser.GameObjects.Sprite;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private interactionZone: Phaser.GameObjects.Rectangle;
  protected moveTarget: number;
  private lastMove = 0;
  protected conversationNode: ConversationNode;
  protected lastActivatedTime = 0;
  private lines: string[] = [];
  private color: string = '';

  protected defaultState = 'idle';

  public init(data: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }

    if (typeof data.lines === 'string') {
      this.lines = data.lines.split('\n');
    }

    if (typeof data.color === 'string') {
      this.color = data.color;
    }

    if (data.player instanceof PlayerNode) {
      this.player = data.player.getPlayer();
    }
  }

  public create(): void {
    this.npc = this.scene.physics.add.sprite(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'cat' + this.color + 'Idle1');
    this.npc.setDepth(99);

    this.arrow = this.scene.add.sprite(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'conversationArrow');
    this.arrow.setDepth(99);
    this.arrow.anims.play('arrow');

    this.interactionZone = this.scene.add.rectangle(this.position.x, this.position.y, 32, 32, 0x000000);
    this.scene.physics.add.existing(this.interactionZone, true);
    this.interactionZone.setDepth(100).setVisible(false);

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.player = player.getPlayer();
    });

    this.conversationNode = this.addNode(ConversationNode, {
      lines: this.lines
    }) as ConversationNode;

    this.addState('idle', (time: number) => {
      this.updateObjectPositions();
      this.npc.anims.play('cat' + this.color + 'Idle', true);

      if (this.scene.physics.overlap(this.player, this.interactionZone) && this.controls.isActive(CONST.CONTROL_ACTIVATE) && this.lastActivatedTime + 300 < time) {
        FLAGS.PLAYER_CONTROLS_ENABLED = false;
        return 'moveToPlayer';
      }

      if (this.lastMove + 3000 < time) {
        this.moveTarget = this.generateMoveTarget();
        return 'moveToTarget';
      }

      this.npc.setVelocityX(0);
    });

    this.addState('moveToTarget', (time: number) => {
      this.updateObjectPositions();
      this.npc.anims.play('cat' + this.color + 'Running', true);

      if (this.scene.physics.overlap(this.player, this.interactionZone) && this.controls.isActive(CONST.CONTROL_ACTIVATE) && this.lastActivatedTime + 300 < time) {
        FLAGS.PLAYER_CONTROLS_ENABLED = false;
        return 'moveToPlayer';
      }

      (this.velocityDirection(this.moveTarget) > 0) ? this.moveRight() : this.moveLeft();

      if (Math.abs(this.moveTarget - this.npc.x) < 8) {
        this.lastMove = time;
        return 'idle';
      }
    });

    this.addState('moveToPlayer', () => {
      this.updateObjectPositions();
      this.arrow.setVisible(false);
      this.npc.anims.play('cat' + this.color + 'Running', true);

      const target = (this.player.flipX) ? this.player.x -16 : this.player.x + 16;
      (this.velocityDirection(target) > 0) ? this.moveRight() : this.moveLeft();

      if (Math.abs(target - this.npc.x) < 2) {
        return 'facePlayer';
      }
    });

    this.addState('facePlayer', () => {
      this.npc.setVelocityX(0);
      this.npc.anims.play('cat' + this.color + 'Idle', true);
      this.npc.flipX = (this.player.x - this.npc.x) < 0;
      this.conversationNode.startConversation(this.npc.x, this.npc.y - 32);
      return 'inConversation';
    });

    this.addState('inConversation', (time: number) => {
      if (this.conversationNode.isConversationComplete()) {
        FLAGS.PLAYER_CONTROLS_ENABLED = true;
        this.lastActivatedTime = time;
        return 'idle';
      }
    });
  }

  public created(): void {
    this.scene.events.emit('npc.created', this.npc);
  }

  private moveLeft(): void {
    this.npc.setVelocityX(-60);
    this.npc.flipX = true;
  }

  private moveRight(): void {
    this.npc.setVelocityX(60);
    this.npc.flipX = false;
  }

  private generateMoveTarget(): number {
    return (Math.random() * 64) + this.position.x - 32;
  }

  private velocityDirection(target: number): number {
    return (target - this.npc.x > 0) ? 1 : -1;
  }

  private updateObjectPositions(): void {
    this.arrow.setPosition(this.npc.x, this.npc.y - 12);
    this.interactionZone.setPosition(this.npc.x, this.npc.y);
    (this.interactionZone.body as Phaser.Physics.Arcade.Body).updateFromGameObject();
    this.arrow.setVisible(this.scene.physics.overlap(this.player, this.interactionZone));
  }
}
