import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';

export class Stranger2TitleNode extends Node {
  private position = new Phaser.Math.Vector2();

  private frame = 'title3';

  private image: Phaser.GameObjects.Image;

  public init(data: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }
  }

  public create(): void {
    this.image = this.scene.add.image(this.position.x, this.position.y, CONST.TEXTURE_NAME, this.frame)
      .setDepth(35)
      .setAlpha(0);
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);

    this.scene.events.emit('debug.push', this.image.alpha);
  }

  public fadeIn(): void {
    this.scene.tweens.add({
      targets: this.image,
      delay: 300,
      alpha: {
        from: 0,
        to: 1
      },
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      yoyo: false
    });
  }
}
