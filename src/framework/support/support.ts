/**
 * Global support functions.
 */

export const tap = <T>(value: T, callback: (value: T) => any) => {
  callback(value);

  return value;
};

export const using = <T, U>(value: T, callback: (value: T) => U) => {
  return callback(value);
};


export const normalise = (val: number, max: number, min: number): number => {
  return (val - min) / (max - min);
}

export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
}
