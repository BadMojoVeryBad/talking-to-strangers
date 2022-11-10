
import { MapNode } from '@/nodes/mapNode';
import { EndScene1ScriptNode } from '@/nodes/scripts/endScene1ScriptNode';
import { Level1OpeningCutsceneScriptNode } from '@/nodes/scripts/level1OpeningCutsceneScriptNode';
import { BaseScene } from './baseScene';

export class Level1Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode(EndScene1ScriptNode);
    this.addNode(Level1OpeningCutsceneScriptNode);
    this.addNode(MapNode, {
      mapName: 'stranger1',
    });
  }
}
