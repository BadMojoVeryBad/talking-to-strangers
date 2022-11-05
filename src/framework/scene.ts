import { NodeInterface } from '@/framework/nodeInterface';
import { tap } from './support/support';

enum Hook {
  CREATE,
  CREATED,
  UPDATE,
  DESTROY
}

/**
 * A Phaser scene extension that allows the use of nodes.
 */
export abstract class Scene extends Phaser.Scene implements NodeInterface {
  private nodes: Array<NodeInterface> = [];
  private isSceneCreated = false;
  private hasCreateRun = false;
  private hasCreatedRun = false;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  public init(data?: Record<string, unknown>): void { // eslint-disable-line @typescript-eslint/no-unused-vars
    // ...to be overridden.
  }

  public getChildren(): Array<NodeInterface> {
    return this.nodes;
  }

  public getParent(): NodeInterface|null {
    return null;
  }

  public setScene(): void {
    // ...
  }

  public created(): void {
    // ...
  }

  public remove(): void {
    this.hasCreateRun = false;
    this.hasCreatedRun = false;
    this.isSceneCreated = false;
    for (const child of this.getChildren()) {
      this.updateNode(child, Hook.DESTROY);
    }
    this.scene.stop();
  }

  /**
   * Safely changes the scene by unregistering all components and events.
   *
   * @param key The unique key of the scene to change to.
   */
  public changeScene(key: string): void {
    this.hasCreateRun = false;
    this.hasCreatedRun = false;
    this.isSceneCreated = false;
    for (const child of this.getChildren()) {
      this.updateNode(child, Hook.DESTROY);
    }
    this.nodes = [];
    this.scene.start(key);
  }

  /**
   * Creates a node instance, but does not add it to the node tree.
   *
   * @param key The key of the node to add.
   * @param data Any data to be passed to the node's `init()` method.
   */
  public createNode<T extends NodeInterface>(nodeClass: new () => T, data?: Record<string, unknown>): T {
    // Get a node instance.
    const node = new nodeClass();

    // Initialise it.
    node.setScene(this);
    node.init(data);

    // Run creation hooks if the scene is already ceated.
    if (this.isSceneCreated && this.hasCreateRun) {
      this.updateNode(node, Hook.CREATE);
    }

    if (this.isSceneCreated && this.hasCreatedRun) {
      this.updateNode(node, Hook.CREATED);
    }

    return node;
  }

  public addNode<T extends NodeInterface>(nodeClass: new () => T, data?: Record<string, unknown>): T {
    return tap(this.createNode(nodeClass, data), (node) => {
      this.nodes.push(node);
    });
  }

  public addState(): void {
    throw new Error('Scenes do not have states. To use states add a node to this scene and use states within the node.');
  }

  /**
   * The scene's create method. If you override this method, be sure to call the
   * `super()`:
   *
   * ```
   * public create(): void {
   *   super.create();
   * }
   * ```
   */
  public create(): void {
    this.isSceneCreated = true;

    for (const child of this.getChildren()) {
      this.updateNode(child, Hook.CREATE);
    }

    this.hasCreateRun = true;

    for (const child of this.getChildren()) {
      this.updateNode(child, Hook.CREATED);
    }

    this.hasCreatedRun = true;
  }

  /**
   * The scene's update method. If you override this method, be sure to call the
   * `super()`:
   *
   * ```
   * public update(time: number, delta: number): void {
   *   super.update(time: number, delta: number);
   * }
   * ```
   */
  public update(time: number, delta: number): void {
    for (const child of this.getChildren()) {
      this.updateNode(child, Hook.UPDATE, time, delta);
    }
  }

  public destroy(): void {
    this.remove();
  }

  /**
   * Get the width of the game.
   */
  public width(): number {
    return this.game.canvas.width;
  }

  /**
   * Get the height of the game.
   */
  public height(): number {
    return this.game.canvas.height;
  }

  /**
   * Has the scene's created() method been run?
   *
   * @returns
   */
  public isCreated(): boolean {
    return this.isSceneCreated;
  }

  private updateNode(node: NodeInterface, hook: Hook, time = 0, delta = 0) {
    switch (hook as Hook) {
    case Hook.CREATE:
      node.create();
      break;

    case Hook.UPDATE:
      node.update(time, delta);
      break;

    case Hook.CREATED:
      node.created();
      break;

    case Hook.DESTROY:
      node.destroy();
      break;
    }

    for (const child of node.getChildren()) {
      this.updateNode(child, hook, time, delta);
    }
  }
}
