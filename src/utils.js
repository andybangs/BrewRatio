/* @flow */

export function toDecimal(val: number): number {
  if (typeof val !== 'number') {
    throw new Error('val must be of type Number');
  }

  return +(Math.round(val * 10, 10) / 10).toFixed(1);
}

export function isValidNumStr(val: string): boolean {
  if (typeof val !== 'string') {
    throw new Error('val must be of type String');
  }

  return val.indexOf('.') === -1 || val.indexOf('.') >= val.length - 2;
}

export function trimTrailingDecimal(val: string): string {
  if (typeof val !== 'string') {
    throw new Error('val must be of type String');
  }

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

  return (val * 28349523125) / 1000000000;
}

export function incVal(val: number, step: number): number {
  if (typeof val !== 'number' || (!isInt(val) && !isValidFloat(val))) {
    throw new Error('val must be a number with 0 or 1 decimal places');
  }

  if (typeof step !== 'number' || (!isInt(step) && !isValidFloat(step))) {
    throw new Error('step must be a number with 0 or 1 decimal places');
  }

  if (isInt(val) && isInt(step)) {
    return val + step;
  }

  return ((val * 10) + (step * 10)) / 10;
}

export function decVal(val: number, step: number): number {
  if (typeof val !== 'number' || (!isInt(val) && !isValidFloat(val))) {
    throw new Error('val must be a number with 0 or 1 decimal places');
  }

  if (typeof step !== 'number' || (!isInt(step) && !isValidFloat(step))) {
    throw new Error('step must be a number with 0 or 1 decimal places');
  }

  if (isInt(val) && isInt(step)) {
    return val - step;
  }

  return ((val * 10) - (step * 10)) / 10;
}

export function isInt(val: number): boolean {
  if (typeof val !== 'number') {
    throw new Error('val must be of type Number');
  }

  return val.toString().indexOf('.') === -1;
}

export function isValidFloat(val: number): boolean {
  if (typeof val !== 'number') {
    throw new Error('val must be of type Number');
  }

  const str = val.toString();
  return str.length > 2 && str.indexOf('.') === str.length - 2;
}
