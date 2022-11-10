import { ScriptNode } from '@/framework/nodes/scriptNode';
import { CameraNode } from '../cameraNode';
import { PlayerNode } from '../playerNode';

export class StandardOpeningCutsceneScriptNode extends ScriptNode {
  private player: PlayerNode;

  private camera: CameraNode;

  public create(): void {
    super.create();

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.player = player;
    });

    this.scene.events.on('camera.created', (camera: CameraNode) => {
      this.camera = camera;
    });
  }

  protected name(): string {
    return 'testScript';
  }

  protected events(): string[] {
    return [
      'stranger2.start',
      'stranger3.start',
      'stranger4.start',
    ];
  }

  protected callbacks(): (() => Promise<void>)[] {
    return [
      async () => { this.camera.startFollow(this.player.getPlayer()); },
      this.fadeIn(2000),
      async () => { this.player.spawnPlayer(); },
    ];
  }
}
