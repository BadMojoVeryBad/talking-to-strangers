import 'reflect-metadata';
import { Game } from '@/framework/game';
import { Level1Scene } from '@/scenes/level1Scene';
import { BackgroundNode } from '@/nodes/backgroundNode';
import { RainNode } from '@/nodes/rainNode';
import { Vignette } from '@/shaders/vignette';
import { SoftLight } from '@/shaders/softLight';
import { NoiseNode } from './nodes/noiseNode';
import { VignetteNode } from './nodes/vignetteNode';
import { CameraNode } from './nodes/cameraNode';
import { FloorNode } from './nodes/floorNode';
import { PlayerNode } from './nodes/playerNode';
import { CONST } from './support/constants';
import { Level1Node } from './nodes/level1Node';
import { StrangerNode } from './nodes/strangerNode';
import { TextNode } from './nodes/textNode';
import { ImageNode } from './nodes/imageNode';
import { Blur } from './shaders/blur';
import { Level1OpeningCutsceneScriptNode } from './nodes/scripts/level1OpeningCutsceneScriptNode';
import { NpcNode } from './nodes/npcs/npcNode';
import { ConversationNode } from './nodes/conversationNode';

// Create a game.
const game = Game.create(CONST.GAME_WIDTH, CONST.GAME_HEIGHT, {
  debug: false,
  gravity: 64
});

// Scenes.
game.registerScene('level1Scene', Level1Scene);

// Nodes.
game.registerNode('cameraNode', CameraNode);
game.registerNode('backgroundNode', BackgroundNode);
game.registerNode('rainNode', RainNode);
game.registerNode('noiseNode', NoiseNode);
game.registerNode('vignetteNode', VignetteNode);
game.registerNode('floorNode', FloorNode);
game.registerNode('playerNode', PlayerNode);
game.registerNode('level1Node', Level1Node);
game.registerNode('strangerNode', StrangerNode);
game.registerNode('textNode', TextNode);
game.registerNode('conversationNode', ConversationNode);
game.registerNode('imageNode', ImageNode);
game.registerNode('npcNode', NpcNode);

// Script Nodes.
game.registerNode('level1OpeningCutsceneScriptNode', Level1OpeningCutsceneScriptNode);

// Assets.
game.registerAsset(CONST.TEXTURE_NAME, 'assets/textures.png', 'assets/textures.json');
game.registerAsset('stranger1', 'assets/stranger1.json');

// Animations.
game.registerAnimation('textures', 'noise', 1, 3, true, 12);
game.registerAnimation('textures', 'stranger', 1, 9, true, 12);
game.registerAnimation('textures', 'arrow', 1, 8, true, 12);

// Shaders.
game.registerPipeline('vignette', Vignette);
game.registerPipeline('softLight', SoftLight);
game.registerPipeline('blur', Blur);

// Controls.
game.registerControl(CONST.CONTROL_LEFT, 'Keyboard.37', 'Gamepad.LEFT', 'Gamepad.STICK_LEFT_LEFT');
game.registerControl(CONST.CONTROL_RIGHT, 'Keyboard.39', 'Gamepad.RIGHT', 'Gamepad.STICK_LEFT_RIGHT');
game.registerControl(CONST.CONTROL_ACTIVATE, 'Keyboard.32', 'Gamepad.A');

// Start game.
game.start();
