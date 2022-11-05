export abstract class TilemapHelper {
  public static getProperty<T>(obj: Phaser.Types.Tilemaps.TiledObject, name: string, defaultValue: T = null): T {
    if (obj.properties) {
      for (const property of obj.properties) {
        if (property.name === name) {
          return property.value as T;
        }
      }
    }

    return defaultValue;
  }
}
