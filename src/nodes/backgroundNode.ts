import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';

export class BackgroundNode extends Node {
  private texture = '';

  private scroll = 1;

  private depth = 0;

  private tile: Phaser.GameObjects.TileSprite;

  private yOffset = 0;

  public init(data: Record<string, unknown>): void {
    this.texture = (typeof data.texture === 'string') ? data.texture : '';
    this.scroll = (typeof data.scroll === 'number') ? data.scroll : 1;
    this.depth = (typeof data.depth === 'number') ? data.depth : 1;
    this.yOffset = (typeof data.yOffset === 'number') ? data.yOffset : 0;
  }

  public create(): void {
    this.scene.events.on('floor.created', (width: number) => {
      const texture = this.scene.textures.getFrame(CONST.TEXTURE_NAME, this.texture);
      this.tile = this.scene.add.tileSprite(
        CONST.GAME_WIDTH / 2,
        CONST.GAME_HEIGHT / 2 + this.yOffset,
        width,
        texture.height,
        CONST.TEXTURE_NAME,
        this.texture
      );

      this.tile.setScrollFactor(this.scroll);
      this.tile.setDepth(this.depth);
    });
  }
}
