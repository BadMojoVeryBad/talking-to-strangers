import { Node } from '@/framework/node';

export class TextNode extends Node {
  private position = new Phaser.Math.Vector2();

  private text = '';

  public init(data: Record<string, unknown>): void {
    this.text = (typeof data.text === 'string') ? data.text: '';

    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }
  }

  public create(): void {
    const text = this.scene.add.bitmapText(this.position.x, this.position.y, 'pixelFont', this.text, 8);
    text.setDepth(35);
  }
}
