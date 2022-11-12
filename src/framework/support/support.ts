/**
 * Global support functions.
 */

export const tap = <T>(value: T, callback: (value: T) => any): T => {
  callback(value);

  return value;
};

export const using = <T, U>(value: T, callback: (value: T) => U): U => {
  return callback(value);
};


export const normalise = (val: number, max: number, min: number): number => {
  return (val - min) / (max - min);
};

export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
};

export const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const easeInOutElastic = (x: number): number => {
  const c5 = (2 * Math.PI) / 4.5;

  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}
