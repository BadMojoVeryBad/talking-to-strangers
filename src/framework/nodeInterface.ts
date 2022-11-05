import { Scene } from '@/framework/scene';

/**
 * Defined the interface required to make nodes work.
 */
export interface NodeInterface {
  /**
   * This is called after the object is contructed, but before create.
   * This means all dependencies will be resolved, but the actual phaser
   * logic wont have started yet.
   *
   * This is also a good place to listen for any events you need to
   * listen to.
   */
  init(data?: Record<string, unknown>): void;

  /**
   * Called during the scene's `create()` method.
   */
  create(): void;

  /**
   * Called after all nodes' `create()` method have been called. This is a
   * good place to emit events that have been listened to in the `create()`
   * method.
   */
  created(): void;

  /**
   * Called during the scene's `update()` method.
   *
   * @param time Game time in ms.
   * @param delta Frame delta in ms.
   */
  update(time: number, delta: number): void;

  /**
   * Removes all game objects from the display and update list, and turns
   * off any events this node listens for. Called by `remove()` when a node
   * is removed from the node tree.
   *
   * If you are implementing this method for a node, you must make sure it:
   * * Removes all gameobjects from the scene.
   * * Removes any event listeners added by this node.
   */
  destroy(): void;

  /**
   * Sets the phaser scene member.
   *
   * @param scene The scene.
   */
  setScene(scene: Scene): void;

  /**
   * Add a child node.
   *
   * @param nodeClass The class of the node to add.
   * @param data Any data to be passed to the node's `init()` method.
   */
  addNode<T extends NodeInterface>(nodeClass: new () => T, data?: Record<string, unknown>): T;

  /**
   * Adds a state this node can be in.
   *
   * @param name The name of the state
   * @param fn The update function that is run when this state is the
   *     current state. If a string is returned, the node will
   *     transition to this state.
   */
  addState(name: string, fn: (time: number, delta: number) => string|void): void;

  /**
   * Get child nodes.
   */
  getChildren(): Array<NodeInterface>;

  /**
   * Get parent node.
   */
  getParent(): NodeInterface|null;

  /**
   * Removes the node from the node tree, as well as all child nodes. If
   * `this.destroy()` is implemented, this method will call it.
   */
  remove(): void;
}
