import { Node } from "@/framework/node";
import { injectable } from "inversify";

@injectable()
export abstract class ScriptNode extends Node {
  public create(): void {
    for (const event of this.events()) {
      this.scene.events.on(event, () => {
        this.runScript();
      });
    }
  }

  /**
   * The unique name of the script.
   */
  protected abstract name(): string;

  /**
   * The script will run on these events.
   */
  protected abstract events(): Array<string>;

  /**
   * A list of functions to run one after the other.
   */
  protected abstract callbacks(): Array<() => Promise<void>>;

  protected emit(event: string, ...data: any[]): () => Promise<void> {
    return async () => {
      this.scene.events.emit(event, data);
    };
  }

  protected wait(milliseconds: number): () => Promise<void> {
    return () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, milliseconds);
      });
    };
  }

  protected pan(x, y, duration): () => Promise<void> {
    return () => {
      return new Promise<void>(resolve => {
        this.scene.cameras.main.pan(x, y, duration, Phaser.Math.Easing.Quadratic.InOut, false, (camera, progress) => {
          if (progress === 1) {
            resolve();
          }
        });
      });
    };
  }

  protected fadeIn(duration): () => Promise<void> {
    return () => {
      return new Promise<void>(resolve => {
        this.scene.cameras.main.fadeIn(duration, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            resolve();
          }
        });
      });
    };
  }

  protected fadeOut(duration): () => Promise<void> {
    return () => {
      return new Promise<void>(resolve => {
        this.scene.cameras.main.fadeOut(duration, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            resolve();
          }
        });
      });
    };
  }

  private async runScript(): Promise<void> {
    this.scene.events.emit(`script.${this.name()}.started`);

    for (const callback of this.callbacks()) {
      await callback();
    }

    this.scene.events.emit(`script.${this.name()}.finished`);
  }
}
