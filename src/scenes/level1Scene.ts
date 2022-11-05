
import { MapNode } from '@/nodes/mapNode';
import { BaseScene } from './baseScene';

export class Level1Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode(MapNode, {
      mapName: 'stranger1',
    });
  }
}
