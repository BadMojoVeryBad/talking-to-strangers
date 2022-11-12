
import { MapNode } from '@/nodes/mapNode';
import { EndScene4ScriptNode } from '@/nodes/scripts/endScene4ScriptNode';
import { StandardOpeningCutsceneScriptNode } from '@/nodes/scripts/standardOpeningCutsceneScriptNode';
import { BaseScene } from './baseScene';

export class Level4Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode(StandardOpeningCutsceneScriptNode);
    this.addNode(EndScene4ScriptNode);
    this.addNode(MapNode, {
      mapName: 'stranger4',
    });
  }
}
