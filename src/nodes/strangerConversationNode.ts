import { Node } from "@/framework/node";
import { CONST } from "@/support/constants";
import { FLAGS } from "@/support/flags";

export class StrangerConversationNode extends Node {
  private startTime: number = 0;
  private lastPrintedLetterTime = 0;
  private lastInput = 0;
  private shouldStartConversation = false;
  private lines = [];
  private currentLine = 0;
  private currentText = '';
  private texts: Phaser.GameObjects.BitmapText[] = [];

  public init(data?: Record<string, unknown>): void {
    if (data.lines instanceof Array<string>) {
      this.lines = data.lines;
    }
  }

  public create(): void {
    const rectangle = this.scene.add.rectangle(64, 64, 128, 128, 0x000000)
      .setScrollFactor(0)
      .setDepth(200)
      .setVisible(false);

    this.addState('default', (time) => {
      rectangle.setVisible(false);

      if (this.shouldStartConversation) {
        this.startTime = time;
        FLAGS.PLAYER_CONTROLS_ENABLED = false;
        return 'startingConversation';
      }
    });

    this.addState('startingConversation', (time) => {
      rectangle.setVisible(true);
      this.currentLine = 0;
      this.currentText = '';

      if (this.startTime + 2000 < time) {
        return 'printingLine';
      }
    });

    this.addState('printingLine', (time) => {
      this.printLine(time);

      const line = this.parseLine(this.lines[this.currentLine]);
      if (this.currentText.length === line.text.length) {
        return 'waitingForInput';
      }
    });

    this.addState('waitingForInput', (time) => {
      const line = this.parseLine(this.lines[this.currentLine]);
      if (line.noInput) {
        this.lastInput = time;
        this.currentLine++;
        this.currentText = '';
        return 'printingLine';
      }

      if (this.lastInput + 300 < time && this.controls.isActive(CONST.CONTROL_ACTIVATE)) {
        this.lastInput = time;
        this.currentLine++;
        this.currentText = '';

        if (this.isConversationComplete()) {
          return 'endingConversation';
        } else {
          return 'printingLine';
        }
      }
    });

    this.addState('endingConversation', () => {
      this.shouldStartConversation = false;
      FLAGS.PLAYER_CONTROLS_ENABLED = true;
      this.texts.forEach((o) => o.destroy());
      this.texts = [];
      rectangle.setVisible(false);

      return 'default';
    });
  }

  public startConversation() {
    this.shouldStartConversation = true;
  }

  public isConversationComplete() {
    return this.currentLine === this.lines.length;
  }

  private printLine(time: number) {
    if (this.currentText === '') {
      this.texts[this.currentLine] = this.scene.add.bitmapText(0, 0, 'pixelFont', '', 16)
        .setDepth(201)
        .setScrollFactor(0);
    }

    const line = this.parseLine(this.lines[this.currentLine]);

    if (this.currentText.length !== line.text.length && this.lastPrintedLetterTime + line.speed < time) {
      this.currentText = line.text.substring(0, this.currentText.length + 1);
      this.lastPrintedLetterTime = time;
    }

    this.texts[this.currentLine].setText(this.lines[this.currentLine]).setVisible(true);
    this.texts[this.currentLine].setText(this.currentText).setVisible(true);
    this.texts[this.currentLine].setPosition(16, 10 + (10 * this.currentLine));
  }

  private parseLine(line: string): { text: string, speed: number, noInput: boolean } {
    const parts = line.split('|');
    const text = parts[0];

    let speed = 20;
    let noInput = false;
    if (parts.length > 1) {
      const params = parts[1].split(',');
      for(const param of params) {
        if (param === 'noInput') {
          noInput = true;
        }

        const paramSplit = param.split(':');
        if (paramSplit[0] === 'speed' && paramSplit.length > 1) {
          speed = parseInt(paramSplit[1]);
        }
      }
    }

    return {
      text,
      speed,
      noInput
    };
  }
}
