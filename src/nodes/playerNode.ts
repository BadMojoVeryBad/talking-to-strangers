import { Node } from '@/framework/node';
import { CONST } from '@/support/constants';
import { FLAGS } from '@/support/flags';

export class PlayerNode extends Node {
  private speedIntensity = 1;

  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private playerSpawn: Phaser.GameObjects.Sprite;

  private position = new Phaser.Math.Vector2();

  private shouldSpawnPlayer = false;

  public init(data: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }
  }

  public create(): void {
    this.player = this.scene.physics.add.sprite(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'catRunning1');
    this.player.setDepth(100).setFlipX(true).setVisible(false);
    this.player.body.setSize(8, 16);

    this.scene.events.on('stranger.intensity', (intensity: number) => {
      this.speedIntensity = Math.max((1 - intensity), 0.05);
    });

    this.playerSpawn = this.scene.add.sprite(this.position.x, this.position.y - 64 + 8, CONST.TEXTURE_NAME, 'catEntrance1');
    this.playerSpawn.setDepth(100).setVisible(false);

    this.addState('default', () => {
      if (this.shouldSpawnPlayer) {
        return 'spawning';
      }
    });

    this.addState('spawning', () => {
      this.playerSpawn.setVisible(true);
      this.playerSpawn.anims.play('catEntrance', true);

      if (this.playerSpawn.anims.getProgress() === 1) {
        this.player.setVisible(true);
        this.playerSpawn.setVisible(false);
        FLAGS.PLAYER_CONTROLS_ENABLED = true;
        return 'playing';
      }
    });

    this.addState('playing', () => {
      if (FLAGS.PLAYER_CONTROLS_ENABLED) {
        if (this.controls.isActive(CONST.CONTROL_LEFT) && this.controls.isActive(CONST.CONTROL_RIGHT)) {
          this.player.anims.play('catIdle', true);
          this.player.setVelocityX(0);
        } else if (this.controls.isActive(CONST.CONTROL_LEFT)) {
          this.player.anims.play('catRunning', true);
          this.player.setFlipX(true);
          this.player.setVelocityX(-60 * this.speedIntensity);
        } else if (this.controls.isActive(CONST.CONTROL_RIGHT)) {
          this.player.anims.play('catRunning', true);
          this.player.setFlipX(false);
          this.player.setVelocityX(60 * this.speedIntensity);
        } else {
          this.player.anims.play('catIdle', true);
          this.player.setVelocityX(0);
        }
      } else {
        this.player.anims.play('catIdle', true);
        this.player.setVelocityX(0);
      }
    });
  }

  public created(): void {
    this.scene.events.emit('player.created', this);
  }

  public getPlayer(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    return this.player;
  }

  public spawnPlayer(): void {
    this.shouldSpawnPlayer = true;
  }
}
