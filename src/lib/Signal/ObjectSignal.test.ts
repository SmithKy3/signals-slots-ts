import { ObjectSignal } from './ObjectSignal';

interface SampleRecord {
  name: string;
  fantasticShowsMap: Record<string, boolean>;
}

describe('ObjectSignal', () => {
  const slotOne = jest.fn();
  const slotTwo = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('record value', () => {
    const initialSampleRecord: SampleRecord = {
      name: 'Kye',
      fantasticShowsMap: {
        hollyoaks: false,
        mrRobot: true,
      },
    };

    it('assigns the value that is passed to the constructor on instantiation', () => {
      const signal = new ObjectSignal<SampleRecord>(initialSampleRecord);
      expect(signal.value).toEqual(initialSampleRecord);
    });

    it('allows the value to be updated using basic asignment', () => {
      const signal = new ObjectSignal<SampleRecord>(initialSampleRecord);
      const sampleRecordTwo: SampleRecord = {
        name: 'Kye',
        fantasticShowsMap: {
          gameOfThrones: true,
          hollyoaks: false,
          mrRobot: true,
        },
      };
      signal.value = sampleRecordTwo;
      expect(signal.value).toEqual(sampleRecordTwo);
      // Watched season 8
      const sampleRecordThree: SampleRecord = {
        name: 'Kye',
        fantasticShowsMap: {
          gameOfThrones: false,
          hollyoaks: false,
          mrRobot: true,
        },
      };
      signal.value.fantasticShowsMap.gameOfThrones = false;
      expect(signal.value).toEqual(sampleRecordThree);
    });

    it('calls any connected slots when the value is updated', () => {
      const signal = new ObjectSignal<SampleRecord>(initialSampleRecord);
      signal.connect(slotOne);
      const sampleRecordTwo: SampleRecord = {
        name: 'Kye',
        fantasticShowsMap: {
          gameOfThrones: true,
          hollyoaks: false,
          mrRobot: true,
        },
      };
      signal.value = sampleRecordTwo;
      // Watched season 8
      const sampleRecordThree: SampleRecord = {
        name: 'Kye',
        fantasticShowsMap: {
          gameOfThrones: false,
          hollyoaks: false,
          mrRobot: true,
        },
      };
      signal.value.fantasticShowsMap.gameOfThrones = false;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotOne).toHaveBeenNthCalledWith(1, sampleRecordTwo);
      expect(slotOne).toHaveBeenNthCalledWith(2, sampleRecordThree);
    });

    it('does not call disconnected slots when the value is updated', () => {
      const signal = new ObjectSignal<SampleRecord>(initialSampleRecord);
      signal.connect(slotOne);
      signal.connect(slotTwo);
      const sampleRecordTwo: SampleRecord = {
        name: 'Kye',
        fantasticShowsMap: {
          gameOfThrones: true,
          hollyoaks: false,
          mrRobot: true,
        },
      };
      signal.value = sampleRecordTwo;
      signal.disconnect(slotTwo);
      // Watched season 8
      const sampleRecordThree: SampleRecord = {
        name: 'Kye',
        fantasticShowsMap: {
          gameOfThrones: false,
          hollyoaks: false,
          mrRobot: true,
        },
      };
      signal.value.fantasticShowsMap.gameOfThrones = false;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotTwo).toHaveBeenCalledTimes(1);
    });
  });

  describe('primitive array value', () => {
    it('assigns the value that is passed to the constructor on instantiation', () => {
      const signal = new ObjectSignal<Array<number>>([0, 1, 2]);
      expect(signal.value).toEqual([0, 1, 2]);
    });

    it('allows the value to be updated using basic asignment', () => {
      const signal = new ObjectSignal<Array<number>>([0, 1, 2]);
      signal.value = [1, 2, 3];
      expect(signal.value).toEqual([1, 2, 3]);
      signal.value[0] = 2;
      expect(signal.value).toEqual([2, 2, 3]);
    });

    it('calls any connected slots when the value is updated', () => {
      const signal = new ObjectSignal<Array<number>>([0, 1, 2]);
      signal.connect(slotOne);
      signal.value = [1, 2, 3];
      expect(slotOne).toHaveBeenNthCalledWith(1, [1, 2, 3]);
      signal.value[0] = 2;
      expect(slotOne).toHaveBeenNthCalledWith(2, [2, 2, 3]);
      expect(slotOne).toHaveBeenCalledTimes(2);
    });

    it('does not call disconnected slots when the value is updated', () => {
      const signal = new ObjectSignal<Array<number>>([0, 1, 2]);
      signal.connect(slotOne);
      signal.connect(slotTwo);
      signal.value = [1, 2, 3];
      signal.disconnect(slotTwo);
      signal.value[0] = 2;
      expect(slotOne).toHaveBeenCalledTimes(2);
      expect(slotTwo).toHaveBeenCalledTimes(1);
    });
  });
});
