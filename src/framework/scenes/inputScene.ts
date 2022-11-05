import { InputInterface } from '@/framework/controls/inputs/inputInterface';
import { Gamepad, GamepadButton, GamepadInput } from '@/framework/controls/inputs/gamepadInput';
import { KeyboardInput } from '@/framework/controls/inputs/keyboardInput';
import { Scene } from '@/framework/scene';
import { RegisterControls } from '../controls/registerControls';

export class InputScene extends Scene {
  constructor() {
    super('_input');
  }

  public init(data: { controls: RegisterControls, inputs: Record<string, string[]> }): void {
    for (const control in data.inputs) {
      const inputObjects: Array<InputInterface> = [];

      for (const input of data.inputs[control]) {
        const inputType = input.split('.').shift();
        const inputCode = input.split('.').pop();

        if (inputType === 'Keyboard') {
          if (!inputCode || isNaN(Number.parseInt(inputCode))) {
            throw Error(`Invalid input code "${inputCode}" for input type "${inputType}".`);
          } else {
            inputObjects.push(new KeyboardInput(this, Number.parseInt(inputCode)));
          }
        } else if (inputType === 'Gamepad') {
          if (!inputCode || (<any>GamepadButton)[inputCode] === undefined) {
            throw Error(`Invalid input code "${inputCode}" for input type "${inputType}".`);
          } else {
            inputObjects.push(new GamepadInput(this, Gamepad.ONE, (<any>GamepadButton)[inputCode]));
          }
        } else {
          throw Error(`Invalid input type "${inputType}". Valid types are "Keyboard" and "Gamepad".`);
        }
      }

      data.controls.registerInputs(control, inputObjects);
    }
  }
}
