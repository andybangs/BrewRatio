/* @flow */

export function toDecimal(val: number): number {
  return +(val).toFixed(1);
}

export function isValidNumStr(val: string): boolean {
  return typeof val === 'string' && (val.indexOf('.') === -1 || val.indexOf('.') >= val.length - 2);
}

export function trimTrailingDecimal(val: string): string {
  return val.slice(0, val.length - 1);
}

export function gToOz(val: number): number {
  if (typeof val !== 'number') {
    throw new Error('val must be of type Number');
  }

  const stringVal = val.toString();
  if (stringVal.indexOf('.') !== -1 && stringVal.indexOf('.') < stringVal.length - 5) {
    throw new Error('val must contain 4 or less decimal places');
  }

  return ((val * 100000 * 35274) / 1000000) / 100000;
}

export function ozToG(val: number): number {
  if (typeof val !== 'number') {
    throw new Error('val must be of type Number');
  }

  const stringVal = val.toString();
  if (stringVal.indexOf('.') !== -1 && stringVal.indexOf('.') < stringVal.length - 5) {
    throw new Error('val must contain 4 or less decimal places');
  }

  return ((val * 100000 * 283495) / 10000) / 100000;
}
