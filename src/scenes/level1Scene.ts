
import { BaseScene } from './baseScene';

export class Level1Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode('mapNode', {
      mapName: 'stranger1',
    });
  }
}
