import { inject, injectable } from 'inversify';
import { ControlsInterface } from '@/framework/controls/controlsInterface';
import { RegisterControlsInterface } from '@/framework/controls/registerControlsInterface';

/**
 * @inheritdoc
 */
@injectable()
export class Controls implements ControlsInterface {
  constructor(@inject('_registerControls') private controls: RegisterControlsInterface) { }

  /**
   * @inheritdoc
   */
  public isActive(control: string): number {
    return this.controls.isActive(control);
  }
}
