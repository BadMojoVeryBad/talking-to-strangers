import { NodeInterface } from '@/framework/nodeInterface';
import { Scene } from '@/framework/scene';
import { Controls } from './controls/controls';
import { using } from './support/support';

/**
 * A node to be used in a Phaser game.
 */
export abstract class Node implements NodeInterface {
  private children: Array<NodeInterface> = [];

  private parent: NodeInterface;

  private states: {[key: string]: (time: number, delta: number) => string|void} = {
    'default': () => {
      // To be overridden.
    }
  };

  private currentState: string;

  protected controls: Controls;

  protected defaultState = 'default';

  protected scene: Scene;

  public init(data?: Record<string, unknown>): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // To be overridden.
  }

  public create(): void {
    // To be overridden.
  }

  public created(): void {
    // To be overridden.
  }

  public update(time: number, delta: number): void {
    if (!this.currentState) {
      this.currentState = this.defaultState;
    }

    if (!this.states[this.currentState]) {
      return;
    }

    using(this.states[this.currentState](time, delta), (state: string|void) => {
      if (state) {
        this.currentState = state;
      }
    });
  }

  public destroy(): void {
    // To be overridden.
  }

  public setScene(scene: Scene): void {
    this.scene = scene;
    this.controls = scene.game.registry.get('_controls') as Controls;
  }

  public addNode<T extends NodeInterface>(nodeClass: new () => T, data?: Record<string, unknown>): T {
    const component = this.scene.createNode(nodeClass, data);
    this.children.push(component);
    return component;
  }

  public addState(name: string, fn: (time: number, delta: number) => string|void): void {
    this.states[name] = fn;
  }

  public getParent(): NodeInterface {
    return this.parent;
  }

  public getChildren(): Array<NodeInterface> {
    return this.children;
  }

  public remove(): void {
    this.destroyChildren(this.getChildren());
    this.destroy();
    this.children = [];
  }

  private destroyChildren(nodes: Array<NodeInterface>) {
    for (const node of nodes) {
      this.destroyChildren(node.getChildren());
      node.destroy();
    }
  }
}
