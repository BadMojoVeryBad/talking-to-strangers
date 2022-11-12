import { Game } from '@/framework/game';
import { Level1Scene } from '@/scenes/level1Scene';
import { Level2Scene } from './scenes/level2Scene';
import { Level3Scene } from './scenes/level3Scene';
import { Level4Scene } from './scenes/level4Scene';
import { CONST } from './support/constants';

// Create a game.
const game = Game.create(CONST.GAME_WIDTH, CONST.GAME_HEIGHT, {
  debug: false,
  gravity: 64
});

// Scenes.
game.registerScene('level1Scene', Level1Scene);
game.registerScene('level2Scene', Level2Scene);
game.registerScene('level3Scene', Level3Scene);
game.registerScene('level4Scene', Level4Scene);

// Assets.
game.registerAsset(CONST.TEXTURE_NAME, 'assets/textures.png', 'assets/textures.json');
game.registerAsset('stranger1', 'assets/stranger1.json');
game.registerAsset('stranger2', 'assets/stranger2.json');
game.registerAsset('stranger3', 'assets/stranger3.json');
game.registerAsset('stranger4', 'assets/stranger4.json');

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
game.registerAnimation('textures', 'catGreenRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catGreenIdle', 1, 2, true, 2);
game.registerAnimation('textures', 'catRedRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catRedIdle', 1, 2, true, 2);
game.registerAnimation('textures', 'catGreyRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catGreyIdle', 1, 2, true, 2);
game.registerAnimation('textures', 'catBrownRunning', 1, 4, true, 12);
game.registerAnimation('textures', 'catBrownIdle', 1, 2, true, 2);
game.registerAnimation('textures', 'car', 1, 13, false, 12);
game.registerAnimation('textures', 'sign', 1, 7, false, 12);
game.registerAnimation('textures', 'phone', 1, 11, false, 12);

// Controls.
game.registerControl(CONST.CONTROL_LEFT, 'Keyboard.37', 'Gamepad.LEFT', 'Gamepad.STICK_LEFT_LEFT');
game.registerControl(CONST.CONTROL_RIGHT, 'Keyboard.39', 'Gamepad.RIGHT', 'Gamepad.STICK_LEFT_RIGHT');
game.registerControl(CONST.CONTROL_ACTIVATE, 'Keyboard.32', 'Gamepad.A');

// Start game.
game.start();
