import { ControlsInterface } from "@/framework/controls/controlsInterface";
import { Node } from "@/framework/node";
import { CONST } from "@/support/constants";
import { inject, injectable } from "inversify";

@injectable()
export class ConversationNode extends Node {
  private position = new Phaser.Math.Vector2();
  private text: Phaser.GameObjects.BitmapText;
  private rectangle: Phaser.GameObjects.Rectangle;
  private arrow: Phaser.GameObjects.Image;
  private sideL: Phaser.GameObjects.Image;
  private sideR: Phaser.GameObjects.Image;
  private lines = [];
  private currentLine: number = 0;
  private shouldStartConversation: boolean = false;
  private lastPrintedLetter: number = 0;
  private currentText = '';

  constructor(@inject('controls') private controls: ControlsInterface) {
    super();
  }

  public init(data?: Record<string, unknown>): void {
    if (data.lines instanceof Array<string>) {
      this.lines = data.lines;
    }
  }

  public create() {
    this.text = this.scene.add.bitmapText(this.position.x, this.position.y, 'pixelFont', '', 16);
    this.text.setDepth(40).setVisible(false);
    this.arrow = this.scene.add.image(0, 0, CONST.TEXTURE_NAME, 'conversationArrow').setDepth(39).setVisible(false);
    this.sideL = this.scene.add.image(0, 0, CONST.TEXTURE_NAME, 'conversationSide').setDepth(39).setFlipX(true).setVisible(false);
    this.sideR = this.scene.add.image(0, 0, CONST.TEXTURE_NAME, 'conversationSide').setDepth(39).setVisible(false);
    this.rectangle = this.scene.add.rectangle(0, 0, 64, 24, 0x000000).setVisible(false).setDepth(39);

    this.addState('idle', () => {
      if (this.shouldStartConversation) {
        this.shouldStartConversation = false;
        return 'printingLine';
      }
    });

    this.addState('waitingForInput', () => {
      if (this.controls.isActive(CONST.CONTROL_ACTIVATE)) {
        this.currentLine++;
        this.currentText = '';

        if (this.isConversationComplete()) {
          this.rectangle.setVisible(false);
          this.arrow.setVisible(false);
          this.sideL.setVisible(false);
          this.sideR.setVisible(false);
          this.text.setVisible(false);
          return 'idle';
        }

        return 'printingLine';
      }
    });

    this.addState('printingLine', (time: number) => {
      this.printLine(time);

      if (this.currentText.length === this.lines[this.currentLine].length) {
        return 'waitingForInput';
      }
    });
  }

  public startConversation(x: number, y: number): void {
    this.position = new Phaser.Math.Vector2(x, y);
    this.currentLine = 0;
    this.shouldStartConversation = true;
  }

  public isConversationComplete(): boolean {
    return this.currentLine === this.lines.length;
  }

  private printLine(time: number) {
    const center = this.scene.cameras.main.scrollX + 64;
    if (this.currentText.length !== this.lines[this.currentLine].length && this.lastPrintedLetter + 20 < time) {
      this.currentText = this.lines[this.currentLine].substring(0, this.currentText.length + 1);
      this.lastPrintedLetter = time;
    }

    this.text.setText(this.lines[this.currentLine]).setVisible(true);
    this.rectangle.destroy();
    this.rectangle = this.scene.add.rectangle(center, this.position.y + 11, Math.max(this.text.width, 64), 16, 0x000000).setDepth(39);
    this.rectangle.setVisible(true);
    this.text.setText(this.currentText).setVisible(true);
    this.text.setPosition(center - (this.text.width / 2), this.position.y);
    this.arrow.setPosition(this.position.x, this.position.y + 22).setVisible(true);
    this.sideL.setPosition(center - (this.rectangle.width / 2) - 2, this.position.y + 10).setVisible(true);
    this.sideR.setPosition(center + Math.floor(this.rectangle.width / 2) + 2, this.position.y + 10).setVisible(true);
  }
}
