import { ScriptNode } from '@/framework/nodes/scriptNode';

export class EndScene4ScriptNode extends ScriptNode {
  protected name(): string {
    return 'endScene';
  }

  protected events(): string[] {
    return [
      'endNode.complete'
    ];
  }

  protected callbacks(): (() => Promise<void>)[] {
    return [
      this.fadeOut(3000),
      async () => { this.scene.changeScene('level1Scene'); }
    ];
  }
}
