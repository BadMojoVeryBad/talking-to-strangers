import { RegisterControls } from './registerControls';

/**
 * Returns if certain controls are active.
 */
export class Controls {
  constructor(private controls: RegisterControls) { }

  /**
   * Returns > 0 if any input for the control is pressed.
   *
   * @param control The control to check.
   *
   * @returns number A number between 0 and 1 that represents how
   *                'active' the control is.
   */
  public isActive(control: string): number {
    return this.controls.isActive(control);
  }
}
