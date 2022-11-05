import { Node } from '@/framework/node';
import { injectable } from 'inversify';

@injectable()
export class TextNode extends Node {
  private position = new Phaser.Math.Vector2();

  private text = '';

  public init(data: Record<string, unknown>) {
    this.text = (typeof data.text === 'string') ? data.text: '';

    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }
  }

  public create() {
    const text = this.scene.add.bitmapText(this.position.x, this.position.y, 'pixelFont', this.text, 8);
    text.setDepth(35);
  }
}
