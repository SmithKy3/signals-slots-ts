import { createSignal } from './api';
import { ObjectSignal, PrimitiveSignal } from './Signal';

describe('public API', () => {
  describe('createSignal', () => {
    it('returns an instance of PrimitiveSignal if an initialValue of type string is passed', () => {
      const signal = createSignal('Hello');
      expect(signal instanceof PrimitiveSignal).toEqual(true);
    });

    it('returns an instance of PrimitiveSignal if an initialValue of type string is passed', () => {
      const signal = createSignal('Hello');
      expect(signal instanceof PrimitiveSignal).toEqual(true);
    });

    it('returns an instance of PrimitiveSignal if an initialValue of type number is passed', () => {
      const signal = createSignal(100);
      expect(signal instanceof PrimitiveSignal).toEqual(true);
    });

    it('returns an instance of PrimitiveSignal if an initialValue of type boolean is passed', () => {
      const signal = createSignal(true);
      expect(signal instanceof PrimitiveSignal).toEqual(true);
    });

    it('returns an instance of ObjectSignal if a record initialValue is passed', () => {
      const signal = createSignal({
        testing: '1, 2, 3',
      });
      expect(signal instanceof ObjectSignal).toEqual(true);
    });

    it('returns an instance of PrimitiveSignal if an array initialValue is passed', () => {
      const signal = createSignal([1, 2, 99, 100]);
      expect(signal instanceof ObjectSignal).toEqual(true);
    });
  });
});
