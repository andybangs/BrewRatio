import { observable } from 'mobx';

export default class VariableModel {
  @observable name: 'coffee' | 'water' | 'ratio';
  @observable value: string;
  maxValue: number;
  @observable displayInOz: boolean;

  constructor(name, value, maxValue) {
    this.name = name;
    this.value = value.toString();
    this.maxValue = maxValue;
    this.displayInOz = false;
  }
}
