import { Node } from '@/framework/node';

export class DebugNode extends Node {
  private text: Phaser.GameObjects.BitmapText;

  private lines: string[] = [];

  public create(): void {
    this.text = this.scene.add.bitmapText(8, 0, 'pixelFont', this.lines.join('\n'))
      .setDepth(10000)
      .setScrollFactor(0)
      .setVisible(this.isDebug());

    this.scene.events.on('debug.push', (text: string) => {
      this.lines.push(text);
    });
  }

  update(time: number, delta: number): void {
    if (this.isDebug()) {
      this.lines.push(`t: ${Math.round(time)}\nd: ${Math.round(delta)}`);

      this.text.setText(this.lines.join('\n'));

      this.lines = [];
    }
  }
}
