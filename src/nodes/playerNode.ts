import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';
import { FLAGS } from '@/support/flags';

export class PlayerNode extends Node {
  private speedIntensity = 0;

  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public create(): void {
    this.player = this.scene.physics.add.sprite(318, 274, CONST.TEXTURE_NAME, 'cat');
    this.player.setDepth(100).setFlipX(true);

    this.scene.events.on('stranger.intensity', (intensity: number) => {
      this.speedIntensity = Math.max((1 - intensity), 0.05);
    });
  }

  public created(): void {
    this.scene.events.emit('player.created', this.player);
  }

  public update(): void {
    if (FLAGS.PLAYER_CONTROLS_ENABLED) {
      if (this.controls.isActive(CONST.CONTROL_LEFT) && this.controls.isActive(CONST.CONTROL_RIGHT)) {
        this.player.setVelocityX(0);
      } else if (this.controls.isActive(CONST.CONTROL_LEFT)) {
        this.player.setFlipX(true);
        this.player.setVelocityX(-60 * this.speedIntensity);
      } else if (this.controls.isActive(CONST.CONTROL_RIGHT)) {
        this.player.setFlipX(false);
        this.player.setVelocityX(60 * this.speedIntensity);
      } else {
        this.player.setVelocityX(0);
      }
    }
  }
}
