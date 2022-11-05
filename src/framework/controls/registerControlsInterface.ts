import { InputInterface } from '@/framework/controls/inputs/inputInterface';

/**
 * Allows a control (e.g. 'Left' or 'Activate') to be mapped to
 * inputs (e.g. 'Left arrow key', 'A key').
 */
export interface RegisterControlsInterface {
  /**
   * Returns > 0 if any input for the control is pressed.
   *
   * @param control The control to check.
   *
   * @returns number A number between 0 and 1 that represents how
   *                'active' the control is.
   */
  isActive(control: string): number;

  /**
   * Add an input to a control. Using this, you can add many inputs
   * to the same control.
   *
   * @param control The control to add the inputs to.
   * @param inputs The inputs to add.
   */
  registerInputs(control: string, inputs: InputInterface[]): void;
}
