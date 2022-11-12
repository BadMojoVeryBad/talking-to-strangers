import { Node } from "@/framework/node"
import { clamp, normalise } from "@/framework/support/support";
import { CONST } from "@/support/constants";
import { FLAGS } from "@/support/flags";
import { PlayerNode } from "./playerNode";
import { StrangerConversationNode } from "./strangerConversationNode";

export class ExitNode extends Node {
  private position: Phaser.Math.Vector2;

  private player: PlayerNode;

  public init(data?: Record<string, unknown>): void {
    if (typeof data.x === 'number' && typeof data.y === 'number') {
      this.position = new Phaser.Math.Vector2(data.x, data.y);
    }

    this.scene.events.on('player.created', (player: PlayerNode) => {
      this.player = player;
    });
  }

  public create(): void {
    this.scene.add.image(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'exit-fg')
      .setDepth(110);

    this.scene.add.image(this.position.x, this.position.y, CONST.TEXTURE_NAME, 'exit-bg')
      .setDepth(90);

    const conversationNode = this.addNode(StrangerConversationNode, {
      lines: [
        '...|speed:300',
        'This is the end.',
        'There\'s no more strangers|noInput',
        'to talk to.',
        '...|speed:300',
        'The rest is up to you.',
      ],
    });

    const rectangle = this.scene.add.rectangle(64, 64, 128, 128, 0x000000)
      .setScrollFactor(0)
      .setDepth(200)
      .setVisible(false);


    const interactionZone = this.scene.add.rectangle(this.position.x - 28 , this.position.y + 64, 2, 32, 0x000000);
    this.scene.physics.add.existing(interactionZone, true);
    interactionZone.setDepth(100).setVisible(false);

    const particles = this.scene.add.particles(CONST.TEXTURE_NAME, 'blackPixel');
    particles.setDepth(90);
    const emitter = particles.createEmitter({
      x: this.position.x,
      y: this.position.y,
      speed: { min: -60, max: 60 },
      quantity: 30,
      frequency: 10,
      lifespan: 600,
      alpha: { min: 0.25, max: 1 },
      emitZone: {
        type: 'random',
        source: new Phaser.Geom.Rectangle(-64, -64, 64, 128),
        quantity: 2000,
        stepRate: 0,
        yoyo: false,
        seamless: true
      }
    });
    emitter.start();

    this.addState('default', () => {
      const distance = Phaser.Math.Distance.BetweenPoints(this.player.getPlayer(), new Phaser.Math.Vector2(interactionZone.x, interactionZone.y));
      const intensity = clamp(normalise(distance, 0, 64), 0, 1);
      this.scene.events.emit('stranger.intensity', intensity);

      if (this.scene.physics.overlap(this.player.getPlayer(), interactionZone)) {
        return 'startConversation';
      }
    });

    let timeComplete = 0;
    this.addState('startConversation', (time: number) => {
      if (!timeComplete) {
        timeComplete = time;
      }

      if (timeComplete + 1000 < time) {
        conversationNode.startConversation();
        return 'inConversation';
      }

      rectangle.setVisible(true);
      FLAGS.PLAYER_CONTROLS_ENABLED = false;
    });

    this.addState('inConversation', (time: number) => {
      if (conversationNode.isConversationComplete()) {
        this.scene.events.emit('endNode.complete');
        return 'complete';
      }
    });

    this.addState('complete', (time: number) => {
      rectangle.setDepth(5000);
    });
  }
}
