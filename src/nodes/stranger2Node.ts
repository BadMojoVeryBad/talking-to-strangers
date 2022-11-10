import { Stranger2NpcNode } from "./stranger2NpcNode";
import { StrangerNode } from "./strangerNode";

export class Stranger2Node extends StrangerNode {
  protected defaultState = 'hidden';

  private shouldAppear = false;

  public create(): void {
    super.create();

    this.addState('hidden', () => {
      this.sprite.setVisible(false);
      this.particles.setVisible(false);

      if (this.shouldAppear) {
        return 'default';
      }
    });

    this.scene.events.on('stranger2Title.fadeIn', () => {
      this.shouldAppear = true;
    });
  }

  protected spawnNpc(): void {
    this.addNode(Stranger2NpcNode, {
      x: this.position.x,
      y: this.position.y,
      player: this.player,
      lines: this.npcLines,
      color: this.npcColor,
    });
  }
}
