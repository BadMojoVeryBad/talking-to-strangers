
import { Scene } from '@/framework/scene';

export class Level1Scene extends Scene {
  public preload(): void {
    this.load.bitmapFont('pixelFont', 'assets/m3x6.png', 'assets/m3x6.xml');
    this.load.bitmapFont('helloRobotFont', 'assets/helloRobot.png', 'assets/helloRobot.xml');
  }

  public init(): void {
    this.addNode('level1Node');

    this.addNode('cameraNode');
    this.addNode('rainNode');
    this.addNode('noiseNode');
    this.addNode('vignetteNode');
    this.addNode('backgroundNode', {
      texture: 'bg',
      scroll: 0
    });
    this.addNode('backgroundNode', {
      texture: 'buildings1',
      scroll: 0.3,
      depth: 30,
      yOffset: 58
    });
    this.addNode('backgroundNode', {
      texture: 'buildings2',
      scroll: 0.2,
      depth: 20,
      yOffset: 32
    });
    this.addNode('backgroundNode', {
      texture: 'buildings3',
      scroll: 0.1,
      depth: 10,
      yOffset: 16
    });
  }
}
