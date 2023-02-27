import { SlotsStore } from './SlotsStore';

export class ObjectSignal<T extends object> extends SlotsStore<T> {
  constructor(initialValue: T) {
    super();
    const valueProxy = new Proxy(initialValue, this.deepProxyValueHandler);
    this._value = valueProxy;
  }

  private _value: T;

  private emitValueUpdate() {
    this._slots.forEach((slot) => slot(this._value));
  }

  private deepValueGetter(obj: any, key: string | symbol): any {
    if (key == '_isProxy') {
      return true;
    }

    if (typeof obj[key] == 'undefined') {
      return;
    }

    if (typeof obj[key] === 'object' && !obj[key]['_isProxy']) {
      obj[key] = new Proxy(obj[key], this.deepProxyValueHandler);
    }

    return obj[key];
  }
  private deepValueSetter(obj: any, key: string | symbol, newValue: any) {
    obj[key] = newValue;
    this.emitValueUpdate();
    return true;
  }
  private deepProxyValueHandler: ProxyHandler<any> = {
    get: this.deepValueGetter.bind(this),
    set: this.deepValueSetter.bind(this),
  };

  public get value() {
    return this._value;
  }

  public set value(newVal: T) {
    this._value = new Proxy(newVal, this.deepProxyValueHandler);
    this.emitValueUpdate();
  }
}
