import { Slot } from '../../types/Slot';
import { PrimitiveSignal } from './PrimitiveSignal';

describe('PrimitiveSignal', () => {
  const slotOne = jest.fn();
  const slotTwo = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('string value', () => {
    it('assigns the value that is passed to the constructor on instantiation', () => {
      const initialValue = 'Hello world';
      const signal = new PrimitiveSignal<string>(initialValue);
      expect(signal.value).toEqual(initialValue);
    });

    it('allows the value to be updated using basic asignment', () => {
      const signal = new PrimitiveSignal<string>('Hello world');
      signal.value = 'Hello';
      expect(signal.value).toEqual('Hello');
      signal.value += ' universe';
      expect(signal.value).toEqual('Hello universe');
    });

    it('calls any connected slots when the value is updated', () => {
      const signal = new PrimitiveSignal<string>('Hello world');
      signal.connect(slotOne);
      signal.value = 'Hello';
      signal.value += ' universe';
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotOne).toHaveBeenNthCalledWith(1, 'Hello');
      expect(slotOne).toHaveBeenNthCalledWith(2, 'Hello universe');
    });

    it('does not call disconnected slots when the value is updated', () => {
      const signal = new PrimitiveSignal<string>('Testing, 1, 2, 3');
      signal.connect(slotOne);
      signal.connect(slotTwo);
      signal.value = 'Hello world';
      signal.disconnect(slotTwo);
      signal.value = 'Knock knock';
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotTwo).toHaveBeenCalledTimes(1);
    });
  });

  describe('number value', () => {
    it('assigns the value that is passed to the constructor on instantiation', () => {
      const initialValue = 42;
      const signal = new PrimitiveSignal<number>(initialValue);
      expect(signal.value).toEqual(initialValue);
    });

    it('allows the value to be updated using basic asignment', () => {
      const signal = new PrimitiveSignal<number>(0);
      signal.value = 90;
      expect(signal.value).toEqual(90);
      signal.value += 9;
      expect(signal.value).toEqual(99);
      signal.value++;
      expect(signal.value).toEqual(100);
    });

    it('calls any connected slots when the value is updated', () => {
      const signal = new PrimitiveSignal<number>(0);
      signal.connect(slotOne);
      signal.value = 99;
      signal.value += 1;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotOne).toHaveBeenNthCalledWith(1, 99);
      expect(slotOne).toHaveBeenNthCalledWith(2, 100);
    });

    it('does not call disconnected slots when the value is updated', () => {
      const signal = new PrimitiveSignal<number>(0);
      signal.connect(slotOne);
      signal.connect(slotTwo);
      signal.value = 100;
      signal.disconnect(slotTwo);
      signal.value = 200;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotTwo).toHaveBeenCalledTimes(1);
    });
  });

  describe('boolean value', () => {
    it('assigns the value that is passed to the constructor on instantiation', () => {
      const initialValue = false;
      const signal = new PrimitiveSignal<boolean>(initialValue);
      expect(signal.value).toEqual(false);
    });

    it('allows the value to be updated using basic asignment', () => {
      const signal = new PrimitiveSignal<boolean>(false);
      signal.value = true;
      expect(signal.value).toEqual(true);
    });

    it('calls any connected slots when the value is updated', () => {
      const signal = new PrimitiveSignal<boolean>(true);
      signal.connect(slotOne);
      signal.value = false;
      signal.value = true;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotOne).toHaveBeenNthCalledWith(1, false);
      expect(slotOne).toHaveBeenNthCalledWith(2, true);
    });

    it('does not call disconnected slots when the value is updated', () => {
      const signal = new PrimitiveSignal<boolean>(false);
      signal.connect(slotOne);
      signal.connect(slotTwo);
      signal.value = true;
      signal.disconnect(slotTwo);
      signal.value = false;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotTwo).toHaveBeenCalledTimes(1);
    });
  });
});
