import { SlotsStore } from './SlotsStore';

export class PrimitiveSignal<
  T extends string | number | boolean
> extends SlotsStore<T> {
  constructor(private _value: T) {
    super();
  }

  public get value() {
    return this._value;
  }

  public set value(newVal: T) {
    this._value = newVal;
    this._slots.forEach((slot) => slot(this._value));
  }
}
