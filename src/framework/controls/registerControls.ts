import { InputInterface } from '@/framework/controls/inputs/inputInterface';

/**
 * Allows a control (e.g. 'Left' or 'Activate') to be mapped to
 * inputs (e.g. 'Left arrow key', 'A key').
 */
export class RegisterControls {
  private controlMap: Record<string, InputInterface[]> = {};

  /**
   * Add an input to a control. Using this, you can add many inputs
   * to the same control.
   *
   * @param control The control to add the inputs to.
   * @param inputs The inputs to add.
   */
  public registerInputs(control: string, inputs: InputInterface[]): void {
    this.registerControl(control);
    this.controlMap[control] = inputs;
  }

  /**
   * Returns > 0 if any input for the control is pressed.
   *
   * @param control The control to check.
   *
   * @returns number A number between 0 and 1 that represents how
   *                'active' the control is.
   */
  public isActive(control: string): number {
    const inputs = this.controlMap[control.valueOf()];
    let active = 0;

    // For each input in this control.
    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        // Store how active it is.
        const current = inputs[i].isActive();
        if (current > active) {
          active = current;
        }
      }
    }

    // Return the most active the control.
    return active;
  }

  private registerControl(control: string): void {
    for (const controlKey in this.controlMap) {
      if (controlKey === control.valueOf().toString()) {
        return;
      }
    }

    this.controlMap[control] = [];
  }
}
