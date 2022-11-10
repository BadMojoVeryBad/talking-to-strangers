import { ScriptNode } from '@/framework/nodes/scriptNode';

export class EndScene3ScriptNode extends ScriptNode {
  protected name(): string {
    return 'endScene';
  }

  protected events(): string[] {
    return [
      'strangerNpcNode.complete'
    ];
  }

  protected callbacks(): (() => Promise<void>)[] {
    return [
      this.fadeOut(3000),
      async () => { this.scene.changeScene('endScene'); }
    ];
  }
}
