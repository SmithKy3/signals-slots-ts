import { ObjectSignal } from './Signal/ObjectSignal';
import { PrimitiveSignal } from './Signal/PrimitiveSignal';

type Signal<T extends object | string | number | boolean> = T extends
  | string
  | number
  | boolean
  ? PrimitiveSignal<T>
  : T extends object
  ? ObjectSignal<T>
  : never;

export const createSignal = <T extends object | string | number | boolean>(
  initialValue: T
): Signal<T> => {
  if (typeof initialValue === 'object') {
    return new ObjectSignal(initialValue) as Signal<T>;
  }

  return new PrimitiveSignal(initialValue) as Signal<T>;
};
