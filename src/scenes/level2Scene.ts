
import { MapNode } from '@/nodes/mapNode';
import { EndScene2ScriptNode } from '@/nodes/scripts/endScene2ScriptNode';
import { StandardOpeningCutsceneScriptNode } from '@/nodes/scripts/standardOpeningCutsceneScriptNode';
import { Stranger3TitleNode } from '@/nodes/stranger3TitleNode';
import { BaseScene } from './baseScene';

export class Level2Scene extends BaseScene {
  protected addMapNode(): void {
    this.addNode(Stranger3TitleNode);
    this.addNode(StandardOpeningCutsceneScriptNode);
    this.addNode(EndScene2ScriptNode);
    this.addNode(MapNode, {
      mapName: 'stranger2',
    });
  }
}
