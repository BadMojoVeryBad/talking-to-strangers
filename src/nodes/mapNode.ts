import { Node } from '@/framework/node';
import { tap } from '@/framework/support/support';
import { injectable } from 'inversify';

@injectable()
export class MapNode extends Node {
  private started = false;

  private map: Phaser.Tilemaps.Tilemap;

  private mapName: string;

  public init(data?: Record<string, unknown>): void {
    if (typeof data.mapName === 'string') {
      this.mapName = data.mapName;
    }
  }

  public create() {
    this.addNode('playerNode');

    this.map = this.scene.make.tilemap({ key: this.mapName });
    this.addNode('level1OpeningCutsceneScriptNode');
  }

  public created(): void {
    // Add nodes dynamically based on what's in the tiled map.
    const objects: Phaser.Types.Tilemaps.TiledObject[] = this.map.getObjectLayer('objects').objects;
    for (const obj of objects) {
      this.addNode(obj.name + 'Node', {
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

  public update() {
    if (!this.started) {
      // Start opening cutscene.
      this.scene.events.emit(this.mapName + '.start');
      this.started = true;
    }
  }
}
