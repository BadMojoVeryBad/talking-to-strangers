import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';

export class VignetteNode extends Node {
  public create(): void {
    const sprite = this.scene.add.sprite(64, 64, CONST.TEXTURE_NAME, 'vignette');
    sprite.setScrollFactor(0);
    sprite.setAlpha(0.9);
    sprite.setDepth(1100);
  }
}
