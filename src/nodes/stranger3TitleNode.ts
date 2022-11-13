import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';

export class Stranger3TitleNode extends Node {
  private image1: Phaser.GameObjects.Image;

  private image2: Phaser.GameObjects.Image;

  private image3: Phaser.GameObjects.Image;

  public create(): void {
    this.image1 = this.scene.add.image(568, 224, CONST.TEXTURE_NAME, 'stranger3Title1')
      .setDepth(36)
      .setAlpha(1);

    this.image2 = this.scene.add.image(568, 224, CONST.TEXTURE_NAME, 'stranger3Title2')
      .setDepth(36)
      .setAlpha(0);

    this.image3 = this.scene.add.image(568, 224, CONST.TEXTURE_NAME, 'stranger3Title3')
      .setDepth(36)
      .setAlpha(0);

    this.scene.events.on('stranger.interaction.1', () => {
      this.tween(this.image1, 1, 0);
      this.tween(this.image2, 0, 1);
    });

    this.scene.events.on('stranger.interaction.2', () => {
      this.tween(this.image2, 1, 0);
      this.tween(this.image3, 0, 1);
    });
  }

  private tween(object: Phaser.GameObjects.GameObject, from: number, to: number) {
    this.scene.tweens.add({
      targets: object,
      delay: 300,
      alpha: {
        from: from,
        to: to
      },
      ease: 'Linear',
      duration: 1000,
      repeat: 0,
      yoyo: false
    });
  }
}
