import { Node } from "@/framework/node";
import { TilemapHelper } from "@/support/tilemapHelper";
import { injectable } from "inversify";

@injectable()
export class Level1Node extends Node {
  private started = false;

  private map: Phaser.Tilemaps.Tilemap;

  public create() {
    this.addNode('playerNode');

    this.map = this.scene.make.tilemap({ key: 'stranger1' });
    this.addNode('level1OpeningCutsceneScriptNode');
  }

  public created(): void {
    // Add nodes dynamically based on what's in the tiled map.
    const objects: Phaser.Types.Tilemaps.TiledObject[] = this.map.getObjectLayer('objects').objects;
    for (const obj of objects) {
      if (obj.name === 'image') {
        this.addNode('imageNode', {
          x: obj.x + (obj.width / 2),
          y: obj.y - (obj.height / 2),
          frame: TilemapHelper.getProperty<string>(obj, 'frame')
        });
      }

      if (obj.name === 'floor') {
        this.addNode('floorNode', {
          x: obj.x + (obj.width / 2),
          y: obj.y - (obj.height / 2),
          width: obj.width,
          height: obj.height
        });
      }

      if (obj.name === 'stranger') {
        this.addNode('strangerNode', {
          x: obj.x + (obj.width / 2),
          y: obj.y - (obj.height / 2)
        });
      }

      if (obj.name === 'npc') {
        this.addNode('npcNode', {
          x: obj.x + (obj.width / 2),
          y: obj.y - (obj.height / 2),
          obj: obj
        });
      }
    }
  }

  public update() {
    if (!this.started) {
      // Start opening cutscene.
      this.scene.events.emit('script.testScript.run');
      this.started = true;
    }
  }
}
