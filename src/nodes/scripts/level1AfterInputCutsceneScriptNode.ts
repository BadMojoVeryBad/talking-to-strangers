import { FLAGS } from '@/support/flags';
import { ScriptNode } from '@/framework/nodes/scriptNode';
import { CameraNode } from '../cameraNode';
import { CONST } from '@/support/constants';
import { PlayerNode } from '../playerNode';

export class Level1AfterInputCutsceneScriptNode extends ScriptNode {
  private player: PlayerNode;

  private camera: CameraNode;

  private text;

  private hasntActivated = true;

  public create(): void {
    super.create();

    this.text = this.scene.add.bitmapText(320, 70, 'pixelFont', 'Press SPACE to start.')
      .setDepth(40);
    this.text.setPosition(320 - this.text.width / 2, 64 - this.text.height / 2);

    this.addState('default', () => {
      if (this.controls.isActive(CONST.CONTROL_ACTIVATE) === 1 && this.hasntActivated) {
        this.hasntActivated = false;
        this.scene.events.emit('afterInput.start');
      }
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
      'afterInput.start'
    ];
  }

  protected callbacks(): (() => Promise<void>)[] {
    return [
      async () => {
        this.scene.tweens.add({
          targets: this.text,
          delay: 0,
          alpha: {
            from: 1,
            to: 0
          },
          ease: 'Linear',
          duration: 500,
          repeat: 0,
          yoyo: false
        });
      },
      this.wait(1000),
      this.pan(320, 259, 5000),
      this.wait(1000),
      async () => { this.player.spawnPlayer(); },
      async () => { this.camera.startFollow(this.player.getPlayer()); }
    ];
  }
}
