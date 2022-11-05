import { Flags } from "@/support/flags";
import { injectable } from "inversify";
import { ScriptNode } from "@/nodes/scripts/scriptNode";
import { CameraNode } from "../cameraNode";

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
      'script.testScript.run'
    ]
  }

  protected callbacks(): (() => Promise<void>)[] {
    return [
      async () => { this.camera.stopFollow(); },
      async () => { Flags.PLAYER_CONTROLS_ENABLED = false; },
      this.fadeOut(0),
      this.pan(318, -128, 0),
      this.wait(1000),
      this.fadeIn(2000),
      this.wait(1000),
      this.pan(318, 259, 5000),
      async () => { Flags.PLAYER_CONTROLS_ENABLED = true; },
      async () => { this.camera.startFollow(this.player); }
    ]
  }
}
