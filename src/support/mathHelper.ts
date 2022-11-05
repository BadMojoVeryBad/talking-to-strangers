export abstract class MathHelper {
  public static normalise(val: number, max: number, min: number): number {
    return (val - min) / (max - min);
  }

  public static clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
  }
}
