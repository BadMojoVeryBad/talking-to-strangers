import { Scene } from '@/framework/scene';
import { BackgroundNode } from '@/nodes/backgroundNode';
import { CameraNode } from '@/nodes/cameraNode';
import { DebugNode } from '@/nodes/debugNode';
import { NoiseNode } from '@/nodes/noiseNode';
import { RainNode } from '@/nodes/rainNode';
import { VignetteNode } from '@/nodes/vignetteNode';

export abstract class BaseScene extends Scene {
  protected abstract addMapNode(): void;

  public preload(): void {
    this.load.bitmapFont('pixelFont', 'assets/m3x6.png', 'assets/m3x6.xml');
    this.load.bitmapFont('helloRobotFont', 'assets/helloRobot.png', 'assets/helloRobot.xml');
  }

  public init(): void {
    this.addMapNode();

    this.addNode(DebugNode);
    this.addNode(CameraNode);
    this.addNode(RainNode);
    this.addNode(NoiseNode);
    this.addNode(VignetteNode);
    this.addNode(BackgroundNode, {
      texture: 'bg',
      scroll: 0
    });
    this.addNode(BackgroundNode, {
      texture: 'buildings1',
      scroll: 0.3,
      depth: 30,
      yOffset: 58
    });
    this.addNode(BackgroundNode, {
      texture: 'buildings2',
      scroll: 0.2,
      depth: 20,
      yOffset: 32
    });
    this.addNode(BackgroundNode, {
      texture: 'buildings3',
      scroll: 0.1,
      depth: 10,
      yOffset: 16
    });
  }
}
