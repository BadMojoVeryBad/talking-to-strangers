import { Game } from '@/framework/game';
import { Level1Scene } from '@/scenes/level1Scene';
import { CONST } from './support/constants';

// Create a game.
const game = Game.create(CONST.GAME_WIDTH, CONST.GAME_HEIGHT, {
  debug: true,
  gravity: 64
});

// Scenes.
game.registerScene('level1Scene', Level1Scene);

// Assets.
game.registerAsset(CONST.TEXTURE_NAME, 'assets/textures.png', 'assets/textures.json');
game.registerAsset('stranger1', 'assets/stranger1.json');

// Animations.
game.registerAnimation('textures', 'noise', 1, 3, true, 12);
game.registerAnimation('textures', 'stranger', 1, 9, true, 12);
game.registerAnimation('textures', 'arrow', 1, 8, true, 12);
game.registerAnimation('textures', 'catEntrance', 1, 26, false, 12);
game.registerAnimation('textures', 'catRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catIdle', 1, 2, true, 2);
game.registerAnimation('textures', 'catOrangeRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catOrangeIdle', 1, 2, true, 2);
game.registerAnimation('textures', 'catBlueRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catBlueIdle', 1, 2, true, 2);

// Controls.
game.registerControl(CONST.CONTROL_LEFT, 'Keyboard.37', 'Gamepad.LEFT', 'Gamepad.STICK_LEFT_LEFT');
game.registerControl(CONST.CONTROL_RIGHT, 'Keyboard.39', 'Gamepad.RIGHT', 'Gamepad.STICK_LEFT_RIGHT');
game.registerControl(CONST.CONTROL_ACTIVATE, 'Keyboard.32', 'Gamepad.A');

// Start game.
game.start();
