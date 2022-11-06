import { FLAGS } from "@/support/flags";
import { NpcNode } from "./npcNode";

export class StrangerNpcNode extends NpcNode {
  private hasTalkedToPlayer = false;

  public create(): void {
    super.create();

    this.addState('idle', () => {
      if (!this.hasTalkedToPlayer) {
        this.hasTalkedToPlayer = true;
        return 'moveToPlayer';
      } else {
        FLAGS.PLAYER_CONTROLS_ENABLED = false;
        this.scene.events.emit('strangerNpcNode.complete');
        return 'end';
      }
    });
  }
}
