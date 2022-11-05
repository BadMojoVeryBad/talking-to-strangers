import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';

export class NoiseNode extends Node {
  public create(): void {
    const sprite = this.scene.add.sprite(64, 64, CONST.TEXTURE_NAME, 'noise1');
    sprite.setScrollFactor(0);
    sprite.setAlpha(0.1);
    sprite.setDepth(1000);
    sprite.play('noise');
  }
}
