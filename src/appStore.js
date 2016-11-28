import { action, observable } from 'mobx';
import { toDecimal, isValidNumStr, trimTrailingDecimal, gToOz, ozToG } from './helpers';

const MAX = {
  COFFEE: 500,
  WATER: 10000,
  RATIO: 20
};

const appStore = observable({
  coffee: '20',
  water: '320',
  ratio: '16',
  displayCoffeeInOz: false,
  displayWaterInOz: false,
  get coffeeDisplay() {
    const valInOz = toDecimal(gToOz(parseInt(this.coffee, 10))).toString();

    if (this.displayCoffeeInOz) {
      const trailingDecimal = this.coffee[this.coffee.length - 1] === '.';
      const noDecimalInOz = (valInOz.split('.').length - 1) === 0;
      return trailingDecimal && noDecimalInOz ? `${valInOz}.` : valInOz;
    }

    return this.coffee;
  },
  get waterDisplay() {
    const valInOz = toDecimal(gToOz(parseFloat(this.water, 10))).toString();

    if (this.displayWaterInOz) {
      const trailingDecimal = this.water[this.water.length - 1] === '.';
      const noDecimalInOz = (valInOz.split('.').length - 1) === 0;
      return trailingDecimal && noDecimalInOz ? `${valInOz}.` : valInOz;
    }

    return this.water.indexOf('.') !== -1 ? trimTrailingDecimal(this.water) : this.water;
  }
});

appStore.incCoffee = action(function incCoffee() {
  const currentVal = parseFloat(this.coffee, 10);
  const val = this.displayCoffeeInOz ?
    toDecimal(ozToG((toDecimal(gToOz(currentVal)) * 10) + 1) / 10) :
    ((currentVal * 10) + 1) / 10;
  if (val > MAX.COFFEE) return;
  this.updateCoffee(val.toString());
});

appStore.decCoffee = action(function decCoffee() {
  const currentVal = parseFloat(this.coffee, 10);
  const val = this.displayCoffeeInOz ?
    toDecimal(ozToG((toDecimal(gToOz(currentVal)) * 10) - 1) / 10) :
    ((currentVal * 10) - 1) / 10;
  if (val < 0) return;
  this.updateCoffee(val.toString());
});

appStore.inputCoffee = action(function inputCoffee(val) {
  if (!isValidNumStr(val)) return;
  const num = parseFloat(val, 10);
  const convertedNum = this.displayCoffeeInOz ? toDecimal(ozToG(num)) : num;
  const newVal = Math.min((parseFloat(convertedNum, 10) || 0), MAX.COFFEE);
  const strVal = val[val.length - 1] === '.' ? `${newVal}.` : newVal.toString();
  this.updateCoffee(strVal);
});

appStore.incWater = action(function incWater() {
  const currentVal = parseFloat(this.water, 10);
  const val = this.displayWaterInOz ?
    parseInt(ozToG((toDecimal(gToOz(currentVal)) * 10) + 1) / 10, 10) :
    currentVal + 1;
  if (val > MAX.WATER) return;
  this.updateWater(val.toString());
});

appStore.decWater = action(function decWater() {
  const currentVal = parseFloat(this.water, 10);
  const val = this.displayWaterInOz ?
    parseInt(ozToG((toDecimal(gToOz(currentVal)) * 10) - 1) / 10, 10) :
    currentVal - 1;
  if (val < 0) return;
  this.updateWater(val.toString());
});

appStore.inputWater = action(function inputWater(val) {
  if (!isValidNumStr(val) || (!this.displayWaterInOz && val.indexOf('.') !== -1)) return;
  const num = parseFloat(val, 10);
  const convertedNum = this.displayWaterInOz ? parseInt(ozToG(num), 10) : Math.round(num);
  const newVal = Math.min((parseInt(convertedNum, 10) || 0), MAX.WATER);
  const strVal = val[val.length - 1] === '.' ? `${newVal}.` : newVal.toString();
  this.updateWater(strVal);
});

appStore.incRatio = action(function incRatio() {
  const val = ((parseFloat(this.ratio, 10) * 10) + 1) / 10;
  this.updateRatio(val.toString());
});

appStore.decRatio = action(function decRatio() {
  if (parseFloat(this.ratio, 10) <= 0) return;
  const val = ((parseFloat(this.ratio, 10) * 10) - 1) / 10;
  this.updateRatio(val.toString());
});

appStore.inputRatio = action(function inputRatio(val) {
  this.updateRatio(val);
});

appStore.trimCoffeeDecimal = action(function trimCoffeeDecimal(val) {
  if (val[val.length - 1] === '.') {
    const num = parseInt(val, 10);
    const convertedNum = this.displayCoffeeInOz ? toDecimal(ozToG(num)) : num;
    this.coffee = convertedNum.toString();
  }
});

appStore.trimWaterDecimal = action(function trimWaterDecimal(val) {
  if (val[val.length - 1] === '.') {
    const num = parseInt(val, 10);
    const convertedNum = this.displayWaterInOz ? toDecimal(ozToG(num)) : num;
    this.water = convertedNum.toString();
  }
});

appStore.trimRatioDecimal = action(function trimRatioDecimal(val) {
  this.ratio = (val[val.length - 1] === '.') ? trimTrailingDecimal(val) : val;
});

appStore.toggleCoffeeUnit = action(function toggleCoffeeUnit() {
  this.displayCoffeeInOz = !this.displayCoffeeInOz;
});

appStore.toggleWaterUnit = action(function toggleWaterUnit() {
  this.displayWaterInOz = !this.displayWaterInOz;
});

//--------------------------------------------------------------------------------------------------
// Private
//--------------------------------------------------------------------------------------------------

appStore.updateCoffee = action(function updateCoffee(val) {
  if (typeof val !== 'string') throw new Error('val must be of type String');
  this.coffee = val;
  this.water = parseInt((parseFloat(val, 10) * parseFloat(this.ratio, 10)), 10).toString();
});

appStore.updateWater = action(function updateWater(val) {
  if (typeof val !== 'string') throw new Error('val must be of type String');
  this.water = val;
  this.coffee = toDecimal(parseInt(val, 10) / parseFloat(this.ratio, 10)).toString();
});

appStore.updateRatio = action(function updateRatio(val) {
  if (typeof val !== 'string') throw new Error('val must be of type String');
  if (!isValidNumStr(val)) return;

  const newRatio = Math.min((parseFloat(val, 10) || 0), MAX.RATIO);
  const newWater = Math.round((parseFloat(this.coffee, 10) * newRatio));

  if (newWater <= MAX.WATER) {
    this.ratio = (val[val.length - 1] === '.') ? `${newRatio}.` : newRatio.toString();
    this.water = newWater.toString();
  }
});

export default appStore;
