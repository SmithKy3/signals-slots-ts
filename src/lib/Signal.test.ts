import { createSignal, Signal, Slot } from './Signal';

interface TestData {
  fantasticShowMap: Record<string, boolean>;
}

describe('Signal', () => {
  describe('createSignal util', () => {
    it('returns an instance of the Signal class', () => {
      const signal = createSignal(120);
      expect(signal instanceof Signal).toEqual(true);
    });
  });

  describe('class constructor', () => {
    const numberSlot: Slot<number> = jest.fn();
    const testDataSlot: Slot<TestData> = jest.fn();
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('assigns the value that is passed to the constructor in instantiation', () => {
      const signal = new Signal<number>(100);
      expect(signal.value).toEqual(100);
    });

    it('allows the value to be updated using basic asignment', () => {
      const signal = new Signal<number>(100);
      signal.value = 125;
      expect(signal.value).toEqual(125);
      signal.value += 25;
      expect(signal.value).toEqual(150);
    });

    it('calls any connect slots when the value is updated', () => {
      const numberSignal = new Signal<number>(1);
      numberSignal.connect(numberSlot);
      numberSignal.value = 100;
      numberSignal.value = 200;
      expect(numberSlot).toHaveBeenCalledTimes(2);
      expect(numberSlot).toHaveBeenNthCalledWith(1, 100);
      expect(numberSlot).toHaveBeenNthCalledWith(2, 200);

      const originalTestData: TestData = {
        fantasticShowMap: {
          mrRobot: true,
          friends: true,
          gameOfThrones: true,
        },
      };
      const testDataSignal = new Signal<TestData>(originalTestData);
      testDataSignal.connect(testDataSlot);
      const testDataVariant: TestData = {
        fantasticShowMap: {
          mrRobot: true,
          friends: true,
          gameOfThrones: true,
          theSimpsons: true,
        },
      };
      testDataSignal.value = testDataVariant;
      expect(testDataSlot).toHaveBeenCalledTimes(1);
      expect(testDataSlot).toHaveBeenNthCalledWith(1, testDataVariant);
    });
  });
});
