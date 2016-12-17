/* @flow */
import { action, computed, observable } from 'mobx';
import VariableModel from '../models/VariableModel';
import {
  toDecimal,
  isValidNumStr,
  trimTrailingDecimal,
  gToOz,
  ozToG,
  incVal,
  decVal,
  isInt
} from '../utils';

export default class AppStore {
  @observable coffee: VariableModel;
  @observable water: VariableModel;
  @observable ratio: VariableModel;

  constructor(coffeeValInG: number = 20, waterValInG: number = 320, ratioVal: number = 16) {
    this.coffee = new VariableModel('coffee', coffeeValInG, 500);
    this.water = new VariableModel('water', waterValInG, 10000);
    this.ratio = new VariableModel('ratio', ratioVal, 20);
  }

  @computed get coffeeDisplay(): string {
    return displayValue(this.coffee);
  }

  @computed get waterDisplay(): string {
    return displayValue(this.water);
  }

  @action incCoffee(): void {
    const newVal = calcNewValue(this.coffee, incVal, 0.1, 0.1);
    if (newVal > this.coffee.maxValue) return;
    this.updateCoffee(newVal.toString());
  }

  @action decCoffee(): void {
    const newVal = calcNewValue(this.coffee, decVal, 0.1, 0.1);
    if (newVal < 0) return;
    this.updateCoffee(newVal.toString());
  }

  @action inputCoffee(val: string): void {
    if (!isValidNumStr(val)) return;
    const num = parseFloat(val, 10);
    const convertedNum = this.coffee.displayInOz ? toDecimal(ozToG(num)) : num;
    const newVal = Math.min((parseFloat(convertedNum, 10) || 0), this.coffee.maxValue);
    const strVal = val[val.length - 1] === '.' ? `${newVal}.` : newVal.toString();
    this.updateCoffee(strVal);
  }

  @action incWater(): void {
    const newVal = calcNewValue(this.water, incVal, 1, 0.1);
    if (newVal > this.water.maxValue) return;
    this.updateWater(newVal.toString());
  }

  @action decWater(): void {
    const newVal = calcNewValue(this.water, decVal, 1, 0.1);
    if (newVal < 0) return;
    this.updateWater(newVal.toString());
  }

  @action inputWater(val: string): void {
    if (!isValidNumStr(val) || (!this.water.displayInOz && val.indexOf('.') !== -1)) return;
    const num = parseFloat(val, 10);
    const convertedNum = this.water.displayInOz ? parseInt(ozToG(num), 10) : Math.round(num);
    const newVal = Math.min((parseInt(convertedNum, 10) || 0), this.water.maxValue);
    const strVal = val[val.length - 1] === '.' ? `${newVal}.` : newVal.toString();
    this.updateWater(strVal);
  }

  @action incRatio(): void {
    const newVal = incVal(parseFloat(this.ratio.value, 10), 0.1);
    this.updateRatio(newVal.toString());
  }

  @action decRatio(): void {
    const currentVal = parseFloat(this.ratio.value, 10);
    if (currentVal <= 0) return;
    const newVal = decVal(currentVal, 0.1);
    this.updateRatio(newVal.toString());
  }

  @action inputRatio(val: string): void {
    this.updateRatio(val);
  }

  @action trimCoffeeDecimal(val: string) {
    if (val[val.length - 1] === '.') {
      const num = parseInt(val, 10);
      const convertedNum = this.displayCoffeeInOz ? toDecimal(ozToG(num)) : num;
      this.coffee.value = convertedNum.toString();
    }
  }

  @action trimWaterDecimal(val: string): void {
    if (val[val.length - 1] === '.') {
      const num = parseInt(val, 10);
      const convertedNum = this.displayWaterInOz ? toDecimal(ozToG(num)) : num;
      this.water.value = convertedNum.toString();
    }
  }

  @action trimRatioDecimal(val: string): void {
    this.ratio.value = (val[val.length - 1] === '.') ? trimTrailingDecimal(val) : val;
  }

  @action toggleCoffeeUnit(): void {
    this.coffee.displayInOz = !this.coffee.displayInOz;
  }

  @action toggleWaterUnit(): void {
    this.water.displayInOz = !this.water.displayInOz;
  }

  updateCoffee(val: string): void {
    if (typeof val !== 'string') throw new Error('val must be of type String');
    const ratio: number = parseFloat(this.ratio.value, 10);
    this.coffee.value = val;
    this.water.value = parseInt((parseFloat(val, 10) * ratio), 10).toString();
  }

  updateWater(val: string): void {
    if (typeof val !== 'string') throw new Error('val must be of type String');
    const ratio: number = parseFloat(this.ratio.value, 10);
    this.water.value = val;
    this.coffee.value = toDecimal(parseInt(val, 10) / ratio).toString();
  }

  updateRatio(val: string): void {
    if (typeof val !== 'string') throw new Error('val must be of type String');
    if (!isValidNumStr(val)) return;

    const newRatio = Math.min((parseFloat(val, 10) || 0), this.ratio.maxValue);
    const newWater = Math.round((parseFloat(this.coffee.value, 10) * newRatio));

    if (newWater <= this.water.maxValue) {
      this.ratio.value = (val[val.length - 1] === '.') ? `${newRatio}.` : newRatio.toString();
      this.water.value = newWater.toString();
    }
  }
}

function displayValue(variable: VariableModel): string {
  const { value, displayInOz } = variable;
  const valInOz = toDecimal(gToOz(parseInt(value, 10))).toString();

  if (displayInOz) {
    const trailingDecimal = value[value.length - 1] === '.';
    const noDecimalInOz = (valInOz.split('.').length - 1) === 0;
    return trailingDecimal && noDecimalInOz ? `${valInOz}.` : valInOz;
  }

  return value;
}

function calcNewValue(
  variable: VariableModel,
  operation: (val: number, step: number) => number,
  gStep: number,
  ozStep: number
): number {
  const { value, displayInOz } = variable;
  const currentVal = parseFloat(value, 10);

  if (displayInOz) {
    const convertedVal = ozToG(operation(toDecimal(gToOz(currentVal)), ozStep));
    return isInt(ozStep) ? parseInt(convertedVal, 10) : toDecimal(convertedVal);
  }

  const newVal = operation(currentVal, gStep);
  return isInt(gStep) ? parseInt(newVal, 10) : newVal;
}
