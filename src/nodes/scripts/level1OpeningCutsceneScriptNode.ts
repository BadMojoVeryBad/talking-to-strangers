import { FLAGS } from '@/support/flags';
import { ScriptNode } from '@/framework/nodes/scriptNode';
import { CameraNode } from '../cameraNode';
import { CONST } from '@/support/constants';
import { PlayerNode } from '../playerNode';

export class Level1OpeningCutsceneScriptNode extends ScriptNode {
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
      'stranger1.start'
    ];
  }

  protected callbacks(): (() => Promise<void>)[] {
    return [
      async () => { this.camera.stopFollow(); },
      this.fadeOut(0),
      this.pan(320, -128, 0),
      this.wait(1000),
      this.fadeIn(2000),
      this.wait(1000),
      this.pan(320, 259, 5000),
      this.wait(1000),
      async () => { this.player.spawnPlayer(); },
      async () => { this.camera.startFollow(this.player.getPlayer()); }
    ];
  }
}
