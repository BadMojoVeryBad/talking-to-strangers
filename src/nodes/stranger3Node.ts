import { FLAGS } from "@/support/flags";
import { StrangerConversationNode } from "./strangerConversationNode";
import { StrangerNode } from "./strangerNode";

export class Stranger3Node extends StrangerNode {
  private times: number = 0;

  private moving: boolean = false;

  private moveTime: number = 0;

  private finalLines: string[] = [];

  public create(): void {
    this.finalLines = this.lines;
    this.lines = [
      '...|speed:300',
      '......|speed:300',
      'Catch me if you can!!!|noInput,speed:5',
      'Heheheeeeeee!!!|speed:5'
    ];
    super.create();

    this.addState('moveToTarget', (time: number) => {
      if (this.moving && this.moveTime + 3000 < time) {
        this.moving = false;
        FLAGS.PLAYER_CONTROLS_ENABLED = true;
        return 'default';
      }
    });
  }

  protected afterConversationEnd(time: number): string {
    this.times++;

    if (this.times === 3) {
      return 'spawnNpc';
    }

    this.conversationNode.remove();
    if (this.times === 1) {
      this.conversationNode = this.addNode(StrangerConversationNode, {
        lines: [
          '...|speed:300',
          '......|speed:300',
          '!!!!!!!!!!!!!!!!!!',
          '!!!!!!!!!!!!!!!!!!|speed:5,noInput',
          '!!!!!!!!!!!!!!!!!!|speed:5,noInput',
          '!!!!!!!!!!!!!!!!!!|speed:5',
        ]
      });
    }

    if (this.times === 2) {
      this.conversationNode = this.addNode(StrangerConversationNode, {
        lines: this.finalLines
      });
    }

    this.moving = true;
    this.moveTime = time;
    this.scene.tweens.add({
      targets: [this.particles, this.interactionZone, this.sprite, this.interactionZone.body],
      delay: 300,
      x: '+=320',
      ease: 'Linear',
      duration: 6000,
      repeat: 0,
      yoyo: false,
    });

    return 'moveToTarget';
  }
}
