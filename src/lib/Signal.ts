export type Slot<SignalType> = (emittedValue: SignalType) => void;

export class Signal<SignalType> {
  private _slots = new Array<Slot<SignalType>>();

  constructor(private _value: SignalType) {}

  public get value() {
    return this._value;
  }

  public set value(newVal: SignalType) {
    this._value = newVal;
    this._slots.forEach((slot) => slot(newVal));
  }

  public connect(slotToAdd: Slot<SignalType>) {
    this._slots.push(slotToAdd);
  }

  public disconnect(slotToRemove: Slot<SignalType>) {
    this._slots = this._slots.filter((slot) => slot !== slotToRemove);
  }
}

export const createSignal = <SignalType>(val: SignalType): Signal<SignalType> =>
  new Signal(val);
