import { Node } from "@/framework/node";
import { CONST } from "@/support/constants";
import { PlayerNode } from "./playerNode";

export class InteractableImageNode extends Node {
  protected position = new Phaser.Math.Vector2();

  protected size = new Phaser.Math.Vector2();

  private frame = '';

  private animation = '';

  private arrowOffset = new Phaser.Math.Vector2(0, 0);

  private player: PlayerNode;

  private image: Phaser.GameObjects.Sprite;

  private lastInteractTime = 0;

  public init(data: Record<string, unknown>): void {
    this.frame = (typeof data.frame === 'string') ? data.frame: '';

    this.animation = (typeof data.animation === 'string') ? data.animation: '';

    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }

    if (typeof data.arrowOffsetX === 'number' && typeof data.arrowOffsetY === 'number') {
      this.arrowOffset = new Phaser.Math.Vector2(data.arrowOffsetX, data.arrowOffsetY);
    }

    if (typeof data.width === 'number' && typeof data.height === 'number') {
      this.size = new Phaser.Math.Vector2(data.width, data.height);
    }

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.player = player;
    });
  }

  public create(): void {
    this.image = this.scene.add.sprite(this.position.x, this.position.y, CONST.TEXTURE_NAME, this.frame)
      .setDepth(35);

    const interactionZone = this.scene.add.rectangle(this.position.x + ((this.size.x / 2) * this.arrowOffset.x), this.position.y, 32, this.size.y, 0x000000);
    this.scene.physics.add.existing(interactionZone, true);
    interactionZone.setDepth(100).setVisible(false);

    const arrow = this.scene.add.sprite(this.position.x + ((this.size.x / 2) * this.arrowOffset.x), this.position.y - (this.size.y / 2) + ((this.size.y / 2) * this.arrowOffset.x) - 4, CONST.TEXTURE_NAME, 'conversationArrow')
      .setDepth(99)
      .play('arrow');


    this.addState('default', (time: number) => {
      const overlap = this.scene.physics.overlap(this.player.getPlayer(), interactionZone);
      arrow.setVisible(overlap);

      if (this.lastInteractTime + 300 < time && this.controls.isActive(CONST.CONTROL_ACTIVATE) && overlap) {
        this.lastInteractTime = time;
        this.doAction();
        return 'animating';
      }
    });

    this.addState('animating', () => {
      if (this.isActionComplete()) {
        return 'default';
      }

      arrow.setVisible(false);
    });
  }

  protected doAction() {
    this.image.anims.play(this.animation);
  }

  protected isActionComplete() {
    return this.image.anims.getProgress() === 1;
  }
}
