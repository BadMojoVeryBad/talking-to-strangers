import { ScriptNode } from '@/framework/nodes/scriptNode';

export class EndScene2ScriptNode extends ScriptNode {
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
      this.wait(2000),
      this.fadeOut(3000),
      async () => { this.scene.changeScene('level3Scene'); }
    ];
  }
}
