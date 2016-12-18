import {
  toDecimal,
  isValidNumStr,
  trimTrailingDecimal,
  gToOz,
  ozToG,
  incVal,
  decVal,
  isInt,
  isValidFloat
} from '../src/utils';

describe('toDecimal', () => {
  it('should return a number with one decimal place', () => {
    const stringVal = toDecimal(1.3333333).toString();
    expect(stringVal.indexOf('.')).toBe(stringVal.length - 2);
  });

  it('should round up as expected', () => {
    expect(toDecimal(1.45)).toBe(1.5);
  });

  it('should round down as expected', () => {
    expect(toDecimal(1.44)).toBe(1.4);
  });

  it('should throw for an input of type String', () => {
    expect(() => toDecimal('1.44')).toThrowError(Error);
  });
});

describe('isValidNumStr', () => {
  it('should return true for int string', () => {
    expect(isValidNumStr('20')).toBe(true);
  });

  it('should return true for float string with one decimal place', () => {
    expect(isValidNumStr('19.9')).toBe(true);
  });

  it('should return false for float string with more than one decimal place', () => {
    expect(isValidNumStr('19.99')).toBe(false);
  });

  it('should throw for an input of type Number', () => {
    expect(() => isValidNumStr(100)).toThrowError(Error);
  });
});

describe('trimTrailingDecimal', () => {
  it('should trim the last char of a string', () => {
    expect(trimTrailingDecimal('100.')).toBe('100');
  });

  it('should throw for an input of type Number', () => {
    expect(() => trimTrailingDecimal(100)).toThrowError(Error);
  });
});

describe('gToOz', () => {
  it('should convert an int in grams to ounces without rounding', () => {
    expect(gToOz(1)).toBeCloseTo(0.035274, 5);
  });

  it('should convert a float in grams to ounces without rounding', () => {
    expect(gToOz(100.9999)).toBeCloseTo(3.5626666295, 5);
  });

  it('should throw for an input of type String', () => {
    expect(() => gToOz('100.99')).toThrowError(Error);
  });

  it('should throw for an input with more than 4 decimal places', () => {
    expect(() => gToOz(100.99999)).toThrowError(Error);
  });
});

describe('ozToG', () => {
  it('should convert an int in ounces to grams without rounding', () => {
    expect(ozToG(1)).toBeCloseTo(28.349523125, 5);
  });

  it('should convert a float in ounces to grams without rounding', () => {
    expect(ozToG(100.9999)).toBeCloseTo(2863.2990007, 5);
  });

  it('should throw for an input of type String', () => {
    expect(() => ozToG('100.99')).toThrowError(Error);
  });

  it('should throw for an input with more than 4 decimal places', () => {
    expect(() => ozToG(100.99999)).toThrowError(Error);
  });
});

describe('incVal', () => {
  it('should increment int val by int step', () => {
    expect(incVal(1, 1)).toBe(2);
  });

  it('should increment int val by one decimal place step', () => {
    expect(incVal(1, 0.1)).toBe(1.1);
  });

  it('should increment float val by int step', () => {
    expect(incVal(0.1, 1)).toBe(1.1);
  });

  it('should increment float val by one decimal place step', () => {
    expect(incVal(0.1, 0.2)).toBe(0.3);
  });

  it('should throw for a val with more than one decimal place', () => {
    expect(() => incVal(10.99, 0.1)).toThrowError(Error);
  });

  it('should throw for a step with more than one decimal place', () => {
    expect(() => incVal(10, 0.99)).toThrowError(Error);
  });
});

describe('decVal', () => {
  it('should decrement int val by int step', () => {
    expect(decVal(1, 1)).toBe(0);
  });

  it('should decrement int val by one decimal place step', () => {
    expect(decVal(1, 0.1)).toBe(0.9);
  });

  it('should decrement float val by int step', () => {
    expect(decVal(1.1, 1)).toBe(0.1);
  });

  it('should decrement float val by one decimal place step', () => {
    expect(decVal(0.1, 0.1)).toBe(0);
  });

  it('should throw for a val with more than one decimal place', () => {
    expect(() => decVal(10.99, 0.1)).toThrowError(Error);
  });

  it('should throw for a step with more than one decimal place', () => {
    expect(() => decVal(10, 0.99)).toThrowError(Error);
  });
});

describe('isInt', () => {
  it('should return true if input is an int', () => {
    expect(isInt(1)).toBe(true);
  });

  it('should return false if input is a float', () => {
    expect(isInt(1.1)).toBe(false);
  });

  it('should throw for an input of type String', () => {
    expect(() => isInt('1')).toThrowError(Error);
  });
});

describe('isValidFloat', () => {
  it('should return true if input is a float with one decimal place', () => {
    expect(isValidFloat(1.1)).toBe(true);
  });

  it('should return false if input is a float with two decimal places', () => {
    expect(isValidFloat(1.99)).toBe(false);
  });

  it('should return false if input is an int', () => {
    expect(isValidFloat(1)).toBe(false);
  });

  it('should throw for an input of type String', () => {
    expect(() => isValidFloat('1.1')).toThrowError(Error);
  });
});
