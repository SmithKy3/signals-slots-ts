export type Slot<T> = (emittedValue: T) => void;

export class SlotsStore<T> {
  public connect(slotToAdd: Slot<T>) {
    this._slots.push(slotToAdd);
  }

  protected _slots = new Array<Slot<T>>();

  public disconnect(slotToRemove: Slot<T>) {
    this._slots = this._slots.filter((slot) => slot !== slotToRemove);
  }
}
