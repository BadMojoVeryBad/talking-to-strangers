import { FLAGS } from '@/support/flags';
import { NpcNode } from './npcNode';
import { Stranger2TitleNode } from './stranger2TitleNode';

export class BadAdviceNpcNode extends NpcNode {
  private imageNode: Stranger2TitleNode;

  public init(data: Record<string, unknown>): void {
    super.init(data);

    this.imageNode = this.addNode(Stranger2TitleNode, {
      x: 512,
      y: 256
    });
  }

  public create(): void {
    super.create();

    this.addState('inConversation', (time: number) => {
      if (this.conversationNode.isConversationComplete()) {
        this.scene.events.emit('stranger2Title.fadeIn');
        FLAGS.PLAYER_CONTROLS_ENABLED = true;
        this.lastActivatedTime = time;
        this.imageNode.fadeIn();
        return 'idle';
      }
    });
  }
}
