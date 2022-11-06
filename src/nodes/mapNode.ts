import { Node } from '@/framework/node';
import { NodeInterface } from '@/framework/nodeInterface';
import { tap } from '@/framework/support/support';
import { FloorNode } from './floorNode';
import { ImageNode } from './imageNode';
import { NpcNode } from './npcNode';
import { PlayerNode } from './playerNode';
import { EndSceneScriptNode } from './scripts/endSceneScriptNode';
import { Level1OpeningCutsceneScriptNode } from './scripts/level1OpeningCutsceneScriptNode';
import { StrangerNode } from './strangerNode';

export class MapNode extends Node {
  private started = false;

  private map: Phaser.Tilemaps.Tilemap;

  private mapName: string;

  public init(data?: Record<string, unknown>): void {
    if (typeof data.mapName === 'string') {
      this.mapName = data.mapName;
    }
  }

  public create(): void {
    // this.addNode(PlayerNode);

    this.map = this.scene.make.tilemap({ key: this.mapName });
    this.addNode(Level1OpeningCutsceneScriptNode);
    this.addNode(EndSceneScriptNode);
  }

  public created(): void {
    // Add nodes dynamically based on what's in the tiled map.
    const objects: Phaser.Types.Tilemaps.TiledObject[] = this.map.getObjectLayer('objects').objects;
    for (const obj of objects) {
      this.addNode(this.getNodeClass(obj.name + 'Node'), {
        x: obj.x + (obj.width / 2),
        y: obj.y - (obj.height / 2),
        width: obj.width,
        height: obj.height,
        ...obj.properties?.reduce((previous, current) => {
          return tap(previous, () => previous[current.name] = current.value);
        }, {})
      });
    }
  }

  public update(): void {
    if (!this.started) {
      // Start opening cutscene.
      this.scene.events.emit(this.mapName + '.start');
      this.started = true;
    }
  }

  private getNodeClass(name: string): new () => NodeInterface {
    switch (name) {
    case 'imageNode':
      return ImageNode;
    case 'npcNode':
      return NpcNode;
    case 'imageNode':
      return ImageNode;
    case 'strangerNode':
      return StrangerNode;
    case 'floorNode':
      return FloorNode;
    case 'playerNode':
      return PlayerNode;
    }
  }
}
