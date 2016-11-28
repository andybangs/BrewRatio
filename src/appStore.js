/* @flow */
import { action, computed, observable } from 'mobx';
import { toDecimal, isValidNumStr, trimTrailingDecimal, gToOz, ozToG } from './helpers';

const MAX = {
  COFFEE: 500,
  WATER: 10000,
  RATIO: 20
};

export default class AppStore {
  @observable coffee: string;
  @observable water: string;
  @observable ratio: string;
  @observable displayCoffeeInOz: boolean;
  @observable displayWaterInOz: boolean;

  constructor(coffee: number = 20, water: number = 320, ratio: number = 16) {
    this.coffee = coffee.toString();
    this.water = water.toString();
    this.ratio = ratio.toString();
    this.displayCoffeeInOz = false;
    this.displayWaterInOz = true;
  }

  @computed get coffeeDisplay(): string {
    const valInOz = toDecimal(gToOz(parseInt(this.coffee, 10))).toString();

    if (this.displayCoffeeInOz) {
      const trailingDecimal = this.coffee[this.coffee.length - 1] === '.';
      const noDecimalInOz = (valInOz.split('.').length - 1) === 0;
      return trailingDecimal && noDecimalInOz ? `${valInOz}.` : valInOz;
    }

    return this.coffee;
  }

  @computed get waterDisplay(): string {
    const valInOz = toDecimal(gToOz(parseFloat(this.water, 10))).toString();

    if (this.displayWaterInOz) {
      const trailingDecimal = this.water[this.water.length - 1] === '.';
      const noDecimalInOz = (valInOz.split('.').length - 1) === 0;
      return trailingDecimal && noDecimalInOz ? `${valInOz}.` : valInOz;
    }

    return this.water.indexOf('.') !== -1 ? trimTrailingDecimal(this.water) : this.water;
  }

  @action incCoffee(): void {
    const currentVal = parseFloat(this.coffee, 10);
    const val = this.displayCoffeeInOz ?
      toDecimal(ozToG((toDecimal(gToOz(currentVal)) * 10) + 1) / 10) :
      ((currentVal * 10) + 1) / 10;
    if (val > MAX.COFFEE) return;
    this.updateCoffee(val.toString());
  }

  @action decCoffee(): void {
    const currentVal = parseFloat(this.coffee, 10);
    const val = this.displayCoffeeInOz ?
      toDecimal(ozToG((toDecimal(gToOz(currentVal)) * 10) - 1) / 10) :
      ((currentVal * 10) - 1) / 10;
    if (val < 0) return;
    this.updateCoffee(val.toString());
  }

  @action inputCoffee(val: string): void {
    if (!isValidNumStr(val)) return;
    const num = parseFloat(val, 10);
    const convertedNum = this.displayCoffeeInOz ? toDecimal(ozToG(num)) : num;
    const newVal = Math.min((parseFloat(convertedNum, 10) || 0), MAX.COFFEE);
    const strVal = val[val.length - 1] === '.' ? `${newVal}.` : newVal.toString();
    this.updateCoffee(strVal);
  }

  @action incWater(): void {
    const currentVal = parseFloat(this.water, 10);
    const val = this.displayWaterInOz ?
      parseInt(ozToG((toDecimal(gToOz(currentVal)) * 10) + 1) / 10, 10) :
      currentVal + 1;
    if (val > MAX.WATER) return;
    this.updateWater(val.toString());
  }

  @action decWater(): void {
    const currentVal = parseFloat(this.water, 10);
    const val = this.displayWaterInOz ?
      parseInt(ozToG((toDecimal(gToOz(currentVal)) * 10) - 1) / 10, 10) :
      currentVal - 1;
    if (val < 0) return;
    this.updateWater(val.toString());
  }

  @action inputWater(val: string): void {
    if (!isValidNumStr(val) || (!this.displayWaterInOz && val.indexOf('.') !== -1)) return;
    const num = parseFloat(val, 10);
    const convertedNum = this.displayWaterInOz ? parseInt(ozToG(num), 10) : Math.round(num);
    const newVal = Math.min((parseInt(convertedNum, 10) || 0), MAX.WATER);
    const strVal = val[val.length - 1] === '.' ? `${newVal}.` : newVal.toString();
    this.updateWater(strVal);
  }

  @action incRatio(): void {
    const val = ((parseFloat(this.ratio, 10) * 10) + 1) / 10;
    this.updateRatio(val.toString());
  }

  @action decRatio(): void {
    if (parseFloat(this.ratio, 10) <= 0) return;
    const val = ((parseFloat(this.ratio, 10) * 10) - 1) / 10;
    this.updateRatio(val.toString());
  }

  @action inputRatio(val: string): void {
    this.updateRatio(val);
  }

  @action trimCoffeeDecimal(val: string) {
    if (val[val.length - 1] === '.') {
      const num = parseInt(val, 10);
      const convertedNum = this.displayCoffeeInOz ? toDecimal(ozToG(num)) : num;
      this.coffee = convertedNum.toString();
    }
  }

  @action trimWaterDecimal(val: string): void {
    if (val[val.length - 1] === '.') {
      const num = parseInt(val, 10);
      const convertedNum = this.displayWaterInOz ? toDecimal(ozToG(num)) : num;
      this.water = convertedNum.toString();
    }
  }

  @action trimRatioDecimal(val: string): void {
    this.ratio = (val[val.length - 1] === '.') ? trimTrailingDecimal(val) : val;
  }

  @action toggleCoffeeUnit(): void {
    this.displayCoffeeInOz = !this.displayCoffeeInOz;
  }

  @action toggleWaterUnit(): void {
    this.displayWaterInOz = !this.displayWaterInOz;
  }

  //------------------------------------------------------------------------------------------------
  // Private
  //------------------------------------------------------------------------------------------------

  updateCoffee(val: string): void {
    if (typeof val !== 'string') throw new Error('val must be of type String');
    this.coffee = val;
    this.water = parseInt((parseFloat(val, 10) * parseFloat(this.ratio, 10)), 10).toString();
  }

  updateWater(val: string): void {
    if (typeof val !== 'string') throw new Error('val must be of type String');
    this.water = val;
    this.coffee = toDecimal(parseInt(val, 10) / parseFloat(this.ratio, 10)).toString();
  }

  updateRatio(val: string): void {
    if (typeof val !== 'string') throw new Error('val must be of type String');
    if (!isValidNumStr(val)) return;

    const newRatio = Math.min((parseFloat(val, 10) || 0), MAX.RATIO);
    const newWater = Math.round((parseFloat(this.coffee, 10) * newRatio));

    if (newWater <= MAX.WATER) {
      this.ratio = (val[val.length - 1] === '.') ? `${newRatio}.` : newRatio.toString();
      this.water = newWater.toString();
    }
  }
}
