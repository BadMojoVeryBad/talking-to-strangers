import { FLAGS } from '@/support/flags';
import { injectable } from 'inversify';
import { ScriptNode } from '@/framework/nodes/scriptNode';
import { CameraNode } from '../cameraNode';

@injectable()
export class Level1OpeningCutsceneScriptNode extends ScriptNode {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private camera: CameraNode;

  public create(): void {
    super.create();

    this.scene.events.on('player.created', (player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
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
      // async () => { this.camera.stopFollow(); },
      // async () => { FLAGS.PLAYER_CONTROLS_ENABLED = false; },
      // this.fadeOut(0),
      // this.pan(318, -128, 0),
      // this.wait(1000),
      // this.fadeIn(2000),
      // this.wait(1000),
      // this.pan(318, 259, 5000),
      // async () => { FLAGS.PLAYER_CONTROLS_ENABLED = true; },
      async() => { this.camera.startFollow(this.player); }
    ];
  }
}
