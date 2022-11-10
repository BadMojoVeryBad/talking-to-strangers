
import { MapNode } from '@/nodes/mapNode';
import { EndScene2ScriptNode } from '@/nodes/scripts/endScene2ScriptNode';
import { StandardOpeningCutsceneScriptNode } from '@/nodes/scripts/standardOpeningCutsceneScriptNode';
import { BaseScene } from './baseScene';

export class Level2Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode(StandardOpeningCutsceneScriptNode);
    this.addNode(EndScene2ScriptNode);
    this.addNode(MapNode, {
      mapName: 'stranger2',
    });
  }
}
