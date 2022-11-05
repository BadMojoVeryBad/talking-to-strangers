import { Node } from "@/framework/node";
import { using } from "@/support/support";
import { injectable } from "inversify";

@injectable()
export abstract class StateNode extends Node {
  private states: {[key: string]: (time: number, delta: number) => string|void} = {};

  private currentState: string;

  public update(time: number, delta: number): void {
    if (!this.currentState) {
      this.currentState = 'idle';
    }

    if (!this.states[this.currentState]) {
      return;
    }

    using(this.states[this.currentState](time, delta), (state: string|void) => {
      if (state) {
        this.currentState = state;
      }
    });
  }

  protected addState(name: string, fn: (time: number, delta: number) => string|void): void {
    this.states[name] = fn;
  }
}
