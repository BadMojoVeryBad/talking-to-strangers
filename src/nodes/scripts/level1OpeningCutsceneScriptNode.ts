import { FLAGS } from '@/support/flags';
import { ScriptNode } from '@/framework/nodes/scriptNode';
import { CameraNode } from '../cameraNode';
import { CONST } from '@/support/constants';
import { PlayerNode } from '../playerNode';

export class Level1OpeningCutsceneScriptNode extends ScriptNode {
  private player: PlayerNode;

  private camera: CameraNode;

  private isActive: boolean;

  public create(): void {
    super.create();

    this.addState('default', () => {
      this.isActive = this.controls.isActive(CONST.CONTROL_ACTIVATE) === 1;
    });

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
    ];
  }
}
