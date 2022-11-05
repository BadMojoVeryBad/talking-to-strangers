import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';
import { injectable } from 'inversify';

@injectable()
export class ImageNode extends Node {
  private position = new Phaser.Math.Vector2();

  private frame = '';

  public init(data: Record<string, unknown>) {
    this.frame = (typeof data.frame === 'string') ? data.frame: '';

    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }
  }

  public create() {
    this.scene.add.image(this.position.x, this.position.y, CONST.TEXTURE_NAME, this.frame)
      .setDepth(35);
  }
}
