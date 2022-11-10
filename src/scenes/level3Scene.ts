
import { MapNode } from '@/nodes/mapNode';
import { EndScene3ScriptNode } from '@/nodes/scripts/endScene3ScriptNode';
import { StandardOpeningCutsceneScriptNode } from '@/nodes/scripts/standardOpeningCutsceneScriptNode';
import { BaseScene } from './baseScene';

export class Level3Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode(StandardOpeningCutsceneScriptNode);
    this.addNode(EndScene3ScriptNode);
    this.addNode(MapNode, {
      mapName: 'stranger3',
    });
  }
}
