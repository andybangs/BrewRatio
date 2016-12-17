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

export function incVal(val: number, step: number): number {
  if (isInt(val) && isInt(step)) {
    return val + step;
  } else if (isValidFloat(val) || isValidFloat(step)) {
    return ((val * 10) + (step * 10)) / 10;
  }

  throw new Error('Arguments must be numbers with 0 or 1 decimal places');
}

export function decVal(val: number, step: number): number {
  let newVal;

  if (isInt(val) && isInt(step)) {
    newVal = val - step;
  } else if (isValidFloat(val) || isValidFloat(step)) {
    newVal = ((val * 10) - (step * 10)) / 10;
  } else {
    throw new Error('Arguments must be numbers with 0 or 1 decimal places');
  }

  return newVal;
}

export function isInt(val: number): boolean {
  return val.toString().indexOf('.') === -1;
}

function isValidFloat(val: number): boolean {
  const str = val.toString();
  return str.indexOf('.') === str.length - 2;
}
