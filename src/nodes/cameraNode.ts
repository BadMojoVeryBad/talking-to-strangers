import { Node } from '@/framework/node';
import { Blur } from '@/framework/shaders/blur';
import { SoftLight } from '@/framework/shaders/softLight';
import { Vignette } from '@/framework/shaders/vignette';
import { injectable } from 'inversify';

@injectable()
export class CameraNode extends Node {
  private shakeIntensity = 0;

  private actualPosition: Phaser.Math.Vector2;

  private target;

  public create() {
    this.scene.cameras.main.setPostPipeline([Vignette, SoftLight, /* Blur */]);
    this.scene.cameras.main.roundPixels = true;

    this.scene.input.on('pointerdown', (pointer) => {
      console.log(Math.round(pointer.worldX), Math.round(pointer.worldY));
    });

    this.scene.events.on('player.created', (player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
      player.body.setCollideWorldBounds();
    });

    this.scene.events.on('floor.created', (width: number) => {
      this.scene.cameras.main.setBounds(
        0,
        0,
        width,
        320);

      this.scene.physics.world.setBounds(
        0,
        0,
        width,
        320);
    });

    this.scene.events.on('stranger.intensity', (intensity: number) => {
      if (intensity > this.shakeIntensity) {
        this.shakeIntensity = intensity * 0.025;
      }
    });
  }

  public created(): void {
    this.scene.events.emit('camera.created', this);
  }

  update(): void {
    this.scene.cameras.main.shake(100, this.shakeIntensity);
    this.shakeIntensity = 0;

    if (this.target) {
      if (!this.actualPosition) {
        this.actualPosition = new Phaser.Math.Vector2(
          this.target.x,
          this.target.y
        );
      }

      this.actualPosition.x = Phaser.Math.Linear(this.actualPosition.x, this.target.x, 0.1);
      this.actualPosition.y = Phaser.Math.Linear(this.actualPosition.y, this.target.y, 0.1);
      this.scene.cameras.main.scrollX = this.actualPosition.x - 64;
      this.scene.cameras.main.scrollY = this.actualPosition.y - 64 - 28;
    }
  }

  public startFollow(target: Phaser.GameObjects.GameObject): void {
    this.target = target;
    this.actualPosition = undefined;
  }

  public stopFollow(): void {
    this.target = undefined;
  }
}
