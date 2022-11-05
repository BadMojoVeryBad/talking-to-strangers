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
